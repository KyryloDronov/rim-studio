export type PricingTableExtra = Readonly<{
  label: string;
  value: string;
}>;

/** JSON-friendly pricing grid — variable columns and rows per tab. */
export type PricingTableData = Readonly<{
  /** Orange section heading above the grid (cennik block title). */
  sectionTitle?: string;
  /** Muted line under the section heading. */
  subtitle?: string;
  /** First header cell — service / row label column. */
  title: string;
  /** Rim size / option column headers after the title cell. */
  columns: ReadonlyArray<string>;
  rows: ReadonlyArray<
    Readonly<{
      label: string;
      /** One price per column — numeric strings, «—», «od …». */
      prices: ReadonlyArray<string>;
    }>
  >;
  /** Cards below the table (fixed-price add-ons). */
  extras?: ReadonlyArray<PricingTableExtra>;
  /** Footnote under the table (often starts with *). */
  footnote?: string;
}>;
