import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { BENEFITS_SCROLL } from "@/animations/constants";
import type { BenefitsRevealClassNames } from "@/animations/types";

export function setBenefitsRevealReducedMotion(
  scopeEl: HTMLElement,
  classes: BenefitsRevealClassNames,
): void {
  const title = scopeEl.querySelector<HTMLElement>(`.${classes.revealTitle}`);
  if (title) {
    gsap.set(title, { y: 0, x: 0, scale: 1, autoAlpha: 1 });
  }
  gsap.set(scopeEl.querySelectorAll(`.${classes.revealCardLeft}`), {
    x: 0,
    y: 0,
    autoAlpha: 1,
  });
  gsap.set(scopeEl.querySelectorAll(`.${classes.revealCardRight}`), {
    x: 0,
    y: 0,
    autoAlpha: 1,
  });
  gsap.set(scopeEl.querySelectorAll(`.${classes.revealCardMobile}`), {
    x: 0,
    y: 0,
    autoAlpha: 1,
  });
  gsap.set(scopeEl.querySelectorAll(`.${classes.revealCenter}`), {
    y: 0,
    scale: 1,
    autoAlpha: 1,
  });
}

/** Run inside `gsap.context(fn, root)` from `<BenefitsSection>`. */
export function runBenefitsScrollReveal(
  triggerEl: HTMLElement,
  classes: BenefitsRevealClassNames,
  prefersReducedMotion: boolean,
  scopeEl?: HTMLElement,
): void {
  const scope = scopeEl ?? triggerEl;
  if (prefersReducedMotion) {
    setBenefitsRevealReducedMotion(scope, classes);
    return;
  }

  const bs = BENEFITS_SCROLL;
  const title = scope.querySelector<HTMLElement>(`.${classes.revealTitle}`);
  const leftCards = triggerEl.querySelectorAll<HTMLElement>(
    `.${classes.revealCardLeft}`,
  );
  const rightCards = triggerEl.querySelectorAll<HTMLElement>(
    `.${classes.revealCardRight}`,
  );
  const mobileCards = triggerEl.querySelectorAll<HTMLElement>(
    `.${classes.revealCardMobile}`,
  );
  const center = triggerEl.querySelector<HTMLElement>(`.${classes.revealCenter}`);

  if (title) {
    gsap.set(title, {
      y: bs.title.yFrom,
      autoAlpha: 0,
    });
  }

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

  if (mobileCards.length) {
    gsap.set(mobileCards, {
      x: bs.cardsLeft.xFrom,
      y: bs.cardsLeft.yFrom,
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

  if (title) {
    tl.to(title, {
      y: 0,
      autoAlpha: 1,
      duration: bs.title.duration,
    });
  }

  if (center) {
    tl.to(
      center,
      {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: bs.center.duration,
      },
      title ? `-=${bs.center.overlapTitle}` : 0,
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

  if (mobileCards.length) {
    tl.to(
      mobileCards,
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

  let played = false;

  ScrollTrigger.create({
    trigger: triggerEl,
    start: bs.triggerStart,
    invalidateOnRefresh: true,
    onEnter: () => {
      if (played) return;
      played = true;
      tl.play();
    },
  });

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}
