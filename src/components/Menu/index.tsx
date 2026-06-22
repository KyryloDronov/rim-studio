"use client";

import gsap from "gsap";
import { useLenis } from "lenis/react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  MENU_SERVICE_LINKS,
  MENU_STUDIO_LINKS,
} from "@/content/site-pages";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/paths";
import { lockScroll } from "@/lib/scrollLock";

import styles from "./style.module.css";

const easeOutQuart = [0.165, 0.84, 0.44, 1] as const;

type MenuNavItem = Readonly<{
  href: string;
  label: string;
}>;

const DEFAULT_VIDEO_SRC =
  "/video/AQOL1_T9nhEKraqwl0FgmPsloL3H8ZcS7BogR6PvGEDdVl7aeMwfoGBC3maKYXrII99duizlL6DLEhsaePv8rkgA0kcqpbwj1CZ-uos.mp4";
const DEFAULT_VIDEO_POSTER: string | null = null;

type MenuProps = Readonly<{
  isOpen: boolean;
  onClose?: () => void;
  videoSrc?: string | null;
  videoPoster?: string | null;
}>;

const MENU_PANEL_OPEN_DURATION = 1.44;
const MENU_PANEL_CLOSE_DURATION = 1.06;
const MENU_SCRIM_ALPHA_OPEN = 0.48;
const MENU_PANEL_EASE_OPEN = "power2.out";
const MENU_PANEL_EASE_CLOSE = "power2.in";
const ENTER_BASE_DELAY = MENU_PANEL_OPEN_DURATION * 0.28;
const ENTER_STAGGER = 0.055;
const ENTER_DURATION = 0.82;

const MENU_WAVE_AMP_START = 0.078;
const MENU_WAVE_FREQ = 1.08;
const MENU_WAVE_PATH_STEPS = 48;
const MENU_WAVE_SETTLE_DURATION = MENU_PANEL_OPEN_DURATION * 1.2;

function buildMenuWaveClipPath(amp: number): string {
  if (amp < 0.001) {
    return "M 0 0 L 1 0 L 1 1 L 0 1 Z";
  }
  const yAt = (x: number) =>
    1 - (amp * (1 + Math.sin(x * Math.PI * 2 * MENU_WAVE_FREQ))) / 2;
  const parts: string[] = ["M 0 0", "H 1", `V ${yAt(1)}`];
  for (let s = MENU_WAVE_PATH_STEPS - 1; s >= 0; s--) {
    const x = s / MENU_WAVE_PATH_STEPS;
    parts.push(`L ${x} ${yAt(x)}`);
  }
  parts.push("Z");
  return parts.join(" ");
}

const navItemVariants: Variants = {
  closed: { opacity: 0, filter: "blur(10px)", y: 20 },
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
    transition: { duration: 0.55, ease: easeOutQuart },
  },
  dimmed: {
    opacity: 0.22,
    filter: "blur(8px)",
    y: 0,
    transition: { duration: 0.55, ease: easeOutQuart },
  },
};

const sectionVariants: Variants = {
  closed: { opacity: 0, filter: "blur(8px)", y: 16 },
  open: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: ENTER_DURATION * 0.9,
      delay: ENTER_BASE_DELAY + i * ENTER_STAGGER * 2,
      ease: easeOutQuart,
    },
  }),
  neutral: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.55, ease: easeOutQuart },
  },
  dimmed: {
    opacity: 0.35,
    filter: "blur(6px)",
    y: 0,
    transition: { duration: 0.55, ease: easeOutQuart },
  },
};

