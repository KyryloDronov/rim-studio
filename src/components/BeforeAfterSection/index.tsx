"use client";

import gsap from "gsap";
import { CalendarCheck } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { runBeforeAfterScrollReveal } from "@/animations";
import { Button } from "@/components/Button";
import { useConsultation } from "@/components/Consultation/ConsultationContext";
import cardSliderStyles from "@/components/CardSlider/style.module.css";
import { Tabs, type TabItem } from "@/components/Tabs";
import { getBeforeAfterTabCatalog } from "@/content/before-after-catalog";
import {
  PRICING_TAB_ICONS,
  resolveBeforeAfterActiveTab,
  resolveBeforeAfterTabOrder,
  type PricingTabId,
} from "@/content/pricing-tabs";
import { useLocale } from "@/i18n/LocaleProvider";
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
  featuredTab = "caliper",
}: BeforeAfterSectionProps) {
  const { locale, t } = useLocale();
  const { beforeAfter, pricing } = t;
  const { openConsultation } = useConsultation();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const tabOrder = useMemo(
    () => resolveBeforeAfterTabOrder(featuredTab),
    [featuredTab],
  );
  const [activeTab, setActiveTab] = useState<PricingTabId>(() =>
    resolveBeforeAfterActiveTab(featuredTab),
  );

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
    setActiveTab(resolveBeforeAfterActiveTab(featuredTab));
  }, [featuredTab]);

  useEffect(() => {
    setMounted(true);
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
              <div className={styles.bookingAmbient} aria-hidden>
                <div className={styles.bookingAmbientBase} />
                <div className={styles.bookingOrbA} />
                <div className={styles.bookingOrbB} />
                <div className={styles.bookingOrbC} />
                <div className={styles.bookingAmbientShine} />
              </div>
              <div className={styles.bookingReadability} aria-hidden />

              <div className={styles.bookingContent}>
                <p className={styles.bookingBrand}>Rim Studio</p>

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
                  type="button"
                  variant="accent"
                  size="md"
                  expandFromIcon
                  expandWhen
                  icon={<CalendarCheck strokeWidth={1.75} aria-hidden />}
                  className={styles.bookingCta}
                  onClick={() => openConsultation("beforeAfter")}
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
