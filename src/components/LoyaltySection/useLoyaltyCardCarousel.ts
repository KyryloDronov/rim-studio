"use client";

import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  LOYALTY_POOL_MIN,
  LOYALTY_TIER_ORDER,
} from "@/content/loyalty-tiers";

/** Pixels per second — smooth upward conveyor. */
const SCROLL_SPEED = 21;
const MOUSE_DAMPING = 0.08;
/** Vertical gap between card centres — larger = more air between cards. */
const CARD_GAP = 40;
const SIZE_SCALE = 1.125;
const TIER_COUNT = LOYALTY_TIER_ORDER.length;

const CARD_PERSONALITY = [
  { rotZ: -2, rotY: -1.5, rotX: -0.6, x: 0 },
  { rotZ: 0.8, rotY: 1.2, rotX: 0.4, x: 0 },
  { rotZ: 2, rotY: -1, rotX: -0.3, x: 0 },
  { rotZ: -1.2, rotY: 1, rotX: 0.5, x: 0 },
  { rotZ: 1.5, rotY: -0.8, rotX: -0.4, x: 0 },
] as const;

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

/** Soft fade + shrink zone at top/bottom — cards dissolve into section bg. */
function edgeDissolve(
  y: number,
  cardH: number,
  viewportH: number,
): number {
  const centerY = y + cardH / 2;
  const fadeZone = Math.max(viewportH * 0.2, cardH * 0.55);
  const topFade = clamp01(centerY / fadeZone);
  const bottomFade = clamp01((viewportH - centerY) / fadeZone);
  return Math.min(topFade, bottomFade);
}

type CarouselMetrics = Readonly<{
  cardW: number;
  cardH: number;
  slotH: number;
  viewportH: number;
  poolSize: number;
  loopH: number;
}>;

function spreadTiers(poolSize: number): number[] {
  return Array.from({ length: poolSize }, (_, index) => index % TIER_COUNT);
}

function resizeTiers(prev: number[], poolSize: number): number[] {
  const next = spreadTiers(poolSize);
  for (let i = 0; i < poolSize; i++) {
    if (prev[i] !== undefined) next[i] = prev[i];
  }
  return next;
}

function computeCardSize(viewportW: number): Pick<
  CarouselMetrics,
  "cardW" | "cardH" | "slotH"
> {
  const isMobile = viewportW < 768;

  let cardW = isMobile
    ? Math.round(Math.min(280, viewportW * 0.72))
    : Math.round(Math.min(300, viewportW * 0.2 + 88));

  cardW = Math.round(cardW * SIZE_SCALE);
  cardW = Math.max(210, Math.min(338, cardW));

  const cardH = Math.round(cardW / 1.55);
  const slotH = cardH + CARD_GAP;

  return { cardW, cardH, slotH };
}

function measureViewportHeight(
  viewport: HTMLElement,
  root: HTMLElement,
): number {
  const styles = globalThis.getComputedStyle(viewport);
  const padding =
    Number.parseFloat(styles.paddingTop) +
    Number.parseFloat(styles.paddingBottom);
  const fromViewport = Math.max(0, viewport.clientHeight - padding);
  if (fromViewport > 0) return fromViewport;

  const fromRoot = root.clientHeight;
  if (fromRoot > 0) return fromRoot;

  return 520;
}

function centerStackOffset(
  viewportH: number,
  cardH: number,
  focusY: number,
): number {
  return viewportH - cardH * 0.5 - focusY;
}

function isDesktopStageSync(): boolean {
  return globalThis.window?.matchMedia("(min-width: 992px)").matches ?? false;
}

function resolveFocusY(
  viewport: HTMLElement,
  copyEl: HTMLElement | null,
  viewportH: number,
  cardH: number,
): number {
  if (!copyEl || !isDesktopStageSync()) {
    return viewportH * 0.5;
  }

  const viewportRect = viewport.getBoundingClientRect();
  const copyRect = copyEl.getBoundingClientRect();
  const target =
    copyRect.top + copyRect.height * 0.5 - viewportRect.top;

  return Math.max(
    cardH * 0.5,
    Math.min(viewportH - cardH * 0.5, target),
  );
}

