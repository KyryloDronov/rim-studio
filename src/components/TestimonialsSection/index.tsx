"use client";

import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  runTestimonialQuoteExit,
  runTestimonialQuoteReveal,
  splitQuoteSegments,
} from "@/animations";
import { LetterRevealText } from "@/components/LetterRevealText";
import { useLocale } from "@/i18n/LocaleProvider";
import { TestimonialPhoneVisual } from "./TestimonialPhoneVisual";

import styles from "./style.module.css";

export const TESTIMONIALS_SECTION_ID = "testimonials";

function NavIcon({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span className={styles.iconSlot} aria-hidden="true">
      <span className={`${styles.iconLayer} ${styles.iconFront}`}>{children}</span>
      <span className={`${styles.iconLayer} ${styles.iconBack}`}>{children}</span>
    </span>
  );
}

function isQuoteMark(char: string): boolean {
  return char === "«" || char === "»";
}

function formatSlideIndex(value: number, total: number): string {
  const width = total >= 10 ? 2 : 1;
  return String(value).padStart(width, "0");
}

type SlideCounterProps = Readonly<{
  current: number;
  total: number;
  ariaLabel: string;
  reducedMotion: boolean;
}>;

function SlideCounter({
  current,
  total,
  ariaLabel,
  reducedMotion,
}: SlideCounterProps) {
  const currentRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = currentRef.current;
    if (!el || reducedMotion) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 6, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.38,
        ease: "power2.out",
      },
    );
  }, [current, reducedMotion]);

  if (total <= 1) return null;

  return (
    <div className={styles.counter} aria-label={ariaLabel}>
      <span ref={currentRef} className={styles.counterCurrent}>
        {formatSlideIndex(current, total)}
      </span>
      <span className={styles.counterSep} aria-hidden>
        /
      </span>
      <span className={styles.counterTotal}>
        {formatSlideIndex(total, total)}
      </span>
    </div>
  );
}

export function TestimonialsSection() {
  const { t } = useLocale();
  const { testimonials } = t;
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const reactId = useId();
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isAnimatingRef = useRef(false);

  const [displayIndex, setDisplayIndex] = useState(0);
  const itemCount = testimonials.items.length;

  const activeItem =
    testimonials.items[displayIndex] ?? testimonials.items[0];

  const quoteSegments = useMemo(
    () => splitQuoteSegments(`«${activeItem.quote}»`, `${reactId}-${activeItem.id}`),
    [activeItem.id, activeItem.quote, reactId],
  );

  const runEnter = useCallback(() => {
    const quoteEl = quoteRef.current;
    if (!quoteEl) return null;

    return runTestimonialQuoteReveal(
      quoteEl,
      `.${styles.char}`,
      metaRef.current,
      reducedMotion,
    );
  }, [reducedMotion]);

  useLayoutEffect(() => {
    const tl = runEnter();
    if (!tl) return;

    tl.eventCallback("onComplete", () => {
      isAnimatingRef.current = false;
    });

    return () => {
      tl.kill();
      tl.eventCallback("onComplete", null);
    };
  }, [displayIndex, runEnter]);

  const goToIndex = useCallback(
    (nextIndex: number) => {
      if (
        isAnimatingRef.current ||
        nextIndex === displayIndex ||
        itemCount <= 1
      ) {
        return;
      }

      const quoteEl = quoteRef.current;
      if (!quoteEl) {
        setDisplayIndex(nextIndex);
        return;
      }

      isAnimatingRef.current = true;

      const exitTl = runTestimonialQuoteExit(
        quoteEl,
        `.${styles.char}`,
        metaRef.current,
        reducedMotion,
      );

      exitTl.eventCallback("onComplete", () => {
        setDisplayIndex(nextIndex);
      });
    },
    [displayIndex, itemCount, reducedMotion],
  );

  const goPrev = useCallback(() => {
    goToIndex((displayIndex - 1 + itemCount) % itemCount);
  }, [displayIndex, goToIndex, itemCount]);

  const goNext = useCallback(() => {
    goToIndex((displayIndex + 1) % itemCount);
  }, [displayIndex, goToIndex, itemCount]);

  const counterCurrent = displayIndex + 1;
  const counterAriaLabel = testimonials.counterAriaLabel
    .replace("{current}", String(counterCurrent))
    .replace("{total}", String(itemCount));

  useEffect(() => {
    return () => {
      gsap.killTweensOf([quoteRef.current, metaRef.current].filter(Boolean));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={TESTIMONIALS_SECTION_ID}
      className={styles.section}
      aria-labelledby={`${TESTIMONIALS_SECTION_ID}-title`}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p id={`${TESTIMONIALS_SECTION_ID}-title`} className={styles.eyebrow}>
            {testimonials.eyebrow}
          </p>
        </header>

        <div
          className={styles.layout}
          aria-label={testimonials.sliderAriaLabel}
          role="region"
        >
          <blockquote className={styles.quoteBlock}>
            <p ref={quoteRef} className={styles.quote} aria-live="polite">
              <LetterRevealText
                segments={quoteSegments}
                charClassName={styles.char}
                getCharClassName={(char) =>
                  isQuoteMark(char) ? styles.charMark : undefined
                }
              />
            </p>
          </blockquote>

          <div className={styles.visualCol}>
            <TestimonialPhoneVisual
              displayIndex={displayIndex}
              reducedMotion={reducedMotion}
              interactionRootRef={sectionRef}
            />
          </div>

          <div className={styles.footerRow}>
            <div className={styles.leftFooter}>
              <div ref={metaRef} className={styles.meta}>
                <span className={styles.avatar} aria-hidden>
                  {activeItem.initials}
                </span>
                <div className={styles.metaText}>
                  <p className={styles.author}>{activeItem.author}</p>
                  <p className={styles.role}>{activeItem.role}</p>
                </div>
              </div>
            </div>

            <div className={styles.rightFooter}>
              <div className={styles.controls}>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={goPrev}
                  aria-label={testimonials.prevLabel}
                  disabled={itemCount <= 1}
                >
                  <NavIcon>
                    <ChevronLeft strokeWidth={1.75} />
                  </NavIcon>
                </button>

                <SlideCounter
                  current={counterCurrent}
                  total={itemCount}
                  ariaLabel={counterAriaLabel}
                  reducedMotion={reducedMotion}
                />

                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={goNext}
                  aria-label={testimonials.nextLabel}
                  disabled={itemCount <= 1}
                >
                  <NavIcon>
                    <ChevronRight strokeWidth={1.75} />
                  </NavIcon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
