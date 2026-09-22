"use client";

import Image from "next/image";
import { getProcessStepImage } from "@/content/process-section";
import { ProcessStepTimerBadge } from "./ProcessStepTimerBadge";

import styles from "./style.module.css";

type ProcessStep = Readonly<{
  id: string;
  label: string;
  description: string;
}>;

type ProcessExpandableCardProps = Readonly<{
  step: ProcessStep;
  stepNumber: number;
  active: boolean;
  showTimerRing: boolean;
  timerCycleKey: string;
  onToggle: () => void;
}>;

export function ProcessExpandableCard({
  step,
  stepNumber,
  active,
  showTimerRing,
  timerCycleKey,
  onToggle,
}: ProcessExpandableCardProps) {
  const imageSrc = getProcessStepImage(step.id);

  return (
    <button
      type="button"
      className={styles.card}
      data-active={active ? "true" : "false"}
      aria-expanded={active}
      onClick={onToggle}
    >
      <ProcessStepTimerBadge
        stepNumber={stepNumber}
        active={active}
        showTimerRing={showTimerRing}
        timerCycleKey={timerCycleKey}
      />

      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="(max-width: 767px) 270px, 22vw"
        className={styles.cardMedia}
        draggable={false}
      />
      <div className={styles.cardScrim} aria-hidden />
      <div className={styles.cardDesc}>
        <h3 className={styles.cardTitle}>{step.label}</h3>
        <p className={styles.cardBody}>{step.description}</p>
      </div>
    </button>
  );
}
