"use client";

import gsap from "gsap";
import Image from "next/image";
import { type RefObject, useEffect, useLayoutEffect, useRef } from "react";
import {
  TESTIMONIAL_PHONE_FRAME,
  TESTIMONIAL_SCREEN_FRAMES,
  getTestimonialScreenIndex,
} from "@/content/testimonial-screen-media";

import styles from "./style.module.css";

const MOUSE_DAMPING = 0.11;
const MAX_TILT_Y = 10;
const MAX_TILT_X = 3;
const MAX_SHIFT_X = 7;

type TestimonialPhoneVisualProps = Readonly<{
  displayIndex: number;
  reducedMotion: boolean;
  interactionRootRef?: RefObject<HTMLElement | null>;
}>;

function isDesktopParallax(): boolean {
  return globalThis.window?.matchMedia("(min-width: 900px)").matches ?? false;
}

export function TestimonialPhoneVisual({
  displayIndex,
  reducedMotion,
  interactionRootRef,
}: TestimonialPhoneVisualProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const screenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevScreenIndexRef = useRef(getTestimonialScreenIndex(displayIndex));
  const hasMountedRef = useRef(false);

  const screenIndex = getTestimonialScreenIndex(displayIndex);

  useEffect(() => {
    if (reducedMotion) return;

    const root = interactionRootRef?.current;
    const tilt = tiltRef.current;
    if (!root || !tilt) return;

    const pointer = { targetX: 0, targetY: 0, currentX: 0, currentY: 0, active: false };
    let frameId = 0;

    const onPointerMove = (event: PointerEvent) => {
      if (!isDesktopParallax()) return;

      const rect = root.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      pointer.targetX = Math.max(-0.5, Math.min(0.5, nx));
      pointer.targetY = Math.max(-0.5, Math.min(0.5, ny));
      pointer.active = true;
    };

    const resetTilt = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
      pointer.active = false;
    };

    const tick = () => {
      if (!isDesktopParallax()) {
        pointer.targetX = 0;
        pointer.targetY = 0;
        pointer.currentX = 0;
        pointer.currentY = 0;
        tilt.style.transform = "";
      } else {
        pointer.currentX += (pointer.targetX - pointer.currentX) * MOUSE_DAMPING;
        pointer.currentY += (pointer.targetY - pointer.currentY) * MOUSE_DAMPING;

        const rotateY = pointer.currentX * MAX_TILT_Y * 2;
        const rotateX = pointer.currentY * -MAX_TILT_X * 2;
        const shiftX = pointer.currentX * MAX_SHIFT_X * 2;

        if (
          Math.abs(pointer.currentX) < 0.001 &&
          Math.abs(pointer.currentY) < 0.001 &&
          !pointer.active
        ) {
          tilt.style.transform = "";
        } else {
          tilt.style.transform =
            `translate3d(${shiftX.toFixed(2)}px, 0, 0) rotateY(${rotateY.toFixed(2)}deg) rotateX(${rotateX.toFixed(2)}deg)`;
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", resetTilt);
    frameId = requestAnimationFrame(tick);

    return () => {
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", resetTilt);
      cancelAnimationFrame(frameId);
      tilt.style.transform = "";
    };
  }, [interactionRootRef, reducedMotion]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    if (reducedMotion) {
      gsap.set(stage, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stage,
        { y: "14%", opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stage,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, stage);

    return () => ctx.revert();
  }, [reducedMotion]);

  useLayoutEffect(() => {
    const prev = prevScreenIndexRef.current;
    const next = screenIndex;

    for (let i = 0; i < TESTIMONIAL_SCREEN_FRAMES.length; i++) {
      const el = screenRefs.current[i];
      if (!el) continue;

      if (reducedMotion) {
        gsap.set(el, {
          opacity: i === next ? 1 : 0,
          scale: 1,
          filter: "none",
        });
      }
    }

    if (reducedMotion) {
      prevScreenIndexRef.current = next;
      hasMountedRef.current = true;
      return;
    }

    if (!hasMountedRef.current) {
      for (let i = 0; i < TESTIMONIAL_SCREEN_FRAMES.length; i++) {
        const el = screenRefs.current[i];
        if (!el) continue;
        gsap.set(el, {
          opacity: i === next ? 1 : 0,
          scale: 1,
          filter: "blur(0px)",
        });
      }
      hasMountedRef.current = true;
      prevScreenIndexRef.current = next;
      return;
    }

    if (prev === next) {
      prevScreenIndexRef.current = next;
      return;
    }

    const outEl = screenRefs.current[prev];
    const inEl = screenRefs.current[next];
    if (!outEl || !inEl) return;

    const tl = gsap.timeline();
    tl.to(
      outEl,
      {
        opacity: 0,
        scale: 0.985,
        filter: "blur(8px)",
        duration: 0.32,
        ease: "power2.in",
      },
      0,
    );
    tl.fromTo(
      inEl,
      {
        opacity: 0,
        scale: 1.02,
        filter: "blur(12px)",
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.58,
        ease: "power2.out",
      },
      0.14,
    );

    prevScreenIndexRef.current = next;
  }, [reducedMotion, screenIndex]);

  return (
    <div ref={stageRef} className={styles.phoneStage} aria-hidden="true">
      <div ref={tiltRef} className={styles.phoneTilt}>
        <div className={styles.phoneScreens}>
          {TESTIMONIAL_SCREEN_FRAMES.map((src, index) => (
            <div
              key={src}
              ref={(el) => {
                screenRefs.current[index] = el;
              }}
              className={styles.phoneScreen}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 899px) 92vw, 42vw"
                className={styles.phoneScreenImg}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <Image
          src={TESTIMONIAL_PHONE_FRAME}
          alt=""
          fill
          sizes="(max-width: 899px) 92vw, 42vw"
          className={styles.phoneFrame}
          priority
        />
      </div>
    </div>
  );
}
