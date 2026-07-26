import gsap from "gsap";

import { EASE, HERO_INTRO } from "@/animations/constants";
import type { HeroIntroClassNames, HeroIntroElements } from "@/animations/types";

export type HeroIntroTimelineHooks = Readonly<{
  /** After CTA wrappers finish their staggered entrance. */
  onAfterCtaReveal?: () => void;
}>;

export function queryHeroIntroElements(
  root: HTMLElement,
  classes: HeroIntroClassNames,
): HeroIntroElements {
  return {
    titleWords: root.querySelectorAll<HTMLElement>(
      `[data-anim-group="title"] .${classes.word}`,
    ),
    ledeWords: root.querySelectorAll<HTMLElement>(
      `[data-anim-group="lede"] .${classes.word}`,
    ),
    serviceHighlightItems: root.querySelectorAll<HTMLElement>(
      `[data-anim-group="service-highlights"] .${classes.serviceRevealItem}`,
    ),
    ctaItems: root.querySelectorAll<HTMLElement>(
      `[data-anim-group="cta"] .${classes.ctaItem}`,
    ),
    ctaAsideItem: root.querySelector<HTMLElement>(
      `[data-anim-group="cta"] .${classes.ctaAsideItem}`,
    ),
    trustItems: root.querySelectorAll<HTMLElement>(
      `[data-anim-group="trust"] .${classes.trustItem}`,
    ),
    recentCardShells: root.querySelectorAll<HTMLElement>(
      `[data-anim-group="recent"] [data-hero-recent-card]`,
    ),
    recentEyebrow: root.querySelector<HTMLElement>(
      `[data-anim-group="recent"] [data-hero-recent-eyebrow]`,
    ),
    scrollReveal: root.querySelector<HTMLElement>(`[data-hero-scroll-hint]`),
  };
}

const trustRevealTween = {
  filter: "blur(0px)",
  y: 0,
  autoAlpha: 1,
} as const;

/** Snap everything to end state — `prefers-reduced-motion` path. */
export function setHeroIntroReducedMotion(el: HeroIntroElements): void {
  gsap.set([el.titleWords, el.ledeWords], {
    filter: "blur(0px)",
    x: 0,
    autoAlpha: 1,
  });
  if (el.serviceHighlightItems.length > 0) {
    gsap.set(el.serviceHighlightItems, trustRevealTween);
  }
  gsap.set(el.ctaItems, { y: 0, autoAlpha: 1 });
  if (el.ctaAsideItem) {
    gsap.set(el.ctaAsideItem, trustRevealTween);
  }
  if (el.trustItems.length > 0) {
    gsap.set(el.trustItems, trustRevealTween);
  }
  if (el.recentCardShells.length > 0) {
    gsap.set(el.recentCardShells, {
      filter: "blur(0px)",
      x: 0,
      autoAlpha: 1,
    });
  }
  if (el.recentEyebrow) {
    gsap.set(el.recentEyebrow, {
      filter: "blur(0px)",
      x: 0,
      autoAlpha: 1,
    });
  }
  if (el.scrollReveal) {
    gsap.set(el.scrollReveal, {
      filter: "blur(0px)",
      y: 0,
      autoAlpha: 1,
    });
  }
}

/**
 * Builds the hero entrance timeline. Caller wraps in `gsap.context(..., root)`
 * so selectors revert on unmount.
 *
 * `onAfterCtaReveal` runs after the CTA row tween completes (including stagger)
 * — use it to expand icon-first `<Button expandFromIcon>` labels in sync.
 */
export function createHeroIntroTimeline(
  el: HeroIntroElements,
  hooks?: HeroIntroTimelineHooks,
): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: EASE.narrative } });
  const hi = HERO_INTRO;

  tl.to(el.titleWords, {
    filter: "blur(0px)",
    x: 0,
    autoAlpha: 1,
    duration: hi.title.duration,
    stagger: hi.title.stagger,
  });

  tl.to(
    el.ledeWords,
    {
      filter: "blur(0px)",
      x: 0,
      autoAlpha: 1,
      duration: hi.lede.duration,
      stagger: hi.lede.stagger,
    },
    `-=${hi.lede.overlapPrev}`,
  );

  if (el.serviceHighlightItems.length > 0) {
    tl.to(
      el.serviceHighlightItems,
      {
        ...trustRevealTween,
        duration: hi.serviceHighlights.duration,
        stagger: hi.serviceHighlights.stagger,
        ease: hi.serviceHighlights.ease,
      },
      `-=${hi.serviceHighlights.overlapPrev}`,
    );
  }

  tl.to(
    el.ctaItems,
    {
      y: 0,
      autoAlpha: 1,
      duration: hi.cta.duration,
      stagger: hi.cta.stagger,
      ease: hi.cta.ease,
    },
    `-=${hi.cta.overlapPrev}`,
  );

  if (el.ctaAsideItem) {
    tl.to(
      el.ctaAsideItem,
      {
        ...trustRevealTween,
        duration: hi.serviceNotice.duration,
        ease: hi.serviceNotice.ease,
      },
      `-=${hi.serviceNotice.overlapPrev}`,
    );
  }

  if (hooks?.onAfterCtaReveal) {
    tl.call(hooks.onAfterCtaReveal);
  }

  if (el.trustItems.length > 0) {
    tl.to(
      el.trustItems,
      {
        ...trustRevealTween,
        duration: hi.trust.duration,
        stagger: hi.trust.stagger,
        ease: hi.trust.ease,
      },
      hi.trust.position,
    );
  }

  if (el.recentEyebrow) {
    tl.to(
      el.recentEyebrow,
      {
        filter: "blur(0px)",
        x: 0,
        autoAlpha: 1,
        duration: hi.recentEyebrow.duration,
        ease: hi.recentEyebrow.ease,
      },
      hi.recentEyebrow.position,
    );
  }

  if (el.recentCardShells.length > 0) {
    tl.to(
      el.recentCardShells,
      {
        filter: "blur(0px)",
        x: 0,
        autoAlpha: 1,
        duration: hi.recentCards.duration,
        stagger: hi.recentCards.stagger,
        ease: hi.recentCards.ease,
      },
      hi.recentCards.position,
    );
  }

  if (el.scrollReveal) {
    tl.to(
      el.scrollReveal,
      {
        filter: "blur(0px)",
        y: 0,
        autoAlpha: 1,
        duration: hi.scrollReveal.duration,
        ease: hi.scrollReveal.ease,
      },
      hi.scrollReveal.position,
    );
  }

  return tl;
}
