"use client";

import { motion, useReducedMotion } from "motion/react";
import type { TabNotchMetrics } from "@/components/Tabs";

import styles from "./style.module.css";

const appleEase = [0.22, 1, 0.36, 1] as const;

/** Table bump is one third of the tab bar notch. */
const TABLE_NOTCH_SCALE = 1 / 3;

type PricingTableNotchProps = Readonly<{
  activeTab: string;
  clipId: string;
  metrics: TabNotchMetrics;
  /** Table panel enter finished — bump can slide up. */
  ready: boolean;
}>;

export function PricingTableNotch({
  activeTab,
  clipId,
  metrics,
  ready,
}: PricingTableNotchProps) {
  const prefersReducedMotion = useReducedMotion();

  if (metrics.width <= 0) return null;

  const width = metrics.width * TABLE_NOTCH_SCALE;
  const left = metrics.left + (metrics.width - width) / 2;
  const clipUrl = `url(#${clipId})`;

  return (
    <div
      className={styles.tableNotchSlot}
      style={{ left, width }}
      aria-hidden
    >
      <motion.div
        key={activeTab}
        className={styles.tableNotch}
        style={{
          clipPath: clipUrl,
          WebkitClipPath: clipUrl,
        }}
        initial={false}
        animate={{
          y: prefersReducedMotion || ready ? 0 : "100%",
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.62,
          ease: appleEase,
        }}
      />
    </div>
  );
}
