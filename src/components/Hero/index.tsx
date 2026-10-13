"use client";

import gsap from "gsap";
import { useLenis } from "lenis/react";
import {
  CalendarClock,
  Camera,
  Clock,
  Phone,
  Shield,
  Wallet,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import {
  Fragment,
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
import type { ConsultationSourceId } from "@/content/consultation-sources";
import { PRICING_SECTION_ID } from "@/components/PricingSection";
import { ProductCards } from "@/components/ProductCards";
import { useReady } from "@/components/ReadyProvider";
import { ScrollDown } from "@/components/ScrollDown";
import { PAGE_BANNER_ATTR } from "@/content/page-banner";
import { STUDIO_PHONE_HREF } from "@/content/studio-location";
import {
  BANNER_SECTION_NAV_VISIBLE,
  sectionNavItemsToProductCards,
  type PageSectionNavItem,
} from "@/content/section-nav";
import { useLocale } from "@/i18n/LocaleProvider";
import type { HeroBannerLedePart, ServicePageBanner } from "@/i18n/types";
import { SERVICE_HERO_BANNER_ICONS } from "@/content/service-hero-banner-icons";
import {
  DEFAULT_HERO_BACKGROUND_VIDEO,
} from "@/content/hero-background-videos";
import { useConsultation } from "@/components/Consultation/ConsultationContext";
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
const FEATURE_ICONS: Record<
  "shield" | "clock" | "wallet" | "camera",
  LucideIcon
> = {
  shield: Shield,
  clock: Clock,
  wallet: Wallet,
  camera: Camera,
};

function richLedeNeedsLeadingSpace(
  part: HeroBannerLedePart,
  partIndex: number,
): boolean {
  if (partIndex === 0) return false;
  const leadText = "parts" in part ? (part.parts[0]?.text ?? "") : part.text;
  const first = leadText.trimStart()[0] ?? "";
  return !/^[\.,!?;:)]/.test(first);
}

function renderRichLedeParts(
  ledeParts: ReadonlyArray<HeroBannerLedePart>,
  classes: Readonly<typeof styles>,
) {
  return ledeParts.map((part, pi) => {
    const needsLeadingSpace = richLedeNeedsLeadingSpace(part, pi);

    if ("parts" in part) {
      return (
        <Fragment key={`sld-${pi}`}>
          {needsLeadingSpace ? " " : null}
          <span className={classes.ledePart}>
            {part.parts.map((sub, si) => (
              <Fragment key={`sld-${pi}-s${si}`}>
                {si > 0 ? " " : null}
                <span className={sub.accent ? classes.ledeAccent : undefined}>
                  {sub.text}
                </span>
              </Fragment>
            ))}
          </span>
        </Fragment>
      );
    }

    const partClassName = part.accent
      ? `${classes.ledePart} ${classes.ledeAccent}`
      : classes.ledePart;

    return (
      <Fragment key={`sld-${pi}`}>
        {needsLeadingSpace ? " " : null}
        <span className={partClassName}>{part.text}</span>
      </Fragment>
    );
  });
}

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
  /** «Листайте» scroll target — home: services masonry; landings: pricing. */
  scrollTargetSectionId?: string;
  /** Consultation modal copy context (home vs service landing). */
  consultationSource?: ConsultationSourceId;
}>;

