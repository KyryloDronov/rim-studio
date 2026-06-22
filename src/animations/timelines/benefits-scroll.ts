import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { BENEFITS_SCROLL } from "@/animations/constants";
import type { BenefitsRevealClassNames } from "@/animations/types";

export function setBenefitsRevealReducedMotion(
  classes: BenefitsRevealClassNames,
): void {
  gsap.set(`.${classes.revealTitle}`, { y: 0, x: 0, scale: 1, autoAlpha: 1 });
  gsap.set(`.${classes.revealCardLeft}`, { x: 0, y: 0, autoAlpha: 1 });
  gsap.set(`.${classes.revealCardRight}`, { x: 0, y: 0, autoAlpha: 1 });
  gsap.set(`.${classes.revealCenter}`, { y: 0, scale: 1, autoAlpha: 1 });
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
  const leftCards = triggerEl.querySelectorAll<HTMLElement>(
    `.${classes.revealCardLeft}`,
  );
  const rightCards = triggerEl.querySelectorAll<HTMLElement>(
    `.${classes.revealCardRight}`,
  );
  const center = triggerEl.querySelector<HTMLElement>(`.${classes.revealCenter}`);

  gsap.set(`.${classes.revealTitle}`, {
    y: bs.title.yFrom,
    autoAlpha: 0,
  });

  if (leftCards.length) {
    gsap.set(leftCards, {
      x: bs.cardsLeft.xFrom,
      y: bs.cardsLeft.yFrom,
      autoAlpha: 0,
    });
  }

  if (rightCards.length) {
    gsap.set(rightCards, {
      x: bs.cardsRight.xFrom,
      y: bs.cardsRight.yFrom,
      autoAlpha: 0,
    });
  }

  if (center) {
    gsap.set(center, {
      y: bs.center.yFrom,
      scale: bs.center.scaleFrom,
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

  if (center) {
    tl.to(
      center,
      {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: bs.center.duration,
      },
      `-=${bs.center.overlapTitle}`,
    );
  }

  if (leftCards.length) {
    tl.to(
      leftCards,
      {
        x: 0,
        y: 0,
        autoAlpha: 1,
        duration: bs.cardsLeft.duration,
        stagger: bs.cardsLeft.stagger,
      },
      `-=${bs.cardsLeft.overlapCenter}`,
    );
  }

  if (rightCards.length) {
    tl.to(
      rightCards,
      {
        x: 0,
        y: 0,
        autoAlpha: 1,
        duration: bs.cardsRight.duration,
        stagger: bs.cardsRight.stagger,
      },
      `-=${bs.cardsRight.overlapCenter}`,
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
