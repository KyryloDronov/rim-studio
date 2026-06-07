"use client";

import { motion } from "motion/react";
import { useLocale } from "@/i18n/LocaleProvider";
import { LOCALES, LOCALE_LABEL, LOCALE_NAME } from "@/i18n/types";
import styles from "./style.module.css";

const ease = [0.76, 0, 0.24, 1] as const;

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={styles.localeSwitcher}
      role="group"
      aria-label="Select language"
    >
      {LOCALES.map((code) => {
        const isActive = code === locale;
        return (
          <button
            key={code}
            type="button"
            className={styles.localeBtn}
            data-active={isActive}
            onClick={() => setLocale(code)}
            aria-label={`Switch to ${LOCALE_NAME[code]}`}
            aria-pressed={isActive}
          >
            <span>{LOCALE_LABEL[code]}</span>
            {isActive && (
              <motion.span
                layoutId="locale-active-underline"
                className={styles.localeActiveUnderline}
                transition={{ duration: 0.4, ease }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
