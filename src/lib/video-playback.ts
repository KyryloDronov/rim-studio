const MEDIA_WAIT_MS = 6000;

export function reverseVideoSrc(forwardSrc: string): string {
  return forwardSrc.replace(/\.mp4$/i, ".reverse.mp4");
}

export function waitForReadyState(
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

export function waitForPaintedFrame(video: HTMLVideoElement): Promise<void> {
  return new Promise((resolve) => {
    if ("requestVideoFrameCallback" in video) {
      video.requestVideoFrameCallback(() => resolve());
      return;
    }
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

export function ensureVideoSrc(
  video: HTMLVideoElement,
  src: string,
): Promise<boolean> {
  if (video.getAttribute("src") !== src) {
    video.src = src;
    video.load();
  }

  return waitForReadyState(video, HTMLMediaElement.HAVE_CURRENT_DATA);
}
