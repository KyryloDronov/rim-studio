export type ProcessStepId =
  | "diagnostics"
  | "agreement"
  | "restoration"
  | "delivery";

/** Step photos in `/public/img/how_work/`. */
export const PROCESS_STEP_IMAGES: Readonly<Record<ProcessStepId, string>> = {
  diagnostics: "/img/how_work/1.jpeg",
  agreement: "/img/how_work/2.jpeg",
  restoration: "/img/how_work/3.jpeg",
  delivery: "/img/how_work/4.jpeg",
};

export const PROCESS_STEP_ORDER: ReadonlyArray<ProcessStepId> = [
  "diagnostics",
  "agreement",
  "restoration",
  "delivery",
];

export function getProcessStepImage(stepId: string): string {
  if (stepId in PROCESS_STEP_IMAGES) {
    return PROCESS_STEP_IMAGES[stepId as ProcessStepId];
  }
  return PROCESS_STEP_IMAGES.diagnostics;
}
