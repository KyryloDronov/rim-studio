"use client";

import type { ReactNode } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import {
  STUDIO_INSTAGRAM_DM_HREF,
  STUDIO_PHONE_DISPLAY,
  STUDIO_PHONE_HREF,
  STUDIO_WHATSAPP_HREF,
} from "@/content/studio-location";

import styles from "./style.module.css";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.09.61 4.09 1.76 5.81L2 22l4.45-1.17a9.86 9.86 0 0 0 5.59 1.71h.01c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.08h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-2.64.69.7-2.57-.19-.31a8.15 8.15 0 0 1-1.25-4.37c0-4.5 3.66-8.16 8.17-8.16 4.5 0 8.16 3.66 8.16 8.16 0 4.51-3.66 8.17-8.16 8.17Zm4.52-6.1c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.57.12-.17.25-.66.8-.81.97-.15.17-.3.19-.55.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.57-1.37-.78-1.88-.2-.5-.41-.43-.57-.44h-.49c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 17 16" fill="none" aria-hidden>
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

type StudioMessengerLinksProps = Readonly<{
  className?: string;
  /** Tighter spacing when aligned beside a phone input. */
  compact?: boolean;
  variant?: "onDark" | "onLight";
}>;

export function StudioMessengerLinks({
  className,
  compact = false,
  variant = "onDark",
}: StudioMessengerLinksProps) {
  const { t } = useLocale();
  const { whatsAppAriaLabel, instagramDmAriaLabel } = t.contactSheet;

  const rootClass = [
    styles.root,
    compact ? styles.compact : null,
    variant === "onLight" ? styles.onLight : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      <a
        href={STUDIO_WHATSAPP_HREF}
        target="_blank"
        rel="noreferrer"
        className={styles.chip}
        aria-label={whatsAppAriaLabel}
      >
        <WhatsAppIcon />
      </a>
      <a
        href={STUDIO_INSTAGRAM_DM_HREF}
        target="_blank"
        rel="noreferrer"
        className={styles.chip}
        aria-label={instagramDmAriaLabel}
      >
        <InstagramIcon />
      </a>
    </div>
  );
}

type PhoneInputMessengerRowProps = Readonly<{
  children: ReactNode;
  className?: string;
  variant?: "onDark" | "onLight";
}>;

type StudioPhoneRowProps = Readonly<{
  linkClassName?: string;
  className?: string;
  variant?: "onDark" | "onLight";
}>;

/** Clickable studio number with messenger chips on the right. */
export function StudioPhoneRow({
  linkClassName,
  className,
  variant = "onDark",
}: StudioPhoneRowProps) {
  const rowClass = [styles.phoneLine, className].filter(Boolean).join(" ");

  return (
    <div className={rowClass}>
      <a href={STUDIO_PHONE_HREF} className={linkClassName}>
        {STUDIO_PHONE_DISPLAY}
      </a>
      <StudioMessengerLinks variant={variant} />
    </div>
  );
}

/** Phone input on the left, WhatsApp + Instagram chips on the right. */
export function PhoneInputMessengerRow({
  children,
  className,
  variant = "onDark",
}: PhoneInputMessengerRowProps) {
  const rowClass = [styles.phoneRow, className].filter(Boolean).join(" ");

  return (
    <div className={rowClass}>
      <div className={styles.phoneInputWrap}>{children}</div>
      <StudioMessengerLinks compact variant={variant} />
    </div>
  );
}
