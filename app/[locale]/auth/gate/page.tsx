/* Sovereign Gauntlet — pagina di accesso al Nexus UNBOUND.
   Design: Cyber-Minimalist con pannello Glassmorphism.
   Palette: Obsidian (#121212) · Gold (#D4AF37) · Cyan-Pulse (#00FFFF).
   Tutti i testi provengono da common.json (chiave "auth"). */
"use client";

import { useLocale, useTranslations } from "next-intl";
import { useActionState } from "react";
import { loginOrRegister, type AuthState } from "./actions";

const initialState: AuthState = { error: null };

export default function GatePage() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [state, formAction, isPending] = useActionState(loginOrRegister, initialState);

  return (
    <main
      className="relative flex min-h-screen items-center justify-center px-4 overflow-hidden"
      style={{ backgroundColor: "#0A0A0F" }}
    >
      {/* Sfondo: doppio glow ambientale gold + cyan */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-cyan-pulse/5 blur-[80px]" />
      </div>

      {/* Pannello Glassmorphism */}
      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-8 sm:p-10"
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(0, 255, 255, 0.15)",
          boxShadow: "0 0 60px rgba(212, 175, 55, 0.06), 0 0 120px rgba(0, 255, 255, 0.04)",
        }}
      >
        {/* Linea decorativa gold in cima al pannello */}
        <div
          className="absolute top-0 left-8 right-8 h-px rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
          aria-hidden="true"
        />

        {/* Intestazione */}
        <div className="mb-8 text-center space-y-2">
          {/* Simbolo identificativo */}
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
            style={{
              border: "1px solid rgba(212, 175, 55, 0.4)",
              background: "rgba(212, 175, 55, 0.08)",
            }}
            aria-hidden="true"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "#D4AF37" }}
          >
            {t("title")}
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
            {t("subtitle")}
          </p>
        </div>

        {/* Form */}
        <form action={formAction} className="space-y-5" noValidate>
          <input type="hidden" name="locale" value={locale} />

          {/* Campo Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="gate-email"
              className="block text-xs font-medium tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {t("email_label")}
            </label>
            <input
              id="gate-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={t("email_placeholder")}
              className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 transition-all duration-200 outline-none"
              style={{
                background: "rgba(0, 0, 0, 0.45)",
                border: "1px solid rgba(0, 255, 255, 0.2)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.border = "1px solid rgba(0, 255, 255, 0.55)";
                e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 255, 255, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.border = "1px solid rgba(0, 255, 255, 0.2)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Campo Codice di Risonanza */}
          <div className="space-y-1.5">
            <label
              htmlFor="gate-referral"
              className="block text-xs font-medium tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {t("referral_label")}
            </label>
            <input
              id="gate-referral"
              name="referralCode"
              type="text"
              autoComplete="off"
              required
              placeholder={t("referral_placeholder")}
              className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 transition-all duration-200 outline-none font-mono tracking-widest"
              style={{
                background: "rgba(0, 0, 0, 0.45)",
                border: "1px solid rgba(0, 255, 255, 0.2)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.border = "1px solid rgba(0, 255, 255, 0.55)";
                e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 255, 255, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.border = "1px solid rgba(0, 255, 255, 0.2)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Messaggio di errore */}
          {state.error && (
            <div
              role="alert"
              aria-live="polite"
              className="rounded-lg px-4 py-3 text-sm"
              style={{
                background: "rgba(255, 60, 60, 0.08)",
                border: "1px solid rgba(255, 60, 60, 0.25)",
                color: "rgba(255, 120, 120, 0.9)",
              }}
            >
              {t("error_invalid")}
            </div>
          )}

          {/* Bottone Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="relative w-full rounded-lg py-3 px-6 text-sm font-semibold tracking-widest uppercase transition-all duration-300 overflow-hidden"
            style={{
              background: isPending
                ? "rgba(212, 175, 55, 0.15)"
                : "linear-gradient(135deg, rgba(212, 175, 55, 0.9) 0%, rgba(0, 255, 255, 0.7) 100%)",
              color: isPending ? "rgba(212, 175, 55, 0.5)" : "#0A0A0F",
              boxShadow: isPending ? "none" : "0 0 20px rgba(212, 175, 55, 0.2), 0 0 40px rgba(0, 255, 255, 0.1)",
              cursor: isPending ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!isPending) {
                e.currentTarget.style.boxShadow = "0 0 30px rgba(212, 175, 55, 0.4), 0 0 60px rgba(0, 255, 255, 0.2)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isPending) {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(212, 175, 55, 0.2), 0 0 40px rgba(0, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                {/* Spinner minimalista */}
                <svg
                  className="animate-spin"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25" />
                  <path d="M12 3a9 9 0 019 9" strokeLinecap="round" />
                </svg>
                <span style={{ color: "rgba(212, 175, 55, 0.5)" }}>...</span>
              </span>
            ) : (
              t("submit")
            )}
          </button>
        </form>

        {/* Footer decorativo */}
        <p
          className="mt-6 text-center text-xs"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          UNBOUND · SOVEREIGN ACCESS PORT
        </p>
      </div>
    </main>
  );
}
