"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { useRouter, usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { lockScroll } from "@/lib/scrollLock";
import {
  computeCoverRadiusPx,
  isModifiedClick,
  normalizePathname,
  ROUTE_BAR_FILL_DURATION_S,
  ROUTE_BAR_HOLD_S,
  ROUTE_COVER_DURATION_S,
  ROUTE_MORPH_DURATION_S,
  ROUTE_MORPH_TARGET_SIZE,
  ROUTE_REVEAL_CONTENT_RATIO,
  ROUTE_REVEAL_DURATION_S,
  ROUTE_REVEAL_PLATE_FADE_S,
  ROUTE_REVEAL_TARGET_SIZE,
  ROUTE_TEXT_FADE_S,
  routeCharRollDuration,
  routeCharStaggerAmount,
  shouldSkipRouteTransition,
} from "@/lib/route-transition";

import styles from "./style.module.css";

const LOGO_TEXT = "rim.studio";

const PILL_WIDTH = "clamp(22rem, 60vw, 40rem)";
const PILL_HEIGHT = "calc(clamp(22rem, 60vw, 40rem) / 5)";

type RouteTransitionContextValue = Readonly<{
  isTransitioning: boolean;
}>;

const RouteTransitionContext = createContext<RouteTransitionContextValue>({
  isTransitioning: false,
});

export function useRouteTransition(): RouteTransitionContextValue {
  return useContext(RouteTransitionContext);
}

type RouteTransitionProps = Readonly<{
  children: ReactNode;
  onIntroGate: (ready: boolean) => void;
  introBootstrapped: boolean;
  onNavigationStart?: () => void;
}>;

