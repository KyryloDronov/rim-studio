import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import { getDictionary } from "@/i18n/dictionaries";
import { getSeoCopy } from "@/i18n/seo";
import { isLocale } from "@/i18n/types";
import { buildPageMetadata } from "@/lib/seo-metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return buildPageMetadata(lang, "/about", { seo: getSeoCopy(lang).about });
}

export default async function AboutPage({
  params,
}: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { pages } = getDictionary(lang);

  return <ContentPage title={pages.about.title} lead={pages.about.lead} />;
}
