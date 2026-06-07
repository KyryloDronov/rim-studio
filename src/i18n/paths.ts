import { DEFAULT_LOCALE, isLocale, type Locale } from "./types";

/**
 * Strips a leading locale segment from a pathname.
 * `"/ru/work"` → `"/work"`, `"/ru"` → `"/"`, `"/work"` → `"/work"`, `"/"` → `"/"`.
 */
export function stripLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

/**
 * Detects the active locale from a pathname.
 * Returns the locale segment if present (`/ru/foo` → `"ru"`),
 * `DEFAULT_LOCALE` for prefix-less paths (`/foo`, `/`).
 */
export function detectLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    return segments[0];
  }
  return DEFAULT_LOCALE;
}

/**
 * Builds a public URL pathname for a given locale.
 * Default locale (en): no prefix → `/`, `/work`.
 * Other locales: prefixed → `/ru`, `/ru/work`.
 */
export function localizedPath(locale: Locale, pathname: string): string {
  const clean = stripLocaleFromPath(pathname);
  if (locale === DEFAULT_LOCALE) {
    return clean;
  }
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}
