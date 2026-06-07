/** Benefit tile ids — images live in `/public/img`. */
export type BenefitCardId =
  | "warranty"
  | "prepayment"
  | "parking"
  | "colors"
  | "storage"
  | "equipment"
  | "dimet";

export const BENEFIT_CARD_IMAGE: Record<BenefitCardId, string> = {
  warranty: "/img/5-min.png.webp",
  prepayment: "/img/6-min.png.webp",
  parking: "/img/3-min.png.webp",
  colors: "/img/2-min.png.webp",
  storage: "/img/1-min.png.webp",
  equipment: "/img/-min.png.webp",
  dimet: "/img/1-min.png.webp",
};

export const BENEFIT_CARD_ORDER: ReadonlyArray<BenefitCardId> = [
  "warranty",
  "prepayment",
  "parking",
  "colors",
  "storage",
  "equipment",
  "dimet",
];
