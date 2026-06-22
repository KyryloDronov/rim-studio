"use client";

import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { PricingTable } from "@/components/PricingTable";
import { PricingTabBackground } from "@/components/PricingSection/PricingTabBackground";
import {
  PRICING_BLUR_PEAK_PX,
  PRICING_BLUR_REST_PX,
  PRICING_BLUR_SETTLE_S,
  PRICING_REVEAL_DELAY_S,
  PRICING_WASH_PEAK,
  PRICING_WASH_REST,
} from "@/components/PricingSection/pricingTransition";
import { PricingTableNotch } from "@/components/PricingSection/PricingTableNotch";
import {
  TAB_NOTCH_CLIP_PATH,
  TAB_NOTCH_CLIP_TRANSFORM,
  TAB_NOTCH_HEIGHT,
  TAB_NOTCH_WIDTH,
} from "@/components/Tabs/notch";
import { Tabs, type TabItem, type TabNotchMetrics } from "@/components/Tabs";
import {
  PRICING_TAB_ICONS,
  preloadPricingTabBackground,
  resolvePricingTabOrder,
  type PricingTabId,
} from "@/content/pricing-tabs";
import { useLocale } from "@/i18n/LocaleProvider";

import styles from "./style.module.css";

/** Anchor id — hero scroll hint targets this section. */
export const PRICING_SECTION_ID = "pricing";

export type PricingSectionProps = Readonly<{
  /**
   * Tab placed first and selected on mount — use on service pages so
   * the relevant price list leads the bar.
   */
  featuredTab?: PricingTabId;
}>;

export function PricingSection({ featuredTab = "paint" }: PricingSectionProps) {
  const { t } = useLocale();
  const { pricing } = t;
  const prefersReducedMotion = useReducedMotion();
  const tableNotchClipId = useId().replaceAll(":", "");
  const panelRef = useRef<HTMLDivElement>(null);
  const blurTweenRef = useRef<gsap.core.Tween | null>(null);
  const tabOrder = useMemo(
    () => resolvePricingTabOrder(featuredTab),
    [featuredTab],
  );
  const [notchMetrics, setNotchMetrics] = useState<TabNotchMetrics>({
    left: 0,
    width: 0,
  });
  const [activeTab, setActiveTab] = useState<PricingTabId>(featuredTab);
  const [tableEnterDone, setTableEnterDone] = useState(true);
  const [bgBlurPx, setBgBlurPx] = useState(PRICING_BLUR_REST_PX);
  const [bgWash, setBgWash] = useState(PRICING_WASH_REST);
  const [tableEnterDelay, setTableEnterDelay] = useState(0);

  useEffect(() => {
    setActiveTab(featuredTab);
  }, [featuredTab]);

  const handleNotchMetrics = useCallback((metrics: TabNotchMetrics) => {
    setNotchMetrics(metrics);
  }, []);

  const runBlurReveal = useCallback(() => {
    blurTweenRef.current?.kill();

    if (prefersReducedMotion) {
      setBgBlurPx(PRICING_BLUR_REST_PX);
      setBgWash(PRICING_WASH_REST);
      setTableEnterDelay(0);
      return;
    }

    setTableEnterDelay(PRICING_REVEAL_DELAY_S);

    const state = { blur: PRICING_BLUR_PEAK_PX, wash: PRICING_WASH_PEAK };
    setBgBlurPx(state.blur);
    setBgWash(state.wash);

    blurTweenRef.current = gsap.to(state, {
      blur: PRICING_BLUR_REST_PX,
      wash: PRICING_WASH_REST,
      duration: PRICING_BLUR_SETTLE_S,
      delay: PRICING_REVEAL_DELAY_S,
      ease: "power2.out",
      onUpdate: () => {
        setBgBlurPx(state.blur);
        setBgWash(state.wash);
      },
    });
  }, [prefersReducedMotion]);

  const handleTabChange = useCallback(
    (id: string) => {
      const next = id as PricingTabId;
      if (next === activeTab) {
        return;
      }

      preloadPricingTabBackground(next);
      setTableEnterDone(false);
      setActiveTab(next);
      runBlurReveal();
    },
    [activeTab, runBlurReveal],
  );

  const handleTableEnterComplete = useCallback(() => {
    setTableEnterDone(true);
  }, []);

  useEffect(
    () => () => {
      blurTweenRef.current?.kill();
    },
    [],
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

  const activePanel = pricing.panels[activeTab];

  return (
    <section
      id={PRICING_SECTION_ID}
      className={styles.section}
      aria-label={pricing.tabsAriaLabel}
      data-active-tab={activeTab}
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
    >
      <PricingTabBackground
        activeTab={activeTab}
        blurPx={bgBlurPx}
        washAlpha={bgWash}
      />

      <div className={styles.inner}>
        <div
          ref={panelRef}
          className={styles.panel}
          style={
            {
              "--tabs-notch-width": TAB_NOTCH_WIDTH,
              "--tabs-notch-height": TAB_NOTCH_HEIGHT,
              "--table-notch-height": `calc(${TAB_NOTCH_HEIGHT} / 3)`,
            } as CSSProperties
          }
        >
          <Tabs
            items={tabItems}
            value={activeTab}
            onChange={handleTabChange}
            ariaLabel={pricing.tabsAriaLabel}
            className={styles.tabsBar}
            metricsAnchorRef={panelRef}
            onNotchMetrics={handleNotchMetrics}
          />

          <div className={styles.tableStack}>
            <svg className={styles.clipResource} aria-hidden width={0} height={0}>
              <defs>
                <clipPath
                  id={tableNotchClipId}
                  clipPathUnits="objectBoundingBox"
                  transform={TAB_NOTCH_CLIP_TRANSFORM}
                >
                  <path d={TAB_NOTCH_CLIP_PATH} />
                </clipPath>
              </defs>
            </svg>

            <PricingTableNotch
              activeTab={activeTab}
              clipId={tableNotchClipId}
              metrics={notchMetrics}
              ready={tableEnterDone}
            />

            <PricingTable
              data={activePanel.table}
              panelKey={activeTab}
              enterDelay={tableEnterDelay}
              className={styles.tableArea}
              scrollClassName={styles.tableScroll}
              onEnterComplete={handleTableEnterComplete}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
