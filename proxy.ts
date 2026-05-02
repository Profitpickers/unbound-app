// Proxy next-intl: gestisce il routing internazionalizzato.
// Intercetta ogni richiesta e reindirizza al percorso con il prefisso locale corretto.
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Corrisponde a tutti i percorsi eccetto file statici e route Next.js interne
  matcher: ["/((?!_next|.*\\..*).*)"],
};
