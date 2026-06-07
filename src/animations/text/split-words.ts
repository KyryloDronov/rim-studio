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
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word, i) => ({ word, key: `${keyPrefix}-${i}-${word}` }));
}
