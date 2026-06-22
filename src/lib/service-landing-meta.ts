import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PageServiceKey } from "@/content/site-pages";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedPath } from "@/i18n/paths";
import { isLocale } from "@/i18n/types";

export async function buildServiceLandingMetadata(
  lang: string,
  pageKey: PageServiceKey,
  pathname: string,
): Promise<Metadata> {
  if (!isLocale(lang)) notFound();

  const { pages, meta } = getDictionary(lang);
  const copy = pages.services[pageKey];

  return {
    title: copy.title,
    description: copy.lead,
    alternates: { canonical: localizedPath(lang, pathname) },
    openGraph: {
      title: copy.title,
      description: copy.lead,
      url: localizedPath(lang, pathname),
      siteName: meta.siteName,
    },
  };
}
