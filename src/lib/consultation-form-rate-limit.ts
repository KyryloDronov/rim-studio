const STORAGE_KEY = "rimstudio:consultation-submissions";
const MAX_SUBMISSIONS_PER_WINDOW = 5;
const WINDOW_MS = 24 * 60 * 60 * 1000;

function readTimestamps(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry): entry is number => typeof entry === "number");
  } catch {
    return [];
  }
}

function pruneTimestamps(timestamps: number[], now: number): number[] {
  return timestamps.filter((t) => now - t < WINDOW_MS);
}

function writeTimestamps(timestamps: number[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(timestamps));
  } catch {
    /* quota / private mode — ignore */
  }
}

export function isConsultationRateLimitExceeded(): boolean {
  const now = Date.now();
  const recent = pruneTimestamps(readTimestamps(), now);
  return recent.length >= MAX_SUBMISSIONS_PER_WINDOW;
}

export function recordConsultationFormSubmission(): void {
  const now = Date.now();
  const recent = pruneTimestamps(readTimestamps(), now);
  recent.push(now);
  writeTimestamps(recent);
}
