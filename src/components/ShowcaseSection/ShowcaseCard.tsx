"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import {
  useShowcaseCardVideo,
  useShowcaseHoverVideoEnabled,
} from "./useShowcaseCardVideo";
import type { ShowcaseServiceCard } from "@/content/showcase-services";

import styles from "./style.module.css";

type ShowcaseCardProps = Readonly<{
  card: ShowcaseServiceCard;
}>;

export function ShowcaseCard({ card }: ShowcaseCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const hoverVideoEnabled = useShowcaseHoverVideoEnabled(prefersReducedMotion);
  const { forwardVideoRef, reverseVideoRef, activeVideo, onPointerEnter, onPointerLeave, onVideoEnded } =
    useShowcaseCardVideo(card.video, card.videoReverse, hoverVideoEnabled);

  return (
    <article className={`${styles.card} ${styles.cardReveal}`}>
      <Link href={card.href} className={styles.cardLink}>
        <div
          className={styles.cardContent}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
        >
          <div className={styles.cardImageWrap}>
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(max-width: 767px) 309px, 452px"
              className={styles.cardPoster}
              draggable={false}
            />

            {hoverVideoEnabled ? (
              <>
                <video
                  ref={forwardVideoRef}
                  className={styles.cardVideo}
                  data-visible={activeVideo === "forward" ? "true" : "false"}
                  muted
                  playsInline
                  preload="none"
                  disablePictureInPicture
                  tabIndex={-1}
                  onEnded={() => onVideoEnded("forward")}
                />
                <video
                  ref={reverseVideoRef}
                  className={styles.cardVideo}
                  data-visible={activeVideo === "reverse" ? "true" : "false"}
                  muted
                  playsInline
                  preload="none"
                  disablePictureInPicture
                  tabIndex={-1}
                  onEnded={() => onVideoEnded("reverse")}
                />
              </>
            ) : null}
          </div>

          <div className={styles.cardInfo}>
            <p className={styles.cardEyebrow}>{card.category}</p>
            <h3 className={styles.cardTitle}>{card.title}</h3>
          </div>
        </div>
      </Link>
    </article>
  );
}
