"use client";

import { splitQuoteSegments } from "@/animations";
import { motion, useReducedMotion } from "motion/react";
import { Fragment, useMemo } from "react";

import styles from "./style.module.css";

const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export type MotionLetterRevealProps = Readonly<{
  text: string;
  active: boolean;
  className?: string;
  /** Base delay before the first glyph animates in. */
  delay?: number;
  /** Seconds between each character. */
  stagger?: number;
}>;

export function MotionLetterReveal({
  text,
  active,
  className,
  delay = 0,
  stagger = 0.022,
}: MotionLetterRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const segments = useMemo(() => splitQuoteSegments(text, "motion-letter"), [text]);

  if (prefersReducedMotion || !active) {
    return <span className={className}>{text}</span>;
  }

  let charIndex = 0;

  return (
    <span className={[styles.root, className].filter(Boolean).join(" ")}>
      {segments.map((segment) => (
        <Fragment key={segment.key}>
          <span className={styles.word}>
            {segment.chars.map(({ char, key }) => {
              const index = charIndex;
              charIndex += 1;

              return (
                <span key={key} className={styles.charWrap} aria-hidden>
                  <motion.span
                    className={styles.char}
                    initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.42,
                      delay: delay + index * stagger,
                      ease: MOTION_EASE,
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
          {segment.trailingSpace ? " " : null}
        </Fragment>
      ))}
      <span className={styles.srOnly}>{text}</span>
    </span>
  );
}
