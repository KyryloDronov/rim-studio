import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES } from "@/content/site-pages";
import { localizedPath } from "@/i18n/paths";
import { LOCALES, LOCALE_BCP47, type Locale } from "@/i18n/types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.flatMap((route) =>
    LOCALES.map((locale: Locale) => {
      const path = localizedPath(locale, route);
      const alternates = LOCALES.reduce<Record<string, string>>(
        (acc, code) => {
          acc[LOCALE_BCP47[code]] = `${SITE_URL}${localizedPath(code, route)}`;
          return acc;
        },
        {},
      );
      return {
        url: `${SITE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "/" ? 1 : 0.7,
        alternates: { languages: alternates },
      } satisfies MetadataRoute.Sitemap[number];
    }),
  );
}
