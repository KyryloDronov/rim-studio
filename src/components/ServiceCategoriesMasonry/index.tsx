"use client";

import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { runCategoriesMasonryScrollReveal } from "@/animations";
import {
  CardSlider,
  CardSliderNav,
  CardSliderSlide,
  useCardSlider,
} from "@/components/CardSlider";
import cardSliderStyles from "@/components/CardSlider/style.module.css";
import type { PageServiceKey } from "@/content/site-pages";
import { resolveShowcaseServiceCards } from "@/content/showcase-services";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import { useLocale } from "@/i18n/LocaleProvider";
import { SERVICE_MASONRY_PLACEMENTS } from "./masonry-layout";
import { ServiceCategoryCard } from "./ServiceCategoryCard";
import { ServiceCategoryModal } from "./ServiceCategoryModal";

import styles from "./style.module.css";

export const SERVICE_CATEGORIES_SECTION_ID = "service-categories";

const MOBILE_CAROUSEL_QUERY = "(max-width: 767px)";

export function ServiceCategoriesMasonry() {
  const { locale, t } = useLocale();
  const { showcase } = t;
  const cards = useMemo(
    () => resolveShowcaseServiceCards(locale, showcase.cards),
    [locale, showcase.cards],
  );
  const isMobileCarousel = useMatchMedia(MOBILE_CAROUSEL_QUERY);
  const slider = useCardSlider();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeCardId, setActiveCardId] = useState<PageServiceKey | null>(null);

  const activeCard = useMemo(
    () => cards.find((card) => card.id === activeCardId) ?? null,
    [activeCardId, cards],
  );

  const openCard = useCallback((id: PageServiceKey) => {
    setActiveCardId(id);
  }, []);

  const handleModalOpenChange = useCallback((open: boolean) => {
    if (!open) setActiveCardId(null);
  }, []);

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const root = sectionRef.current;
    const trigger = stageRef.current;
    if (!root || !trigger) return;

    const ctx = gsap.context(() => {
      runCategoriesMasonryScrollReveal(
        trigger,
        {
          titleReveal: styles.titleReveal,
          cardReveal: styles.cardReveal,
          controlsReveal: cardSliderStyles.controlsReveal,
        },
        Boolean(prefersReducedMotion),
      );
    }, root);

    return () => ctx.revert();
  }, [cards.length, isMobileCarousel, prefersReducedMotion, locale]);

  if (cards.length === 0) return null;

  return (
    <>
      <section
        ref={sectionRef}
        id={SERVICE_CATEGORIES_SECTION_ID}
        className={styles.section}
        aria-labelledby={`${SERVICE_CATEGORIES_SECTION_ID}-title`}
      >
        <div className={styles.inner}>
          <header className={styles.header}>
            <h2
              id={`${SERVICE_CATEGORIES_SECTION_ID}-title`}
              className={`${styles.title} ${styles.titleReveal}`}
            >
              <span className={styles.titleStrong}>{showcase.titleStrong}</span>
              <span className={styles.titleMuted}>{showcase.titleMuted}</span>
            </h2>
          </header>

          <div ref={stageRef} className={styles.stage}>
            {isMobileCarousel ? (
              <div
                className={styles.sliderRegion}
                aria-label={showcase.sliderAriaLabel}
                role="region"
                data-lenis-prevent-horizontal
              >
                <CardSlider emblaRef={slider.emblaRef} className={styles.slider}>
                  {cards.map((card) => (
                    <CardSliderSlide key={card.id}>
                      <ServiceCategoryCard
                        card={card}
                        layout="carousel"
                        revealClassName={styles.cardReveal}
                        openLabel={showcase.openCardLabel}
                        onOpen={() => openCard(card.id)}
                      />
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
            ) : (
              <div className={styles.grid}>
                {cards.map((card, index) => {
                  const placement =
                    SERVICE_MASONRY_PLACEMENTS[index] ??
                    SERVICE_MASONRY_PLACEMENTS[
                      SERVICE_MASONRY_PLACEMENTS.length - 1
                    ]!;

                  return (
                    <ServiceCategoryCard
                      key={card.id}
                      card={card}
                      layout="grid"
                      revealClassName={styles.cardReveal}
                      placement={placement}
                      openLabel={showcase.openCardLabel}
                      onOpen={() => openCard(card.id)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <ServiceCategoryModal
        card={activeCard}
        open={activeCard !== null}
        onOpenChange={handleModalOpenChange}
        closeLabel={showcase.modalCloseLabel}
        placeholder={showcase.modalPlaceholder}
      />
    </>
  );
}
