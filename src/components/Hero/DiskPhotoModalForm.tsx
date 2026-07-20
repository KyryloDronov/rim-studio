"use client";

import Link from "next/link";
import { Send } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  type FormEvent,
} from "react";
import { Button } from "@/components/Button";
import { fieldDescribedBy, FormField } from "@/components/forms/FormField";
import {
  PhotoUpload,
  revokePhotoItems,
  type PhotoUploadItem,
} from "@/components/forms/PhotoUpload";
import { TextArea } from "@/components/forms/TextArea";
import { TextInput } from "@/components/forms/TextInput";
import { Modal } from "@/components/Modal";
import { MotionLetterReveal } from "@/components/MotionLetterReveal";
import {
  formatPolishPhoneInput,
  PL_PHONE_PREFIX,
} from "@/lib/formatPolishPhone";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/paths";

import styles from "./diskPhotoModal.module.css";

const MOTION_EASE = [0.22, 1, 0.36, 1] as const;
const MAX_PHOTOS = 10;

const FORM_STAGGER = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.38,
    },
  },
} as const;

const FIELD_REVEAL = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: MOTION_EASE,
    },
  },
} as const;

const PHOTO_REVEAL = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.68,
      ease: MOTION_EASE,
    },
  },
} as const;

type FieldErrors = Partial<
  Record<"name" | "phone" | "email" | "photos" | "comment", string>
>;

type DiskPhotoModalFormProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>;

