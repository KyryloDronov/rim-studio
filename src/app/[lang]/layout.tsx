import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedPath } from "@/i18n/paths";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALES,
  LOCALE_BCP47,
  LOCALE_OG,
} from "@/i18n/types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const canonical = localizedPath(lang, "/");

  /* hreflang map for the home page across all locales + x-default. */
  const languageAlternates = LOCALES.reduce<Record<string, string>>(
    (acc, code) => {
      acc[LOCALE_BCP47[code]] = localizedPath(code, "/");
      return acc;
    },
    { "x-default": localizedPath(DEFAULT_LOCALE, "/") },
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: `%s · ${dict.meta.siteName}`,
    },
    description: dict.meta.description,
    applicationName: dict.meta.siteName,
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      title: dict.meta.title,
      description: dict.meta.description,
      url: canonical,
      locale: LOCALE_OG[lang],
      alternateLocale: LOCALES.filter((code) => code !== lang).map(
        (code) => LOCALE_OG[code],
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
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
  return children;
}
