"use client";

import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import Preloader from "@/components/Preloader";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { detectLocaleFromPath } from "@/i18n/paths";
import { LOCALE_BCP47 } from "@/i18n/types";

type SiteShellProps = Readonly<{
  children: React.ReactNode;
}>;

const PRELOADER_SEEN_KEY = "rim-studio:preloader-seen";

function readPreloaderSeen(): boolean {
  if (globalThis.window === undefined) return false;
  try {
    return globalThis.sessionStorage.getItem(PRELOADER_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function writePreloaderSeen(): void {
  if (globalThis.window === undefined) return;
  try {
    globalThis.sessionStorage.setItem(PRELOADER_SEEN_KEY, "1");
  } catch {
    /* storage unavailable — fall through silently */
  }
}

/**
 * Persistent client shell. Mounted by the *root* `app/layout.tsx`, above
 * the `[lang]` dynamic segment, so its state (menu open/closed, preloader,
 * GSAP scroll bindings, motion layoutIds) survives locale switches and any
 * other soft-navigation. Locale itself is derived from `usePathname()` so
 * it stays in sync with the URL — the `LocaleProvider` re-renders, every
 * `useLocale()` consumer gets fresh dictionary strings, and that's it.
 */
export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname() ?? "/";
  const locale = useMemo(() => detectLocaleFromPath(pathname), [pathname]);

  const [decided, setDecided] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const seen = readPreloaderSeen();
      if (seen) {
        setContentVisible(true);
      } else {
        setShowPreloader(true);
      }
      setDecided(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  /* Keep <html lang> in sync with the URL after client-side navigation. */
  useEffect(() => {
    if (typeof document === "undefined") return;
    const next = LOCALE_BCP47[locale];
    if (document.documentElement.lang !== next) {
      document.documentElement.lang = next;
    }
  }, [locale]);

  const handleWordsDone = useCallback(() => {
    setShowPreloader(false);
  }, []);

  const handleExitComplete = useCallback(() => {
    writePreloaderSeen();
    setContentVisible(true);
  }, []);

  const handleMenuToggle = useCallback((next: boolean) => {
    setIsMenuOpen(next);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <LocaleProvider locale={locale}>
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        {decided && showPreloader && (
          <Preloader key="site-preloader" onWordsDone={handleWordsDone} />
        )}
      </AnimatePresence>
      <Header
        ready={contentVisible}
        isMenuOpen={isMenuOpen}
        onMenuToggle={handleMenuToggle}
      />
      <Menu isOpen={isMenuOpen} onClose={handleMenuClose} />
      <div
        style={{
          visibility: contentVisible ? "visible" : "hidden",
          pointerEvents: contentVisible ? "auto" : "none",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
        }}
        aria-hidden={!contentVisible}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            background: "var(--background)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
        <Footer />
      </div>
    </LocaleProvider>
  );
}
