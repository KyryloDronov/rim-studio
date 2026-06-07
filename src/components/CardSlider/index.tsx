"use client";

import useEmblaCarousel from "embla-carousel-react";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import styles from "./style.module.css";

const DEFAULT_OPTIONS = {
  align: "start",
  containScroll: "trimSnaps",
  dragFree: false,
  duration: 32,
} as const;

const WHEEL_GESTURES = [
  WheelGesturesPlugin({ forceWheelAxis: "x" }),
];

/** Block Lenis page scroll when a trackpad pan over the carousel is mostly horizontal. */
const HORIZONTAL_WHEEL_RATIO = 0.45;
const HORIZONTAL_WHEEL_MIN_PX = 4;

function useCarouselLenisWheelGuard(emblaApi: ReturnType<typeof useEmblaCarousel>[1]) {
  useEffect(() => {
    if (!emblaApi) return;

    const viewport = emblaApi.rootNode();
    const node = viewport?.parentElement ?? viewport;
    if (!node) return;

    const onWheelCapture = (event: WheelEvent) => {
      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);

      if (absX < 1) return;

      const hasHorizontalIntent =
        absX >= absY * HORIZONTAL_WHEEL_RATIO || absX >= HORIZONTAL_WHEEL_MIN_PX;

      if (!hasHorizontalIntent) return;

      (
        event as WheelEvent & { lenisStopPropagation?: boolean }
      ).lenisStopPropagation = true;

      if (event.cancelable) {
        event.preventDefault();
      }
    };

    node.addEventListener("wheel", onWheelCapture, {
      capture: true,
      passive: false,
    });

    return () => {
      node.removeEventListener("wheel", onWheelCapture, { capture: true });
    };
  }, [emblaApi]);
}

type CardSliderOptions = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;

export function useCardSlider(options: CardSliderOptions = DEFAULT_OPTIONS) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, WHEEL_GESTURES);
  useCarouselLenisWheelGuard(emblaApi);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateControls = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateControls);
    emblaApi.on("reInit", updateControls);
    emblaApi.on("init", updateControls);
    return () => {
      emblaApi.off("select", updateControls);
      emblaApi.off("reInit", updateControls);
      emblaApi.off("init", updateControls);
    };
  }, [emblaApi, updateControls]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return {
    emblaRef,
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
  };
}

type CardSliderNavProps = Readonly<{
  prevLabel: string;
  nextLabel: string;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}>;

function NavIcon({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span className={styles.iconSlot} aria-hidden="true">
      <span className={`${styles.iconLayer} ${styles.iconFront}`}>{children}</span>
      <span className={`${styles.iconLayer} ${styles.iconBack}`}>{children}</span>
    </span>
  );
}

export function CardSliderNav({
  prevLabel,
  nextLabel,
  canScrollPrev,
  canScrollNext,
  onPrev,
  onNext,
  className,
}: CardSliderNavProps) {
  const navClass = [styles.controls, styles.controlsReveal, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={navClass}>
      {canScrollPrev ? (
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navBtnPrev}`}
          onClick={onPrev}
          aria-label={prevLabel}
        >
          <NavIcon>
            <ChevronLeft strokeWidth={1.75} />
          </NavIcon>
        </button>
      ) : null}
      {canScrollNext ? (
        <button
          type="button"
          className={`${styles.navBtn} ${styles.navBtnNext}`}
          onClick={onNext}
          aria-label={nextLabel}
        >
          <NavIcon>
            <ChevronRight strokeWidth={1.75} />
          </NavIcon>
        </button>
      ) : null}
    </div>
  );
}

type CardSliderViewportProps = Readonly<{
  emblaRef: ReturnType<typeof useCardSlider>["emblaRef"];
  className?: string;
  children: ReactNode;
}>;

export function CardSliderViewport({
  emblaRef,
  className,
  children,
}: CardSliderViewportProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div className={rootClass} data-lenis-prevent-horizontal>
      <div
        className={styles.viewport}
        ref={emblaRef}
        data-lenis-prevent-horizontal
      >
        <div className={styles.container} role="list">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Slide shell — width is driven by CSS custom properties on `.root`. */
export function CardSliderSlide({
  children,
  className,
}: Readonly<{ children: ReactNode; className?: string }>) {
  const slideClass = [styles.slide, className].filter(Boolean).join(" ");
  return (
    <div className={slideClass} role="listitem">
      {children}
    </div>
  );
}

/** Convenience wrapper when nav lives outside the viewport. */
type CardSliderProps = Readonly<{
  emblaRef: ReturnType<typeof useCardSlider>["emblaRef"];
  className?: string;
  children: ReactNode;
}>;

export function CardSlider({ emblaRef, className, children }: CardSliderProps) {
  return (
    <CardSliderViewport emblaRef={emblaRef} className={className}>
      {children}
    </CardSliderViewport>
  );
}
