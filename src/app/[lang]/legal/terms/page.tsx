import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedPath } from "@/i18n/paths";
import { isLocale } from "@/i18n/types";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/legal/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { pages, meta } = getDictionary(lang);
  const title = pages.terms.title;

  return {
    title,
    description: pages.terms.lead,
    alternates: { canonical: localizedPath(lang, "/legal/terms") },
    openGraph: {
      title,
      description: pages.terms.lead,
      url: localizedPath(lang, "/legal/terms"),
      siteName: meta.siteName,
    },
    robots: { index: true, follow: true },
  };
}

export default async function TermsPage({
  params,
}: PageProps<"/[lang]/legal/terms">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { pages, footer } = getDictionary(lang);

  return (
    <LegalPage
      locale={lang}
      copy={pages.terms}
      backLabel={pages.terms.backToHome}
      currentDoc="terms"
      docNav={footer.legalLinks}
    />
  );
}
