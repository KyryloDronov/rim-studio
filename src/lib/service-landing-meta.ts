import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PageServiceKey } from "@/content/site-pages";
import { getSeoCopy } from "@/i18n/seo";
import { isLocale } from "@/i18n/types";
import { buildPageMetadata } from "@/lib/seo-metadata";

export async function buildServiceLandingMetadata(
  lang: string,
  pageKey: PageServiceKey,
  pathname: string,
): Promise<Metadata> {
  if (!isLocale(lang)) notFound();

  const seo = getSeoCopy(lang).services[pageKey];

  return buildPageMetadata(lang, pathname, { seo });
}
