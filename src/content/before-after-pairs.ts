export type BeforeAfterItem = Readonly<{
  id: string;
  beforeSrc: string;
  afterSrc: string;
}>;

/** Demo carousel items — 10 entries, alternating the two sample image pairs. */
export const BEFORE_AFTER_ITEMS: ReadonlyArray<BeforeAfterItem> = [
  {
    id: "demo-01",
    beforeSrc: "/img/2.jpg",
    afterSrc: "/img/2-after.jpg",
  },
  {
    id: "demo-02",
    beforeSrc: "/img/3.jpg",
    afterSrc: "/img/3-after.jpg",
  },
  {
    id: "demo-03",
    beforeSrc: "/img/2.jpg",
    afterSrc: "/img/2-after.jpg",
  },
  {
    id: "demo-04",
    beforeSrc: "/img/3.jpg",
    afterSrc: "/img/3-after.jpg",
  },
  {
    id: "demo-05",
    beforeSrc: "/img/2.jpg",
    afterSrc: "/img/2-after.jpg",
  },
  {
    id: "demo-06",
    beforeSrc: "/img/3.jpg",
    afterSrc: "/img/3-after.jpg",
  },
  {
    id: "demo-07",
    beforeSrc: "/img/2.jpg",
    afterSrc: "/img/2-after.jpg",
  },
  {
    id: "demo-08",
    beforeSrc: "/img/3.jpg",
    afterSrc: "/img/3-after.jpg",
  },
  {
    id: "demo-09",
    beforeSrc: "/img/2.jpg",
    afterSrc: "/img/2-after.jpg",
  },
  {
    id: "demo-10",
    beforeSrc: "/img/3.jpg",
    afterSrc: "/img/3-after.jpg",
  },
];

export const BEFORE_AFTER_BOOKING_VIDEO =
  "/img/gallery/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4";
