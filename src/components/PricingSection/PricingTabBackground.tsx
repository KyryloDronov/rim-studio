"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import {
  PRICING_TAB_VIDEOS,
  type PricingTabId,
} from "@/content/pricing-tab-backgrounds";
import {
  PRICING_BG_IMAGE_CROSSFADE_S,
} from "@/components/PricingSection/pricingTransition";

import styles from "./style.module.css";

const crossfadeEase = [0.22, 1, 0.36, 1] as const;

type PricingTabBackgroundProps = Readonly<{
  activeTab: PricingTabId;
  washAlpha: number;
}>;

function scrimBackground(wash: number): string {
  /* Match `--brand-ink-700` — solid at section edges, no seam with adjacent blocks. */
  const ink = "25 31 36";
  const solid = `rgb(${ink})`;
  const shoulder = Math.min(0.82 + wash * 0.12, 0.96);
  const mid = 0.26 + wash * 0.38;
  return `linear-gradient(
    180deg,
    ${solid} 0%,
    ${solid} 10%,
    rgb(${ink} / ${shoulder}) 24%,
    rgb(${ink} / ${mid}) 50%,
    rgb(${ink} / ${shoulder}) 76%,
    ${solid} 90%,
    ${solid} 100%
  )`;
}

type AmbientVideoProps = Readonly<{
  src: string;
  play: boolean;
}>;

function AmbientVideo({ src, play }: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (play) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [play, src]);

  return (
    <div className={styles.bgVisual}>
      <video
        ref={videoRef}
        className={styles.bgVideo}
        src={src}
        muted
        playsInline
        loop
        autoPlay
        preload="auto"
        aria-hidden
      />
    </div>
  );
}

export function PricingTabBackground({
  activeTab,
  washAlpha,
}: PricingTabBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const visual = PRICING_TAB_VIDEOS[activeTab];

  const scrimStyle = {
    background: scrimBackground(washAlpha),
  } satisfies CSSProperties;

  const crossfade = prefersReducedMotion
    ? { duration: 0 }
    : { duration: PRICING_BG_IMAGE_CROSSFADE_S, ease: crossfadeEase };

  return (
    <div className={styles.bgLayer} aria-hidden>
      <div className={styles.bgBase} />

      <div className={styles.bgStage}>
        <AnimatePresence initial={false}>
          <motion.div
            key={activeTab}
            className={styles.bgStack}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={crossfade}
          >
            <AmbientVideo src={visual.src} play />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.bgScrim} style={scrimStyle} aria-hidden />
    </div>
  );
}
