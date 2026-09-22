"use client";

import type { CSSProperties } from "react";

import styles from "./style.module.css";

const RING_RADIUS = 16;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

type ProcessStepTimerBadgeProps = Readonly<{
  stepNumber: number;
  active: boolean;
  /** Active step — show countdown ring around the digit. */
  showTimerRing: boolean;
  /** Remount ring animation when the active step changes. */
  timerCycleKey: string;
}>;

export function ProcessStepTimerBadge({
  stepNumber,
  active,
  showTimerRing,
  timerCycleKey,
}: ProcessStepTimerBadgeProps) {
  return (
    <span
      className={styles.stepBadgeWrap}
      data-active={active ? "true" : "false"}
      aria-hidden
    >
      {showTimerRing ? (
        <svg
          key={timerCycleKey}
          className={styles.stepTimerSvg}
          viewBox="0 0 36 36"
          aria-hidden
        >
          <circle
            className={styles.stepTimerTrack}
            cx="18"
            cy="18"
            r={RING_RADIUS}
          />
          <circle
            className={styles.stepTimerProgress}
            cx="18"
            cy="18"
            r={RING_RADIUS}
            style={
              {
                strokeDasharray: RING_CIRCUMFERENCE,
                strokeDashoffset: RING_CIRCUMFERENCE,
                "--process-ring-c": `${RING_CIRCUMFERENCE}px`,
              } as CSSProperties
            }
          />
        </svg>
      ) : null}

      <span className={styles.stepBadgeDigit}>{stepNumber}</span>
    </span>
  );
}
