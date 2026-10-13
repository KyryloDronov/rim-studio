"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { SHOWCASE_CARD_FAB_ON_END } from "@/content/showcase-card-ui";
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
}>;

export function ServiceCategoryCard({
  card,
  revealClassName,
  layout,
  placement,
  openLabel,
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

  const fabClass = [
    styles.openFab,
    SHOWCASE_CARD_FAB_ON_END.has(card.id) ? styles.openFabEnd : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cellClass} style={gridStyle}>
      <Link
        href={card.href}
        className={styles.cardButton}
        aria-label={`${openLabel}: ${card.title}`}
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
            {card.summary ? (
              <p
                className={[
                  styles.cardSummary,
                  styles.cardSummaryOnHover,
                  card.id === "wheelPainting" ? styles.cardSummaryWide : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {card.summary}
              </p>
            ) : null}
          </div>

          <span className={fabClass} aria-hidden="true">
            <Plus strokeWidth={2} className={styles.openFabIcon} />
          </span>
        </div>
      </Link>
    </article>
  );
}
