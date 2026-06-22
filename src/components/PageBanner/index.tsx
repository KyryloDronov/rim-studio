"use client";

import { useEffect, useRef } from "react";
import { PAGE_BANNER_ATTR } from "@/content/page-banner";

import styles from "./style.module.css";

type PageBannerProps = Readonly<{
  title: string;
  lead: string;
  eyebrow?: string;
}>;

/**
 * Full-viewport page banner — shared across inner routes.
 * Header stays visible while this block is on screen (`data-page-banner`).
 */
export function PageBanner({
  title,
  lead,
  eyebrow = "rim/studio",
}: PageBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

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

      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lead}>{lead}</p>
      </div>
    </section>
  );
}
