import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ABOUT_SCROLL } from "@/animations/constants";
import type { AboutRevealClassNames } from "@/animations/types";

export function setAboutRevealReducedMotion(
  classes: AboutRevealClassNames,
): void {
  gsap.set(`.${classes.introReveal}`, { y: 0, autoAlpha: 1 });
  gsap.set(`.${classes.founderReveal}`, { y: 0, autoAlpha: 1 });
  gsap.set(`.${classes.approachReveal}`, { y: 0, autoAlpha: 1 });
  gsap.set(`.${classes.pillarReveal}`, { y: 0, autoAlpha: 1 });
  gsap.set(`.${classes.journeyReveal}`, { y: 0, autoAlpha: 1 });
}

/** Run inside `gsap.context(fn, root)` from `<AboutSection>`. */
export function runAboutScrollReveal(
  triggerEl: HTMLElement,
  classes: AboutRevealClassNames,
  prefersReducedMotion: boolean,
): void {
  if (prefersReducedMotion) {
    setAboutRevealReducedMotion(classes);
    return;
  }

  const ab = ABOUT_SCROLL;
  const intro = triggerEl.querySelector<HTMLElement>(`.${classes.introReveal}`);
  const founder = triggerEl.querySelector<HTMLElement>(
    `.${classes.founderReveal}`,
  );
  const approach = triggerEl.querySelector<HTMLElement>(
    `.${classes.approachReveal}`,
  );
  const pillars = triggerEl.querySelectorAll<HTMLElement>(
    `.${classes.pillarReveal}`,
  );
  const journey = triggerEl.querySelector<HTMLElement>(
    `.${classes.journeyReveal}`,
  );

  if (intro) gsap.set(intro, { y: ab.intro.yFrom, autoAlpha: 0 });
  if (founder) gsap.set(founder, { y: ab.founder.yFrom, autoAlpha: 0 });
  if (approach) gsap.set(approach, { y: ab.approach.yFrom, autoAlpha: 0 });
  if (pillars.length) gsap.set(pillars, { y: ab.pillars.yFrom, autoAlpha: 0 });
  if (journey) gsap.set(journey, { y: ab.journey.yFrom, autoAlpha: 0 });

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: ab.defaultsEase },
  });

  if (intro) {
    tl.to(intro, { y: 0, autoAlpha: 1, duration: ab.intro.duration });
  }

  if (founder) {
    tl.to(
      founder,
      { y: 0, autoAlpha: 1, duration: ab.founder.duration },
      intro ? `-=${ab.founder.overlapIntro}` : 0,
    );
  }

  if (approach) {
    tl.to(
      approach,
      { y: 0, autoAlpha: 1, duration: ab.approach.duration },
      founder ? `-=${ab.approach.overlapFounder}` : 0,
    );
  }

  if (pillars.length) {
    tl.to(
      pillars,
      {
        y: 0,
        autoAlpha: 1,
        duration: ab.pillars.duration,
        stagger: ab.pillars.stagger,
      },
      approach ? `-=${ab.pillars.overlapApproach}` : 0,
    );
  }

  if (journey) {
    tl.to(
      journey,
      { y: 0, autoAlpha: 1, duration: ab.journey.duration },
      pillars.length ? `-=${ab.journey.overlapPillars}` : 0,
    );
  }

  ScrollTrigger.create({
    trigger: triggerEl,
    start: ab.triggerStart,
    once: true,
    onEnter: () => tl.play(),
  });
}
