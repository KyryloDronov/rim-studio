import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteJsonLd } from "@/components/Seo/SiteJsonLd";
import { getPublicSiteUrl } from "@/content/studio-location";
import { getDictionary } from "@/i18n/dictionaries";
import { getSeoCopy } from "@/i18n/seo";
import { isLocale, LOCALES } from "@/i18n/types";

const SITE_URL = getPublicSiteUrl();

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const homeSeo = getSeoCopy(lang).home;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: homeSeo.title,
      template: `%s · ${dict.meta.siteName}`,
    },
    description: homeSeo.description,
    applicationName: dict.meta.siteName,
    creator: dict.meta.siteName,
    publisher: dict.meta.siteName,
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

/**
 * Locale-segment layout: only handles SEO metadata + locale validation.
 * The real `<html>`/`<body>` and the persistent `SiteShell` live in the
 * root `app/layout.tsx`, one level above this dynamic segment, so that
 * navigating between locales does NOT remount the client tree.
 */
export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <>
      <SiteJsonLd locale={lang} />
      {children}
    </>
  );
}
