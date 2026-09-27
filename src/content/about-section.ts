/** Background clips for the about hub. */
export const ABOUT_SECTION_VIDEOS = {
  founder:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4",
  approach:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4",
} as const;

export const ABOUT_PILLAR_ICONS = [
  "layers",
  "gem",
  "clock",
  "parking",
] as const;

export type AboutPillarIconId = (typeof ABOUT_PILLAR_ICONS)[number];

/** Faint card backdrops — one per pillar. */
export const ABOUT_PILLAR_BACKGROUNDS = [
  "/img/LH_Performante_Narvi_Forged_1.png",
  "/img/RS_Brake_1.png",
  "/img/GoodWay_Gale_F7_1.png",
  "/img/3-min.png.webp",
] as const;
