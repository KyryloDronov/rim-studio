"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { runShowcaseScrollReveal } from "@/animations";
import {
  CardSlider,
  CardSliderNav,
  CardSliderSlide,
  useCardSlider,
} from "@/components/CardSlider";
import cardSliderStyles from "@/components/CardSlider/style.module.css";
import { SHOWCASE_CARD_IMAGE } from "@/content/showcase-slider-cards";
import { useLocale } from "@/i18n/LocaleProvider";

import styles from "./style.module.css";

export const SHOWCASE_SECTION_ID = "showcase";

export function ShowcaseSection() {
  const { locale, t } = useLocale();
  const { showcase } = t;
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
  }, [prefersReducedMotion, locale, showcase.cards.length]);

  return (
    <section
      ref={sectionRef}
      id={SHOWCASE_SECTION_ID}
      className={styles.section}
      aria-labelledby={`${SHOWCASE_SECTION_ID}-title`}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id={`${SHOWCASE_SECTION_ID}-title`} className={styles.title}>
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
          {showcase.cards.map((card) => (
            <CardSliderSlide key={card.id}>
              <article className={`${styles.card} ${styles.cardReveal}`}>
                <Link href={card.href} className={styles.cardLink}>
                  <div className={styles.cardContent}>
                    <div className={styles.cardImageWrap}>
                      <Image
                        src={SHOWCASE_CARD_IMAGE}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 309px, 452px"
                        className={styles.cardImage}
                        draggable={false}
                      />
                    </div>

                    <div className={styles.cardInfo}>
                      <p className={styles.cardEyebrow}>{card.category}</p>
                      <h3 className={styles.cardTitle}>{card.title}</h3>
                    </div>
                  </div>
                </Link>
              </article>
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
