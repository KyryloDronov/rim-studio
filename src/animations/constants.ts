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

/** Loyalty program — left column word reveal on scroll. */
export const LOYALTY_SCROLL = {
  triggerStart: "top 78%",
  defaultsEase: EASE.punchy,
  eyebrow: { duration: 0.62, yFrom: 16 },
  claim: { overlapEyebrow: 0.28 },
  bodyLetters: {
    duration: 0.58,
    stagger: 0.011,
    overlapClaim: 0.32,
  },
  cta: {
    duration: 0.68,
    overlapBody: 0.18,
    ease: EASE.punchy,
  },
  secondaryLetters: {
    duration: 0.52,
    stagger: 0.013,
    overlapCta: 0.12,
  },
} as const;

/** Benefits hub — title, center video card, side card stagger on scroll. */
export const BENEFITS_SCROLL = {
  triggerStart: "top 78%",
  defaultsEase: EASE.punchy,
  title: {
    yFrom: 28,
    duration: 0.72,
  },
  center: {
    yFrom: 36,
    scaleFrom: 0.97,
    duration: 0.82,
    overlapTitle: 0.42,
  },
  cardsLeft: {
    xFrom: -32,
    yFrom: 24,
    duration: 0.68,
    stagger: 0.08,
    overlapCenter: 0.52,
  },
  cardsRight: {
    xFrom: 32,
    yFrom: 24,
    duration: 0.68,
    stagger: 0.08,
    overlapCenter: 0.52,
  },
} as const;

/** Before/after — compare, thumbs, booking card; one-shot on scroll. */
export const BEFORE_AFTER_SCROLL = {
  triggerStart: "top 78%",
  defaultsEase: EASE.punchy,
  compare: {
    yFrom: 28,
    scaleFrom: 0.96,
    duration: 0.85,
  },
  thumbs: {
    yFrom: 12,
    scaleFrom: 0.88,
    duration: 0.52,
    stagger: 0.042,
    overlapCompare: 0.28,
  },
  controls: {
    yFrom: 10,
    duration: 0.42,
    overlapThumbs: 0.18,
  },
  booking: {
    xFrom: 36,
    yFrom: 18,
    scaleFrom: 0.97,
    duration: 0.78,
    overlapPrev: 0.12,
  },
} as const;

/** Testimonials — blur dissolve in place; exit 2× faster than enter. */
export const TESTIMONIAL_QUOTE = {
  enter: {
    duration: 0.62,
    stagger: 0.024,
    ease: EASE.narrative,
    blur: 18,
    scale: 1.12,
  },
  exit: {
    duration: 0.19,
    stagger: 0.005,
    ease: "power2.in" as const,
    metaDuration: 0.16,
    blur: 14,
    scale: 0.88,
  },
  meta: {
    duration: 0.62,
    overlap: 0.42,
    ease: EASE.punchy,
    y: 14,
  },
} as const;
