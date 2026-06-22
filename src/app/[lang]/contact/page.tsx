import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedPath } from "@/i18n/paths";
import { isLocale } from "@/i18n/types";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { pages, meta } = getDictionary(lang);
  const title = pages.contact.title;

  return {
    title,
    description: pages.contact.lead,
    alternates: { canonical: localizedPath(lang, "/contact") },
    openGraph: {
      title,
      description: pages.contact.lead,
      url: localizedPath(lang, "/contact"),
      siteName: meta.siteName,
    },
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { pages } = getDictionary(lang);

  return <ContentPage title={pages.contact.title} lead={pages.contact.lead} />;
}
