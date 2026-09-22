import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PROCESS_SCROLL } from "@/animations/constants";
import type { ProcessRevealClassNames } from "@/animations/types";

export function setProcessRevealReducedMotion(
  classes: ProcessRevealClassNames,
): void {
  gsap.set(`.${classes.titleReveal}`, { y: 0, autoAlpha: 1 });
  gsap.set(`.${classes.cardReveal}`, { y: 0, autoAlpha: 1 });
  gsap.set(`.${classes.controlsReveal}`, { x: 0, autoAlpha: 1 });
}

/** Run inside `gsap.context(fn, root)` from `<ProcessSection>`. */
export function runProcessScrollReveal(
  triggerEl: HTMLElement,
  classes: ProcessRevealClassNames,
  prefersReducedMotion: boolean,
): void {
  if (prefersReducedMotion) {
    setProcessRevealReducedMotion(classes);
    return;
  }

  const ps = PROCESS_SCROLL;
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
    gsap.set(title, { y: ps.title.yFrom, autoAlpha: 0 });
  }

  if (cards.length) {
    gsap.set(cards, { y: ps.cards.yFrom, autoAlpha: 0 });
  }

  if (controls) {
    gsap.set(controls, { x: ps.nav.xFrom, autoAlpha: 0 });
  }

  if (!title && !cards.length) return;

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: ps.defaultsEase },
  });

  if (title) {
    tl.to(title, {
      y: 0,
      autoAlpha: 1,
      duration: ps.title.duration,
    });
  }

  if (cards.length) {
    tl.to(
      cards,
      {
        y: 0,
        autoAlpha: 1,
        duration: ps.cards.duration,
        stagger: ps.cards.stagger,
      },
      title ? `-=${ps.cards.overlapTitle}` : 0,
    );
  }

  if (controls) {
    tl.to(
      controls,
      {
        x: 0,
        autoAlpha: 1,
        duration: ps.nav.duration,
      },
      cards.length ? `-=${ps.nav.overlapCards}` : 0,
    );
  }

  let played = false;

  ScrollTrigger.create({
    trigger: triggerEl,
    start: ps.triggerStart,
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
