"use client";

import { useEffect, useRef, type RefObject } from "react";

import styles from "./style.module.css";

type Star = {
  x: number;
  y: number;
  z: number;
  alpha: number;
  vx: number;
  vy: number;
};

type ProcessStarfieldProps = Readonly<{
  containerRef: RefObject<HTMLElement | null>;
  enabled: boolean;
}>;

const STAR_COLOR = "rgb(205 218 235 / 0.88)";
const STAR_SIZE = 3.5;
const STAR_MIN_SCALE = 0.35;
const OVERFLOW_THRESHOLD = 50;
const DRIFT_Z = 0.00008;
const POINTER_DIVISOR = 64;
const VELOCITY_LERP = 0.35;
const VELOCITY_DECAY = 0.97;
const MOVE_SCALE = 0.35;
const AMBIENT_SPEED = 0.22;
const AMBIENT_JITTER = 0.018;
const MAX_DPR = 1.5;

function randomAmbientVelocity(): { vx: number; vy: number } {
  const angle = Math.random() * Math.PI * 2;
  const speed = AMBIENT_SPEED * (0.35 + Math.random() * 0.65);
  return {
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
  };
}

function nudgeAmbientVelocity(star: Star) {
  star.vx += (Math.random() - 0.5) * AMBIENT_JITTER;
  star.vy += (Math.random() - 0.5) * AMBIENT_JITTER;

  const maxSpeed = AMBIENT_SPEED * (0.6 + star.z * 0.5);
  const speed = Math.hypot(star.vx, star.vy);

  if (speed > maxSpeed) {
    star.vx = (star.vx / speed) * maxSpeed;
    star.vy = (star.vy / speed) * maxSpeed;
  }
}

function starCountForSize(width: number, height: number) {
  return Math.round((width + height) / 8);
}

export function ProcessStarfield({ containerRef, enabled }: ProcessStarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: 0, scale: 1 });
  const pointerRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });
  const velocityRef = useRef({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    z: DRIFT_Z,
  });
  const touchInputRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const placeStar = (star: Star) => {
      const { width, height } = sizeRef.current;
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    };

    const recycleStar = (star: Star) => {
      const { width, height } = sizeRef.current;
      const velocity = velocityRef.current;
      let direction = "z";

      const vx = Math.abs(velocity.x);
      const vy = Math.abs(velocity.y);

      if (vx > 0.4 || vy > 0.4) {
        let axis: "h" | "v";
        if (vx > vy) {
          axis = Math.random() < vx / (vx + vy) ? "h" : "v";
        } else {
          axis = Math.random() < vy / (vx + vy) ? "v" : "h";
        }

        if (axis === "h") {
          direction = velocity.x > 0 ? "l" : "r";
        } else {
          direction = velocity.y > 0 ? "t" : "b";
        }
      }

      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
      star.alpha = 0.32 + star.z * 0.38;
      Object.assign(star, randomAmbientVelocity());

      if (direction === "z") {
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      } else if (direction === "l") {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      } else if (direction === "r") {
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      } else if (direction === "t") {
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
      } else if (direction === "b") {
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
      }
    };

    const ensureStars = () => {
      const { width, height } = sizeRef.current;
      if (!width || !height) return;

      const target = starCountForSize(width / sizeRef.current.scale, height / sizeRef.current.scale);

      while (starsRef.current.length < target) {
        const star: Star = {
          x: 0,
          y: 0,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
          alpha: 0.32 + Math.random() * 0.42,
          ...randomAmbientVelocity(),
        };
        placeStar(star);
        starsRef.current.push(star);
      }

      if (starsRef.current.length > target) {
        starsRef.current.length = target;
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const cssWidth = Math.max(1, rect.width);
      const cssHeight = Math.max(1, rect.height);
      const scale = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      sizeRef.current = {
        width: cssWidth * scale,
        height: cssHeight * scale,
        scale,
      };

      canvas.width = sizeRef.current.width;
      canvas.height = sizeRef.current.height;

      ensureStars();
      starsRef.current.forEach(placeStar);
    };

    const movePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = (clientX - rect.left) * sizeRef.current.scale;
      const y = (clientY - rect.top) * sizeRef.current.scale;
      const pointer = pointerRef.current;
      const velocity = velocityRef.current;
      const touchInput = touchInputRef.current;

      if (typeof pointer.x === "number" && typeof pointer.y === "number") {
        const ox = x - pointer.x;
        const oy = y - pointer.y;
        const sign = touchInput ? 1 : -1;

        velocity.tx += (ox / (POINTER_DIVISOR * sizeRef.current.scale)) * sign;
        velocity.ty += (oy / (POINTER_DIVISOR * sizeRef.current.scale)) * sign;
      }

      pointer.x = x;
      pointer.y = y;
    };

    const onMouseMove = (event: MouseEvent) => {
      touchInputRef.current = false;
      movePointer(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      touchInputRef.current = true;
      const touch = event.touches[0];
      if (!touch) return;
      movePointer(touch.clientX, touch.clientY);
    };

    const onPointerLeave = () => {
      pointerRef.current.x = null;
      pointerRef.current.y = null;
    };

    const update = () => {
      const { width, height } = sizeRef.current;
      const velocity = velocityRef.current;

      velocity.tx *= VELOCITY_DECAY;
      velocity.ty *= VELOCITY_DECAY;
      velocity.x += (velocity.tx - velocity.x) * VELOCITY_LERP;
      velocity.y += (velocity.ty - velocity.y) * VELOCITY_LERP;

      for (const star of starsRef.current) {
        nudgeAmbientVelocity(star);

        star.x += velocity.x * star.z * MOVE_SCALE + star.vx * star.z;
        star.y += velocity.y * star.z * MOVE_SCALE + star.vy * star.z;
        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        star.z += velocity.z;

        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > width + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > height + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star);
        }
      }
    };

    const render = () => {
      const { width, height, scale } = sizeRef.current;
      const velocity = velocityRef.current;

      context.clearRect(0, 0, width, height);
      context.strokeStyle = STAR_COLOR;
      context.lineCap = "round";

      for (const star of starsRef.current) {
        context.globalAlpha = star.alpha;
        context.lineWidth = STAR_SIZE * star.z * scale;

        context.beginPath();
        context.moveTo(star.x, star.y);

        let tailX = velocity.x * 3 * MOVE_SCALE + star.vx * 5;
        let tailY = velocity.y * 3 * MOVE_SCALE + star.vy * 5;

        if (Math.abs(tailX) < 0.15 && Math.abs(tailY) < 0.15) {
          tailX = star.vx * 4 || 0.5;
          tailY = star.vy * 4 || 0.5;
        }

        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
      }

      context.globalAlpha = 1;
    };

    const step = () => {
      update();
      render();
      rafRef.current = requestAnimationFrame(step);
    };

    resize();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("mouseleave", onPointerLeave);
    container.addEventListener("touchend", onPointerLeave);

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("mouseleave", onPointerLeave);
      container.removeEventListener("touchend", onPointerLeave);
      starsRef.current = [];
    };
  }, [containerRef, enabled]);

  if (!enabled) return null;

  return (
    <div className={styles.starfield} aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
}
