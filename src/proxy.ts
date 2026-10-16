import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/types";

/**
 * Locale-aware URL strategy:
 *   /            → rewrite to /pl   (URL stays as `/`)
 *   /pl          → 308 redirect to / (canonical normalisation)
 *   /pl/foo      → 308 redirect to /foo
 *   /ru          → pass through      (rendered as is)
 *   /ru/foo      → pass through
 *   /foo         → rewrite to /pl/foo (URL stays as `/foo`)
 *
 * We also propagate the resolved locale to the app via the `x-locale`
 * request header so the root server layout can render the correct
 * `<html lang>` on the very first response.
 *
 * SEO contract:
 * - Canonical for Polish  = `/`
 * - Canonical for Russian = `/ru`
 * - hreflang tags expose both (see app/[lang]/layout metadata).
 */

const SUPPORTED_LOCALES = LOCALES;
type SupportedLocale = Locale;
const LOCALE_HEADER = "x-locale";

/**
 * File-like paths and SEO assets bypass locale routing entirely.
 */
function shouldBypass(pathname: string): boolean {
  return (
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/favicon.ico" ||
    pathname === "/manifest.webmanifest" ||
    pathname.startsWith("/favicon/") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    /\.[a-z0-9]+$/i.test(pathname)
  );
}

function withLocaleHeader(
  request: NextRequest,
  locale: SupportedLocale,
): Headers {
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, locale);
  return headers;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (shouldBypass(pathname)) return NextResponse.next();

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  /* /pl or /pl/foo → 308 redirect to canonical (no /pl prefix). */
  if (first === DEFAULT_LOCALE) {
    const rest = segments.slice(1).join("/");
    const url = request.nextUrl.clone();
    url.pathname = rest ? `/${rest}` : "/";
    return NextResponse.redirect(url, 308);
  }

  /* /ru, /ru/foo → pass through, just attach locale header. */
  if (
    first &&
    (SUPPORTED_LOCALES as ReadonlyArray<string>).includes(first) &&
    first !== DEFAULT_LOCALE
  ) {
    return NextResponse.next({
      request: { headers: withLocaleHeader(request, first as SupportedLocale) },
    });
  }

  /* /, /foo → internal rewrite to /pl, /pl/foo (URL bar unchanged). */
  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url, {
    request: { headers: withLocaleHeader(request, DEFAULT_LOCALE) },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
