import type { QuoteTextSegment } from "@/animations";
import { Fragment } from "react";

import styles from "./style.module.css";

export type LetterRevealTextProps = Readonly<{
  segments: ReadonlyArray<QuoteTextSegment>;
  charClassName: string;
  /** Optional per-glyph class (e.g. muted quote marks in testimonials). */
  getCharClassName?: (char: string) => string | undefined;
  wordClassName?: string;
}>;

/**
 * Renders copy split via `splitQuoteSegments` — letter stagger targets
 * `charClassName`; words stay intact (`white-space: nowrap` per word).
 */
export function LetterRevealText({
  segments,
  charClassName,
  getCharClassName,
  wordClassName = styles.word,
}: LetterRevealTextProps) {
  return (
    <>
      {segments.map((segment) => (
        <Fragment key={segment.key}>
          <span className={wordClassName}>
            {segment.chars.map(({ char, key }) => {
              const extra = getCharClassName?.(char);
              const cls = extra ? `${charClassName} ${extra}` : charClassName;

              return (
                <span key={key} className={styles.charWrap}>
                  <span className={cls}>{char}</span>
                </span>
              );
            })}
          </span>
          {segment.trailingSpace ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