function measureStageHeight(
  viewport: HTMLElement,
  root: HTMLElement,
  copyEl: HTMLElement | null,
): number {
  if (copyEl && isDesktopStageSync()) {
    const copyH = Math.round(copyEl.getBoundingClientRect().height);
    const stageH = Math.max(copyH, 280);
    root.style.height = `${stageH}px`;
    return stageH;
  }

  root.style.removeProperty("height");
  return measureViewportHeight(viewport, root);
}

function buildMetrics(viewportW: number, viewportH: number): CarouselMetrics {
  const card = computeCardSize(viewportW);
  const poolSize = Math.max(
    LOYALTY_POOL_MIN,
    Math.ceil((viewportH + card.cardH) / card.slotH) + 1,
  );

  return {
    ...card,
    viewportH,
    poolSize,
    loopH: poolSize * card.slotH,
  };
}

type UseLoyaltyCardCarouselOptions = Readonly<{
  enabled: boolean;
  copyAnchorRef?: RefObject<HTMLElement | null>;
}>;

export function useLoyaltyCardCarousel({
  enabled,
  copyAnchorRef,
}: UseLoyaltyCardCarouselOptions) {
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameId = useRef(0);
  const lastTsRef = useRef(0);
  const offsetPxRef = useRef(0);
  const spawnCounterRef = useRef(0);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const metricsRef = useRef<CarouselMetrics>(buildMetrics(400, 600));
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);
  const pendingTierUpdatesRef = useRef<Map<number, number>>(new Map());

  const [slotTiers, setSlotTiers] = useState<number[]>(() =>
    spreadTiers(LOYALTY_POOL_MIN),
  );
  const [layoutMetrics, setLayoutMetrics] = useState(() => {
    const m = buildMetrics(400, 600);
    return { cardW: m.cardW, cardH: m.cardH, poolSize: m.poolSize };
  });

  const flushTierUpdates = useCallback(() => {
    const pending = pendingTierUpdatesRef.current;
    if (pending.size === 0) return;

    setSlotTiers((prev) => {
      const next = prev.length ? [...prev] : spreadTiers(metricsRef.current.poolSize);
      for (const [index, tier] of pending) {
        next[index] = tier;
      }
      return next;
    });
    pending.clear();
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry?.isIntersecting ?? false;
      },
      { threshold: 0.12 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const viewport = viewportRef.current;
    const root = rootRef.current;
    if (!viewport || !root) return;

    const sync = () => {
      const copyEl = copyAnchorRef?.current ?? null;
      const stageH = measureStageHeight(viewport, root, copyEl);
      const next = buildMetrics(root.clientWidth, stageH);
      const prevPool = metricsRef.current.poolSize;
      const prevViewportH = metricsRef.current.viewportH;
      metricsRef.current = next;

      const focusY = resolveFocusY(viewport, copyEl, next.viewportH, next.cardH);

      if (
        prevViewportH <= 0 ||
        Math.abs(prevViewportH - next.viewportH) > 8
      ) {
        offsetPxRef.current = centerStackOffset(
          next.viewportH,
          next.cardH,
          focusY,
        );
      }

      setLayoutMetrics({
        cardW: next.cardW,
        cardH: next.cardH,
        poolSize: next.poolSize,
      });

      if (next.poolSize !== prevPool) {
        setSlotTiers((prev) => resizeTiers(prev, next.poolSize));
        spawnCounterRef.current = Math.max(
          spawnCounterRef.current,
          next.poolSize,
        );
      }
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(viewport);
    ro.observe(root);
    if (copyAnchorRef?.current) {
      ro.observe(copyAnchorRef.current);
    }

    return () => ro.disconnect();
  }, [copyAnchorRef, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (event: MouseEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const rx = (event.clientX - rect.left) / rect.width - 0.5;
      const ry = (event.clientY - rect.top) / rect.height - 0.5;
      mouse.current.targetX = Math.max(-0.5, Math.min(0.5, rx));
      mouse.current.targetY = Math.max(-0.5, Math.min(0.5, ry));
    };

    const onMouseLeave = () => {
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
    };

    const root = rootRef.current;
    if (!root) return;

    root.addEventListener("mousemove", onMouseMove);
    root.addEventListener("mouseleave", onMouseLeave);

    return () => {
      root.removeEventListener("mousemove", onMouseMove);
      root.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const assignTierOnRespawn = (index: number): number => {
      const tier = spawnCounterRef.current++ % TIER_COUNT;
      pendingTierUpdatesRef.current.set(index, tier);
      return tier;
    };

    const tick = (ts: number) => {
      const lastTs = lastTsRef.current || ts;
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTsRef.current = ts;

      if (inViewRef.current) {
        offsetPxRef.current += SCROLL_SPEED * dt;
      }

      mouse.current.x += (mouse.current.targetX - mouse.current.x) * MOUSE_DAMPING;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * MOUSE_DAMPING;

      const { slotH, cardH, viewportH, poolSize, loopH } = metricsRef.current;
      if (viewportH <= 0 || loopH <= 0) {
        frameId.current = requestAnimationFrame(tick);
        return;
      }

      const offset = offsetPxRef.current;
      const viewport = viewportRef.current;
      const copyEl = copyAnchorRef?.current ?? null;
      const focusY = viewport
        ? resolveFocusY(viewport, copyEl, viewportH, cardH)
        : viewportH * 0.5;

      for (let i = 0; i < poolSize; i++) {
        const card = cardsRefs.current[i];
        if (!card) continue;

        let y = viewportH - cardH - i * slotH - offset;

        // Only swap tier when the card has fully left through the top edge.
        while (y < -cardH) {
          y += loopH;
          assignTierOnRespawn(i);
        }

        while (y > viewportH) {
          y -= loopH;
        }

        const centerY = y + cardH / 2;
        const dist = Math.abs(centerY - focusY) / slotH;
        const focus = Math.max(0, 1 - dist * 0.68);
        const edge = edgeDissolve(y, cardH, viewportH);

        const z = 280 * focus - 60 * (1 - focus);
        const stackTilt = ((centerY - focusY) / slotH) * 10;
        const focusScale = 0.92 + focus * 0.08;
        const edgeScale = 0.82 + edge * 0.18;
        const scale = focusScale * edgeScale;
        const opacity = Math.min(1, (0.62 + focus * 0.38) * (0.35 + edge * 0.65));

        const personality = CARD_PERSONALITY[i % CARD_PERSONALITY.length];

        const parallaxY = mouse.current.x * 6 * focus;
        const parallaxX = -mouse.current.y * 4 * focus;

        const rotX = stackTilt + parallaxX + personality.rotX;
        const rotY = parallaxY + personality.rotY;
        const rotZ = personality.rotZ;

        card.style.visibility = "visible";
        card.style.zIndex = String(Math.round(z));
        card.style.opacity = opacity.toFixed(3);
        card.style.transform = `translate3d(${personality.x.toFixed(1)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      }

      if (pendingTierUpdatesRef.current.size > 0) {
        flushTierUpdates();
      }

      frameId.current = requestAnimationFrame(tick);
    };

    frameId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId.current);
  }, [copyAnchorRef, enabled, flushTierUpdates]);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRefs.current[index] = el;
  };

  return {
    rootRef,
    viewportRef,
    setCardRef,
    slotTiers,
    layoutMetrics,
    thicknessLayers: [-1.2, -0.6] as const,
  };
}
