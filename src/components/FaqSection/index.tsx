"use client";

import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { runFaqScrollReveal } from "@/animations";
import { getServiceFaqItems } from "@/content/service-faq";
import type { PageServiceKey } from "@/content/site-pages";
import { useLocale } from "@/i18n/LocaleProvider";
import { FaqAccordionItem } from "./FaqAccordionItem";
import { FaqJsonLd } from "./FaqJsonLd";

import styles from "./style.module.css";

export const FAQ_SECTION_ID = "faq";

const REVEAL_CLASSES = {
  itemReveal: styles.itemReveal,
} as const;

type FaqSectionProps = Readonly<{
  pageKey: PageServiceKey;
}>;

export function FaqSection({ pageKey }: FaqSectionProps) {
  const { locale, t } = useLocale();
  const { faq } = t;
  const items = getServiceFaqItems(locale, pageKey);
  const listAriaLabel = faq.listAriaLabel.replace(
    "{service}",
    t.pages.services[pageKey].title,
  );
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    const trigger = listRef.current;
    if (!root || !trigger) return;

    const ctx = gsap.context(() => {
      runFaqScrollReveal(trigger, REVEAL_CLASSES, Boolean(prefersReducedMotion));
    }, root);

    return () => ctx.revert();
  }, [items.length, prefersReducedMotion]);

  if (!items.length) return null;

  return (
    <section
      ref={sectionRef}
      id={FAQ_SECTION_ID}
      className={styles.section}
      aria-label={listAriaLabel}
    >
      <FaqJsonLd items={items} />
      <div className={styles.inner}>
        <div ref={listRef} className={styles.list} role="list">
          {items.map((item) => (
            <FaqAccordionItem
              key={item.id}
              item={item}
              open={openId === item.id}
              className={styles.itemReveal}
              onToggle={() =>
                setOpenId((prev) => (prev === item.id ? null : item.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
