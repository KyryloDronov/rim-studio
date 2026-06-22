import gsap from "gsap";
import { TESTIMONIAL_QUOTE } from "@/animations/constants";

function queryChars(quoteEl: HTMLElement, charSelector: string) {
  return quoteEl.querySelectorAll<HTMLElement>(charSelector);
}

export function runTestimonialQuoteExit(
  quoteEl: HTMLElement,
  charSelector: string,
  metaEl: HTMLElement | null,
  reducedMotion: boolean,
): gsap.core.Timeline {
  const chars = queryChars(quoteEl, charSelector);
  const tl = gsap.timeline({ defaults: { ease: TESTIMONIAL_QUOTE.exit.ease } });

  if (reducedMotion) {
    gsap.set(chars, { clearProps: "all", opacity: 0, visibility: "hidden" });
    if (metaEl) gsap.set(metaEl, { clearProps: "all", opacity: 0 });
    return tl;
  }

  if (metaEl) {
    tl.to(
      metaEl,
      {
        opacity: 0,
        y: TESTIMONIAL_QUOTE.meta.y * 0.45,
        filter: "blur(6px)",
        duration: TESTIMONIAL_QUOTE.exit.metaDuration,
      },
      0,
    );
  }

  tl.to(
    chars,
    {
      opacity: 0,
      scale: TESTIMONIAL_QUOTE.exit.scale,
      filter: `blur(${TESTIMONIAL_QUOTE.exit.blur}px)`,
      duration: TESTIMONIAL_QUOTE.exit.duration,
      stagger: {
        each: TESTIMONIAL_QUOTE.exit.stagger,
        from: "end",
      },
    },
    0,
  );

  return tl;
}

export function runTestimonialQuoteReveal(
  quoteEl: HTMLElement,
  charSelector: string,
  metaEl: HTMLElement | null,
  reducedMotion: boolean,
): gsap.core.Timeline {
  const chars = queryChars(quoteEl, charSelector);
  const tl = gsap.timeline({ defaults: { ease: TESTIMONIAL_QUOTE.enter.ease } });

  if (reducedMotion) {
    gsap.set(chars, { clearProps: "all", opacity: 1, scale: 1, filter: "none" });
    if (metaEl) gsap.set(metaEl, { clearProps: "all", opacity: 1, y: 0, filter: "none" });
    return tl;
  }

  gsap.set(chars, {
    opacity: 0,
    scale: TESTIMONIAL_QUOTE.enter.scale,
    filter: `blur(${TESTIMONIAL_QUOTE.enter.blur}px)`,
    visibility: "visible",
  });

  if (metaEl) {
    gsap.set(metaEl, {
      opacity: 0,
      y: TESTIMONIAL_QUOTE.meta.y,
      filter: "blur(8px)",
      visibility: "visible",
    });
  }

  tl.to(chars, {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    duration: TESTIMONIAL_QUOTE.enter.duration,
    stagger: TESTIMONIAL_QUOTE.enter.stagger,
  });

  if (metaEl) {
    tl.to(
      metaEl,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: TESTIMONIAL_QUOTE.meta.duration,
        ease: TESTIMONIAL_QUOTE.meta.ease,
      },
      `-=${TESTIMONIAL_QUOTE.meta.overlap}`,
    );
  }

  return tl;
}

export function resetTestimonialQuote(
  quoteEl: HTMLElement,
  charSelector: string,
  metaEl: HTMLElement | null,
): void {
  const chars = queryChars(quoteEl, charSelector);
  gsap.killTweensOf([...chars, metaEl].filter(Boolean));
  gsap.set(chars, {
    opacity: 0,
    scale: TESTIMONIAL_QUOTE.enter.scale,
    filter: `blur(${TESTIMONIAL_QUOTE.enter.blur}px)`,
    visibility: "hidden",
  });
  if (metaEl) {
    gsap.set(metaEl, {
      opacity: 0,
      y: TESTIMONIAL_QUOTE.meta.y,
      filter: "blur(8px)",
      visibility: "hidden",
    });
  }
}
