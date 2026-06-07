import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale-aware URL strategy:
 *   /            → rewrite to /ru   (URL stays as `/`)
 *   /ru          → 308 redirect to / (canonical normalisation)
 *   /ru/foo      → 308 redirect to /foo
 *   /pl          → pass through      (rendered as is)
 *   /pl/foo      → pass through
 *   /foo         → rewrite to /ru/foo (URL stays as `/foo`)
 *
 * We also propagate the resolved locale to the app via the `x-locale`
 * request header so the root server layout can render the correct
 * `<html lang>` on the very first response.
 *
 * SEO contract:
 * - Canonical for Russian = `/`
 * - Canonical for Polish  = `/pl`
 * - hreflang tags expose both (see app/[lang]/layout metadata).
 */

const SUPPORTED_LOCALES = ["ru", "pl"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
const DEFAULT_LOCALE: SupportedLocale = "ru";
const LOCALE_HEADER = "x-locale";

/**
 * File-like paths and SEO assets bypass locale routing entirely.
 */
function shouldBypass(pathname: string): boolean {
  return (
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/favicon.ico" ||
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

  /* /ru or /ru/foo → 308 redirect to canonical (no /ru prefix). */
  if (first === DEFAULT_LOCALE) {
    const rest = segments.slice(1).join("/");
    const url = request.nextUrl.clone();
    url.pathname = rest ? `/${rest}` : "/";
    return NextResponse.redirect(url, 308);
  }

  /* /pl, /pl/foo → pass through, just attach locale header. */
  if (
    first &&
    (SUPPORTED_LOCALES as ReadonlyArray<string>).includes(first) &&
    first !== DEFAULT_LOCALE
  ) {
    return NextResponse.next({
      request: { headers: withLocaleHeader(request, first as SupportedLocale) },
    });
  }

  /* /, /foo → internal rewrite to /ru, /ru/foo (URL bar unchanged). */
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
