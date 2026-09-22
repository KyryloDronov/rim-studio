"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { ShowcaseServiceCard } from "@/content/showcase-services";
import {
  useShowcaseCardVideo,
  useShowcaseHoverVideoEnabled,
} from "@/components/ShowcaseSection/useShowcaseCardVideo";

import styles from "./style.module.css";

type ServiceCategoryCardProps = Readonly<{
  card: ShowcaseServiceCard;
  revealClassName: string;
  layout: "grid" | "carousel";
  placement?: Readonly<{ gridColumn: string; gridRow: string }>;
  openLabel: string;
  onOpen: () => void;
}>;

export function ServiceCategoryCard({
  card,
  revealClassName,
  layout,
  placement,
  openLabel,
  onOpen,
}: ServiceCategoryCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const hoverVideoEnabled = useShowcaseHoverVideoEnabled(prefersReducedMotion);
  const {
    forwardVideoRef,
    reverseVideoRef,
    activeVideo,
    onPointerEnter,
    onPointerLeave,
    onVideoEnded,
  } = useShowcaseCardVideo(card.video, card.videoReverse, hoverVideoEnabled);

  const cellClass = [
    styles.cell,
    layout === "carousel" ? styles.cellCarousel : "",
    revealClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const gridStyle =
    layout === "grid" && placement
      ? {
          gridColumn: placement.gridColumn,
          gridRow: placement.gridRow,
        }
      : undefined;

  return (
    <article className={cellClass} style={gridStyle}>
      <button
        type="button"
        className={styles.cardButton}
        aria-label={`${openLabel}: ${card.title}`}
        onClick={onOpen}
      >
        <div
          className={styles.cardContent}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
        >
          <div className={styles.cardImageWrap}>
            <Image
              src={card.image}
              alt=""
              fill
              sizes={
                layout === "carousel"
                  ? "(max-width: 767px) 309px, 452px"
                  : "(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
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

          <span className={styles.openFab} aria-hidden="true">
            <Plus strokeWidth={2} className={styles.openFabIcon} />
          </span>
        </div>
      </button>
    </article>
  );
}
