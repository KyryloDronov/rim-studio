type TelegramApiResponse<T> = Readonly<{
  ok: boolean;
  result?: T;
  description?: string;
}>;

export function getTelegramBotToken(): string | undefined {
  return process.env.TELEGRAM_BOT_TOKEN?.trim();
}

export async function callTelegramBotApi<T>(
  method: string,
  body: Record<string, unknown>,
): Promise<TelegramApiResponse<T>> {
  const token = getTelegramBotToken();
  if (!token) {
    return { ok: false, description: "not_configured" };
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as TelegramApiResponse<T>;
  if (!data.ok && process.env.NODE_ENV === "development") {
    console.error(`[telegram] ${method} failed:`, data.description);
  }
  return data;
}
