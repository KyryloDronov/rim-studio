import { callTelegramBotApi } from "@/lib/telegram-bot-api";
import {
  leadPlainToHtml,
  TELEGRAM_LEAD_PARSE_MODE,
} from "@/lib/telegram-lead-html";
import {
  extractPhoneFromLeadMessage,
  formatPhoneE164,
  getLeadStatusFromText,
} from "@/lib/telegram-lead-message";
import { upsertPlanInText, type PlanKind } from "@/lib/telegram/lead-plan";
import { upsertLeadReminder } from "@/lib/telegram/reminder-store";
import { leadMainKeyboard } from "@/lib/telegram/schedule-keyboards";
import { formatWarsawDateTime } from "@/lib/telegram/warsaw-datetime";
import type { TelegramMessage } from "@/lib/telegram/telegram-types";

export async function applyLeadPlan(input: Readonly<{
  chatId: string | number;
  leadMessageId: number;
  leadText: string;
  kind: PlanKind;
  when: Date;
  actor: string;
}>): Promise<{ ok: true; nextText: string } | { ok: false }> {
  const nextText = upsertPlanInText(
    input.leadText,
    input.kind,
    input.when,
    input.actor,
  );
  const phone = extractPhoneFromLeadMessage(nextText);
  const status = getLeadStatusFromText(nextText);
  const keyboard = phone
    ? leadMainKeyboard(phone, status)
    : { inline_keyboard: [] };

  const edit = await callTelegramBotApi("editMessageText", {
    chat_id: input.chatId,
    message_id: input.leadMessageId,
    text: leadPlainToHtml(nextText),
    parse_mode: TELEGRAM_LEAD_PARSE_MODE,
    disable_web_page_preview: true,
    reply_markup: keyboard,
  });

  if (!edit.ok) {
    return { ok: false };
  }

  const e164 = phone ? formatPhoneE164(phone) : null;
  await upsertLeadReminder({
    chatId: input.chatId,
    leadMessageId: input.leadMessageId,
    kind: input.kind,
    eventAt: input.when,
    phone: e164 ?? phone ?? undefined,
  });

  return { ok: true, nextText };
}

export function planSavedToast(kind: PlanKind, when: Date): string {
  const label = formatWarsawDateTime(when);
  if (kind === "visit") {
    return `Визит: ${label}. Напомним за 15 мин.`;
  }
  return `Перезвон: ${label}. Напомним за 15 мин.`;
}

export function leadMessageRef(message: TelegramMessage): Readonly<{
  chatId: number;
  leadMessageId: number;
  leadText: string;
}> {
  return {
    chatId: message.chat.id,
    leadMessageId: message.message_id,
    leadText: message.text ?? "",
  };
}
