"use client";

import gsap from "gsap";
import { useLenis } from "lenis/react";
import { Camera, CalendarClock, Clock, Phone, Shield, Wallet } from "lucide-react";
import { useReducedMotion } from "motion/react";
import {
  type ComponentType,
  type SVGProps,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  createHeroIntroTimeline,
  queryHeroIntroElements,
  setHeroIntroReducedMotion,
  splitWords,
} from "@/animations";
import { Button } from "@/components/Button";
import { useContactSheet } from "@/components/ContactSheet/ContactSheetContext";
import { PRICING_SECTION_ID } from "@/components/PricingSection";
import { ProductCards } from "@/components/ProductCards";
import { useReady } from "@/components/ReadyProvider";
import { ScrollDown } from "@/components/ScrollDown";
import { PAGE_BANNER_ATTR } from "@/content/page-banner";
import {
  sectionNavItemsToProductCards,
  type PageSectionNavItem,
} from "@/content/section-nav";
import { useLocale } from "@/i18n/LocaleProvider";
import type { ServicePageBanner } from "@/i18n/types";
import { SERVICE_HERO_BANNER_ICONS } from "@/content/service-hero-banner-icons";
import {
  DEFAULT_HERO_BACKGROUND_VIDEO,
} from "@/content/hero-background-videos";
import { DiskPhotoModalForm } from "./DiskPhotoModalForm";
import styles from "./style.module.css";

const VIDEO_END_EPSILON = 0.04;

/* Hard cap on how long we wait for the bg video to load before
   un-gating the intro animation. Keeps the title from sitting blurred
   forever if the asset is missing / blocked / 404'd. */
const VIDEO_READY_TIMEOUT_MS = 4000;

/* Lucide icon registry used by the hero's compact bottom "trust strip".
   The dictionary only ships a stable string id (`shield` / `clock` /
   `wallet`) — the icon component is resolved here so translators never
   touch SVGs and adding a chip stays a one-line dictionary diff. */
type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>;
const FEATURE_ICONS: Record<"shield" | "clock" | "wallet", LucideIcon> = {
  shield: Shield,
  clock: Clock,
  wallet: Wallet,
};

/* The hero is the first thing the user sees. Layout is centred via the
   `inner` grid; intro motion (this file) animates title → lede in a
   word-by-word "assemble from blur" cascade — same vocabulary as the
   footer's claim — gated on:
     1. `useReady().introReady` flipping `true` (preloader mask is
        FULLY open — not just past 80 %), AND
     2. the background `<video>` reporting `loadeddata` (so the clip
        is visibly painting under the text by the time it un-blurs).
   A 4 s safety timeout un-gates regardless if the video never loads.
   Separately, `useReady().contentVisible` (which flips ~80 % through
   the mask reveal) is what kicks the bg video off — so the video
   is already rolling by the time the mask is gone and the cascade
   starts. */
type HeroProps = Readonly<{
  /** Sections on the current page — fan-out cards scroll to `#sectionId`. */
  sectionNavItems: ReadonlyArray<PageSectionNavItem>;
  /** Service landings: same hero shell, page-specific H1 + lede. */
  headline?: Readonly<{
    title: string;
    lede: string;
  }>;
  /** Rich service landing banner (tire, repair, …). */
  serviceBanner?: ServicePageBanner;
  /** Full-cover background clip (service-specific or home default). */
  backgroundVideoSrc?: string;
}>;

