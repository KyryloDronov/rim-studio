"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import styles from "./style.module.css";

const VIEW_SIZE = 100;
const CENTER = VIEW_SIZE / 2;
const LABEL_RADIUS = 46;
const LINE_RADIUS = 36;
const BLOB_RADIUS = 34;
/** Sector extends past blob so the slice fully covers the quadrant after clipping. */
const SECTOR_RADIUS = 54;
const STEP_COUNT = 4;
const START_ANGLE = -90;
const FILL_EASE = [0.22, 1, 0.36, 1] as const;
const FILL_DURATION = 0.75;

type BlobPoint = Readonly<{ x: number; y: number }>;

type ProcessStep = Readonly<{
  id: string;
  label: string;
}>;

type ProcessDiagramProps = Readonly<{
  steps: ReadonlyArray<ProcessStep>;
  ariaLabel: string;
  activeId: string;
  onActiveChange: (id: string) => void;
  visible: boolean;
  animateIn: boolean;
}>;

function polarToCartesian(
  angleDeg: number,
  radius: number,
  cx = CENTER,
  cy = CENTER,
): BlobPoint {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function stepAngle(index: number, count = STEP_COUNT): number {
  return START_ANGLE + (360 / count) * index;
}

function catmullRomClosedPath(points: ReadonlyArray<BlobPoint>): string {
  const n = points.length;
  if (n < 3) return "";

  let d = "";
  for (let i = 0; i < n; i += 1) {
    const p0 = points[(i - 1 + n) % n]!;
    const p1 = points[i]!;
    const p2 = points[(i + 1) % n]!;
    const p3 = points[(i + 2) % n]!;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    if (i === 0) d += `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }

  return `${d} Z`;
}

function buildBlobPath(
  time: number,
  seed: number,
  pointCount = 16,
  radiusInset = 0,
): string {
  const points = Array.from({ length: pointCount }, (_, i) => {
    const angle = (i / pointCount) * Math.PI * 2 - Math.PI / 2;
    const wobble =
      Math.sin(time * 0.0009 + seed + i * 0.62) * 5 +
      Math.cos(time * 0.00115 + seed * 0.75 + i * 0.41) * 3.8 +
      Math.sin(time * 0.00065 + i * 1.12 + seed * 1.4) * 2.2;
    const radius = BLOB_RADIUS + wobble + seed * 0.35 - radiusInset;

    return {
      x: CENTER + radius * Math.cos(angle),
      y: CENTER + radius * Math.sin(angle),
    };
  });

  return catmullRomClosedPath(points);
}

/** Wedge from START_ANGLE with a given sweep in degrees (0–360). */
function buildSweepSectorPath(sweepDeg: number, radius: number): string {
  if (sweepDeg >= 359.5) {
    const start = polarToCartesian(START_ANGLE, radius);
    const mid = polarToCartesian(START_ANGLE + 180, radius);

    return [
      `M ${CENTER} ${CENTER}`,
      `L ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
      `A ${radius} ${radius} 0 1 1 ${mid.x.toFixed(2)} ${mid.y.toFixed(2)}`,
      `A ${radius} ${radius} 0 1 1 ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
      "Z",
    ].join(" ");
  }

  if (sweepDeg <= 0.01) {
    return `M ${CENTER} ${CENTER} L ${CENTER} ${CENTER} Z`;
  }

  const start = polarToCartesian(START_ANGLE, radius);
  const end = polarToCartesian(START_ANGLE + sweepDeg, radius);
  const largeArc = sweepDeg > 180 ? 1 : 0;

  return [
    `M ${CENTER} ${CENTER}`,
    `L ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `A ${radius} ${radius} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
    "Z",
  ].join(" ");
}

function targetSweepForStep(stepIndex: number, stepCount: number): number {
  if (stepIndex >= stepCount - 1) return 360;
  return (360 / stepCount) * (stepIndex + 1);
}

export function ProcessDiagram({
  steps,
  ariaLabel,
  activeId,
  onActiveChange,
  visible,
  animateIn,
}: ProcessDiagramProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [blobPaths, setBlobPaths] = useState<ReadonlyArray<string>>(["", "", ""]);
  const [blobClipPath, setBlobClipPath] = useState("");
  const highlightedId = hoveredId ?? activeId;

  const activeIndex = useMemo(
    () => Math.max(0, steps.findIndex((step) => step.id === highlightedId)),
    [highlightedId, steps],
  );

  const targetSweep = targetSweepForStep(activeIndex, steps.length);
  const fillSweepRef = useRef(targetSweep);
  const [fillSweep, setFillSweep] = useState(targetSweep);

  useEffect(() => {
    fillSweepRef.current = fillSweep;
  }, [fillSweep]);

  useEffect(() => {
    if (prefersReducedMotion === true) {
      fillSweepRef.current = targetSweep;
      setFillSweep(targetSweep);
      return;
    }

    const controls = animate(fillSweepRef.current, targetSweep, {
      duration: FILL_DURATION,
      ease: FILL_EASE,
      onUpdate: (value) => {
        fillSweepRef.current = value;
        setFillSweep(value);
      },
    });

    return () => controls.stop();
  }, [targetSweep, prefersReducedMotion]);

  useEffect(() => {
    const applyPaths = (time: number) => {
      setBlobPaths([
        buildBlobPath(time, 0),
        buildBlobPath(time, 2.1),
        buildBlobPath(time, 4.2),
      ]);
      setBlobClipPath(buildBlobPath(time, 0, 16, 2.4));
    };

    if (prefersReducedMotion === true) {
      applyPaths(0);
      return;
    }

    let frame = 0;

    const tick = (time: number) => {
      applyPaths(time);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [prefersReducedMotion]);

  const activate = (id: string) => {
    onActiveChange(id);
  };

  const sectorPath = buildSweepSectorPath(fillSweep, SECTOR_RADIUS);
  const clipId = useId().replace(/:/g, "");

  return (
    <div
      className={`${styles.diagramWrap} ${visible ? styles.diagramVisible : ""}`}
      role="group"
      aria-label={ariaLabel}
    >
      <div className={styles.diagramInner}>
        <svg
          className={styles.diagramSvg}
          viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
          aria-hidden
        >
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <path d={blobClipPath} />
            </clipPath>
          </defs>

          <g clipPath={`url(#${clipId})`}>
            <path d={sectorPath} className={styles.blobSector} />
          </g>

          {blobPaths.map((path, layer) => (
            <path
              key={`blob-stroke-${layer}`}
              d={path}
              className={styles.blobStroke}
            />
          ))}

          {steps.map((step, index) => {
            const angle = stepAngle(index, steps.length);
            const outer = polarToCartesian(angle, LINE_RADIUS);
            const isActive = step.id === highlightedId;

            return (
              <line
                key={`spoke-${step.id}`}
                x1={CENTER}
                y1={CENTER}
                x2={outer.x}
                y2={outer.y}
                className={`${styles.diagramSpoke} ${isActive ? styles.diagramSpokeActive : ""}`}
              />
            );
          })}
        </svg>

        {steps.map((step, index) => {
          const angle = stepAngle(index, steps.length);
          const { x, y } = polarToCartesian(angle, LABEL_RADIUS);
          const isActive = step.id === highlightedId;
          const delay = prefersReducedMotion === true ? 0 : 0.55 + index * 0.1;

          return (
            <button
              key={step.id}
              type="button"
              className={`${styles.diagramLabel} ${isActive ? styles.diagramLabelActive : ""} ${visible ? styles.diagramLabelVisible : ""}`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transitionDelay: animateIn ? `${delay}s` : "0s",
              }}
              aria-pressed={step.id === activeId}
              onClick={() => activate(step.id)}
              onMouseEnter={() => {
                setHoveredId(step.id);
                activate(step.id);
              }}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => {
                setHoveredId(step.id);
                activate(step.id);
              }}
              onBlur={() => setHoveredId(null)}
            >
              <span className={styles.diagramStepLabel}>
                {index + 1}. {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
