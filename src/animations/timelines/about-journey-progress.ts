import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ABOUT_JOURNEY } from "@/animations/constants";

export type AboutJourneyProgressRefs = Readonly<{
  root: HTMLElement;
  fill: HTMLElement;
  milestones: ReadonlyArray<HTMLElement>;
}>;

export function runAboutJourneyProgress(
  refs: AboutJourneyProgressRefs,
  prefersReducedMotion: boolean,
): (() => void) | undefined {
  const { root, fill, milestones } = refs;
  if (!root || !fill || milestones.length === 0) return undefined;

  const count = milestones.length;

  const applyProgress = (progress: number) => {
    const p = Math.min(1, Math.max(0, progress));
    gsap.set(fill, { scaleX: p });

    milestones.forEach((node, index) => {
      const dotAt = index / count;
      const reached = p >= dotAt - 0.015;
      node.dataset.reached = reached ? "true" : "false";
    });
  };

  if (prefersReducedMotion) {
    applyProgress(1);
    return undefined;
  }

  gsap.set(fill, { scaleX: 0, transformOrigin: "0% 50%" });
  milestones.forEach((node) => {
    node.dataset.reached = "false";
  });

  const progress = { value: 0 };

  const tl = gsap.timeline({ paused: true });
  tl.to(
    progress,
    {
      value: 1,
      duration: ABOUT_JOURNEY.duration,
      ease: ABOUT_JOURNEY.ease,
      onUpdate: () => applyProgress(progress.value),
    },
    0,
  );

  const trigger = ScrollTrigger.create({
    trigger: root,
    start: ABOUT_JOURNEY.triggerStart,
    once: true,
    onEnter: () => tl.play(),
  });

  return () => {
    trigger.kill();
    tl.kill();
  };
}
