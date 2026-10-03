/** Benefit tile ids — copy in i18n; images in `/public/img/advantages/`. */
export type BenefitCardId =
  | "prepayment"
  | "colors"
  | "warranty"
  | "storage"
  | "parking"
  | "experience";

export const BENEFITS_SIDE_LEFT: ReadonlyArray<BenefitCardId> = [
  "prepayment",
  "colors",
  "warranty",
];

export const BENEFITS_SIDE_RIGHT: ReadonlyArray<BenefitCardId> = [
  "storage",
  "parking",
  "experience",
];

/** Mobile carousel order (left column, then right). */
export const BENEFITS_CARD_ORDER: ReadonlyArray<BenefitCardId> = [
  ...BENEFITS_SIDE_LEFT,
  ...BENEFITS_SIDE_RIGHT,
];

export const BENEFITS_CARD_IMAGES: Record<BenefitCardId, string> = {
  prepayment: "/img/advantages/1.png",
  colors: "/img/advantages/2.png",
  warranty: "/img/advantages/3.png",
  storage: "/img/advantages/4.png",
  parking: "/img/advantages/5.png",
  experience: "/img/advantages/6.png",
};

/** Hero in the center column (wheels showcase). */
export const BENEFITS_CENTER_HERO_IMAGE = "/img/advantages/4.png";

export const BENEFITS_HUB_STEP_IDS = [
  "diagnostics",
  "agreement",
  "work",
  "result",
] as const;

export type BenefitsHubStepId = (typeof BENEFITS_HUB_STEP_IDS)[number];
