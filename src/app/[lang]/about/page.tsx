import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedPath } from "@/i18n/paths";
import { isLocale } from "@/i18n/types";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { pages, meta } = getDictionary(lang);
  const title = pages.about.title;

  return {
    title,
    description: pages.about.lead,
    alternates: { canonical: localizedPath(lang, "/about") },
    openGraph: {
      title,
      description: pages.about.lead,
      url: localizedPath(lang, "/about"),
      siteName: meta.siteName,
    },
  };
}

export default async function AboutPage({
  params,
}: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { pages } = getDictionary(lang);

  return <ContentPage title={pages.about.title} lead={pages.about.lead} />;
}
