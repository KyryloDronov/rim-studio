"use client";

import "@/animations/register";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import "lenis/dist/lenis.css";

type SmoothScrollProps = Readonly<{
  children: React.ReactNode;
}>;

/**
 * Smooth-scroll provider for the whole app.
 *
 * Why a custom RAF loop instead of `autoRaf: true`:
 *  - We hand the per-frame tick to GSAP's `ticker`, which is the same
 *    scheduler driving every animation in the app. One tick per frame
 *    instead of two avoids tearing/jitter and keeps ScrollTrigger in
 *    perfect sync with scroll position.
 *  - `gsap.ticker.lagSmoothing(0)` disables GSAP's built-in lag jump
 *    correction — without it, ScrollTrigger receives stale scroll
 *    deltas after a frame stall and snaps the page.
 *
 * Notes for the rest of the app:
 *  - Page anchors (`href="#…"`) and the Next.js router still work — the
 *    `data-scroll-behavior="smooth"` on `<html>` (set in root layout)
 *    tells Next.js to disable CSS smooth-scroll on route changes, and
 *    Lenis handles wheel/touch smoothing itself.
 *  - Inside an element that should NOT be smooth-scrolled (e.g. a
 *    locked modal or a scrollable inner panel), add the attribute
 *    `data-lenis-prevent` and Lenis will skip those wheel events.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => ScrollTrigger.update();
    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", onScroll);

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", onScroll);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}
