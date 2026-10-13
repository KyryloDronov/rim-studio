import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedPath } from "@/i18n/paths";
import { isLocale } from "@/i18n/types";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/legal/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { pages, meta } = getDictionary(lang);
  const title = pages.privacy.title;

  return {
    title,
    description: pages.privacy.lead,
    alternates: { canonical: localizedPath(lang, "/legal/privacy") },
    openGraph: {
      title,
      description: pages.privacy.lead,
      url: localizedPath(lang, "/legal/privacy"),
      siteName: meta.siteName,
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/legal/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { pages, footer } = getDictionary(lang);

  return (
    <LegalPage
      locale={lang}
      copy={pages.privacy}
      backLabel={pages.privacy.backToHome}
      currentDoc="privacy"
      docNav={footer.legalLinks}
    />
  );
}
