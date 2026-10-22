"use client";

import { Send } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/Button";

import styles from "./formSuccessState.module.css";

type FormSuccessStateProps = Readonly<{
  title: string;
  body: string;
  sendAgainLabel: string;
  onSendAgain: () => void;
  className?: string;
  titleClassName?: string;
  bodyClassName?: string;
  /** Optional extra content above the button (e.g. motion wrapper). */
  children?: ReactNode;
}>;

export function FormSuccessState({
  title,
  body,
  sendAgainLabel,
  onSendAgain,
  className,
  titleClassName,
  bodyClassName,
  children,
}: FormSuccessStateProps) {
  const rootClass = [styles.root, className].filter(Boolean).join(" ");
  const titleClass = [styles.title, titleClassName].filter(Boolean).join(" ");
  const bodyClass = [styles.body, bodyClassName].filter(Boolean).join(" ");

  return (
    <div className={rootClass} role="status">
      <p className={titleClass}>{title}</p>
      <p className={bodyClass}>{body}</p>
      {children}
      <Button
        type="button"
        variant="accent"
        size="md"
        expandFromIcon
        expandWhen
        className={styles.sendAgain}
        icon={<Send strokeWidth={1.75} aria-hidden />}
        onClick={onSendAgain}
      >
        {sendAgainLabel}
      </Button>
    </div>
  );
}
