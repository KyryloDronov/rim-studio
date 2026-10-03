"use client";

import gsap from "gsap";
import {
  ChevronRight,
  ClipboardCheck,
  CalendarCheck,
  CircleDot,
  Search,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { runBenefitsScrollReveal } from "@/animations";
import { Button } from "@/components/Button";
import {
  CardSlider,
  CardSliderNav,
  CardSliderSlide,
  useCardSlider,
} from "@/components/CardSlider";
import {
  BENEFITS_CARD_IMAGES,
  BENEFITS_CARD_ORDER,
  BENEFITS_CENTER_HERO_IMAGE,
  BENEFITS_HUB_STEP_IDS,
  BENEFITS_SIDE_LEFT,
  BENEFITS_SIDE_RIGHT,
  type BenefitCardId,
  type BenefitsHubStepId,
} from "@/content/benefits-cards";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/paths";
import type { Dictionary, Locale } from "@/i18n/types";

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
      );
    }, root);

    return () => ctx.revert();
  }, [isMobileLayout, prefersReducedMotion, locale]);

  return (
    <section
      ref={sectionRef}
      id={BENEFITS_SECTION_ID}
      className={styles.section}
      aria-labelledby={`${BENEFITS_SECTION_ID}-title`}
    >
      <div className={styles.inner}>
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

        {isMobileLayout ? (
          <div ref={stageRef} className={styles.mobileStage}>
            <BenefitsHub
              benefits={benefits}
              locale={locale}
              hubClassName={`${styles.hub} ${styles.hubFeatured} ${styles.revealCenter}`}
            />
            <BenefitsCardsSlider
              benefits={benefits}
              revealClassName={styles.revealCardMobile}
            />
          </div>
        ) : (
          <div ref={stageRef} className={styles.stage}>
            <div className={styles.sideCol}>
              {BENEFITS_SIDE_LEFT.map((cardId, index) => (
                <BenefitImageCard
                  key={cardId}
                  cardId={cardId}
                  number={formatBenefitNumber(index)}
                  title={benefits.cards[cardId].title}
                  body={benefits.cards[cardId].body}
                  imageAlt={benefits.cards[cardId].imageAlt}
                  imageSrc={BENEFITS_CARD_IMAGES[cardId]}
                  revealClassName={styles.revealCardLeft}
                />
              ))}
            </div>

            <BenefitsHub
              benefits={benefits}
              locale={locale}
              hubClassName={`${styles.hub} ${styles.revealCenter}`}
            />

            <div className={styles.sideCol}>
              {BENEFITS_SIDE_RIGHT.map((cardId, index) => (
                <BenefitImageCard
                  key={cardId}
                  cardId={cardId}
                  number={formatBenefitNumber(index + 3)}
                  title={benefits.cards[cardId].title}
                  body={benefits.cards[cardId].body}
                  imageAlt={benefits.cards[cardId].imageAlt}
                  imageSrc={BENEFITS_CARD_IMAGES[cardId]}
                  revealClassName={styles.revealCardRight}
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
  locale: Locale;
  hubClassName: string;
}>;

function BenefitsHub({ benefits, locale, hubClassName }: BenefitsHubProps) {
  return (
    <article className={hubClassName}>
      <p className={styles.hubTagline}>{benefits.hub.tagline}</p>

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
                <ChevronRight
                  className={styles.hubStepArrow}
                  strokeWidth={1.75}
                  aria-hidden
                />
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className={styles.hubHero}>
        <Image
          src={BENEFITS_CENTER_HERO_IMAGE}
          alt={benefits.hub.heroImageAlt}
          fill
          sizes="(max-width: 991px) 100vw, 36vw"
          className={styles.hubHeroImage}
        />
        <div className={styles.hubHeroScrim} aria-hidden />
      </div>

      <div className={styles.hubCtaWrap}>
        <Button
          href={localizedPath(locale, benefits.cta.href)}
          variant="accent"
          size="md"
          expandFromIcon
          icon={<CalendarCheck strokeWidth={1.75} aria-hidden />}
          className={styles.hubCta}
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
              <BenefitImageCard
                cardId={cardId}
                number={formatBenefitNumber(index)}
                title={benefits.cards[cardId].title}
                body={benefits.cards[cardId].body}
                imageAlt={benefits.cards[cardId].imageAlt}
                imageSrc={BENEFITS_CARD_IMAGES[cardId]}
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

type BenefitImageCardProps = Readonly<{
  cardId: BenefitCardId;
  number: string;
  title: string;
  body: string;
  imageAlt: string;
  imageSrc: string;
  revealClassName?: string;
}>;

function BenefitImageCard({
  cardId,
  number,
  title,
  body,
  imageAlt,
  imageSrc,
  revealClassName,
}: BenefitImageCardProps) {
  const cardClass = [styles.imageCard, revealClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClass} data-benefit={cardId}>
      <div className={styles.imageCardMedia}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 991px) 85vw, 22vw"
          className={styles.imageCardPhoto}
        />
        <div className={styles.imageCardScrim} aria-hidden />
      </div>
      <div className={styles.imageCardContent}>
        <span className={styles.imageCardNumber} aria-hidden>{number}</span>
        <h3 className={styles.imageCardTitle}>{title}</h3>
        <p className={styles.imageCardBody}>{body}</p>
      </div>
    </article>
  );
}
