"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import {
  CardSlider,
  CardSliderNav,
  CardSliderSlide,
  useCardSlider,
} from "@/components/CardSlider";

import styles from "./style.module.css";

const THUMB_SPRING = {
  type: "spring" as const,
  stiffness: 220,
  damping: 26,
  mass: 0.6,
};

export type MediaThumbItem = Readonly<{
  id: string;
  thumbSrc: string;
  thumbAlt: string;
}>;

type MediaThumbStripProps = Readonly<{
  items: ReadonlyArray<MediaThumbItem>;
  activeId: string;
  onSelect: (id: string) => void;
  ariaLabel: string;
  prevLabel: string;
  nextLabel: string;
  mounted: boolean;
}>;

export function MediaThumbStrip({
  items,
  activeId,
  onSelect,
  ariaLabel,
  prevLabel,
  nextLabel,
  mounted,
}: MediaThumbStripProps) {
  const prefersReducedMotion = useReducedMotion();
  const thumbSlider = useCardSlider();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const thumbTransition =
    mounted && !prefersReducedMotion ? THUMB_SPRING : { duration: 0 };

  return (
    <div
      className={styles.thumbRegion}
      role="tablist"
      aria-label={ariaLabel}
      data-lenis-prevent-horizontal
    >
      <CardSlider emblaRef={thumbSlider.emblaRef} className={styles.thumbSlider}>
        {items.map((item) => {
          const isActive = item.id === activeId;
          const isHovered = mounted && hoveredId === item.id;

          return (
            <CardSliderSlide key={item.id}>
              <div className={styles.thumbItem}>
                <motion.button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.thumb} ${isActive ? styles.thumbActive : ""}`}
                  onClick={() => onSelect(item.id)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(item.id)}
                  onBlur={() => setHoveredId(null)}
                  animate={{
                    scale:
                      mounted && !prefersReducedMotion && isHovered ? 1.06 : 1,
                  }}
                  transition={thumbTransition}
                >
                  <div
                    className={styles.thumbImage}
                    style={{ backgroundImage: `url(${item.thumbSrc})` }}
                    role="img"
                    aria-label={item.thumbAlt}
                  />
                </motion.button>
              </div>
            </CardSliderSlide>
          );
        })}
      </CardSlider>

      <CardSliderNav
        prevLabel={prevLabel}
        nextLabel={nextLabel}
        canScrollPrev={thumbSlider.canScrollPrev}
        canScrollNext={thumbSlider.canScrollNext}
        onPrev={thumbSlider.scrollPrev}
        onNext={thumbSlider.scrollNext}
      />
    </div>
  );
}
