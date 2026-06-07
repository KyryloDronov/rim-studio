"use client";

import { type CSSProperties, useMemo } from "react";
import styles from "./style.module.css";

/**
 * Decorative "mouse + dot" scroll hint, designed to sit at the bottom
 * of a banner-height section.
 *
 * Render-only, no scroll listeners on purpose: the animation is a
 * pure CSS keyframe loop, and the component disappears once the user
 * scrolls (handled by the parent if/when needed). Sizing and colour
 * are tokenised via CSS variables so callers can override them per
 * surface without forking the stylesheet.
 *
 * Defaults are tuned for the dark hero: white outline + dot at 70%
 * opacity, scaled smaller than the canonical "marketing demo" mouse
 * so it reads as a discreet hint rather than a focal element.
 */
export type ScrollDownProps = Readonly<{
  /** Optional label rendered under the mouse. Pass `null` to hide. */
  label?: string | null;
  /**
   * Visual size preset.
   *  - `sm` — toolbars, dense rows;
   *  - `md` — the default; for hero / banner sections;
   *  - `lg` — full-bleed splash screens.
   */
  size?: "sm" | "md" | "lg";
  /**
   * Override the foreground (mouse outline + dot + label) without
   * touching CSS — handy for placing the hint over a light surface.
   */
  color?: string;
  /** Extra class for layout positioning (the component is layout-agnostic). */
  className?: string;
  /**
   * Hero polish: pointer-events on, contour + dot + label tint to accent on
   * hover (no inner fill); label letters reel once on hover.
   */
  interactive?: boolean;
}>;

const SIZE_CLASS = {
  sm: styles["size-sm"],
  md: styles["size-md"],
  lg: styles["size-lg"],
} as const;

export function ScrollDown({
  label = "Scroll",
  size = "md",
  color,
  className,
  interactive = false,
}: ScrollDownProps) {
  const style = color
    ? ({ "--scroll-hint-fg": color } as CSSProperties)
    : undefined;

  const labelChars = useMemo(() => {
    if (!interactive || !label) return null;
    return Array.from(label, (char, index) => ({
      key: `${index}-${char}`,
      char: char === " " ? "\u00a0" : char,
      index,
    }));
  }, [interactive, label]);

  const cls = [styles.root, SIZE_CLASS[size], interactive && styles.interactive, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls} style={style} aria-hidden="true">
      <span className={styles.mouse}>
        <span className={styles.dot} />
      </span>
      {label ? (
        interactive && labelChars ? (
          <span className={styles.label}>
            {labelChars.map(({ key, char, index }) => (
              <span
                key={key}
                className={styles.labelChar}
                style={
                  {
                    "--sd-char-i": index,
                  } as CSSProperties
                }
              >
                {char}
              </span>
            ))}
          </span>
        ) : (
          <span className={styles.label}>{label}</span>
        )
      ) : null}
    </div>
  );
}
