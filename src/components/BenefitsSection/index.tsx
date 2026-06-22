"use client";

import gsap from "gsap";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { runBenefitsScrollReveal } from "@/animations";
import { Button } from "@/components/Button";
import {
  BENEFITS_CENTER_FEATURE_ID,
  BENEFITS_CENTER_VIDEO,
  BENEFITS_SIDE_LEFT,
  BENEFITS_SIDE_RIGHT,
  type BenefitCardId,
} from "@/content/benefits-cards";
import { useLocale } from "@/i18n/LocaleProvider";

import styles from "./style.module.css";

export const BENEFITS_SECTION_ID = "benefits";

const PL_PHONE_PREFIX = "+48 ";

function formatPolishPhoneInput(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  const national = digits.startsWith("48") ? digits.slice(2, 11) : digits.slice(0, 9);

  if (national.length === 0) {
    return raw.trim().length === 0 ? "" : PL_PHONE_PREFIX;
  }

  const chunks = [
    national.slice(0, 3),
    national.slice(3, 6),
    national.slice(6, 9),
  ].filter(Boolean);

  return `${PL_PHONE_PREFIX}${chunks.join(" ")}`;
}

export function BenefitsSection() {
  const { locale, t } = useLocale();
  const { benefits } = t;
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phoneValue, setPhoneValue] = useState("");

  const centerCopy = benefits.cards[BENEFITS_CENTER_FEATURE_ID];

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const root = sectionRef.current;
    const trigger = stageRef.current;
    if (!root || !trigger) return;

    const ctx = gsap.context(() => {
      runBenefitsScrollReveal(
        trigger,
        {
          revealTitle: styles.revealTitle,
          revealCardLeft: styles.revealCardLeft,
          revealCardRight: styles.revealCardRight,
          revealCenter: styles.revealCenter,
        },
        Boolean(prefersReducedMotion),
      );
    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion, locale]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

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
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2
            id={`${BENEFITS_SECTION_ID}-title`}
            className={`${styles.title} ${styles.revealTitle}`}
          >
            <span className={styles.titleStrong}>{benefits.titleStrong}</span>
            <span className={styles.titleMuted}>{benefits.titleMuted}</span>
          </h2>
        </header>

        <div ref={stageRef} className={styles.stage}>
          <div className={styles.sideCol}>
            {BENEFITS_SIDE_LEFT.map((cardId, index) => (
              <BenefitTextCard
                key={cardId}
                cardId={cardId}
                title={benefits.cards[cardId].title}
                note={benefits.cards[cardId].note}
                layout={index === 2 ? "noteBottom" : "noteMiddle"}
                blob={index === 1 ? "corner" : "side"}
                revealClassName={styles.revealCardLeft}
              />
            ))}
          </div>

          <article
            className={`${styles.centerCard} ${styles.revealCenter}`}
            data-benefit={BENEFITS_CENTER_FEATURE_ID}
          >
            <video
              ref={videoRef}
              className={styles.centerVideo}
              src={BENEFITS_CENTER_VIDEO}
              muted
              playsInline
              loop
              preload="metadata"
              aria-hidden="true"
            />

            <div className={styles.centerContent}>
              <div className={styles.centerCopy}>
                <h3 className={styles.centerTitle}>{centerCopy.title}</h3>
                {centerCopy.note ? (
                  <p className={styles.centerNote}>{centerCopy.note}</p>
                ) : null}
              </div>

              <div className={styles.ctaBlock}>
                <p className={styles.ctaTitle}>
                  {benefits.cta.titleStart}{" "}
                  <span className={styles.ctaHighlight}>
                    {benefits.cta.titleHighlight}
                  </span>
                  {benefits.cta.titleEnd ? ` ${benefits.cta.titleEnd}` : null}
                </p>

                <form className={styles.ctaForm} onSubmit={handleSubmit}>
                  <label className={styles.phoneField}>
                    <span className={styles.visuallyHidden}>
                      {benefits.cta.phoneLabel}
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      value={phoneValue}
                      onChange={(event) => {
                        setPhoneValue(formatPolishPhoneInput(event.target.value));
                      }}
                      onFocus={() => {
                        if (!phoneValue) setPhoneValue(PL_PHONE_PREFIX);
                      }}
                      onBlur={() => {
                        if (phoneValue === PL_PHONE_PREFIX) setPhoneValue("");
                      }}
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
                  <Link
                    href={benefits.cta.privacyHref}
                    className={styles.ctaPrivacyLink}
                  >
                    {benefits.cta.privacyLinkLabel}
                  </Link>
                </p>
              </div>
            </div>
          </article>

          <div className={`${styles.sideCol} ${styles.sideColRight}`}>
            {BENEFITS_SIDE_RIGHT.map((cardId, index) => (
              <BenefitTextCard
                key={cardId}
                cardId={cardId}
                title={benefits.cards[cardId].title}
                note={benefits.cards[cardId].note}
                layout={index === 2 ? "noteBottom" : "noteMiddle"}
                blob={index === 0 ? "corner" : "side"}
                blobSide="right"
                revealClassName={styles.revealCardRight}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type BenefitTextCardProps = Readonly<{
  cardId: BenefitCardId;
  title: string;
  note?: string;
  layout: "noteMiddle" | "noteBottom";
  blob: "side" | "corner";
  blobSide?: "left" | "right";
  revealClassName: string;
}>;

function BenefitTextCard({
  cardId,
  title,
  note,
  layout,
  blob,
  blobSide = "left",
  revealClassName,
}: BenefitTextCardProps) {
  const blobClass =
    blob === "corner"
      ? blobSide === "right"
        ? styles.blobCornerRight
        : styles.blobCornerLeft
      : blobSide === "right"
        ? styles.blobSideRight
        : styles.blobSideLeft;

  return (
    <article
      className={`${styles.textCard} ${revealClassName}`}
      data-benefit={cardId}
      data-layout={layout}
    >
      <div className={`${styles.blob} ${blobClass}`} aria-hidden="true" />

      <div className={styles.textCardInner}>
        <h3 className={styles.textCardTitle}>{title}</h3>
        {note ? <p className={styles.textCardNote}>{note}</p> : null}
      </div>
    </article>
  );
}
