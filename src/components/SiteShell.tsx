"use client";

import "@/animations/register";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import Preloader from "@/components/Preloader";
import { ReadyProvider } from "@/components/ReadyProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { detectLocaleFromPath } from "@/i18n/paths";
import { LOCALE_BCP47 } from "@/i18n/types";

const FooterLazy = dynamic(
  () => import("@/components/Footer").then((m) => ({ default: m.Footer })),
  { ssr: true },
);

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
  /* Two-phase readiness — `contentVisible` flips first (page paints,
     bg videos kick off), `introReady` flips later (component intro
     animations are unblocked). The preloader emits both at distinct
     points along its mask-reveal timeline. */
  const [contentVisible, setContentVisible] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const seen = readPreloaderSeen();
      if (seen) {
        /* Returning visitor — skip the preloader entirely and release
           both gates at once so intro animations play immediately. */
        setContentVisible(true);
        setIntroReady(true);
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

  /* ~80 % through the mask reveal — un-hide the page so the hero's
     bg video starts painting under the still-dissolving mask. Mark
     the preloader as "seen" here too: even if the user navigates
     away mid-reveal, they shouldn't see the preloader again this
     session. */
  const handleContentVisible = useCallback(() => {
    writePreloaderSeen();
    setContentVisible(true);
  }, []);

  /* Mask fully open — release the intro-animation gate. Hero title
     cascade, menu nav stagger, etc. can now run without competing
     with the wipe. */
  const handleAnimationsStart = useCallback(() => {
    setIntroReady(true);
  }, []);

  /* Timeline finished — every preloader layer is at opacity 0 by
     this point, so dropping the component from the tree is a
     silent DOM cleanup. */
  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  const handleMenuToggle = useCallback((next: boolean) => {
    setIsMenuOpen(next);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <LocaleProvider locale={locale}>
      <SmoothScroll>
        {decided && showPreloader && (
          <Preloader
            onContentVisible={handleContentVisible}
            onAnimationsStart={handleAnimationsStart}
            onComplete={handlePreloaderComplete}
          />
        )}
        <Header
          ready={contentVisible}
          isMenuOpen={isMenuOpen}
          onMenuToggle={handleMenuToggle}
        />
        <Menu isOpen={isMenuOpen} onClose={handleMenuClose} />
        <ReadyProvider contentVisible={contentVisible} introReady={introReady}>
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
            {children}
            <FooterLazy ready={contentVisible} />
          </div>
        </ReadyProvider>
      </SmoothScroll>
    </LocaleProvider>
  );
}
