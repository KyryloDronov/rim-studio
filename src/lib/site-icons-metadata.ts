import type { Metadata } from "next";
import {
  SITE_BRAND_NAME,
  SITE_ICON_BASE,
  SITE_THEME_COLOR,
} from "@/content/site-brand";

const FAVICON = `${SITE_ICON_BASE}/favicon.ico`;

/** Shared favicon / PWA icon metadata for the root layout. */
export const siteIconsMetadata: Metadata = {
  icons: {
    icon: [
      { url: FAVICON, sizes: "48x48" },
      { url: `${SITE_ICON_BASE}/icon1.png`, type: "image/png", sizes: "96x96" },
      { url: `${SITE_ICON_BASE}/icon0.svg`, type: "image/svg+xml" },
    ],
    shortcut: FAVICON,
    apple: [
      {
        url: `${SITE_ICON_BASE}/apple-icon.png`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: SITE_BRAND_NAME,
    statusBarStyle: "black-translucent",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": SITE_THEME_COLOR,
  },
};
