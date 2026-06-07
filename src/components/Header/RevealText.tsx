"use client";

import { motion, type Variants } from "motion/react";
import styles from "./style.module.css";

const ease = [0.76, 0, 0.24, 1] as const;

const primaryVariants: Variants = {
  rest: { y: "0%" },
  hover: { y: "-100%", transition: { duration: 0.4, ease } },
};

const cloneVariants: Variants = {
  rest: { y: "100%" },
  hover: { y: "0%", transition: { duration: 0.4, ease } },
};

type RevealTextProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

/**
 * "Rolling" text reveal: on parent hover, the visible label slides up and
 * is replaced by its clone coming in from below. Drives via Motion variants
 * propagated from the closest `whileHover="hover"` parent.
 */
export function RevealText({ children, className }: RevealTextProps) {
  return (
    <span className={`${styles.reveal} ${className ?? ""}`.trim()}>
      <motion.span variants={primaryVariants}>{children}</motion.span>
      <motion.span variants={cloneVariants} aria-hidden>
        {children}
      </motion.span>
    </span>
  );
}
