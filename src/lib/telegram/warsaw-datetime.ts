const WARSAW_TZ = "Europe/Warsaw";

type WarsawParts = Readonly<{
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}>;

function getWarsawParts(date: Date): WarsawParts {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: WARSAW_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const pick = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? "0");

  return {
    year: pick("year"),
    month: pick("month"),
    day: pick("day"),
    hour: pick("hour"),
    minute: pick("minute"),
  };
}

/** Wall-clock in Warsaw → UTC Date. */
export function dateAtWarsaw(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): Date {
  let guess = Date.UTC(year, month - 1, day, hour, minute, 0);
  for (let attempt = 0; attempt < 6; attempt++) {
    const parts = getWarsawParts(new Date(guess));
    const diffMinutes =
      (hour - parts.hour) * 60 +
      (minute - parts.minute) +
      (day - parts.day) * 24 * 60;
    if (diffMinutes === 0 && parts.month === month && parts.year === year) {
      return new Date(guess);
    }
    guess += diffMinutes * 60_000;
  }
  return new Date(guess);
}

export function addWarsawDays(base: Date, days: number): Date {
  const p = getWarsawParts(base);
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() + days);
  const p2 = getWarsawParts(d);
  return dateAtWarsaw(p2.year, p2.month, p2.day, p.hour, p.minute);
}

export function parseUserDateTimeWarsaw(
  input: string,
  now = new Date(),
): Date | null {
  const trimmed = input.trim().replace(/\s+/g, " ");
  const match =
    /^(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?\s+(\d{1,2}):(\d{2})$/.exec(trimmed);
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  let year = match[3] ? Number(match[3]) : getWarsawParts(now).year;
  if (year < 100) year += 2000;
  const hour = Number(match[4]);
  const minute = Number(match[5]);

  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    hour > 23 ||
    minute > 59
  ) {
    return null;
  }

  const date = dateAtWarsaw(year, month, day, hour, minute);
  if (date.getTime() < now.getTime() - 60_000) {
    return null;
  }
  return date;
}

export function formatWarsawDateTime(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: WARSAW_TZ,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
