"use client";

import gsap from "gsap";
import {
  CircleParking,
  Clock,
  Gem,
  ClipboardCheck,
  Layers,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { runAboutScrollReveal, runAboutJourneyProgress } from "@/animations";
import { Button } from "@/components/Button";
import {
  ABOUT_PILLAR_BACKGROUNDS,
  ABOUT_PILLAR_ICONS,
  ABOUT_SECTION_VIDEOS,
  type AboutPillarIconId,
} from "@/content/about-section";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/paths";

import styles from "./style.module.css";

export const ABOUT_SECTION_ID = "about-studio";

const PILLAR_ICON_MAP: Record<AboutPillarIconId, LucideIcon> = {
  layers: Layers,
  gem: Gem,
  clock: Clock,
  parking: CircleParking,
};

const REVEAL_CLASSES = {
  introReveal: styles.introReveal,
  founderReveal: styles.founderReveal,
  approachReveal: styles.approachReveal,
  pillarReveal: styles.pillarReveal,
  journeyReveal: styles.journeyReveal,
} as const;

export function AboutSection() {
  const { locale, t } = useLocale();
  const { aboutSection } = t;
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const journeyFillRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<(HTMLLIElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const syncVideos = (play: boolean) => {
      for (const video of videoRefs.current) {
        if (!video) continue;
        if (play) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        syncVideos(entry?.isIntersecting ?? false);
      },
      { threshold: 0.08, rootMargin: "80px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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
  }, [prefersReducedMotion]);

  const registerVideo =
    (index: number) =>
    (element: HTMLVideoElement | null): void => {
      videoRefs.current[index] = element;
    };

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
              {aboutSection.heading}
            </h2>
            <p className={styles.lead}>{aboutSection.lead}</p>
          </div>

          <Button
            href={localizedPath(locale, aboutSection.cta.href)}
            variant="accent"
            size="md"
            expandFromIcon
            icon={<ClipboardCheck strokeWidth={1.75} aria-hidden />}
            className={styles.ctaBtn}
          >
            {aboutSection.cta.label}
          </Button>
        </header>

        <div className={styles.mainGrid}>
          <article
            className={`${styles.card} ${styles.founderCard} ${styles.founderReveal}`}
          >
            <BackgroundVideo
              src={ABOUT_SECTION_VIDEOS.founder}
              videoRef={registerVideo(0)}
            />
            <div className={styles.mediaOverlay} aria-hidden="true" />
            <div className={styles.founderCaption}>
              <p className={styles.founderRole}>
                {aboutSection.founder.role}
                <span className={styles.founderName}>
                  {aboutSection.founder.name}
                </span>
              </p>
              <span className={styles.founderRule} aria-hidden="true" />
            </div>
          </article>

          <div className={styles.rightCol}>
            <article
              className={`${styles.card} ${styles.approachCard} ${styles.approachReveal}`}
            >
              <BackgroundVideo
                src={ABOUT_SECTION_VIDEOS.approach}
                videoRef={registerVideo(1)}
              />
              <div className={styles.approachOverlay} aria-hidden="true" />
              <div className={styles.approachCopy}>
                <p className={styles.eyebrow}>{aboutSection.approach.label}</p>
                <h3 className={styles.approachTitle}>
                  {aboutSection.approach.titleStart}{" "}
                  <span className={styles.approachAccent}>
                    {aboutSection.approach.titleAccent}
                  </span>
                </h3>
                <p className={styles.cardBody}>{aboutSection.approach.body}</p>
              </div>
            </article>

            <div className={styles.pillarsGrid}>
              {aboutSection.pillars.map((pillar, index) => {
                const iconId = ABOUT_PILLAR_ICONS[index] ?? "layers";
                const Icon = PILLAR_ICON_MAP[iconId];
                const bgSrc = ABOUT_PILLAR_BACKGROUNDS[index];

                return (
                  <article
                    key={pillar.id}
                    className={`${styles.card} ${styles.pillarCard} ${styles.pillarReveal}`}
                  >
                    {bgSrc ? (
                      <Image
                        src={bgSrc}
                        alt=""
                        fill
                        sizes="(max-width: 991px) 50vw, 20vw"
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
              })}
            </div>
          </div>
        </div>

        <div
          ref={journeyRef}
          className={`${styles.journey} ${styles.journeyReveal}`}
        >
          <p className={styles.journeyLabel}>{aboutSection.journey.label}</p>
          <div className={styles.journeyTimeline}>
            <div className={styles.journeyRail} aria-hidden="true">
              <div className={styles.journeyRailBase} />
              <div ref={journeyFillRef} className={styles.journeyRailFill} />
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
                    <span className={styles.milestoneDot} aria-hidden="true" />
                  </div>
                  <span className={styles.milestoneYear}>{item.year}</span>
                  <span className={styles.milestoneTitle}>{item.title}</span>
                  <span className={styles.milestoneBody}>{item.body}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

type BackgroundVideoProps = Readonly<{
  src: string;
  videoRef?: (element: HTMLVideoElement | null) => void;
}>;

function BackgroundVideo({ src, videoRef }: BackgroundVideoProps) {
  return (
    <video
      ref={videoRef}
      className={styles.bgVideo}
      src={src}
      muted
      playsInline
      loop
      autoPlay
      preload="metadata"
      aria-hidden
    />
  );
}
