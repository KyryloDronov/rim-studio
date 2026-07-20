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
      mode: "compare",
      compare: compareItems("caliper", 6),
    },
    diamond: {
      mode: "compare",
      compare: compareItems("diamond", 6),
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
