/**
 * Scroll lock utility.
 *
 * Locks scrolling on both <html> and <body> while preserving layout
 * stability — when the viewport scrollbar disappears we add an equivalent
 * `padding-right` so the page does not visibly shift.
 *
 * Uses an internal refcount so multiple overlays can request a lock at
 * the same time and only the last `release()` actually restores the
 * document. Each `lock()` returns a release function; do not call it
 * more than once.
 */

type Snapshot = Readonly<{
  htmlOverflow: string;
  bodyOverflow: string;
  bodyPaddingRight: string;
}>;

let lockCount = 0;
let snapshot: Snapshot | null = null;

function getScrollbarWidth(): number {
  if (globalThis.window === undefined) return 0;
  return Math.max(
    0,
    globalThis.innerWidth - document.documentElement.clientWidth,
  );
}

export function lockScroll(): () => void {
  if (typeof document === "undefined") {
    return () => {};
  }

  if (lockCount === 0) {
    const html = document.documentElement;
    const body = document.body;
    snapshot = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };
    const scrollbarWidth = getScrollbarWidth();
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
  }

  lockCount += 1;
  let released = false;

  return () => {
    if (released) return;
    released = true;
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0 && snapshot) {
      const html = document.documentElement;
      const body = document.body;
      html.style.overflow = snapshot.htmlOverflow;
      body.style.overflow = snapshot.bodyOverflow;
      body.style.paddingRight = snapshot.bodyPaddingRight;
      snapshot = null;
    }
  };
}
