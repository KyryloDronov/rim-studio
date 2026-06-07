"use client";

import { X } from "lucide-react";
import { useLenis } from "lenis/react";
import { motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { createPortal } from "react-dom";

import { lockScroll } from "@/lib/scrollLock";

import styles from "./style.module.css";

/** Same easing + duration feel as `Header` glass `.surface` transitions. */
const SURFACE_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
const SURFACE_DURATION_S = 0.55;

const PANEL_VARIANTS = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export type ModalProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  /** Optional short summary (linked via `aria-describedby`), below primary action. */
  description?: ReactNode;
  children: ReactNode;
  /** Optional CTA row at the bottom of the card, right-aligned. */
  footer?: ReactNode;
  /** Extra class on the native `<dialog>` root. */
  className?: string;
  /** Extra class on the inner panel card. */
  panelClassName?: string;
  /** Close when the dimmed scrim is pressed. Default `true`. */
  closeOnBackdrop?: boolean;
  /** Close on Escape (via `cancel` + controlled state). Default `true`. */
  closeOnEscape?: boolean;
  /** Override auto-generated title id for `aria-labelledby`. */
  titleId?: string;
}>;

/**
 * Accessible modal: native `<dialog>` (browser top layer), portaled to
 * `document.body`, scroll lock + **Lenis.stop()**, scrim blur like the header
 * glass surface, card fade only. Layout: close row → title → optional
 * `description` → scrollable `children` → optional `footer` CTA at bottom.
 * Controlled `open` — exit animation completes before `close()`.
 */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  panelClassName,
  closeOnBackdrop = true,
  closeOnEscape = true,
  titleId: titleIdProp,
}: ModalProps) {
  const mounted = useIsClient();

  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();
  const reactId = useId();
  const titleId = titleIdProp ?? `${reactId}-modal-title`;
  const descriptionId = description ? `${reactId}-modal-desc` : undefined;

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const releaseScrollRef = useRef<(() => void) | undefined>(undefined);
  const [exiting, setExiting] = useState(false);
  /** Keeps the panel mounted until `close()` runs — avoids a blank frame with RM. */
  const [dialogSnap, setDialogSnap] = useState<"open" | "closed">("closed");

  const reduced = prefersReducedMotion === true;

  const finishClose = useCallback(() => {
    setExiting(false);
    setDialogSnap("closed");
    const d = dialogRef.current;
    if (d?.open) {
      d.close();
    }
    releaseScrollRef.current?.();
    releaseScrollRef.current = undefined;
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect -- imperative <dialog> open/close must stay in lockstep with exiting/snap state */
  useLayoutEffect(() => {
    if (!mounted) return;
    const d = dialogRef.current;
    if (!d) return;

    if (open) {
      setExiting(false);
      setDialogSnap("open");
      if (!d.open) {
        d.showModal();
        releaseScrollRef.current = lockScroll();
      }
      return;
    }

    if (!d.open) {
      setDialogSnap("closed");
      setExiting(false);
      return;
    }

    if (reduced) {
      d.close();
      releaseScrollRef.current?.();
      releaseScrollRef.current = undefined;
      setDialogSnap("closed");
      setExiting(false);
      return;
    }

    setExiting(true);
  }, [open, reduced, mounted]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    return () => {
      releaseScrollRef.current?.();
      releaseScrollRef.current = undefined;
    };
  }, []);

  /**
   * Lenis keeps scrolling the page unless explicitly stopped — `overflow: hidden`
   * on html/body is not enough with smooth scroll.
   */
  useEffect(() => {
    if (!open || !lenis) return;
    lenis.stop();
    return () => {
      lenis.start();
    };
  }, [open, lenis]);

  useEffect(() => {
    if (open && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [open]);

  const requestClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleCancel = useCallback(
    (e: SyntheticEvent<HTMLDialogElement>) => {
      if (!closeOnEscape) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      requestClose();
    },
    [closeOnEscape, requestClose],
  );

  const handleScrimPointerDown = useCallback(() => {
    if (closeOnBackdrop) requestClose();
  }, [closeOnBackdrop, requestClose]);

  const showPanel = dialogSnap === "open" || exiting;
  const motionState = open && !exiting ? "visible" : "hidden";

  const transition = reduced
    ? { duration: 0.12 }
    : { duration: SURFACE_DURATION_S, ease: SURFACE_EASE };

  const handlePanelAnimationComplete = useCallback(() => {
    if (exiting) {
      finishClose();
    }
  }, [exiting, finishClose]);

  const dialogEl = (
    <dialog
      ref={dialogRef}
      className={[styles.dialog, className].filter(Boolean).join(" ")}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={handleCancel}
    >
      <div
        className={styles.scrim}
        aria-hidden
        data-active={motionState === "visible" ? "true" : "false"}
        onPointerDown={handleScrimPointerDown}
      />

      {showPanel ? (
        <motion.div
          role="document"
          className={[styles.panel, panelClassName].filter(Boolean).join(" ")}
          tabIndex={-1}
          initial="hidden"
          animate={motionState}
          variants={PANEL_VARIANTS}
          transition={transition}
          onAnimationComplete={handlePanelAnimationComplete}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <header className={styles.header}>
            <div className={styles.closeRow}>
              <button
                ref={closeBtnRef}
                type="button"
                className={styles.closeCircle}
                aria-label="Close dialog"
                onClick={requestClose}
              >
                <X strokeWidth={2} aria-hidden className={styles.closeIcon} />
              </button>
            </div>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
          </header>

          {description ? (
            <p id={descriptionId} className={styles.description}>
              {description}
            </p>
          ) : null}

          <div className={styles.body}>{children}</div>

          {footer ? (
            <div className={styles.primaryAction}>{footer}</div>
          ) : null}
        </motion.div>
      ) : null}
    </dialog>
  );

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(dialogEl, document.body);
}
