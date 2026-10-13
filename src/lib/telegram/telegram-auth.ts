import type { TelegramChat, TelegramUser } from "@/lib/telegram/telegram-types";

function parseAllowedUserIds(): ReadonlySet<string> | null {
  const raw = process.env.TELEGRAM_ALLOWED_USER_IDS?.trim();
  if (!raw) return null;
  const ids = raw
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  return ids.length > 0 ? new Set(ids) : null;
}

export function isAuthorizedTelegramChat(chat: TelegramChat | undefined): boolean {
  const expected = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!expected || !chat) return false;
  return String(chat.id) === expected;
}

export function isAuthorizedTelegramActor(
  user: TelegramUser | undefined,
): boolean {
  const allowed = parseAllowedUserIds();
  if (!allowed || !user?.id) return true;
  return allowed.has(String(user.id));
}

export function formatTelegramActorName(
  user: TelegramUser | undefined,
): string | undefined {
  if (!user) return undefined;
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ");
  if (name.trim()) return name.trim();
  if (user.username) return `@${user.username}`;
  return user.id ? `id:${user.id}` : undefined;
}
