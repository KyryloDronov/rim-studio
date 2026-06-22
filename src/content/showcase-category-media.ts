import type { PageServiceKey } from "@/content/site-pages";

export type ShowcaseCategoryMedia = Readonly<{
  image: string;
  video: string;
  videoReverse: string;
}>;

function reverseVideoSrc(forwardSrc: string): string {
  return forwardSrc.replace(/\.mp4$/i, ".reverse.mp4");
}

/** Poster + hover video for the services interlinking carousel. */
export const SHOWCASE_CATEGORY_MEDIA = {
  wheelPainting: {
    image: "/img/categories/Wheel -painting.png",
    video: "/img/categories/Wheel -painting.mp4",
    videoReverse: reverseVideoSrc("/img/categories/Wheel -painting.mp4"),
  },
  wheelRepair: {
    image: "/img/categories/Disc-repair.png",
    video: "/img/categories/Disc-repair.mp4",
    videoReverse: reverseVideoSrc("/img/categories/Disc-repair.mp4"),
  },
  diamondCutting: {
    image: "/img/categories/Diamond-grinding-of-discs.png",
    video: "/img/categories/Diamond-grinding-of-discs.mp4",
    videoReverse: reverseVideoSrc("/img/categories/Diamond-grinding-of-discs.mp4"),
  },
  tireMounting: {
    image: "/img/categories/Tire-service.png",
    video: "/img/categories/Tire-service.mp4",
    videoReverse: reverseVideoSrc("/img/categories/Tire-service.mp4"),
  },
  caliperPainting: {
    image: "/img/categories/Paintin_calipers.png",
    video: "/img/categories/Paintin_calipers.mp4",
    videoReverse: reverseVideoSrc("/img/categories/Paintin_calipers.mp4"),
  },
  motorcycleWheelPainting: {
    image: "/img/categories/Painting-motorcycle-wheels -and-parts.png",
    video: "/img/categories/Painting-motorcycle-wheels -and-parts.mp4",
    videoReverse: reverseVideoSrc(
      "/img/categories/Painting-motorcycle-wheels -and-parts.mp4",
    ),
  },
  tigWelding: {
    image: "/img/categories/Argon-arc-welding.png",
    video: "/img/categories/Argon-arc-welding.mp4",
    videoReverse: reverseVideoSrc("/img/categories/Argon-arc-welding.mp4"),
  },
} as const satisfies Record<PageServiceKey, ShowcaseCategoryMedia>;

export function getShowcaseCategoryMedia(
  pageKey: PageServiceKey,
): ShowcaseCategoryMedia {
  return SHOWCASE_CATEGORY_MEDIA[pageKey];
}
