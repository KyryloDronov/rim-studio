"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { CSSProperties } from "react";
import {
  PRICING_TAB_BACKGROUNDS,
  type PricingTabId,
} from "@/content/pricing-tab-backgrounds";
import {
  PRICING_BG_IMAGE_CROSSFADE_S,
  PRICING_BG_IMAGE_SCALE_FROM,
} from "@/components/PricingSection/pricingTransition";

import styles from "./style.module.css";

const crossfadeEase = [0.22, 1, 0.36, 1] as const;

type PricingTabBackgroundProps = Readonly<{
  activeTab: PricingTabId;
  blurPx: number;
  washAlpha: number;
}>;

function frostBackground(wash: number): string {
  return [
    `linear-gradient(180deg, rgb(250 250 252 / ${wash * 2.6}) 0%, rgb(250 250 252 / ${wash * 1.15}) 40%, rgb(250 250 252 / ${wash * 2.1}) 100%)`,
    `rgb(250 250 252 / ${wash})`,
  ].join(", ");
}

export function PricingTabBackground({
  activeTab,
  blurPx,
  washAlpha,
}: PricingTabBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const visual = PRICING_TAB_BACKGROUNDS[activeTab];
  const frostFilter = `blur(${blurPx}px) saturate(1.05)`;

  const frostStyle = {
    background: frostBackground(washAlpha),
    backdropFilter: frostFilter,
    WebkitBackdropFilter: frostFilter,
  } satisfies CSSProperties;

  const crossfade = prefersReducedMotion
    ? { duration: 0 }
    : { duration: PRICING_BG_IMAGE_CROSSFADE_S, ease: crossfadeEase };

  return (
    <div className={styles.bgLayer} aria-hidden>
      <div className={styles.bgBase} />

      <div className={styles.bgStage}>
        <AnimatePresence initial={false}>
          {visual ? (
            <motion.div
              key={activeTab}
              className={styles.bgStack}
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, scale: PRICING_BG_IMAGE_SCALE_FROM }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 1 }
              }
              transition={crossfade}
            >
              <div className={styles.bgVisual}>
                <Image
                  src={visual.src}
                  alt=""
                  fill
                  sizes="100vw"
                  className={styles.bgImage}
                  draggable={false}
                  priority={activeTab === "paint"}
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className={styles.bgBlurOverlay} style={frostStyle} aria-hidden />
    </div>
  );
}
