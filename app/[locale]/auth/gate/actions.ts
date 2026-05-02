/* Server Action per l'autenticazione Sovereign Gauntlet.
   Verifica email + member_id (Codice di Risonanza) nella tabella `members`.
   Redirect a /{locale}/dashboard in caso di successo. */
"use server";

import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export type AuthState = {
  error: string | null;
};

export async function loginOrRegister(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  const referralCode = (formData.get("referralCode") as string | null)?.trim().toUpperCase();

  // Validazione base lato server
  if (!email || !referralCode) {
    return { error: "auth.error_invalid" };
  }

  // Query Supabase: verifica esistenza membro con email + member_id corrispondenti
  const { data, error } = await supabase
    .from("members")
    .select("id, role")
    .eq("email", email)
    .eq("member_id", referralCode)
    .maybeSingle();

  if (error || !data) {
    // Log per Sentinel AI: accesso negato
    console.warn("[SENTINEL] Accesso negato:", { email, referralCode, supabaseError: error?.message });
    return { error: "auth.error_invalid" };
  }

  // Accesso confermato — redirect al dashboard
  redirect("/dashboard");
}
