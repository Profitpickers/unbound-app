/* LanguageSwitcher — selettore lingua nella navbar.
   Usa il routing next-intl per cambiare locale mantenendo il percorso corrente.
   Accessibile: aria-label e focus-visible su ogni link. */
"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

type Language = {
  code: string;
  label: string;
  flag: string;
};

const LANGUAGES: Language[] = [
  { code: "it", label: "IT", flag: "🇮🇹" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "ar", label: "AR", flag: "🇸🇦" },
];

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();

  /**
   * Cambio locale: sostituisce il prefisso lingua nel pathname corrente.
   * Esempio: /it/about → /en/about
   */
  const handleLocaleChange = (newLocale: string) => {
    // Rimuove il prefisso locale corrente e aggiunge quello nuovo
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <nav
      aria-label={t("switchLang")}
      className="flex items-center gap-1"
    >
      {LANGUAGES.map((lang) => {
        const isActive = lang.code === currentLocale;
        return (
          <button
            key={lang.code}
            onClick={() => handleLocaleChange(lang.code)}
            aria-label={`${t("switchLang")}: ${lang.label}`}
            aria-current={isActive ? "true" : undefined}
            className={`
              flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium
              transition-all duration-200
              ${
                isActive
                  ? "text-gold border border-gold/50 bg-gold/10"
                  : "text-white/50 border border-transparent hover:text-white/80 hover:border-white/20"
              }
              focus-visible:outline-2 focus-visible:outline-gold
            `}
          >
            <span aria-hidden="true">{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
