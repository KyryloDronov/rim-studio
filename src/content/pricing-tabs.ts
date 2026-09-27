import type { LucideIcon } from "lucide-react";
import {
  Bike,
  CircleDot,
  Disc,
  Flame,
  Gem,
  Paintbrush,
  Wrench,
} from "lucide-react";

import type { Dictionary } from "@/i18n/types";

export type PricingTabId = keyof Dictionary["pricing"]["panels"];

/** Default tab order on the home page. */
export const PRICING_TAB_ORDER: ReadonlyArray<PricingTabId> = [
  "paint",
  "tire",
  "repair",
  "caliper",
  "diamond",
  "motorcycle",
  "tig",
];

export const PRICING_TAB_ICONS: Record<PricingTabId, LucideIcon> = {
  paint: Paintbrush,
  repair: Wrench,
  diamond: Gem,
  tire: CircleDot,
  caliper: Disc,
  motorcycle: Bike,
  tig: Flame,
};

/** Ambient loop per pricing tab — category clips in `/public/img/categories/`. */
export const PRICING_TAB_VIDEOS: Record<
  PricingTabId,
  Readonly<{ src: string }>
> = {
  paint: { src: "/img/categories/Wheel -painting.mp4" },
  tire: { src: "/img/categories/Tire-service.mp4" },
  repair: { src: "/img/categories/Disc-repair.mp4" },
  caliper: { src: "/img/categories/Paintin_calipers.mp4" },
  diamond: { src: "/img/categories/Diamond-grinding-of-discs.mp4" },
  motorcycle: {
    src: "/img/categories/Painting-motorcycle-wheels -and-parts.mp4",
  },
  tig: { src: "/img/categories/Argon-arc-welding.mp4" },
};

/** @deprecated Alias — same paths as `PRICING_TAB_VIDEOS`. */
export const PRICING_TAB_BACKGROUNDS = PRICING_TAB_VIDEOS;

/** Put `featured` first — for service pages where that tab should lead. */
export function resolvePricingTabOrder(
  featured?: PricingTabId,
): ReadonlyArray<PricingTabId> {
  if (!featured || !PRICING_TAB_ORDER.includes(featured)) {
    return PRICING_TAB_ORDER;
  }
  return [featured, ...PRICING_TAB_ORDER.filter((id) => id !== featured)];
}

/** Warm the browser cache before the crossfade. */
export function preloadPricingTabBackground(tabId: PricingTabId): void {
  if (globalThis.window === undefined) return;
  const src = PRICING_TAB_VIDEOS[tabId]?.src;
  if (!src) return;
  const video = document.createElement("video");
  video.preload = "auto";
  video.muted = true;
  video.src = src;
  video.load();
}
