/** PWA / favicon paths — assets live in `public/favicon/`. */
export const SITE_ICON_BASE = "/favicon";

export const SITE_BRAND_NAME = "Rim Studio";

/** Matches `--brand-ink-700` (browser chrome, splash). */
export const SITE_THEME_COLOR = "#191f24";

export const SITE_PWA_ICONS = [
  {
    src: `${SITE_ICON_BASE}/web-app-manifest-192x192.png`,
    sizes: "192x192",
    type: "image/png" as const,
  },
  {
    src: `${SITE_ICON_BASE}/web-app-manifest-512x512.png`,
    sizes: "512x512",
    type: "image/png" as const,
  },
] as const;
