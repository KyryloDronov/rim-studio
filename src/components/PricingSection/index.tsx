"use client";

import gsap from "gsap";
import {
  CircleDot,
  Layers,
  Paintbrush,
  Wrench,
} from "lucide-react";
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
import { useLocale } from "@/i18n/LocaleProvider";
import type { Dictionary } from "@/i18n/types";

import styles from "./style.module.css";

/** Anchor id — hero scroll hint targets this section. */
export const PRICING_SECTION_ID = "pricing";

type PricingTabId = keyof Dictionary["pricing"]["panels"];

const TAB_ORDER: ReadonlyArray<PricingTabId> = [
  "paint",
  "repair",
  "tire",
  "finish",
];

const TAB_ICONS = {
  paint: Paintbrush,
  repair: Wrench,
  tire: CircleDot,
  finish: Layers,
} as const;

export function PricingSection() {
  const { t } = useLocale();
  const { pricing } = t;
  const prefersReducedMotion = useReducedMotion();
  const tableNotchClipId = useId().replaceAll(":", "");
  const panelRef = useRef<HTMLDivElement>(null);
  const blurTweenRef = useRef<gsap.core.Tween | null>(null);
  const [notchMetrics, setNotchMetrics] = useState<TabNotchMetrics>({
    left: 0,
    width: 0,
  });
  const [activeTab, setActiveTab] = useState<PricingTabId>("paint");
  const [tableEnterDone, setTableEnterDone] = useState(true);
  const [bgBlurPx, setBgBlurPx] = useState(PRICING_BLUR_REST_PX);
  const [bgWash, setBgWash] = useState(PRICING_WASH_REST);
  const [tableEnterDelay, setTableEnterDelay] = useState(0);

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
      TAB_ORDER.map((id) => {
        const Icon = TAB_ICONS[id];
        return {
          id,
          label: pricing.panels[id].tabLabel,
          icon: <Icon strokeWidth={1.75} />,
        };
      }),
    [pricing.panels],
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
            } satisfies CSSProperties
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
