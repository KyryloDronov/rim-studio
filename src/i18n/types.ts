/**
 * Supported locales.
 * `ru` is the default — it sits at the prefix-less root (`/`), `pl` lives
 * under `/pl`. English was deprecated in favour of these two markets.
 */
export const LOCALES = ["ru", "pl"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ru";

export const LOCALE_LABEL: Record<Locale, string> = {
  ru: "RU",
  pl: "PL",
};

export const LOCALE_NAME: Record<Locale, string> = {
  ru: "Русский",
  pl: "Polski",
};

export type Dictionary = Readonly<{
  meta: Readonly<{
    title: string;
    description: string;
    siteName: string;
  }>;
  header: Readonly<{
    menu: string;
    close: string;
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
        }>
      >
    >;
    about: Readonly<{ title: string; lead: string }>;
    contact: Readonly<{ title: string; lead: string }>;
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
        icon: "shield" | "clock" | "wallet";
        /** First line — the category, e.g. "Гарантия". */
        label: string;
        /** Second line — the short value, e.g. "12 мес.". */
        value: string;
      }>
    >;
    /** High-contrast accent CTA (e.g. "Send photo of rims"). */
    ctaPrimary: Readonly<{ label: string; href: string }>;
    /** Hero-only modal — opened from the primary CTA (photo submission flow). */
    photoModal: Readonly<{
      title: string;
      body: string;
      submitLabel: string;
      successTitle: string;
      successBody: string;
      photosCount: string;
      privacyBefore: string;
      privacyLinkLabel: string;
      privacyHref: string;
      fields: Readonly<{
        nameLabel: string;
        namePlaceholder: string;
        phoneLabel: string;
        phonePlaceholder: string;
        emailLabel: string;
        emailPlaceholder: string;
        optionalLabel: string;
        photosLabel: string;
        photosDropTitle: string;
        photosDropHint: string;
        removePhotoLabel: string;
        commentLabel: string;
        commentPlaceholder: string;
        commentHint: string;
      }>;
      errors: Readonly<{
        nameRequired: string;
        phoneRequired: string;
        emailInvalid: string;
        photosRequired: string;
      }>;
    }>;
    /** Companion dark CTA (e.g. "Call us"). `tel:` / `mailto:` is fine. */
    ctaSecondary: Readonly<{ label: string; href: string }>;
    /**
     * Eyebrow shown above the recent-works fan-out stack — the same
     * interaction pattern as the footer's product cards but anchored
     * inside the hero.
     */
    recentWorksLabel: string;
    /** Label under the bottom-center scroll hint ("mouse" affordance). */
    scrollHint: string;
  }>;
  /** Full-viewport pricing block below the hero. */
  pricing: Readonly<{
    tabsAriaLabel: string;
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
            title: string;
            columns: ReadonlyArray<string>;
            rows: ReadonlyArray<
              Readonly<{
                label: string;
                prices: ReadonlyArray<string>;
              }>
            >;
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
  /** Dark benefits hub — side cards + center video. */
  benefits: Readonly<{
    titleStrong: string;
    titleMuted: string;
    cards: Readonly<
      Record<
        | "warranty"
        | "prepayment"
        | "parking"
        | "colors"
        | "storage"
        | "equipment"
        | "dimet",
        Readonly<{
          title: string;
          note?: string;
          imageAlt: string;
        }>
      >
    >;
    cta: Readonly<{
      titleStart: string;
      titleHighlight: string;
      titleEnd: string;
      phoneLabel: string;
      phonePlaceholder: string;
      submitLabel: string;
      privacyBefore: string;
      privacyLinkLabel: string;
      privacyHref: string;
    }>;
  }>;
  /** Full-viewport about-the-studio hub (6 cards + header). */
  aboutSection: Readonly<{
    heading: string;
    lead: string;
    cta: Readonly<{ label: string; href: string }>;
    cards: Readonly<{
      studio: Readonly<{ label: string }>;
      timeline: ReadonlyArray<
        Readonly<{
          period: string;
          role: string;
          detail: string;
        }>
      >;
      warranty: Readonly<{
        label: string;
        title: string;
        body: string;
      }>;
      stat: Readonly<{ value: string; caption: string }>;
      equipment: Readonly<{ label: string }>;
      advantage: Readonly<{
        label: string;
        title: string;
        body: string;
      }>;
    }>;
  }>;
  /** How rim/studio works — four-step process diagram. */
  process: Readonly<{
    titleMuted: string;
    titleStrong: string;
    videoAlt: string;
    diagramAriaLabel: string;
    cta: Readonly<{ label: string; href: string }>;
    steps: ReadonlyArray<
      Readonly<{
        id: string;
        label: string;
        description: string;
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
