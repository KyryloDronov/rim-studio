import { callTelegramBotApi } from "@/lib/telegram-bot-api";
import {
  leadPlainToHtml,
  TELEGRAM_LEAD_PARSE_MODE,
} from "@/lib/telegram-lead-html";
import {
  appendLeadNoteToText,
  extractPhoneFromLeadMessage,
  formatPhoneE164,
  getLeadStatusFromText,
  isLeadTelegramMessage,
  LEAD_STATUS_CALLBACK,
  resolveStatusFromCallbackData,
  setLeadStatusInText,
  type LeadStatusKey,
} from "@/lib/telegram-lead-message";
import {
  handleScheduleCallback,
  tryApplyScheduleFromMessage,
} from "@/lib/telegram/schedule-handlers";
import { leadMainKeyboard } from "@/lib/telegram/schedule-keyboards";
import {
  formatTelegramActorName,
  isAuthorizedTelegramActor,
  isAuthorizedTelegramChat,
} from "@/lib/telegram/telegram-auth";
import type {
  TelegramCallbackQuery,
  TelegramMessage,
  TelegramUpdate,
} from "@/lib/telegram/telegram-types";

const STATUS_TOAST: Record<LeadStatusKey, string> = {
  new: "Новая",
  accepted: "Принято",
  callback: "Нужен перезвон",
  done: "Закрыто",
  rejected: "Отказ",
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

async function editLeadMessage(
  message: TelegramMessage,
  nextText: string,
  phone: string | null,
): Promise<boolean> {
  const status = getLeadStatusFromText(nextText);
  const keyboard = phone
    ? leadMainKeyboard(phone, status)
    : { inline_keyboard: [] };

  const edit = await callTelegramBotApi("editMessageText", {
    chat_id: message.chat.id,
    message_id: message.message_id,
    text: leadPlainToHtml(nextText),
    parse_mode: TELEGRAM_LEAD_PARSE_MODE,
    disable_web_page_preview: true,
    reply_markup: keyboard,
  });

  return edit.ok;
}

async function handleSharePhoneCallback(
  callback: TelegramCallbackQuery,
): Promise<void> {
  const message = callback.message;
  const text = message?.text;

  if (!message || !text || !isLeadTelegramMessage(text)) {
    await answerCallback(callback.id, "Нет номера в заявке", true);
    return;
  }

  if (!isAuthorizedTelegramChat(message.chat)) {
    await answerCallback(callback.id, "Чат не настроен", true);
    return;
  }

  if (!isAuthorizedTelegramActor(callback.from)) {
    await answerCallback(callback.id, "Нет доступа", true);
    return;
  }

  const raw = extractPhoneFromLeadMessage(text);
  const e164 = raw ? formatPhoneE164(raw) : null;
  if (!e164) {
    await answerCallback(callback.id, "Номер не распознан", true);
    return;
  }

  const sent = await callTelegramBotApi("sendContact", {
    chat_id: message.chat.id,
    phone_number: e164,
    first_name: "Клиент",
    last_name: "Rim Studio",
  });

  if (!sent.ok) {
    await answerCallback(callback.id, "Не удалось отправить контакт", true);
    return;
  }

  await answerCallback(callback.id, "Контакт в чате — нажмите, чтобы позвонить");
}

async function handleStatusCallback(
  callback: TelegramCallbackQuery,
): Promise<void> {
  if (callback.data?.startsWith("ls:sc:")) {
    await handleScheduleCallback(callback);
    return;
  }

  if (callback.data === LEAD_STATUS_CALLBACK.sharePhone) {
    await handleSharePhoneCallback(callback);
    return;
  }

  const message = callback.message;
  const text = message?.text;

  if (!message || !text || !isLeadTelegramMessage(text)) {
    await answerCallback(
      callback.id,
      "Не удалось обновить заявку",
      true,
    );
    return;
  }

  if (!isAuthorizedTelegramChat(message.chat)) {
    await answerCallback(callback.id, "Чат не настроен для заявок", true);
    return;
  }

  if (!isAuthorizedTelegramActor(callback.from)) {
    await answerCallback(callback.id, "Нет доступа к заявкам", true);
    return;
  }

  const nextStatus = resolveStatusFromCallbackData(callback.data);
  if (!nextStatus) return;

  const current = getLeadStatusFromText(text);
  if (
    (current === "done" || current === "rejected") &&
    nextStatus !== current
  ) {
    await answerCallback(callback.id, "Заявка уже завершена");
    return;
  }

  const actor = formatTelegramActorName(callback.from);
  const nextText = setLeadStatusInText(
    text,
    nextStatus,
    new Date(),
    actor,
  );
  const phone = extractPhoneFromLeadMessage(nextText);

  const ok = await editLeadMessage(message, nextText, phone);
  if (!ok) {
    await answerCallback(callback.id, "Не удалось сохранить статус", true);
    return;
  }

  await answerCallback(callback.id, STATUS_TOAST[nextStatus]);
}

async function handleReplyNote(message: TelegramMessage): Promise<void> {
  const parent = message.reply_to_message;
  const parentText = parent?.text;
  const noteText = message.text?.trim();

  if (!parent || !parentText || !noteText) return;
  if (!isLeadTelegramMessage(parentText)) return;
  if (!isAuthorizedTelegramChat(message.chat)) return;
  if (!isAuthorizedTelegramActor(message.from)) return;

  const actor = formatTelegramActorName(message.from);
  const nextText = appendLeadNoteToText(parentText, noteText, actor);
  const phone = extractPhoneFromLeadMessage(nextText);
  const status = getLeadStatusFromText(nextText);

  const ok = await editLeadMessage(parent, nextText, phone);
  if (!ok) return;

  await callTelegramBotApi("sendMessage", {
    chat_id: message.chat.id,
    text: `📝 Заметка добавлена (${STATUS_TOAST[status]}).`,
    reply_parameters: { message_id: parent.message_id },
  });
}

/** Shared entry for webhook and local long-polling. */
export async function processTelegramUpdate(
  update: TelegramUpdate,
): Promise<void> {
  if (update.callback_query) {
    await handleStatusCallback(update.callback_query);
    return;
  }

  if (update.message) {
    if (await tryApplyScheduleFromMessage(update.message)) {
      return;
    }
    if (update.message.reply_to_message) {
      await handleReplyNote(update.message);
    }
  }
}
