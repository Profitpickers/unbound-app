/* HeroSection — sezione principale della landing page UNBOUND.
   Palette: sfondo obsidian, headline in gold, CTA con hover cyan.
   Tutti i testi provengono da common.json (chiavi hero.*). */
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden"
      aria-label={t("headline")}
    >
      {/* Decorazione di sfondo: glow centrale sottile */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-cyan-pulse/5 blur-2xl" />
      </div>

      {/* Contenuto hero */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        {/* Tagline sopra il titolo */}
        <p className="text-cyan-pulse text-sm font-medium tracking-[0.3em] uppercase">
          {t("tagline")}
        </p>

        {/* Headline principale — accento gold, ampio impatto visivo */}
        <h1 className="text-5xl md:text-7xl font-bold text-gold leading-tight tracking-tight">
          {t("headline")}
        </h1>

        {/* Sottotitolo — bianco semi-trasparente */}
        <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          {t("subheadline")}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          {/* CTA primario: bordo gold, hover con glow cyan */}
          <Link
            href="#roadmap"
            className="
              inline-flex items-center justify-center
              px-8 py-3 rounded
              border border-gold text-gold font-semibold
              bg-transparent
              transition-all duration-300
              hover:bg-gold/10 hover:border-cyan-pulse hover:text-cyan-pulse
              hover:shadow-[0_0_20px_rgba(0,255,255,0.25)]
              focus-visible:outline-2 focus-visible:outline-gold
            "
          >
            {t("cta")}
          </Link>

          {/* CTA secondario: muted, ancora senza destinazione specifica */}
          <button
            type="button"
            className="
              inline-flex items-center justify-center
              px-8 py-3 rounded
              border border-white/20 text-white/60 font-medium
              bg-transparent cursor-default
              transition-all duration-300
              hover:border-white/40 hover:text-white/90
              focus-visible:outline-2 focus-visible:outline-gold
            "
          >
            {t("ctaSecondary")}
          </button>
        </div>
      </div>

      {/* Freccia scroll-down accessibile */}
      <a
        href="#roadmap"
        aria-label="Scroll verso la roadmap"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 hover:text-gold transition-colors duration-300 animate-bounce"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
