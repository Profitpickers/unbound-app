import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

type CallbackPayload = {
  user_id?: string;
  liber_balance?: number | string;
  liber_delta?: number | string;
  oracle_status?: string;
  transaction_id?: string;
  descrizione_azione?: string;
  timestamp?: string;
};

function toNumber(value: number | string | undefined): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.N8N_WEBHOOK_SECRET;
  const providedSecret = request.headers.get("x-unbound-secret");

  if (expectedSecret && providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let payload: CallbackPayload;

  try {
    payload = (await request.json()) as CallbackPayload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const userId = payload.user_id?.trim();

  if (!userId) {
    return NextResponse.json({ error: "missing_user_id" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "supabase_not_configured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { data: member, error: memberError } = await supabase
    .from("members")
    .select("liber_balance")
    .eq("member_id", userId)
    .maybeSingle();

  if (memberError || !member) {
    return NextResponse.json({ error: "member_not_found" }, { status: 404 });
  }

  const explicitBalance = toNumber(payload.liber_balance);
  const delta = toNumber(payload.liber_delta);
  const currentBalance = toNumber(member.liber_balance as number | string | undefined) ?? 0;

  const nextBalance = explicitBalance ?? (delta !== null ? currentBalance + delta : currentBalance);

  const { error: updateError } = await supabase
    .from("members")
    .update({ liber_balance: nextBalance })
    .eq("member_id", userId);

  if (updateError) {
    return NextResponse.json({ error: "update_failed" }, { status: 500 });
  }

  // Log best-effort: non blocca la conferma della transazione se la tabella non esiste.
  await supabase.from("social_mining_logs").insert({
    member_id: userId,
    descrizione_azione: payload.descrizione_azione ?? "n8n callback",
    status: payload.oracle_status ?? "validated",
    created_at: payload.timestamp ?? new Date().toISOString(),
    payload,
    transaction_id: payload.transaction_id ?? null,
  });

  return NextResponse.json({
    ok: true,
    user_id: userId,
    liber_balance: nextBalance,
  });
}
