"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { BeforeAfterCompare } from "@/components/BeforeAfterCompare";
import {
  GalleryLightbox,
  WorkGallery,
  type GalleryLightboxItem,
} from "@/components/WorkGallery";
import type {
  BeforeAfterCompareItem,
  BeforeAfterGalleryItem,
  BeforeAfterTabCatalog,
} from "@/content/before-after-catalog";
import type { PricingTabId } from "@/content/pricing-tabs";
import type { Dictionary } from "@/i18n/types";

import { MediaThumbStrip, type MediaThumbItem } from "./MediaThumbStrip";
import styles from "./style.module.css";

type CategoryCopy = Dictionary["beforeAfter"]["categories"][PricingTabId];

type CategoryMediaPanelProps = Readonly<{
  tabId: PricingTabId;
  catalog: BeforeAfterTabCatalog;
  categoryCopy: CategoryCopy;
  beforeAfter: Dictionary["beforeAfter"];
  mounted: boolean;
}>;

const MAIN_TRANSITION = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1] as const,
};

function useActiveItemId(
  tabId: PricingTabId,
  items: ReadonlyArray<{ id: string }>,
) {
  const [activeByTab, setActiveByTab] = useState<Record<string, string>>({});

  const activeId =
    activeByTab[tabId] ?? items[0]?.id ?? "";

  const setActiveId = (id: string) => {
    setActiveByTab((prev) => ({ ...prev, [tabId]: id }));
  };

  useEffect(() => {
    if (!items.some((item) => item.id === activeId) && items[0]) {
      setActiveByTab((prev) => ({ ...prev, [tabId]: items[0].id }));
    }
  }, [activeId, items, tabId]);

  return { activeId, setActiveId };
}

function CompareMain({
  items,
  categoryCopy,
  beforeAfter,
  activeId,
}: Readonly<{
  items: ReadonlyArray<BeforeAfterCompareItem>;
  categoryCopy: CategoryCopy;
  beforeAfter: Dictionary["beforeAfter"];
  activeId: string;
}>) {
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];
  if (!activeItem || !categoryCopy.compareFallback) return null;

  const { beforeAlt, afterAlt } = categoryCopy.compareFallback;

  return (
    <BeforeAfterCompare
      beforeSrc={activeItem.beforeSrc}
      afterSrc={activeItem.afterSrc}
      beforeLabel={beforeAfter.beforeLabel}
      afterLabel={beforeAfter.afterLabel}
      beforeAlt={beforeAlt}
      afterAlt={afterAlt}
    />
  );
}

function GalleryMain({
  items,
  categoryCopy,
  beforeAfter,
  activeId,
  onOpenLightbox,
}: Readonly<{
  items: ReadonlyArray<BeforeAfterGalleryItem>;
  categoryCopy: CategoryCopy;
  beforeAfter: Dictionary["beforeAfter"];
  activeId: string;
  onOpenLightbox: () => void;
}>) {
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];
  const activeIndex = items.findIndex((item) => item.id === activeId);

  if (!activeItem || !categoryCopy.galleryFallback) return null;

  const counterLabel = beforeAfter.galleryCounter
    .replace("{current}", String(activeIndex + 1))
    .replace("{total}", String(items.length));

  return (
    <WorkGallery
      src={activeItem.src}
      alt={categoryCopy.galleryFallback.alt}
      counterLabel={counterLabel}
      openLabel={beforeAfter.galleryOpenLabel}
      onOpenLightbox={onOpenLightbox}
    />
  );
}

export function CategoryMediaPanel({
  tabId,
  catalog,
  categoryCopy,
  beforeAfter,
  mounted,
}: CategoryMediaPanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const isGallery = catalog.mode === "gallery" && Boolean(catalog.gallery?.length);
  const compareItems = catalog.compare ?? [];
  const galleryItems = catalog.gallery ?? [];
  const items = isGallery ? galleryItems : compareItems;

  const { activeId, setActiveId } = useActiveItemId(tabId, items);

  useEffect(() => {
    setLightboxOpen(false);
  }, [tabId]);

  const thumbs = useMemo<ReadonlyArray<MediaThumbItem>>(() => {
    if (isGallery) {
      return galleryItems.map((item) => ({
        id: item.id,
        thumbSrc: item.src,
        thumbAlt:
          categoryCopy.galleryFallback?.thumbAlt ?? beforeAfter.thumbAltFallback,
      }));
    }

    return compareItems.map((item) => ({
      id: item.id,
      thumbSrc: item.afterSrc,
      thumbAlt:
        categoryCopy.compareFallback?.thumbAlt ?? beforeAfter.thumbAltFallback,
    }));
  }, [
    beforeAfter.thumbAltFallback,
    categoryCopy.compareFallback?.thumbAlt,
    categoryCopy.galleryFallback?.thumbAlt,
    compareItems,
    galleryItems,
    isGallery,
  ]);

  const lightboxItems = useMemo<ReadonlyArray<GalleryLightboxItem>>(() => {
    if (!isGallery || !categoryCopy.galleryFallback) return [];

    const { alt, thumbAlt } = categoryCopy.galleryFallback;
    return galleryItems.map((item) => ({
      id: item.id,
      src: item.src,
      alt,
      thumbAlt,
    }));
  }, [categoryCopy.galleryFallback, galleryItems, isGallery]);

  const activeIndex = galleryItems.findIndex((item) => item.id === activeId);
  const lightboxCounter = beforeAfter.galleryCounter
    .replace("{current}", String(activeIndex + 1))
    .replace("{total}", String(galleryItems.length));

  if (!items.length) return null;

  return (
    <div className={styles.mediaStack}>
      <div className={styles.mediaViewport}>
        <AnimatePresence initial={false}>
          <motion.div
            key={tabId}
            className={styles.mediaMainLayer}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : MAIN_TRANSITION
            }
          >
            <div className={styles.compareWrap}>
              {isGallery ? (
                <GalleryMain
                  items={galleryItems}
                  categoryCopy={categoryCopy}
                  beforeAfter={beforeAfter}
                  activeId={activeId}
                  onOpenLightbox={() => setLightboxOpen(true)}
                />
              ) : (
                <CompareMain
                  items={compareItems}
                  categoryCopy={categoryCopy}
                  beforeAfter={beforeAfter}
                  activeId={activeId}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        key={`${tabId}-thumbs`}
        className={styles.thumbSlot}
        initial={prefersReducedMotion ? false : { opacity: 0.72 }}
        animate={{ opacity: 1 }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 0.24, delay: 0.04 }
        }
      >
        <MediaThumbStrip
          items={thumbs}
          activeId={activeId}
          onSelect={setActiveId}
          ariaLabel={categoryCopy.thumbsAriaLabel}
          prevLabel={beforeAfter.prevLabel}
          nextLabel={beforeAfter.nextLabel}
          mounted={mounted}
        />
      </motion.div>

      {isGallery ? (
        <GalleryLightbox
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          items={lightboxItems}
          activeIndex={Math.max(activeIndex, 0)}
          onActiveIndexChange={(index) => {
            const next = galleryItems[index];
            if (next) setActiveId(next.id);
          }}
          closeLabel={beforeAfter.galleryCloseLabel}
          prevLabel={beforeAfter.prevLabel}
          nextLabel={beforeAfter.nextLabel}
          counterLabel={lightboxCounter}
        />
      ) : null}
    </div>
  );
}
