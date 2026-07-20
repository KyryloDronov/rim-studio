"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/i18n/LocaleProvider";
import { LOCALES, LOCALE_LABEL, LOCALE_NAME, type Locale } from "@/i18n/types";
import styles from "./style.module.css";

const ease = [0.76, 0, 0.24, 1] as const;

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={styles.localeTrack}
      role="group"
      aria-label="Select language"
    >
      {LOCALES.map((code) => {
        const isActive = code === locale;

        return (
          <button
            key={code}
            type="button"
            className={styles.localeOption}
            data-active={isActive ? "true" : "false"}
            onClick={() => setLocale(code as Locale)}
            aria-label={`Switch to ${LOCALE_NAME[code]}`}
            aria-pressed={isActive}
          >
            {isActive ? (
              <motion.span
                layoutId="header-locale-indicator"
                className={styles.localeThumb}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.48, ease }
                }
              />
            ) : null}
            <span className={styles.localeLabel}>{LOCALE_LABEL[code]}</span>
          </button>
        );
      })}
    </div>
  );
}
