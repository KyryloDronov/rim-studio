"use client";

import { useDropzone } from "react-dropzone";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Camera, X } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef } from "react";

import styles from "./style.module.css";

export type PhotoUploadItem = Readonly<{
  id: string;
  file: File;
  previewUrl: string;
}>;

type PhotoUploadProps = Readonly<{
  items: PhotoUploadItem[];
  onChange: (items: PhotoUploadItem[]) => void;
  maxFiles?: number;
  acceptLabel: string;
  dropTitle: string;
  dropHint: string;
  countLabel: (current: number, max: number) => string;
  removePhotoLabel: string;
  invalid?: boolean;
  error?: string;
}>;

const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

const ACCEPT = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/heic": [".heic"],
  "image/heif": [".heif"],
};

function createPhotoItem(file: File): PhotoUploadItem {
  return {
    id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
    file,
    previewUrl: URL.createObjectURL(file),
  };
}

export function PhotoUpload({
  items,
  onChange,
  maxFiles = 10,
  acceptLabel,
  dropTitle,
  dropHint,
  countLabel,
  removePhotoLabel,
  invalid,
  error,
}: PhotoUploadProps) {
  const reactId = useId();
  const inputId = `${reactId}-photos`;
  const prefersReducedMotion = useReducedMotion();
  const atLimit = items.length >= maxFiles;
  const remaining = maxFiles - items.length;
  const hasItems = items.length > 0;

  const revokeAll = useCallback((photos: PhotoUploadItem[]) => {
    for (const photo of photos) {
      URL.revokeObjectURL(photo.previewUrl);
    }
  }, []);

  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    return () => revokeAll(itemsRef.current);
  }, [revokeAll]);

  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted.length === 0) return;

      const slice = accepted.slice(0, remaining);
      const next = [...items, ...slice.map(createPhotoItem)];
      onChange(next);
    },
    [items, onChange, remaining],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: ACCEPT,
    maxFiles: remaining,
    multiple: true,
    disabled: atLimit,
    noClick: hasItems,
    noKeyboard: false,
  });

  const removePhoto = useCallback(
    (id: string) => {
      const target = items.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      onChange(items.filter((item) => item.id !== id));
    },
    [items, onChange],
  );

  const countText = useMemo(
    () => countLabel(items.length, maxFiles),
    [countLabel, items.length, maxFiles],
  );

  const fieldClass = [
    styles.photoField,
    isDragActive ? styles.photoFieldActive : "",
    invalid ? styles.photoFieldInvalid : "",
  ]
    .filter(Boolean)
    .join(" ");

  const dropzoneClass = [
    styles.dropzone,
    isDragActive ? styles.dropzoneActive : "",
    atLimit ? styles.dropzoneDisabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div {...getRootProps({ className: fieldClass })}>
      <input
        {...getInputProps({
          id: inputId,
          "aria-labelledby": `${inputId}-label`,
          "aria-describedby": error ? `${inputId}-error` : undefined,
        })}
      />

      <span id={`${inputId}-label`} className={styles.label}>
        {acceptLabel}
      </span>

      {hasItems ? (
        <div className={styles.thumbStripFade}>
          <ul
            className={styles.thumbStrip}
            aria-live="polite"
            data-lenis-prevent
            data-lenis-prevent-horizontal
          >
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.li
                  key={item.id}
                  className={styles.thumb}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.28, ease: MOTION_EASE }}
                >
                {/* eslint-disable-next-line @next/next/no-img-element -- blob preview URLs */}
                <img
                  src={item.previewUrl}
                  alt=""
                  className={styles.thumbImage}
                  draggable={false}
                />
                <button
                  type="button"
                  className={styles.thumbRemove}
                  aria-label={`${removePhotoLabel}: ${item.file.name}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    removePhoto(item.id);
                  }}
                >
                  <X className={styles.thumbRemoveIcon} strokeWidth={2.25} aria-hidden />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        </div>
      ) : (
        <div className={dropzoneClass}>
          <Camera className={styles.dropzoneIcon} strokeWidth={1.75} aria-hidden />
          <p className={styles.dropzoneTitle}>{dropTitle}</p>
          <p className={styles.dropzoneHint}>{dropHint}</p>
        </div>
      )}

      {!atLimit && hasItems ? (
        <button
          type="button"
          className={styles.addMoreBtn}
          onClick={(event) => {
            event.stopPropagation();
            open();
          }}
        >
          {dropTitle}
        </button>
      ) : null}

      {isDragActive && hasItems ? (
        <p className={styles.dragOverlayHint}>{dropHint}</p>
      ) : null}

      <p className={styles.photoMeta}>
        <span className={styles.photoMetaStrong}>{countText}</span>
      </p>

      {error ? (
        <p id={`${inputId}-error`} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function revokePhotoItems(items: PhotoUploadItem[]) {
  for (const item of items) {
    URL.revokeObjectURL(item.previewUrl);
  }
}
