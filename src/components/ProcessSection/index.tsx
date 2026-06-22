"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PROCESS_SECTION_VIDEO } from "@/content/process-section";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/paths";

import { AmorphStepNumber } from "./AmorphStepNumber";
import { ProcessDiagram } from "./ProcessDiagram";
import { ProcessStarfield } from "./ProcessStarfield";
import styles from "./style.module.css";

export const PROCESS_SECTION_ID = "process";

const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export function ProcessSection() {
  const { locale, t } = useLocale();
  const { process } = t;
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [activeStepId, setActiveStepId] = useState(process.steps[0]?.id ?? "");

  const activeStep = useMemo(
    () =>
      process.steps.find((step) => step.id === activeStepId) ?? process.steps[0],
    [activeStepId, process.steps],
  );

  const activeIndex = useMemo(
    () =>
      Math.max(
        0,
        process.steps.findIndex((step) => step.id === activeStepId),
      ),
    [activeStepId, process.steps],
  );

  const showContent = prefersReducedMotion === true || inView;
  const animateIn = prefersReducedMotion !== true && inView;
  const starfieldEnabled = prefersReducedMotion !== true && inView;

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section
      ref={sectionRef}
      id={PROCESS_SECTION_ID}
      className={styles.section}
      aria-labelledby={`${PROCESS_SECTION_ID}-title`}
    >
      <ProcessStarfield containerRef={sectionRef} enabled={starfieldEnabled} />

      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerCopy}>
            <motion.h2
              id={`${PROCESS_SECTION_ID}-title`}
              className={styles.title}
              initial={
                prefersReducedMotion === true ? false : { opacity: 0, y: 20 }
              }
              animate={showContent ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease: MOTION_EASE }}
            >
              <motion.span
                className={styles.titleMuted}
                initial={{ opacity: 0, y: 20 }}
                animate={showContent ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, ease: MOTION_EASE }}
              >
                {process.titleMuted}
              </motion.span>
              <motion.span
                className={styles.titleStrong}
                initial={{ opacity: 0, y: 20 }}
                animate={showContent ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, ease: MOTION_EASE, delay: 0.1 }}
              >
                {process.titleStrong}
              </motion.span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={showContent ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.55, ease: MOTION_EASE, delay: 0.25 }}
          >
            <Link
              href={localizedPath(locale, process.cta.href)}
              className={styles.headerAction}
              aria-label={process.cta.label}
            >
              <Plus strokeWidth={1.3} aria-hidden />
            </Link>
          </motion.div>
        </header>

        <div className={styles.layout}>
          <div className={styles.leftCol}>
            <motion.article
              className={styles.videoCard}
              initial={{ opacity: 0, y: 24 }}
              animate={showContent ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease: MOTION_EASE, delay: 0.2 }}
            >
              <video
                ref={videoRef}
                className={styles.videoMedia}
                src={PROCESS_SECTION_VIDEO}
                muted
                playsInline
                loop
                autoPlay
                preload="metadata"
                aria-label={process.videoAlt}
              />
              <div className={styles.videoReadability} aria-hidden />
            </motion.article>

            <div className={styles.stepCopy} aria-live="polite" aria-atomic="true">
              <div className={styles.stepRow}>
                <AmorphStepNumber key={activeStepId} value={activeIndex + 1} />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep?.id}
                    className={styles.stepText}
                    initial={
                      prefersReducedMotion === true
                        ? false
                        : { opacity: 0, y: 14 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion === true
                        ? undefined
                        : { opacity: 0, y: -8 }
                    }
                    transition={{ duration: 0.45, ease: MOTION_EASE }}
                  >
                    <p className={styles.stepLabel}>{activeStep?.label}</p>
                    <p className={styles.stepDescription}>
                      {activeStep?.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className={styles.rightCol}>
            <ProcessDiagram
              steps={process.steps}
              ariaLabel={process.diagramAriaLabel}
              activeId={activeStepId}
              onActiveChange={setActiveStepId}
              visible={showContent}
              animateIn={animateIn}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
