import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FAQ_SCROLL } from "@/animations/constants";
import type { FaqRevealClassNames } from "@/animations/types";

export function setFaqRevealReducedMotion(classes: FaqRevealClassNames): void {
  if (classes.headerReveal) {
    gsap.set(`.${classes.headerReveal}`, { y: 0, autoAlpha: 1 });
  }
  gsap.set(`.${classes.itemReveal}`, { y: 0, autoAlpha: 1 });
}

export function runFaqScrollReveal(
  triggerEl: HTMLElement,
  classes: FaqRevealClassNames,
  prefersReducedMotion: boolean,
): void {
  if (prefersReducedMotion) {
    setFaqRevealReducedMotion(classes);
    return;
  }

  const faq = FAQ_SCROLL;
  const header = classes.headerReveal
    ? triggerEl.querySelector<HTMLElement>(`.${classes.headerReveal}`)
    : null;
  const items = triggerEl.querySelectorAll<HTMLElement>(`.${classes.itemReveal}`);

  if (header) {
    gsap.set(header, { y: faq.header.yFrom, autoAlpha: 0 });
  }

  if (items.length) {
    gsap.set(items, { y: faq.items.yFrom, autoAlpha: 0 });
  }

  if (!header && !items.length) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerEl,
      start: faq.triggerStart,
      once: true,
    },
    defaults: { ease: faq.defaultsEase },
  });

  if (header) {
    tl.to(header, {
      y: 0,
      autoAlpha: 1,
      duration: faq.header.duration,
    });
  }

  if (items.length) {
    tl.to(
      items,
      {
        y: 0,
        autoAlpha: 1,
        duration: faq.items.duration,
        stagger: faq.items.stagger,
      },
      header ? `-=${faq.items.overlapHeader}` : 0,
    );
  }
}
