import gsap from "gsap";

import { FOOTER_CLAIM, FOOTER_SCROLL } from "@/animations/constants";
import type {
  FooterRevealClassNames,
  FooterScrollRefs,
} from "@/animations/types";

/** `prefers-reduced-motion`: snap footer reveal targets to their rest state. */
export function setFooterRevealReducedMotion(
  classes: FooterRevealClassNames,
): void {
  const c = classes;
  gsap.set(`.${c.revealAlpha}`, { autoAlpha: 1 });
  gsap.set(`.${c.revealLine}`, { y: "0%", autoAlpha: 1 });
  gsap.set(`.${c.revealLink}`, { y: "0%", autoAlpha: 1 });
  gsap.set(`.${c.claimWord}`, {
    filter: "blur(0px)",
    x: 0,
    autoAlpha: 1,
  });
}

/**
 * Run inside `gsap.context(fn, root)` from `<Footer>` — ScrollTrigger scopes
 * to the footer subtree via context.
 */
export function runFooterScrollReveal(
  refs: FooterScrollRefs,
  classes: FooterRevealClassNames,
  prefersReducedMotion: boolean,
): void {
  if (prefersReducedMotion) {
    setFooterRevealReducedMotion(classes);
    return;
  }

  const c = classes;
  const fs = FOOTER_SCROLL;

  const { topEl, bottomEl, studioLinks, serviceLinks, legalLinks } = refs;

  if (topEl) {
    const topTl = gsap.timeline({
      scrollTrigger: {
        trigger: topEl,
        start: fs.top.triggerStart,
        toggleActions: "play none none reverse",
      },
      defaults: { ease: fs.top.defaultsEase },
    });

    topTl.to(`.${c.revealAlpha}`, {
      autoAlpha: 1,
      duration: fs.top.revealAlpha.duration,
      stagger: fs.top.revealAlpha.stagger,
    });

    topTl.to(
      `.${c.revealLine}`,
      {
        y: "0%",
        autoAlpha: 1,
        duration: fs.top.revealLine.duration,
        stagger: fs.top.revealLine.stagger,
      },
      `-=${fs.top.revealLine.overlapPrev}`,
    );

    const linkGroupRefs = [studioLinks, serviceLinks, legalLinks];
    for (let i = 0; i < linkGroupRefs.length; i++) {
      const ref = linkGroupRefs[i];
      if (!ref) continue;
      const linkEls = ref.querySelectorAll(`.${c.revealLink}`);
      topTl.to(
        linkEls,
        {
          y: "0%",
          autoAlpha: 1,
          duration: fs.top.linkGroups.duration,
          stagger: fs.top.linkGroups.stagger,
          delay: fs.top.linkGroups.columnDelays[i],
        },
        `-=${fs.top.linkGroups.overlapPrev}`,
      );
    }
  }

  if (bottomEl) {
    const bottomTl = gsap.timeline({
      scrollTrigger: {
        trigger: bottomEl,
        start: fs.bottom.triggerStart,
        toggleActions: "play none none reverse",
      },
      defaults: { ease: fs.bottom.defaultsEase },
    });

    bottomTl.to(`.${c.claimWord}`, {
      filter: "blur(0px)",
      x: 0,
      autoAlpha: 1,
      duration: FOOTER_CLAIM.duration,
      stagger: FOOTER_CLAIM.stagger,
      ease: FOOTER_CLAIM.ease,
    });
  }
}
