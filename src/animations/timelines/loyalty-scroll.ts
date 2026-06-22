import gsap from "gsap";

import { LOYALTY_SCROLL, WORD_BLUR_REVEAL } from "@/animations/constants";
import type { LoyaltyRevealClassNames } from "@/animations/types";

export type LoyaltyScrollRevealHooks = Readonly<{
  /** When the block re-enters view — collapse icon-first pill before replay. */
  onScrollEnter?: () => void;
  /** After the CTA wrapper finishes — expand icon-first pill label. */
  onAfterCtaReveal?: () => void;
  /** When scrolling back above the trigger — reset pill to icon-only. */
  onScrollLeaveBack?: () => void;
}>;

export function setLoyaltyRevealReducedMotion(
  classes: LoyaltyRevealClassNames,
): void {
  const c = classes;
  gsap.set(`.${c.revealEyebrow}`, { autoAlpha: 1, y: 0 });
  gsap.set(`.${c.claimWord}`, {
    filter: "blur(0px)",
    x: 0,
    autoAlpha: 1,
  });
  gsap.set(`.${c.bodyChar}`, {
    filter: "blur(0px)",
    x: 0,
    autoAlpha: 1,
  });
  gsap.set(`.${c.ctaItem}`, { y: 0, autoAlpha: 1 });
  gsap.set(`.${c.secondaryChar}`, {
    filter: "blur(0px)",
    x: 0,
    autoAlpha: 1,
  });
  gsap.set(`.${c.secondaryUnderline}`, { scaleX: 1, autoAlpha: 1 });
}

export function runLoyaltyScrollReveal(
  triggerEl: HTMLElement,
  classes: LoyaltyRevealClassNames,
  prefersReducedMotion: boolean,
  hooks?: LoyaltyScrollRevealHooks,
): void {
  if (prefersReducedMotion) {
    setLoyaltyRevealReducedMotion(classes);
    return;
  }

  const c = classes;
  const ls = LOYALTY_SCROLL;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerEl,
      start: ls.triggerStart,
      toggleActions: "play none none reverse",
      onEnter: () => hooks?.onScrollEnter?.(),
      onLeaveBack: () => hooks?.onScrollLeaveBack?.(),
    },
    defaults: { ease: ls.defaultsEase },
  });

  tl.to(`.${c.revealEyebrow}`, {
    autoAlpha: 1,
    y: 0,
    duration: ls.eyebrow.duration,
  });

  tl.to(
    `.${c.claimWord}`,
    {
      filter: "blur(0px)",
      x: 0,
      autoAlpha: 1,
      duration: WORD_BLUR_REVEAL.duration,
      stagger: WORD_BLUR_REVEAL.stagger,
      ease: WORD_BLUR_REVEAL.ease,
    },
    `-=${ls.claim.overlapEyebrow}`,
  );

  tl.to(
    `.${c.bodyChar}`,
    {
      filter: "blur(0px)",
      x: 0,
      autoAlpha: 1,
      duration: ls.bodyLetters.duration,
      stagger: ls.bodyLetters.stagger,
      ease: WORD_BLUR_REVEAL.ease,
    },
    `-=${ls.bodyLetters.overlapClaim}`,
  );

  tl.to(
    `.${c.ctaItem}`,
    {
      y: 0,
      autoAlpha: 1,
      duration: ls.cta.duration,
      ease: ls.cta.ease,
    },
    `-=${ls.cta.overlapBody}`,
  );

  if (hooks?.onAfterCtaReveal) {
    tl.call(hooks.onAfterCtaReveal);
  }

  tl.to(
    `.${c.secondaryChar}`,
    {
      filter: "blur(0px)",
      x: 0,
      autoAlpha: 1,
      duration: ls.secondaryLetters.duration,
      stagger: ls.secondaryLetters.stagger,
      ease: WORD_BLUR_REVEAL.ease,
    },
    `-=${ls.secondaryLetters.overlapCta}`,
  );

  tl.to(
    `.${c.secondaryUnderline}`,
    {
      scaleX: 1,
      autoAlpha: 1,
      duration: 0.72,
      ease: "none",
    },
    `<`,
  );
}
