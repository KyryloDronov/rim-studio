"use client";

import Image from "next/image";
import { getProcessStepImage } from "@/content/process-section";
import { ProcessStepTimerBadge } from "./ProcessStepTimerBadge";

import styles from "./style.module.css";

type ProcessStep = Readonly<{
  id: string;
  label: string;
  tagline: string;
  description: string;
  imageAlt: string;
}>;

type ProcessStepCardProps = Readonly<{
  step: ProcessStep;
  stepNumber: number;
  active: boolean;
  showTimerRing: boolean;
  timerCycleKey: string;
  onSelect: () => void;
}>;

function formatStepNumber(stepNumber: number): string {
  return String(stepNumber).padStart(2, "0");
}

export function ProcessStepCard({
  step,
  stepNumber,
  active,
  showTimerRing,
  timerCycleKey,
  onSelect,
}: ProcessStepCardProps) {
  const imageSrc = getProcessStepImage(step.id);

  return (
    <button
      type="button"
      className={styles.card}
      data-active={active ? "true" : "false"}
      aria-current={active ? "step" : undefined}
      onClick={onSelect}
    >
      <div className={styles.cardMedia}>
        <Image
          src={imageSrc}
          alt={step.imageAlt}
          fill
          sizes="(max-width: 991px) 92vw, (max-width: 1199px) 45vw, 22vw"
          className={styles.cardBg}
          draggable={false}
        />
        <div className={styles.cardMediaWash} aria-hidden />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardTop}>
          <header className={styles.cardHead}>
            <ProcessStepTimerBadge
              stepNumber={stepNumber}
              active={active}
              showTimerRing={showTimerRing}
              timerCycleKey={timerCycleKey}
              digit={formatStepNumber(stepNumber)}
            />
            <h3 className={styles.cardTitle}>{step.label}</h3>
          </header>
          <p className={styles.cardTagline}>{step.tagline}</p>
        </div>

        <div className={styles.cardBodyOverlay}>
          <p className={styles.cardBody}>{step.description}</p>
        </div>
      </div>
    </button>
  );
}