export function Hero({
  sectionNavItems,
  headline,
  serviceBanner,
  backgroundVideoSrc = DEFAULT_HERO_BACKGROUND_VIDEO,
}: HeroProps) {
  const { t } = useLocale();
  const { hero } = t;
  const { openSheet } = useContactSheet();
  const { contentVisible, introReady } = useReady();
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();

  const sectionNavCards = useMemo(
    () => sectionNavItemsToProductCards(sectionNavItems),
    [sectionNavItems],
  );

  const scrollToPricing = useCallback(() => {
    const target = document.getElementById(PRICING_SECTION_ID);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, {
        duration: prefersReducedMotion ? 0 : 1.35,
        easing: (t: number) => 1 - (1 - t) ** 3,
      });
      return;
    }
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [lenis, prefersReducedMotion]);

  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  /* ---------- Background video --------------------------------------- */

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoLoop = !prefersReducedMotion;

  const startVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.loop = videoLoop;
    void video.play().catch(() => {});
  }, [videoLoop]);

  /* `loadeddata` fires when the first frame is decoded — at that point
     the video has visible content under the soon-to-reveal title. */
  const [videoReady, setVideoReady] = useState(false);
  const handleVideoLoadedData = useCallback(() => setVideoReady(true), []);

  const handleVideoEnded = useCallback(() => {
    if (videoLoop) return;
    const video = videoRef.current;
    if (!video) return;
    if (Number.isFinite(video.duration)) {
      video.currentTime = Math.max(0, video.duration - VIDEO_END_EPSILON);
    }
    video.pause();
  }, [videoLoop]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.readyState >= 2) setVideoReady(true);
  }, [backgroundVideoSrc]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.getAttribute("src") === backgroundVideoSrc) return;
    v.pause();
    v.src = backgroundVideoSrc;
    v.load();
    setVideoReady(false);
  }, [backgroundVideoSrc]);

  useEffect(() => {
    if (!contentVisible) return;
    const v = videoRef.current;
    if (!v) return;
    try {
      v.currentTime = 0;
    } catch {
      /* metadata not ready */
    }
    if (!photoModalOpen) {
      startVideo();
    }
  }, [contentVisible, photoModalOpen, startVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !contentVisible) return;
    if (photoModalOpen) {
      video.pause();
      return;
    }
    startVideo();
  }, [photoModalOpen, contentVisible, startVideo]);

  /* Safety net: if the asset is missing / blocked, don't keep the title
     hidden forever — release the gate after a hard cap. */
  useEffect(() => {
    if (videoReady) return;
    const id = globalThis.window?.setTimeout(
      () => setVideoReady(true),
      VIDEO_READY_TIMEOUT_MS,
    );
    return () => {
      if (id !== undefined) globalThis.window?.clearTimeout(id);
    };
  }, [videoReady]);

  /* ---------- Word splits (stable React keys) ------------------------ */

  /* `useId()` keeps keys unique per Hero instance (matters during
     `<AnimatePresence>` route swaps if we ever mount two heroes). */
  const reactId = useId();
  const titleStartWords = useMemo(
    () =>
      headline
        ? splitWords(headline.title, `${reactId}-st`)
        : splitWords(hero.titleStart, `${reactId}-ts`),
    [headline, hero.titleStart, reactId],
  );
  const titleEndWords = useMemo(
    () =>
      headline ? [] : splitWords(hero.titleEnd, `${reactId}-te`),
    [headline, hero.titleEnd, reactId],
  );
  const titleHighlightWords = useMemo(
    () =>
      headline ? [] : splitWords(hero.titleHighlight, `${reactId}-th`),
    [headline, hero.titleHighlight, reactId],
  );
  const ledeWords = useMemo(
    () =>
      headline
        ? splitWords(headline.lede, `${reactId}-l`)
        : splitWords(hero.lede, `${reactId}-l`),
    [headline, hero.lede, reactId],
  );

  const serviceTitleLines = useMemo(() => {
    if (!serviceBanner) return [];
    return serviceBanner.titleLines.map((line, li) => ({
      accent: line.accent === true,
      words: splitWords(line.text, `${reactId}-stl-${li}`),
    }));
  }, [serviceBanner, reactId]);

  const serviceLedeParts = useMemo(() => {
    if (!serviceBanner) return [];
    return serviceBanner.ledeParts.map((part, pi) => ({
      accent: part.accent === true,
      words: splitWords(part.text, `${reactId}-sld-${pi}`),
    }));
  }, [serviceBanner, reactId]);

  const highlightsLayoutClass = useMemo(() => {
    if (!serviceBanner) return styles.serviceHighlightsGrid;
    switch (serviceBanner.layout) {
      case "tiles":
        return styles.serviceHighlightsTiles;
      case "pair":
        return styles.serviceHighlightsPair;
      case "rail":
        return styles.serviceHighlightsRail;
      default:
        return styles.serviceHighlightsGrid;
    }
  }, [serviceBanner]);

  /* ---------- Intro timeline ----------------------------------------- */

  const rootRef = useRef<HTMLElement | null>(null);
  /* `introReady` flips when the preloader mask is fully open — that's
     when the cascade is allowed to run. `videoReady` ensures the
     clip is actually painting under the text by then (the safety
     timeout above guarantees we don't stall forever). */
  const canAnimate = introReady && videoReady;

  const [ctaPillExpand, setCtaPillExpand] = useState(false);

  const onAfterCtaReveal = useCallback(() => {
    setCtaPillExpand(true);
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect -- GSAP intro + reduced-motion branch reset CTA pill state */
  useEffect(() => {
    if (globalThis.window === undefined) return;
    const root = rootRef.current;
    if (!root) return;
    if (!canAnimate) {
      setCtaPillExpand(false);
      return;
    }

    const ctx = gsap.context(() => {
      const intro = queryHeroIntroElements(root, {
        word: styles.word,
        ctaItem: styles.ctaItem,
        trustItem: styles.trustItem,
        serviceRevealItem: styles.serviceRevealItem,
        ctaAsideItem: styles.ctaAsideItem,
      });

      if (prefersReducedMotion) {
        setHeroIntroReducedMotion(intro);
        setCtaPillExpand(true);
        return;
      }

      setCtaPillExpand(false);
      createHeroIntroTimeline(intro, { onAfterCtaReveal });
    }, root);

    return () => ctx.revert();
  }, [canAnimate, onAfterCtaReveal, prefersReducedMotion]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <section
      ref={rootRef}
      className={styles.hero}
      {...{ [PAGE_BANNER_ATTR]: true }}
      aria-labelledby="hero-title"
    >
      {/* --- BG layer ----------------------------------------------- */}
      <div className={styles.videoBackground} aria-hidden="true">
        <video
          ref={videoRef}
          className={styles.video}
          src={backgroundVideoSrc}
          muted
          playsInline
          preload="auto"
          loop={videoLoop}
          onLoadedData={handleVideoLoadedData}
          onEnded={handleVideoEnded}
        />
        {/* Soft brand-tinted overlay for legibility regardless of clip. */}
        <div className={styles.videoOverlay} />
      </div>

      {/* --- Content ------------------------------------------------- */}
      <div
        className={
          serviceBanner
            ? `${styles.inner} ${styles.innerService}`
            : styles.inner
        }
      >
        <header
          className={
            serviceBanner ? `${styles.head} ${styles.headService}` : styles.head
          }
        >
          <h1 id="hero-title" className={styles.title} data-anim-group="title">
            {serviceBanner ? (
              serviceTitleLines.map((line, li) => (
                <span key={`stl-${li}`} className={styles.titleLine}>
                  {line.accent ? (
                    <span className={styles.titleHighlight}>
                      {line.words.map((seg, i) => (
                        <span key={seg.key} className={styles.wordWrap}>
                          <span className={styles.word}>{seg.word}</span>
                          {i < line.words.length - 1 ? " " : null}
                        </span>
                      ))}
                    </span>
                  ) : (
                    line.words.map((seg, i) => (
                      <span key={seg.key} className={styles.wordWrap}>
                        <span className={styles.word}>{seg.word}</span>
                        {i < line.words.length - 1 ? " " : null}
                      </span>
                    ))
                  )}
                </span>
              ))
            ) : (
              <>
                <span className={styles.titleLine}>
                  {titleStartWords.map((seg, i) => (
                    <span key={seg.key} className={styles.wordWrap}>
                      <span className={styles.word}>{seg.word}</span>
                      {i < titleStartWords.length - 1 ? " " : null}
                    </span>
                  ))}
                </span>
                {titleEndWords.length > 0 || titleHighlightWords.length > 0 ? (
                  <span className={styles.titleLine}>
                    {titleEndWords.map((seg) => (
                      <span key={seg.key} className={styles.wordWrap}>
                        <span className={styles.word}>{seg.word}</span>{" "}
                      </span>
                    ))}
                    <span className={styles.titleHighlight}>
                      {titleHighlightWords.map((seg, i) => (
                        <span key={seg.key} className={styles.wordWrap}>
                          <span className={styles.word}>{seg.word}</span>
                          {i < titleHighlightWords.length - 1 ? " " : null}
                        </span>
                      ))}
                    </span>
                  </span>
                ) : null}
              </>
            )}
          </h1>

          <p className={styles.lede} data-anim-group="lede">
            {serviceBanner
              ? serviceLedeParts.map((part, pi) => {
                  const firstWord = part.words[0]?.word ?? "";
                  const needsLeadingSpace =
                    pi > 0 && !/^[\.,!?;:)]/.test(firstWord);
                  const partClassName = part.accent
                    ? `${styles.ledePart} ${styles.ledeAccent}`
                    : styles.ledePart;
                  return (
                    <span
                      key={`sld-${pi}`}
                      className={partClassName}
                      data-lede-join={needsLeadingSpace ? "true" : undefined}
                    >
                      {part.words.map((seg, i) => (
                        <span key={seg.key} className={styles.wordWrap}>
                          <span className={styles.word}>{seg.word}</span>
                          {i < part.words.length - 1 ? " " : null}
                        </span>
                      ))}
                    </span>
                  );
                })
              : ledeWords.map((seg, i) => (
                  <span key={seg.key} className={styles.wordWrap}>
                    <span className={styles.word}>{seg.word}</span>
                    {i < ledeWords.length - 1 ? " " : null}
                  </span>
                ))}
          </p>

          {serviceBanner ? (
            <>
              <ul
                className={`${styles.serviceHighlights} ${highlightsLayoutClass}`}
                data-anim-group="service-highlights"
              >
                {serviceBanner.highlights.map((item) => {
                  const Icon = SERVICE_HERO_BANNER_ICONS[item.icon];
                  return (
                    <li
                      key={item.id}
                      className={`${styles.serviceHighlight} ${styles.serviceRevealItem}`}
                    >
                      <span className={styles.serviceHighlightIconWrap}>
                        <Icon
                          width={22}
                          height={22}
                          strokeWidth={1.5}
                          className={styles.serviceHighlightIcon}
                          aria-hidden="true"
                        />
                      </span>
                      <span className={styles.serviceHighlightCopy}>
                        <span className={styles.serviceHighlightTitle}>
                          {item.title}
                        </span>
                        {item.subtitle ? (
                          <span className={styles.serviceHighlightSubtitle}>
                            {item.subtitle}
                          </span>
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}

          <div className={styles.cta} data-anim-group="cta">
            {serviceBanner ? (
              <>
                <span className={styles.ctaItem}>
                  <Button
                    type="button"
                    variant="accent"
                    size="md"
                    expandFromIcon
                    expandWhen={ctaPillExpand}
                    icon={
                      serviceBanner.ctaPrimary.action === "photo" ? (
                        <Camera strokeWidth={1.75} />
                      ) : (
                        <CalendarClock strokeWidth={1.75} />
                      )
                    }
                    onClick={
                      serviceBanner.ctaPrimary.action === "photo"
                        ? () => setPhotoModalOpen(true)
                        : openSheet
                    }
                  >
                    {serviceBanner.ctaPrimary.label}
                  </Button>
                </span>
                <span className={styles.ctaItem}>
                  <Button
                    href={hero.ctaSecondary.href}
                    variant="dark"
                    size="md"
                    expandFromIcon
                    expandWhen={ctaPillExpand}
                    icon={<Phone strokeWidth={1.75} />}
                  >
                    {hero.ctaSecondary.label}
                  </Button>
                </span>
                {serviceBanner.ctaAside ? (
                  <span className={styles.ctaAsideItem}>
                    {(() => {
                      const AsideIcon =
                        SERVICE_HERO_BANNER_ICONS[serviceBanner.ctaAside.icon];
                      return (
                        <>
                          <AsideIcon
                            width={20}
                            height={20}
                            strokeWidth={1.5}
                            className={styles.ctaAsideIcon}
                            aria-hidden="true"
                          />
                          <span className={styles.ctaAsideText}>
                            {serviceBanner.ctaAside.text}
                          </span>
                        </>
                      );
                    })()}
                  </span>
                ) : null}
              </>
            ) : (
              <>
                <span className={styles.ctaItem}>
                  <Button
                    type="button"
                    variant="accent"
                    size="md"
                    expandFromIcon
                    expandWhen={ctaPillExpand}
                    icon={<Camera strokeWidth={1.75} />}
                    onClick={() => setPhotoModalOpen(true)}
                  >
                    {hero.ctaPrimary.label}
                  </Button>
                </span>
                <span className={styles.ctaItem}>
                  <Button
                    href={hero.ctaSecondary.href}
                    variant="dark"
                    size="md"
                    expandFromIcon
                    expandWhen={ctaPillExpand}
                    icon={<Phone strokeWidth={1.75} />}
                  >
                    {hero.ctaSecondary.label}
                  </Button>
                </span>
              </>
            )}
          </div>

        </header>

        {/* --- Bottom row: trust strip (left) + recent works (right) -- */}
        <div
          className={
            serviceBanner
              ? `${styles.bottom} ${styles.bottomNavRight}`
              : styles.bottom
          }
        >
          {!serviceBanner ? (
          <ul className={styles.trust} data-anim-group="trust">
            {hero.features.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon];
              return (
                <li key={feature.id} className={styles.trustItem}>
                  <Icon
                    width={20}
                    height={20}
                    strokeWidth={1.5}
                    className={styles.trustIcon}
                    aria-hidden="true"
                  />
                  <span className={styles.trustCopy}>
                    <span className={styles.trustLabel}>{feature.label}</span>
                    <span className={styles.trustValue}>{feature.value}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          ) : null}

          {sectionNavCards.length > 0 ? (
            <aside
              className={styles.recent}
              data-anim-group="recent"
              aria-label={hero.sectionNavLabel}
            >
              <ProductCards
                cards={sectionNavCards}
                eyebrowLabel={hero.sectionNavLabel}
                className={styles.recentCards}
                stackIntro
                density="compact"
                labelVisibility="expanded"
              />
            </aside>
          ) : null}
        </div>
      </div>

      {/* Bottom-center scroll affordance. Sits above the video overlay
          but under any interactive content; positioned relative to the
          section, not the inner column, so it stays centred regardless
          of the recent-works width on the right. */}
      <div className={styles.scrollHint}>
        <div className={styles.scrollHintReveal} data-hero-scroll-hint>
          <button
            type="button"
            className={styles.scrollHintBtn}
            onClick={scrollToPricing}
            aria-label={hero.scrollHint}
          >
            <ScrollDown label={hero.scrollHint} size="md" interactive />
          </button>
        </div>
      </div>

      <DiskPhotoModalForm
        open={photoModalOpen}
        onOpenChange={setPhotoModalOpen}
      />
    </section>
  );
}
