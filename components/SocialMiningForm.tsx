"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitSocialMining, type SocialMiningState } from "@/app/[locale]/dashboard/actions";

type SocialMiningFormProps = {
  userId: string;
  locale: string;
};

const initialState: SocialMiningState = {
  status: "idle",
  messageKey: null,
  submittedAt: null,
};

export default function SocialMiningForm({ userId, locale }: SocialMiningFormProps) {
  const t = useTranslations("dashboard");
  const tMining = useTranslations("dashboard.socialMining");

  const submitAction = submitSocialMining.bind(null, { userId, locale });
  const [state, formAction, isPending] = useActionState(submitAction, initialState);

  return (
    <section
      className="rounded-[28px] border p-6 sm:p-8 lg:col-span-2"
      style={{
        background: "rgba(255,255,255,0.04)",
        borderColor: "rgba(212, 175, 55, 0.35)",
        boxShadow: "0 28px 70px rgba(0,0,0,0.35)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
      aria-labelledby="social-mining-title"
    >
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.35em]" style={{ color: "#E9C85A" }}>
          {t("overviewLabel")}
        </p>
        <h2
          id="social-mining-title"
          className="mt-3 text-xl font-semibold tracking-[0.04em]"
          style={{ color: "#FFF7DA" }}
        >
          {tMining("title")}
        </h2>
        <p className="mt-2 text-sm leading-7" style={{ color: "rgba(255,255,255,0.82)" }}>
          {tMining("description")}
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        <label htmlFor="social-action" className="text-sm font-medium" style={{ color: "#F0F0F0" }}>
          {tMining("fieldLabel")}
        </label>
        <textarea
          id="social-action"
          name="actionDescription"
          required
          minLength={12}
          rows={5}
          placeholder={tMining("fieldPlaceholder")}
          className="w-full rounded-2xl px-4 py-3 text-sm outline-none transition-all duration-200"
          style={{
            color: "#F7F7F7",
            background: "rgba(0,0,0,0.45)",
            border: "1px solid rgba(212,175,55,0.32)",
          }}
        />

        <div className="flex flex-col items-start gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full border px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] transition-all duration-300"
            style={{
              borderColor: "#D4AF37",
              color: "#F4DB8A",
              background: "rgba(212,175,55,0.06)",
              boxShadow: isPending
                ? "0 0 22px rgba(0,255,255,0.65), 0 0 42px rgba(0,255,255,0.32)"
                : "none",
              cursor: isPending ? "wait" : "pointer",
              opacity: isPending ? 0.9 : 1,
            }}
          >
            {isPending ? tMining("buttonLoading") : tMining("button")}
          </button>

          <div aria-live="polite" className="text-sm" style={{ color: "#CFFBFF" }}>
            {state.messageKey ? tMining(state.messageKey) : null}
          </div>

          {state.submittedAt && (
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.62)" }}>
              {tMining("feedbackSubmittedAt")}: {new Date(state.submittedAt).toLocaleString(locale)}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
