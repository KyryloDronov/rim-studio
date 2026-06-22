"use client";

import { animate } from "motion/react";
import { useEffect, useId, useRef } from "react";
import {
  AMORPH_CIRCLE_COUNT,
  AMORPH_CIRCLE_RADIUS,
  AMORPH_DIGIT_PATHS,
  AMORPH_VIEWBOX,
} from "@/content/amorph-digit-paths";

import styles from "./style.module.css";

type ProcessDigit = 1 | 2 | 3 | 4;

type AmorphDigitProps = Readonly<{
  digit: ProcessDigit;
}>;

function AmorphDigit({ digit }: AmorphDigitProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const circlesRef = useRef<(SVGCircleElement | null)[]>([]);
  const filterId = useId().replace(/:/g, "");

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    const step = length / AMORPH_CIRCLE_COUNT;

    circlesRef.current.forEach((circle, index) => {
      if (!circle) return;
      const point = path.getPointAtLength(index * step);
      animate(
        circle,
        { cx: point.x, cy: point.y },
        { delay: index * 0.025, ease: "easeOut", duration: 0.42 },
      );
    });
  }, [digit]);

  return (
    <svg
      className={styles.amorphDigit}
      viewBox={`0 0 ${AMORPH_VIEWBOX} ${AMORPH_VIEWBOX}`}
      aria-hidden
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="14" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 22 -12"
            result="filter"
          />
        </filter>
      </defs>

      <path
        ref={pathRef}
        d={AMORPH_DIGIT_PATHS[digit]}
        className={styles.amorphPath}
      />

      <g filter={`url(#${filterId})`}>
        {Array.from({ length: AMORPH_CIRCLE_COUNT }, (_, index) => (
          <circle
            key={index}
            ref={(element) => {
              circlesRef.current[index] = element;
            }}
            cx={AMORPH_VIEWBOX / 2}
            cy={AMORPH_VIEWBOX / 2}
            r={AMORPH_CIRCLE_RADIUS}
            fill="#ffffff"
            className={styles.amorphCircle}
          />
        ))}
      </g>
    </svg>
  );
}

type AmorphStepNumberProps = Readonly<{
  value: number;
}>;

export function AmorphStepNumber({ value }: AmorphStepNumberProps) {
  const digit = Math.min(4, Math.max(1, value)) as ProcessDigit;

  return (
    <div className={styles.amorphNumber} aria-hidden>
      <AmorphDigit digit={digit} />
    </div>
  );
}