export function DiskPhotoModalForm({
  open,
  onOpenChange,
}: DiskPhotoModalFormProps) {
  const { locale, t } = useLocale();
  const { hero, header } = t;
  const formCopy = hero.photoModal;
  const reactId = useId();
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = prefersReducedMotion !== true;

  const [motionKey, setMotionKey] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState<PhotoUploadItem[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    setMotionKey((key) => key + 1);
  }, [open]);

  useEffect(() => {
    if (open) return;

    setPhotos((prev) => {
      revokePhotoItems(prev);
      return [];
    });
    setName("");
    setPhone("");
    setEmail("");
    setComment("");
    setErrors({});
    setSubmitted(false);
  }, [open]);

  const validate = useCallback((): FieldErrors => {
    const next: FieldErrors = {};
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      next.name = formCopy.errors.nameRequired;
    }

    const phoneDigits = trimmedPhone.replace(/\D/g, "");
    if (!trimmedPhone || phoneDigits.length < 11) {
      next.phone = formCopy.errors.phoneRequired;
    }

    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      next.email = formCopy.errors.emailInvalid;
    }

    if (photos.length === 0) {
      next.photos = formCopy.errors.photosRequired;
    }

    return next;
  }, [email, formCopy.errors, name, phone, photos.length]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
  };

  const countLabel = useCallback(
    (current: number, max: number) =>
      formCopy.photosCount
        .replace("{current}", String(current))
        .replace("{max}", String(max)),
    [formCopy.photosCount],
  );

  const titleReveal = (
    <MotionLetterReveal
      key={`title-${motionKey}`}
      text={formCopy.title}
      active={open}
      delay={0.06}
    />
  );

  const descriptionReveal = (
    <MotionLetterReveal
      key={`desc-${motionKey}`}
      text={formCopy.body}
      active={open}
      delay={0.22}
      stagger={0.012}
    />
  );

  const formMotionProps = motionEnabled
    ? {
        variants: FORM_STAGGER,
        initial: "hidden" as const,
        animate: open && !submitted ? ("show" as const) : ("hidden" as const),
      }
    : {};

  const fieldMotionProps = motionEnabled
    ? {
        variants: FIELD_REVEAL,
        className: styles.formBlock,
      }
    : { className: styles.formBlock };

  const photoMotionProps = motionEnabled
    ? {
        variants: PHOTO_REVEAL,
        className: styles.formBlock,
      }
    : { className: styles.formBlock };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={titleReveal}
      description={descriptionReveal}
      closeLabel={header.close}
      panelClassName={styles.panel}
      footer={
        submitted ? null : (
          <motion.div
            key={`footer-${motionKey}`}
            className={styles.footerReveal}
            initial={motionEnabled ? { opacity: 0, y: 12 } : false}
            animate={
              motionEnabled && open
                ? { opacity: 1, y: 0 }
                : undefined
            }
            transition={{
              duration: 0.55,
              delay: 0.82,
              ease: MOTION_EASE,
            }}
          >
            <Button
              type="submit"
              form={`${reactId}-disk-photo-form`}
              variant="accent"
              size="md"
              expandFromIcon
              expandWhen
              icon={<Send strokeWidth={1.75} aria-hidden />}
            >
              {formCopy.submitLabel}
            </Button>
          </motion.div>
        )
      }
    >
      {submitted ? (
        <motion.div
          className={styles.success}
          initial={motionEnabled ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: MOTION_EASE }}
        >
          <p className={styles.successTitle}>{formCopy.successTitle}</p>
          <p className={styles.successBody}>{formCopy.successBody}</p>
        </motion.div>
      ) : (
        <motion.form
          key={`form-${motionKey}`}
          id={`${reactId}-disk-photo-form`}
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          {...formMotionProps}
        >
          <motion.div {...fieldMotionProps}>
            <FormField
              id={`${reactId}-name`}
              label={formCopy.fields.nameLabel}
              error={errors.name}
            >
              <TextInput
                id={`${reactId}-name`}
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={formCopy.fields.namePlaceholder}
                invalid={Boolean(errors.name)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={fieldDescribedBy(
                  `${reactId}-name`,
                  false,
                  Boolean(errors.name),
                )}
              />
            </FormField>
          </motion.div>

          <motion.div {...fieldMotionProps}>
            <FormField
              id={`${reactId}-phone`}
              label={formCopy.fields.phoneLabel}
              error={errors.phone}
            >
              <TextInput
                id={`${reactId}-phone`}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(formatPolishPhoneInput(event.target.value))
                }
                onFocus={() => {
                  if (!phone) setPhone(PL_PHONE_PREFIX);
                }}
                onBlur={() => {
                  if (phone === PL_PHONE_PREFIX) setPhone("");
                }}
                placeholder={formCopy.fields.phonePlaceholder}
                invalid={Boolean(errors.phone)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={fieldDescribedBy(
                  `${reactId}-phone`,
                  false,
                  Boolean(errors.phone),
                )}
              />
            </FormField>
          </motion.div>

          <motion.div {...fieldMotionProps}>
            <FormField
              id={`${reactId}-email`}
              label={formCopy.fields.emailLabel}
              optional
              optionalLabel={formCopy.fields.optionalLabel}
              error={errors.email}
            >
              <TextInput
                id={`${reactId}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={formCopy.fields.emailPlaceholder}
                invalid={Boolean(errors.email)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={fieldDescribedBy(
                  `${reactId}-email`,
                  false,
                  Boolean(errors.email),
                )}
              />
            </FormField>
          </motion.div>

          <motion.div {...photoMotionProps}>
            <PhotoUpload
              items={photos}
              onChange={(next) => {
                setPhotos(next);
                if (errors.photos && next.length > 0) {
                  setErrors((prev) => {
                    const { photos: _removed, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              maxFiles={MAX_PHOTOS}
              acceptLabel={formCopy.fields.photosLabel}
              dropTitle={formCopy.fields.photosDropTitle}
              dropHint={formCopy.fields.photosDropHint}
              countLabel={countLabel}
              removePhotoLabel={formCopy.fields.removePhotoLabel}
              invalid={Boolean(errors.photos)}
              error={errors.photos}
            />
          </motion.div>

          <motion.div {...fieldMotionProps}>
            <FormField
              id={`${reactId}-comment`}
              label={formCopy.fields.commentLabel}
              optional
              optionalLabel={formCopy.fields.optionalLabel}
              hint={formCopy.fields.commentHint}
            >
              <TextArea
                id={`${reactId}-comment`}
                name="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder={formCopy.fields.commentPlaceholder}
                aria-describedby={fieldDescribedBy(
                  `${reactId}-comment`,
                  true,
                  false,
                )}
              />
            </FormField>
          </motion.div>

          <motion.p
            {...fieldMotionProps}
            className={styles.privacy}
          >
            {formCopy.privacyBefore}
            <Link
              href={localizedPath(locale, formCopy.privacyHref)}
              className={styles.privacyLink}
            >
              {formCopy.privacyLinkLabel}
            </Link>
          </motion.p>
        </motion.form>
      )}
    </Modal>
  );
}
