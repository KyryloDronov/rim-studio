import type { PageServiceKey } from "@/content/site-pages";

export type ShowcaseCategoryMedia = Readonly<{
  image: string;
  video: string;
  videoReverse: string;
}>;

/** Poster (frame 0) + forward/reverse hover clips — all under `/public/video/`. */
export const SHOWCASE_CATEGORY_MEDIA = {
  wheelPainting: {
    image: "/video/wheel-painting.poster.jpg",
    video: "/video/wheel-painting.mp4",
    videoReverse: "/video/wheel-painting.reverse.mp4",
  },
  wheelRepair: {
    image: "/video/wheel-repair.poster.jpg",
    video: "/video/wheel-repair.mp4",
    videoReverse: "/video/wheel-repair.reverse.mp4",
  },
  diamondCutting: {
    image: "/video/diamond-cutting.poster.jpg",
    video: "/video/diamond-cutting.mp4",
    videoReverse: "/video/diamond-cutting.reverse.mp4",
  },
  tireMounting: {
    image: "/video/tire-mounting.poster.jpg",
    video: "/video/tire-mounting.mp4",
    videoReverse: "/video/tire-mounting.reverse.mp4",
  },
  caliperPainting: {
    image: "/video/caliper-painting.poster.jpg",
    video: "/video/caliper-painting.mp4",
    videoReverse: "/video/caliper-painting.reverse.mp4",
  },
  motorcycleWheelPainting: {
    image: "/video/motorcycle-wheel-painting.poster.jpg",
    video: "/video/motorcycle-wheel-painting.mp4",
    videoReverse: "/video/motorcycle-wheel-painting.reverse.mp4",
  },
  tigWelding: {
    image: "/video/tig-welding.poster.jpg",
    video: "/video/tig-welding.mp4",
    videoReverse: "/video/tig-welding.reverse.mp4",
  },
} as const satisfies Record<PageServiceKey, ShowcaseCategoryMedia>;

export function getShowcaseCategoryMedia(
  pageKey: PageServiceKey,
): ShowcaseCategoryMedia {
  return SHOWCASE_CATEGORY_MEDIA[pageKey];
}
