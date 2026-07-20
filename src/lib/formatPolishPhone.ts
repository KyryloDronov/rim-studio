export const PL_PHONE_PREFIX = "+48 ";

export function formatPolishPhoneInput(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  const national = digits.startsWith("48") ? digits.slice(2, 11) : digits.slice(0, 9);

  if (national.length === 0) {
    return raw.trim().length === 0 ? "" : PL_PHONE_PREFIX;
  }

  const chunks = [
    national.slice(0, 3),
    national.slice(3, 6),
    national.slice(6, 9),
  ].filter(Boolean);

  return `${PL_PHONE_PREFIX}${chunks.join(" ")}`;
}
