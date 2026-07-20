import type { CharSegment } from "@/animations/types";

export type QuoteTextSegment = Readonly<{
  type: "word";
  key: string;
  chars: ReadonlyArray<CharSegment>;
  /** Glued to the word end so line wraps never start with a stray space. */
  trailingSpace?: boolean;
}>;

/**
 * Split copy into word chunks for letter reveals.
 * Inter-word spaces are attached to the preceding word (not separate nodes)
 * so wrapped lines stay flush on the left.
 */
export function splitQuoteSegments(
  text: string,
  keyPrefix: string,
): ReadonlyArray<QuoteTextSegment> {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const words = normalized.split(" ");

  return words.map((word, index) => ({
    type: "word" as const,
    key: `${keyPrefix}-w-${index}`,
    trailingSpace: index < words.length - 1,
    chars: Array.from(word).map((char, i) => ({
      char,
      key: `${keyPrefix}-w-${index}-${i}-${char}`,
    })),
  }));
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
