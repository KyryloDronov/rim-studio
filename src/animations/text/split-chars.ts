import type { CharSegment } from "@/animations/types";

export type QuoteTextSegment = Readonly<
  | { type: "space"; key: string }
  | { type: "chars"; key: string; chars: ReadonlyArray<CharSegment> }
>;

/**
 * Split copy into word chunks + normal spaces.
 * Keeps wrapping natural — pair with `<LetterRevealText>` so each word
 * uses `white-space: nowrap` and never breaks mid-glyph.
 */
export function splitQuoteSegments(
  text: string,
  keyPrefix: string,
): ReadonlyArray<QuoteTextSegment> {
  const normalized = text.replace(/\s+/g, " ").trim();
  const parts = normalized.split(/(\s)/).filter((part) => part.length > 0);

  return parts.map((part, index) => {
    if (part === " ") {
      return { type: "space", key: `${keyPrefix}-sp-${index}` };
    }
    return {
      type: "chars",
      key: `${keyPrefix}-w-${index}`,
      chars: Array.from(part).map((char, i) => ({
        char,
        key: `${keyPrefix}-w-${index}-${i}-${char}`,
      })),
    };
  });
}

/** @deprecated Prefer `splitQuoteSegments` for rendered quote copy. */
export function splitChars(
  text: string,
  keyPrefix: string,
): ReadonlyArray<CharSegment> {
  return Array.from(text).map((char, i) => ({
    char,
    key: `${keyPrefix}-${i}-${char}`,
  }));
}