export function Menu({
  isOpen,
  onClose,
  videoSrc = DEFAULT_VIDEO_SRC,
  videoPoster = DEFAULT_VIDEO_POSTER,
}: MenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const wavePathRef = useRef<SVGPathElement | null>(null);
  const menuWasOpenedRef = useRef(false);
  const reactId = useId();
  const waveClipId = `menu-wave-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const prefersReducedMotion = useReducedMotion();
  const { locale, t } = useLocale();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  const serviceLinks = useMemo<ReadonlyArray<MenuNavItem>>(
    () =>
      MENU_SERVICE_LINKS.map((item) => ({
        href: localizedPath(locale, item.href),
        label: t.menu.services[item.menuKey],
      })),
    [locale, t.menu.services],
  );

  const studioLinks = useMemo<ReadonlyArray<MenuNavItem>>(
    () =>
      MENU_STUDIO_LINKS.map((item) => ({
        href: localizedPath(locale, item.href),
        label: t.menu.studio[item.menuKey],
      })),
    [locale, t.menu.studio],
  );

  const flatLinks = useMemo(
    () => [...serviceLinks, ...studioLinks],
    [serviceLinks, studioLinks],
  );

  const handleItemEnter = useCallback((i: number) => setHoveredIndex(i), []);
  const handleItemLeave = useCallback(() => setHoveredIndex(null), []);

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
      (ENTER_BASE_DELAY +
        (flatLinks.length - 1) * ENTER_STAGGER +
        ENTER_DURATION) *
      1000;
    const id = window.setTimeout(() => setHasEntered(true), totalMs);
    return () => window.clearTimeout(id);
  }, [flatLinks.length, isOpen, prefersReducedMotion]);

  useEffect(() => {
    const el = containerRef.current;
    const panel = panelRef.current;
    const scrim = scrimRef.current;
    if (!el || !panel || !scrim) return;

    if (prefersReducedMotion) {
      el.style.visibility = isOpen ? "visible" : "hidden";
      el.style.pointerEvents = isOpen ? "auto" : "none";
      gsap.set(panel, { yPercent: isOpen ? 0 : -100 });
      panel.style.removeProperty("clip-path");
      panel.style.removeProperty("-webkit-clip-path");
      gsap.set(scrim, {
        "--menu-blur": isOpen ? "12px" : "0px",
        "--menu-scrim-a": isOpen ? MENU_SCRIM_ALPHA_OPEN : 0,
      });
      wavePathRef.current?.setAttribute("d", buildMenuWaveClipPath(0));
      menuWasOpenedRef.current = isOpen;
      return;
    }

    if (isOpen) {
      el.style.visibility = "visible";
      el.style.pointerEvents = "auto";
      const clipUrl = `url(#${waveClipId})`;
      panel.style.clipPath = clipUrl;
      panel.style.setProperty("-webkit-clip-path", clipUrl);

      const wave = { amp: MENU_WAVE_AMP_START };
      wavePathRef.current?.setAttribute("d", buildMenuWaveClipPath(wave.amp));

      const tl = gsap.timeline();
      tl.fromTo(
        panel,
        { yPercent: -100 },
        {
          yPercent: 0,
          duration: MENU_PANEL_OPEN_DURATION,
          ease: MENU_PANEL_EASE_OPEN,
        },
        0,
      )
        .fromTo(
          scrim,
          { "--menu-blur": "0px", "--menu-scrim-a": 0 },
          {
            "--menu-blur": "12px",
            "--menu-scrim-a": MENU_SCRIM_ALPHA_OPEN,
            duration: MENU_PANEL_OPEN_DURATION,
            ease: MENU_PANEL_EASE_OPEN,
          },
          0,
        )
        .to(
          wave,
          {
            amp: 0,
            duration: MENU_WAVE_SETTLE_DURATION,
            ease: "sine.out",
            onUpdate: () => {
              wavePathRef.current?.setAttribute(
                "d",
                buildMenuWaveClipPath(wave.amp),
              );
            },
          },
          0,
        );
      menuWasOpenedRef.current = true;
      return () => {
        tl.kill();
      };
    }

    if (!menuWasOpenedRef.current) {
      gsap.set(panel, { yPercent: -100 });
      panel.style.removeProperty("clip-path");
      panel.style.removeProperty("-webkit-clip-path");
      gsap.set(scrim, {
        "--menu-blur": "0px",
        "--menu-scrim-a": 0,
      });
      wavePathRef.current?.setAttribute("d", buildMenuWaveClipPath(0));
      el.style.visibility = "hidden";
      el.style.pointerEvents = "none";
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        el.style.visibility = "hidden";
        el.style.pointerEvents = "none";
        panel.style.removeProperty("clip-path");
        panel.style.removeProperty("-webkit-clip-path");
        wavePathRef.current?.setAttribute("d", buildMenuWaveClipPath(0));
        menuWasOpenedRef.current = false;
      },
    });
    tl.to(
      panel,
      {
        yPercent: -100,
        duration: MENU_PANEL_CLOSE_DURATION,
        ease: MENU_PANEL_EASE_CLOSE,
      },
      0,
    ).to(
      scrim,
      {
        "--menu-blur": "0px",
        "--menu-scrim-a": 0,
        duration: MENU_PANEL_CLOSE_DURATION,
        ease: MENU_PANEL_EASE_CLOSE,
      },
      0,
    );

    return () => {
      tl.kill();
    };
  }, [isOpen, prefersReducedMotion, waveClipId]);

  const lenis = useLenis();
  useEffect(() => {
    if (!isOpen) return;
    const release = lockScroll();
    lenis?.stop();
    return () => {
      release();
      lenis?.start();
    };
  }, [isOpen, lenis]);

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

  const renderLink = (
    link: MenuNavItem,
    index: number,
    variant: "service" | "studio",
  ) => (
    <motion.li
      key={link.href}
      className={styles.navItem}
      data-variant={variant}
      custom={index}
      variants={navItemVariants}
      initial="closed"
      animate={itemAnimateState(index)}
      onMouseEnter={() => handleItemEnter(index)}
      onMouseLeave={handleItemLeave}
      onFocus={() => handleItemEnter(index)}
      onBlur={handleItemLeave}
    >
      <Link
        href={link.href}
        onClick={() => onClose?.()}
        tabIndex={isOpen ? 0 : -1}
      >
        {link.label}
      </Link>
    </motion.li>
  );

  return (
    <div
      ref={containerRef}
      className={styles.menu}
      role="dialog"
      aria-modal="true"
      aria-label={t.menu.servicesHeading}
      aria-hidden={!isOpen}
      data-open={isOpen}
    >
      <svg className={styles.clipResource} aria-hidden width={0} height={0}>
        <defs>
          <clipPath id={waveClipId} clipPathUnits="objectBoundingBox">
            <path ref={wavePathRef} d={buildMenuWaveClipPath(0)} />
          </clipPath>
        </defs>
      </svg>
      <div ref={scrimRef} className={styles.backdrop} aria-hidden />
      <div ref={panelRef} className={styles.menuPanel}>
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
          <div className={styles.navLayout}>
            <motion.section
              className={styles.section}
              custom={0}
              variants={sectionVariants}
              initial="closed"
              animate={
                !isOpen
                  ? "closed"
                  : !hasEntered
                    ? "open"
                    : hoveredIndex === null ||
                        hoveredIndex < serviceLinks.length
                      ? "neutral"
                      : "dimmed"
              }
              aria-label={t.menu.servicesHeading}
            >
              <h2 className={styles.sectionTitle}>{t.menu.servicesHeading}</h2>
              <ul className={styles.sectionList}>
                {serviceLinks.map((link, i) => renderLink(link, i, "service"))}
              </ul>
            </motion.section>

            <motion.section
              className={`${styles.section} ${styles.sectionStudio}`}
              custom={1}
              variants={sectionVariants}
              initial="closed"
              animate={
                !isOpen
                  ? "closed"
                  : !hasEntered
                    ? "open"
                    : hoveredIndex === null ||
                        hoveredIndex >= serviceLinks.length
                      ? "neutral"
                      : "dimmed"
              }
              aria-label={t.menu.studioHeading}
            >
              <h2 className={styles.sectionTitle}>{t.menu.studioHeading}</h2>
              <ul className={styles.sectionList}>
                {studioLinks.map((link, i) =>
                  renderLink(link, serviceLinks.length + i, "studio"),
                )}
              </ul>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
