/** Bento grid placement for seven service tiles (4-column desktop). */
export type MasonryCellPlacement = Readonly<{
  gridColumn: string;
  gridRow: string;
}>;

export const SERVICE_MASONRY_PLACEMENTS: ReadonlyArray<MasonryCellPlacement> = [
  { gridColumn: "1 / 3", gridRow: "1 / 3" },
  { gridColumn: "3 / 4", gridRow: "1 / 3" },
  { gridColumn: "4 / 5", gridRow: "1 / 2" },
  { gridColumn: "4 / 5", gridRow: "2 / 3" },
  { gridColumn: "1 / 2", gridRow: "3 / 4" },
  { gridColumn: "2 / 3", gridRow: "3 / 4" },
  { gridColumn: "3 / 5", gridRow: "3 / 4" },
];
