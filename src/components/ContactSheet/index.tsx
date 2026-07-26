"use client";

import { useLenis } from "lenis/react";
import {
  Mail,
  MapPin,
  Navigation,
  Phone,
  PhoneCall,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type SyntheticEvent,
} from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/forms/TextInput";
import { ContactSheetMap } from "@/components/ContactSheet/ContactSheetMap";
import { useContactSheet } from "@/components/ContactSheet/ContactSheetContext";
import {
  buildGoogleDirectionsUrl,
  STUDIO_COORDINATES,
  STUDIO_EMAIL,
  STUDIO_PHONE_DISPLAY,
  STUDIO_PHONE_E164,
  STUDIO_SOCIAL,
} from "@/content/studio-location";
import { useLocale } from "@/i18n/LocaleProvider";
import { lockScroll } from "@/lib/scrollLock";

import styles from "./style.module.css";

const SURFACE_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const SURFACE_DURATION_S = 0.55;

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 17 16" fill="none" aria-hidden className={styles.socialSvg}>
      <path
        d="M12.467 0H4.16C1.867 0 0 1.867 0 4.163v7.6C0 14.06 1.867 15.927 4.16 15.927h8.307c2.295 0 4.162-1.866 4.162-4.163v-7.6C16.629 1.867 14.762 0 12.467 0Zm-11 4.163c0-1.485 1.21-2.694 2.694-2.694h8.307c1.485 0 2.694 1.21 2.694 2.694v7.6c0 1.486-1.209 2.695-2.694 2.695H4.161c-1.485 0-2.694-1.21-2.694-2.694v-7.6Z"
        fill="currentColor"
      />
      <path
        d="M8.314 11.834a3.872 3.872 0 1 0 0-7.744 3.872 3.872 0 0 0 0 7.744Zm0-6.275a2.403 2.403 0 1 1 0 4.807 2.403 2.403 0 0 1 0-4.807Z"
        fill="currentColor"
      />
      <path
        d="M12.543 4.72a1.044 1.044 0 1 0 0-2.088 1.044 1.044 0 0 0 0 2.087Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XSocialIcon() {
  return (
    <svg viewBox="0 0 17 15" fill="none" aria-hidden className={styles.xIcon}>
      <path
        d="M.04 0 6.228 8.278 0 15.009h1.402l5.454-5.893 4.406 5.893h4.771l-6.538-8.744L15.293 0h-1.402L8.868 5.427 4.81 0H.04ZM2.1 1.033h2.191l9.679 12.943h-2.192L2.1 1.033Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ContactSheet() {
  const mounted = useIsClient();
  const { open, closeSheet } = useContactSheet();
  const { t } = useLocale();
  const copy = t.contactSheet;
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();
  const reactId = useId();
  const titleId = `${reactId}-contact-sheet-title`;

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const releaseScrollRef = useRef<(() => void) | undefined>(undefined);
  const [exiting, setExiting] = useState(false);
  const [dialogSnap, setDialogSnap] = useState<"open" | "closed">("closed");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackPhoneInvalid, setCallbackPhoneInvalid] = useState(false);
  const [callbackSent, setCallbackSent] = useState(false);

  const reduced = prefersReducedMotion === true;
  const directionsUrl = buildGoogleDirectionsUrl(
    STUDIO_COORDINATES.lat,
    STUDIO_COORDINATES.lng,
  );

  useEffect(() => {
    if (!open) {
      setCallbackPhone("");
      setCallbackPhoneInvalid(false);
      setCallbackSent(false);
    }
  }, [open]);

  const finishClose = useCallback(() => {
    setExiting(false);
    setDialogSnap("closed");
    const d = dialogRef.current;
    if (d?.open) d.close();
    releaseScrollRef.current?.();
    releaseScrollRef.current = undefined;
  }, []);

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

  useEffect(() => {
    return () => {
      releaseScrollRef.current?.();
      releaseScrollRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (!open || !lenis) return;
    lenis.stop();
    return () => {
      lenis.start();
    };
  }, [open, lenis]);

  const requestClose = useCallback(() => {
    closeSheet();
  }, [closeSheet]);

  const handleCallbackSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const trimmed = callbackPhone.trim();
      if (!trimmed) {
        setCallbackPhoneInvalid(true);
        return;
      }
      setCallbackPhoneInvalid(false);
      setCallbackSent(true);
    },
    [callbackPhone],
  );

  const handleCancel = useCallback(
    (e: SyntheticEvent<HTMLDialogElement>) => {
      e.preventDefault();
      requestClose();
    },
    [requestClose],
  );

  const showPanel = dialogSnap === "open" || exiting;
  const panelVisible = open && !exiting;

  const panelTransition = reduced
    ? { duration: 0.12 }
    : { duration: SURFACE_DURATION_S, ease: SURFACE_EASE };

  const handlePanelAnimationComplete = useCallback(() => {
    if (exiting) finishClose();
  }, [exiting, finishClose]);

  const blockMotion = {
    hidden: { opacity: 0, y: 12 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: reduced ? 0 : 0.08 + i * 0.06,
        duration: reduced ? 0.12 : 0.42,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  const dialogEl = (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      data-active={panelVisible ? "true" : "false"}
      data-lenis-prevent
      onCancel={handleCancel}
    >
      <button
        type="button"
        className={styles.scrim}
        aria-label={copy.closeLabel}
        data-active={panelVisible ? "true" : "false"}
        onClick={requestClose}
      />

      {showPanel ? (
        <motion.aside
          className={styles.panel}
          role="document"
          initial={reduced ? false : { x: "100%" }}
          animate={panelVisible ? { x: 0 } : { x: "100%" }}
          transition={panelTransition}
          onAnimationComplete={handlePanelAnimationComplete}
          onPointerDown={(e) => e.stopPropagation()}
          data-lenis-prevent
        >
          <header className={styles.header}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <div className={styles.headerRow}>
              <h2 id={titleId} className={styles.title}>
                {copy.title}
              </h2>
              <button
                type="button"
                className={styles.closeCircle}
                aria-label={copy.closeLabel}
                onClick={requestClose}
              >
                <X strokeWidth={2} className={styles.closeIcon} />
              </button>
            </div>
          </header>

          <div className={styles.scroll}>
            <motion.section
              className={`${styles.block} ${styles.callbackBlock}`}
              custom={0}
              variants={blockMotion}
              initial="hidden"
              animate={panelVisible ? "visible" : "hidden"}
              aria-labelledby={`${reactId}-callback`}
            >
              <div className={styles.blockBody}>
                <h3 id={`${reactId}-callback`} className={styles.blockTitle}>
                  {copy.callbackTitle}
                </h3>
                <p className={styles.blockMuted}>{copy.callbackBody}</p>
                {callbackSent ? (
                  <div className={styles.callbackSuccess}>
                    <p className={styles.callbackSuccessTitle}>
                      {copy.callbackSuccessTitle}
                    </p>
                    <p className={styles.callbackSuccessBody}>
                      {copy.callbackSuccessBody}
                    </p>
                  </div>
                ) : (
                  <form
                    className={styles.callbackForm}
                    onSubmit={handleCallbackSubmit}
                    noValidate
                  >
                    <label className={styles.callbackLabel} htmlFor={`${reactId}-phone`}>
                      {copy.callbackPhoneLabel}
                    </label>
                    <TextInput
                      id={`${reactId}-phone`}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder={copy.callbackPhonePlaceholder}
                      value={callbackPhone}
                      invalid={callbackPhoneInvalid}
                      className={styles.callbackInput}
                      onChange={(event) => {
                        setCallbackPhone(event.target.value);
                        if (callbackPhoneInvalid) setCallbackPhoneInvalid(false);
                      }}
                    />
                    {callbackPhoneInvalid ? (
                      <p className={styles.callbackError} role="alert">
                        {copy.callbackPhoneRequired}
                      </p>
                    ) : null}
                    <Button
                      type="submit"
                      variant="accent"
                      size="md"
                      className={styles.callbackSubmit}
                      icon={<PhoneCall strokeWidth={1.75} />}
                    >
                      {copy.callbackCta}
                    </Button>
                  </form>
                )}
              </div>
            </motion.section>

            <motion.div
              className={styles.mapSection}
              custom={1}
              variants={blockMotion}
              initial="hidden"
              animate={panelVisible ? "visible" : "hidden"}
            >
              <ContactSheetMap active={panelVisible} ariaLabel={copy.mapAriaLabel} />
            </motion.div>

            <motion.div
              className={styles.actions}
              custom={2}
              variants={blockMotion}
              initial="hidden"
              animate={panelVisible ? "visible" : "hidden"}
            >
              <Button
                variant="dark"
                size="md"
                className={styles.routeBtn}
                icon={<Navigation strokeWidth={1.75} />}
                href={directionsUrl}
                external
              >
                {copy.routeLabel}
              </Button>
            </motion.div>

            <motion.section
              className={styles.block}
              custom={3}
              variants={blockMotion}
              initial="hidden"
              animate={panelVisible ? "visible" : "hidden"}
              aria-labelledby={`${reactId}-address`}
            >
              <div className={styles.blockIcon} aria-hidden>
                <MapPin strokeWidth={1.5} />
              </div>
              <div className={styles.blockBody}>
                <h3 id={`${reactId}-address`} className={styles.blockTitle}>
                  {copy.addressTitle}
                </h3>
                <p className={styles.blockText}>{copy.addressLine1}</p>
                <p className={styles.blockMuted}>{copy.addressLine2}</p>
              </div>
            </motion.section>

            <motion.section
              className={styles.block}
              custom={4}
              variants={blockMotion}
              initial="hidden"
              animate={panelVisible ? "visible" : "hidden"}
              aria-labelledby={`${reactId}-phone`}
            >
              <div className={styles.blockIcon} aria-hidden>
                <Phone strokeWidth={1.5} />
              </div>
              <div className={styles.blockBody}>
                <h3 id={`${reactId}-phone`} className={styles.blockTitle}>
                  {copy.phoneTitle}
                </h3>
                <a className={styles.blockLink} href={`tel:${STUDIO_PHONE_E164}`}>
                  {STUDIO_PHONE_DISPLAY}
                </a>
              </div>
            </motion.section>

            <motion.section
              className={styles.socialBlock}
              custom={5}
              variants={blockMotion}
              initial="hidden"
              animate={panelVisible ? "visible" : "hidden"}
              aria-labelledby={`${reactId}-social`}
            >
              <h3 id={`${reactId}-social`} className={styles.socialTitle}>
                {copy.socialTitle}
              </h3>
              <div className={styles.socialRow}>
                <a
                  href={STUDIO_SOCIAL.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={STUDIO_SOCIAL.x}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialLink}
                  aria-label="X"
                >
                  <XSocialIcon />
                </a>
                <a
                  href={`mailto:${STUDIO_EMAIL}`}
                  className={styles.socialLink}
                  aria-label={copy.emailLabel}
                >
                  <Mail strokeWidth={1.5} />
                </a>
              </div>
            </motion.section>
          </div>
        </motion.aside>
      ) : null}
    </dialog>
  );

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(dialogEl, document.body);
}

export { ContactSheetProvider, useContactSheet } from "./ContactSheetContext";
