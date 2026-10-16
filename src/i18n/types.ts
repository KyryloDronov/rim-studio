/**
 * Supported locales.
 * `pl` is the default — it sits at the prefix-less root (`/`), `ru` lives
 * under `/ru`. English was deprecated in favour of these two markets.
 */
import type { ConsultationSourceId } from "@/content/consultation-sources";
import type { ServiceHeroBannerIconId } from "@/content/service-hero-banner-icons";

export const LOCALES = ["pl", "ru"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pl";

export const LOCALE_LABEL: Record<Locale, string> = {
  ru: "RU",
  pl: "PL",
};

export const LOCALE_NAME: Record<Locale, string> = {
  ru: "Русский",
  pl: "Polski",
};

/** Rich hero lede — plain run or inline accent spans in one flow. */
export type HeroBannerLedePart = Readonly<
  | { text: string; accent?: boolean }
  | {
      parts: ReadonlyArray<Readonly<{ text: string; accent?: boolean }>>;
    }
>;

export type LegalDocumentSection = Readonly<{
  id: string;
  title: string;
  paragraphs: ReadonlyArray<string>;
  bullets?: ReadonlyArray<string>;
}>;

export type LegalDocumentCopy = Readonly<{
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  backToHome: string;
  sections: ReadonlyArray<LegalDocumentSection>;
}>;

/** One visual line of a rich hero H1 — whole-line accent or inline accent spans. */
export type HeroBannerTitleLine = Readonly<
  | { text: string; accent?: boolean }
  | {
      parts: ReadonlyArray<Readonly<{ text: string; accent?: boolean }>>;
    }
>;

/** Optional rich hero for select service landings (tire, repair, …). */
export type ServicePageBanner = Readonly<{
  /** `grid` — 2×2; `tiles` — 4 cards; `pair` — 2 wide; `rail` — 4 compact icon-top columns. */
  layout: "grid" | "tiles" | "pair" | "rail";
  titleLines: ReadonlyArray<HeroBannerTitleLine>;
  ledeParts: ReadonlyArray<HeroBannerLedePart>;
  highlights: ReadonlyArray<
    Readonly<{
      id: string;
      icon: ServiceHeroBannerIconId;
      title: string;
      subtitle: string;
    }>
  >;
  /**
   * `inline` — highlight rail under the lede (service landings).
   * `trust` — home-style strip at the bottom of the hero; CTA stays under lede.
   */
  highlightsPlacement?: "inline" | "trust";
  ctaPrimary: Readonly<{
    label: string;
  }>;
  ctaAside?: Readonly<{
    icon: ServiceHeroBannerIconId;
    text: string;
  }>;
}>;

export type Dictionary = Readonly<{
  meta: Readonly<{
    title: string;
    description: string;
    siteName: string;
  }>;
  header: Readonly<{
    menu: string;
    close: string;
    /** Header CTA pill — e.g. «Связаться с нами». */
    contact: string;
  }>;
  menu: Readonly<{
    servicesHeading: string;
    studioHeading: string;
    services: Readonly<{
      wheelPainting: string;
      wheelRepair: string;
      diamondCutting: string;
      tireMounting: string;
      caliperPainting: string;
      motorcycleWheelPainting: string;
      tigWelding: string;
    }>;
    studio: Readonly<{
      about: string;
      contact: string;
    }>;
    legalHeading: string;
    legal: Readonly<{
      privacy: string;
      terms: string;
    }>;
  }>;
  pages: Readonly<{
    services: Readonly<
      Record<
        | "wheelPainting"
        | "wheelRepair"
        | "diamondCutting"
        | "tireMounting"
        | "caliperPainting"
        | "motorcycleWheelPainting"
        | "tigWelding",
        Readonly<{
          title: string;
          lead: string;
          banner?: ServicePageBanner;
        }>
      >
    >;
    about: Readonly<{ title: string; lead: string }>;
    contact: Readonly<{
      eyebrow: string;
      title: string;
      lead: string;
      formTitle: string;
      formLead: string;
    }>;
    privacy: Readonly<LegalDocumentCopy>;
    terms: Readonly<LegalDocumentCopy>;
  }>;
  /**
   * Home / hero banner.
   *
   * The headline is split into three independently-styled segments so each
   * locale can adapt the line break and the highlighted word without
   * juggling raw HTML strings:
   *   `[ titleStart ]\n[ titleEnd ] [ titleHighlight ]`
   */
  hero: Readonly<{
    titleStart: string;
    titleEnd: string;
    titleHighlight: string;
    lede: string;
    /**
     * Compact "trust strip" pinned to the bottom of the hero. Each
     * item is rendered as a small lucide icon + a two-line label
     * (title on top, value below) in footer-grade micro typography.
     * Items are separated by hairline vertical rules.
     *
     * `icon` is a stable string id resolved to a `lucide-react`
     * component inside the component — translators never touch SVGs
     * and adding a chip is a one-line dictionary diff.
     */
    features: ReadonlyArray<
      Readonly<{
        id: string;
        icon: "shield" | "clock" | "wallet" | "camera";
        /** First line — the category, e.g. "Гарантия". */
        label: string;
        /** Second line — the short value, e.g. "12 мес.". */
        value: string;
      }>
    >;
    /** High-contrast accent CTA — opens consultation modal. */
    ctaPrimary: Readonly<{ label: string }>;
    /** Hero primary CTA — consultation request (name + phone → Telegram). */
    consultationModal: Readonly<{
      title: string;
      submitLabel: string;
      successTitle: string;
      successBody: string;
      privacyBefore: string;
      privacyLinkLabel: string;
      privacyAfter: string;
      privacyHref: string;
      fields: Readonly<{
        nameLabel: string;
        namePlaceholder: string;
        phoneLabel: string;
        phonePlaceholder: string;
      }>;
      errors: Readonly<{
        nameRequired: string;
        phoneRequired: string;
        submitFailed: string;
      }>;
      contexts: Readonly<
        Record<ConsultationSourceId, Readonly<{ body: string }>>
      >;
    }>;
    /** Companion dark CTA (e.g. "Call us"). `tel:` / `mailto:` is fine. */
    ctaSecondary: Readonly<{ label: string; href: string }>;
    /**
     * Eyebrow on the collapsed section-nav stack in the hero / page banner.
     */
    sectionNavLabel: string;
    /** Label under the bottom-center scroll hint ("mouse" affordance). */
    scrollHint: string;
    /** Home: rich banner (title, lede accents, highlight rail) — same shell as service landings. */
    banner?: ServicePageBanner;
  }>;
  /** Short labels for banner section-nav fan-out (anchor targets on the page). */
  sectionNav: Readonly<{
    pricing: string;
    beforeAfter: string;
    showcase: string;
    loyalty: string;
    about: string;
    process: string;
    benefits: string;
    testimonials: string;
  }>;
  /** Full-viewport pricing block below the hero. */
  pricing: Readonly<{
    tabsAriaLabel: string;
    introTitleStrong: string;
    /** Shown as * footnote under every pricing table. */
    currencyDisclaimer: string;
    scrollHint: string;
    panels: Readonly<
      Record<
        | "paint"
        | "repair"
        | "diamond"
        | "tire"
        | "caliper"
        | "motorcycle"
        | "tig",
        Readonly<{
          tabLabelLine1: string;
          tabLabelLine2: string;
          table: Readonly<{
            sectionTitle?: string;
            subtitle?: string;
            title: string;
            columns: ReadonlyArray<string>;
            rows: ReadonlyArray<
              Readonly<{
                label: string;
                prices: ReadonlyArray<string>;
              }>
            >;
            extras?: ReadonlyArray<
              Readonly<{
                label: string;
                value: string;
              }>
            >;
            footnote?: string;
          }>;
        }>
      >
    >;
  }>;
  /** Horizontal card carousel — one card per service landing in `pages.services`. */
  showcase: Readonly<{
    titleStrong: string;
    titleMuted: string;
    sliderAriaLabel: string;
    prevLabel: string;
    nextLabel: string;
    openCardLabel: string;
    modalCloseLabel: string;
    modalPlaceholder: string;
    cards: Readonly<
      Record<
        | "wheelPainting"
        | "wheelRepair"
        | "diamondCutting"
        | "tireMounting"
        | "caliperPainting"
        | "motorcycleWheelPainting"
        | "tigWelding",
        Readonly<{
          category: string;
          title: string;
          /** Optional one-line detail on the service card (e.g. coating types). */
          summary?: string;
          linkLabel: string;
        }>
      >
    >;
  }>;
  /** Before/after comparison block with thumbnail switcher. */
  beforeAfter: Readonly<{
    titleStrong: string;
    titleMuted: string;
    beforeLabel: string;
    afterLabel: string;
    prevLabel: string;
    nextLabel: string;
    thumbAltFallback: string;
    galleryCounter: string;
    galleryOpenLabel: string;
    galleryCloseLabel: string;
    categories: Readonly<
      Record<
        | "paint"
        | "repair"
        | "diamond"
        | "tire"
        | "caliper"
        | "motorcycle"
        | "tig",
        Readonly<{
          thumbsAriaLabel: string;
          compareFallback?: Readonly<{
            beforeAlt: string;
            afterAlt: string;
            thumbAlt: string;
          }>;
          galleryFallback?: Readonly<{
            alt: string;
            thumbAlt: string;
          }>;
        }>
      >
    >;
    booking: Readonly<{
      eyebrow: string;
      title: string;
      titleAccent: string;
      body: string;
      cta: Readonly<{ label: string; href: string }>;
    }>;
  }>;
  /** Dark benefits hub — image cards + center showcase. */
  benefits: Readonly<{
    eyebrow: string;
    titleStrong: string;
    titleAccent: string;
    lead: string;
    cards: Readonly<
      Record<
        | "warranty"
        | "prepayment"
        | "parking"
        | "colors"
        | "storage"
        | "experience",
        Readonly<{
          title: string;
          body: string;
          imageAlt: string;
        }>
      >
    >;
    hub: Readonly<{
      brand: string;
      tagline: string;
      heroImageAlt: string;
      steps: Readonly<
        Record<
          "diagnostics" | "agreement" | "work" | "result",
          Readonly<{ label: string }>
        >
      >;
    }>;
    cta: Readonly<{
      label: string;
      href: string;
    }>;
    cardsSlider: Readonly<{
      ariaLabel: string;
      prevLabel: string;
      nextLabel: string;
    }>;
  }>;
  /** About-the-studio hub — founder, approach, pillars, journey. */
  aboutSection: Readonly<{
    eyebrow: string;
    headingBrand: string;
    headingAccent: string;
    headingRest: string;
    lead: string;
    cta: Readonly<{ label: string; href: string }>;
    founder: Readonly<{
      role: string;
      name: string;
    }>;
    approach: Readonly<{
      label: string;
      titleStart: string;
      titleAccent: string;
      body: string;
    }>;
    pillars: ReadonlyArray<
      Readonly<{
        id: string;
        title: string;
        body: string;
      }>
    >;
    journey: Readonly<{
      label: string;
      milestones: ReadonlyArray<
        Readonly<{
          year: string;
          title: string;
          body: string;
        }>
      >;
    }>;
    summary: Readonly<{
      label: string;
      titleStart: string;
      titleAccent: string;
      body: string;
    }>;
    pillarsSlider: Readonly<{
      ariaLabel: string;
      prevLabel: string;
      nextLabel: string;
    }>;
  }>;
  /** How Rim Studio works — expandable step carousel. */
  process: Readonly<{
    eyebrow: string;
    titleStrong: string;
    lead: string;
    intro: string;
    carouselAriaLabel: string;
    prevLabel: string;
    nextLabel: string;
    cta: Readonly<{ label: string; href: string }>;
    steps: ReadonlyArray<
      Readonly<{
        id: string;
        label: string;
        tagline: string;
        description: string;
        imageAlt: string;
      }>
    >;
  }>;
  /** Cumulative loyalty / discount program section. */
  loyalty: Readonly<{
    eyebrow: string;
    claimRuns: ReadonlyArray<
      Readonly<{
        text: string;
        group: "strong" | "muted";
        breakAfter?: boolean;
      }>
    >;
    body: string;
    carouselAriaLabel: string;
    cta: Readonly<{ label: string; href: string }>;
    secondaryCta: Readonly<{ label: string; href: string }>;
    tiers: Readonly<
      Record<
        "silver" | "gold" | "platinum",
        Readonly<{
          level: string;
          discount: string;
          discountLabel: string;
          thresholdLabel: string;
          threshold: string;
          perks: ReadonlyArray<string>;
        }>
      >
    >;
  }>;
  /** First-visit discount promo (replaces loyalty band while hidden). */
  firstVisitPromo: Readonly<{
    eyebrow: string;
    title: string;
    body: string;
    carouselAriaLabel: string;
    card: Readonly<{
      brand: string;
      badge: string;
      discount: string;
      discountLabel: string;
      audienceLabel: string;
      audience: string;
      perks: ReadonlyArray<string>;
      securedLabel: string;
      phoneCaption: string;
    }>;
    form: Readonly<{
      phoneLabel: string;
      phonePlaceholder: string;
      consentRequiredBefore: string;
      consentRequiredLinkLabel: string;
      consentRequiredAfter: string;
      privacyHref: string;
      consentMarketing: string;
      submitLabel: string;
      termsLabel: string;
      termsHref: string;
      successTitle: string;
      successBody: string;
      errors: Readonly<{
        phoneRequired: string;
        consentRequired: string;
      }>;
    }>;
  }>;
  /** Quote carousel above the footer. */
  testimonials: Readonly<{
    eyebrow: string;
    sliderAriaLabel: string;
    prevLabel: string;
    nextLabel: string;
    /** Screen reader: "{current}" and "{total}" are replaced at runtime. */
    counterAriaLabel: string;
    items: ReadonlyArray<
      Readonly<{
        id: string;
        quote: string;
        author: string;
        role: string;
        initials: string;
      }>
    >;
  }>;
  /** Service landing FAQ accordion (content in `content/service-faq.*.json`). */
  faq: Readonly<{
    eyebrow: string;
    title: string;
    /** `{service}` — current service title. */
    lead: string;
    /** `{service}` — current service title. */
    listAriaLabel: string;
  }>;
  /** Full-viewport map block above the footer. */
  visitMap: Readonly<{
    title: string;
    contactsEyebrow: string;
    contactsTitle: string;
    bookingEyebrow: string;
    hoursLabel: string;
    hoursValue: string;
  }>;
  contactSheet: Readonly<{
    eyebrow: string;
    title: string;
    closeLabel: string;
    mapAriaLabel: string;
    routeLabel: string;
    addressTitle: string;
    addressLine1: string;
    addressLine2: string;
    phoneTitle: string;
    callbackTitle: string;
    callbackBody: string;
    callbackPhoneLabel: string;
    callbackPhonePlaceholder: string;
    callbackPhoneRequired: string;
    callbackCta: string;
    callbackSuccessTitle: string;
    callbackSuccessBody: string;
    socialTitle: string;
    emailLabel: string;
    whatsAppAriaLabel: string;
    instagramDmAriaLabel: string;
  }>;
  footer: Readonly<{
    addressLines: ReadonlyArray<string>;
    columnStudio: string;
    columnServices: string;
    columnLegal: string;
    studioLinks: Readonly<{
      about: string;
      process: string;
      contact: string;
    }>;
    /** Rim services — two columns of links under `columnServices`. */
    serviceItems: ReadonlyArray<Readonly<{ href: string; label: string }>>;
    legalLinks: Readonly<{
      privacy: string;
      terms: string;
    }>;
    /**
     * Footer headline: ordered text runs (each split into words for GSAP).
     * `strong` = full white; `muted` = dimmed; `breakAfter` = line break
     * after that run.
     */
    claimRuns: ReadonlyArray<
      Readonly<{
        text: string;
        group: "strong" | "muted";
        breakAfter?: boolean;
      }>
    >;
    shopNow: string;
    copyright: string;
  }>;
}>;

/** BCP-47 codes for use in metadata (og:locale, hreflang, etc.). */
export const LOCALE_BCP47: Record<Locale, string> = {
  ru: "ru-RU",
  pl: "pl-PL",
};

/** Open Graph format (e.g. ru_RU). */
export const LOCALE_OG: Record<Locale, string> = {
  ru: "ru_RU",
  pl: "pl_PL",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as ReadonlyArray<string>).includes(value);
}
