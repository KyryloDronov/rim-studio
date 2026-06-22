/** Benefit tile ids — copy in i18n; center column uses video instead of image. */
export type BenefitCardId =
  | "warranty"
  | "prepayment"
  | "parking"
  | "colors"
  | "storage"
  | "equipment"
  | "dimet";

/** Featured benefit in the center column (video card). */
export const BENEFITS_CENTER_FEATURE_ID = "prepayment" satisfies BenefitCardId;

export const BENEFITS_CENTER_VIDEO =
  "/img/advantages/hf_20260421_072701_f6a01abb-eb30-4559-9d6e-774362defbc3.mp4";

/** Side columns — three compact text cards each. */
export const BENEFITS_SIDE_LEFT: ReadonlyArray<BenefitCardId> = [
  "warranty",
  "colors",
  "storage",
];

export const BENEFITS_SIDE_RIGHT: ReadonlyArray<BenefitCardId> = [
  "parking",
  "equipment",
  "dimet",
];
