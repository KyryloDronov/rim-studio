"use client";

import { ChevronRight, Mail, MapPin, Phone, PhoneCall } from "lucide-react";
import { useInView } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/forms/TextInput";
import { StudioMap } from "@/components/StudioMap";
import {
  PhoneInputMessengerRow,
  StudioPhoneRow,
} from "@/components/StudioMessengerLinks";
import { STUDIO_EMAIL } from "@/content/studio-location";
import { StudioDirectionsModal } from "@/components/StudioDirectionsModal";
import { useConsultationPage } from "@/hooks/useConsultationPage";
import { useLocale } from "@/i18n/LocaleProvider";
import { FormSuccessState } from "@/components/forms/FormSuccessState";
import {
  consultationSubmitErrorMessage,
  submitConsultationRequest,
} from "@/lib/consultation-request";

import styles from "./style.module.css";

export const VISIT_MAP_SECTION_ID = "visit";

export function VisitMapSection() {
  const { locale, t } = useLocale();
  const consultationPage = useConsultationPage();
  const { visitMap, contactSheet } = t;
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, {
    amount: 0.08,
    margin: "80px 0px",
  });
  const mapMountedRef = useRef(false);
  const [mapMounted, setMapMounted] = useState(false);
  const reactId = useId();

  const [phone, setPhone] = useState("");
  const [phoneInvalid, setPhoneInvalid] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [directionsOpen, setDirectionsOpen] = useState(false);

  useEffect(() => {
    if (!sectionInView || mapMountedRef.current) return;
    mapMountedRef.current = true;
    setMapMounted(true);
  }, [sectionInView]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const trimmed = phone.trim();
      const digits = trimmed.replace(/\D/g, "");
      if (!trimmed || digits.length < 11) {
        setPhoneInvalid(true);
        return;
      }
      setPhoneInvalid(false);
      setSubmitting(true);
      setSubmitError(null);

      const result = await submitConsultationRequest({
        name: "",
        phone: trimmed,
        source: "visitMap",
        page: consultationPage,
        locale,
      });

      setSubmitting(false);

      if (!result.ok) {
        setSubmitError(
          consultationSubmitErrorMessage(result, t.hero.consultationModal.errors),
        );
        return;
      }

      setSent(true);
    },
    [consultationPage, locale, phone, t.hero.consultationModal.errors],
  );

  const handleSendAgain = useCallback(() => {
    setSent(false);
    setPhone("");
    setPhoneInvalid(false);
    setSubmitError(null);
    setSubmitting(false);
  }, []);

  return (
    <section
      ref={sectionRef}
      id={VISIT_MAP_SECTION_ID}
      className={styles.section}
      aria-labelledby={`${VISIT_MAP_SECTION_ID}-title`}
    >
      <div className={styles.mapLayer}>
        <StudioMap
          active={mapMounted}
          ariaLabel={contactSheet.mapAriaLabel}
          className={styles.mapCanvas}
          camera={{ zoom: 13.85, bearing: -8, pitch: 28 }}
          showNavigation={false}
          cooperativeGestures={false}
          interactive={false}
          pointerEventsNone
        />
        <div className={styles.mapScrimLeft} aria-hidden />
      </div>

      <div className={styles.overlay}>
        <div className={styles.overlayInner}>
          <aside className={styles.glassPanel} aria-labelledby={`${VISIT_MAP_SECTION_ID}-title`}>
            <header className={styles.panelHeader}>
              <h2 id={`${VISIT_MAP_SECTION_ID}-title`} className={styles.title}>
                {visitMap.title}
              </h2>
            </header>

            <div className={styles.infoList}>
              <div className={styles.infoRow}>
                <span className={styles.infoIcon} aria-hidden>
                  <MapPin strokeWidth={1.5} />
                </span>
                <div className={styles.infoBody}>
                  <p className={styles.infoLabel}>{contactSheet.addressTitle}</p>
                  <button
                    type="button"
                    className={styles.addressTrigger}
                    onClick={() => setDirectionsOpen(true)}
                    aria-label={contactSheet.addressActionLabel}
                  >
                    <span className={styles.addressCopy}>
                      <span className={styles.infoText}>
                        {contactSheet.addressLine1}
                      </span>
                      <span className={styles.infoMuted}>
                        {contactSheet.addressLine2}
                      </span>
                    </span>
                    <ChevronRight
                      className={styles.addressChevron}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </button>
                </div>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoIcon} aria-hidden>
                  <Phone strokeWidth={1.5} />
                </span>
                <div>
                  <p className={styles.infoLabel}>{contactSheet.phoneTitle}</p>
                  <StudioPhoneRow linkClassName={styles.infoLink} />
                </div>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoIcon} aria-hidden>
                  <Mail strokeWidth={1.5} />
                </span>
                <div>
                  <p className={styles.infoLabel}>{contactSheet.emailLabel}</p>
                  <a
                    className={styles.infoLink}
                    href={`mailto:${STUDIO_EMAIL}`}
                  >
                    {STUDIO_EMAIL}
                  </a>
                </div>
              </div>

              <div className={styles.hoursRow}>
                <p className={styles.infoLabel}>{visitMap.hoursLabel}</p>
                <p className={styles.infoText}>{visitMap.hoursValue}</p>
              </div>
            </div>

            <div className={styles.divider} aria-hidden />

            <div className={styles.bookingBlock}>
              <p className={styles.bookingEyebrow}>{visitMap.bookingEyebrow}</p>
              <h3 id={`${reactId}-booking`} className={styles.bookingTitle}>
                {contactSheet.callbackTitle}
              </h3>
              <p className={styles.bookingLead}>{contactSheet.callbackBody}</p>

              {sent ? (
                <FormSuccessState
                  title={contactSheet.callbackSuccessTitle}
                  body={contactSheet.callbackSuccessBody}
                  sendAgainLabel={t.hero.consultationModal.sendAgainLabel}
                  onSendAgain={handleSendAgain}
                  className={styles.formSuccess}
                  titleClassName={styles.formSuccessTitle}
                  bodyClassName={styles.formSuccessBody}
                />
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <label className={styles.formLabel} htmlFor={`${reactId}-phone`}>
                    {contactSheet.callbackPhoneLabel}
                  </label>
                  <PhoneInputMessengerRow>
                    <TextInput
                      id={`${reactId}-phone`}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder={contactSheet.callbackPhonePlaceholder}
                      value={phone}
                      invalid={phoneInvalid}
                      className={styles.formInput}
                      onChange={(event) => {
                        setPhone(event.target.value);
                        if (phoneInvalid) setPhoneInvalid(false);
                      }}
                    />
                  </PhoneInputMessengerRow>
                  {phoneInvalid ? (
                    <p className={styles.formError} role="alert">
                      {contactSheet.callbackPhoneRequired}
                    </p>
                  ) : null}
                  {submitError ? (
                    <p className={styles.formError} role="alert">
                      {submitError}
                    </p>
                  ) : null}

                  <div className={styles.actions}>
                    <Button
                      type="submit"
                      variant="accent"
                      size="md"
                      block
                      disabled={submitting}
                      icon={<PhoneCall strokeWidth={1.75} />}
                    >
                      {contactSheet.callbackCta}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </aside>
        </div>
      </div>

      <StudioDirectionsModal
        open={directionsOpen}
        onOpenChange={setDirectionsOpen}
        copy={contactSheet}
      />
    </section>
  );
}
