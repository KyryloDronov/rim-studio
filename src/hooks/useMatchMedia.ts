"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, onStoreChange: () => void) {
  const mq = globalThis.matchMedia(query);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

/** Client-only viewport query — `serverSnapshot` is used during SSR. */
export function useMatchMedia(query: string, serverSnapshot = false) {
  return useSyncExternalStore(
    (onStoreChange) => subscribe(query, onStoreChange),
    () => globalThis.matchMedia(query).matches,
    () => serverSnapshot,
  );
}
