/* Layout per il segmento [locale] — imposta lingua e direzione testo.
   Applica dir="rtl" per l'arabo (WCAG: struttura documento semantica). */
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Metadati localizzati per ogni lingua — titolo e descrizione dalla traduzione
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: `UNBOUND — ${t("tagline")}`,
    description: t("subheadline"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validazione locale: se non supportato viene mostrato il 404
  if (!routing.locales.includes(locale as "it" | "en" | "es" | "ar")) {
    notFound();
  }

  // Caricamento dei messaggi lato server per il locale corrente
  const messages = await getMessages();

  // Direzione testo: RTL per arabo, LTR per tutte le altre lingue
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className="bg-obsidian text-white min-h-screen antialiased">
        {/* Provider next-intl: rende le traduzioni disponibili ai Client Components */}
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
