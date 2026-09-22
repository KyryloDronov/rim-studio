export type ProcessStepId =
  | "consultation"
  | "work"
  | "payment"
  | "done";

/** Background art for expandable process cards (step `id` from i18n). */
export const PROCESS_STEP_IMAGES: Readonly<Record<ProcessStepId, string>> = {
  consultation: "/img/1-min.png.webp",
  work: "/img/categories/Wheel -painting.png",
  payment: "/img/2-min.png.webp",
  done: "/img/GoodWay_Gale_F7_1.png",
};

export function getProcessStepImage(stepId: string): string {
  if (stepId in PROCESS_STEP_IMAGES) {
    return PROCESS_STEP_IMAGES[stepId as ProcessStepId];
  }
  return PROCESS_STEP_IMAGES.consultation;
}
