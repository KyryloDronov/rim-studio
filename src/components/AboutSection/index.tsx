"use client";

import gsap from "gsap";
import {
  Clock,
  Gem,
  ClipboardCheck,
  Layers,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { runAboutScrollReveal, runAboutJourneyProgress } from "@/animations";
import {
  CardSlider,
  CardSliderNav,
  CardSliderSlide,
  useCardSlider,
} from "@/components/CardSlider";
import { Button } from "@/components/Button";
import { useConsultation } from "@/components/Consultation/ConsultationContext";
import { LogoSmall } from "@/icons/logo_small";
import {
  ABOUT_FOUNDER_IMAGE,
  ABOUT_PILLAR_BACKGROUNDS,
  ABOUT_PILLAR_ICONS,
  type AboutPillarIconId,
} from "@/content/about-section";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Dictionary } from "@/i18n/types";

import styles from "./style.module.css";

export const ABOUT_SECTION_ID = "about-studio";

const MOBILE_LAYOUT_QUERY = "(max-width: 991px)";

const PILLARS_SLIDER_OPTIONS = {
  align: "start",
  containScroll: "trimSnaps",
  dragFree: false,
  duration: 32,
} as const;

const PILLAR_ICON_MAP: Record<AboutPillarIconId, LucideIcon> = {
  layers: Layers,
  shield: Shield,
  gem: Gem,
  clock: Clock,
  team: Users,
};

const REVEAL_CLASSES = {
  introReveal: styles.introReveal,
  founderReveal: styles.founderReveal,
  approachReveal: styles.approachReveal,
  pillarReveal: styles.pillarReveal,
  journeyReveal: styles.journeyReveal,
  summaryReveal: styles.summaryReveal,
} as const;

type AboutPillar = Dictionary["aboutSection"]["pillars"][number];

