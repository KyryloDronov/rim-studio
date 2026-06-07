"use client";

import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { useEffect, useId, useMemo, useRef } from "react";
import { runFooterScrollReveal, splitClaimRuns } from "@/animations";
import { ProductCards } from "@/components/ProductCards";
import { SHOWCASE_WORK_CARDS } from "@/content/showcase-cards";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/paths";
import styles from "./style.module.css";

/* ---------- Static data (paths and visual hints) ----------------------- */

type FooterLink = Readonly<{
  href: string;
  labelKey: keyof FooterLinkLabels;
  external?: boolean;
}>;

type FooterLinkLabels = Readonly<{
  about: string;
  process: string;
  contact: string;
  privacy: string;
  terms: string;
}>;

const STUDIO_LINKS: ReadonlyArray<FooterLink> = [
  { href: "/", labelKey: "about" },
  { href: "/work", labelKey: "process" },
  { href: "/contact", labelKey: "contact" },
];

const LEGAL_LINKS: ReadonlyArray<FooterLink> = [
  { href: "/legal/privacy", labelKey: "privacy" },
  { href: "/legal/terms", labelKey: "terms" },
];

/* ---------- Inline social icons (Instagram, X) -------------------------- */

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 17 16"
      fill="none"
      aria-hidden="true"
      className={styles.socialIcon}
    >
      <path
        d="M12.467 0H4.16C1.867 0 0 1.867 0 4.163v7.6C0 14.06 1.867 15.927 4.16 15.927h8.307c2.295 0 4.162-1.866 4.162-4.163v-7.6C16.629 1.867 14.762 0 12.467 0Zm-11 4.163c0-1.485 1.21-2.694 2.694-2.694h8.307c1.485 0 2.694 1.21 2.694 2.694v7.6c0 1.486-1.209 2.695-2.694 2.695H4.161c-1.485 0-2.694-1.21-2.694-2.694v-7.6Z"
        fill="currentColor"
      />
      <path
        d="M8.314 11.834a3.872 3.872 0 1 0 0-7.744 3.872 3.872 0 0 0 0 7.744Zm0-6.275a2.403 2.403 0 1 1 0 4.807 2.403 2.403 0 0 1 0-4.807Z"
        fill="currentColor"
      />
      <path
        d="M12.543 4.72a1.044 1.044 0 1 0 0-2.088 1.044 1.044 0 0 0 0 2.087Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 17 15"
      fill="none"
      aria-hidden="true"
      className={styles.socialIcon}
    >
      <path
        d="M.04 0 6.228 8.278 0 15.009h1.402l5.454-5.893 4.406 5.893h4.771l-6.538-8.744L15.293 0h-1.402L8.868 5.427 4.81 0H.04ZM2.1 1.033h2.191l9.679 12.943h-2.192L2.1 1.033Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WordmarkIcon() {
  return (
    <svg
      viewBox="0 0 120 32"
      fill="none"
      aria-hidden="true"
      className={styles.wordmark}
    >
      <text
        x="0"
        y="24"
        fontFamily="-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
        fontSize="22"
        fontWeight="500"
        letterSpacing="-0.02em"
        fill="currentColor"
      >
        rim/studio
      </text>
    </svg>
  );
}

/* ---------- Footer column (eyebrow + staggered links) ------------------- */

type FooterColumnProps = Readonly<{
  title: string;
  links: ReadonlyArray<FooterLink>;
  labels: FooterLinkLabels;
  delay: number;
  locale: Parameters<typeof localizedPath>[0];
  groupRef: (el: HTMLDivElement | null) => void;
}>;

