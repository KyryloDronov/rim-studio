import { callTelegramBotApi } from "@/lib/telegram-bot-api";
import {
  leadPlainToHtml,
  TELEGRAM_LEAD_PARSE_MODE,
} from "@/lib/telegram-lead-html";
import {
  extractPhoneFromLeadMessage,
  getLeadStatusFromText,
  isLeadTelegramMessage,
} from "@/lib/telegram-lead-message";
import {
  applyLeadPlan,
  leadMessageRef,
  planSavedToast,
} from "@/lib/telegram/apply-lead-plan";
import type { PlanKind } from "@/lib/telegram/lead-plan";
import {
  clearPendingSchedule,
  getPendingSchedule,
  setPendingSchedule,
} from "@/lib/telegram/pending-schedule";
import {
  callbackPickerKeyboard,
  leadMainKeyboard,
  visitPickerKeyboard,
} from "@/lib/telegram/schedule-keyboards";
import {
  resolvePreset,
  SCHEDULE_CALLBACK,
} from "@/lib/telegram/schedule-presets";
import {
  formatTelegramActorName,
  isAuthorizedTelegramActor,
  isAuthorizedTelegramChat,
} from "@/lib/telegram/telegram-auth";
import { parseUserDateTimeWarsaw } from "@/lib/telegram/warsaw-datetime";
import type {
  TelegramCallbackQuery,
  TelegramMessage,
} from "@/lib/telegram/telegram-types";

const MANUAL_HINT: Record<PlanKind, string> = {
  visit:
    "🚗 Визит клиента — своя дата\n\nВнизу должно открыться поле ввода. Отправьте одним сообщением:\nДД.ММ ЧЧ:ММ\n\nНапример: 15.10 14:30\n\n(Можно и просто написать дату в чат, без реплая.)",
  callback:
    "📞 Перезвон — своя дата\n\nВнизу должно открыться поле ввода. Отправьте одним сообщением:\nДД.ММ ЧЧ:ММ\n\nНапример: 15.10 18:00\n\n(Можно и просто написать дату в чат, без реплая.)",
};

async function answerCallback(
  callbackId: string,
  text: string,
  showAlert = false,
): Promise<void> {
  await callTelegramBotApi("answerCallbackQuery", {
    callback_query_id: callbackId,
    text,
    show_alert: showAlert,
  });
}

function guardLeadCallback(
  callback: TelegramCallbackQuery,
): { message: TelegramMessage; text: string } | null {
  const message = callback.message;
  const text = message?.text;
  if (!message || !text || !isLeadTelegramMessage(text)) return null;
  if (!isAuthorizedTelegramChat(message.chat)) return null;
  if (!isAuthorizedTelegramActor(callback.from)) return null;
  return { message, text };
}

async function restoreLeadKeyboard(message: TelegramMessage): Promise<void> {
  const text = message.text ?? "";
  const phone = extractPhoneFromLeadMessage(text);
  const status = getLeadStatusFromText(text);
  if (!phone) return;

  await callTelegramBotApi("editMessageReplyMarkup", {
    chat_id: message.chat.id,
    message_id: message.message_id,
    reply_markup: leadMainKeyboard(phone, status),
  });
}

