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
  const notchRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const positionNotch = useCallback(() => {
    const root = rootRef.current;
    const notch = notchRef.current;
    const activeBtn = tabRefs.current.get(activeId);
    if (!root || !notch || !activeBtn) return;

    const rootRect = root.getBoundingClientRect();
    const tabRect = activeBtn.getBoundingClientRect();
    const left =
      tabRect.left -
      rootRect.left +
      (tabRect.width - notch.offsetWidth) / 2;

    notch.style.transform = `translate3d(${Math.round(left)}px, 0, 0) scaleY(-1)`;

    if (onNotchMetrics) {
      const anchorLeft =
        metricsAnchorRef?.current?.getBoundingClientRect().left ?? rootRect.left;
      onNotchMetrics({
        left: Math.round(rootRect.left - anchorLeft + left),
        width: notch.offsetWidth,
      });
    }
  }, [activeId, metricsAnchorRef, onNotchMetrics]);

  useLayoutEffect(() => {
    positionNotch();
  }, [positionNotch, items.length]);

  useEffect(() => {
    positionNotch();
    const root = rootRef.current;
    if (!root) return;

    const ro = new ResizeObserver(() => positionNotch());
    ro.observe(root);
    for (const btn of tabRefs.current.values()) {
      ro.observe(btn);
    }

    const anchor = metricsAnchorRef?.current;
    if (anchor) ro.observe(anchor);

    const onResize = () => positionNotch();
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [metricsAnchorRef, positionNotch]);

  if (items.length === 0) return null;

  const rootClass = [styles.tabs, className].filter(Boolean).join(" ");

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

      <div
        ref={notchRef}
        className={styles.notch}
        aria-hidden
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
      />

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
                <span className={styles.iconSlot}>
                  <span className={styles.icon} aria-hidden>
                    {item.icon}
                  </span>
                </span>
                <span className={styles.label}>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
