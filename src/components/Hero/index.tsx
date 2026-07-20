"use client";

import gsap from "gsap";
import { useLenis } from "lenis/react";
import { Camera, Clock, Phone, Shield, Wallet } from "lucide-react";
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
import { PRICING_SECTION_ID } from "@/components/PricingSection";
import { ProductCards } from "@/components/ProductCards";
import { useReady } from "@/components/ReadyProvider";
import { ScrollDown } from "@/components/ScrollDown";
import { PAGE_BANNER_ATTR } from "@/content/page-banner";
import { SHOWCASE_WORK_CARDS } from "@/content/showcase-cards";
import { useLocale } from "@/i18n/LocaleProvider";
import { DiskPhotoModalForm } from "./DiskPhotoModalForm";
import styles from "./style.module.css";

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
export function Hero() {
  const { t } = useLocale();
  const { hero } = t;
  const { contentVisible, introReady } = useReady();
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();

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

  /* ---------- Background video --------------------------------------- */

  /* Freeze the background clip on its last frame instead of looping or
     resetting to the poster. We seek a hair before the end (`-0.05s`)
     because seeking to exactly `duration` makes some browsers (notably
     Safari) re-display the poster, and then `pause()` to stop the
     `ended` -> rewind cycle some autoplay policies trigger. */
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const handleVideoEnded = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (Number.isFinite(v.duration)) {
      v.currentTime = Math.max(0, v.duration - 0.05);
    }
    v.pause();
  }, []);

  /* `loadeddata` fires when the first frame is decoded — at that point
     the video has visible content under the soon-to-reveal title. */
  const [videoReady, setVideoReady] = useState(false);
  const handleVideoLoadedData = useCallback(() => setVideoReady(true), []);

  /* Cached / fast-loading clips can have `loadeddata` fire BEFORE React
     attaches `onLoadedData` — peek at `readyState` on mount and flip
     the gate immediately if frames are already decoded. `HAVE_CURRENT_DATA`
     (2) is the moment the first frame is paintable. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.readyState >= 2) setVideoReady(true);
  }, []);

  /* Kick the bg video off the moment the preloader mask hits ~80 %.
     We don't carry `autoPlay` on the element itself: with the page
     hidden behind the preloader, browser autoplay heuristics are
     inconsistent (paused on some, decoding on others, some pin to
     poster). Triggering `play()` here gives us a deterministic
     "video starts the second the user can see it" — `currentTime = 0`
     guarantees we open on frame 1 even if a previous mount kept it
     paused mid-clip. The `.catch()` swallows the autoplay-policy
     rejection on the off chance the browser refuses (muted +
     playsInline + programmatic should always be allowed, but belt
     and braces). */
  useEffect(() => {
    if (!contentVisible) return;
    const v = videoRef.current;
    if (!v) return;
    try {
      v.currentTime = 0;
    } catch {
      /* Some browsers throw if metadata isn't decoded yet — ignore;
         the video will start from wherever it is. */
    }
    void v.play().catch(() => {
      /* Autoplay denied — leave it paused, nothing else to do. */
    });
  }, [contentVisible]);

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
    () => splitWords(hero.titleStart, `${reactId}-ts`),
    [hero.titleStart, reactId],
  );
  const titleEndWords = useMemo(
    () => splitWords(hero.titleEnd, `${reactId}-te`),
    [hero.titleEnd, reactId],
  );
  const titleHighlightWords = useMemo(
    () => splitWords(hero.titleHighlight, `${reactId}-th`),
    [hero.titleHighlight, reactId],
  );
  const ledeWords = useMemo(
    () => splitWords(hero.lede, `${reactId}-l`),
    [hero.lede, reactId],
  );

  /* ---------- Intro timeline ----------------------------------------- */

  const rootRef = useRef<HTMLElement | null>(null);
  /* `introReady` flips when the preloader mask is fully open — that's
     when the cascade is allowed to run. `videoReady` ensures the
     clip is actually painting under the text by then (the safety
     timeout above guarantees we don't stall forever). */
  const canAnimate = introReady && videoReady;

  const [ctaPillExpand, setCtaPillExpand] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (photoModalOpen) {
      video.pause();
    }
  }, [photoModalOpen]);

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
          /* When the asset is missing the element renders nothing — no
             broken-icon, no console error. */
          src="/video/video_pain_wheel.mp4"
          /* Intentionally NO `autoPlay`: we want the clip to start the
             instant the preloader mask hits ~80 % (see the
             `contentVisible` effect above), not on mount — otherwise
             playback drifts during the preloader and the user sees a
             mid-clip frame the moment the mask exposes the video. */
          muted
          /* `loop` intentionally omitted — the clip plays once and
             `handleVideoEnded` pins it to the final frame. */
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoadedData}
          onEnded={handleVideoEnded}
        />
        {/* Soft brand-tinted overlay for legibility regardless of clip. */}
        <div className={styles.videoOverlay} />
      </div>

      {/* --- Content ------------------------------------------------- */}
      <div className={styles.inner}>
        <header className={styles.head}>
          <h1 id="hero-title" className={styles.title} data-anim-group="title">
            <span className={styles.titleLine}>
              {titleStartWords.map((seg, i) => (
                <span key={seg.key} className={styles.wordWrap}>
                  <span className={styles.word}>{seg.word}</span>
                  {i < titleStartWords.length - 1 ? " " : null}
                </span>
              ))}
            </span>
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
          </h1>

          <p className={styles.lede} data-anim-group="lede">
            {ledeWords.map((seg, i) => (
              <span key={seg.key} className={styles.wordWrap}>
                <span className={styles.word}>{seg.word}</span>
                {i < ledeWords.length - 1 ? " " : null}
              </span>
            ))}
          </p>

          <div className={styles.cta} data-anim-group="cta">
            {/* Each Button is wrapped so the entrance tween animates a
                neutral container — Button keeps ownership of its own
                hover/active `transform: scale(...)` without GSAP and
                CSS fighting over the same property. */}
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

            {/* `tel:` / `mailto:` href: the Button auto-detects this
                and renders a plain <a> (no next/link prefetch). */}
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
          </div>
        </header>

        {/* --- Bottom row: trust strip (left) + recent works (right) -- */}
        <div className={styles.bottom}>
          {/* Compact trust strip — small lucide icon, two-line label
              underneath in footer-grade micro typography. Items are
              separated by hairline vertical rules. Stays inline with
              the recent-works fan-out on desktop and falls onto its
              own row on mobile (where the fan-out is hidden). */}
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

          <aside
            className={styles.recent}
            data-anim-group="recent"
            aria-label={hero.recentWorksLabel}
          >
            <ProductCards
              cards={SHOWCASE_WORK_CARDS}
              eyebrowLabel={hero.recentWorksLabel}
              className={styles.recentCards}
              stackIntro
            />
          </aside>
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
