/**
 * Animation layer — timings, text helpers, and GSAP timelines reused by UI.
 * Import `@/animations/register` once from the client shell so ScrollTrigger
 * is registered before any scroll-linked timelines run.
 */

export { FOOTER_CLAIM, FOOTER_SCROLL, HERO_INTRO, SHOWCASE_SCROLL, BENEFITS_SCROLL, WORD_BLUR_REVEAL, EASE } from "./constants";
export type {
  BenefitsRevealClassNames,
  FooterRevealClassNames,
  FooterScrollRefs,
  HeroIntroClassNames,
  HeroIntroElements,
  ShowcaseRevealClassNames,
  WordSegment,
} from "./types";
export type { ClaimRun, ClaimWordSegment } from "./text/split-claim";
export { splitWords } from "./text/split-words";
export { splitClaimRuns } from "./text/split-claim";
export type { HeroIntroTimelineHooks } from "./timelines/hero-intro";
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
  runShowcaseScrollReveal,
  setShowcaseRevealReducedMotion,
} from "./timelines/showcase-scroll";
