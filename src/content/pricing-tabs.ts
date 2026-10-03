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

/** Tabs shown in the pricing block (full set stays in i18n for later). */
export const PRICING_TAB_ORDER: ReadonlyArray<PricingTabId> = [
  "paint",
  "tire",
  "repair",
];

/** Visible tabs in «Примеры наших работ». */
export const BEFORE_AFTER_TAB_ORDER: ReadonlyArray<PricingTabId> = [
  "caliper",
  "diamond",
];

/** Hidden from examples UI for now — catalog / i18n unchanged. */
export const BEFORE_AFTER_HIDDEN_TABS: ReadonlyArray<PricingTabId> = [
  "paint",
  "tire",
  "repair",
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

function resolveTabOrder(
  order: ReadonlyArray<PricingTabId>,
  featured?: PricingTabId,
): ReadonlyArray<PricingTabId> {
  if (!featured || !order.includes(featured)) {
    return order;
  }
  return [featured, ...order.filter((id) => id !== featured)];
}

/** Put `featured` first — pricing section and service landings. */
export function resolvePricingTabOrder(
  featured?: PricingTabId,
): ReadonlyArray<PricingTabId> {
  return resolveTabOrder(PRICING_TAB_ORDER, featured);
}

/** Put `featured` first — before/after examples block. */
export function resolveBeforeAfterTabOrder(
  featured?: PricingTabId,
): ReadonlyArray<PricingTabId> {
  return resolveTabOrder(BEFORE_AFTER_TAB_ORDER, featured);
}

/** Selected tab when `featured` is hidden or missing from the examples bar. */
export function resolveBeforeAfterActiveTab(
  featured?: PricingTabId,
): PricingTabId {
  if (featured && BEFORE_AFTER_TAB_ORDER.includes(featured)) {
    return featured;
  }
  return BEFORE_AFTER_TAB_ORDER[0] ?? "paint";
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
