import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { BEFORE_AFTER_SCROLL } from "@/animations/constants";
import type { BeforeAfterRevealClassNames } from "@/animations/types";

export function setBeforeAfterRevealReducedMotion(
  classes: BeforeAfterRevealClassNames,
): void {
  gsap.set(`.${classes.compareReveal}`, { y: 0, scale: 1, autoAlpha: 1 });
  gsap.set(`.${classes.thumbReveal}`, { y: 0, scale: 1, autoAlpha: 1 });
  gsap.set(`.${classes.controlsReveal}`, { y: 0, autoAlpha: 1 });
  gsap.set(`.${classes.bookingReveal}`, { x: 0, y: 0, scale: 1, autoAlpha: 1 });
}

/**
 * Before/after section — one-shot scroll reveal:
 * compare block → thumbnail strip → nav → booking card.
 * Does not reverse when scrolling away.
 */
export function runBeforeAfterScrollReveal(
  triggerEl: HTMLElement,
  classes: BeforeAfterRevealClassNames,
  prefersReducedMotion: boolean,
): void {
  if (prefersReducedMotion) {
    setBeforeAfterRevealReducedMotion(classes);
    return;
  }

  const ba = BEFORE_AFTER_SCROLL;
  const compare = triggerEl.querySelector<HTMLElement>(`.${classes.compareReveal}`);
  const thumbs = triggerEl.querySelectorAll<HTMLElement>(`.${classes.thumbReveal}`);
  const controls = triggerEl.querySelector<HTMLElement>(`.${classes.controlsReveal}`);
  const booking = triggerEl.querySelector<HTMLElement>(`.${classes.bookingReveal}`);

  if (compare) {
    gsap.set(compare, {
      y: ba.compare.yFrom,
      scale: ba.compare.scaleFrom,
      autoAlpha: 0,
    });
  }

  if (thumbs.length) {
    gsap.set(thumbs, {
      y: ba.thumbs.yFrom,
      scale: ba.thumbs.scaleFrom,
      autoAlpha: 0,
    });
  }

  if (controls) {
    gsap.set(controls, {
      y: ba.controls.yFrom,
      autoAlpha: 0,
    });
  }

  if (booking) {
    gsap.set(booking, {
      x: ba.booking.xFrom,
      y: ba.booking.yFrom,
      scale: ba.booking.scaleFrom,
      autoAlpha: 0,
    });
  }

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: ba.defaultsEase },
  });

  if (compare) {
    tl.to(compare, {
      y: 0,
      scale: 1,
      autoAlpha: 1,
      duration: ba.compare.duration,
    });
  }

  if (thumbs.length) {
    tl.to(
      thumbs,
      {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: ba.thumbs.duration,
        stagger: {
          each: ba.thumbs.stagger,
          from: "center",
        },
      },
      compare ? `-=${ba.thumbs.overlapCompare}` : 0,
    );
  }

  if (controls) {
    tl.to(
      controls,
      {
        y: 0,
        autoAlpha: 1,
        duration: ba.controls.duration,
      },
      thumbs.length ? `-=${ba.controls.overlapThumbs}` : ">",
    );
  }

  if (booking) {
    tl.to(
      booking,
      {
        x: 0,
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: ba.booking.duration,
      },
      controls || thumbs.length ? `-=${ba.booking.overlapPrev}` : ">",
    );
  }

  let played = false;

  ScrollTrigger.create({
    trigger: triggerEl,
    start: ba.triggerStart,
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
