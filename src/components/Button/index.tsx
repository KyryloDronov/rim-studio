"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import styles from "./style.module.css";

/**
 * Visual treatments. The same DOM/markup, only CSS modifiers change:
 *  - `dark`   — deep ink pill on light/dark surfaces (the default
 *               "menu" treatment in the brand kit);
 *  - `accent` — saturated brand-orange CTA, for primary actions;
 *  - `light`  — white pill, used as a high-contrast CTA on dark
 *               surfaces (e.g. hero on `--brand-ink-500`).
 *
 * Old names (`primary` / `ghost`) are aliased onto the new tri-tone
 * palette so call sites that haven't migrated yet keep rendering.
 */
type Variant =
  | "dark"
  | "accent"
  | "light"
  /** @deprecated use `light` */
  | "primary"
  /** @deprecated use `dark` */
  | "ghost";

/** `sm` is for headers / dense rows; `md` is the default; `lg` is a
 *  hero CTA. The icon circle scales with the size automatically. */
type Size = "sm" | "md" | "lg";

type CommonProps = Readonly<{
  children: ReactNode;
  /**
   * Optional icon rendered inside the trailing circular slot. When
   * supplied, the button performs a slide-out / slide-in swap on
   * hover (the same icon is rendered twice to make the swap seamless).
   * When omitted, the slot is hidden entirely.
   */
  icon?: ReactNode;
  /** Force-hide the trailing icon slot even if `icon` is provided. */
  showIcon?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  ariaLabel?: string;
  /**
   * Apple-style intro: pill starts as the trailing icon circle only; when
   * the button enters the viewport it expands left and the label fades in.
   * Requires `icon`. Ignored when the user prefers reduced motion.
   */
  expandFromIcon?: boolean;
  /**
   * With `expandFromIcon`, skips IntersectionObserver and expands when this
   * flips to `true` — e.g. after a parent GSAP intro on the CTA row.
   */
  expandWhen?: boolean;
}>;

type LinkProps = CommonProps &
  Readonly<{
    href: string;
    /** Forces an `<a>` element regardless of href shape (e.g. mailto:, tel:). */
    external?: boolean;
    onClick?: never;
    type?: never;
    disabled?: never;
  }>;

type ButtonElProps = CommonProps &
  Readonly<{
    href?: never;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    external?: never;
  }>;

export type ButtonProps = LinkProps | ButtonElProps;

/* Map every accepted variant name onto one of the three real CSS
   classes. Keeping legacy names alive here means existing callers
   (like `<Hero>`) keep their look until they're explicitly migrated. */
const VARIANT_CLASS: Record<Variant, "dark" | "accent" | "light"> = {
  dark: "dark",
  accent: "accent",
  light: "light",
  primary: "light",
  ghost: "dark",
};

function buildClassName(
  variant: Variant,
  size: Size,
  hasIcon: boolean,
  expandFromIcon: boolean,
  introDone: boolean,
  extra: string | undefined,
) {
  return [
    styles.button,
    styles[`variant-${VARIANT_CLASS[variant]}`],
    styles[`size-${size}`],
    hasIcon ? null : styles.noIcon,
    expandFromIcon && hasIcon ? styles.introFromIcon : null,
    expandFromIcon && hasIcon && introDone ? styles.introFromIconExpanded : null,
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

/* Trailing slot is rendered as two stacked layers so the swap-on-hover
   animation has something to slide into. The two layers are presentational
   only; we keep them out of the a11y tree. */
function IconSlot({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <span className={styles.iconSlot} aria-hidden="true">
      <span className={`${styles.iconLayer} ${styles.iconFront}`}>
        {children}
      </span>
      <span className={`${styles.iconLayer} ${styles.iconBack}`}>
        {children}
      </span>
    </span>
  );
}

export const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    children,
    icon,
    showIcon = true,
    variant = "light",
    size = "md",
    className,
    ariaLabel,
    expandFromIcon = false,
    expandWhen,
  } = props;

  const prefersReducedMotion = useReducedMotion();
  const expandControlled = expandWhen !== undefined;
  const domRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const [viewportRevealed, setViewportRevealed] = useState(false);

  useLayoutEffect(() => {
    if (
      !expandFromIcon ||
      !showIcon ||
      !icon ||
      prefersReducedMotion === true ||
      expandControlled
    )
      return;
    const el = domRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setViewportRevealed(true);
          io.disconnect();
        }
      },
      { root: null, threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [
    expandControlled,
    expandFromIcon,
    showIcon,
    icon,
    prefersReducedMotion,
  ]);

  const setMergedRef = useCallback(
    (node: HTMLAnchorElement | HTMLButtonElement | null) => {
      domRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>).current =
          node;
      }
    },
    [ref],
  );

  /* The slot only renders when there's a real icon to show. The
     "no icon" branch isn't a fallback arrow on purpose — many of the
     brand pills (the `Menu` button in the kit) ship without one, and
     callers that want an arrow can still pass the dedicated `Arrow` icon. */
  const hasIcon = showIcon && Boolean(icon);
  const useIntro = Boolean(expandFromIcon && hasIcon);
  const introExpanded =
    !useIntro ||
    prefersReducedMotion === true ||
    (expandControlled ? expandWhen : viewportRevealed);
  const cls = buildClassName(
    variant,
    size,
    hasIcon,
    useIntro,
    useIntro && introExpanded,
    className,
  );

  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      {hasIcon ? <IconSlot>{icon}</IconSlot> : null}
    </>
  );

  if (props.href !== undefined) {
    /* External / protocol links bypass next/link. We still keep markup
       identical so the visual variants don't fork. */
    const isExternal =
      props.external ||
      props.href.startsWith("http") ||
      props.href.startsWith("mailto:") ||
      props.href.startsWith("tel:");

    if (isExternal) {
      return (
        <a
          ref={setMergedRef}
          href={props.href}
          className={cls}
          aria-label={ariaLabel}
          target={props.external ? "_blank" : undefined}
          rel={props.external ? "noreferrer noopener" : undefined}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link
        ref={setMergedRef as React.Ref<HTMLAnchorElement>}
        href={props.href}
        className={cls}
        aria-label={ariaLabel}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={setMergedRef as React.Ref<HTMLButtonElement>}
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cls}
      aria-label={ariaLabel}
    >
      {inner}
    </button>
  );
});

/* ===========================================================
   Built-in icons
   -----------------------------------------------------------
   Tiny, dependency-free SVGs that match the visual rhythm of
   the SOHub-style pill (16x16 viewBox, currentColor stroke).
   They're optional — callers can pass any ReactNode as `icon`.
   =========================================================== */

/** Default trailing arrow — the "go" cue. */
export function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 3.5L13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Outbound / external-link cue. */
export function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5 11L11 5M6 5h5v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Plus — for "add" / "open" affordances. */
export function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 3v10M3 8h10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
