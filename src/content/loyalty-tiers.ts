export const LOYALTY_TIER_ORDER = ["silver", "gold", "platinum"] as const;

export type LoyaltyTierId = (typeof LOYALTY_TIER_ORDER)[number];

/** DOM pool size — at least visible slots + 2 for seamless wrap. */
export const LOYALTY_POOL_MIN = 5;

/** Accent gradients per tier — visual only; copy lives in i18n. */
export const LOYALTY_TIER_THEME: Record<
  LoyaltyTierId,
  Readonly<{
    accent: string;
    glow: string;
    stripe: string;
  }>
> = {
  silver: {
    accent: "#a8b4c0",
    glow: "rgb(168 180 192 / 0.45)",
    stripe: "rgb(255 255 255 / 0.14)",
  },
  gold: {
    accent: "#ff9900",
    glow: "rgb(255 153 0 / 0.55)",
    stripe: "rgb(255 200 120 / 0.16)",
  },
  platinum: {
    accent: "#e8ecf0",
    glow: "rgb(232 236 240 / 0.35)",
    stripe: "rgb(255 255 255 / 0.2)",
  },
};
