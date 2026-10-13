"use client";

import { ChevronDown } from "lucide-react";
import { useId } from "react";
import type { ServiceFaqItem } from "@/content/service-faq";

import styles from "./style.module.css";

type FaqAccordionItemProps = Readonly<{
  item: ServiceFaqItem;
  open: boolean;
  onToggle: () => void;
  className?: string;
}>;

export function FaqAccordionItem({
  item,
  open,
  onToggle,
  className,
}: FaqAccordionItemProps) {
  const reactId = useId();
  const panelId = `${reactId}-panel`;
  const triggerId = `${reactId}-trigger`;

  return (
    <article
      className={[styles.item, open ? styles.itemOpen : "", className]
        .filter(Boolean)
        .join(" ")}
      data-open={open ? "true" : "false"}
    >
      <h3 className={styles.itemHeading}>
        <button
          type="button"
          id={triggerId}
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className={styles.question}>{item.question}</span>
          <span className={styles.chevronWrap} aria-hidden>
            <ChevronDown className={styles.chevron} strokeWidth={1.75} />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!open}
        className={styles.panel}
      >
        <div className={styles.panelInner}>
          <p className={styles.answer}>{item.answer}</p>
        </div>
      </div>
    </article>
  );
}
