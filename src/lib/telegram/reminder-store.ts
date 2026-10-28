import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import {
  TELEGRAM_REMINDERS_FILE_DEFAULT,
  telegramRemindersFilePath,
} from "@/lib/telegram/data-paths";
import { readJsonStore } from "@/lib/telegram/read-json-store";

export type ReminderKind = "visit" | "callback";

export type TelegramReminder = Readonly<{
  id: string;
  chatId: string;
  leadMessageId: number;
  kind: ReminderKind;
  remindAt: number;
  eventAt: number;
  phone?: string;
  sent: boolean;
}>;

type ReminderFile = Readonly<{
  reminders: TelegramReminder[];
}>;

const REMINDER_LEAD_MS = 15 * 60_000;

async function load(): Promise<ReminderFile> {
  try {
    const raw = await readJsonStore(
      TELEGRAM_REMINDERS_FILE_DEFAULT,
      process.env.TELEGRAM_REMINDERS_FILE,
    );
    return JSON.parse(raw) as ReminderFile;
  } catch {
    return { reminders: [] };
  }
}

async function save(data: ReminderFile): Promise<void> {
  const path = telegramRemindersFilePath();
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function buildReminderId(
  chatId: string | number,
  leadMessageId: number,
  kind: ReminderKind,
): string {
  return `${chatId}:${leadMessageId}:${kind}`;
}

export async function upsertLeadReminder(input: Readonly<{
  chatId: string | number;
  leadMessageId: number;
  kind: ReminderKind;
  eventAt: Date;
  phone?: string;
}>): Promise<void> {
  const id = buildReminderId(input.chatId, input.leadMessageId, input.kind);
  const remindAt = input.eventAt.getTime() - REMINDER_LEAD_MS;
  const file = await load();
  const next: TelegramReminder = {
    id,
    chatId: String(input.chatId),
    leadMessageId: input.leadMessageId,
    kind: input.kind,
    remindAt,
    eventAt: input.eventAt.getTime(),
    phone: input.phone,
    sent: false,
  };

  const reminders = file.reminders.filter((item) => item.id !== id);
  if (remindAt > Date.now() - 60_000) {
    reminders.push(next);
  }

  await save({ reminders });
}

export async function listDueReminders(now = Date.now()): Promise<
  TelegramReminder[]
> {
  const file = await load();
  return file.reminders.filter((item) => !item.sent && item.remindAt <= now);
}

export async function markReminderSent(id: string): Promise<void> {
  const file = await load();
  const reminders = file.reminders.map((item) =>
    item.id === id ? { ...item, sent: true } : item,
  );
  await save({ reminders });
}
