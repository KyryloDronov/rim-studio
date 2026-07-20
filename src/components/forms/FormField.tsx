import type { ReactNode } from "react";

import styles from "./style.module.css";

type FormFieldProps = Readonly<{
  id: string;
  label: ReactNode;
  optional?: boolean;
  optionalLabel?: string;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
}>;

export function FormField({
  id,
  label,
  optional,
  optionalLabel,
  hint,
  error,
  children,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {optional && optionalLabel ? (
          <span className={styles.optional}> {optionalLabel}</span>
        ) : null}
      </label>

      {children}

      {hint ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function fieldDescribedBy(
  id: string,
  hint?: boolean,
  error?: boolean,
): string | undefined {
  const parts = [
    hint ? `${id}-hint` : undefined,
    error ? `${id}-error` : undefined,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" ") : undefined;
}
