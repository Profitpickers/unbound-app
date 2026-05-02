/* MilestoneCard — card glass per ogni milestone della roadmap.
   Bordo gold, sfondo traslucido, badge di stato con colore semantico.
   Hover con glow cyan per feedback visivo interattivo. */

type MilestoneStatus = "completed" | "inProgress" | "upcoming";

type MilestoneCardProps = {
  /** Etichetta del mese/periodo (es. "Mese 1") */
  label: string;
  /** Titolo della milestone */
  title: string;
  /** Descrizione estesa della milestone */
  desc: string;
  /** Stato della milestone */
  status: MilestoneStatus;
  /** Testo localizzato del badge di stato */
  statusLabel: string;
};

/** Mappa stato → classi Tailwind per il badge colore semantico */
const statusStyles: Record<MilestoneStatus, string> = {
  completed:
    "bg-gold/20 text-gold border border-gold/40",
  inProgress:
    "bg-cyan-pulse/10 text-cyan-pulse border border-cyan-pulse/40",
  upcoming:
    "bg-white/5 text-white/50 border border-white/20",
};

export default function MilestoneCard({
  label,
  title,
  desc,
  status,
  statusLabel,
}: MilestoneCardProps) {
  return (
    <article
      className="
        group relative flex flex-col gap-4 p-6 rounded-lg
        bg-white/5 backdrop-blur-sm
        border border-gold/40
        transition-all duration-300
        hover:border-cyan-pulse/60
        hover:shadow-[0_0_30px_rgba(0,255,255,0.12)]
        hover:bg-white/8
      "
    >
      {/* Intestazione card: label mese + badge stato */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {/* Label mese in cyan */}
        <span className="text-cyan-pulse text-xs font-semibold tracking-[0.2em] uppercase">
          {label}
        </span>

        {/* Badge stato con colore semantico */}
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyles[status]}`}
          aria-label={statusLabel}
        >
          {statusLabel}
        </span>
      </div>

      {/* Titolo milestone in gold */}
      <h3 className="text-gold font-semibold text-lg leading-snug">
        {title}
      </h3>

      {/* Descrizione in bianco semi-trasparente */}
      <p className="text-white/65 text-sm leading-relaxed flex-1">
        {desc}
      </p>

      {/* Linea decorativa in fondo: si illumina al hover */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 bg-cyan-pulse/60 rounded-full transition-all duration-500 group-hover:w-full"
        aria-hidden="true"
      />
    </article>
  );
}
