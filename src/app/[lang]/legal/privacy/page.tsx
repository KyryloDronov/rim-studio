import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary } from "@/i18n/dictionaries";
import { getSeoCopy } from "@/i18n/seo";
import { isLocale } from "@/i18n/types";
import { buildPageMetadata } from "@/lib/seo-metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/legal/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return buildPageMetadata(lang, "/legal/privacy", {
    seo: getSeoCopy(lang).privacy,
  });
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
