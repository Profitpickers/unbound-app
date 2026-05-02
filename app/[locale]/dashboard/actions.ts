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
