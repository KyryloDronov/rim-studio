"use client";

import {
  CircleDot,
  ClipboardCheck,
  Gauge,
  Hammer,
  Layers,
  Paintbrush,
  Shield,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/Button";
import {
  ABOUT_EQUIPMENT_ICONS,
  ABOUT_SECTION_VIDEOS,
  type AboutEquipmentIconId,
} from "@/content/about-section";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/paths";

import styles from "./style.module.css";

export const ABOUT_SECTION_ID = "about-studio";

const EQUIPMENT_ICON_MAP: Record<AboutEquipmentIconId, LucideIcon> = {
  paintbrush: Paintbrush,
  gauge: Gauge,
  shield: Shield,
  wrench: Wrench,
  layers: Layers,
  disc: CircleDot,
  hammer: Hammer,
  zap: Zap,
};

export function AboutSection() {
  const { locale, t } = useLocale();
  const { aboutSection } = t;
  const prefersReducedMotion = useReducedMotion();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    for (const video of videoRefs.current) {
      video?.play().catch(() => {});
    }
  }, []);

  const registerVideo =
    (index: number) =>
    (element: HTMLVideoElement | null): void => {
      videoRefs.current[index] = element;
    };

  return (
    <section
      id={ABOUT_SECTION_ID}
      className={styles.section}
      aria-labelledby={`${ABOUT_SECTION_ID}-heading`}
    >
      <div className={styles.inner}>
        <header className={styles.intro}>
          <div className={styles.introCopy}>
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

        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.videoCard} ${styles.heroCard}`}>
            <BackgroundVideo
              src={ABOUT_SECTION_VIDEOS.studio}
              videoRef={registerVideo(0)}
            />
            <div className={styles.heroOverlay} aria-hidden="true" />
            <p className={styles.eyebrow}>{aboutSection.cards.studio.label}</p>
            <ul className={styles.timeline}>
              {aboutSection.cards.timeline.map((item) => (
                <li key={item.period} className={styles.timelineRow}>
                  <span className={styles.timelinePeriod}>{item.period}</span>
                  <Sparkles
                    className={styles.timelineSep}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className={styles.timelineRole}>{item.role}</span>
                  <span className={styles.timelineDetail}>{item.detail}</span>
                </li>
              ))}
            </ul>
          </article>

          <div className={`${styles.stackCol} ${styles.stackColMid}`}>
            <article
              className={`${styles.card} ${styles.tintCard} ${styles.noiseOverlay} ${styles.cardWarranty}`}
            >
              <p className={styles.eyebrow}>{aboutSection.cards.warranty.label}</p>
              <h3 className={styles.cardTitle}>{aboutSection.cards.warranty.title}</h3>
              <p className={styles.cardBody}>{aboutSection.cards.warranty.body}</p>
            </article>

            <article
              className={`${styles.card} ${styles.videoCard} ${styles.statCard} ${styles.cardStat}`}
            >
              <BackgroundVideo
                src={ABOUT_SECTION_VIDEOS.stat}
                videoRef={registerVideo(1)}
              />
              <div className={styles.cardOverlay} />
              <p className={styles.statValue}>{aboutSection.cards.stat.value}</p>
              <p className={styles.statCaption}>
                {aboutSection.cards.stat.caption}
              </p>
            </article>
          </div>

          <div className={`${styles.stackCol} ${styles.stackColEnd}`}>
            <article
              className={`${styles.card} ${styles.videoCard} ${styles.equipmentCard} ${styles.cardEquipment}`}
            >
              <BackgroundVideo
                src={ABOUT_SECTION_VIDEOS.equipment}
                videoRef={registerVideo(2)}
              />
              <div className={styles.cardOverlay} />
              <p className={styles.eyebrow}>{aboutSection.cards.equipment.label}</p>
              <div className={styles.marqueeStack}>
                <IconMarquee
                  icons={ABOUT_EQUIPMENT_ICONS}
                  direction="left"
                  reducedMotion={Boolean(prefersReducedMotion)}
                />
                <IconMarquee
                  icons={[...ABOUT_EQUIPMENT_ICONS].reverse()}
                  direction="right"
                  reducedMotion={Boolean(prefersReducedMotion)}
                />
              </div>
            </article>

            <article
              className={`${styles.card} ${styles.tintCard} ${styles.noiseOverlay} ${styles.cardAdvantage}`}
            >
              <p className={styles.eyebrow}>
                {aboutSection.cards.advantage.label}
              </p>
              <h3 className={styles.cardTitle}>
                {aboutSection.cards.advantage.title}
              </h3>
              <p className={styles.cardBody}>
                {aboutSection.cards.advantage.body}
              </p>
            </article>
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

type IconMarqueeProps = Readonly<{
  icons: ReadonlyArray<AboutEquipmentIconId>;
  direction: "left" | "right";
  reducedMotion: boolean;
}>;

function IconMarquee({ icons, direction, reducedMotion }: IconMarqueeProps) {
  const track = [...icons, ...icons];

  return (
    <div className={styles.marqueeMask}>
      <div
        className={`${styles.marqueeTrack} ${
          direction === "left" ? styles.marqueeLeft : styles.marqueeRight
        } ${reducedMotion ? styles.marqueeStatic : ""}`}
      >
        {track.map((iconId, index) => {
          const Icon = EQUIPMENT_ICON_MAP[iconId];
          return (
            <span
              key={`${iconId}-${index}`}
              className={`${styles.iconTile} ${styles.liquidGlass}`}
            >
              <Icon strokeWidth={1.5} aria-hidden />
            </span>
          );
        })}
      </div>
    </div>
  );
}
