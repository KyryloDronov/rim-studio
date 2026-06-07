import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { BENEFITS_SCROLL } from "@/animations/constants";
import type { BenefitsRevealClassNames } from "@/animations/types";

export function setBenefitsRevealReducedMotion(
  classes: BenefitsRevealClassNames,
): void {
  gsap.set(`.${classes.revealTitle}`, { y: 0, autoAlpha: 1 });
  gsap.set(`.${classes.revealCard}`, { y: 0, autoAlpha: 1 });
}

/** Run inside `gsap.context(fn, root)` from `<BenefitsSection>`. */
export function runBenefitsScrollReveal(
  triggerEl: HTMLElement,
  classes: BenefitsRevealClassNames,
  prefersReducedMotion: boolean,
): void {
  if (prefersReducedMotion) {
    setBenefitsRevealReducedMotion(classes);
    return;
  }

  const bs = BENEFITS_SCROLL;
  const cards = triggerEl.querySelectorAll<HTMLElement>(`.${classes.revealCard}`);

  gsap.set(`.${classes.revealTitle}`, {
    y: bs.title.yFrom,
    autoAlpha: 0,
  });

  if (cards.length) {
    gsap.set(cards, {
      y: bs.cards.yFrom,
      autoAlpha: 0,
    });
  }

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: bs.defaultsEase },
  });

  tl.to(`.${classes.revealTitle}`, {
    y: 0,
    autoAlpha: 1,
    duration: bs.title.duration,
  });

  if (cards.length) {
    tl.to(
      cards,
      {
        y: 0,
        autoAlpha: 1,
        duration: bs.cards.duration,
        stagger: bs.cards.stagger,
      },
      `-=${bs.cards.overlapTitle}`,
    );
  }

  ScrollTrigger.create({
    trigger: triggerEl,
    start: bs.triggerStart,
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
