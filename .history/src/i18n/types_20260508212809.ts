export const LOCALES = ["en", "ru", "pl"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  pl: "PL",
};

export const LOCALE_NAME: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  pl: "Polski",
};

export type Dictionary = Readonly<{
  meta: Readonly<{
    title: string;
    description: string;
    siteName: string;
  }>;
  header: Readonly<{
    menu: string;
    close: string;
    contact: string;
  }>;
  menu: Readonly<{
    home: string;
    work: string;
    lab: string;
  }>;
  footer: Readonly<{
    marquee: string;
    address: string;
    columnAddress: string;
    columnSitemap: string;
    columnSocials: string;
    backToTop: string;
    copyright: string;
  }>;
}>;

/** BCP-47 codes for use in metadata (og:locale, hreflang, etc.). */
export const LOCALE_BCP47: Record<Locale, string> = {
  en: "en-US",
  ru: "ru-RU",
  pl: "pl-PL",
};

/** Open Graph format (e.g. en_US). */
export const LOCALE_OG: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
  pl: "pl_PL",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as ReadonlyArray<string>).includes(value);
}