function FooterColumn({
  title,
  links,
  labels,
  delay,
  locale,
  groupRef,
}: FooterColumnProps) {
  return (
    <div className={styles.column}>
      <p className={`${styles.eyebrow} ${styles.revealAlpha}`}>{title}</p>
      <div
        className={styles.columnLinks}
        data-delay={delay}
        ref={groupRef}
      >
        {links.map((link) => {
          const href = link.external
            ? link.href
            : localizedPath(locale, link.href);
          return (
            <a
              key={link.href}
              href={href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className={`${styles.link} ${styles.revealLink}`}
            >
              <span className={styles.linkLabel}>{labels[link.labelKey]}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

type FooterServiceItem = Readonly<{ href: string; label: string }>;

type FooterServicesBlockProps = Readonly<{
  title: string;
  items: ReadonlyArray<FooterServiceItem>;
  delay: number;
  locale: Parameters<typeof localizedPath>[0];
  groupRef: (el: HTMLDivElement | null) => void;
}>;

function FooterServicesBlock({
  title,
  items,
  delay,
  locale,
  groupRef,
}: FooterServicesBlockProps) {
  const mid = Math.ceil(items.length / 2);
  const colA = items.slice(0, mid);
  const colB = items.slice(mid);

  return (
    <div className={`${styles.column} ${styles.servicesColumn}`}>
      <p className={`${styles.eyebrow} ${styles.revealAlpha}`}>{title}</p>
      <div
        className={styles.servicesGrid}
        data-delay={delay}
        ref={groupRef}
      >
        <ul className={styles.servicesList}>
          {colA.map((item) => (
            <li key={item.href}>
              <a
                href={localizedPath(locale, item.href)}
                className={`${styles.link} ${styles.revealLink}`}
              >
                <span className={styles.linkLabel}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <ul className={styles.servicesList}>
          {colB.map((item) => (
            <li key={item.href}>
              <a
                href={localizedPath(locale, item.href)}
                className={`${styles.link} ${styles.revealLink}`}
              >
                <span className={styles.linkLabel}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Footer ------------------------------------------------------ */

type FooterProps = Readonly<{
  /** Lifts the footer above (e.g. while preloader is on). */
  ready?: boolean;
}>;

export function Footer({ ready = true }: FooterProps) {
  const { locale, t } = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const rootRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const studioLinksRef = useRef<HTMLDivElement | null>(null);
  const serviceLinksRef = useRef<HTMLDivElement | null>(null);
  const legalLinksRef = useRef<HTMLDivElement | null>(null);

  /* Stable React keys for claim words — avoids `index` as key. */
  const reactId = useId();
  const claimSegments = useMemo(
    () => splitClaimRuns(reactId, t.footer.claimRuns),
    [reactId, t.footer.claimRuns],
  );

  /* Reveal-on-scroll. Mirrors the iyo footer — multiple sub-targets driven
     from one ScrollTrigger so the staggered delays line up consistently. */
  useEffect(() => {
    if (globalThis.window === undefined) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      runFooterScrollReveal(
        {
          topEl: topRef.current,
          bottomEl: bottomRef.current,
          studioLinks: studioLinksRef.current,
          serviceLinks: serviceLinksRef.current,
          legalLinks: legalLinksRef.current,
        },
        {
          revealAlpha: styles.revealAlpha,
          revealLine: styles.revealLine,
          revealLink: styles.revealLink,
          claimWord: styles.claimWord,
        },
        Boolean(prefersReducedMotion),
      );
    }, root);

    return () => ctx.revert();
    // The claim text is locale-dependent — re-arming the timeline on locale
    // change keeps the new words in sync with the GSAP selector.
  }, [
    prefersReducedMotion,
    locale,
    t.footer.claimRuns,
    t.footer.serviceItems,
  ]);

  const linkLabels: FooterLinkLabels = {
    ...t.footer.studioLinks,
    ...t.footer.legalLinks,
  };

  return (
    <footer
      ref={rootRef}
      className={styles.footer}
      data-ready={ready ? "true" : "false"}
    >
      {/* Looping video background. Muted + playsInline are required for
          autoplay on iOS Safari; preload="auto" warms it before reveal. */}
      <div className={styles.videoBackground} aria-hidden="true">
        <video
          src="/video/footer_video_bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className={styles.videoOverlay} />
      </div>

      <div className={styles.inner}>
        {/* Top row: brand block on the left, three nav columns on the
            right — matches the reference layout. */}
        <div className={styles.top} ref={topRef}>
          <div className={styles.brand}>
            <a
              href={localizedPath(locale, "/")}
              aria-label={t.meta.siteName}
              className={`${styles.brandLogo} ${styles.revealAlpha}`}
            >
              <WordmarkIcon />
            </a>
            <p className={styles.address}>
              {t.footer.addressLines.map((line) => (
                <span key={line} className={styles.addressLineWrap}>
                  <span className={`${styles.addressLine} ${styles.revealLine}`}>
                    {line}
                  </span>
                </span>
              ))}
            </p>
            <div className={`${styles.socials} ${styles.revealAlpha}`}>
              <a
                href="https://instagram.com/rim.studio"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <InstagramIcon />
              </a>
              <a
                href="https://x.com/rimstudio"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className={styles.socialLink}
              >
                <XIcon />
              </a>
            </div>
          </div>

          <div className={styles.columns}>
            <FooterColumn
              title={t.footer.columnStudio}
              links={STUDIO_LINKS}
              labels={linkLabels}
              delay={0}
              locale={locale}
              groupRef={(el) => {
                studioLinksRef.current = el;
              }}
            />
            <FooterServicesBlock
              title={t.footer.columnServices}
              items={t.footer.serviceItems}
              delay={1}
              locale={locale}
              groupRef={(el) => {
                serviceLinksRef.current = el;
              }}
            />
            <FooterColumn
              title={t.footer.columnLegal}
              links={LEGAL_LINKS}
              labels={linkLabels}
              delay={3}
              locale={locale}
              groupRef={(el) => {
                legalLinksRef.current = el;
              }}
            />
          </div>
        </div>

        {/* Bottom row: large claim left, product cards right. */}
        <div className={styles.bottom} ref={bottomRef}>
          <p className={styles.claim}>
            {claimSegments.map((seg, i) => (
              <span
                key={seg.key}
                className={styles.claimWordWrap}
                data-group={seg.group}
              >
                <span className={styles.claimWord}>{seg.word}</span>
                {seg.lineBreakAfter ? (
                  <br />
                ) : i < claimSegments.length - 1 ? (
                  " "
                ) : null}
              </span>
            ))}
          </p>

          <ProductCards
            cards={SHOWCASE_WORK_CARDS}
            eyebrowLabel={t.footer.shopNow}
            className={styles.productCardsBlock}
          />
        </div>

        <div className={styles.copyright}>
          <span className={styles.revealAlpha}>{t.footer.copyright}</span>
          <span className={styles.revealAlpha}>
            {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
