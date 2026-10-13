import type { ConsultationSourceId } from "@/content/consultation-sources";
import type { Locale } from "@/i18n/types";
import {
  resolveTelegramLeadLabels,
  type ConsultationPageId,
} from "@/lib/consultation-lead-meta";
import { callTelegramBotApi } from "@/lib/telegram-bot-api";
import {
  leadPlainToHtml,
  TELEGRAM_LEAD_PARSE_MODE,
} from "@/lib/telegram-lead-html";
import {
  buildLeadTelegramText,
  leadActionInlineKeyboard,
} from "@/lib/telegram-lead-message";

type SendConsultationInput = Readonly<{
  name: string;
  phone: string;
  source: ConsultationSourceId;
  page: ConsultationPageId;
  locale: Locale;
  marketingOptIn?: boolean;
}>;

export type SendConsultationResult =
  | Readonly<{ ok: true }>
  | Readonly<{ ok: false; reason: "not_configured" | "telegram_error" }>;

export async function sendConsultationToTelegram(
  input: SendConsultationInput,
): Promise<SendConsultationResult> {
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();

  if (!token || !chatId) {
    return { ok: false, reason: "not_configured" };
  }

  const { pageLabel, sectionLabel } = resolveTelegramLeadLabels(
    input.source,
    input.page,
  );
  const plain = buildLeadTelegramText({
    pageLabel,
    sectionLabel,
    locale: input.locale,
    name: input.name,
    phone: input.phone,
    marketingOptIn:
      input.source === "firstVisitPromo" ? input.marketingOptIn : undefined,
  });

  const payload = await callTelegramBotApi("sendMessage", {
    chat_id: chatId,
    text: leadPlainToHtml(plain),
    parse_mode: TELEGRAM_LEAD_PARSE_MODE,
    disable_web_page_preview: true,
    reply_markup: leadActionInlineKeyboard(input.phone),
  });

  if (!payload.ok) {
    return { ok: false, reason: "telegram_error" };
  }

  return { ok: true };
}
