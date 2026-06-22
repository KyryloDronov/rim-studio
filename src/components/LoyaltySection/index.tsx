"use client";

import gsap from "gsap";
import { Award } from "lucide-react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  runLoyaltyScrollReveal,
  setLoyaltyRevealReducedMotion,
  splitClaimRuns,
  splitQuoteSegments,
} from "@/animations";
import { Button } from "@/components/Button";
import { LetterRevealText } from "@/components/LetterRevealText";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/paths";
import { LoyaltyCardCarousel } from "./LoyaltyCardCarousel";

import styles from "./style.module.css";

export const LOYALTY_SECTION_ID = "loyalty";

export function LoyaltySection() {
  const { locale, t } = useLocale();
  const { loyalty } = t;
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const [ctaPillExpand, setCtaPillExpand] = useState(false);

  const claimSegments = useMemo(
    () => splitClaimRuns(reactId, loyalty.claimRuns),
    [reactId, loyalty.claimRuns],
  );

  const bodySegments = useMemo(
    () => splitQuoteSegments(loyalty.body, `${reactId}-body`),
    [loyalty.body, reactId],
  );

  const secondarySegments = useMemo(
    () => splitQuoteSegments(loyalty.secondaryCta.label, `${reactId}-secondary`),
    [loyalty.secondaryCta.label, reactId],
  );

  const onAfterCtaReveal = useCallback(() => {
    setCtaPillExpand(true);
  }, []);

  const resetCtaPill = useCallback(() => {
    setCtaPillExpand(false);
  }, []);

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const root = sectionRef.current;
    const trigger = copyRef.current;
    if (!root || !trigger) return;

    const revealClasses = {
      revealEyebrow: styles.revealEyebrow,
      claimWord: styles.claimWord,
      bodyChar: styles.bodyChar,
      ctaItem: styles.ctaItem,
      secondaryChar: styles.secondaryChar,
      secondaryUnderline: styles.secondaryUnderline,
    };

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        setLoyaltyRevealReducedMotion(revealClasses);
        setCtaPillExpand(true);
        return;
      }

      setCtaPillExpand(false);
      runLoyaltyScrollReveal(trigger, revealClasses, false, {
        onScrollEnter: resetCtaPill,
        onAfterCtaReveal,
        onScrollLeaveBack: resetCtaPill,
      });
    }, root);

    return () => ctx.revert();
  }, [
    onAfterCtaReveal,
    resetCtaPill,
    prefersReducedMotion,
    locale,
    loyalty.claimRuns,
    loyalty.body,
    loyalty.secondaryCta.label,
  ]);

  const carouselEnabled = !prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      id={LOYALTY_SECTION_ID}
      className={styles.section}
      aria-labelledby={`${LOYALTY_SECTION_ID}-title`}
    >
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.carouselCol}>
            <LoyaltyCardCarousel
              tiers={loyalty.tiers}
              ariaLabel={loyalty.carouselAriaLabel}
              enabled={carouselEnabled}
              copyAnchorRef={copyRef}
            />
          </div>

          <div ref={copyRef} className={styles.copy}>
            <p className={`${styles.eyebrow} ${styles.revealEyebrow}`}>
              {loyalty.eyebrow}
            </p>

            <h2 id={`${LOYALTY_SECTION_ID}-title`} className={styles.claim}>
              {claimSegments.map((seg, i) => (
                <span
                  key={seg.key}
                  className={styles.claimWordWrap}
                  data-group={seg.group}
                >
                  <span className={styles.claimWord}>{seg.word}</span>
                  {seg.lineBreakAfter ? (
                    <br />
                  ) : i < claimSegments.length - 1 ? (
                    " "
                  ) : null}
                </span>
              ))}
            </h2>

            <p className={styles.body} data-anim-group="body">
              <LetterRevealText
                segments={bodySegments}
                charClassName={styles.bodyChar}
              />
            </p>

            <div className={styles.ctaRow} data-anim-group="cta">
              <span className={styles.ctaItem}>
                <Button
                  href={localizedPath(locale, loyalty.cta.href)}
                  variant="accent"
                  size="md"
                  expandFromIcon
                  expandWhen={ctaPillExpand}
                  icon={<Award strokeWidth={1.75} />}
                >
                  {loyalty.cta.label}
                </Button>
              </span>

              <Link
                href={localizedPath(locale, loyalty.secondaryCta.href)}
                className={styles.secondaryLink}
                data-anim-group="secondary"
              >
                <span className={styles.secondaryLinkLabel}>
                  <LetterRevealText
                    segments={secondarySegments}
                    charClassName={styles.secondaryChar}
                  />
                  <span
                    className={styles.secondaryUnderline}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
