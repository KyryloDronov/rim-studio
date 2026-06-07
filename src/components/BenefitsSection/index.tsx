"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, type FormEvent } from "react";
import { runBenefitsScrollReveal } from "@/animations";
import { Button } from "@/components/Button";
import {
  BENEFIT_CARD_IMAGE,
  BENEFIT_CARD_ORDER,
  type BenefitCardId,
} from "@/content/benefits-cards";
import { useLocale } from "@/i18n/LocaleProvider";

import styles from "./style.module.css";

export const BENEFITS_SECTION_ID = "benefits";

export function BenefitsSection() {
  const { locale, t } = useLocale();
  const { benefits } = t;
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const root = sectionRef.current;
    const trigger = gridRef.current;
    if (!root || !trigger) return;

    const ctx = gsap.context(() => {
      runBenefitsScrollReveal(
        trigger,
        {
          revealTitle: styles.revealTitle,
          revealCard: styles.revealCard,
        },
        Boolean(prefersReducedMotion),
      );
    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion, locale]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section
      ref={sectionRef}
      id={BENEFITS_SECTION_ID}
      className={styles.section}
      aria-labelledby={`${BENEFITS_SECTION_ID}-title`}
    >
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.header}>
          <h2
            id={`${BENEFITS_SECTION_ID}-title`}
            className={`${styles.title} ${styles.revealTitle}`}
          >
            <span className={styles.titleStrong}>{benefits.titleStrong}</span>{" "}
            <span className={styles.titleMuted}>{benefits.titleMuted}</span>
          </h2>
        </header>

        <div ref={gridRef} className={styles.grid}>
          {BENEFIT_CARD_ORDER.map((cardId) => (
            <BenefitCard
              key={cardId}
              cardId={cardId}
              title={benefits.cards[cardId].title}
              note={benefits.cards[cardId].note}
              imageAlt={benefits.cards[cardId].imageAlt}
              imageSrc={BENEFIT_CARD_IMAGE[cardId]}
            />
          ))}

          <aside className={`${styles.ctaCard} ${styles.revealCard}`} data-bento="cta">
            <h3 className={styles.ctaTitle}>
              {benefits.cta.titleStart}{" "}
              <span className={styles.ctaHighlight}>
                {benefits.cta.titleHighlight}
              </span>
              {benefits.cta.titleEnd ? ` ${benefits.cta.titleEnd}` : null}
            </h3>

            <form className={styles.ctaForm} onSubmit={handleSubmit}>
              <label className={styles.phoneField}>
                <span className={styles.visuallyHidden}>
                  {benefits.cta.phoneLabel}
                </span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder={benefits.cta.phonePlaceholder}
                  className={styles.phoneInput}
                />
              </label>

              <Button type="submit" variant="accent" className={styles.ctaBtn}>
                {benefits.cta.submitLabel}
              </Button>
            </form>

            <p className={styles.ctaPrivacy}>
              {benefits.cta.privacyBefore}
              <Link href={benefits.cta.privacyHref} className={styles.ctaPrivacyLink}>
                {benefits.cta.privacyLinkLabel}
              </Link>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

type BenefitCardProps = Readonly<{
  cardId: BenefitCardId;
  title: string;
  note?: string;
  imageAlt: string;
  imageSrc: string;
}>;

function BenefitCard({
  cardId,
  title,
  note,
  imageAlt,
  imageSrc,
}: BenefitCardProps) {
  return (
    <article
      className={`${styles.card} ${styles.revealCard}`}
      data-bento={cardId}
    >
      <div className={styles.cardImageWrap}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 767px) 90vw, 28vw"
          className={styles.cardImage}
          draggable={false}
        />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {note ? <p className={styles.cardNote}>{note}</p> : null}
      </div>
    </article>
  );
}
