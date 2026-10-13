import {
  CALLBACK_PLAN_PREFIX,
  PLAN_HEADER,
  VISIT_PLAN_PREFIX,
} from "@/lib/telegram/lead-plan";
import { LEAD_HEADER_BY_STATUS } from "@/lib/telegram-lead-message";

export const TELEGRAM_LEAD_PARSE_MODE = "HTML" as const;

const INLINE_FIELD_LABELS = [
  "Страница",
  "Секция",
  "Язык сайта",
  "Имя",
  "Телефон",
  "Согласие на рассылку",
] as const;

const LEAD_HEADER_LINES = new Set(Object.values(LEAD_HEADER_BY_STATUS));

function isLeadHeaderLine(line: string): boolean {
  if (LEAD_HEADER_LINES.has(line)) return true;
  return /^[🆕✅⏳✔️❌]/.test(line) && line.toLowerCase().includes("заявк");
}

export function escapeTelegramHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatInlineFieldLine(line: string): string | null {
  for (const label of INLINE_FIELD_LABELS) {
    const prefix = `${label}:`;
    if (!line.startsWith(prefix)) continue;
    const value = line.slice(prefix.length).trim();
    const valueHtml =
      label === "Телефон"
        ? `<code>${escapeTelegramHtml(value)}</code>`
        : escapeTelegramHtml(value);
    return `<b>${escapeTelegramHtml(label)}:</b> ${valueHtml}`;
  }
  return null;
}

export function leadPlainToHtml(plain: string): string {
  const lines = plain.split("\n");
  const out: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const next = lines[i + 1];

    if (isLeadHeaderLine(line)) {
      out.push(`<b>${escapeTelegramHtml(line)}</b>`);
      continue;
    }

    if (line.startsWith("📅")) {
      out.push(`<i>${escapeTelegramHtml(line)}</i>`);
      continue;
    }

    if (line.startsWith("Статус:") || /^Статус\s+/.test(line)) {
      const statusPart = line.replace(/^Статус[:\s]+/, "").trim();
      out.push(`<b>Статус:</b> ${escapeTelegramHtml(statusPart)}`);
      continue;
    }

    const inlineField = formatInlineFieldLine(line);
    if (inlineField) {
      out.push(inlineField);
      continue;
    }

    if (line === "────────────────") {
      out.push(" ");
      continue;
    }

    if (line === "Источник" || line === "📍 Источник") {
      out.push("<b>📍 Источник</b>");
      continue;
    }

    if (line === "Контакт" || line === "👤 Контакт") {
      out.push("");
      out.push("<b>👤 Контакт</b>");
      continue;
    }

    if (line === "Дополнительно" || line === "📋 Дополнительно") {
      out.push("");
      out.push("<b>📋 Дополнительно</b>");
      continue;
    }

    if (line === "Заметки" || line === "📝 Заметки") {
      out.push("");
      out.push("<b>📝 Заметки</b>");
      continue;
    }

    if (line === PLAN_HEADER) {
      out.push(`<b>${escapeTelegramHtml(line)}</b>`);
      continue;
    }

    if (
      line.startsWith(VISIT_PLAN_PREFIX) ||
      line.startsWith(CALLBACK_PLAN_PREFIX)
    ) {
      out.push(`<i>${escapeTelegramHtml(line)}</i>`);
      continue;
    }

    // Старые заявки: подпись и значение на двух строках
    if (
      (INLINE_FIELD_LABELS as readonly string[]).includes(line) &&
      next?.startsWith("  ")
    ) {
      const value = next.slice(2).trim();
      out.push(
        formatInlineFieldLine(`${line}: ${value}`) ??
          escapeTelegramHtml(line),
      );
      i += 1;
      continue;
    }

    if (line.startsWith("  • ")) {
      out.push(`<i>${escapeTelegramHtml(line.slice(2))}</i>`);
      continue;
    }

    if (!line.trim()) {
      out.push("");
      continue;
    }

    out.push(escapeTelegramHtml(line));
  }

  return out.join("\n").trim();
}
