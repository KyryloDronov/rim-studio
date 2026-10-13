import { normalizePhoneDigits } from "@/lib/consultation-request";

/** @deprecated use leadHeaderLine("new") */
export const LEAD_MESSAGE_MARKER = "🆕 Новая заявка с сайта";

export const LEAD_HEADER_BY_STATUS: Record<LeadStatusKey, string> = {
  new: "🆕 Новая заявка с сайта",
  accepted: "✅ Заявка принята · в работе",
  callback: "⏳ Ожидает перезвона",
  done: "✔️ Заявка закрыта",
  rejected: "❌ Заявка отклонена",
};

/** @deprecated use LEAD_STATUS_CALLBACK.accept */
export const TELEGRAM_LEAD_ACCEPT_CALLBACK = "lead_accept";

export const LEAD_STATUS_CALLBACK = {
  accept: "ls:acc",
  callback: "ls:cb",
  done: "ls:done",
  reject: "ls:rej",
  sharePhone: "ls:tel",
} as const;

export type LeadStatusKey =
  | "new"
  | "accepted"
  | "callback"
  | "done"
  | "rejected";

const WARSAW_TZ = "Europe/Warsaw";
const RULE = "────────────────";
const NOTES_HEADER = "📝 Заметки";

const STATUS_LINE_RE = /^Статус[:\s].*$/gm;

export type LeadTelegramFields = Readonly<{
  pageLabel: string;
  sectionLabel: string;
  locale: string;
  name: string;
  phone: string;
  marketingOptIn?: boolean;
}>;

export function leadHeaderLine(status: LeadStatusKey): string {
  return LEAD_HEADER_BY_STATUS[status];
}

export function formatLeadReceivedAt(date = new Date()): string {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: WARSAW_TZ,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function phoneToTelUrl(phone: string): string | null {
  const digits = normalizePhoneDigits(phone);
  if (digits.length < 9) return null;
  return `tel:+${digits}`;
}

export function phoneToWhatsAppUrl(phone: string): string | null {
  const digits = normalizePhoneDigits(phone);
  if (digits.length < 9) return null;
  return `https://wa.me/${digits}`;
}

function inlineField(label: string, value: string): string {
  return `${label}: ${value}`;
}

function statusLine(
  status: LeadStatusKey,
  at: Date,
  actor?: string,
): string {
  const when = formatLeadReceivedAt(at);
  const who = actor?.trim();
  const suffix = who ? ` — ${when}, ${who}` : ` — ${when}`;

  switch (status) {
    case "new":
      return "Статус: 🟡 Ожидает обработки";
    case "accepted":
      return `Статус: ✅ Принято${suffix}`;
    case "callback":
      return `Статус: ⏳ Перезвонить${suffix}`;
    case "done":
      return `Статус: ✔️ Закрыто${suffix}`;
    case "rejected":
      return `Статус: ❌ Отказ${suffix}`;
  }
}

export function isLeadTelegramMessage(text: string | undefined): boolean {
  if (!text) return false;
  const hasLeadFingerprint =
    text.includes("· Warszawa") &&
    (text.includes("📍 Источник") || text.includes("Источник")) &&
    text.includes("Телефон");
  const hasKnownHeader = Object.values(LEAD_HEADER_BY_STATUS).some((header) =>
    text.includes(header),
  );
  return hasLeadFingerprint || hasKnownHeader;
}

export function getLeadStatusFromText(text: string): LeadStatusKey {
  if (/Статус[:\s].*❌/.test(text)) return "rejected";
  if (/Статус[:\s].*✔️/.test(text)) return "done";
  if (/Статус[:\s].*⏳/.test(text)) return "callback";
  if (/Статус[:\s].*✅/.test(text)) return "accepted";
  if (text.includes(LEAD_HEADER_BY_STATUS.done)) return "done";
  if (text.includes(LEAD_HEADER_BY_STATUS.rejected)) return "rejected";
  if (text.includes(LEAD_HEADER_BY_STATUS.callback)) return "callback";
  if (text.includes(LEAD_HEADER_BY_STATUS.accepted)) return "accepted";
  return "new";
}

export function buildLeadTelegramText(
  fields: LeadTelegramFields,
  receivedAt = new Date(),
): string {
  const blocks = [
    leadHeaderLine("new"),
    `📅 ${formatLeadReceivedAt(receivedAt)} · Warszawa`,
    statusLine("new", receivedAt),
    "",
    RULE,
    "📍 Источник",
    inlineField("Страница", fields.pageLabel),
    inlineField("Секция", fields.sectionLabel),
    inlineField("Язык сайта", fields.locale),
    "👤 Контакт",
    inlineField("Имя", fields.name.trim() || "не указано"),
    inlineField("Телефон", fields.phone.trim()),
  ];

  if (fields.marketingOptIn !== undefined) {
    blocks.push(
      "📋 Дополнительно",
      inlineField(
        "Согласие на рассылку",
        fields.marketingOptIn ? "да" : "нет",
      ),
    );
  }

  blocks.push(RULE);

  return blocks.join("\n");
}

export function setLeadStatusInText(
  text: string,
  status: LeadStatusKey,
  at = new Date(),
  actor?: string,
): string {
  const withoutStatus = text.replace(STATUS_LINE_RE, "");
  const lines = withoutStatus
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line, index, all) => {
      if (line.trim() !== "") return true;
      return index > 0 && all[index - 1].trim() !== "";
    });

  if (lines.length > 0) {
    lines[0] = leadHeaderLine(status);
  }

  const nextStatus = statusLine(status, at, actor);
  const dateIdx = lines.findIndex((line) => line.startsWith("📅"));
  if (dateIdx >= 0) {
    lines.splice(dateIdx + 1, 0, nextStatus);
  } else {
    lines.splice(1, 0, nextStatus);
  }

  return lines.join("\n");
}

