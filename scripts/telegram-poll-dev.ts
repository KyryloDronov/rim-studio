/**
 * Local dev: long-polling getUpdates → same handler as production webhook.
 * Telegram cannot POST to localhost; polling is the standard workaround.
 *
 * Run: npm run dev  (site + forms)
 *      npm run telegram:poll
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { processDueTelegramReminders } from "../src/lib/telegram/reminder-runner";
import { processTelegramUpdate } from "../src/lib/telegram/process-update";
import type { TelegramUpdate } from "../src/lib/telegram/telegram-types";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvLocal(): void {
  const path = resolve(ROOT, ".env.local");
  try {
    const raw = readFileSync(path, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 0) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    console.warn("No .env.local found — set TELEGRAM_BOT_TOKEN in the environment.");
  }
}

async function telegramApi<T>(
  method: string,
  body?: Record<string, unknown>,
): Promise<{ ok: boolean; result?: T; description?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN is missing");

  const response = await fetch(
    `https://api.telegram.org/bot${token}/${method}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    },
  );

  return (await response.json()) as {
    ok: boolean;
    result?: T;
    description?: string;
  };
}

async function main(): Promise<void> {
  loadEnvLocal();

  const webhook = await telegramApi<{ url?: string }>("getWebhookInfo");
  if (webhook.result?.url) {
    console.log(
      `Webhook is set (${webhook.result.url}) — removing for local polling…`,
    );
    await telegramApi("deleteWebhook", { drop_pending_updates: false });
  }

  console.log(
    "Telegram poll dev running. Buttons & reply-notes work without a public domain.",
  );
  console.log("Press Ctrl+C to stop.\n");

  let offset = 0;

  for (;;) {
    const payload = await telegramApi<ReadonlyArray<TelegramUpdate>>(
      "getUpdates",
      {
        offset,
        timeout: 25,
        allowed_updates: ["callback_query", "message"],
      },
    );

    if (!payload.ok) {
      console.error("getUpdates failed:", payload.description);
      await sleep(3000);
      continue;
    }

    for (const update of payload.result ?? []) {
      if (update.update_id !== undefined) {
        offset = update.update_id + 1;
      }
      try {
        await processTelegramUpdate(update);
      } catch (error) {
        console.error("processTelegramUpdate error:", error);
      }
    }

    try {
      const sent = await processDueTelegramReminders();
      if (sent > 0) {
        console.log(`Reminders sent: ${sent}`);
      }
    } catch (error) {
      console.error("processDueTelegramReminders error:", error);
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolveSleep) => {
    setTimeout(resolveSleep, ms);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
