"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Phase = "idle" | "forward" | "reverse" | "exiting";
export type ActiveVideo = "none" | "forward" | "reverse";

const HOVER_DWELL_MS = 380;
const EDGE_EPSILON = 0.05;
const MEDIA_WAIT_MS = 6000;

function waitForReadyState(
  video: HTMLVideoElement,
  minReadyState: number,
  timeoutMs = MEDIA_WAIT_MS,
): Promise<boolean> {
  if (video.readyState >= minReadyState) return Promise.resolve(true);

  return new Promise((resolve) => {
    const onProgress = () => {
      if (video.readyState >= minReadyState) {
        cleanup();
        resolve(true);
      }
    };

    const onError = () => {
      cleanup();
      resolve(false);
    };

    const timeout = setTimeout(() => {
      cleanup();
      resolve(video.readyState >= minReadyState);
    }, timeoutMs);

    const cleanup = () => {
      clearTimeout(timeout);
      video.removeEventListener("loadedmetadata", onProgress);
      video.removeEventListener("loadeddata", onProgress);
      video.removeEventListener("canplay", onProgress);
      video.removeEventListener("canplaythrough", onProgress);
      video.removeEventListener("error", onError);
    };

    video.addEventListener("loadedmetadata", onProgress);
    video.addEventListener("loadeddata", onProgress);
    video.addEventListener("canplay", onProgress);
    video.addEventListener("canplaythrough", onProgress);
    video.addEventListener("error", onError, { once: true });
    onProgress();
  });
}