/** @deprecated use setLeadStatusInText */
export function markLeadTelegramAccepted(
  text: string,
  acceptedAt = new Date(),
  acceptedBy?: string,
): string {
  return setLeadStatusInText(text, "accepted", acceptedAt, acceptedBy);
}

export function appendLeadNoteToText(
  text: string,
  note: string,
  actor?: string,
  at = new Date(),
): string {
  const trimmed = note.trim();
  if (!trimmed) return text;

  const stamp = formatLeadReceivedAt(at);
  const who = actor?.trim() || "Менеджер";
  const line = `  • ${stamp} ${who}: ${trimmed}`;

  if (text.includes(`${NOTES_HEADER}\n`) || text.includes(NOTES_HEADER)) {
    return `${text}\n${line}`;
  }

  const ruleIndex = text.lastIndexOf(RULE);
  if (ruleIndex >= 0) {
    const before = text.slice(0, ruleIndex).trimEnd();
    const after = text.slice(ruleIndex);
    return `${before}\n\n${NOTES_HEADER}\n${line}\n${after}`;
  }

  return `${text}\n\n${NOTES_HEADER}\n${line}`;
}

type InlineButton =
  | { text: string; callback_data: string }
  | { text: string; url: string };

type InlineKeyboard = Readonly<{
  inline_keyboard: ReadonlyArray<ReadonlyArray<InlineButton>>;
}>;

function contactButtons(phone: string): InlineButton[] {
  const buttons: InlineButton[] = [];
  const wa = phoneToWhatsAppUrl(phone);
  const digits = normalizePhoneDigits(phone);
  if (digits.length >= 9) {
    buttons.push({
      text: "📞  Позвонить",
      callback_data: LEAD_STATUS_CALLBACK.sharePhone,
    });
  }
  if (wa) {
    buttons.push({ text: "💬  Написать в WhatsApp", url: wa });
  }
  return buttons;
}

export function formatPhoneE164(phone: string): string | null {
  const digits = normalizePhoneDigits(phone);
  if (digits.length < 9) return null;
  return `+${digits}`;
}

function pushFullWidthRow(
  rows: InlineButton[][],
  button: InlineButton,
): void {
  rows.push([button]);
}

export function leadInlineKeyboard(
  phone: string,
  status: LeadStatusKey,
): InlineKeyboard {
  const rows: InlineButton[][] = [];

  for (const button of contactButtons(phone)) {
    pushFullWidthRow(rows, button);
  }

  if (status === "done" || status === "rejected") {
    return { inline_keyboard: rows };
  }

  if (status === "new") {
    pushFullWidthRow(rows, {
      text: "✅  Принято в работу",
      callback_data: LEAD_STATUS_CALLBACK.accept,
    });
    pushFullWidthRow(rows, {
      text: "⏳  Нужен перезвон",
      callback_data: LEAD_STATUS_CALLBACK.callback,
    });
    pushFullWidthRow(rows, {
      text: "❌  Отказ / не актуально",
      callback_data: LEAD_STATUS_CALLBACK.reject,
    });
    return { inline_keyboard: rows };
  }

  pushFullWidthRow(rows, {
    text: "⏳  Нужен перезвон",
    callback_data: LEAD_STATUS_CALLBACK.callback,
  });
  pushFullWidthRow(rows, {
    text: "✔️  Закрыть заявку",
    callback_data: LEAD_STATUS_CALLBACK.done,
  });
  pushFullWidthRow(rows, {
    text: "❌  Отказ / не актуально",
    callback_data: LEAD_STATUS_CALLBACK.reject,
  });

  return { inline_keyboard: rows };
}

export function leadActionInlineKeyboard(phone: string): InlineKeyboard {
  return leadInlineKeyboard(phone, "new");
}

export function leadCallOnlyInlineKeyboard(phone: string): InlineKeyboard {
  const rows: InlineButton[][] = [];
  for (const button of contactButtons(phone)) {
    pushFullWidthRow(rows, button);
  }
  return { inline_keyboard: rows };
}

export function extractPhoneFromLeadMessage(text: string): string | null {
  const inline = /Телефон:\s*(.+)/m.exec(text);
  if (inline?.[1]?.trim()) return inline[1].trim();
  const block = /Телефон\n\s+(.+)/m.exec(text);
  return block?.[1]?.trim() ?? null;
}

export function resolveStatusFromCallbackData(
  data: string | undefined,
): LeadStatusKey | null {
  switch (data) {
    case LEAD_STATUS_CALLBACK.accept:
    case TELEGRAM_LEAD_ACCEPT_CALLBACK:
      return "accepted";
    case LEAD_STATUS_CALLBACK.callback:
      return "callback";
    case LEAD_STATUS_CALLBACK.done:
      return "done";
    case LEAD_STATUS_CALLBACK.reject:
      return "rejected";
    default:
      return null;
  }
}
