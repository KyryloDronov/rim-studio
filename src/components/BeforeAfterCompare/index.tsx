"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  useReactCompareSliderContext,
} from "react-compare-slider";

import styles from "./style.module.css";

type BeforeAfterCompareProps = Readonly<{
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}>;

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

function CompareHandle() {
  const { portrait } = useReactCompareSliderContext();

  return (
    <div
      className={styles.handleRoot}
      data-rcs="handle"
      style={{ flexDirection: portrait ? "row" : "column" }}
    >
      <span className={styles.handleLine} aria-hidden="true" />
      <span className={styles.handleButton} aria-hidden="true">
        <ChevronLeft strokeWidth={2} />
        <ChevronRight strokeWidth={2} />
      </span>
      <span className={styles.handleLine} aria-hidden="true" />
    </div>
  );
}

function CompareFallback({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: Readonly<{
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}>) {
  return (
    <div className={styles.fallback} aria-hidden="true">
      <img src={beforeSrc} alt={beforeAlt} className={styles.fallbackImage} />
      <img src={afterSrc} alt={afterAlt} className={styles.fallbackImage} />
    </div>
  );
}

export function BeforeAfterCompare({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  beforeAlt,
  afterAlt,
  className,
}: BeforeAfterCompareProps) {
  const [mounted, setMounted] = useState(false);
  const [visibleBefore, setVisibleBefore] = useState(beforeSrc);
  const [visibleAfter, setVisibleAfter] = useState(afterSrc);
  const [isSwitching, setIsSwitching] = useState(false);
  const displayedRef = useRef({ before: beforeSrc, after: afterSrc });

  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const shellClass = [styles.sliderShell, isSwitching ? styles.sliderShellSwitching : ""]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (
      beforeSrc === displayedRef.current.before &&
      afterSrc === displayedRef.current.after
    ) {
      return;
    }

    let cancelled = false;

    const swapImages = async () => {
      setIsSwitching(true);

      try {
        await Promise.all([preloadImage(beforeSrc), preloadImage(afterSrc)]);
        if (cancelled) return;
        displayedRef.current = { before: beforeSrc, after: afterSrc };
        setVisibleBefore(beforeSrc);
        setVisibleAfter(afterSrc);
      } catch {
        if (cancelled) return;
        displayedRef.current = { before: beforeSrc, after: afterSrc };
        setVisibleBefore(beforeSrc);
        setVisibleAfter(afterSrc);
      } finally {
        if (!cancelled) {
          requestAnimationFrame(() => setIsSwitching(false));
        }
      }
    };

    void swapImages();

    return () => {
      cancelled = true;
    };
  }, [beforeSrc, afterSrc, mounted]);

  return (
    <div className={rootClass}>
      <span className={`${styles.badge} ${styles.badgeBefore}`}>{beforeLabel}</span>
      <span className={`${styles.badge} ${styles.badgeAfter}`}>{afterLabel}</span>

      {mounted ? (
        <div className={shellClass}>
          <ReactCompareSlider
            className={styles.slider}
            handle={<CompareHandle />}
            itemOne={
              <ReactCompareSliderImage
                src={visibleBefore}
                alt={beforeAlt}
                className={styles.image}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={visibleAfter}
                alt={afterAlt}
                className={styles.image}
              />
            }
            portrait={false}
            onlyHandleDraggable={false}
            transition="0.15s ease-out"
          />
        </div>
      ) : (
        <CompareFallback
          beforeSrc={beforeSrc}
          afterSrc={afterSrc}
          beforeAlt={beforeAlt}
          afterAlt={afterAlt}
        />
      )}
    </div>
  );
}
