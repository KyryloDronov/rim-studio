import type { WordSegment } from "@/animations/types";

/**
 * Split copy into word segments with stable React keys.
 * Use a unique `keyPrefix` per instance (e.g. `useId()`) so locale switches
 * don't recycle DOM nodes and cancel in-flight GSAP tweens.
 */
export function splitWords(
  text: string,
  keyPrefix: string,
): ReadonlyArray<WordSegment> {
  // Regular spaces only — `\u00a0` keeps accent phrases (e.g. «без переплаты») on one token.
  return text
    .split(/ +/)
    .filter((word) => word.length > 0)
    .map((word, i) => ({ word, key: `${keyPrefix}-${i}-${word}` }));
}
