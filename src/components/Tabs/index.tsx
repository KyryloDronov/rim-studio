"use client";

import { useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import styles from "./style.module.css";
import {
  TAB_NOTCH_CLIP_PATH,
  TAB_NOTCH_CLIP_TRANSFORM,
} from "./notch";
import type { TabItem, TabsProps } from "./types";

export type { TabItem, TabNotchMetrics, TabsProps } from "./types";

function useControllableTab(
  items: ReadonlyArray<TabItem>,
  value: string | undefined,
  defaultValue: string | undefined,
  onChange: TabsProps["onChange"],
) {
  const fallback = defaultValue ?? items[0]?.id ?? "";
  const [internal, setInternal] = useState(fallback);
  const activeId = value ?? internal;

  const setActiveId = useCallback(
    (next: string) => {
      if (value === undefined) setInternal(next);
      onChange?.(next);
    },
    [onChange, value],
  );

  return { activeId, setActiveId };
}

export function Tabs({
  items,
  value,
  defaultValue,
  onChange,
  className,
  ariaLabel = "Tabs",
  theme = "dark",
  showNotch = true,
  metricsAnchorRef,
  onNotchMetrics,
}: TabsProps) {
  const reactId = useId();
  const clipId = `tabs-notch-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const prefersReducedMotion = useReducedMotion();

  const { activeId, setActiveId } = useControllableTab(
    items,
    value,
    defaultValue,
    onChange,
  );

  const rootRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const notchRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const scrollActiveTabIntoView = useCallback(() => {
    const scrollEl = scrollRef.current;
    const activeBtn = tabRefs.current.get(activeId);
    if (!scrollEl || !activeBtn) return;

    const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
    if (maxScroll <= 0) return;

    const scrollRect = scrollEl.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const relativeLeft =
      btnRect.left - scrollRect.left + scrollEl.scrollLeft;
    const target =
      relativeLeft - (scrollEl.clientWidth - btnRect.width) / 2;

    scrollEl.scrollTo({
      left: Math.max(0, Math.min(target, maxScroll)),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [activeId, prefersReducedMotion]);

  const positionNotch = useCallback(() => {
    if (!showNotch) return;

    const root = rootRef.current;
    const notch = notchRef.current;
    const activeBtn = tabRefs.current.get(activeId);
    if (!root || !notch || !activeBtn) return;

    const rootRect = root.getBoundingClientRect();
    const iconSlot = activeBtn.querySelector<HTMLElement>("[data-tab-icon-slot]");
    const anchorRect = iconSlot?.getBoundingClientRect() ?? activeBtn.getBoundingClientRect();
    const left =
      anchorRect.left -
      rootRect.left +
      (anchorRect.width - notch.offsetWidth) / 2;

    notch.style.transform = `translate3d(${Math.round(left)}px, 0, 0) scaleY(-1)`;

    if (onNotchMetrics) {
      const anchorLeft =
        metricsAnchorRef?.current?.getBoundingClientRect().left ?? rootRect.left;
      onNotchMetrics({
        left: Math.round(rootRect.left - anchorLeft + left),
        width: notch.offsetWidth,
      });
    }
  }, [activeId, metricsAnchorRef, onNotchMetrics, showNotch]);

  useLayoutEffect(() => {
    positionNotch();
    scrollActiveTabIntoView();
  }, [positionNotch, scrollActiveTabIntoView, items.length]);

  useEffect(() => {
    positionNotch();
    const root = rootRef.current;
    const scrollEl = scrollRef.current;
    if (!root) return;

    const ro = new ResizeObserver(() => positionNotch());
    ro.observe(root);
    if (scrollEl) ro.observe(scrollEl);
    for (const btn of tabRefs.current.values()) {
      ro.observe(btn);
    }

    const anchor = metricsAnchorRef?.current;
    if (anchor) ro.observe(anchor);

    const onResize = () => positionNotch();
    const onScroll = () => positionNotch();

    window.addEventListener("resize", onResize);
    scrollEl?.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      scrollEl?.removeEventListener("scroll", onScroll);
    };
  }, [metricsAnchorRef, positionNotch]);

  if (items.length === 0) return null;

  const rootClass = [
    styles.tabs,
    theme === "light" ? styles.tabsLight : null,
    showNotch ? null : styles.tabsNoNotch,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav
      ref={rootRef}
      className={rootClass}
      aria-label={ariaLabel}
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
    >
      <svg className={styles.clipResource} aria-hidden width={0} height={0}>
        <defs>
          <clipPath
            id={clipId}
            clipPathUnits="objectBoundingBox"
            transform={TAB_NOTCH_CLIP_TRANSFORM}
          >
            <path d={TAB_NOTCH_CLIP_PATH} />
          </clipPath>
        </defs>
      </svg>

      {showNotch ? (
        <div
          ref={notchRef}
          className={styles.notch}
          aria-hidden
          style={{
            clipPath: `url(#${clipId})`,
            WebkitClipPath: `url(#${clipId})`,
          }}
        />
      ) : null}

      <div
        ref={scrollRef}
        className={styles.scrollViewport}
        data-lenis-prevent-horizontal
      >
        <ul className={styles.list} role="tablist">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id} className={styles.item} role="presentation">
                <button
                  ref={(el) => {
                    if (el) tabRefs.current.set(item.id, el);
                    else tabRefs.current.delete(item.id);
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${item.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={styles.tab}
                  data-active={isActive ? "true" : "false"}
                  onClick={() => {
                    if (item.id === activeId) return;
                    setActiveId(item.id);
                  }}
                >
                  <span className={styles.iconSlot} data-tab-icon-slot>
                    <span className={styles.icon} aria-hidden>
                      {item.icon}
                    </span>
                  </span>
                  <span className={styles.label}>
                    {item.labelLines ? (
                      <>
                        <span className={styles.labelLine}>
                          {item.labelLines[0]}
                        </span>
                        <span className={styles.labelLine}>
                          {item.labelLines[1]}
                        </span>
                      </>
                    ) : (
                      item.label
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
