"use server";

import { supabase } from "@/lib/supabase";

type SubmitContext = {
  userId: string;
  locale: string;
};

export type SocialMiningState = {
  status: "idle" | "pending" | "error";
  messageKey: string | null;
  submittedAt: string | null;
};

type NodeSnapshotRow = {
  node_id: string;
  total_solidarity_fund: number | string | null;
  affiliates?: unknown;
};

export type NodeNetworkSnapshot = {
  nodeId: string;
  totalSolidarityFund: number | string | null;
  affiliates: string[];
};

function normalizeAffiliates(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw
      .map((item) => {
        if (typeof item === "string") {
          return item.trim();
        }

        if (item && typeof item === "object") {
          const entity = item as { member_id?: string; node_id?: string; id?: string };
          return (entity.member_id ?? entity.node_id ?? entity.id ?? "").trim();
        }

        return "";
      })
      .filter(Boolean);
  }

  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  return [];
}

export async function getNodeNetworkSnapshot(memberId: string): Promise<NodeNetworkSnapshot> {
  const attempts = [
    () =>
      supabase
        .from("nodes")
        .select("node_id,total_solidarity_fund,affiliates")
        .eq("origin_member_id", memberId)
        .maybeSingle(),
    () =>
      supabase
        .from("nodes")
        .select("node_id,total_solidarity_fund,affiliates")
        .eq("node_id", memberId)
        .maybeSingle(),
    () =>
      supabase
        .from("nodes")
        .select("node_id,total_solidarity_fund,affiliates")
        .limit(1)
        .maybeSingle(),
    () =>
      supabase
        .from("nodes")
        .select("node_id,total_solidarity_fund")
        .limit(1)
        .maybeSingle(),
  ];

  for (const attempt of attempts) {
    const { data, error } = await attempt();

    if (error || !data) {
      continue;
    }

    const row = data as NodeSnapshotRow;

    return {
      nodeId: row.node_id,
      totalSolidarityFund: row.total_solidarity_fund,
      affiliates: normalizeAffiliates(row.affiliates),
    };
  }

  return {
    nodeId: memberId,
    totalSolidarityFund: 0,
    affiliates: [],
  };
}

export async function submitSocialMining(
  context: SubmitContext,
  _prevState: SocialMiningState,
  formData: FormData
): Promise<SocialMiningState> {
  const description = (formData.get("actionDescription") as string | null)?.trim();

  if (!description || description.length < 12) {
    return {
      status: "error",
      messageKey: "socialMining.feedbackValidationError",
      submittedAt: null,
    };
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      status: "error",
      messageKey: "socialMining.feedbackWebhookMissing",
      submittedAt: null,
    };
  }

  const timestamp = new Date().toISOString();

  const payload = {
    user_id: context.userId,
    descrizione_azione: description,
    timestamp,
    locale: context.locale,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        status: "error",
        messageKey: "socialMining.feedbackWebhookError",
        submittedAt: null,
      };
    }

    // Log best-effort: se la tabella non esiste, non blocca il flusso utente.
    await supabase.from("social_mining_logs").insert({
      member_id: context.userId,
      descrizione_azione: description,
      status: "pending_oracle",
      created_at: timestamp,
      payload,
    });

    return {
      status: "pending",
      messageKey: "socialMining.feedbackPending",
      submittedAt: timestamp,
    };
  } catch {
    return {
      status: "error",
      messageKey: "socialMining.feedbackWebhookError",
      submittedAt: null,
    };
  }
}
