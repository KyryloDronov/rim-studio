"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

/* ---------- Public API -------------------------------------------------- */

export type ProductCard = Readonly<{
  id: string;
  title: string;
  href: string;
  /**
   * Optional product render. PNG / WebP with a transparent background looks
   * the best on the glassy card — it lets the blurred backdrop show through
   * behind the silhouette.
   */
  image?: string;
  /** Tailored gradient — fallback when no `image` is provided. */
  gradient: string;
}>;

type ProductCardsProps = Readonly<{
  cards: ReadonlyArray<ProductCard>;
  /** Eyebrow shown next to the resting stack (replaced by hovered title). */
  eyebrowLabel: string;
  /** Optional className on the outer wrap (positioning hooks for parents). */
  className?: string;
  /**
   * When true, each card is wrapped for a parent-driven intro (e.g. Hero GSAP).
   * Motion keeps animating `y` / `scale` on the link; blur + horizontal slip
   * live on the wrapper so transforms don't fight.
   */
  stackIntro?: boolean;
}>;

/* ---------- Geometry constants ----------------------------------------- *
 *
 * Expressed as ratios of the card's edge length. The actual pixel size is
 * read from the wrap element at runtime — the wrap's width is driven by
 * `clamp()` in CSS, so this stays adaptive without duplicating the
 * breakpoints in JS.                                                       */

const CARD_GAP_RATIO = 0.125; // gap between fanned cards (12.5% of size)
const STACK_PEEK_RATIO = 0.21875; // visible sliver of each stacked card
const FALLBACK_CARD_SIZE = 64; // px — used until the first measurement

/* ----------------------------------------------------------------------- *
 *  ProductCards — vertical stack that fans UP on hover.
 *
 *  Cards are absolutely positioned by their natural (spread-state) `bottom`
 *  offset, and then translated DOWN via `y` in the rest state to collapse
 *  the stack onto card[0]. Hovering the wrap zeros the translation — cards
 *  fan UP into a visible vertical column. Hovering an individual card
 *  scales it slightly and reveals its title to the left.
 *
 *  Why explicit state instead of Motion's `whileHover` on the wrapper:
 *   1. `whileHover` propagates to children — every child with `whileHover`
 *      would activate when the wrap is hovered, scaling ALL cards instead
 *      of just the one under the cursor.
 *   2. The wrap reserves only the resting (collapsed) height in layout;
 *      when expanded, cards fan above the wrap. If we tracked hover on the
 *      wrap itself, moving the cursor onto a fanned card would leave the
 *      wrap's box and instantly close the stack.
 *  The dedicated hit-area below sits behind the cards, extends upward to
 *  cover the whole expanded height, and drives `isOpen` state explicitly. */
