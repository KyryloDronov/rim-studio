import type { Metadata } from "next";
import { localizedPath } from "@/i18n/paths";
import type { SeoPageCopy } from "@/i18n/seo/types";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_BCP47,
  LOCALE_OG,
  type Locale,
} from "@/i18n/types";

type BuildPageMetadataOptions = Readonly<{
  seo: SeoPageCopy;
  robots?: Metadata["robots"];
  openGraphType?: "website" | "article";
}>;

/** Canonical path + hreflang alternates for a public route. */
export function buildLanguageAlternates(
  pathname: string,
): Record<string, string> {
  return LOCALES.reduce<Record<string, string>>(
    (acc, code) => {
      acc[LOCALE_BCP47[code]] = localizedPath(code, pathname);
      return acc;
    },
    { "x-default": localizedPath(DEFAULT_LOCALE, pathname) },
  );
}

export function buildPageMetadata(
  locale: Locale,
  pathname: string,
  { seo, robots, openGraphType = "website" }: BuildPageMetadataOptions,
): Metadata {
  const canonicalPath = localizedPath(locale, pathname);
  const { title, description, keywords } = seo;

  return {
    title,
    description,
    keywords: [...keywords],
    alternates: {
      canonical: canonicalPath,
      languages: buildLanguageAlternates(pathname),
    },
    openGraph: {
      type: openGraphType,
      title,
      description,
      url: canonicalPath,
      locale: LOCALE_OG[locale],
      alternateLocale: LOCALES.filter((code) => code !== locale).map(
        (code) => LOCALE_OG[code],
      ),
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: robots ?? { index: true, follow: true },
    other: {
      "geo.region": "PL-MZ",
      "geo.placename": "Warszawa",
    },
  };
}
