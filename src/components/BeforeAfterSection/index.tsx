"use client";

import gsap from "gsap";
import { CalendarCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { runBeforeAfterScrollReveal } from "@/animations";
import { BeforeAfterCompare } from "@/components/BeforeAfterCompare";
import { Button } from "@/components/Button";
import {
  CardSlider,
  CardSliderNav,
  CardSliderSlide,
  useCardSlider,
} from "@/components/CardSlider";
import cardSliderStyles from "@/components/CardSlider/style.module.css";
import {
  BEFORE_AFTER_BOOKING_VIDEO,
  BEFORE_AFTER_ITEMS,
} from "@/content/before-after-pairs";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/paths";

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
  const layoutRef = useRef<HTMLDivElement>(null);
  const bookingVideoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState(BEFORE_AFTER_ITEMS[0]?.id ?? "");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    bookingVideoRef.current?.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const root = sectionRef.current;
    const trigger = layoutRef.current;
    if (!root || !trigger) return;

    const ctx = gsap.context(() => {
      runBeforeAfterScrollReveal(
        trigger,
        {
          compareReveal: styles.compareReveal,
          thumbReveal: styles.thumbReveal,
          controlsReveal: cardSliderStyles.controlsReveal,
          bookingReveal: styles.bookingReveal,
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
  const { booking } = beforeAfter;

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

        <div ref={layoutRef} className={styles.layout}>
          <div className={styles.sliderCol}>
            <div className={`${styles.compareWrap} ${styles.compareReveal}`}>
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

          <aside className={styles.cardCol}>
            <article className={`${styles.bookingCard} ${styles.bookingReveal}`}>
              <video
                ref={bookingVideoRef}
                className={styles.bookingVideo}
                src={BEFORE_AFTER_BOOKING_VIDEO}
                muted
                playsInline
                loop
                autoPlay
                preload="metadata"
                aria-hidden
              />
              <div className={styles.bookingReadability} aria-hidden />

              <div className={styles.bookingContent}>
                <p className={styles.bookingBrand}>rim/studio</p>

                <div className={styles.bookingCopy}>
                  <p className={styles.bookingEyebrow}>{booking.eyebrow}</p>
                  <h3 className={styles.bookingTitle}>
                    {booking.title}{" "}
                    <span className={styles.bookingTitleAccent}>
                      {booking.titleAccent}
                    </span>
                  </h3>
                  <p className={styles.bookingBody}>{booking.body}</p>
                </div>

                <Button
                  href={localizedPath(locale, booking.cta.href)}
                  variant="accent"
                  size="md"
                  expandFromIcon
                  icon={<CalendarCheck strokeWidth={1.75} aria-hidden />}
                  className={styles.bookingCta}
                >
                  {booking.cta.label}
                </Button>
              </div>
            </article>
          </aside>
        </div>
      </div>
    </section>
  );
}
