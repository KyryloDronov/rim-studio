"use client";

import gsap from "gsap";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { runShowcaseScrollReveal } from "@/animations";
import { BeforeAfterCompare } from "@/components/BeforeAfterCompare";
import {
  CardSlider,
  CardSliderNav,
  CardSliderSlide,
  useCardSlider,
} from "@/components/CardSlider";
import cardSliderStyles from "@/components/CardSlider/style.module.css";
import { BEFORE_AFTER_ITEMS } from "@/content/before-after-pairs";
import { useLocale } from "@/i18n/LocaleProvider";

import styles from "./style.module.css";

export const BEFORE_AFTER_SECTION_ID = "before-after";

const THUMB_SPRING = {
  type: "spring" as const,
  stiffness: 220,
  damping: 26,
  mass: 0.6,
};

/** Maps demo item ids to dictionary pair metadata. */
const THUMB_META_ID: Record<string, string> = {
  "demo-01": "amg-r19-a",
  "demo-03": "amg-r19-a",
  "demo-05": "amg-r19-a",
  "demo-07": "amg-r19-a",
  "demo-09": "amg-r19-a",
  "demo-02": "amg-r19-b",
  "demo-04": "amg-r19-b",
  "demo-06": "amg-r19-b",
  "demo-08": "amg-r19-b",
  "demo-10": "amg-r19-b",
};

export function BeforeAfterSection() {
  const { locale, t } = useLocale();
  const { beforeAfter } = t;
  const prefersReducedMotion = useReducedMotion();
  const thumbSlider = useCardSlider();
  const sectionRef = useRef<HTMLElement>(null);
  const thumbRegionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState(BEFORE_AFTER_ITEMS[0]?.id ?? "");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const root = sectionRef.current;
    const trigger = thumbRegionRef.current;
    if (!root || !trigger) return;

    const ctx = gsap.context(() => {
      runShowcaseScrollReveal(
        trigger,
        {
          cardReveal: styles.thumbReveal,
          controlsReveal: cardSliderStyles.controlsReveal,
        },
        Boolean(prefersReducedMotion),
      );
    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion, locale, BEFORE_AFTER_ITEMS.length]);

  const thumbTransition =
    mounted && !prefersReducedMotion ? THUMB_SPRING : { duration: 0 };

  const activeItem =
    BEFORE_AFTER_ITEMS.find((item) => item.id === activeId) ??
    BEFORE_AFTER_ITEMS[0];

  if (!activeItem) return null;

  const metaId = THUMB_META_ID[activeItem.id];
  const activeMeta = beforeAfter.pairs.find((pair) => pair.id === metaId);

  return (
    <section
      ref={sectionRef}
      id={BEFORE_AFTER_SECTION_ID}
      className={styles.section}
      aria-labelledby={`${BEFORE_AFTER_SECTION_ID}-title`}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id={`${BEFORE_AFTER_SECTION_ID}-title`} className={styles.title}>
            <span className={styles.titleStrong}>{beforeAfter.titleStrong}</span>{" "}
            <span className={styles.titleMuted}>{beforeAfter.titleMuted}</span>
          </h2>
        </header>

        <div className={styles.layout}>
          <div className={styles.sliderCol}>
            <div className={styles.compareWrap}>
              <BeforeAfterCompare
                beforeSrc={activeItem.beforeSrc}
                afterSrc={activeItem.afterSrc}
                beforeLabel={beforeAfter.beforeLabel}
                afterLabel={beforeAfter.afterLabel}
                beforeAlt={activeMeta?.beforeAlt ?? beforeAfter.beforeLabel}
                afterAlt={activeMeta?.afterAlt ?? beforeAfter.afterLabel}
              />
            </div>

            <div
              ref={thumbRegionRef}
              className={styles.thumbRegion}
              role="tablist"
              aria-label={beforeAfter.thumbsAriaLabel}
              data-lenis-prevent-horizontal
            >
              <CardSlider
                emblaRef={thumbSlider.emblaRef}
                className={styles.thumbSlider}
              >
                {BEFORE_AFTER_ITEMS.map((item) => {
                  const meta = beforeAfter.pairs.find(
                    (pair) => pair.id === THUMB_META_ID[item.id],
                  );
                  const isActive = item.id === activeId;
                  const isHovered = mounted && hoveredId === item.id;

                  return (
                    <CardSliderSlide key={item.id}>
                      <div className={styles.thumbReveal}>
                        <motion.button
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          className={`${styles.thumb} ${isActive ? styles.thumbActive : ""}`}
                          onClick={() => setActiveId(item.id)}
                          onMouseEnter={() => setHoveredId(item.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onFocus={() => setHoveredId(item.id)}
                          onBlur={() => setHoveredId(null)}
                          animate={{
                            scale:
                              mounted && !prefersReducedMotion && isHovered
                                ? 1.06
                                : 1,
                          }}
                          transition={thumbTransition}
                        >
                          <div
                            className={styles.thumbImage}
                            style={{ backgroundImage: `url(${item.afterSrc})` }}
                            role="img"
                            aria-label={
                              meta?.thumbAlt ?? beforeAfter.thumbAltFallback
                            }
                          />
                        </motion.button>
                      </div>
                    </CardSliderSlide>
                  );
                })}
              </CardSlider>

              <CardSliderNav
                prevLabel={beforeAfter.prevLabel}
                nextLabel={beforeAfter.nextLabel}
                canScrollPrev={thumbSlider.canScrollPrev}
                canScrollNext={thumbSlider.canScrollNext}
                onPrev={thumbSlider.scrollPrev}
                onNext={thumbSlider.scrollNext}
              />
            </div>
          </div>

          <div className={styles.cardCol} aria-hidden="true">
            <div className={styles.card} />
          </div>
        </div>
      </div>
    </section>
  );
}
