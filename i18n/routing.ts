// Definizione del routing i18n: lingue supportate e lingua predefinita.
// Supporto RTL per l'arabo gestito nel layout tramite l'attributo dir.
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["it", "en", "es", "ar"],
  defaultLocale: "it",
});
