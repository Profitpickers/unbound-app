/* RoadmapSection — sezione Roadmap posizionata subito sotto l'HeroSection.
   Layout: griglia 2×2 (desktop) / 1 colonna (mobile).
   Tutti i testi vengono da common.json (chiavi roadmap.*). */
import { useTranslations } from "next-intl";
import MilestoneCard from "./MilestoneCard";

// Chiavi delle milestone definite nel file common.json
const MILESTONE_KEYS = [
  "milestone1",
  "milestone2",
  "milestone3",
  "milestone4",
] as const;

type MilestoneKey = (typeof MILESTONE_KEYS)[number];
type MilestoneStatus = "completed" | "inProgress" | "upcoming";

export default function RoadmapSection() {
  const t = useTranslations("roadmap");

  return (
    <section
      id="roadmap"
      className="relative px-6 py-24 max-w-6xl mx-auto"
      aria-labelledby="roadmap-heading"
    >
      {/* Decorazione sfondo sottile */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-gold/30" />
      </div>

      {/* Intestazione sezione */}
      <div className="text-center mb-14 space-y-4">
        {/* Titolo sezione in gold */}
        <h2
          id="roadmap-heading"
          className="text-3xl md:text-4xl font-bold text-gold tracking-tight"
        >
          {t("sectionTitle")}
        </h2>

        {/* Sottotitolo */}
        <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {t("sectionSubtitle")}
        </p>

        {/* Linea decorativa sotto il titolo */}
        <div className="flex justify-center pt-2" aria-hidden="true">
          <span className="block w-16 h-px bg-gold/50" />
        </div>
      </div>

      {/* Griglia milestone: 2 colonne su desktop, 1 su mobile */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        role="list"
        aria-label={t("sectionTitle")}
      >
        {MILESTONE_KEYS.map((key: MilestoneKey) => {
          const status = t(`${key}.status`) as MilestoneStatus;

          return (
            <div key={key} role="listitem">
              <MilestoneCard
                label={t(`${key}.label`)}
                title={t(`${key}.title`)}
                desc={t(`${key}.desc`)}
                status={status}
                statusLabel={t(`status.${status}`)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
