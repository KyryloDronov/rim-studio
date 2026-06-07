"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo } from "react";

import type { PricingTableData } from "./types";
import styles from "./style.module.css";

export type { PricingTableData } from "./types";

/** Apple-like ease-out — soft deceleration at the end. */
const appleEase = [0.22, 1, 0.36, 1] as const;

const HEADER_ENTER_S = 0.68;
const ROW_ENTER_S = 0.56;
const ROW_STAGGER_S = 0.042;
const ROW_DELAY_AFTER_HEADER_S = 0.44;
const EXIT_FADE_S = 0.36;

type PricingTableProps = Readonly<{
  data: PricingTableData;
  /** Changes with active tab — drives enter/exit animation. */
  panelKey: string;
  className?: string;
  scrollClassName?: string;
  /** Delay before header / row cascade (sync with bg blur reveal). */
  enterDelay?: number;
  /** Fires when header + row cascade has finished. */
  onEnterComplete?: () => void;
}>;

/** `15000` → `15 000`; leaves already formatted strings as-is. */
export function formatPriceCell(value: string): string {
  const digits = value.replace(/\s/g, "");
  if (!/^\d+$/.test(digits)) return value;
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function enterCompleteMs(rowCount: number, enterDelay: number): number {
  if (rowCount <= 0) {
    return Math.round((enterDelay + HEADER_ENTER_S) * 1000);
  }
  const lastRowStart =
    enterDelay +
    ROW_DELAY_AFTER_HEADER_S +
    Math.max(0, rowCount - 1) * ROW_STAGGER_S;
  return Math.round((lastRowStart + ROW_ENTER_S) * 1000);
}

function buildHeaderVariants(enterDelay: number) {
  return {
    hidden: { opacity: 0, y: -12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: HEADER_ENTER_S,
        delay: enterDelay,
        ease: appleEase,
      },
    },
  };
}

function buildRowVariants(enterDelay: number) {
  return {
    hidden: { opacity: 0, y: 14 },
    visible: (rowIndex: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: ROW_ENTER_S,
        delay: enterDelay + ROW_DELAY_AFTER_HEADER_S + rowIndex * ROW_STAGGER_S,
        ease: appleEase,
      },
    }),
  };
}

export function PricingTable({
  data,
  panelKey,
  className,
  scrollClassName,
  enterDelay = 0,
  onEnterComplete,
}: PricingTableProps) {
  const prefersReducedMotion = useReducedMotion();
  const wrapClass = [styles.wrap, className].filter(Boolean).join(" ");
  const scrollClass = [styles.scroll, scrollClassName]
    .filter(Boolean)
    .join(" ");
  const headerVariants = useMemo(
    () => buildHeaderVariants(enterDelay),
    [enterDelay],
  );
  const rowVariants = useMemo(
    () => buildRowVariants(enterDelay),
    [enterDelay],
  );
  const completeMs = useMemo(
    () => enterCompleteMs(data.rows.length, enterDelay),
    [data.rows.length, enterDelay],
  );

  useEffect(() => {
    if (!onEnterComplete) return;

    if (prefersReducedMotion) {
      onEnterComplete();
      return;
    }

    const id = globalThis.setTimeout(onEnterComplete, completeMs);
    return () => globalThis.clearTimeout(id);
  }, [completeMs, enterDelay, onEnterComplete, panelKey, prefersReducedMotion]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={panelKey}
        className={wrapClass}
        role="tabpanel"
        id={`tabpanel-${panelKey}`}
        aria-labelledby={`tab-${panelKey}`}
        initial={false}
        exit={
          prefersReducedMotion
            ? undefined
            : { opacity: 0, transition: { duration: EXIT_FADE_S, ease: appleEase } }
        }
      >
        <div className={scrollClass} tabIndex={-1}>
          <span className={styles.glassSurface} aria-hidden="true" />
          <div className={styles.scrollInner}>
            <table className={styles.table}>
              <thead>
                <motion.tr
                  className={styles.headRow}
                  initial={prefersReducedMotion ? false : "hidden"}
                  animate={prefersReducedMotion ? undefined : "visible"}
                  variants={headerVariants}
                >
                  <th scope="col" className={styles.headCell}>
                    {data.title}
                  </th>
                  {data.columns.map((col) => (
                    <th key={col} scope="col" className={styles.headCell}>
                      {col}
                    </th>
                  ))}
                </motion.tr>
              </thead>
              <tbody>
                {data.rows.map((row, rowIndex) => (
                  <motion.tr
                    key={`${panelKey}-${row.label}`}
                    className={styles.row}
                    custom={rowIndex}
                    initial={prefersReducedMotion ? false : "hidden"}
                    animate={prefersReducedMotion ? undefined : "visible"}
                    variants={rowVariants}
                  >
                    <th scope="row" className={styles.rowLabel}>
                      {row.label}
                    </th>
                    {row.prices.map((price, colIndex) => (
                      <td
                        key={`${row.label}-${data.columns[colIndex] ?? colIndex}`}
                        className={styles.cell}
                      >
                        {formatPriceCell(price)}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
