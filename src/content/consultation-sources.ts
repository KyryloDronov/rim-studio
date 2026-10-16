import type { PageServiceKey } from "@/content/site-pages";

/** Where the lead came from — used in Telegram for managers. */
export type ConsultationSourceId =
  | "home"
  | PageServiceKey
  | "benefits"
  | "process"
  | "about"
  | "beforeAfter"
  | "firstVisitPromo"
  | "visitMap"
  | "contactSheet"
  | "contactPage";

export const CONSULTATION_SOURCE_IDS: ReadonlyArray<ConsultationSourceId> = [
  "home",
  "wheelPainting",
  "wheelRepair",
  "diamondCutting",
  "tireMounting",
  "caliperPainting",
  "motorcycleWheelPainting",
  "tigWelding",
  "benefits",
  "process",
  "about",
  "beforeAfter",
  "firstVisitPromo",
  "visitMap",
  "contactSheet",
  "contactPage",
];

const PHONE_ONLY_CONSULTATION_SOURCES: ReadonlySet<ConsultationSourceId> =
  new Set(["firstVisitPromo", "visitMap", "contactSheet"]);

export function isPhoneOnlyConsultationSource(
  source: ConsultationSourceId,
): boolean {
  return PHONE_ONLY_CONSULTATION_SOURCES.has(source);
}

export function isConsultationSourceId(
  value: string,
): value is ConsultationSourceId {
  return (CONSULTATION_SOURCE_IDS as ReadonlyArray<string>).includes(value);
}
