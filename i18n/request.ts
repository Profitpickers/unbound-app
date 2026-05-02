// Configurazione di next-intl per le richieste server-side.
// Carica i messaggi localizzati dal file common.json della lingua richiesta.
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Validazione del locale: se non supportato si usa il default (it)
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "it" | "en" | "es" | "ar")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}/common.json`)).default,
  };
});
