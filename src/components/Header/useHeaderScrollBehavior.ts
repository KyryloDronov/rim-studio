"use client";

import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { type RefObject, useEffect, useRef, useState } from "react";
import { PAGE_BANNER_SELECTOR } from "@/content/page-banner";

export type HeaderScrollMode = "hero" | "revealed" | "concealed";

const SCROLL_GLASS_THRESHOLD = 32;
const DIRECTION_DELTA = 4;
const VELOCITY_THRESHOLD = 0.08;
const CONCEAL_EXTRA = 8;

function getBannerBottom(): number {
  const banner = document.querySelector(PAGE_BANNER_SELECTOR);
  return banner?.getBoundingClientRect().bottom ?? Number.POSITIVE_INFINITY;
}

function pinTopForBanner(bannerBottom: number, headerHeight: number): number {
  return Math.min(0, bannerBottom - headerHeight);
}

export function useHeaderScrollBehavior(
  isMenuOpen: boolean,
  headerRef: RefObject<HTMLElement | null>,
) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [mode, setMode] = useState<HeaderScrollMode>("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBannerPinned, setIsBannerPinned] = useState(false);

  const modeRef = useRef<HeaderScrollMode>("hero");
  const scrollDirRef = useRef<"up" | "down">("down");
  const bannerPinActiveRef = useRef(false);
  const wasInBannerRef = useRef(false);
  const lastScrollRef = useRef(0);
  const lastTopRef = useRef(0);

  const applyTop = (top: number, motion: "pin" | "snap") => {
    const header = headerRef.current;
    if (!header) return;

    if (top === lastTopRef.current) return;
    lastTopRef.current = top;

    if (motion === "pin" || prefersReducedMotion) {
      gsap.killTweensOf(header);
      gsap.set(header, { top });
      return;
    }

    gsap.killTweensOf(header);
    gsap.to(header, {
      top,
      duration: 0.62,
      ease: "power2.inOut",
      overwrite: true,
    });
  };

  const setModeSafe = (next: HeaderScrollMode) => {
    if (modeRef.current === next) return;
    modeRef.current = next;
    setMode(next);
  };

  useEffect(() => {
    modeRef.current = "hero";
    scrollDirRef.current = "down";
    bannerPinActiveRef.current = false;
    wasInBannerRef.current = false;
    lastScrollRef.current = 0;
    lastTopRef.current = 0;
    setMode("hero");
    setIsScrolled(false);
    setIsBannerPinned(false);

    const header = headerRef.current;
    if (header) {
      gsap.killTweensOf(header);
      gsap.set(header, { top: 0 });
    }
  }, [pathname, headerRef]);

  useEffect(() => {
    if (!isMenuOpen) return;

    setModeSafe("revealed");
    setIsBannerPinned(false);
    bannerPinActiveRef.current = false;
    applyTop(0, "snap");
  }, [isMenuOpen]);

  useLenis(({ scroll, velocity }) => {
    if (isMenuOpen) return;

    setIsScrolled(scroll > SCROLL_GLASS_THRESHOLD);

    const header = headerRef.current;
    if (!header) return;

    const headerHeight = header.offsetHeight;
    const bannerBottom = getBannerBottom();
    const delta = scroll - lastScrollRef.current;

    const activelyScrollingDown = delta > DIRECTION_DELTA;
    const activelyScrollingUp = delta < -DIRECTION_DELTA;
    const velocityUp = velocity < -VELOCITY_THRESHOLD;
    const velocityDown = velocity > VELOCITY_THRESHOLD;

    if (activelyScrollingDown || velocityDown) scrollDirRef.current = "down";
    if (activelyScrollingUp || velocityUp) scrollDirRef.current = "up";

    const scrollingUp = activelyScrollingUp || velocityUp;
    const scrollingDown = activelyScrollingDown || velocityDown;

    lastScrollRef.current = scroll;

    const inBanner = bannerBottom > 0;
    const enteringBanner = inBanner && !wasInBannerRef.current;
    const nearBannerBelow =
      bannerBottom <= 0 && bannerBottom > -headerHeight;

    wasInBannerRef.current = inBanner;

    /* Approaching banner from below — reveal immediately (fast flings included). */
    if (nearBannerBelow && scrollingUp) {
      setIsBannerPinned(false);
      bannerPinActiveRef.current = false;
      setModeSafe("revealed");
      gsap.killTweensOf(header);
      applyTop(0, "pin");
      return;
    }

    /* ── Past banner ── */
    if (!inBanner) {
      setIsBannerPinned(false);
      bannerPinActiveRef.current = false;

      if (scrollingDown && !scrollingUp) {
        setModeSafe("concealed");
      } else if (scrollingUp) {
        setModeSafe("revealed");
      }

      const snapTop =
        modeRef.current === "concealed"
          ? -(headerHeight + CONCEAL_EXTRA)
          : 0;

      /* Instant show on ↑ so fast scroll near banner is not delayed by GSAP. */
      const motion =
        modeRef.current === "revealed" && scrollingUp ? "pin" : "snap";

      applyTop(snapTop, motion);
      return;
    }

    /* ── Banner zone ── */
    setModeSafe("hero");

    if (enteringBanner || scrollingUp) {
      bannerPinActiveRef.current = false;
    }

    const inCollision = bannerBottom < headerHeight;

    /* Pin only on deliberate ↓ from inside banner — not on entry / fling decay. */
    if (
      !enteringBanner &&
      !scrollingUp &&
      inCollision &&
      activelyScrollingDown
    ) {
      bannerPinActiveRef.current = true;
    }

    const shouldPin =
      inCollision && bannerPinActiveRef.current && !scrollingUp;

    if (shouldPin) {
      setIsBannerPinned(true);
      gsap.killTweensOf(header);
      applyTop(pinTopForBanner(bannerBottom, headerHeight), "pin");
      return;
    }

    bannerPinActiveRef.current = false;
    setIsBannerPinned(false);
    gsap.killTweensOf(header);
    applyTop(0, "pin");
  });

  return { mode, isScrolled, isBannerPinned };
}
