import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary } from "@/i18n/dictionaries";
import { getSeoCopy } from "@/i18n/seo";
import { isLocale } from "@/i18n/types";
import { buildPageMetadata } from "@/lib/seo-metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/legal/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return buildPageMetadata(lang, "/legal/terms", {
    seo: getSeoCopy(lang).terms,
  });
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
