import {
  STUDIO_EMAIL,
  STUDIO_PHONE_DISPLAY,
} from "@/content/studio-location";

/**
 * Dane prawne administratora — uzupełnij zgodnie z docs/DANE_PRAWNE.md
 * (KRS, NIP, pełny adres siedziby).
 */
export const LEGAL_ENTITY = {
  brandName: "Rim Studio",
  companyName: "Rim Studio Sp. z o.o.",
  email: STUDIO_EMAIL,
  phone: STUDIO_PHONE_DISPLAY,
  city: "Warszawa",
  country: "Polska",
  /** Pełny adres siedziby (ulica, kod, miasto). */
  registeredAddress: "Warszawa, Polska — adres siedziby do uzupełnienia",
  nip: "0000000000",
  krs: "0000000000",
  regon: "000000000",
} as const;

export type LegalPlaceholderKey = keyof typeof LEGAL_PLACEHOLDER_MAP;

const LEGAL_PLACEHOLDER_MAP = {
  brandName: LEGAL_ENTITY.brandName,
  companyName: LEGAL_ENTITY.companyName,
  email: LEGAL_ENTITY.email,
  phone: LEGAL_ENTITY.phone,
  city: LEGAL_ENTITY.city,
  country: LEGAL_ENTITY.country,
  registeredAddress: LEGAL_ENTITY.registeredAddress,
  nip: LEGAL_ENTITY.nip,
  krs: LEGAL_ENTITY.krs,
  regon: LEGAL_ENTITY.regon,
} as const;

/** Podstawia `{{klucz}}` w tekstach polityki / regulaminu. */
export function fillLegalPlaceholders(text: string): string {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key: string) => {
    const value = LEGAL_PLACEHOLDER_MAP[key as LegalPlaceholderKey];
    return value ?? match;
  });
}
