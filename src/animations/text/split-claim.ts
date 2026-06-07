import { splitWords } from "./split-words";

/** Footer claim — each word is a segment for GSAP stagger; optional break after a run. */
export type ClaimWordSegment = Readonly<{
  word: string;
  key: string;
  group: "strong" | "muted";
  lineBreakAfter?: boolean;
}>;

export type ClaimRun = Readonly<{
  text: string;
  group: "strong" | "muted";
  breakAfter?: boolean;
}>;

/** Ordered runs (any mix of strong/muted) → flat word segments. */
export function splitClaimRuns(
  keyPrefix: string,
  runs: ReadonlyArray<ClaimRun>,
): ReadonlyArray<ClaimWordSegment> {
  const out: ClaimWordSegment[] = [];
  runs.forEach((run, runIdx) => {
    const words = splitWords(run.text, `${keyPrefix}-r${runIdx}`);
    words.forEach((w, wi, arr) => {
      out.push({
        ...w,
        group: run.group,
        lineBreakAfter: Boolean(run.breakAfter && wi === arr.length - 1),
      });
    });
  });
  return out;
}
