"use client";

import { useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { useCallback } from "react";

export function useScrollToSection() {
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();

  return useCallback(
    (sectionId: string) => {
      const target = document.getElementById(sectionId);
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(target, {
          duration: prefersReducedMotion ? 0 : 1.35,
          easing: (t: number) => 1 - (1 - t) ** 3,
        });
        return;
      }
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [lenis, prefersReducedMotion],
  );
}
