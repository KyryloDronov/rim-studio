"use client";

import { useLenis } from "lenis/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { lockScroll } from "@/lib/scrollLock";

import styles from "./lightbox.module.css";

export type GalleryLightboxItem = Readonly<{
  id: string;
  src: string;
  alt: string;
  thumbAlt: string;
}>;

type GalleryLightboxProps = Readonly<{
  open: boolean;
  onClose: () => void;
  items: ReadonlyArray<GalleryLightboxItem>;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
  counterLabel: string;
}>;

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export function GalleryLightbox({
  open,
  onClose,
  items,
  activeIndex,
  onActiveIndexChange,
  closeLabel,
  prevLabel,
  nextLabel,
  counterLabel,
}: GalleryLightboxProps) {
  const isClient = useIsClient();
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();
  const dialogRef = useRef<HTMLDivElement>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const activeItem = items[activeIndex];

  const goPrev = useCallback(() => {
    if (items.length <= 1) return;
    onActiveIndexChange((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onActiveIndexChange]);

  const goNext = useCallback(() => {
    if (items.length <= 1) return;
    onActiveIndexChange((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onActiveIndexChange]);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const releaseScroll = lockScroll();
    lenis?.stop();
    return () => {
      releaseScroll();
      lenis?.start();
    };
  }, [lenis, open]);

  useEffect(() => {
    if (!open || !activeItem) return;
    const strip = thumbStripRef.current;
    const activeThumb = strip?.querySelector<HTMLElement>(
      `[data-lightbox-thumb="${activeItem.id}"]`,
    );
    activeThumb?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeItem, open, prefersReducedMotion]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  if (!isClient || !open || !activeItem) return null;

  return createPortal(
    <div
      ref={dialogRef}
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-label={counterLabel}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      data-lenis-prevent
    >
      <button
        type="button"
        className={styles.backdrop}
        aria-label={closeLabel}
        onClick={onClose}
      />

      <div className={styles.toolbar}>
        <span className={styles.counter}>{counterLabel}</span>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label={closeLabel}
        >
          <X strokeWidth={1.75} aria-hidden />
        </button>
      </div>

      <div className={styles.stage}>
        {items.length > 1 ? (
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navBtnPrev}`}
            onClick={goPrev}
            aria-label={prevLabel}
          >
            <ChevronLeft strokeWidth={1.75} aria-hidden />
          </button>
        ) : null}

        <div className={styles.imageFrame}>
          <AnimatePresence mode="sync" initial={false}>
            <motion.img
              key={activeItem.src}
              src={activeItem.src}
              alt={activeItem.alt}
              className={styles.image}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.99 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
              }
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {items.length > 1 ? (
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navBtnNext}`}
            onClick={goNext}
            aria-label={nextLabel}
          >
            <ChevronRight strokeWidth={1.75} aria-hidden />
          </button>
        ) : null}
      </div>

      {items.length > 1 ? (
        <div
          ref={thumbStripRef}
          className={styles.thumbStrip}
          role="tablist"
          aria-label={counterLabel}
          data-lenis-prevent-horizontal
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                data-lightbox-thumb={item.id}
                aria-selected={isActive}
                className={`${styles.thumb} ${isActive ? styles.thumbActive : ""}`}
                onClick={() => onActiveIndexChange(index)}
              >
                <span
                  className={styles.thumbImage}
                  style={{ backgroundImage: `url(${item.src})` }}
                  role="img"
                  aria-label={item.thumbAlt}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>,
    document.body,
  );
}
