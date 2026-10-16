import type { MetadataRoute } from "next";
import {
  SITE_BRAND_NAME,
  SITE_PWA_ICONS,
  SITE_THEME_COLOR,
} from "@/content/site-brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_BRAND_NAME,
    short_name: SITE_BRAND_NAME,
    description:
      "Lakierowanie i renowacja felg w Warszawie — Rim Studio, Pruszków.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: SITE_THEME_COLOR,
    background_color: SITE_THEME_COLOR,
    icons: SITE_PWA_ICONS.flatMap(({ src, sizes, type }) => [
      { src, sizes, type, purpose: "any" },
      { src, sizes, type, purpose: "maskable" },
    ]),
  };
}
