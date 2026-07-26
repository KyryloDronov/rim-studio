import type { PageServiceKey } from "@/content/site-pages";

/** Default hero / service banner background clip. */
export const DEFAULT_HERO_BACKGROUND_VIDEO = "/video/video_pain_wheel.mp4";

/** Per-service banner videos — add entries as new clips land in `/public/video/`. */
export const SERVICE_HERO_BACKGROUND_VIDEOS: Partial<
  Record<PageServiceKey, string>
> = {
  caliperPainting: "/video/brake-caliper-painting.mp4",
};

export function getHeroBackgroundVideo(
  pageKey?: PageServiceKey,
): string {
  if (!pageKey) return DEFAULT_HERO_BACKGROUND_VIDEO;
  return (
    SERVICE_HERO_BACKGROUND_VIDEOS[pageKey] ?? DEFAULT_HERO_BACKGROUND_VIDEO
  );
}
