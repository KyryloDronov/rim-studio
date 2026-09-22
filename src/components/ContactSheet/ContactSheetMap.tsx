"use client";

import { StudioMap } from "@/components/StudioMap";

import styles from "./style.module.css";

type ContactSheetMapProps = Readonly<{
  active: boolean;
  ariaLabel: string;
}>;

export function ContactSheetMap({ active, ariaLabel }: ContactSheetMapProps) {
  return (
    <div className={styles.mapShell} aria-label={ariaLabel}>
      <StudioMap active={active} ariaLabel={ariaLabel} className={styles.mapFill} />
      <div className={styles.mapVignette} aria-hidden="true" />
    </div>
  );
}
