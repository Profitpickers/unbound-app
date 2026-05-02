import { getTranslations } from "next-intl/server";
import SocialMiningForm from "@/components/SocialMiningForm";
import { getAuthenticatedMember, logout } from "../auth/gate/actions";

type DashboardPageProps = {
  params: Promise<{ locale: string }>;
};

function formatLiberBalance(locale: string, value: number | string | null) {
  const numericValue = typeof value === "number" ? value : Number(value ?? 0);

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(numericValue) ? numericValue : 0);
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard" });
  const member = await getAuthenticatedMember(locale);
  const liberBalance = formatLiberBalance(locale, member.liber_balance);
  const logoutWithLocale = logout.bind(null, locale);

  return (
    <main
      className="min-h-screen px-4 py-10 sm:px-6 lg:px-10"
      style={{
        backgroundColor: "#121212",
        color: "#F5F5F5",
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header
          className="rounded-[28px] border px-6 py-8 sm:px-8"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
            borderColor: "rgba(212, 175, 55, 0.45)",
            boxShadow: "0 0 0 1px rgba(212, 175, 55, 0.08), 0 32px 80px rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
          }}
        >
          <p
            className="text-xs uppercase tracking-[0.4em]"
            style={{ color: "#F1D781" }}
          >
            {t("eyebrow")}
          </p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1
                className="text-3xl font-semibold tracking-[0.02em] sm:text-5xl"
                style={{ color: "#FFF7DA" }}
              >
                {t("title")}
              </h1>
              <p
                className="mt-3 max-w-2xl text-sm leading-7 sm:text-base"
                style={{ color: "rgba(255,255,255,0.88)" }}
              >
                {t("subtitle")}
              </p>
            </div>

            <div className="flex items-center gap-3 self-start">
              {/* Badge connessione */}
              <div
                className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm"
                style={{
                  borderColor: "rgba(0,255,255,0.5)",
                  background: "rgba(0,255,255,0.08)",
                  color: "#DDFEFF",
                }}
                aria-label={t("connectionStatus")}
              >
                <span className="relative flex h-3 w-3" aria-hidden="true">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full animate-ping"
                    style={{ backgroundColor: "rgba(0,255,255,0.7)" }}
                  />
                  <span
                    className="relative inline-flex h-3 w-3 rounded-full"
                    style={{ backgroundColor: "#00FFFF", boxShadow: "0 0 18px rgba(0,255,255,0.9)" }}
                  />
                </span>
                <span>{t("connectionStatus")}</span>
              </div>

              {/* Logout */}
              <form action={logoutWithLocale}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium uppercase tracking-[0.22em] transition-colors duration-200 hover:border-gold hover:bg-gold/10"
                  style={{
                    borderColor: "rgba(212,175,55,0.4)",
                    background: "rgba(212,175,55,0.06)",
                    color: "#E9C85A",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  {t("logout")}
                </button>
              </form>
            </div>
          </div>
        </header>

        <section
          aria-label={t("overviewLabel")}
          className="grid gap-6 lg:grid-cols-2"
        >
          {/* ── Wallet: Riserva Energetica Sovrana ─────────────────── */}
          <section
            className="relative overflow-hidden rounded-[28px] border p-8 sm:p-10 lg:col-span-2"
            style={{
              background: "rgba(0,255,255,0.025)",
              borderColor: "rgba(0,255,255,0.38)",
              boxShadow:
                "0 0 0 1px rgba(0,255,255,0.07), 0 40px 100px rgba(0,0,0,0.45), inset 0 1px 0 rgba(0,255,255,0.12)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Aura pulsante di sfondo — radial-gradient animata */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="animate-pulse absolute left-1/2 top-1/2 h-[480px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(0,255,255,0.22) 0%, rgba(0,255,255,0.06) 45%, transparent 72%)",
                }}
              />
            </div>

            <div className="relative z-10">
              {/* Header widget */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.45em]"
                    style={{ color: "#7EFFFF" }}
                  >
                    {t("energyTitle")}
                  </p>
                  <p
                    className="mt-2 max-w-md text-sm leading-6"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {t("energyDescription")}
                  </p>
                </div>

                {/* Icona LIBER */}
                <div
                  className="flex-shrink-0 rounded-full p-3"
                  style={{
                    border: "1px solid rgba(0,255,255,0.35)",
                    background: "rgba(0,255,255,0.08)",
                  }}
                  aria-hidden="true"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00FFFF"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
              </div>

              {/* Numero saldo — monumentale */}
              <div className="mt-8 flex flex-wrap items-end gap-x-5 gap-y-2">
                <span
                  className="text-7xl font-semibold leading-none tracking-[-0.01em] sm:text-8xl lg:text-9xl"
                  style={{
                    color: "#E8FFFF",
                    textShadow:
                      "0 0 18px rgba(0,255,255,0.9), 0 0 55px rgba(0,255,255,0.45), 0 0 110px rgba(0,255,255,0.18)",
                  }}
                >
                  {liberBalance}
                </span>
                <span
                  className="pb-3 text-base font-medium uppercase tracking-[0.5em]"
                  style={{ color: "#7EFFFF" }}
                >
                  {t("energyUnit")}
                </span>
              </div>

              {/* Separatore decorativo cyan */}
              <div
                className="mt-8 h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,255,255,0.55) 0%, rgba(0,255,255,0.12) 55%, transparent 100%)",
                }}
                aria-hidden="true"
              />
              <p
                className="mt-4 text-xs uppercase tracking-[0.42em]"
                style={{ color: "rgba(0,255,255,0.42)" }}
              >
                LIBER · SOVEREIGN ENERGY CIRCUIT
              </p>
            </div>
          </section>

          {/* ── Social Mining Module ───────────────────────────────── */}
          <SocialMiningForm userId={member.member_id} locale={locale} />

          {/* ── Identità Sovrana ────────────────────────────────────── */}
          <section
            className="rounded-[28px] border p-6 sm:p-8"
            style={{
              background: "rgba(255,255,255,0.045)",
              borderColor: "rgba(212, 175, 55, 0.4)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <h2 className="text-sm uppercase tracking-[0.3em]" style={{ color: "#E9C85A" }}>
              {t("identityTitle")}
            </h2>
            <p className="mt-4 text-sm leading-7" style={{ color: "rgba(255,255,255,0.88)" }}>
              {t("identityDescription")}
            </p>

            <dl className="mt-8 space-y-6">
              <div>
                <dt className="text-xs uppercase tracking-[0.32em]" style={{ color: "rgba(255,255,255,0.72)" }}>
                  {t("memberId")}
                </dt>
                <dd className="mt-2 text-lg font-medium tracking-[0.18em]" style={{ color: "#FFFFFF" }}>
                  {member.member_id}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.32em]" style={{ color: "rgba(255,255,255,0.72)" }}>
                  {t("role")}
                </dt>
                <dd className="mt-2 text-lg font-medium" style={{ color: "#FFFFFF" }}>
                  {member.role ?? "Sovereign"}
                </dd>
              </div>
            </dl>
          </section>

          {/* ── Stato Connessione ───────────────────────────────────── */}
          <section
            className="rounded-[28px] border p-6 sm:p-8"
            style={{
              background: "rgba(255,255,255,0.045)",
              borderColor: "rgba(212, 175, 55, 0.4)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <h2 className="text-sm uppercase tracking-[0.3em]" style={{ color: "#E9C85A" }}>
              {t("connectionTitle")}
            </h2>
            <p className="mt-4 text-sm leading-7" style={{ color: "rgba(255,255,255,0.88)" }}>
              {t("connectionDescription")}
            </p>

            <div
              className="mt-10 rounded-3xl border px-5 py-6"
              style={{
                borderColor: "rgba(0,255,255,0.45)",
                background:
                  "radial-gradient(circle at center, rgba(0,255,255,0.16) 0%, rgba(0,255,255,0.03) 58%, rgba(0,0,0,0.14) 100%)",
              }}
            >
              <div className="flex items-center gap-4">
                <span className="relative flex h-4 w-4" aria-hidden="true">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full animate-ping"
                    style={{ backgroundColor: "rgba(0,255,255,0.7)" }}
                  />
                  <span
                    className="relative inline-flex h-4 w-4 rounded-full"
                    style={{ backgroundColor: "#00FFFF", boxShadow: "0 0 24px rgba(0,255,255,0.9)" }}
                  />
                </span>
                <p className="text-base font-medium" style={{ color: "#E9FFFF" }}>
                  {t("connectionStatus")}
                </p>
              </div>
              <p className="mt-6 text-xs uppercase tracking-[0.35em]" style={{ color: "rgba(255,255,255,0.68)" }}>
                {t("welcome")}
              </p>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}