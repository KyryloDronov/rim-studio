"use client";

import gsap from "gsap";
import { CalendarCheck } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { runBeforeAfterScrollReveal } from "@/animations";
import { Button } from "@/components/Button";
import cardSliderStyles from "@/components/CardSlider/style.module.css";
import { Tabs, type TabItem } from "@/components/Tabs";
import { BEFORE_AFTER_BOOKING_VIDEO } from "@/content/before-after-pairs";
import { getBeforeAfterTabCatalog } from "@/content/before-after-catalog";
import {
  PRICING_TAB_ICONS,
  resolvePricingTabOrder,
  type PricingTabId,
} from "@/content/pricing-tabs";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/paths";

import { CategoryMediaPanel } from "./CategoryMediaPanel";
import styles from "./style.module.css";

export const BEFORE_AFTER_SECTION_ID = "before-after";

export type BeforeAfterSectionProps = Readonly<{
  /**
   * Tab placed first and selected on mount — use on service pages so
   * the relevant category leads the bar.
   */
  featuredTab?: PricingTabId;
}>;

export function BeforeAfterSection({
  featuredTab = "paint",
}: BeforeAfterSectionProps) {
  const { locale, t } = useLocale();
  const { beforeAfter, pricing } = t;
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const bookingVideoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const tabOrder = useMemo(
    () => resolvePricingTabOrder(featuredTab),
    [featuredTab],
  );
  const [activeTab, setActiveTab] = useState<PricingTabId>(featuredTab);

  const tabItems = useMemo<ReadonlyArray<TabItem>>(
    () =>
      tabOrder.map((id) => {
        const panel = pricing.panels[id];
        const Icon = PRICING_TAB_ICONS[id];
        return {
          id,
          label: `${panel.tabLabelLine1} ${panel.tabLabelLine2}`,
          labelLines: [panel.tabLabelLine1, panel.tabLabelLine2] as const,
          icon: <Icon strokeWidth={1.75} />,
        };
      }),
    [pricing.panels, tabOrder],
  );

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id as PricingTabId);
  }, []);

  useEffect(() => {
    setActiveTab(featuredTab);
  }, [featuredTab]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    bookingVideoRef.current?.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const root = sectionRef.current;
    const trigger = layoutRef.current;
    if (!root || !trigger) return;

    const ctx = gsap.context(() => {
      runBeforeAfterScrollReveal(
        trigger,
        {
          compareReveal: styles.mediaShellReveal,
          thumbReveal: styles.thumbReveal,
          controlsReveal: cardSliderStyles.controlsReveal,
          bookingReveal: styles.bookingReveal,
        },
        Boolean(prefersReducedMotion),
      );
    }, root);

    return () => ctx.revert();
  }, [locale, prefersReducedMotion]);

  const activeCatalog = getBeforeAfterTabCatalog(activeTab);
  const activeCategoryCopy = beforeAfter.categories[activeTab];
  const { booking } = beforeAfter;

  return (
    <section
      ref={sectionRef}
      id={BEFORE_AFTER_SECTION_ID}
      className={styles.section}
      aria-labelledby={`${BEFORE_AFTER_SECTION_ID}-title`}
      data-active-tab={activeTab}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id={`${BEFORE_AFTER_SECTION_ID}-title`} className={styles.title}>
            <span className={styles.titleStrong}>{beforeAfter.titleStrong}</span>
            <span className={styles.titleMuted}>{beforeAfter.titleMuted}</span>
          </h2>

          <Tabs
            items={tabItems}
            value={activeTab}
            onChange={handleTabChange}
            ariaLabel={pricing.tabsAriaLabel}
            theme="light"
            showNotch={false}
            className={styles.tabsBar}
          />
        </header>

        <div ref={layoutRef} className={styles.layout}>
          <div className={styles.sliderCol}>
            <div className={`${styles.mediaShell} ${styles.mediaShellReveal}`}>
              <CategoryMediaPanel
                tabId={activeTab}
                catalog={activeCatalog}
                categoryCopy={activeCategoryCopy}
                beforeAfter={beforeAfter}
                mounted={mounted}
              />
            </div>
          </div>

          <aside className={styles.cardCol}>
            <article className={`${styles.bookingCard} ${styles.bookingReveal}`}>
              <video
                ref={bookingVideoRef}
                className={styles.bookingVideo}
                src={BEFORE_AFTER_BOOKING_VIDEO}
                muted
                playsInline
                loop
                autoPlay
                preload="metadata"
                aria-hidden
              />
              <div className={styles.bookingReadability} aria-hidden />

              <div className={styles.bookingContent}>
                <p className={styles.bookingBrand}>rim/studio</p>

                <div className={styles.bookingCopy}>
                  <p className={styles.bookingEyebrow}>{booking.eyebrow}</p>
                  <h3 className={styles.bookingTitle}>
                    {booking.title}{" "}
                    <span className={styles.bookingTitleAccent}>
                      {booking.titleAccent}
                    </span>
                  </h3>
                  <p className={styles.bookingBody}>{booking.body}</p>
                </div>

                <Button
                  href={localizedPath(locale, booking.cta.href)}
                  variant="accent"
                  size="md"
                  expandFromIcon
                  icon={<CalendarCheck strokeWidth={1.75} aria-hidden />}
                  className={styles.bookingCta}
                >
                  {booking.cta.label}
                </Button>
              </div>
            </article>
          </aside>
        </div>
      </div>
    </section>
  );
}
