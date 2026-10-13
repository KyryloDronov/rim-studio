import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { PlanKind } from "@/lib/telegram/lead-plan";

export type PendingSchedule = Readonly<{
  chatId: string;
  userId: string;
  leadMessageId: number;
  kind: PlanKind;
  leadTextSnapshot: string;
  promptMessageId?: number;
  createdAt: number;
}>;

function storePath(): string {
  return (
    process.env.TELEGRAM_PENDING_FILE?.trim() ||
    join(process.cwd(), "data", "telegram-pending.json")
  );
}

async function load(): Promise<PendingSchedule[]> {
  try {
    const raw = await readFile(storePath(), "utf8");
    const parsed = JSON.parse(raw) as { pending?: PendingSchedule[] };
    return parsed.pending ?? [];
  } catch {
    return [];
  }
}

async function save(pending: PendingSchedule[]): Promise<void> {
  const path = storePath();
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify({ pending }, null, 2)}\n`, "utf8");
}

export async function setPendingSchedule(
  entry: PendingSchedule,
): Promise<void> {
  const list = await load();
  const key = `${entry.chatId}:${entry.userId}`;
  const filtered = list.filter(
    (item) => `${item.chatId}:${item.userId}` !== key,
  );
  filtered.push(entry);
  await save(filtered);
}

export async function getPendingSchedule(
  chatId: string | number,
  userId: string | number,
): Promise<PendingSchedule | null> {
  const key = `${chatId}:${userId}`;
  const list = await load();
  return (
    list.find((item) => `${item.chatId}:${item.userId}` === key) ?? null
  );
}

export async function clearPendingSchedule(
  chatId: string | number,
  userId: string | number,
): Promise<void> {
  const key = `${chatId}:${userId}`;
  const list = await load();
  await save(
    list.filter((item) => `${item.chatId}:${item.userId}` !== key),
  );
}
