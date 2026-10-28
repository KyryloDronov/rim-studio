import { join } from "node:path";

/** Default JSON stores under `data/` — path is static for Turbopack tracing. */
export const TELEGRAM_DATA_DIR = join(process.cwd(), "data");

export const TELEGRAM_PENDING_FILE_DEFAULT = join(
  TELEGRAM_DATA_DIR,
  "telegram-pending.json",
);

export const TELEGRAM_REMINDERS_FILE_DEFAULT = join(
  TELEGRAM_DATA_DIR,
  "telegram-reminders.json",
);

export function telegramPendingFilePath(): string {
  return process.env.TELEGRAM_PENDING_FILE?.trim() || TELEGRAM_PENDING_FILE_DEFAULT;
}

export function telegramRemindersFilePath(): string {
  return (
    process.env.TELEGRAM_REMINDERS_FILE?.trim() ||
    TELEGRAM_REMINDERS_FILE_DEFAULT
  );
}
