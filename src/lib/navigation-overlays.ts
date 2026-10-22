import { useEffect } from "react";

const closeListeners = new Set<() => void>();

/** Register a modal / sheet close handler for animated in-app navigation. */
export function registerOverlayCloseOnNavigate(close: () => void): () => void {
  closeListeners.add(close);
  return () => {
    closeListeners.delete(close);
  };
}

/** Close every registered overlay (modals, contact sheet, etc.). */
export function closeAllNavigationOverlays(): void {
  for (const close of closeListeners) {
    close();
  }
}

export function useRegisterCloseOnNavigate(
  close: () => void,
  active: boolean,
): void {
  useEffect(() => {
    if (!active) return;
    return registerOverlayCloseOnNavigate(close);
  }, [active, close]);
}
