"use client";

import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import { runShowcaseScrollReveal } from "@/animations";
import {
  CardSlider,
  CardSliderNav,
  CardSliderSlide,
  useCardSlider,
} from "@/components/CardSlider";
import cardSliderStyles from "@/components/CardSlider/style.module.css";
import { resolveShowcaseServiceCards } from "@/content/showcase-services";
import type { PageServiceKey } from "@/content/site-pages";
import { useLocale } from "@/i18n/LocaleProvider";
import { ShowcaseCard } from "./ShowcaseCard";

import styles from "./style.module.css";

export const SHOWCASE_SECTION_ID = "showcase";

export type ShowcaseSectionProps = Readonly<{
  /** Current service page — hidden from the carousel on that landing. */
  excludePageKey?: PageServiceKey;
  /** Override section id (avoid duplicates when multiple instances on a page). */
  sectionId?: string;
}>;

export function ShowcaseSection({
  excludePageKey,
  sectionId = SHOWCASE_SECTION_ID,
}: ShowcaseSectionProps = {}) {
  const { locale, t } = useLocale();
  const { showcase } = t;
  const cards = useMemo(
    () => resolveShowcaseServiceCards(locale, showcase.cards, excludePageKey),
    [excludePageKey, locale, showcase.cards],
  );
  const slider = useCardSlider();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const root = sectionRef.current;
    const trigger = sliderRegionRef.current;
    if (!root || !trigger) return;

    const ctx = gsap.context(() => {
      runShowcaseScrollReveal(
        trigger,
        {
          cardReveal: styles.cardReveal,
          controlsReveal: cardSliderStyles.controlsReveal,
        },
        Boolean(prefersReducedMotion),
      );
    }, root);

    return () => ctx.revert();
  }, [cards.length, prefersReducedMotion, locale]);

  if (cards.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={styles.section}
      aria-labelledby={`${sectionId}-title`}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id={`${sectionId}-title`} className={styles.title}>
            <span className={styles.titleStrong}>{showcase.titleStrong}</span>{" "}
            <span className={styles.titleMuted}>{showcase.titleMuted}</span>
          </h2>
        </header>
      </div>

      <div
        ref={sliderRegionRef}
        className={styles.sliderRegion}
        aria-label={showcase.sliderAriaLabel}
        role="region"
        data-lenis-prevent-horizontal
      >
        <CardSlider emblaRef={slider.emblaRef} className={styles.slider}>
          {cards.map((card) => (
            <CardSliderSlide key={card.id}>
              <ShowcaseCard card={card} />
            </CardSliderSlide>
          ))}
        </CardSlider>

        <CardSliderNav
          prevLabel={showcase.prevLabel}
          nextLabel={showcase.nextLabel}
          canScrollPrev={slider.canScrollPrev}
          canScrollNext={slider.canScrollNext}
          onPrev={slider.scrollPrev}
          onNext={slider.scrollNext}
        />
      </div>
    </section>
  );
}
