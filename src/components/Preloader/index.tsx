"use client";

import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import styles from "./style.module.css";

/* Wordmark shown inside the cutout. Centralised so JSX (split into
   chars) and the cutout sizing in CSS stay in sync if it ever changes. */
const LOGO_TEXT = "rim.studio";

/* Timeline knobs — exposed at module scope so JSX/CSS/tests can read
   the same numbers we animate against. */

/** Phase 1 — total duration of the orange bar segments (must match the
 *  sum of the chained `.bg` tweens below). Used to sync the wordmark
 *  roll to one pass across the full fill. */
const BAR_FILL_DURATION =
  0.35 + 0.55 + 0.55 + 0.5 + 0.45;

/** Spread char tween start times across this window (`stagger.amount`);
 *  each glyph's roll lasts `BAR_FILL_DURATION - CHAR_STAGGER_AMOUNT`. */
const CHAR_STAGGER_AMOUNT = BAR_FILL_DURATION * 0.26;
const CHAR_ROLL_DURATION = BAR_FILL_DURATION - CHAR_STAGGER_AMOUNT;

/** Phase 2a — text fades to transparent before the cutout starts to
 *  morph (so the disappearing glyphs don't get clipped by the
 *  shrinking pill). */
const TEXT_FADE_DURATION = 0.3;
/** Phase 2b — the rectangular pill cutout gathers into a small
 *  centred circle. Width + height tween together; the `border-radius:
 *  999px` baked into the CSS keeps the corners fully rounded the
 *  whole way through. */
const MORPH_DURATION = 0.6;
/** Phase 3 — the now-circular cutout scales out past the viewport,
 *  pushing the dark frame off all four edges. The page below the
 *  preloader is revealed through the growing window. */
const REVEAL_DURATION = 0.9;
/** Fraction of the reveal at which the page is un-hidden so the bg
 *  video starts painting under the still-expanding window. */
const CONTENT_VISIBLE_RATIO = 0.8;
/** Final cutout size at the end of phase 3. `vmax` is the larger of
 *  vw/vh, so `300vmax` always guarantees the cutout is bigger than
 *  the viewport diagonal regardless of aspect ratio. */
const REVEAL_TARGET_SIZE = "300vmax";
/** Square size the rectangular pill cutout shrinks down to before
 *  the wipe starts. Small enough to read as "a dot", large enough
 *  to be visible across viewport sizes. */
const MORPH_TARGET_SIZE = "8vmin";

type PreloaderProps = Readonly<{
  /**
   * Fires when the mask is ~80 % expanded. The site shell flips
   * `contentVisible = true`, the wrapper paints, and the hero's
   * background video starts playing under the still-dissolving mask.
   * Intro animations DO NOT start here — that's `onAnimationsStart`.
   */
  onContentVisible: () => void;
  /**
   * Fires when the mask is fully open (i.e. the wipe is done). The
   * shell flips `introReady = true` so component-level entrance
   * animations (hero title cascade, menu nav stagger, etc.) start
   * with the mask already out of the way — no fighting between the
   * wipe and the cascades.
   */
  onAnimationsStart: () => void;
  /**
   * Fires once the whole timeline has run (bar + reveal + fade).
   * Every preloader layer is at `autoAlpha: 0` by then, so dropping
   * the component from the tree is a silent DOM cleanup.
   */
  onComplete: () => void;
}>;

/**
 * Site-wide intro preloader. Visual rhythm:
 *
 *   1. Bar fill (~2.4 s) — a white plate sits behind the viewport
 *      (visible inside the pill cutout before the orange arrives).
 *      An orange `.bg` scales in from the left in 5 stutter segments
 *      slot-roll runs **once**, slowly, across the same duration as
 *      the bar (not repeated).
 *   2. Text fade + shape morph (~0.9 s) — the wordmark fades out,
 *      then the pill window shrinks to a small centred circle.
 *      Because the orange `.bg` is full-viewport behind the
 *      cutout, what the user sees is the orange visibly gathering
 *      from a horizontal bar into a dot.
 *   3. Wipe reveal (~0.9 s) — the orange and dark plates fade to
 *      transparent in parallel with the cutout scaling out from
 *      the dot to past the viewport. The dark frame is pushed off
 *      all four edges and the page below the preloader appears
 *      through the growing window.
 *
 * The shell receives three phase-anchored callbacks (see prop
 * docs above) so it can coordinate hero / menu intro animations
 * against this timeline rather than sleeping on magic numbers.
 */
