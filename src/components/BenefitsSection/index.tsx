"use client";

import gsap from "gsap";
import {
  ClipboardCheck,
  CalendarCheck,
  CircleDot,
  Search,
  Wrench,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { runBenefitsScrollReveal } from "@/animations";
import { Button } from "@/components/Button";
import { useConsultation } from "@/components/Consultation/ConsultationContext";
import {
  CardSlider,
  CardSliderNav,
  CardSliderSlide,
  useCardSlider,
} from "@/components/CardSlider";
import {
  BENEFITS_CARD_ORDER,
  BENEFITS_HUB_STEP_IDS,
  type BenefitCardId,
  type BenefitsHubStepId,
} from "@/content/benefits-cards";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Dictionary } from "@/i18n/types";

import styles from "./style.module.css";

export const BENEFITS_SECTION_ID = "benefits";

const MOBILE_LAYOUT_QUERY = "(max-width: 991px)";

const CARDS_SLIDER_OPTIONS = {
  align: "start",
  containScroll: "trimSnaps",
  dragFree: false,
  duration: 32,
} as const;

const HUB_STEP_ICONS: Record<BenefitsHubStepId, ReactNode> = {
  diagnostics: <Search strokeWidth={1.75} aria-hidden />,
  agreement: <ClipboardCheck strokeWidth={1.75} aria-hidden />,
  work: <Wrench strokeWidth={1.75} aria-hidden />,
  result: <CircleDot strokeWidth={1.75} aria-hidden />,
};

function formatBenefitNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function BenefitsSection() {
  const { locale, t } = useLocale();
  const { benefits } = t;
  const { openConsultation } = useConsultation();
  const isMobileLayout = useMatchMedia(MOBILE_LAYOUT_QUERY);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const root = sectionRef.current;
    const trigger = stageRef.current;
    if (!root || !trigger) return;

    const ctx = gsap.context(() => {
      runBenefitsScrollReveal(
        trigger,
        {
          revealTitle: styles.revealTitle,
          revealCardLeft: styles.revealCardLeft,
          revealCardRight: styles.revealCardRight,
          revealCenter: styles.revealCenter,
          revealCardMobile: styles.revealCardMobile,
        },
        Boolean(prefersReducedMotion),
        root,
      );
    }, root);

    return () => ctx.revert();
  }, [isMobileLayout, prefersReducedMotion, locale]);

  const sectionTitle = `${benefits.titleStrong} ${benefits.titleAccent}`;

  return (
    <section
      ref={sectionRef}
      id={BENEFITS_SECTION_ID}
      className={styles.section}
      aria-labelledby={`${BENEFITS_SECTION_ID}-title`}
    >
      <div className={styles.inner}>
        {isMobileLayout ? (
          <header className={styles.header}>
            <h2
              id={`${BENEFITS_SECTION_ID}-title`}
              className={`${styles.title} ${styles.revealTitle}`}
            >
              <span className={styles.titleStrong}>{benefits.titleStrong}</span>
              <span className={styles.titleAccent}>{benefits.titleAccent}</span>
            </h2>
            <p className={styles.lead}>{benefits.lead}</p>
          </header>
        ) : (
          <h2 id={`${BENEFITS_SECTION_ID}-title`} className={styles.visuallyHidden}>
            {sectionTitle}
          </h2>
        )}

        {isMobileLayout ? (
          <div ref={stageRef} className={styles.mobileStage}>
            <BenefitsHub
              benefits={benefits}
              onConsultationClick={() => openConsultation("benefits")}
              hubClassName={`${styles.hub} ${styles.hubFeatured} ${styles.revealCenter}`}
              showEyebrow
            />
            <BenefitsCardsSlider
              benefits={benefits}
              revealClassName={styles.revealCardMobile}
            />
          </div>
        ) : (
          <div ref={stageRef} className={styles.stage}>
            <BenefitsHub
              benefits={benefits}
              onConsultationClick={() => openConsultation("benefits")}
              hubClassName={`${styles.hub} ${styles.revealCenter}`}
              showEyebrow
            />

            <div className={styles.benefitsGrid}>
              {BENEFITS_CARD_ORDER.map((cardId, index) => (
                <BenefitTextItem
                  key={cardId}
                  cardId={cardId}
                  number={formatBenefitNumber(index)}
                  title={benefits.cards[cardId].title}
                  body={benefits.cards[cardId].body}
                  revealClassName={
                    index % 2 === 0
                      ? styles.revealCardLeft
                      : styles.revealCardRight
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

type BenefitsCopy = Dictionary["benefits"];

type BenefitsHubProps = Readonly<{
  benefits: BenefitsCopy;
  onConsultationClick: () => void;
  hubClassName: string;
  showEyebrow?: boolean;
}>;

function BenefitsHub({
  benefits,
  onConsultationClick,
  hubClassName,
  showEyebrow = false,
}: BenefitsHubProps) {
  return (
    <article className={hubClassName}>
      {showEyebrow ? (
        <p className={styles.hubEyebrow}>{benefits.eyebrow}</p>
      ) : null}
      <p className={styles.hubHeadline}>{benefits.hub.tagline}</p>

      <ol className={styles.hubSteps} aria-label={benefits.hub.tagline}>
        {BENEFITS_HUB_STEP_IDS.map((stepId, index) => {
          const isLast = index === BENEFITS_HUB_STEP_IDS.length - 1;
          return (
            <li key={stepId} className={styles.hubStep}>
              <div className={styles.hubStepInner}>
                <span
                  className={`${styles.hubStepIcon} ${
                    isLast ? styles.hubStepIconAccent : ""
                  }`}
                >
                  {HUB_STEP_ICONS[stepId]}
                </span>
                <span className={styles.hubStepLabel}>
                  {benefits.hub.steps[stepId].label}
                </span>
              </div>
              {!isLast ? (
                <span className={styles.hubStepLine} aria-hidden />
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className={styles.hubCtaWrap}>
        <Button
          type="button"
          variant="accent"
          size="md"
          block
          icon={<CalendarCheck strokeWidth={1.75} aria-hidden />}
          className={styles.hubCta}
          onClick={onConsultationClick}
        >
          {benefits.cta.label}
        </Button>
      </div>
    </article>
  );
}

type BenefitsCardsSliderProps = Readonly<{
  benefits: BenefitsCopy;
  revealClassName: string;
}>;

function BenefitsCardsSlider({
  benefits,
  revealClassName,
}: BenefitsCardsSliderProps) {
  const slider = useCardSlider(CARDS_SLIDER_OPTIONS);

  return (
    <div
      className={styles.cardsMobile}
      role="region"
      aria-label={benefits.cardsSlider.ariaLabel}
    >
      <div className={styles.cardsMobileStage} data-lenis-prevent-horizontal>
        <CardSlider emblaRef={slider.emblaRef} className={styles.cardsSlider}>
          {BENEFITS_CARD_ORDER.map((cardId, index) => (
            <CardSliderSlide
              key={cardId}
              className={`${styles.cardsSlide} ${revealClassName}`}
            >
              <BenefitTextItem
                cardId={cardId}
                number={formatBenefitNumber(index)}
                title={benefits.cards[cardId].title}
                body={benefits.cards[cardId].body}
                variant="card"
              />
            </CardSliderSlide>
          ))}
        </CardSlider>

        <CardSliderNav
          prevLabel={benefits.cardsSlider.prevLabel}
          nextLabel={benefits.cardsSlider.nextLabel}
          canScrollPrev={slider.canScrollPrev}
          canScrollNext={slider.canScrollNext}
          onPrev={slider.scrollPrev}
          onNext={slider.scrollNext}
          className={styles.cardsSliderNav}
        />
      </div>
    </div>
  );
}

type BenefitTextItemProps = Readonly<{
  cardId: BenefitCardId;
  number: string;
  title: string;
  body: string;
  revealClassName?: string;
  variant?: "grid" | "card";
}>;

function BenefitTextItem({
  cardId,
  number,
  title,
  body,
  revealClassName,
  variant = "grid",
}: BenefitTextItemProps) {
  const itemClass = [
    variant === "card" ? styles.textCard : styles.benefitItem,
    revealClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={itemClass} data-benefit={cardId}>
      <div className={styles.benefitHeading}>
        <span className={styles.benefitNumber} aria-hidden>{number}</span>
        <h3 className={styles.benefitTitle}>{title}</h3>
      </div>
      <p className={styles.benefitBody}>{body}</p>
    </article>
  );
}
