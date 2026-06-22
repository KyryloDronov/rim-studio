"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { ArrowRightIcon } from "./icons";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { RevealText } from "./RevealText";
import styles from "./style.module.css";
import { useHeaderScrollBehavior } from "./useHeaderScrollBehavior";

const ease = [0.76, 0, 0.24, 1] as const;
const easeOutQuart = [0.165, 0.84, 0.44, 1] as const;

type HeaderProps = Readonly<{
  onMenuToggle?: (isOpen: boolean) => void;
  isMenuOpen?: boolean;
  ready?: boolean;
}>;

export function Header({
  onMenuToggle,
  isMenuOpen: controlledOpen,
  ready = true,
}: HeaderProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isMenuOpen = isControlled ? controlledOpen : internalOpen;
  const headerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLocale();

  const { mode, isScrolled, isBannerPinned } = useHeaderScrollBehavior(
    isMenuOpen,
    headerRef,
  );
  const isConcealed = mode === "concealed" && !isMenuOpen;
  const surfaceActive = isScrolled && !isMenuOpen;

  const handleMenuClick = useCallback(() => {
    const next = !isMenuOpen;
    if (!isControlled) setInternalOpen(next);
    onMenuToggle?.(next);
  }, [isControlled, isMenuOpen, onMenuToggle]);

  return (
    /* IMPORTANT: the <header> itself MUST NOT carry any `transform`,
       `filter` or `perspective` — and no ancestor in its lineage
       should either. Such properties create a containing block /
       stacking context that prevents `backdrop-filter` on `.surface`
       from sampling the page content behind. The entrance animation
       (translateY + opacity) is therefore applied to an INNER motion
       wrapper, leaving `.surface` with a clean, untransformed parent
       chain right up to <body>. */
    <header
      ref={headerRef}
      className={styles.header}
      data-scrolled={surfaceActive ? "true" : "false"}
      data-banner={mode === "hero" ? "true" : "false"}
      data-pinned={isBannerPinned ? "true" : "false"}
      data-concealed={isConcealed ? "true" : "false"}
    >
      {/* Decorative glass pill — sibling of `.headerInner`, so the
          motion transform on the inner wrapper does not affect the
          surface's backdrop-filter. */}
      <span className={styles.surface} aria-hidden="true" />

      <motion.div
        className={styles.headerInner}
        initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.6, delay: 0.1, ease: easeOutQuart }}
      >
      <div className={styles.left}>
        <motion.button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          className={styles.menuBtn}
          onClick={handleMenuClick}
          initial="rest"
          animate="rest"
          whileHover="hover"
          whileFocus="hover"
        >
          <Hamburger isOpen={isMenuOpen} />
          <span className={`${styles.menuText} ${styles.reveal}`}>
            <motion.span
              animate={{ y: isMenuOpen ? "-100%" : "0%" }}
              transition={{ duration: 0.45, ease }}
            >
              {t.header.menu}
            </motion.span>
            <motion.span
              animate={{ y: isMenuOpen ? "0%" : "100%" }}
              transition={{ duration: 0.45, ease }}
              aria-hidden={!isMenuOpen}
            >
              {t.header.close}
            </motion.span>
          </span>
        </motion.button>
      </div>

      <div className={styles.center}>
        <Link href="/" aria-label="rim-studio home" className={styles.logo}>
          <span>rim</span>
          <span className={styles.logoMark}>/</span>
          <span>studio</span>
        </Link>
      </div>

      <div className={styles.right}>
        <div className={styles.rightInner}>
          <LocaleSwitcher />
          <motion.a
            href="mailto:hello@rim-studio.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send us an email"
            className={styles.contact}
            initial="rest"
            animate="rest"
            whileHover="hover"
            whileFocus="hover"
          >
            <RevealText className={styles.contactText}>
              {t.header.contact}
            </RevealText>
            <span className={styles.arrow}>
              <motion.span
                className={styles.arrowIcon}
                variants={{
                  rest: { x: "-110%" },
                  hover: { x: "0%", transition: { duration: 0.4, ease } },
                }}
              >
                <ArrowRightIcon />
              </motion.span>
              <motion.span
                className={styles.arrowIcon}
                variants={{
                  rest: { x: "0%" },
                  hover: { x: "110%", transition: { duration: 0.4, ease } },
                }}
              >
                <ArrowRightIcon />
              </motion.span>
            </span>
          </motion.a>
        </div>
      </div>
      </motion.div>
    </header>
  );
}

/* --------------------------------------------------------------------- */

type HamburgerProps = Readonly<{ isOpen: boolean }>;

function Hamburger({ isOpen }: HamburgerProps) {
  return (
    <span className={styles.hamburger} aria-hidden>
      <motion.span
        className={styles.line}
        animate={
          isOpen
            ? { y: "-50%", rotate: 45 }
            : { y: "calc(-50% - 0.3rem)", rotate: 0 }
        }
        transition={{ duration: 0.35, ease }}
      />
      <motion.span
        className={styles.line}
        animate={
          isOpen
            ? { y: "-50%", rotate: -45 }
            : { y: "calc(-50% + 0.3rem)", rotate: 0 }
        }
        transition={{ duration: 0.35, ease }}
      />
    </span>
  );
}
