import type { PricingTabId } from "@/content/pricing-tabs";

export type BeforeAfterContentMode = "compare" | "gallery";

export type BeforeAfterCompareItem = Readonly<{
  id: string;
  beforeSrc: string;
  afterSrc: string;
}>;

export type BeforeAfterGalleryItem = Readonly<{
  id: string;
  src: string;
}>;

export type BeforeAfterTabCatalog = Readonly<{
  mode: BeforeAfterContentMode;
  compare?: ReadonlyArray<BeforeAfterCompareItem>;
  gallery?: ReadonlyArray<BeforeAfterGalleryItem>;
}>;

const COMPARE_PAIR_A = {
  beforeSrc: "/img/2.jpg",
  afterSrc: "/img/2-after.jpg",
} as const;

const COMPARE_PAIR_B = {
  beforeSrc: "/img/3.jpg",
  afterSrc: "/img/3-after.jpg",
} as const;

const CALIPER_PAINTING_PORTFOLIO = [
  "/portfolio/caliper-painting/12023d9d-de5d-4db9-ad44-0aec64791704.png",
  "/portfolio/caliper-painting/14052291-4965-48bf-b9aa-3c5248b893ea.png",
  "/portfolio/caliper-painting/2ba6027b-4271-461d-8adf-b255e600f148.png",
  "/portfolio/caliper-painting/322e1562-77f1-42e3-84b1-18392a4329e6.png",
  "/portfolio/caliper-painting/519eebc7-ce49-42c2-a9eb-6cf7b875fc68-2.png",
  "/portfolio/caliper-painting/56460b23-b2f5-4db7-8edc-42b43f697a71.png",
  "/portfolio/caliper-painting/a2735059-944f-4af9-a5ea-d821cb8ebef5.png",
  "/portfolio/caliper-painting/ab2c5e58-41c7-411b-b860-ddb330bd48b0.png",
  "/portfolio/caliper-painting/bdf78bb4-f2c5-4d80-9f8a-16825bda7a55-2.png",
  "/portfolio/caliper-painting/c5081bc4-0b42-4640-bcfa-662403b163e9.png",
  "/portfolio/caliper-painting/f29139ed-bcb2-46db-b7de-f0694b1ae715-2.png",
] as const;

const DIAMOND_GRINDING_PORTFOLIO = [
  "/portfolio/diamond-grinding/01.png",
  "/portfolio/diamond-grinding/02.png",
  "/portfolio/diamond-grinding/03.png",
  "/portfolio/diamond-grinding/04.png",
  "/portfolio/diamond-grinding/05.png",
] as const;

function compareItems(
  prefix: string,
  count: number,
): ReadonlyArray<BeforeAfterCompareItem> {
  return Array.from({ length: count }, (_, index) => {
    const pair = index % 2 === 0 ? COMPARE_PAIR_A : COMPARE_PAIR_B;
    const slot = String(index + 1).padStart(2, "0");
    return {
      id: `${prefix}-${slot}`,
      ...pair,
    };
  });
}

function galleryItems(
  prefix: string,
  sources: ReadonlyArray<string>,
): ReadonlyArray<BeforeAfterGalleryItem> {
  return sources.map((src, index) => ({
    id: `${prefix}-${String(index + 1).padStart(2, "0")}`,
    src,
  }));
}

/** Per-service media sets — demo assets until CMS wiring. */
export const BEFORE_AFTER_TAB_CATALOG: Record<PricingTabId, BeforeAfterTabCatalog> =
  {
    paint: {
      mode: "compare",
      compare: compareItems("paint", 8),
    },
    tire: {
      mode: "gallery",
      gallery: galleryItems("tire", [
        "/img/categories/Tire-service.png",
        "/img/GoodWay_Gale_F7_1.png",
        "/img/1-min.png.webp",
        "/img/5-min.png.webp",
        "/img/6-min.png.webp",
        "/img/LH_Performante_Narvi_Forged_1.png",
      ]),
    },
    repair: {
      mode: "compare",
      compare: compareItems("repair", 6),
    },
    caliper: {
      mode: "gallery",
      gallery: galleryItems("caliper", CALIPER_PAINTING_PORTFOLIO),
    },
    diamond: {
      mode: "gallery",
      gallery: galleryItems("diamond", DIAMOND_GRINDING_PORTFOLIO),
    },
    motorcycle: {
      mode: "gallery",
      gallery: galleryItems("moto", [
        "/img/categories/Painting-motorcycle-wheels -and-parts.png",
        "/img/3-min.png.webp",
        "/img/-min.png.webp",
        "/img/2-min.png.webp",
        "/img/RS_Brake_1.png",
        "/img/categories/Disc-repair.png",
      ]),
    },
    tig: {
      mode: "compare",
      compare: compareItems("tig", 6),
    },
  };

export function getBeforeAfterTabCatalog(
  tabId: PricingTabId,
): BeforeAfterTabCatalog {
  return BEFORE_AFTER_TAB_CATALOG[tabId];
}

export function getBeforeAfterTabMode(
  tabId: PricingTabId,
): BeforeAfterContentMode {
  return BEFORE_AFTER_TAB_CATALOG[tabId].mode;
}
