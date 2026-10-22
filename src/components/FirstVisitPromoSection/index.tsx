"use client";

import Link from "next/link";
import { Percent } from "lucide-react";
import { FormPrivacyNotice } from "@/components/forms/FormPrivacyNotice";
import { FormSuccessState } from "@/components/forms/FormSuccessState";
import { useReducedMotion } from "motion/react";
import { useCallback, useId, useState, type FormEvent } from "react";
import { FirstVisitPromoCardStack } from "./FirstVisitPromoCardStack";
import { Button } from "@/components/Button";
import { LOYALTY_SECTION_ID } from "@/components/LoyaltySection";
import { FIRST_VISIT_PROMO_TERMS_VISIBLE } from "@/content/home-sections";
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
import { PhoneInputMessengerRow } from "@/components/StudioMessengerLinks";

import styles from "./style.module.css";

export { LOYALTY_SECTION_ID as FIRST_VISIT_PROMO_SECTION_ID };

export function FirstVisitPromoSection() {
  const { locale, t } = useLocale();
  const consultationPage = useConsultationPage();
  const copy = t.firstVisitPromo;
  const prefersReducedMotion = useReducedMotion();
  const stackMotionEnabled = !prefersReducedMotion;
  const formId = useId();
  const phoneId = `${formId}-phone`;
  const marketingId = `${formId}-marketing`;
  const formPrivacy = t.hero.consultationModal;

  const [phone, setPhone] = useState("");
  const [marketing, setMarketing] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const digits = phone.replace(/\D/g, "");
      let hasError = false;

      if (digits.length < 11) {
        setPhoneError(copy.form.errors.phoneRequired);
        hasError = true;
      } else {
        setPhoneError(null);
      }

      if (hasError) return;

      setSubmitting(true);
      setSubmitError(null);

      const result = await submitConsultationRequest({
        name: "",
        phone: phone.trim(),
        source: "firstVisitPromo",
        page: consultationPage,
        locale,
        marketingOptIn: marketing,
      });

      setSubmitting(false);

      if (!result.ok) {
        setSubmitError(
          consultationSubmitErrorMessage(result, t.hero.consultationModal.errors),
        );
        return;
      }

      setSubmitted(true);
    },
    [
      consultationPage,
      copy.form.errors.phoneRequired,
      locale,
      marketing,
      phone,
      t.hero.consultationModal.errors,
    ],
  );

  const handleSendAgain = useCallback(() => {
    setSubmitted(false);
    setPhone("");
    setMarketing(false);
    setPhoneError(null);
    setSubmitError(null);
    setSubmitting(false);
  }, []);

  return (
    <section
      id={LOYALTY_SECTION_ID}
      className={styles.section}
      aria-labelledby={`${LOYALTY_SECTION_ID}-promo-title`}
    >
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div
            className={styles.stackCol}
            aria-hidden={submitted ? true : undefined}
          >
            <FirstVisitPromoCardStack
              card={copy.card}
              ariaLabel={copy.carouselAriaLabel}
              motionEnabled={stackMotionEnabled}
            />
          </div>

          <div className={styles.copy}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h2
              id={`${LOYALTY_SECTION_ID}-promo-title`}
              className={styles.title}
            >
              {copy.title}
            </h2>
            <p className={styles.body}>{copy.body}</p>

            {submitted ? (
              <FormSuccessState
                title={copy.form.successTitle}
                body={copy.form.successBody}
                sendAgainLabel={formPrivacy.sendAgainLabel}
                onSendAgain={handleSendAgain}
                className={styles.success}
                titleClassName={styles.successTitle}
                bodyClassName={styles.successBody}
              />
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.field}>
                  <label htmlFor={phoneId} className={styles.fieldLabel}>
                    {copy.form.phoneLabel}
                  </label>
                  <PhoneInputMessengerRow variant="onLight">
                    <input
                      id={phoneId}
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className={[
                        styles.input,
                        phoneError ? styles.inputInvalid : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      placeholder={copy.form.phonePlaceholder}
                      value={phone}
                      onChange={(e) => {
                        setPhone(formatPolishPhoneInput(e.target.value));
                        if (phoneError) setPhoneError(null);
                      }}
                      onFocus={(e) => {
                        if (!e.target.value.trim()) {
                          setPhone(formatPolishPhoneInput(PL_PHONE_PREFIX));
                        }
                      }}
                      aria-invalid={phoneError ? true : undefined}
                      aria-describedby={
                        phoneError ? `${phoneId}-error` : undefined
                      }
                    />
                  </PhoneInputMessengerRow>
                  {phoneError ? (
                    <p
                      id={`${phoneId}-error`}
                      className={styles.fieldError}
                      role="alert"
                    >
                      {phoneError}
                    </p>
                  ) : null}
                </div>

                <FormPrivacyNotice
                  before={formPrivacy.privacyBefore}
                  linkHref={localizedPath(locale, formPrivacy.privacyHref)}
                  linkLabel={formPrivacy.privacyLinkLabel}
                  after={formPrivacy.privacyAfter}
                  className={styles.privacy}
                  linkClassName={styles.privacyLink}
                />

                <label className={styles.checkRow}>
                  <input
                    id={marketingId}
                    type="checkbox"
                    className={styles.checkInput}
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                  />
                  <span className={styles.checkCopy}>
                    {copy.form.consentMarketing}
                  </span>
                </label>

                {submitError ? (
                  <p className={styles.fieldError} role="alert">
                    {submitError}
                  </p>
                ) : null}

                <div className={styles.ctaRow}>
                  <Button
                    type="submit"
                    variant="accent"
                    size="md"
                    expandFromIcon
                    expandWhen
                    disabled={submitting}
                    icon={<Percent strokeWidth={1.75} />}
                    className={styles.submitBtn}
                  >
                    {copy.form.submitLabel}
                  </Button>
                  {FIRST_VISIT_PROMO_TERMS_VISIBLE ? (
                    <Link
                      href={localizedPath(locale, copy.form.termsHref)}
                      className={styles.termsLink}
                    >
                      {copy.form.termsLabel}
                    </Link>
                  ) : null}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
