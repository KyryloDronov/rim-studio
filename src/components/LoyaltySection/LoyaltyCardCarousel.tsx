"use client";

import type { RefObject } from "react";
import {
  LOYALTY_TIER_ORDER,
  LOYALTY_TIER_THEME,
  type LoyaltyTierId,
} from "@/content/loyalty-tiers";
import type { Dictionary } from "@/i18n/types";
import { useLoyaltyCardCarousel } from "./useLoyaltyCardCarousel";

import styles from "./style.module.css";

type LoyaltyTierCopy = Dictionary["loyalty"]["tiers"][LoyaltyTierId];

type LoyaltyCardCarouselProps = Readonly<{
  tiers: Dictionary["loyalty"]["tiers"];
  ariaLabel: string;
  enabled: boolean;
  copyAnchorRef?: RefObject<HTMLElement | null>;
}>;

export function LoyaltyCardCarousel({
  tiers,
  ariaLabel,
  enabled,
  copyAnchorRef,
}: LoyaltyCardCarouselProps) {
  const {
    rootRef,
    viewportRef,
    setCardRef,
    slotTiers,
    layoutMetrics,
    thicknessLayers,
  } = useLoyaltyCardCarousel({ enabled, copyAnchorRef });

  if (!enabled) {
    return (
      <div className={styles.staticStack} aria-label={ariaLabel}>
        {LOYALTY_TIER_ORDER.map((tierId) => (
          <article
            key={tierId}
            className={styles.staticCard}
            data-tier={tierId}
            style={{
              ["--tier-accent" as string]: LOYALTY_TIER_THEME[tierId].accent,
            }}
          >
            <span className={styles.staticLevel}>{tiers[tierId].level}</span>
            <span className={styles.staticDiscount}>{tiers[tierId].discount}</span>
            <span className={styles.staticThreshold}>{tiers[tierId].threshold}</span>
          </article>
        ))}
      </div>
    );
  }

  const { cardW, cardH, poolSize } = layoutMetrics;

  return (
    <div ref={rootRef} className={styles.carouselRoot} aria-label={ariaLabel}>
      <div ref={viewportRef} className={styles.carouselViewport}>
        <div className={styles.carouselPerspective}>
          <div
            className={styles.carouselTrack}
            style={{ width: cardW }}
          >
            {Array.from({ length: poolSize }, (_, index) => {
              const tierIndex = slotTiers[index] ?? index % LOYALTY_TIER_ORDER.length;
              const tierId = LOYALTY_TIER_ORDER[tierIndex];

              return (
                <LoyaltyCardSlot
                  key={index}
                  index={index}
                  tierId={tierId}
                  copy={tiers[tierId]}
                  cardW={cardW}
                  cardH={cardH}
                  setCardRef={setCardRef(index)}
                  thicknessLayers={thicknessLayers}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

type LoyaltyCardSlotProps = Readonly<{
  index: number;
  tierId: LoyaltyTierId;
  copy: LoyaltyTierCopy;
  cardW: number;
  cardH: number;
  setCardRef: (el: HTMLDivElement | null) => void;
  thicknessLayers: ReadonlyArray<number>;
}>;

function LoyaltyCardSlot({
  index,
  tierId,
  copy,
  cardW,
  cardH,
  setCardRef,
  thicknessLayers,
}: LoyaltyCardSlotProps) {
  const theme = LOYALTY_TIER_THEME[tierId];

  return (
    <div
      ref={setCardRef}
      className={styles.cardShell}
      style={{ width: cardW, height: cardH }}
      data-slot={index}
    >
      {thicknessLayers.map((zOffset) => (
        <div
          key={zOffset}
          className={styles.cardSlice}
          style={{ transform: `translateZ(${zOffset}px)` }}
          aria-hidden="true"
        />
      ))}

      <div className={styles.cardSliceGroup}>
        <article
          className={styles.cardFace}
          data-tier={tierId}
          style={{
            ["--tier-accent" as string]: theme.accent,
            ["--tier-glow" as string]: theme.glow,
            ["--tier-stripe" as string]: theme.stripe,
          }}
        >
          <div className={styles.cardGlow} aria-hidden="true" />
          <div className={styles.cardFrontInner}>
            <div className={styles.cardTopRow}>
              <span className={styles.cardBrand}>rim/studio</span>
              <span className={styles.cardLevel}>{copy.level}</span>
            </div>

            <div className={styles.cardDiscountBlock}>
              <span className={styles.cardDiscountValue}>{copy.discount}</span>
              <span className={styles.cardDiscountLabel}>{copy.discountLabel}</span>
            </div>

            <div className={styles.cardThreshold}>
              <span className={styles.cardThresholdLabel}>{copy.thresholdLabel}</span>
              <span className={styles.cardThresholdValue}>{copy.threshold}</span>
            </div>

            <ul className={styles.cardPerksInline}>
              {copy.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </div>

          <span className={styles.visuallyHidden}>
            RS-{String(index + 1).padStart(4, "0")} · {copy.level}
          </span>
        </article>
      </div>
    </div>
  );
}