export function AboutSection() {
  const { t } = useLocale();
  const { aboutSection } = t;
  const { openConsultation } = useConsultation();
  const isMobileLayout = useMatchMedia(MOBILE_LAYOUT_QUERY);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const journeyFillRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let cleanupJourney: (() => void) | undefined;

    const ctx = gsap.context(() => {
      runAboutScrollReveal(
        section,
        REVEAL_CLASSES,
        prefersReducedMotion === true,
      );

      const journeyRoot = journeyRef.current;
      const fill = journeyFillRef.current;
      const milestones = milestoneRefs.current.filter(
        (node): node is HTMLLIElement => node != null,
      );

      if (journeyRoot && fill && milestones.length > 0) {
        cleanupJourney = runAboutJourneyProgress(
          { root: journeyRoot, fill, milestones },
          prefersReducedMotion === true,
        );
      }
    }, section);

    return () => {
      cleanupJourney?.();
      ctx.revert();
    };
  }, [prefersReducedMotion, isMobileLayout]);

  const journeyLayout = isMobileLayout ? "horizontal" : "vertical";

  return (
    <section
      ref={sectionRef}
      id={ABOUT_SECTION_ID}
      className={styles.section}
      aria-labelledby={`${ABOUT_SECTION_ID}-heading`}
    >
      <div className={styles.inner}>
        <header className={`${styles.intro} ${styles.introReveal}`}>
          <div className={styles.introCopy}>
            <p className={styles.sectionEyebrow}>{aboutSection.eyebrow}</p>
            <h2 id={`${ABOUT_SECTION_ID}-heading`} className={styles.heading}>
              <span className={styles.headingBrand}>
                {aboutSection.headingBrand}
              </span>{" "}
              <span className={styles.headingAccent}>
                {aboutSection.headingAccent}
              </span>{" "}
              <span className={styles.headingRest}>
                {aboutSection.headingRest}
              </span>
            </h2>
            <p className={styles.lead}>{aboutSection.lead}</p>
          </div>

          <Button
            type="button"
            variant="accent"
            size="md"
            expandFromIcon
            expandWhen
            icon={<ClipboardCheck strokeWidth={1.75} aria-hidden />}
            className={styles.ctaBtn}
            onClick={() => openConsultation("about")}
          >
            {aboutSection.cta.label}
          </Button>
        </header>

        <div className={styles.contentFlow}>
          <div className={styles.mainGrid}>
            <article
              className={`${styles.card} ${styles.founderCard} ${styles.founderReveal}`}
            >
              <Image
                src={ABOUT_FOUNDER_IMAGE}
                alt={aboutSection.founder.name}
                fill
                sizes="(max-width: 991px) 100vw, 28vw"
                className={styles.founderPhoto}
                priority={false}
              />
              <div className={styles.mediaOverlay} aria-hidden="true" />
              <div className={styles.founderCaption}>
                <p className={styles.founderRole}>{aboutSection.founder.role}</p>
                <p className={styles.founderName}>{aboutSection.founder.name}</p>
                <span className={styles.founderRule} aria-hidden="true" />
              </div>
            </article>

            <div
              ref={journeyRef}
              className={`${styles.card} ${styles.journeyCard} ${styles.journeyReveal} ${
                journeyLayout === "vertical" ? styles.journeyVertical : ""
              }`}
              data-journey-layout={journeyLayout}
            >
              <p className={styles.journeyLabel}>{aboutSection.journey.label}</p>
              <div
                className={styles.journeyScroll}
                data-lenis-prevent-horizontal={isMobileLayout ? "" : undefined}
              >
                <div className={styles.journeyTimelineInner}>
                  <div className={styles.journeyTimeline}>
                    <div className={styles.journeyRail} aria-hidden="true">
                      <div className={styles.journeyRailBase} />
                      <div
                        ref={journeyFillRef}
                        className={styles.journeyRailFill}
                      />
                    </div>
                    <ol className={styles.milestoneList}>
                      {aboutSection.journey.milestones.map((item, index) => (
                        <li
                          key={item.year}
                          ref={(element) => {
                            milestoneRefs.current[index] = element;
                          }}
                          className={styles.milestone}
                          data-reached="false"
                        >
                          <div className={styles.milestoneMarker}>
                            <span
                              className={styles.milestoneDot}
                              aria-hidden="true"
                            />
                          </div>
                          <span className={styles.milestoneYear}>{item.year}</span>
                          <span className={styles.milestoneTitle}>
                            {item.title}
                          </span>
                          <span className={styles.milestoneBody}>{item.body}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <article
              className={`${styles.card} ${styles.approachCard} ${styles.approachReveal}`}
            >
              <div className={styles.approachAmbient} aria-hidden>
                <div className={styles.approachAmbientBase} />
                <div className={styles.approachOrbA} />
                <div className={styles.approachOrbB} />
                <div className={styles.approachOrbC} />
                <div className={styles.approachAmbientShine} />
              </div>
              <div className={styles.approachReadability} aria-hidden />
              <div className={styles.approachContent}>
                <div className={styles.approachBrand} aria-label="Rim Studio">
                  <LogoSmall className={styles.approachLogo} aria-hidden />
                </div>
                <div className={styles.approachCopy}>
                  <p className={styles.approachEyebrow}>
                    {aboutSection.approach.label}
                  </p>
                  <h3 className={styles.approachTitle}>
                    {aboutSection.approach.titleStart}{" "}
                    <span className={styles.approachAccent}>
                      {aboutSection.approach.titleAccent}
                    </span>
                  </h3>
                  <p className={styles.approachBody}>
                    {aboutSection.approach.body}
                  </p>
                </div>
              </div>
            </article>
          </div>

          <div className={styles.pillarsDesktop}>
            <div className={styles.pillarsGrid}>
              {aboutSection.pillars.map((pillar, index) => (
                <PillarCard
                  key={pillar.id}
                  pillar={pillar}
                  index={index}
                  revealClassName={styles.pillarReveal}
                />
              ))}
            </div>
          </div>

          {isMobileLayout ? (
            <AboutPillarsSlider
              pillars={aboutSection.pillars}
              sliderCopy={aboutSection.pillarsSlider}
              revealClassName={styles.pillarReveal}
            />
          ) : null}

          <article
            className={`${styles.card} ${styles.summaryCard} ${styles.summaryReveal}`}
          >
            <div className={styles.summaryMain}>
              <p className={styles.summaryLabel}>{aboutSection.summary.label}</p>
              <h3 className={styles.summaryTitle}>
                {aboutSection.summary.titleStart}{" "}
                <span className={styles.summaryAccent}>
                  {aboutSection.summary.titleAccent}
                </span>
              </h3>
            </div>
            <div className={styles.summaryDivider} aria-hidden="true" />
            <p className={styles.summaryBody}>{aboutSection.summary.body}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

type PillarCardProps = Readonly<{
  pillar: AboutPillar;
  index: number;
  revealClassName: string;
}>;

function PillarCard({ pillar, index, revealClassName }: PillarCardProps) {
  const iconId = ABOUT_PILLAR_ICONS[index] ?? "layers";
  const Icon = PILLAR_ICON_MAP[iconId];
  const bgSrc = ABOUT_PILLAR_BACKGROUNDS[index];

  return (
    <article
      className={`${styles.card} ${styles.pillarCard} ${revealClassName}`}
    >
      {bgSrc ? (
        <Image
          src={bgSrc}
          alt=""
          fill
          sizes="(max-width: 991px) 82vw, 16vw"
          className={styles.pillarBg}
          draggable={false}
        />
      ) : null}
      <div className={styles.pillarScrim} aria-hidden="true" />
      <span className={styles.pillarIconWrap}>
        <Icon strokeWidth={1.5} aria-hidden />
      </span>
      <h4 className={styles.pillarTitle}>{pillar.title}</h4>
      <p className={styles.pillarBody}>{pillar.body}</p>
    </article>
  );
}

type AboutPillarsSliderProps = Readonly<{
  pillars: ReadonlyArray<AboutPillar>;
  sliderCopy: Dictionary["aboutSection"]["pillarsSlider"];
  revealClassName: string;
}>;

function AboutPillarsSlider({
  pillars,
  sliderCopy,
  revealClassName,
}: AboutPillarsSliderProps) {
  const slider = useCardSlider(PILLARS_SLIDER_OPTIONS);

  return (
    <div
      className={styles.pillarsMobile}
      role="region"
      aria-label={sliderCopy.ariaLabel}
    >
      <div className={styles.pillarsMobileStage} data-lenis-prevent-horizontal>
        <CardSlider emblaRef={slider.emblaRef} className={styles.pillarsSlider}>
          {pillars.map((pillar, index) => (
            <CardSliderSlide
              key={pillar.id}
              className={`${styles.pillarsSlide} ${revealClassName}`}
            >
              <PillarCard
                pillar={pillar}
                index={index}
                revealClassName=""
              />
            </CardSliderSlide>
          ))}
        </CardSlider>

        <CardSliderNav
          prevLabel={sliderCopy.prevLabel}
          nextLabel={sliderCopy.nextLabel}
          canScrollPrev={slider.canScrollPrev}
          canScrollNext={slider.canScrollNext}
          onPrev={slider.scrollPrev}
          onNext={slider.scrollNext}
          className={styles.pillarsSliderNav}
        />
      </div>
    </div>
  );
}