export function RouteTransition({
  children,
  onIntroGate,
  introBootstrapped,
  onNavigationStart,
}: RouteTransitionProps) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion() === true;

  const overlayRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const cutoutRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const revealBgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const busyRef = useRef(false);
  const pendingTargetRef = useRef<string | null>(null);
  const releaseScrollRef = useRef<(() => void) | undefined>(undefined);
  const originRef = useRef({ x: 0, y: 0 });
  const coverRadiusRef = useRef(0);

  const chars = useMemo(() => Array.from(LOGO_TEXT), []);

  const resetTransitionLayers = useCallback(() => {
    const overlay = overlayRef.current;
    const root = rootRef.current;
    const cutout = cutoutRef.current;
    const plate = plateRef.current;
    const revealBg = revealBgRef.current;
    const logo = logoRef.current;

    overlay?.classList.remove(styles.overlayActive);
    root?.classList.remove(styles.transitionRootActive);

    if (overlay) {
      gsap.set(overlay, {
        clipPath: "circle(0px at 50% 50%)",
        opacity: 0,
        clearProps: "visibility",
      });
    }

    if (revealBg) gsap.set(revealBg, { scaleX: 0, opacity: 0 });
    if (plate) gsap.set(plate, { opacity: 0 });
    if (logo) gsap.set(logo, { opacity: 1 });
    if (cutout) {
      gsap.set(cutout, {
        width: PILL_WIDTH,
        height: PILL_HEIGHT,
        boxShadow: "0 0 0 200vmax var(--brand-ink-700)",
        clearProps: "opacity",
      });
    }

    if (root) {
      gsap.set(root, { opacity: 0, clearProps: "visibility" });
    }

    gsap.set(`.${styles.logoText}`, { visibility: "hidden" });
    gsap.set(`.${styles.char}`, { yPercent: 0 });
  }, []);

  const playCover = useCallback((): Promise<void> => {
    const overlay = overlayRef.current;
    const root = rootRef.current;
    if (!overlay) return Promise.resolve();

    resetTransitionLayers();
    root?.classList.remove(styles.transitionRootActive);

    overlay.classList.add(styles.overlayActive);
    gsap.set(overlay, { opacity: 1 });

    const { x, y } = originRef.current;
    const radius = coverRadiusRef.current;

    gsap.killTweensOf(overlay);

    return new Promise((resolve) => {
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(overlay, { clipPath: "none" });
            resolve();
          },
        })
        .set(overlay, {
          clipPath: `circle(0px at ${x}px ${y}px)`,
        })
        .to(overlay, {
          clipPath: `circle(${radius}px at ${x}px ${y}px)`,
          duration: ROUTE_COVER_DURATION_S,
          ease: "expo.in",
        });
    });
  }, [resetTransitionLayers]);

  const playLogoBeat = useCallback((): Promise<void> => {
    const overlay = overlayRef.current;
    const root = rootRef.current;
    const revealBg = revealBgRef.current;
    if (!root || !revealBg) return Promise.resolve();

    if (overlay) {
      overlay.classList.remove(styles.overlayActive);
      gsap.set(overlay, { opacity: 0, clipPath: "circle(0px at 50% 50%)" });
    }

    root.classList.add(styles.transitionRootActive);
    gsap.set(root, { opacity: 1 });
    gsap.set(plateRef.current, { opacity: 1 });
    gsap.set(revealBg, { opacity: 1, scaleX: 0 });
    gsap.set(logoRef.current, { opacity: 1 });

    gsap.killTweensOf([
      revealBg,
      logoRef.current,
      cutoutRef.current,
      `.${styles.char}`,
    ]);

    const charRoll = routeCharRollDuration();
    const charStagger = routeCharStaggerAmount();

    return new Promise((resolve) => {
      const tl = gsap.timeline({ onComplete: resolve });

      const barTl = gsap.timeline();
      barTl
        .to(revealBg, { scaleX: 0.18, duration: 0.22, ease: "power2.out" })
        .to(revealBg, { scaleX: 0.4, duration: 0.32, ease: "power1.inOut" })
        .to(revealBg, { scaleX: 0.65, duration: 0.32, ease: "power2.in" })
        .to(revealBg, { scaleX: 0.86, duration: 0.28, ease: "power1.inOut" })
        .to(revealBg, { scaleX: 1, duration: 0.26, ease: "power3.out" });

      tl.add(barTl, 0);
      tl.set(`.${styles.logoText}`, { visibility: "visible" }, 0);
      tl.from(
        `.${styles.char}`,
        {
          yPercent: -100,
          ease: "power2.inOut",
          duration: charRoll,
          stagger: { amount: charStagger, from: "random" },
        },
        0,
      );
      tl.addLabel("barFull", ROUTE_BAR_FILL_DURATION_S);
      tl.to({}, { duration: ROUTE_BAR_HOLD_S }, "barFull");
    });
  }, []);

  const playReveal = useCallback((): Promise<void> => {
    const root = rootRef.current;
    const cutout = cutoutRef.current;
    const plate = plateRef.current;
    const revealBg = revealBgRef.current;
    const logo = logoRef.current;
    if (!root || !cutout || !plate || !revealBg || !logo) {
      return Promise.resolve();
    }

    gsap.killTweensOf([cutout, plate, revealBg, logo, `.${styles.char}`]);

    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => {
          resetTransitionLayers();
          resolve();
        },
      });

      tl.to(
        logo,
        {
          opacity: 0,
          duration: ROUTE_TEXT_FADE_S,
          ease: "power2.in",
        },
        0,
      );

      tl.to(
        cutout,
        {
          width: ROUTE_MORPH_TARGET_SIZE,
          height: ROUTE_MORPH_TARGET_SIZE,
          duration: ROUTE_MORPH_DURATION_S,
          ease: "expo.inOut",
        },
        ROUTE_TEXT_FADE_S,
      );

      tl.addLabel(
        "revealStart",
        ROUTE_TEXT_FADE_S + ROUTE_MORPH_DURATION_S,
      );

      tl.to(
        [revealBg, plate],
        {
          opacity: 0,
          duration: ROUTE_REVEAL_PLATE_FADE_S,
          ease: "power2.in",
        },
        "revealStart",
      );

      tl.call(
        () => {
          if (lenis) {
            lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo(0, 0);
          }
          onIntroGate(true);
        },
        [],
        `revealStart+=${ROUTE_REVEAL_DURATION_S * ROUTE_REVEAL_CONTENT_RATIO}`,
      );

      tl.to(
        cutout,
        {
          width: ROUTE_REVEAL_TARGET_SIZE,
          height: ROUTE_REVEAL_TARGET_SIZE,
          duration: ROUTE_REVEAL_DURATION_S,
          ease: "expo.in",
        },
        "revealStart",
      );

      tl.set(
        [plate, revealBg, logo, cutout],
        {
          opacity: 0,
          boxShadow: "0 0 0 0 transparent",
        },
        `revealStart+=${ROUTE_REVEAL_DURATION_S}`,
      );

      tl.set(root, { opacity: 0 }, `revealStart+=${ROUTE_REVEAL_DURATION_S}`);
    });
  }, [lenis, onIntroGate, resetTransitionLayers]);

  const startNavigation = useCallback(
    async (href: string, origin: { x: number; y: number }) => {
      if (busyRef.current || !introBootstrapped) {
        router.push(href);
        return;
      }

      const target = normalizePathname(href);
      const current = normalizePathname(pathname);
      if (target === current) return;

      onNavigationStart?.();

      busyRef.current = true;
      setIsTransitioning(true);
      pendingTargetRef.current = target;
      originRef.current = origin;
      coverRadiusRef.current = computeCoverRadiusPx(
        origin.x,
        origin.y,
        window.innerWidth,
        window.innerHeight,
      );

      releaseScrollRef.current?.();
      releaseScrollRef.current = lockScroll();
      lenis?.stop();
      onIntroGate(false);

      if (prefersReducedMotion) {
        router.push(href);
        return;
      }

      await playCover();
      await playLogoBeat();
      router.push(href);
    },
    [
      introBootstrapped,
      lenis,
      onIntroGate,
      onNavigationStart,
      pathname,
      playCover,
      playLogoBeat,
      prefersReducedMotion,
      router,
    ],
  );

  useEffect(() => {
    const pending = pendingTargetRef.current;
    if (!busyRef.current || !pending) return;

    const current = normalizePathname(pathname);
    if (current !== pending) return;

    const finish = async () => {
      if (prefersReducedMotion) {
        onIntroGate(true);
        lenis?.start();
        releaseScrollRef.current?.();
        releaseScrollRef.current = undefined;
        busyRef.current = false;
        setIsTransitioning(false);
        pendingTargetRef.current = null;
        resetTransitionLayers();
        return;
      }

      await playReveal();
      lenis?.start();
      ScrollTrigger.refresh();
      releaseScrollRef.current?.();
      releaseScrollRef.current = undefined;
      busyRef.current = false;
      setIsTransitioning(false);
      pendingTargetRef.current = null;
    };

    void finish();
  }, [
    pathname,
    playReveal,
    prefersReducedMotion,
    lenis,
    onIntroGate,
    resetTransitionLayers,
  ]);

  useEffect(() => {
    return () => {
      releaseScrollRef.current?.();
      releaseScrollRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (!introBootstrapped) return;

    const onClick = (event: MouseEvent) => {
      if (busyRef.current) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (isModifiedClick(event)) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (shouldSkipRouteTransition(anchor)) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;

      const nextPath = normalizePathname(
        `${url.pathname}${url.search}${url.hash}`,
      );
      const currentPath = normalizePathname(
        `${window.location.pathname}${window.location.search}${window.location.hash}`,
      );

      if (nextPath === currentPath) return;

      event.preventDefault();
      event.stopPropagation();

      void startNavigation(`${url.pathname}${url.search}${url.hash}`, {
        x: event.clientX,
        y: event.clientY,
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [introBootstrapped, startNavigation]);

  const value = useMemo(() => ({ isTransitioning }), [isTransitioning]);

  return (
    <RouteTransitionContext.Provider value={value}>
      {children}
      <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />
      <div ref={rootRef} className={styles.transitionRoot} aria-hidden="true">
        <div ref={plateRef} className={styles.plate} />
        <div ref={revealBgRef} className={styles.revealBg} />
        <div ref={logoRef} className={styles.logo}>
          <p className={styles.logoText} aria-label={LOGO_TEXT}>
            {chars.map((ch, i) => (
              <span
                key={`${ch}-${i}`}
                className={styles.charMask}
                aria-hidden="true"
              >
                <span className={styles.char}>
                  <span className={styles.charOg}>{ch}</span>
                  <span className={styles.charDup}>{ch}</span>
                </span>
              </span>
            ))}
          </p>
        </div>
        <div className={styles.revealFrame}>
          <div ref={cutoutRef} className={styles.cutout} />
        </div>
      </div>
    </RouteTransitionContext.Provider>
  );
}
