"use client";

import { Expand } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import styles from "./style.module.css";

type WorkGalleryProps = Readonly<{
  src: string;
  alt: string;
  counterLabel?: string;
  openLabel: string;
  className?: string;
  onOpenLightbox?: () => void;
}>;

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

export function WorkGallery({
  src,
  alt,
  counterLabel,
  openLabel,
  className,
  onOpenLightbox,
}: WorkGalleryProps) {
  const prefersReducedMotion = useReducedMotion();
  const [visibleSrc, setVisibleSrc] = useState(src);
  const [isSwitching, setIsSwitching] = useState(false);
  const displayedRef = useRef(src);

  useEffect(() => {
    if (src === displayedRef.current) return;

    let cancelled = false;

    const swapImage = async () => {
      setIsSwitching(true);

      try {
        await preloadImage(src);
        if (cancelled) return;
        displayedRef.current = src;
        setVisibleSrc(src);
      } catch {
        if (cancelled) return;
        displayedRef.current = src;
        setVisibleSrc(src);
      } finally {
        if (!cancelled) {
          requestAnimationFrame(() => setIsSwitching(false));
        }
      }
    };

    void swapImage();

    return () => {
      cancelled = true;
    };
  }, [src]);

  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const frameClass = [
    styles.frame,
    isSwitching ? styles.frameSwitching : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      {counterLabel ? (
        <span className={styles.counter}>{counterLabel}</span>
      ) : null}

      <button
        type="button"
        className={frameClass}
        onClick={onOpenLightbox}
        aria-label={openLabel}
      >
        <motion.img
          key={visibleSrc}
          src={visibleSrc}
          alt={alt}
          className={styles.image}
          initial={prefersReducedMotion ? false : { opacity: 0.88, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
          }
          draggable={false}
        />
        <span className={styles.sheen} aria-hidden />
        <span className={styles.expandHint} aria-hidden>
          <Expand strokeWidth={1.75} />
        </span>
      </button>
    </div>
  );
}

export { GalleryLightbox, type GalleryLightboxItem } from "./GalleryLightbox";
