import type { MetadataRoute } from "next";
import { getPublicSiteUrl } from "@/content/studio-location";

const SITE_URL = getPublicSiteUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
