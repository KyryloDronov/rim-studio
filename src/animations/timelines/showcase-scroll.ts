import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SHOWCASE_SCROLL } from "@/animations/constants";
import type { ShowcaseRevealClassNames } from "@/animations/types";

/** `prefers-reduced-motion`: snap showcase cards and nav to their rest state. */
export function setShowcaseRevealReducedMotion(
  classes: ShowcaseRevealClassNames,
): void {
  gsap.set(`.${classes.cardReveal}`, { x: 0, autoAlpha: 1 });
  gsap.set(`.${classes.controlsReveal}`, { x: 0, autoAlpha: 1 });
}

/**
 * Run inside `gsap.context(fn, root)` from `<ShowcaseSection>`.
 * Enter: cards (stagger R→L), then nav pills. Exit on reverse: nav first, then cards.
 */
export function runShowcaseScrollReveal(
  triggerEl: HTMLElement,
  classes: ShowcaseRevealClassNames,
  prefersReducedMotion: boolean,
): void {
  if (prefersReducedMotion) {
    setShowcaseRevealReducedMotion(classes);
    return;
  }

  const sc = SHOWCASE_SCROLL;
  const cards = triggerEl.querySelectorAll<HTMLElement>(
    `.${classes.cardReveal}`,
  );
  const controls = triggerEl.querySelector<HTMLElement>(
    `.${classes.controlsReveal}`,
  );
  if (!cards.length) return;

  const cardTrigger = cards[0];

  gsap.set(cards, {
    x: sc.cards.xFrom,
    autoAlpha: 0,
  });

  if (controls) {
    gsap.set(controls, {
      x: sc.nav.xFrom,
      autoAlpha: 0,
    });
  }

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: sc.defaultsEase },
  });

  tl.to(cards, {
    x: 0,
    autoAlpha: 1,
    duration: sc.cards.duration,
    stagger: {
      each: sc.cards.stagger,
      from: "end",
    },
  });

  if (controls) {
    tl.to(
      controls,
      {
        x: 0,
        autoAlpha: 1,
        duration: sc.nav.duration,
      },
      ">",
    );
  }

  ScrollTrigger.create({
    trigger: cardTrigger,
    start: sc.triggerStart,
    end: sc.triggerEnd,
    invalidateOnRefresh: true,
    onEnter: () => {
      tl.play();
    },
    onLeave: () => {
      tl.reverse();
    },
    onEnterBack: () => {
      tl.play();
    },
    onLeaveBack: () => {
      tl.reverse();
    },
  });

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}