export function Hero({
  sectionNavItems,
  headline,
  serviceBanner,
  backgroundVideoSrc = DEFAULT_HERO_BACKGROUND_VIDEO,
  scrollTargetSectionId = PRICING_SECTION_ID,
  consultationSource = "home",
}: HeroProps) {
  const { t } = useLocale();
  const { hero } = t;
  const { contentVisible, introReady } = useReady();
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();

  const sectionNavCards = useMemo(
    () => sectionNavItemsToProductCards(sectionNavItems),
    [sectionNavItems],
  );

  const bannerHighlightsInTrust =
    serviceBanner?.highlightsPlacement === "trust";
  const serviceShellActive = Boolean(
    serviceBanner && !bannerHighlightsInTrust,
  );
  const richBannerCopy = Boolean(serviceBanner);
  const pageBanner = serviceBanner ?? null;

  const scrollPastHero = useCallback(() => {
    const target = document.getElementById(scrollTargetSectionId);
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
  }, [lenis, prefersReducedMotion, scrollTargetSectionId]);

  const { openConsultation, consultationOpen } = useConsultation();
  const openConsultationModal = useCallback(() => {
    openConsultation(consultationSource);
  }, [consultationSource, openConsultation]);

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
    if (!consultationOpen) {
      startVideo();
    }
  }, [contentVisible, consultationOpen, startVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !contentVisible) return;
    if (consultationOpen) {
      video.pause();
      return;
    }
    startVideo();
  }, [consultationOpen, contentVisible, startVideo]);

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
    return serviceBanner.titleLines.map((line, li) => {
      if ("parts" in line) {
        return {
          parts: line.parts.map((part, pi) => ({
            accent: part.accent === true,
            words: splitWords(part.text, `${reactId}-stl-${li}-p${pi}`),
          })),
        };
      }
      return {
        accent: line.accent === true,
        words: splitWords(line.text, `${reactId}-stl-${li}`),
      };
    });
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
        ledeReveal: styles.ledeReveal,
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
          serviceShellActive
            ? `${styles.inner} ${styles.innerService}`
            : styles.inner
        }
      >
        <header
          className={
            serviceShellActive
              ? `${styles.head} ${styles.headService}`
              : styles.head
          }
        >
          <h1 id="hero-title" className={styles.title} data-anim-group="title">
            {richBannerCopy ? (
              serviceTitleLines.map((line, li) => (
                <span key={`stl-${li}`} className={styles.titleLine}>
                  {"parts" in line && line.parts
                    ? line.parts.map((part, pi) => {
                        const nodes = part.words.map((seg, i) => (
                          <span key={seg.key} className={styles.wordWrap}>
                            <span className={styles.word}>{seg.word}</span>
                            {i < part.words.length - 1 ? " " : null}
                          </span>
                        ));
                        const chunk = part.accent ? (
                          <span className={styles.titleHighlight}>{nodes}</span>
                        ) : (
                          nodes
                        );
                        return (
                          <Fragment key={`stlp-${pi}`}>
                            {pi > 0 ? " " : null}
                            {chunk}
                          </Fragment>
                        );
                      })
                    : line.accent ? (
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
            {pageBanner ? (
              <span className={styles.ledeReveal}>
                {renderRichLedeParts(pageBanner.ledeParts, styles)}
              </span>
            ) : ledeWords.map((seg, i) => (
                  <span key={seg.key} className={styles.wordWrap}>
                    <span className={styles.word}>{seg.word}</span>
                    {i < ledeWords.length - 1 ? " " : null}
                  </span>
                ))}
          </p>

          {serviceShellActive ? (
            <>
              <ul
                className={`${styles.serviceHighlights} ${highlightsLayoutClass}`}
                data-anim-group="service-highlights"
              >
                {pageBanner!.highlights.map((item) => {
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
            {pageBanner ? (
              <>
                <span className={styles.ctaItem}>
                  <Button
                    type="button"
                    variant="accent"
                    size="md"
                    expandFromIcon
                    expandWhen={ctaPillExpand}
                    icon={<CalendarClock strokeWidth={1.75} />}
                    onClick={openConsultationModal}
                  >
                    {pageBanner.ctaPrimary.label}
                  </Button>
                </span>
                <span className={styles.ctaItem}>
                  <Button
                    href={STUDIO_PHONE_HREF}
                    variant="dark"
                    size="md"
                    expandFromIcon
                    expandWhen={ctaPillExpand}
                    icon={<Phone strokeWidth={1.75} />}
                  >
                    {hero.ctaSecondary.label}
                  </Button>
                </span>
                {pageBanner.ctaAside ? (
                  <span className={styles.ctaAsideItem}>
                    {(() => {
                      const AsideIcon =
                        SERVICE_HERO_BANNER_ICONS[pageBanner.ctaAside!.icon];
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
                            {pageBanner.ctaAside!.text}
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
                    icon={<CalendarClock strokeWidth={1.75} />}
                    onClick={openConsultationModal}
                  >
                    {hero.ctaPrimary.label}
                  </Button>
                </span>
                <span className={styles.ctaItem}>
                  <Button
                    href={STUDIO_PHONE_HREF}
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
            serviceShellActive
              ? `${styles.bottom} ${styles.bottomNavRight}`
              : styles.bottom
          }
        >
          {!pageBanner || bannerHighlightsInTrust ? (
          <ul className={styles.trust} data-anim-group="trust">
            {bannerHighlightsInTrust && pageBanner
              ? pageBanner.highlights.map((item) => {
                  const Icon = SERVICE_HERO_BANNER_ICONS[item.icon];
                  return (
                    <li key={item.id} className={styles.trustItem}>
                      <Icon
                        width={20}
                        height={20}
                        strokeWidth={1.5}
                        className={styles.trustIcon}
                        aria-hidden="true"
                      />
                      <span className={styles.trustCopy}>
                        <span className={styles.trustLabel}>{item.title}</span>
                        <span className={styles.trustValue}>
                          {item.subtitle}
                        </span>
                      </span>
                    </li>
                  );
                })
              : hero.features.map((feature) => {
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

          {BANNER_SECTION_NAV_VISIBLE && sectionNavCards.length > 0 ? (
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
            onClick={scrollPastHero}
            aria-label={hero.scrollHint}
          >
            <ScrollDown label={hero.scrollHint} size="md" interactive />
          </button>
        </div>
      </div>

    </section>
  );
}