export function ProductCards({
  cards,
  eyebrowLabel,
  className,
  stackIntro = false,
}: ProductCardsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  /* Measure the actual card size from the wrap (it's `clamp(...)` in CSS,
     so size depends on viewport). Pixel-perfect positioning relies on
     this — re-measure on viewport resizes via ResizeObserver. */
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [cardSize, setCardSize] = useState<number>(FALLBACK_CARD_SIZE);

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const update = () => {
      const w = wrap.getBoundingClientRect().width;
      if (w > 0) setCardSize(w);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  const N = cards.length;
  const cardGap = cardSize * CARD_GAP_RATIO;
  const step = cardSize + cardGap;
  const stackPeek = cardSize * STACK_PEEK_RATIO;
  /* How far each card slides DOWN from its natural (spread) position to
     collapse onto the bottom card in the resting state. card[0] doesn't
     move (it's the visible "front" card), card[N-1] moves the most. */
  const stackDrop = step - stackPeek;
  const restHeight = cardSize + (N - 1) * stackPeek;
  const expandedHeight = (N - 1) * step + cardSize;

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 220, damping: 26, mass: 0.6 };

  const handleHitAreaEnter = useCallback(() => setIsOpen(true), []);
  const handleHitAreaLeave = useCallback(() => {
    setIsOpen(false);
    setHoveredId(null);
  }, []);

  const wrapClassName = className
    ? `${styles.wrap} ${className}`
    : styles.wrap;

  return (
    <div ref={wrapRef} className={wrapClassName} style={{ height: restHeight }}>
      {/* Hit-area: sits behind everything else, extends UP to cover the
          full expanded stack so the cursor never leaves it while moving
          across fanned cards. Listens for hover and bubbled focus events
          from the real interactive content (the cards inside) — the div
          itself is not focusable and has no semantic role. The cards
          retain native keyboard / screen-reader behaviour, so a non-native
          interactive role is unnecessary. */}
      <div // NOSONAR — see comment above
        className={styles.hitArea}
        style={{ height: expandedHeight }}
        onMouseEnter={handleHitAreaEnter}
        onMouseLeave={handleHitAreaLeave}
        onFocus={handleHitAreaEnter}
        onBlur={handleHitAreaLeave}
      >
        {/* Eyebrow label — anchored to the visible bottom card. Hidden when
            the stack is open (the per-card title takes its place).
            With `stackIntro`, a shell is GSAP-driven (blur + slip) in sync
            with the first card; Motion still fades it when the stack opens. */}
        {stackIntro ? (
          <span
            data-hero-recent-eyebrow
            className={styles.eyebrowIntroShell}
            style={{ height: cardSize }}
          >
            <motion.span
              className={styles.eyebrowLabel}
              style={{ height: cardSize }}
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.22, ease: [0.6, 0, 0.2, 1] }}
              aria-hidden="true"
            >
              {eyebrowLabel}
            </motion.span>
          </span>
        ) : (
          <motion.span
            className={styles.eyebrow}
            style={{ height: cardSize }}
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.22, ease: [0.6, 0, 0.2, 1] }}
            aria-hidden="true"
          >
            {eyebrowLabel}
          </motion.span>
        )}

        {/* Active card title — one per card, positioned at the card's
            natural row. Only the hovered one is visible. */}
        {cards.map((card, i) => {
          const isActive = hoveredId === card.id;
          return (
            <motion.span
              key={`title-${card.id}`}
              className={styles.title}
              style={{ bottom: i * step, height: cardSize }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 6 }}
              transition={{ duration: 0.22, ease: [0.6, 0, 0.2, 1] }}
              aria-hidden={!isActive}
            >
              {card.title}
            </motion.span>
          );
        })}

        {/* Cards. `bottom: i * step` is the spread position; `y` collapses
            them in rest. z-index puts card[0] on top (front of stack).
            With `stackIntro`, a shell owns bottom/z-index so GSAP can own
            blur + x on the shell without clashing with Motion on `y`. */}
        {cards.map((card, i) => {
          const isActive = hoveredId === card.id;
          const surfaceStyle: React.CSSProperties = card.image
            ? {
                backgroundImage: `url(${card.image})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }
            : { background: card.gradient };

          const motionCard = (
            <motion.a
              href={card.href}
              aria-label={card.title}
              className={styles.card}
              style={
                stackIntro
                  ? { bottom: 0 }
                  : { bottom: i * step, zIndex: N - i }
              }
              animate={{
                y: isOpen ? 0 : i * stackDrop,
                scale: isActive ? 1.06 : 1,
              }}
              transition={transition}
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={styles.image} style={surfaceStyle} />
            </motion.a>
          );

          if (stackIntro) {
            return (
              <div
                key={card.id}
                className={styles.cardShellIntro}
                data-hero-recent-card=""
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: i * step,
                  zIndex: N - i,
                  width: "var(--card-size)",
                  height: "var(--card-size)",
                }}
              >
                {motionCard}
              </div>
            );
          }

          return <Fragment key={card.id}>{motionCard}</Fragment>;
        })}
      </div>
    </div>
  );
}