export async function handleScheduleCallback(
  callback: TelegramCallbackQuery,
): Promise<void> {
  const data = callback.data;
  if (!data?.startsWith("ls:sc:")) return;

  const lead = guardLeadCallback(callback);
  const from = callback.from;
  if (!lead || !from?.id) {
    await answerCallback(callback.id, "Нет доступа или не заявка", true);
    return;
  }

  const { message, text } = lead;
  const actor = formatTelegramActorName(from) ?? "Менеджер";

  if (data === SCHEDULE_CALLBACK.back) {
    await restoreLeadKeyboard(message);
    await answerCallback(callback.id, "К заявке");
    return;
  }

  if (data === SCHEDULE_CALLBACK.visitMenu) {
    await callTelegramBotApi("editMessageReplyMarkup", {
      chat_id: message.chat.id,
      message_id: message.message_id,
      reply_markup: visitPickerKeyboard(),
    });
    await answerCallback(callback.id, "Время визита");
    return;
  }

  if (data === SCHEDULE_CALLBACK.callbackMenu) {
    await callTelegramBotApi("editMessageReplyMarkup", {
      chat_id: message.chat.id,
      message_id: message.message_id,
      reply_markup: callbackPickerKeyboard(),
    });
    await answerCallback(callback.id, "Время перезвона");
    return;
  }

  if (
    data === SCHEDULE_CALLBACK.visitManual ||
    data === SCHEDULE_CALLBACK.callbackManual
  ) {
    const kind: PlanKind =
      data === SCHEDULE_CALLBACK.visitManual ? "visit" : "callback";

    await restoreLeadKeyboard(message);

    const sent = await callTelegramBotApi<{ message_id?: number }>(
      "sendMessage",
      {
        chat_id: message.chat.id,
        text: MANUAL_HINT[kind],
        reply_markup: {
          force_reply: true,
          selective: true,
          input_field_placeholder: "11.10 14:30",
        },
      },
    );

    await setPendingSchedule({
      chatId: String(message.chat.id),
      userId: String(from.id),
      leadMessageId: message.message_id,
      kind,
      leadTextSnapshot: text,
      promptMessageId: sent.result?.message_id,
      createdAt: Date.now(),
    });

    await answerCallback(
      callback.id,
      sent.ok
        ? "Введите дату в поле внизу"
        : "Не удалось открыть ввод — напишите дату в чат",
      !sent.ok,
    );
    return;
  }

  const preset = resolvePreset(data);
  if (!preset) {
    await answerCallback(callback.id, "Неизвестная кнопка", true);
    return;
  }

  if (preset.when.getTime() < Date.now() + 60_000) {
    await answerCallback(
      callback.id,
      "Время уже прошло — выберите другое",
      true,
    );
    return;
  }

  const ref = leadMessageRef(message);
  const result = await applyLeadPlan({
    chatId: ref.chatId,
    leadMessageId: ref.leadMessageId,
    leadText: text,
    kind: preset.kind,
    when: preset.when,
    actor,
  });

  if (!result.ok) {
    await answerCallback(callback.id, "Не удалось сохранить план", true);
    return;
  }

  await clearPendingSchedule(message.chat.id, from.id);
  await answerCallback(callback.id, planSavedToast(preset.kind, preset.when));
}

export async function tryApplyScheduleFromMessage(
  message: TelegramMessage,
): Promise<boolean> {
  const body = message.text?.trim();
  const from = message.from;
  if (!body || !from?.id) return false;

  if (!isAuthorizedTelegramChat(message.chat)) return false;
  if (!isAuthorizedTelegramActor(from)) return false;

  const parent = message.reply_to_message;
  const pending = await getPendingSchedule(message.chat.id, from.id);

  let leadMessageId: number | null = null;
  let leadText: string | null = null;
  let kind: PlanKind | null = pending?.kind ?? null;

  if (
    parent?.text &&
    isLeadTelegramMessage(parent.text) &&
    parent.message_id
  ) {
    if (!pending) return false;
    leadMessageId = parent.message_id;
    leadText = parent.text;
    kind = pending.kind;
  } else if (pending) {
    leadMessageId = pending.leadMessageId;
    leadText = pending.leadTextSnapshot;
  } else {
    return false;
  }

  if (!leadMessageId || !leadText || !kind) return false;

  const when = parseUserDateTimeWarsaw(body);
  if (!when) {
    if (pending) {
      await callTelegramBotApi("sendMessage", {
        chat_id: message.chat.id,
        text:
          "Не распознал дату. Отправьте в чат: ДД.ММ ЧЧ:ММ (например 20.10 15:00).",
        reply_parameters: { message_id: leadMessageId },
      });
      return true;
    }
    return false;
  }

  const actor = formatTelegramActorName(from) ?? "Менеджер";
  const result = await applyLeadPlan({
    chatId: message.chat.id,
    leadMessageId,
    leadText,
    kind,
    when,
    actor,
  });

  if (!result.ok) return false;

  await clearPendingSchedule(message.chat.id, from.id);
  await callTelegramBotApi("sendMessage", {
    chat_id: message.chat.id,
    text: `✅ ${planSavedToast(kind, when)}`,
    reply_parameters: { message_id: leadMessageId },
  });
  return true;
}
