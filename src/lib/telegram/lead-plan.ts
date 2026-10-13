import { formatWarsawDateTime } from "@/lib/telegram/warsaw-datetime";

export const PLAN_HEADER = "── План ──";
export const VISIT_PLAN_PREFIX = "🚗 Визит:";
export const CALLBACK_PLAN_PREFIX = "📞 Перезвон:";

export type PlanKind = "visit" | "callback";

const PLAN_LINE_RE = /^[🚗📞].*(?:Визит|Перезвон):/;

export function formatPlanLine(
  kind: PlanKind,
  when: Date,
  actor?: string,
): string {
  const whenLabel = formatWarsawDateTime(when);
  const who = actor?.trim();
  const suffix = who ? ` · ${who}` : "";
  if (kind === "visit") {
    return `${VISIT_PLAN_PREFIX} ${whenLabel}${suffix}`;
  }
  return `${CALLBACK_PLAN_PREFIX} ${whenLabel}${suffix}`;
}

export function stripPlanSection(text: string): string {
  const lines = text.split("\n");
  const filtered = lines.filter(
    (line) =>
      line !== PLAN_HEADER &&
      !line.startsWith(VISIT_PLAN_PREFIX) &&
      !line.startsWith(CALLBACK_PLAN_PREFIX),
  );
  return filtered.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function readPlanLine(text: string, kind: PlanKind): string | undefined {
  const prefix = kind === "visit" ? VISIT_PLAN_PREFIX : CALLBACK_PLAN_PREFIX;
  return text.split("\n").find((line) => line.startsWith(prefix));
}

export function upsertPlanInText(
  text: string,
  kind: PlanKind,
  when: Date,
  actor?: string,
): string {
  const visitLine =
    kind === "visit"
      ? formatPlanLine("visit", when, actor)
      : readPlanLine(text, "visit");
  const callbackLine =
    kind === "callback"
      ? formatPlanLine("callback", when, actor)
      : readPlanLine(text, "callback");

  const base = stripPlanSection(text);
  const planLines = [PLAN_HEADER, visitLine, callbackLine].filter(
    (line): line is string => Boolean(line),
  );

  if (planLines.length <= 1) {
    return base;
  }

  const ruleIndex = base.lastIndexOf("────────────────");
  if (ruleIndex >= 0) {
    const before = base.slice(0, ruleIndex).trimEnd();
    const after = base.slice(ruleIndex);
    return `${before}\n\n${planLines.join("\n")}\n${after}`;
  }

  return `${base}\n\n${planLines.join("\n")}`;
}

export function textHasPlanSection(text: string): boolean {
  return PLAN_LINE_RE.test(text) || text.includes(PLAN_HEADER);
}
