"use client";

import { StudioPhoneRow } from "@/components/StudioMessengerLinks";
import type { Dictionary } from "@/i18n/types";

import styles from "./style.module.css";

type PromoCardCopy = Dictionary["firstVisitPromo"]["card"];

type FirstVisitPromoCardStackProps = Readonly<{
  card: PromoCardCopy;
  ariaLabel: string;
  motionEnabled: boolean;
}>;

export function FirstVisitPromoCardStack({
  card,
  ariaLabel,
  motionEnabled,
}: FirstVisitPromoCardStackProps) {
  const sceneClass = motionEnabled
    ? styles.stackScene
    : `${styles.stackScene} ${styles.stackSceneStatic}`;

  return (
    <div className={styles.stackStage} aria-label={ariaLabel}>
      <div className={sceneClass}>
        <article className={`${styles.promoCard} ${styles.promoCardBack}`}>
          <header className={styles.cardHeader}>
            <span className={styles.cardBrand}>{card.brand}</span>
            <span className={styles.cardBackBadge}>{card.securedLabel}</span>
          </header>
          <StudioPhoneRow linkClassName={styles.cardPhone} />
          <p className={styles.cardPhoneCaption}>{card.phoneCaption}</p>
        </article>

        <article className={`${styles.promoCard} ${styles.promoCardFront}`}>
          <div className={styles.cardSheen} aria-hidden="true" />
          <header className={styles.cardHeader}>
            <span className={styles.cardBrand}>{card.brand}</span>
            <span className={styles.cardBadge}>{card.badge}</span>
          </header>

          <div className={styles.cardHero}>
            <span className={styles.cardDiscountValue}>{card.discount}</span>
            <span className={styles.cardDiscountLabel}>{card.discountLabel}</span>
          </div>

          <div className={styles.cardAudience}>
            <span className={styles.cardAudienceLabel}>{card.audienceLabel}</span>
            <p className={styles.cardAudienceText}>{card.audience}</p>
          </div>

          <ul className={styles.cardPerks}>
            {card.perks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
