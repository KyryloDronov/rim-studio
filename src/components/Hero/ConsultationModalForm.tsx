"use client";

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
import { TextInput } from "@/components/forms/TextInput";
import { Modal } from "@/components/Modal";
import { MotionLetterReveal } from "@/components/MotionLetterReveal";
import type { ConsultationSourceId } from "@/content/consultation-sources";
import { useConsultationPage } from "@/hooks/useConsultationPage";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/paths";
import { FormPrivacyNotice } from "@/components/forms/FormPrivacyNotice";
import { FormSuccessState } from "@/components/forms/FormSuccessState";
import {
  consultationSubmitErrorMessage,
  submitConsultationRequest,
} from "@/lib/consultation-request";
import { PhoneInputMessengerRow } from "@/components/StudioMessengerLinks";
import {
  formatPolishPhoneInput,
  PL_PHONE_PREFIX,
} from "@/lib/formatPolishPhone";

import styles from "./diskPhotoModal.module.css";

const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

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
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: MOTION_EASE },
  },
} as const;

type FieldErrors = Partial<Record<"name" | "phone" | "submit", string>>;

type ConsultationModalFormProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source: ConsultationSourceId;
}>;

export function ConsultationModalForm({
  open,
  onOpenChange,
  source,
}: ConsultationModalFormProps) {
  const { locale, t } = useLocale();
  const consultationPage = useConsultationPage();
  const { hero, header } = t;
  const formCopy = hero.consultationModal;
  const contextCopy = formCopy.contexts[source];
  const reactId = useId();
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = prefersReducedMotion !== true;

  const [motionKey, setMotionKey] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setMotionKey((key) => key + 1);
  }, [open, source]);

  useEffect(() => {
    if (open) return;
    setName("");
    setPhone("");
    setErrors({});
    setSubmitted(false);
    setSubmitting(false);
  }, [open]);

  const validate = useCallback((): FieldErrors => {
    const next: FieldErrors = {};
    if (!name.trim()) {
      next.name = formCopy.errors.nameRequired;
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone.trim() || phoneDigits.length < 11) {
      next.phone = formCopy.errors.phoneRequired;
    }
    return next;
  }, [formCopy.errors, name, phone]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setErrors({});

    const result = await submitConsultationRequest({
      name: name.trim(),
      phone: phone.trim(),
      source,
      page: consultationPage,
      locale,
    });

    setSubmitting(false);

    if (!result.ok) {
      setErrors({
        submit: consultationSubmitErrorMessage(result, formCopy.errors),
      });
      return;
    }

    setSubmitted(true);
  };

  const handleSendAgain = useCallback(() => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setErrors({});
    setSubmitting(false);
    setMotionKey((key) => key + 1);
  }, []);

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
      text={contextCopy.body}
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
    ? { variants: FIELD_REVEAL, className: styles.formBlock }
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
            animate={motionEnabled && open ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.55, delay: 0.62, ease: MOTION_EASE }}
          >
            <Button
              type="submit"
              form={`${reactId}-consultation-form`}
              variant="accent"
              size="md"
              expandFromIcon
              expandWhen
              disabled={submitting}
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
          initial={motionEnabled ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: MOTION_EASE }}
        >
          <FormSuccessState
            title={formCopy.successTitle}
            body={formCopy.successBody}
            sendAgainLabel={formCopy.sendAgainLabel}
            onSendAgain={handleSendAgain}
            className={styles.success}
            titleClassName={styles.successTitle}
            bodyClassName={styles.successBody}
          />
        </motion.div>
      ) : (
        <motion.form
          key={`form-${motionKey}`}
          id={`${reactId}-consultation-form`}
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
              <PhoneInputMessengerRow variant="onLight">
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
              </PhoneInputMessengerRow>
            </FormField>
          </motion.div>

          {errors.submit ? (
            <p className={styles.submitError} role="alert">{errors.submit}</p>
          ) : null}

          <FormPrivacyNotice
            before={formCopy.privacyBefore}
            linkHref={localizedPath(locale, formCopy.privacyHref)}
            linkLabel={formCopy.privacyLinkLabel}
            after={formCopy.privacyAfter}
            className={styles.privacy}
            linkClassName={styles.privacyLink}
            onBeforeNavigate={() => onOpenChange(false)}
          />
        </motion.form>
      )}
    </Modal>
  );
}