export default function Preloader({
  onContentVisible,
  onAnimationsStart,
  onComplete,
}: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    /* Reduced-motion path: skip the animation but still hand off all
       three signals so the shell un-hides the page, releases the
       intro-anim gate, and unmounts us — all on the next frame. */
    if (prefersReducedMotion) {
      const raf = globalThis.window.requestAnimationFrame(() => {
        onContentVisible();
        onAnimationsStart();
        globalThis.window.requestAnimationFrame(onComplete);
      });
      return () => globalThis.window.cancelAnimationFrame(raf);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      /* Bar fill on its own nested timeline so segments stay sequential
         and we can place the whole block at t = 0. If we chain `.to()`
         on the root `tl` after `from()`, GSAP appends later tweens to
         the timeline end — so the bar used to run only after the char
         roll finished. */
      const barTl = gsap.timeline();
      barTl
        .to(`.${styles.bg}`, {
          scaleX: 0.18,
          duration: 0.35,
          ease: "power2.out",
        })
        .to(`.${styles.bg}`, {
          scaleX: 0.4,
          duration: 0.55,
          ease: "power1.inOut",
        })
        .to(`.${styles.bg}`, {
          scaleX: 0.65,
          duration: 0.55,
          ease: "power2.in",
        })
        .to(`.${styles.bg}`, {
          scaleX: 0.86,
          duration: 0.5,
          ease: "power1.inOut",
        })
        .to(`.${styles.bg}`, {
          scaleX: 1,
          duration: 0.45,
          ease: "power3.out",
        });
      tl.add(barTl, 0);

      /* Slot-machine roll: one slow pass for the whole bar duration —
         staggered starts (random order) so the shuffle reads clearly. */
      tl.set(`.${styles.logoText}`, { visibility: "visible" }, 0);
      tl.from(
        `.${styles.char}`,
        {
          yPercent: -100,
          ease: "power2.inOut",
          duration: CHAR_ROLL_DURATION,
          stagger: { amount: CHAR_STAGGER_AMOUNT, from: "random" },
        },
        0,
      );

      /* End of bar fill. The orange `.bg` is at `scaleX: 1`, fully
         covering the rectangular pill window. */
      tl.addLabel("barFull");

      /* Phase 2a — fade the wordmark out so the morph that follows
         doesn't have a half-clipped wordmark sliding around inside
         the shrinking pill. Runs first; morph picks up after. */
      tl.to(
        `.${styles.logo}`,
        {
          autoAlpha: 0,
          duration: TEXT_FADE_DURATION,
          ease: "power2.in",
        },
        "barFull",
      );

      /* Phase 2b — pill → circle morph. Width + height tween in
         lockstep down to a small square; the `border-radius: 999px`
         baked into the CSS clamps to half-the-shorter-side, so the
         corners stay full-pill the whole way through and the box
         lands as a perfect circle once W === H. `expo.inOut` gives
         a confident gather (slow start, quick middle, soft land)
         that reads as "all that bar collected into a single dot".
         Anchored at the END of the text fade, not at `barFull`, so
         the two motions don't fight for attention. */
      tl.addLabel("morphStart", `barFull+=${TEXT_FADE_DURATION}`);
      tl.to(
        `.${styles.cutout}`,
        {
          width: MORPH_TARGET_SIZE,
          height: MORPH_TARGET_SIZE,
          duration: MORPH_DURATION,
          ease: "expo.inOut",
        },
        "morphStart",
      );

      /* End of phase 2 — the cutout is now a small orange dot at
         centre on a dark plate. Everything from here on is the
         wipe-reveal. */
      tl.addLabel("revealStart", `morphStart+=${MORPH_DURATION}`);

      /* Phase 3 — fade the dark backdrop and the orange fill out
         in parallel with the cutout scale-out. Faster duration
         than the cutout (0.25 s vs 0.9 s) AND the cutout starts
         on `expo.in` (almost stationary in its first quarter),
         so by the time the cutout is meaningfully larger than
         the dot the orange is already gone — what the user sees
         is the orange dot dissolving into a window onto the page,
         then the window opening up. */
      tl.to(
        [`.${styles.bg}`, `.${styles.plate}`],
        {
          autoAlpha: 0,
          duration: 0.25,
          ease: "power2.in",
        },
        "revealStart",
      );

      /* Cutout scale-out. `expo.in` mirrors the reference's
         late-acceleration wipe: the box-shadow on `.cutout` is
         what paints the dark frame, so as the cutout grows the
         frame is automatically pushed off all four edges. */
      tl.to(
        `.${styles.cutout}`,
        {
          width: REVEAL_TARGET_SIZE,
          height: REVEAL_TARGET_SIZE,
          duration: REVEAL_DURATION,
          ease: "expo.in",
        },
        "revealStart",
      );

      /* ~80 % through the wipe — un-hide the page so the bg video
         starts painting under the still-expanding window. */
      tl.call(
        onContentVisible,
        [],
        `revealStart+=${REVEAL_DURATION * CONTENT_VISIBLE_RATIO}`,
      );

      /* Wipe done — release the intro-anim gate. Hero / menu
         cascades can now run with the preloader fully out of the
         way. */
      tl.call(
        onAnimationsStart,
        [],
        `revealStart+=${REVEAL_DURATION}`,
      );

      /* Tiny tail so React state updates from `onAnimationsStart`
         get a chance to commit before we drop the preloader from
         the tree. Visually nothing is happening here — every
         visible layer is already at `autoAlpha: 0` (the dark
         frame from `.cutout`'s box-shadow is past the viewport). */
      tl.call(
        onComplete,
        [],
        `revealStart+=${REVEAL_DURATION + 0.05}`,
      );
    }, root);

    return () => {
      ctx.revert();
    };
  }, [
    onContentVisible,
    onAnimationsStart,
    onComplete,
    prefersReducedMotion,
  ]);

  /* Char-split structure (manual to avoid the SplitText runtime). Each
     glyph gets a 3-deep nest: an outer mask with `overflow: hidden`,
     an inner span GSAP animates by `yPercent`, and inside it both the
     "real" glyph and a duplicate translated 100% below — so during the
     roll the mask shows the duplicate going out and the original
     coming in. Aria-hidden + a top-level aria-label keep AT happy. */
  const chars = useMemo(() => Array.from(LOGO_TEXT), []);

  return (
    <div ref={rootRef} className={styles.preloader} aria-hidden="true">
      {/* Layer 1: white backdrop — visible inside the cutout before the
          orange sweep; fades out at the start of phase 3. */}
      <div className={styles.plate} />
      {/* Layer 2: orange fill that scales horizontally from 0 → 1.
          Full-viewport — the cutout above clips it to the visible
          pill / circle window. */}
      <div className={styles.bg} />
      {/* Layer 3: black brand wordmark, centred. Slot-machine
          rolls during phase 1, fades out at the start of phase 2. */}
      <div className={styles.logo}>
        <p className={styles.logoText} aria-label={LOGO_TEXT}>
          {chars.map((ch, i) => (
            <span
              // Stable per-glyph key — index suffix prevents
              // collisions when the same letter repeats (e.g. two
              // `i` or `s`).
              key={`${ch}-${i}`}
              className={styles.charMask}
              aria-hidden="true"
            >
              <span className={styles.char}>
                <span className={styles.charOg}>{ch}</span>
                <span className={styles.charDup}>{ch}</span>
              </span>
            </span>
          ))}
        </p>
      </div>
      {/* Layer 4: reveal frame. `.cutout` is the transparent
          window; its enormous box-shadow paints the dark frame
          on every side. Animating the cutout's width / height
          drives both the rect→circle morph (phase 2) and the
          scale-out wipe (phase 3). */}
      <div className={styles.reveal}>
        <div className={styles.cutout} />
      </div>
    </div>
  );
}
