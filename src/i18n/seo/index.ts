import type { Locale } from "@/i18n/types";
import { seoPl } from "./pl";
import { seoRu } from "./ru";
import type { SeoCopy } from "./types";

const SEO_BY_LOCALE: Record<Locale, SeoCopy> = {
  pl: seoPl,
  ru: seoRu,
};

export function getSeoCopy(locale: Locale): SeoCopy {
  return SEO_BY_LOCALE[locale];
}

export type { SeoCopy, SeoPageCopy } from "./types";
