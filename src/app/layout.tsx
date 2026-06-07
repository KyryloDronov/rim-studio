import { headers } from "next/headers";
import { SiteShell } from "@/components/SiteShell";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_BCP47,
  type Locale,
} from "@/i18n/types";
import "./globals.css";

/**
 * Real root layout. Lives ABOVE the [lang] dynamic segment so that the
 * client tree (Header, Menu, Preloader, motion state, GSAP scroll bindings)
 * is **not** remounted when the user switches language. Locale changes are
 * propagated through `LocaleProvider` inside `SiteShell` via `usePathname`.
 *
 * On the server we still need to emit a correct `<html lang>` for the very
 * first response (good for crawlers, screen readers, the browser UA). We
 * rely on the `x-locale` request header injected by `proxy.ts`.
 */
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headerStore = await headers();
  const headerLocale = headerStore.get("x-locale");
  const lang: Locale =
    headerLocale && isLocale(headerLocale) ? headerLocale : DEFAULT_LOCALE;

  return (
    /* `data-scroll-behavior="smooth"` tells the Next.js router to skip
       CSS smooth-scroll on route transitions. Lenis handles wheel/touch
       smoothing in JS — anchor links remain smooth via `anchors: true`
       in the Lenis options (see SmoothScroll). */
    <html lang={LOCALE_BCP47[lang]} data-scroll-behavior="smooth">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
