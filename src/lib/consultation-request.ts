import type { ConsultationSourceId } from "@/content/consultation-sources";
import { isPhoneOnlyConsultationSource } from "@/content/consultation-sources";
import type { ConsultationPageId } from "@/lib/consultation-lead-meta";
import type { Locale } from "@/i18n/types";

export function normalizePhoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function isValidConsultationPhone(phone: string): boolean {
  const digits = normalizePhoneDigits(phone);
  return digits.length >= 11 && digits.length <= 15;
}

export type SubmitConsultationInput = Readonly<{
  name: string;
  phone: string;
  source: ConsultationSourceId;
  page: ConsultationPageId;
  locale: Locale;
  marketingOptIn?: boolean;
}>;

export type SubmitConsultationResult =
  | Readonly<{ ok: true }>
  | Readonly<{ ok: false; reason: "network" | "server" }>;

export async function submitConsultationRequest(
  input: SubmitConsultationInput,
): Promise<SubmitConsultationResult> {
  const trimmedName = input.name.trim();
  const trimmedPhone = input.phone.trim();

  if (!isPhoneOnlyConsultationSource(input.source) && !trimmedName) {
    return { ok: false, reason: "server" };
  }

  if (!isValidConsultationPhone(trimmedPhone)) {
    return { ok: false, reason: "server" };
  }

  try {
    const response = await fetch("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: trimmedName,
        phone: trimmedPhone,
        source: input.source,
        page: input.page,
        locale: input.locale,
        marketingOptIn: input.marketingOptIn,
      }),
    });

    if (!response.ok) {
      return { ok: false, reason: "server" };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "network" };
  }
}
