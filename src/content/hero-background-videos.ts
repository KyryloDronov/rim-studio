import type { PageServiceKey } from "@/content/site-pages";

/** Home hero + default service banner when no dedicated clip exists. */
export const DEFAULT_HERO_BACKGROUND_VIDEO = "/video/wheel-painting.mp4";

/** Full-cover banner clips in `/public/video/` — one per service landing. */
export const SERVICE_HERO_BACKGROUND_VIDEOS: Record<
  PageServiceKey,
  string
> = {
  wheelPainting: "/video/wheel-painting.mp4",
  wheelRepair: "/video/wheel-repair.mp4",
  diamondCutting: "/video/diamond-cutting.mp4",
  tireMounting: "/video/tire-mounting.mp4",
  caliperPainting: "/video/caliper-painting.mp4",
  motorcycleWheelPainting: "/video/motorcycle-wheel-painting.mp4",
  tigWelding: "/video/tig-welding.mp4",
};

export function getHeroBackgroundVideo(
  pageKey?: PageServiceKey,
): string {
  if (!pageKey) return DEFAULT_HERO_BACKGROUND_VIDEO;
  return SERVICE_HERO_BACKGROUND_VIDEOS[pageKey] ?? DEFAULT_HERO_BACKGROUND_VIDEO;
}
