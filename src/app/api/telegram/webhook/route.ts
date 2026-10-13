import { NextResponse } from "next/server";
import { processTelegramUpdate } from "@/lib/telegram/process-update";
import type { TelegramUpdate } from "@/lib/telegram/telegram-types";

export async function POST(request: Request) {
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET?.trim();
  if (webhookSecret) {
    const header = request.headers.get("x-telegram-bot-api-secret-token");
    if (header !== webhookSecret) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  let update: TelegramUpdate;
  try {
    update = (await request.json()) as TelegramUpdate;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  await processTelegramUpdate(update);

  return NextResponse.json({ ok: true });
}
