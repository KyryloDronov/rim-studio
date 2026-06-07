/**
 * Shared animation contracts — timings stay in `constants.ts`;
 * structural types live here for reuse across Hero, Footer, etc.
 */

/** One segment from `splitWords` — stable key for React lists + GSAP stability. */
export type WordSegment = Readonly<{
  word: string;
  key: string;
}>;

/**
 * CSS-module class names the Hero intro timeline needs to query scoped nodes.
 * Passed from the component so hashed classes stay correct.
 */
export type HeroIntroClassNames = Readonly<{
  word: string;
  ctaItem: string;
  trustItem: string;
}>;

/** Benefits grid scroll-reveal class names passed from `<BenefitsSection>`. */
export type BenefitsRevealClassNames = Readonly<{
  revealTitle: string;
  revealCard: string;
}>;

/** Footer scroll-reveal class names (CSS modules) passed from `<Footer>`. */
export type FooterRevealClassNames = Readonly<{
  revealAlpha: string;
  revealLine: string;
  revealLink: string;
  claimWord: string;
}>;

/** Element refs the footer timeline wires for column link staggers. */
export type FooterScrollRefs = Readonly<{
  topEl: HTMLElement | null;
  bottomEl: HTMLElement | null;
  studioLinks: HTMLDivElement | null;
  serviceLinks: HTMLDivElement | null;
  legalLinks: HTMLDivElement | null;
}>;

/** Showcase scroll-reveal class names (CSS modules) passed from `<ShowcaseSection>`. */
export type ShowcaseRevealClassNames = Readonly<{
  cardReveal: string;
  controlsReveal: string;
}>;

/** Resolved DOM buckets for one hero intro run (single query pass). */
export type HeroIntroElements = Readonly<{
  titleWords: NodeListOf<HTMLElement>;
  ledeWords: NodeListOf<HTMLElement>;
  ctaItems: NodeListOf<HTMLElement>;
  trustItems: NodeListOf<HTMLElement>;
  recentCardShells: NodeListOf<HTMLElement>;
  recentEyebrow: HTMLElement | null;
  scrollReveal: HTMLElement | null;
}>;
