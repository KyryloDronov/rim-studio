export const ABOUT_FOUNDER_IMAGE = "/img/georgii.webp";

export const ABOUT_PILLAR_ICONS = [
  "layers",
  "shield",
  "gem",
  "clock",
  "team",
] as const;

export type AboutPillarIconId = (typeof ABOUT_PILLAR_ICONS)[number];

/** Faint card backdrops — one per pillar. */
export const ABOUT_PILLAR_BACKGROUNDS = [
  "/img/LH_Performante_Narvi_Forged_1.png",
  "/img/RS_Brake_1.png",
  "/img/GoodWay_Gale_F7_1.png",
  "/img/3-min.png.webp",
  "/img/LH_Performante_Narvi_Forged_1.png",
] as const;
