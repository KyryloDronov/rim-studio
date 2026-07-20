import type { ReactNode, RefObject } from "react";

export type TabItem = Readonly<{
  id: string;
  /** Accessible / fallback single-line label. */
  label: string;
  /** Two-line tab title — rendered stacked when provided. */
  labelLines?: readonly [string, string];
  icon: ReactNode;
}>;

export type TabNotchMetrics = Readonly<{
  /** Horizontal offset from the metrics anchor's left edge. */
  left: number;
  width: number;
}>;

export type TabsProps = Readonly<{
  items: ReadonlyArray<TabItem>;
  /** Controlled active tab id. */
  value?: string;
  /** Uncontrolled initial tab. */
  defaultValue?: string;
  onChange?: (id: string) => void;
  className?: string;
  /** Accessible name when there is no visible heading. */
  ariaLabel?: string;
  /** Bar palette — light for dark sections, dark (default) for light sections. */
  theme?: "dark" | "light";
  /** Wavy connector under the active tab (pricing table bridge). */
  showNotch?: boolean;
  /** Shared root for tab + table notch alignment (e.g. pricing panel). */
  metricsAnchorRef?: RefObject<HTMLElement | null>;
  onNotchMetrics?: (metrics: TabNotchMetrics) => void;
}>;
