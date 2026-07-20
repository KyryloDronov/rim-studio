import type { InputHTMLAttributes } from "react";

import styles from "./style.module.css";

type TextInputProps = Readonly<
  InputHTMLAttributes<HTMLInputElement> & {
    invalid?: boolean;
  }
>;

export function TextInput({
  invalid,
  className,
  ...props
}: TextInputProps) {
  return (
    <input
      {...props}
      className={[
        styles.input,
        invalid ? styles.inputInvalid : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
