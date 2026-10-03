"use client";

import gsap from "gsap";
import { CalendarCheck } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { runProcessScrollReveal } from "@/animations";
import {
  CardSlider,
  CardSliderNav,
  CardSliderSlide,
  useCardSlider,
} from "@/components/CardSlider";
import cardSliderStyles from "@/components/CardSlider/style.module.css";
import { Button } from "@/components/Button";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/paths";
import { ProcessStepCard } from "./ProcessStepCard";

import styles from "./style.module.css";

export const PROCESS_SECTION_ID = "process";

const DESKTOP_ROW_QUERY = "(min-width: 992px)";
const MOBILE_CAROUSEL_QUERY = "(max-width: 991px)";
const AUTO_ADVANCE_MS = 5500;

const SLIDER_OPTIONS = {
  align: "start",
  containScroll: "trimSnaps",
  dragFree: false,
  duration: 32,
} as const;

export function ProcessSection() {
  const { locale, t } = useLocale();
  const { process } = t;
  const steps = process.steps;
  const isDesktopRow = useMatchMedia(DESKTOP_ROW_QUERY);
  const isMobileCarousel = useMatchMedia(MOBILE_CAROUSEL_QUERY);
  const slider = useCardSlider(SLIDER_OPTIONS);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageWasInViewRef = useRef(false);

  const stageInView = useInView(stageRef, {
    amount: 0.22,
    margin: "0px 0px -6% 0px",
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

  const activeIndex = Math.max(
    0,
    steps.findIndex((step) => step.id === activeStepId),
  );

  const selectStep = useCallback(
    (index: number) => {
      const step = steps[index];
      if (!step) return;
      setActiveStepId(step.id);
      setTimerCycleKey((key) => key + 1);
      if (isMobileCarousel) {
        slider.emblaApi?.scrollTo(index);
      }
    },
    [isMobileCarousel, slider.emblaApi, steps],
  );

  const advanceStep = useCallback(() => {
    if (isMobileCarousel) {
      slider.emblaApi?.scrollNext();
      return;
    }
    setActiveStepId((prev) => {
      const currentIndex = Math.max(
        0,
        steps.findIndex((step) => step.id === prev),
      );
      const nextIndex = (currentIndex + 1) % steps.length;
      return steps[nextIndex]?.id ?? prev;
    });
    setTimerCycleKey((key) => key + 1);
  }, [isMobileCarousel, slider.emblaApi, steps]);

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
    if (!isMobileCarousel) return;
    const api = slider.emblaApi;
    if (!api) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();
      const step = steps[index];
      if (step) {
        setActiveStepId((prev) => {
          if (prev !== step.id) {
            setTimerCycleKey((key) => key + 1);
          }
          return step.id;
        });
      }
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);
    api.reInit();
    api.scrollTo(activeIndex, true);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [activeIndex, isMobileCarousel, slider.emblaApi, steps]);

  useEffect(() => {
    if (isMobileCarousel) return;
    slider.emblaApi?.reInit();
  }, [isMobileCarousel, slider.emblaApi]);

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
  }, [isDesktopRow, isMobileCarousel, prefersReducedMotion, steps.length, t]);

  const cardProps = (step: (typeof steps)[number], index: number) => {
    const active = step.id === activeStepId;
    const showTimerRing = active && autoPlayEnabled;
    return {
      step,
      stepNumber: index + 1,
      active,
      showTimerRing,
      timerCycleKey: `${activeStepId}-${timerCycleKey}`,
      onSelect: () => selectStep(index),
    };
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
          <div className={styles.headerMain}>
            <p className={styles.eyebrow}>{process.eyebrow}</p>
            <h2
              id={`${PROCESS_SECTION_ID}-title`}
              className={`${styles.title} ${styles.titleReveal}`}
            >
              {process.titleStrong}
            </h2>
            <p className={styles.lead}>{process.lead}</p>
          </div>

          <div className={styles.headerAside}>
            <p className={styles.intro}>{process.intro}</p>
            <Button
              href={localizedPath(locale, process.cta.href)}
              variant="accent"
              size="md"
              expandFromIcon
              icon={<CalendarCheck strokeWidth={1.75} aria-hidden />}
              className={styles.headerCta}
            >
              {process.cta.label}
            </Button>
          </div>
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
          {isDesktopRow ? (
            <div className={styles.desktopTrack}>
              {steps.map((step, index) => {
                const active = step.id === activeStepId;
                return (
                  <div
                    key={step.id}
                    className={`${styles.desktopItem} ${styles.cardReveal}`}
                    data-active={active ? "true" : "false"}
                  >
                    <ProcessStepCard {...cardProps(step, index)} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.sliderStage} data-lenis-prevent-horizontal>
              <CardSlider emblaRef={slider.emblaRef} className={styles.slider}>
                {steps.map((step, index) => (
                  <CardSliderSlide
                    key={step.id}
                    className={`${styles.processSlide} ${styles.cardReveal}`}
                  >
                    <ProcessStepCard {...cardProps(step, index)} />
                  </CardSliderSlide>
                ))}
              </CardSlider>

              <CardSliderNav
                prevLabel={process.prevLabel}
                nextLabel={process.nextLabel}
                canScrollPrev={slider.canScrollPrev}
                canScrollNext={slider.canScrollNext}
                onPrev={slider.scrollPrev}
                onNext={slider.scrollNext}
                className={styles.sliderNav}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
