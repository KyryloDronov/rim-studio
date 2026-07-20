import type { TextareaHTMLAttributes } from "react";

import styles from "./style.module.css";

type TextAreaProps = Readonly<
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    invalid?: boolean;
  }
>;

export function TextArea({
  invalid,
  className,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={[
        styles.textarea,
        invalid ? styles.textareaInvalid : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
