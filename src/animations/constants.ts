/**
 * Central timing vocabulary — tweak once, keeps Hero/Footer visually related.
 * Easing strings match GSAP's declared literals.
 */

export const EASE = {
  narrative: "power2.out",
  punchy: "power3.out",
} as const;

/** Word-by-word blur + X slip (Hero title/lede, Footer claim). */
export const WORD_BLUR_REVEAL = {
  duration: 0.85,
  stagger: 0.06,
  ease: EASE.narrative,
} as const;

/** Hero section intro — numbers lifted from `Hero` GSAP timeline. */
export const HERO_INTRO = {
  title: { duration: 0.85, stagger: 0.06 },
  lede: {
    duration: 0.75,
    stagger: 0.04,
    overlapPrev: 0.4,
  },
  cta: {
    duration: 0.7,
    stagger: 0.08,
    overlapPrev: 0.35,
    ease: EASE.punchy,
  },
  trust: {
    duration: 0.72,
    stagger: 0.11,
    ease: EASE.punchy,
    position: ">" as const,
  },
  recentEyebrow: {
    duration: 0.62,
    ease: EASE.punchy,
    position: "<" as const,
  },
  recentCards: {
    duration: 0.62,
    stagger: 0.13,
    ease: EASE.punchy,
    position: "<" as const,
  },
  scrollReveal: {
    duration: 0.7,
    ease: EASE.punchy,
    position: ">" as const,
  },
} as const;

/** Footer claim block — matches historical Footer timeline. */
export const FOOTER_CLAIM = {
  duration: WORD_BLUR_REVEAL.duration,
  stagger: WORD_BLUR_REVEAL.stagger,
  ease: WORD_BLUR_REVEAL.ease,
} as const;

/** Footer scroll-triggered reveals (top band + bottom claim). */
export const FOOTER_SCROLL = {
  top: {
    triggerStart: "top 80%",
    defaultsEase: EASE.punchy,
    revealAlpha: { duration: 0.7, stagger: 0.05 },
    revealLine: {
      duration: 0.7,
      stagger: 0.08,
      overlapPrev: 0.4,
    },
    linkGroups: {
      duration: 0.55,
      stagger: 0.06,
      overlapPrev: 0.45,
      /** Per-column delay on the link stagger (studio → services → legal). */
      columnDelays: [0, 0.08, 0.16] as const,
    },
  },
  bottom: {
    triggerStart: "top 85%",
    defaultsEase: EASE.punchy,
  },
} as const;

/** Showcase carousel — scroll in/out tied to card geometry (ScrollTrigger syntax). */
export const SHOWCASE_SCROLL = {
  /** Viewport bottom crosses 33% height of the card — top third visible, then enter. */
  triggerStart: "33% bottom",
  /** Viewport top crosses vertical center of the card — exit on scroll down. */
  triggerEnd: "center top",
  defaultsEase: EASE.punchy,
  cards: {
    xFrom: 64,
    duration: 0.75,
    stagger: 0.1,
  },
  nav: {
    xFrom: 28,
    duration: 0.45,
    stagger: 0.07,
  },
} as const;

/** Benefits grid — dark section card stagger on scroll. */
export const BENEFITS_SCROLL = {
  triggerStart: "top 78%",
  defaultsEase: EASE.punchy,
  title: {
    yFrom: 28,
    duration: 0.72,
  },
  cards: {
    yFrom: 40,
    duration: 0.68,
    stagger: 0.07,
    overlapTitle: 0.38,
  },
} as const;
