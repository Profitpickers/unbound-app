// Configurazione Next.js con supporto internazionalizzazione next-intl.
// Il plugin next-intl abilita il routing per locale e il server rendering delle traduzioni.
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
