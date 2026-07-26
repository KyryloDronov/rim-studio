"use client";

import { useEffect, useMemo, useRef } from "react";
import { ProductCards } from "@/components/ProductCards";
import {
  sectionNavItemsToProductCards,
  type PageSectionNavItem,
} from "@/content/section-nav";
import { PAGE_BANNER_ATTR } from "@/content/page-banner";
import { useLocale } from "@/i18n/LocaleProvider";

import styles from "./style.module.css";

type PageBannerProps = Readonly<{
  title: string;
  lead: string;
  eyebrow?: string;
  sectionNavItems?: ReadonlyArray<PageSectionNavItem>;
}>;

/**
 * Full-viewport page banner — shared across inner routes.
 * Header stays visible while this block is on screen (`data-page-banner`).
 */
export function PageBanner({
  title,
  lead,
  eyebrow = "rim/studio",
  sectionNavItems = [],
}: PageBannerProps) {
  const { t } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionNavCards = useMemo(
    () => sectionNavItemsToProductCards(sectionNavItems),
    [sectionNavItems],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <section className={styles.banner} {...{ [PAGE_BANNER_ATTR]: true }}>
      <div className={styles.bgLayer} aria-hidden>
        <video
          ref={videoRef}
          className={styles.bgVideo}
          src="/video/video_pain_wheel.mp4"
          muted
          playsInline
          loop
          preload="metadata"
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lead}>{lead}</p>
        </div>
        {sectionNavCards.length > 0 ? (
          <aside
            className={styles.sectionNav}
            aria-label={t.hero.sectionNavLabel}
          >
            <ProductCards
              cards={sectionNavCards}
              eyebrowLabel={t.hero.sectionNavLabel}
              className={styles.sectionNavCards}
              density="compact"
              labelVisibility="expanded"
            />
          </aside>
        ) : null}
      </div>
    </section>
  );
}
