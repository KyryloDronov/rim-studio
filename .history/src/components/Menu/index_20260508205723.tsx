"use client";

import gsap from "gsap";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Dictionary } from "@/i18n/types";

import styles from "./style.module.css";

const easeOutQuart = [0.165, 0.84, 0.44, 1] as const;

type MenuLabelKey = keyof Dictionary["menu"];

type NavLink = Readonly<{ href: string; labelKey: MenuLabelKey }>;

const DEFAULT_NAV: ReadonlyArray<NavLink> = [
  { href: "/", labelKey: "home" },
  { href: "/work", labelKey: "work" },
  { href: "/lab", labelKey: "lab" },
];

const DEFAULT_VIDEO_SRC = "/video/video-1119740251226491.mp4";
const DEFAULT_VIDEO_POSTER: string | null = null;

type MenuProps = Readonly<{
  isOpen: boolean;
  onClose?: () => void;
  links?: ReadonlyArray<NavLink>;
  videoSrc?: string | null;
  videoPoster?: string | null;
}>;

const ENTER_BASE_DELAY = 0.35;
const ENTER_STAGGER = 0.08;
const ENTER_DURATION = 0.7;

const navItemVariants: Variants = {
  closed: { opacity: 0, filter: "blur(10px)", y: 24 },
  open: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: ENTER_DURATION,
      delay: ENTER_BASE_DELAY + i * ENTER_STAGGER,
      ease: easeOutQuart,
    },
  }),
  neutral: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.45, ease: easeOutQuart },
  },
  dimmed: {
    opacity: 0.25,
    filter: "blur(10px)",
    y: 0,
    transition: { duration: 0.45, ease: easeOutQuart },
  },
};

export function Menu({
  isOpen,
  onClose,
  links = DEFAULT_NAV,
  videoSrc = DEFAULT_VIDEO_SRC,
  videoPoster = DEFAULT_VIDEO_POSTER,
}: MenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLocale();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  const handleItemEnter = useCallback((i: number) => setHoveredIndex(i), []);
  const handleItemLeave = useCallback(() => setHoveredIndex(null), []);

  /* Mark "entered" once the staggered intro has finished, so leaving hover
     can return items to the neutral state without re-applying enter delays. */
  useEffect(() => {
    if (!isOpen) {
      const frame = requestAnimationFrame(() => {
        setHasEntered(false);
        setHoveredIndex(null);
      });
      return () => cancelAnimationFrame(frame);
    }
    if (prefersReducedMotion) {
      const frame = requestAnimationFrame(() => setHasEntered(true));
      return () => cancelAnimationFrame(frame);
    }
    const totalMs =
      (ENTER_BASE_DELAY + (links.length - 1) * ENTER_STAGGER + ENTER_DURATION) *
      1000;
    const id = window.setTimeout(() => setHasEntered(true), totalMs);
    return () => window.clearTimeout(id);
  }, [isOpen, links.length, prefersReducedMotion]);

  /* GSAP-driven clip-path mask reveal */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reveal = isOpen ? "0%" : "100%";

    if (prefersReducedMotion) {
      el.style.setProperty("--menu-mask-height", reveal);
      el.style.visibility = isOpen ? "visible" : "hidden";
      el.style.pointerEvents = isOpen ? "auto" : "none";
      return;
    }

    if (isOpen) {
      el.style.visibility = "visible";
      el.style.pointerEvents = "auto";
    }

    const tween = gsap.to(el, {
      "--menu-mask-height": reveal,
      duration: isOpen ? 0.9 : 0.7,
      ease: isOpen ? "expo.inOut" : "expo.in",
      overwrite: "auto",
      onComplete: () => {
        if (!isOpen) {
          el.style.visibility = "hidden";
          el.style.pointerEvents = "none";
        }
      },
    });

    return () => {
      tween.kill();
    };
  }, [isOpen, prefersReducedMotion]);

  /* Lock body scroll while open */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  /* ESC closes the menu */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const itemAnimateState = (i: number) => {
    if (!isOpen) return "closed";
    if (!hasEntered) return "open";
    if (hoveredIndex === null) return "neutral";
    return hoveredIndex === i ? "neutral" : "dimmed";
  };

  return (
    <div
      ref={containerRef}
      className={styles.menu}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!isOpen}
      data-open={isOpen}
    >
      {videoSrc && (
        <div className={styles.videoWrapper} aria-hidden>
          <video
            src={videoSrc}
            poster={videoPoster ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      )}

      <div className={styles.content}>
        <ul className={styles.nav}>
          {links.map((link, i) => (
            <motion.li
              key={link.href}
              className={styles.navItem}
              custom={i}
              variants={navItemVariants}
              initial="closed"
              animate={itemAnimateState(i)}
              onMouseEnter={() => handleItemEnter(i)}
              onMouseLeave={handleItemLeave}
              onFocus={() => handleItemEnter(i)}
              onBlur={handleItemLeave}
            >
              <Link
                href={link.href}
                onClick={() => onClose?.()}
                tabIndex={isOpen ? 0 : -1}
              >
                {t.menu[link.labelKey]}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
