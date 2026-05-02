/* Proxy UNBOUND — Protezione Perimetrale + i18n Routing.
   Catena: verifica cookie sessione su /dashboard → middleware next-intl.
   Qualsiasi accesso a /{locale}/dashboard senza cookie viene respinto
   al Sovereign Gate del locale corretto, senza esporre dati. */
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const DASHBOARD_SESSION_COOKIE = "unbound_dashboard_session";

// Corrisponde a /it/dashboard, /en/dashboard, ecc. (con o senza trailing slash / sub-path)
const DASHBOARD_RE = /^\/[a-z]{2}\/dashboard(\/|$)/;

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (DASHBOARD_RE.test(pathname)) {
    const session = request.cookies.get(DASHBOARD_SESSION_COOKIE)?.value;

    if (!session) {
      // Estrae il locale dal primo segmento del path e reindirizza al Gate
      const locale = pathname.split("/")[1] ?? routing.defaultLocale;
      const gateUrl = new URL(`/${locale}/auth/gate`, request.url);
      return NextResponse.redirect(gateUrl);
    }
  }

  // Per tutte le altre route (e per dashboard autenticata) passa all'i18n
  return intlMiddleware(request);
}

export const config = {
  // Corrisponde a tutti i percorsi eccetto file statici e route Next.js interne
  matcher: ["/((?!_next|.*\\..*).*)"],
};
