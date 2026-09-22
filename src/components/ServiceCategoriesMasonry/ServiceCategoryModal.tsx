"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/Modal";
import type { ShowcaseServiceCard } from "@/content/showcase-services";

import styles from "./modal.module.css";

type ServiceCategoryModalProps = Readonly<{
  card: ShowcaseServiceCard | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closeLabel: string;
  placeholder: string;
}>;

export function ServiceCategoryModal({
  card,
  open,
  onOpenChange,
  closeLabel,
  placeholder,
}: ServiceCategoryModalProps) {
  const [snapshot, setSnapshot] = useState<ShowcaseServiceCard | null>(null);

  useEffect(() => {
    if (card) setSnapshot(card);
  }, [card]);

  const display = card ?? snapshot;
  if (!display && !open) return null;
  if (!display) return null;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      closeLabel={closeLabel}
      title={display.title}
      description={display.category}
      panelClassName={styles.panel}
    >
      <p className={styles.placeholder}>{placeholder}</p>
    </Modal>
  );
}
