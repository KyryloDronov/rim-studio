"use client";

import gsap from "gsap";
import { useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { runProcessScrollReveal } from "@/animations";
import {
  CardSlider,
  CardSliderNav,
  CardSliderSlide,
  useCardSlider,
} from "@/components/CardSlider";
import cardSliderStyles from "@/components/CardSlider/style.module.css";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import { useLocale } from "@/i18n/LocaleProvider";
import { ProcessExpandableCard } from "./ProcessExpandableCard";

import styles from "./style.module.css";

export const PROCESS_SECTION_ID = "process";

const MOBILE_CAROUSEL_QUERY = "(max-width: 767px)";
const AUTO_ADVANCE_MS = 4000;

const SLIDER_OPTIONS = {
  align: "start",
  containScroll: "trimSnaps",
  dragFree: true,
  duration: 32,
} as const;

export function ProcessSection() {
  const { t } = useLocale();
  const { process } = t;
  const steps = process.steps;
  const isMobileCarousel = useMatchMedia(MOBILE_CAROUSEL_QUERY);
  const slider = useCardSlider(SLIDER_OPTIONS);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageWasInViewRef = useRef(false);

  const stageInView = useInView(stageRef, {
    amount: 0.28,
    margin: "0px 0px -8% 0px",
  });

  const defaultStepId = steps[0]?.id ?? "";
  const [activeStepId, setActiveStepId] = useState(defaultStepId);
  const [stageHovered, setStageHovered] = useState(false);
  const [timerCycleKey, setTimerCycleKey] = useState(0);

  const autoPlayEnabled =
    prefersReducedMotion !== true &&
    steps.length > 1 &&
    !stageHovered &&
    stageInView;

  const activeIndex = useMemo(
    () => Math.max(0, steps.findIndex((step) => step.id === activeStepId)),
    [activeStepId, steps],
  );

  const advanceStep = useCallback(() => {
    setActiveStepId((prev) => {
      const currentIndex = Math.max(
        0,
        steps.findIndex((step) => step.id === prev),
      );
      const next = steps[(currentIndex + 1) % steps.length];
      return next?.id ?? prev;
    });
    setTimerCycleKey((key) => key + 1);
  }, [steps]);

  const handleToggle = useCallback((stepId: string) => {
    setActiveStepId(stepId);
    setTimerCycleKey((key) => key + 1);
  }, []);

  useEffect(() => {
    if (stageInView && !stageWasInViewRef.current) {
      setTimerCycleKey((key) => key + 1);
    }
    stageWasInViewRef.current = stageInView;
  }, [stageInView]);

  useEffect(() => {
    if (!autoPlayEnabled) return;
    const timer = globalThis.setInterval(advanceStep, AUTO_ADVANCE_MS);
    return () => globalThis.clearInterval(timer);
  }, [advanceStep, autoPlayEnabled]);

  useEffect(() => {
    if (isMobileCarousel) return;
    slider.emblaApi?.reInit();
  }, [isMobileCarousel, slider.emblaApi]);

  useEffect(() => {
    if (!isMobileCarousel) return;
    const api = slider.emblaApi;
    if (!api) return;
    api.reInit();
    if (activeStepId) {
      api.scrollTo(activeIndex, true);
    }
  }, [activeIndex, activeStepId, isMobileCarousel, slider.emblaApi]);

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const root = sectionRef.current;
    const trigger = stageRef.current;
    if (!root || !trigger) return;

    const ctx = gsap.context(() => {
      runProcessScrollReveal(
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
  }, [isMobileCarousel, prefersReducedMotion, steps.length, t]);

  const cardProps = (step: (typeof steps)[number], index: number) => {
    const active = step.id === activeStepId;
    const showTimerRing = active && autoPlayEnabled;
    return {
      step,
      stepNumber: index + 1,
      active,
      showTimerRing,
      timerCycleKey: `${activeStepId}-${timerCycleKey}`,
      onToggle: () => handleToggle(step.id),
    };
  };

  const renderCard = (
    step: (typeof steps)[number],
    index: number,
    revealClassName: string,
    itemClassName?: string,
  ) => {
    const active = step.id === activeStepId;
    return (
      <div
        key={step.id}
        className={[itemClassName, revealClassName].filter(Boolean).join(" ")}
        data-active={active ? "true" : "false"}
      >
        <ProcessExpandableCard {...cardProps(step, index)} />
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id={PROCESS_SECTION_ID}
      className={styles.section}
      style={{ "--process-auto-ms": `${AUTO_ADVANCE_MS}ms` } as CSSProperties}
      aria-labelledby={`${PROCESS_SECTION_ID}-title`}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2
            id={`${PROCESS_SECTION_ID}-title`}
            className={`${styles.title} ${styles.titleReveal}`}
          >
            <span className={styles.titleMuted}>{process.titleMuted}</span>
            <span className={styles.titleStrong}>{process.titleStrong}</span>
          </h2>
        </header>

        <div
          ref={stageRef}
          className={styles.stage}
          aria-label={process.carouselAriaLabel}
          role="region"
          data-hovered={stageHovered ? "true" : "false"}
          data-in-view={stageInView ? "true" : "false"}
          data-auto={autoPlayEnabled ? "true" : "false"}
          onPointerEnter={() => setStageHovered(true)}
          onPointerLeave={() => setStageHovered(false)}
        >
          {isMobileCarousel ? (
            <div className={styles.mobileStage} data-lenis-prevent-horizontal>
              <CardSlider emblaRef={slider.emblaRef} className={styles.slider}>
                {steps.map((step, index) => {
                  const active = step.id === activeStepId;
                  return (
                    <CardSliderSlide
                      key={step.id}
                      className={`${styles.slide} ${active ? styles.slideActive : ""} ${styles.cardReveal}`}
                    >
                      <ProcessExpandableCard {...cardProps(step, index)} />
                    </CardSliderSlide>
                  );
                })}
              </CardSlider>

              <CardSliderNav
                prevLabel={process.prevLabel}
                nextLabel={process.nextLabel}
                canScrollPrev={slider.canScrollPrev}
                canScrollNext={slider.canScrollNext}
                onPrev={slider.scrollPrev}
                onNext={slider.scrollNext}
              />
            </div>
          ) : (
            <div className={styles.desktopRow}>
              {steps.map((step, index) =>
                renderCard(
                  step,
                  index,
                  styles.cardReveal,
                  styles.desktopItem,
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