function waitForPaintedFrame(video: HTMLVideoElement): Promise<void> {
  return new Promise((resolve) => {
    if ("requestVideoFrameCallback" in video) {
      video.requestVideoFrameCallback(() => resolve());
      return;
    }
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

function ensureVideoSrc(
  video: HTMLVideoElement,
  src: string,
): Promise<boolean> {
  if (video.getAttribute("src") !== src) {
    video.src = src;
    video.load();
  }

  return waitForReadyState(video, HTMLMediaElement.HAVE_CURRENT_DATA);
}

export function useShowcaseCardVideo(
  videoSrc: string,
  videoReverseSrc: string,
  enabled: boolean,
) {
  const forwardVideoRef = useRef<HTMLVideoElement>(null);
  const reverseVideoRef = useRef<HTMLVideoElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionRef = useRef(0);
  const phaseRef = useRef<Phase>("idle");
  const hoverRef = useRef(false);
  const activeVideoRef = useRef<ActiveVideo>("none");
  const [activeVideo, setActiveVideoState] = useState<ActiveVideo>("none");

  const setActiveVideo = useCallback((next: ActiveVideo) => {
    activeVideoRef.current = next;
    setActiveVideoState(next);
  }, []);

  const clearHoverTimer = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  const pauseAll = useCallback(() => {
    forwardVideoRef.current?.pause();
    reverseVideoRef.current?.pause();
  }, []);

  const hideVideo = useCallback(() => {
    phaseRef.current = "idle";
    setActiveVideo("none");
    pauseAll();

    const forward = forwardVideoRef.current;
    if (forward) {
      forward.playbackRate = 1;
      forward.currentTime = 0;
    }

    const reverse = reverseVideoRef.current;
    if (reverse) {
      reverse.playbackRate = 1;
      reverse.currentTime = 0;
    }
  }, [pauseAll, setActiveVideo]);

  const play = useCallback((video: HTMLVideoElement) => {
    video.playbackRate = 1;
    void video.play().catch(() => {});
  }, []);

  const showForward = useCallback(
    async (session: number, startTime = 0): Promise<boolean> => {
      const forward = forwardVideoRef.current;
      if (!forward || !hoverRef.current || session !== sessionRef.current) {
        return false;
      }

      const ready = await ensureVideoSrc(forward, videoSrc);
      if (!ready || !hoverRef.current || session !== sessionRef.current) {
        return false;
      }

      forward.pause();
      forward.currentTime = startTime;
      await waitForPaintedFrame(forward);

      if (!hoverRef.current || session !== sessionRef.current) return false;

      setActiveVideo("forward");
      play(forward);
      return true;
    },
    [play, setActiveVideo, videoSrc],
  );

  const showReverse = useCallback(
    async (
      session: number,
      startTime = 0,
      phase: Phase = "reverse",
    ): Promise<boolean> => {
      const reverse = reverseVideoRef.current;
      if (!reverse || session !== sessionRef.current) return false;
      if (phase !== "exiting" && !hoverRef.current) return false;

      const ready = await ensureVideoSrc(reverse, videoReverseSrc);
      if (!ready || session !== sessionRef.current) return false;
      if (phase !== "exiting" && !hoverRef.current) return false;

      reverse.pause();
      reverse.currentTime = startTime;
      await waitForPaintedFrame(reverse);

      if (session !== sessionRef.current) return false;
      if (phase !== "exiting" && !hoverRef.current) return false;

      setActiveVideo("reverse");
      play(reverse);
      return true;
    },
    [play, setActiveVideo, videoReverseSrc],
  );

  const prefetchReverse = useCallback(() => {
    const reverse = reverseVideoRef.current;
    if (!reverse || reverse.getAttribute("src") === videoReverseSrc) return;
    reverse.src = videoReverseSrc;
    reverse.load();
  }, [videoReverseSrc]);

  const prepareForward = useCallback(async (): Promise<boolean> => {
    const forward = forwardVideoRef.current;
    if (!forward) return false;
    return ensureVideoSrc(forward, videoSrc);
  }, [videoSrc]);

  const startPlayback = useCallback(
    async (session: number) => {
      if (!hoverRef.current || session !== sessionRef.current) return;

      const forward = forwardVideoRef.current;
      if (!forward) return;

      const ready = await ensureVideoSrc(forward, videoSrc);
      if (!ready || !hoverRef.current || session !== sessionRef.current) return;
      if (!Number.isFinite(forward.duration)) return;

      phaseRef.current = "forward";
      await showForward(session, 0);
    },
    [showForward, videoSrc],
  );

  const startPingPongReverse = useCallback(
    async (session: number) => {
      if (!hoverRef.current || session !== sessionRef.current) return;

      phaseRef.current = "reverse";
      await showReverse(session, 0, "reverse");
    },
    [showReverse],
  );

  const startPingPongForward = useCallback(
    async (session: number) => {
      if (!hoverRef.current || session !== sessionRef.current) return;

      phaseRef.current = "forward";
      await showForward(session, 0);
    },
    [showForward],
  );

  const startExitRewind = useCallback(
    async (session: number) => {
      const leavingFrom = phaseRef.current;
      if (leavingFrom === "idle") return;

      phaseRef.current = "exiting";
      const forward = forwardVideoRef.current;
      const reverse = reverseVideoRef.current;
      if (!forward || !reverse) {
        hideVideo();
        return;
      }

      if (leavingFrom === "forward") {
        if (activeVideoRef.current !== "forward") {
          hideVideo();
          return;
        }

        if (forward.currentTime <= EDGE_EPSILON) {
          hideVideo();
          return;
        }

        forward.pause();
        const duration = forward.duration;
        const reverseStart = Number.isFinite(duration)
          ? Math.max(0, duration - forward.currentTime)
          : 0;

        await showReverse(session, reverseStart, "exiting");
        return;
      }

      if (activeVideoRef.current === "reverse") {
        if (reverse.currentTime >= reverse.duration - EDGE_EPSILON) {
          hideVideo();
          return;
        }

        play(reverse);
      } else {
        hideVideo();
      }
    },
    [hideVideo, play, showReverse],
  );

  const onPointerEnter = useCallback(() => {
    if (!enabled) return;

    hoverRef.current = true;
    const session = ++sessionRef.current;
    clearHoverTimer();
    prefetchReverse();
    void prepareForward();

    hoverTimerRef.current = setTimeout(() => {
      hoverTimerRef.current = null;
      void startPlayback(session);
    }, HOVER_DWELL_MS);
  }, [clearHoverTimer, enabled, prefetchReverse, prepareForward, startPlayback]);

  const onPointerLeave = useCallback(() => {
    hoverRef.current = false;
    const session = ++sessionRef.current;
    clearHoverTimer();

    if (!enabled) return;
    if (phaseRef.current === "idle") return;

    void startExitRewind(session);
  }, [clearHoverTimer, enabled, startExitRewind]);

  const onVideoEnded = useCallback(
    (which: ActiveVideo) => {
      if (!enabled) return;

      const session = sessionRef.current;

      if (phaseRef.current === "exiting" || phaseRef.current === "idle") {
        hideVideo();
        return;
      }

      if (phaseRef.current === "forward" && which === "forward") {
        void startPingPongReverse(session);
        return;
      }

      if (phaseRef.current === "reverse" && which === "reverse") {
        if (hoverRef.current) {
          void startPingPongForward(session);
        } else {
          hideVideo();
        }
      }
    },
    [enabled, hideVideo, startPingPongForward, startPingPongReverse],
  );

  useEffect(
    () => () => {
      clearHoverTimer();
    },
    [clearHoverTimer],
  );

  useEffect(() => {
    if (enabled) return;

    sessionRef.current += 1;
    clearHoverTimer();
    hideVideo();
  }, [clearHoverTimer, enabled, hideVideo]);

  return {
    forwardVideoRef,
    reverseVideoRef,
    activeVideo,
    onPointerEnter,
    onPointerLeave,
    onVideoEnded,
  };
}

export function useShowcaseHoverVideoEnabled(
  prefersReducedMotion: boolean | null,
) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setEnabled(false);
      return;
    }
    const mq = globalThis.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [prefersReducedMotion]);

  return enabled;
}
