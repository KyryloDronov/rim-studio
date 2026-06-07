import type { Dictionary, Locale } from "../types";
import { pl } from "./pl";
import { ru } from "./ru";

export const dictionaries: Record<Locale, Dictionary> = { ru, pl };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
