"use client";

import {
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { LogoSmall } from "@/icons/logo_small";

import styles from "./style.module.css";

const LOGO_TITLE = "RIM STUDIO";

/** One-way wheel spin: fast smear → smooth deceleration → rest at 0°. */
const SPIN_TURNS = 20;
const SPIN_DEGREES = SPIN_TURNS * 360;
const LOGO_SPIN_DURATION = 2.4;

const SPIN_SEQUENCE = {
  opacity: [0, 0.45, 1, 1, 1, 1, 1, 1, 1] as number[],
  rotate: [-SPIN_DEGREES, -6480, -5400, -3600, -1800, -540, -72, -8, 0] as number[],
  filter: [
    "blur(8px)",
    "blur(7px)",
    "blur(5px)",
    "blur(3px)",
    "blur(1.5px)",
    "blur(0.6px)",
    "blur(0.2px)",
    "blur(0px)",
    "blur(0px)",
  ] as string[],
};

const SPIN_TRANSITION = {
  duration: LOGO_SPIN_DURATION,
  ease: "linear" as const,
  times: [0, 0.015, 0.06, 0.18, 0.38, 0.62, 0.82, 0.94, 1] as number[],
};

const LETTER_EASE = [0.22, 1, 0.36, 1] as const;
const TEXT_EASE = [0.76, 0, 0.24, 1] as const;
const LETTER_DELAY = 0.16;
const LETTER_STAGGER = 0.13;
const LETTER_DURATION = 0.38;
const LOGO_TEXT_GAP = "clamp(0.45rem, 1.2vw, 0.65rem)";

function letterEnterDelay(index: number): number {
  return LETTER_DELAY + index * LETTER_STAGGER;
}

function letterExitDelay(index: number, total: number): number {
  return (total - 1 - index) * LETTER_STAGGER;
}

function textRevealDuration(total: number): number {
  return letterEnterDelay(total - 1) + LETTER_DURATION;
}

function textHideDuration(total: number): number {
  return letterExitDelay(0, total) + LETTER_DURATION;
}

type AnimatedLogoProps = Readonly<{
  ready?: boolean;
  className?: string;
}>;

export function AnimatedLogo({ ready = true, className }: AnimatedLogoProps) {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimationControls();
  const iconRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const playingRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  const [letterCycle, setLetterCycle] = useState(0);
  const [iconWidth, setIconWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const rootClass = [styles.logoSvg, className].filter(Boolean).join(" ");

  const measureSizes = useCallback(() => {
    if (iconRef.current) {
      setIconWidth(iconRef.current.offsetWidth);
    }
    if (measureRef.current) {
      setTextWidth(measureRef.current.offsetWidth);
    }
  }, []);

  useLayoutEffect(() => {
    measureSizes();
  }, [measureSizes, ready]);

  useEffect(() => {
    const onResize = () => measureSizes();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measureSizes]);

  const runSpin = useCallback(async () => {
    if (playingRef.current) return;

    playingRef.current = true;

    await controls.set({
      opacity: 0,
      rotate: -SPIN_DEGREES,
      filter: "blur(8px)",
    });

    await controls.start({
      ...SPIN_SEQUENCE,
      transition: SPIN_TRANSITION,
    });

    playingRef.current = false;
  }, [controls]);

  useEffect(() => {
    if (!ready || prefersReducedMotion) return;
    void runSpin();
  }, [ready, prefersReducedMotion, runSpin]);

  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
    setLetterCycle((cycle) => cycle + 1);
    void runSpin();
  }, [runSpin]);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
  }, []);

  if (prefersReducedMotion) {
    return (
      <span className={styles.logoPin}>
        <span className={styles.logoBrand}>
          <LogoSmall className={rootClass} aria-hidden />
          <span className={styles.logoWord}>{LOGO_TITLE}</span>
        </span>
      </span>
    );
  }

  const letters = Array.from(LOGO_TITLE);
  const letterCount = letters.length;
  const showLetters = isHovered && ready;
  const iconOffset = iconWidth > 0 ? -iconWidth / 2 : 0;
  const revealDuration = textRevealDuration(letterCount);
  const hideDuration = textHideDuration(letterCount);
  const textTrackTransition = showLetters
    ? {
        duration: revealDuration - letterEnterDelay(0),
        delay: letterEnterDelay(0),
        ease: TEXT_EASE,
      }
    : {
        duration: hideDuration,
        delay: 0,
        ease: TEXT_EASE,
      };

  return (
    <motion.span
      className={styles.logoPin}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <span ref={measureRef} className={styles.logoWordMeasure} aria-hidden>
        {LOGO_TITLE}
      </span>

      <motion.span
        className={styles.logoBrand}
        style={{ x: iconOffset, y: "-50%" }}
        transition={{
          x: {
            duration: showLetters
              ? revealDuration - letterEnterDelay(0)
              : hideDuration,
            delay: showLetters ? letterEnterDelay(0) : 0,
            ease: TEXT_EASE,
          },
        }}
      >
        <motion.span
          ref={iconRef}
          className={styles.logoMotion}
          animate={controls}
          initial={{
            opacity: 0,
            rotate: -SPIN_DEGREES,
            filter: "blur(8px)",
          }}
          onAnimationComplete={() => {
            playingRef.current = false;
          }}
        >
          <LogoSmall className={rootClass} aria-hidden />
        </motion.span>

        <motion.span
          className={styles.logoWord}
          initial={false}
          animate={{
            width: showLetters ? textWidth : 0,
            opacity: showLetters ? 1 : 0,
            marginLeft: showLetters ? LOGO_TEXT_GAP : 0,
          }}
          transition={textTrackTransition}
        >
          {letters.map((char, index) => (
            <motion.span
              key={`${letterCycle}-${index}-${char}`}
              className={styles.logoChar}
              initial={{ opacity: 0, x: 10, filter: "blur(6px)" }}
              animate={
                showLetters
                  ? { opacity: 1, x: 0, filter: "blur(0px)" }
                  : { opacity: 0, x: 10, filter: "blur(6px)" }
              }
              transition={{
                duration: LETTER_DURATION,
                delay: showLetters
                  ? letterEnterDelay(index)
                  : letterExitDelay(index, letterCount),
                ease: LETTER_EASE,
              }}
            >
              {char === " " ? "\u00a0" : char}
            </motion.span>
          ))}
        </motion.span>
      </motion.span>
    </motion.span>
  );
};
