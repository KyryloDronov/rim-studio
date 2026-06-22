/**
 * Animation layer — timings, text helpers, and GSAP timelines reused by UI.
 * Import `@/animations/register` once from the client shell so ScrollTrigger
 * is registered before any scroll-linked timelines run.
 */

export { FOOTER_CLAIM, FOOTER_SCROLL, HERO_INTRO, LOYALTY_SCROLL, SHOWCASE_SCROLL, BENEFITS_SCROLL, BEFORE_AFTER_SCROLL, TESTIMONIAL_QUOTE, WORD_BLUR_REVEAL, EASE } from "./constants";
export type {
  BeforeAfterRevealClassNames,
  BenefitsRevealClassNames,
  FooterRevealClassNames,
  FooterScrollRefs,
  HeroIntroClassNames,
  HeroIntroElements,
  LoyaltyRevealClassNames,
  ShowcaseRevealClassNames,
  WordSegment,
} from "./types";
export type { ClaimRun, ClaimWordSegment } from "./text/split-claim";
export { splitWords } from "./text/split-words";
export { splitChars, splitQuoteSegments } from "./text/split-chars";
export type { QuoteTextSegment } from "./text/split-chars";
export { splitClaimRuns } from "./text/split-claim";
export type { HeroIntroTimelineHooks } from "./timelines/hero-intro";
export type { LoyaltyScrollRevealHooks } from "./timelines/loyalty-scroll";
export {
  createHeroIntroTimeline,
  queryHeroIntroElements,
  setHeroIntroReducedMotion,
} from "./timelines/hero-intro";
export {
  runBenefitsScrollReveal,
  setBenefitsRevealReducedMotion,
} from "./timelines/benefits-scroll";
export {
  runFooterScrollReveal,
  setFooterRevealReducedMotion,
} from "./timelines/footer-scroll";
export {
  runLoyaltyScrollReveal,
  setLoyaltyRevealReducedMotion,
} from "./timelines/loyalty-scroll";
export {
  runBeforeAfterScrollReveal,
  setBeforeAfterRevealReducedMotion,
} from "./timelines/before-after-scroll";
export {
  runShowcaseScrollReveal,
  setShowcaseRevealReducedMotion,
} from "./timelines/showcase-scroll";
export {
  resetTestimonialQuote,
  runTestimonialQuoteExit,
  runTestimonialQuoteReveal,
} from "./timelines/testimonial-quote";
