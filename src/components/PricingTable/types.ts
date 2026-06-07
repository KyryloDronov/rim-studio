/** JSON-friendly pricing grid — variable columns and rows per tab. */
export type PricingTableData = Readonly<{
  /** First header cell (category title). */
  title: string;
  /** Rim size / option column headers after the title cell. */
  columns: ReadonlyArray<string>;
  rows: ReadonlyArray<
    Readonly<{
      label: string;
      /** One price per column — numeric strings or pre-formatted text. */
      prices: ReadonlyArray<string>;
    }>
  >;
}>;
