"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { curveVariants, opacity, slideUp } from "./anim";
import styles from "./style.module.css";

const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Guten tag",
  "Hallo",
];

type PreloaderProps = {
  onWordsDone: () => void;
};

export default function Preloader({ onWordsDone }: PreloaderProps) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const updateSize = useCallback(() => {
    setDimension({
      width: globalThis.window.innerWidth,
      height: globalThis.window.innerHeight,
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    const frame = globalThis.window.requestAnimationFrame(() => {
      if (!cancelled) updateSize();
    });
    globalThis.window.addEventListener("resize", updateSize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      globalThis.window.removeEventListener("resize", updateSize);
    };
  }, [updateSize]);

  useEffect(() => {
    if (index < words.length - 1) {
      const delay = index === 0 ? 1000 : 150;
      const id = globalThis.window.setTimeout(
        () => setIndex((i) => i + 1),
        delay,
      );
      return () => globalThis.window.clearTimeout(id);
    }

    const id = globalThis.window.setTimeout(() => {
      onWordsDone();
    }, 900);
    return () => globalThis.window.clearTimeout(id);
  }, [index, onWordsDone]);

  const { initialPath, targetPath } = useMemo(() => {
    const { width, height } = dimension;
    return {
      initialPath: `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`,
      targetPath: `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`,
    };
  }, [dimension]);

  const curve = useMemo(
    () => curveVariants(initialPath, targetPath),
    [initialPath, targetPath],
  );

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate="initial"
      exit="exit"
      className={styles.introduction}
    >
      {dimension.width > 0 && (
        <>
          <motion.p variants={opacity} initial="initial" animate="enter">
            <span aria-hidden />
            {words[index]}
          </motion.p>
          <svg
            className={styles.curve}
            width={dimension.width}
            height={dimension.height + 300}
            aria-hidden
          >
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              fill="currentColor"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}
