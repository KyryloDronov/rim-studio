"use client";

import {
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Send,
} from "lucide-react";
import { useCallback, useEffect, useId, useState, type FormEvent } from "react";
import { Button } from "@/components/Button";
import { FormField } from "@/components/forms/FormField";
import { FormPrivacyNotice } from "@/components/forms/FormPrivacyNotice";
import { FormSuccessState } from "@/components/forms/FormSuccessState";
import { TextInput } from "@/components/forms/TextInput";
import { StudioMap } from "@/components/StudioMap";
import {
  buildGoogleDirectionsUrl,
  STUDIO_COORDINATES,
  STUDIO_EMAIL,
  STUDIO_SOCIAL,
} from "@/content/studio-location";
import { useConsultationPage } from "@/hooks/useConsultationPage";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/paths";
import {
  formatPolishPhoneInput,
  PL_PHONE_PREFIX,
} from "@/lib/formatPolishPhone";
import {
  consultationSubmitErrorMessage,
  submitConsultationRequest,
} from "@/lib/consultation-request";
import {
  PhoneInputMessengerRow,
  StudioPhoneRow,
} from "@/components/StudioMessengerLinks";

import styles from "./style.module.css";

type FieldErrors = Partial<Record<"name" | "phone" | "submit", string>>;

function InstagramIcon() {
  return (
    <svg viewBox="0 0 17 16" fill="none" aria-hidden>
      <path
        d="M12.467 0H4.16C1.867 0 0 1.867 0 4.163v7.6C0 14.06 1.867 15.927 4.16 15.927h8.307c2.295 0 4.162-1.866 4.162-4.163v-7.6C16.629 1.867 14.762 0 12.467 0Zm-11 4.163c0-1.485 1.21-2.694 2.694-2.694h8.307c1.485 0 2.694 1.21 2.694 2.694v7.6c0 1.486-1.209 2.695-2.694 2.695H4.161c-1.485 0-2.694-1.21-2.694-2.694v-7.6Z"
        fill="currentColor"
      />
      <path
        d="M8.314 11.834a3.872 3.872 0 1 0 0-7.744 3.872 3.872 0 0 0 0 7.744Zm0-6.275a2.403 2.403 0 1 1 0 4.807 2.403 2.403 0 0 1 0-4.807Z"
        fill="currentColor"
      />
      <path
        d="M12.543 4.72a1.044 1.044 0 1 0 0-2.088 1.044 1.044 0 0 0 0 2.087Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M16 8.05C16 3.61 12.418 0 8 0S0 3.61 0 8.05c0 4.01 2.926 7.333 6.75 7.933v-5.61H4.688V8.05h2.062V6.275c0-2.034 1.212-3.16 3.066-3.16.887 0 1.814.158 1.814.158v1.995h-1.023c-1.008 0-1.32.626-1.32 1.268v1.514h2.246l-.359 2.323H8.3v5.61C12.074 15.383 16 12.06 16 8.05Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ContactPageSection() {
  const { locale, t } = useLocale();
  const consultationPage = useConsultationPage();
  const copy = t.pages.contact;
  const sheet = t.contactSheet;
  const visit = t.visitMap;
  const formCopy = t.hero.consultationModal;
  const reactId = useId();

  const [mapActive, setMapActive] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(PL_PHONE_PREFIX);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const directionsUrl = buildGoogleDirectionsUrl(
    STUDIO_COORDINATES.lat,
    STUDIO_COORDINATES.lng,
  );

  useEffect(() => {
    setMapActive(true);
  }, []);

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
      source: "contactPage",
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
  }, []);

  return (
    <section className={styles.section} aria-labelledby={`${reactId}-title`}>
      <div className={styles.mapLayer}>
        <StudioMap
          active={mapActive}
          ariaLabel={sheet.mapAriaLabel}
          className={styles.mapCanvas}
          camera={{ zoom: 14.5, bearing: -14, pitch: 42 }}
          showNavigation
          cooperativeGestures
          interactive
        />
        <div className={styles.mapScrim} aria-hidden />
      </div>

      <div className={styles.overlay}>
        <div className={styles.grid}>
          <article className={styles.infoCard}>
            <header className={styles.infoHeader}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1 id={`${reactId}-title`} className={styles.title}>
                {copy.title}
              </h1>
              <p className={styles.lead}>{copy.lead}</p>
            </header>

            <ul className={styles.infoList}>
              <li className={styles.infoItem}>
                <span className={styles.infoIcon} aria-hidden>
                  <MapPin strokeWidth={1.5} />
                </span>
                <div>
                  <p className={styles.infoLabel}>{sheet.addressTitle}</p>
                  <p className={styles.infoText}>{sheet.addressLine1}</p>
                  <p className={styles.infoMuted}>{sheet.addressLine2}</p>
                </div>
              </li>

              <li className={styles.infoItem}>
                <span className={styles.infoIcon} aria-hidden>
                  <Phone strokeWidth={1.5} />
                </span>
                <div>
                  <p className={styles.infoLabel}>{sheet.phoneTitle}</p>
                  <StudioPhoneRow linkClassName={styles.infoLink} />
                </div>
              </li>

              <li className={styles.infoItem}>
                <span className={styles.infoIcon} aria-hidden>
                  <Mail strokeWidth={1.5} />
                </span>
                <div>
                  <p className={styles.infoLabel}>{sheet.emailLabel}</p>
                  <a className={styles.infoLink} href={`mailto:${STUDIO_EMAIL}`}>
                    {STUDIO_EMAIL}
                  </a>
                </div>
              </li>

              <li className={styles.infoItem}>
                <span className={styles.infoIcon} aria-hidden>
                  <Clock strokeWidth={1.5} />
                </span>
                <div>
                  <p className={styles.infoLabel}>{visit.hoursLabel}</p>
                  <p className={styles.infoText}>{visit.hoursValue}</p>
                </div>
              </li>
            </ul>

            <div className={styles.infoActions}>
              <Button
                type="button"
                variant="light"
                size="md"
                block
                icon={<Navigation strokeWidth={1.75} aria-hidden />}
                onClick={() => {
                  window.open(directionsUrl, "_blank", "noopener,noreferrer");
                }}
              >
                {sheet.routeLabel}
              </Button>
            </div>

            <div className={styles.social}>
              <p className={styles.socialLabel}>{sheet.socialTitle}</p>
              <div className={styles.socialRow}>
                <a
                  href={STUDIO_SOCIAL.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={STUDIO_SOCIAL.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialLink}
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>
          </article>

          <article className={styles.formCard} aria-labelledby={`${reactId}-form`}>
            <header className={styles.formHeader}>
              <p className={styles.formEyebrow}>{visit.bookingEyebrow}</p>
              <h2 id={`${reactId}-form`} className={styles.formTitle}>
                {copy.formTitle}
              </h2>
              <p className={styles.formLead}>{copy.formLead}</p>
            </header>

            {submitted ? (
              <FormSuccessState
                title={formCopy.successTitle}
                body={formCopy.successBody}
                sendAgainLabel={formCopy.sendAgainLabel}
                onSendAgain={handleSendAgain}
                className={styles.formSuccess}
                titleClassName={styles.formSuccessTitle}
                bodyClassName={styles.formSuccessBody}
              />
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <FormField
                  id={`${reactId}-name`}
                  label={formCopy.fields.nameLabel}
                  error={errors.name}
                >
                  <TextInput
                    id={`${reactId}-name`}
                    name="name"
                    autoComplete="name"
                    placeholder={formCopy.fields.namePlaceholder}
                    value={name}
                    invalid={Boolean(errors.name)}
                    className={styles.formInput}
                    onChange={(event) => {
                      setName(event.target.value);
                      if (errors.name) {
                        setErrors((prev) => ({ ...prev, name: undefined }));
                      }
                    }}
                  />
                </FormField>

                <FormField
                  id={`${reactId}-phone`}
                  label={formCopy.fields.phoneLabel}
                  error={errors.phone}
                >
                  <PhoneInputMessengerRow>
                    <TextInput
                      id={`${reactId}-phone`}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder={formCopy.fields.phonePlaceholder}
                      value={phone}
                      invalid={Boolean(errors.phone)}
                      className={styles.formInput}
                      onChange={(event) => {
                        setPhone(formatPolishPhoneInput(event.target.value));
                        if (errors.phone) {
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                        }
                      }}
                    />
                  </PhoneInputMessengerRow>
                </FormField>

                {errors.submit ? (
                  <p className={styles.formError} role="alert">{errors.submit}</p>
                ) : null}

                <FormPrivacyNotice
                  before={formCopy.privacyBefore}
                  linkHref={localizedPath(locale, formCopy.privacyHref)}
                  linkLabel={formCopy.privacyLinkLabel}
                  after={formCopy.privacyAfter}
                  className={styles.privacy}
                  linkClassName={styles.privacyLink}
                />

                <Button
                  type="submit"
                  variant="accent"
                  size="md"
                  block
                  disabled={submitting}
                  icon={<Send strokeWidth={1.75} aria-hidden />}
                >
                  {formCopy.submitLabel}
                </Button>
              </form>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
