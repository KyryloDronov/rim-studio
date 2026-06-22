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

/** Decorative backgrounds per tab (demo assets). */
export const PRICING_TAB_BACKGROUNDS: Partial<
  Record<PricingTabId, Readonly<{ src: string }>>
> = {
  paint: { src: "/img/LH_Performante_Narvi_Forged_1.png" },
  repair: { src: "/img/RS_Brake_1.png" },
  diamond: { src: "/img/LH_Performante_Narvi_Forged_1.png" },
  tire: { src: "/img/GoodWay_Gale_F7_1.png" },
  caliper: { src: "/img/RS_Brake_1.png" },
  motorcycle: { src: "/img/3-min.png.webp" },
  tig: { src: "/img/-min.png.webp" },
};

/** Put `featured` first — for service pages where that tab should lead. */
export function resolvePricingTabOrder(
  featured?: PricingTabId,
): ReadonlyArray<PricingTabId> {
  if (!featured || !PRICING_TAB_ORDER.includes(featured)) {
    return PRICING_TAB_ORDER;
  }
  return [featured, ...PRICING_TAB_ORDER.filter((id) => id !== featured)];
}

/** Warm the browser cache before the crossfade (raw public path). */
export function preloadPricingTabBackground(tabId: PricingTabId): void {
  if (globalThis.window === undefined) return;
  const src = PRICING_TAB_BACKGROUNDS[tabId]?.src;
  if (!src) return;
  const img = new Image();
  img.src = src;
}
