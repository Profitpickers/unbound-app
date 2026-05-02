/* Server Action per l'autenticazione Sovereign Gauntlet.
   Verifica email + member_id (Codice di Risonanza) nella tabella `members`.
   Redirect a /{locale}/dashboard in caso di successo. */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export type AuthState = {
  error: string | null;
};

export type AuthenticatedMember = {
  liber_balance: number | string | null;
  member_id: string;
  role: string | null;
};

const DASHBOARD_SESSION_COOKIE = "unbound_dashboard_session";

function buildAuthRedirect(locale: string) {
  return `/${locale}/auth/gate`;
}

async function persistDashboardSession(email: string, memberId: string) {
  const cookieStore = await cookies();

  cookieStore.set(DASHBOARD_SESSION_COOKIE, JSON.stringify({ email, memberId }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function getAuthenticatedMember(locale: string): Promise<AuthenticatedMember> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(DASHBOARD_SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    redirect(buildAuthRedirect(locale));
  }

  let session: { email?: string; memberId?: string } | null = null;

  try {
    session = JSON.parse(sessionCookie);
  } catch {
    cookieStore.delete(DASHBOARD_SESSION_COOKIE);
    redirect(buildAuthRedirect(locale));
  }

  if (!session?.email || !session.memberId) {
    cookieStore.delete(DASHBOARD_SESSION_COOKIE);
    redirect(buildAuthRedirect(locale));
  }

  const { data, error } = await supabase
    .from("members")
    .select("liber_balance, member_id, role")
    .eq("email", session.email)
    .eq("member_id", session.memberId)
    .maybeSingle();

  if (error || !data) {
    cookieStore.delete(DASHBOARD_SESSION_COOKIE);
    redirect(buildAuthRedirect(locale));
  }

  return data;
}

export async function logout(locale: string): Promise<never> {
  const cookieStore = await cookies();
  cookieStore.delete(DASHBOARD_SESSION_COOKIE);
  redirect(`/${locale}/auth/gate`);
}

export async function loginOrRegister(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  const referralCode = (formData.get("referralCode") as string | null)?.trim().toUpperCase();
  const locale = (formData.get("locale") as string | null)?.trim() || "it";

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

  await persistDashboardSession(email, referralCode);

  // Accesso confermato — redirect al dashboard
  redirect(`/${locale}/dashboard`);
}
