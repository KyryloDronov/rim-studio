import type { Dictionary } from "@/i18n/types";

export type PricingTabId = keyof Dictionary["pricing"]["panels"];

/** Decorative product shots — one per tab when available. */
export const PRICING_TAB_BACKGROUNDS: Partial<
  Record<PricingTabId, Readonly<{ src: string }>>
> = {
  paint: { src: "/img/LH_Performante_Narvi_Forged_1.png" },
  repair: { src: "/img/RS_Brake_1.png" },
  tire: { src: "/img/GoodWay_Gale_F7_1.png" },
};
