import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CATEGORIES_MASONRY_SCROLL } from "@/animations/constants";
import type { CategoriesMasonryRevealClassNames } from "@/animations/types";

export function setCategoriesMasonryRevealReducedMotion(
  classes: CategoriesMasonryRevealClassNames,
): void {
  gsap.set(`.${classes.titleReveal}`, { y: 0, autoAlpha: 1 });
  gsap.set(`.${classes.cardReveal}`, { y: 0, scale: 1, autoAlpha: 1 });
  gsap.set(`.${classes.controlsReveal}`, { x: 0, autoAlpha: 1 });
}

/** Run inside `gsap.context(fn, root)` from `<ServiceCategoriesMasonry>`. */
export function runCategoriesMasonryScrollReveal(
  triggerEl: HTMLElement,
  classes: CategoriesMasonryRevealClassNames,
  prefersReducedMotion: boolean,
): void {
  if (prefersReducedMotion) {
    setCategoriesMasonryRevealReducedMotion(classes);
    return;
  }

  const cm = CATEGORIES_MASONRY_SCROLL;
  const cards = triggerEl.querySelectorAll<HTMLElement>(
    `.${classes.cardReveal}`,
  );
  const controls = triggerEl.querySelector<HTMLElement>(
    `.${classes.controlsReveal}`,
  );
  const title = triggerEl.parentElement?.querySelector<HTMLElement>(
    `.${classes.titleReveal}`,
  );

  if (title) {
    gsap.set(title, { y: cm.title.yFrom, autoAlpha: 0 });
  }

  if (cards.length) {
    gsap.set(cards, {
      y: cm.cards.yFrom,
      scale: cm.cards.scaleFrom,
      autoAlpha: 0,
    });
  }

  if (controls) {
    gsap.set(controls, {
      x: cm.nav.xFrom,
      autoAlpha: 0,
    });
  }

  if (!title && !cards.length) return;

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: cm.defaultsEase },
  });

  if (title) {
    tl.to(title, {
      y: 0,
      autoAlpha: 1,
      duration: cm.title.duration,
    });
  }

  if (cards.length) {
    tl.to(
      cards,
      {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: cm.cards.duration,
        stagger: cm.cards.stagger,
      },
      title ? `-=${cm.cards.overlapTitle}` : 0,
    );
  }

  if (controls) {
    tl.to(
      controls,
      {
        x: 0,
        autoAlpha: 1,
        duration: cm.nav.duration,
      },
      cards.length ? `-=${cm.nav.overlapCards}` : 0,
    );
  }

  let played = false;

  ScrollTrigger.create({
    trigger: triggerEl,
    start: cm.triggerStart,
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
