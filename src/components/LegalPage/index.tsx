import Link from "next/link";
import { fillLegalPlaceholders } from "@/content/legal-entity";
import type { Dictionary } from "@/i18n/types";
import { localizedPath } from "@/i18n/paths";
import type { Locale } from "@/i18n/types";

import styles from "./style.module.css";

export type LegalPageCopy = Dictionary["pages"]["privacy"];

export type LegalDocId = "privacy" | "terms";

type LegalPageProps = Readonly<{
  locale: Locale;
  copy: LegalPageCopy;
  backLabel: string;
  currentDoc: LegalDocId;
  docNav: Readonly<{
    privacy: string;
    terms: string;
  }>;
}>;

export function LegalPage({
  locale,
  copy,
  backLabel,
  currentDoc,
  docNav,
}: LegalPageProps) {
  const privacyHref = localizedPath(locale, "/legal/privacy");
  const termsHref = localizedPath(locale, "/legal/terms");

  return (
    <div className={styles.root}>
      <div className={styles.pageInner}>
        <header className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden />
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={styles.title}>{copy.title}</h1>
          <p className={styles.lead}>{fillLegalPlaceholders(copy.lead)}</p>
          <p className={styles.updated}>{fillLegalPlaceholders(copy.updated)}</p>
        </header>

        <div className={styles.body}>
          <nav className={styles.docNav} aria-label={copy.eyebrow}>
            <Link
              href={privacyHref}
              className={
                currentDoc === "privacy"
                  ? `${styles.docNavLink} ${styles.docNavLinkActive}`
                  : styles.docNavLink
              }
              aria-current={currentDoc === "privacy" ? "page" : undefined}
            >
              {docNav.privacy}
            </Link>
            <Link
              href={termsHref}
              className={
                currentDoc === "terms"
                  ? `${styles.docNavLink} ${styles.docNavLinkActive}`
                  : styles.docNavLink
              }
              aria-current={currentDoc === "terms" ? "page" : undefined}
            >
              {docNav.terms}
            </Link>
          </nav>

          <nav className={styles.backNav} aria-label={backLabel}>
            <Link href={localizedPath(locale, "/")} className={styles.backLink}>
              {backLabel}
            </Link>
          </nav>

          {copy.sections.map((section) => (
            <section
              key={section.id}
              className={styles.section}
              aria-labelledby={`legal-${section.id}`}
            >
              <h2 id={`legal-${section.id}`} className={styles.sectionTitle}>
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className={styles.paragraph}>
                  {fillLegalPlaceholders(paragraph)}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 ? (
                <ul className={styles.list}>
                  {section.bullets.map((item) => (
                    <li key={item}>{fillLegalPlaceholders(item)}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
