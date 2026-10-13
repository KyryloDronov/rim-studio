import {
  addWarsawDays,
  dateAtWarsaw,
  formatWarsawDateTime,
} from "@/lib/telegram/warsaw-datetime";

export const SCHEDULE_CALLBACK = {
  visitMenu: "ls:sc:vm",
  callbackMenu: "ls:sc:cm",
  back: "ls:sc:back",
  visitManual: "ls:sc:vmn",
  callbackManual: "ls:sc:cmn",
  visitPreset: (id: string) => `ls:sc:v:${id}`,
  callbackPreset: (id: string) => `ls:sc:c:${id}`,
} as const;

type PresetOption = Readonly<{
  id: string;
  label: string;
  resolve: (now: Date) => Date;
}>;

function warsawNow(): Date {
  return new Date();
}

function tomorrowAt(hour: number, minute: number): (now: Date) => Date {
  return (now) => {
    const d = addWarsawDays(now, 1);
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Warsaw",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(d)
      .reduce<Record<string, string>>((acc, p) => {
        if (p.type !== "literal") acc[p.type] = p.value;
        return acc;
      }, {});
    return dateAtWarsaw(
      Number(parts.year),
      Number(parts.month),
      Number(parts.day),
      hour,
      minute,
    );
  };
}

function inHours(hours: number): (now: Date) => Date {
  return (now) => new Date(now.getTime() + hours * 60 * 60_000);
}

export const VISIT_PRESETS: ReadonlyArray<PresetOption> = [
  {
    id: "t18",
    label: "Сегодня 18:00",
    resolve: (now) => {
      const p = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Warsaw",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).formatToParts(now);
      const pick = (t: string) =>
        Number(p.find((x) => x.type === t)?.value ?? "0");
      return dateAtWarsaw(pick("year"), pick("month"), pick("day"), 18, 0);
    },
  },
  { id: "tm10", label: "Завтра 10:00", resolve: tomorrowAt(10, 0) },
  { id: "tm15", label: "Завтра 15:00", resolve: tomorrowAt(15, 0) },
];

export const CALLBACK_PRESETS: ReadonlyArray<PresetOption> = [
  { id: "2h", label: "Через 2 часа", resolve: inHours(2) },
  { id: "tm10", label: "Завтра 10:00", resolve: tomorrowAt(10, 0) },
  { id: "tm18", label: "Завтра 18:00", resolve: tomorrowAt(18, 0) },
];

export function resolvePreset(
  data: string | undefined,
  now = warsawNow(),
): { kind: "visit" | "callback"; when: Date } | null {
  if (!data?.startsWith("ls:sc:")) return null;
  const visitMatch = /^ls:sc:v:(.+)$/.exec(data);
  if (visitMatch) {
    const preset = VISIT_PRESETS.find((p) => p.id === visitMatch[1]);
    if (!preset) return null;
    return { kind: "visit", when: preset.resolve(now) };
  }
  const callbackMatch = /^ls:sc:c:(.+)$/.exec(data);
  if (callbackMatch) {
    const preset = CALLBACK_PRESETS.find((p) => p.id === callbackMatch[1]);
    if (!preset) return null;
    return { kind: "callback", when: preset.resolve(now) };
  }
  return null;
}

export function presetLabelForDate(when: Date): string {
  return formatWarsawDateTime(when);
}
