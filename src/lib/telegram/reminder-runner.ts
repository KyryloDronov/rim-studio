import { callTelegramBotApi } from "@/lib/telegram-bot-api";
import { formatWarsawDateTime } from "@/lib/telegram/warsaw-datetime";
import {
  listDueReminders,
  markReminderSent,
  type ReminderKind,
} from "@/lib/telegram/reminder-store";

function reminderCopy(kind: ReminderKind, eventAt: number, phone?: string): string {
  const when = formatWarsawDateTime(new Date(eventAt));
  const phoneLine = phone ? `\nТелефон: ${phone}` : "";
  if (kind === "visit") {
    return `⏰ Через 15 минут — визит клиента\n🚗 ${when}${phoneLine}`;
  }
  return `⏰ Через 15 минут — перезвон\n📞 ${when}${phoneLine}`;
}

export async function processDueTelegramReminders(): Promise<number> {
  const due = await listDueReminders();
  let sent = 0;

  for (const item of due) {
    const text = reminderCopy(item.kind, item.eventAt, item.phone);
    const result = await callTelegramBotApi("sendMessage", {
      chat_id: item.chatId,
      text,
      reply_parameters: { message_id: item.leadMessageId },
    });

    if (result.ok) {
      await markReminderSent(item.id);
      sent += 1;
    }
  }

  return sent;
}
