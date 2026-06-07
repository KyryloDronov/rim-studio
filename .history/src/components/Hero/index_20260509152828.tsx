"use client";

import { ArrowIcon, Button } from "@/components/Button";
import { ProductCards, type ProductCard } from "@/components/ProductCards";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizedPath } from "@/i18n/paths";
import { HERO_CARD_ICONS, type HeroCardId } from "./icons";
import styles from "./style.module.css";

/* Recent-works data is project-codename driven (titles aren't translated)
   so it lives next to the component rather than the dictionary. Same
   shape as the footer roster — a single source of truth lives in
   `<ProductCards>`, this is just the data slice for the hero. */
const RECENT_WORKS: ReadonlyArray<ProductCard> = [
  {
    id: "noctua",
    title: "Noctua",
    href: "/work/noctua",
    image:
      "https://cdn.prod.website-files.com/684acf2dc6eab6dbcdde7fa4/690f486617ddf292acdc6d64_iyo-one.png",
    gradient: "linear-gradient(140deg, #ff9900 0%, #cc7a00 50%, #191f24 100%)",
  },
  {
    id: "halo",
    title: "Halo",
    href: "/work/halo",
    gradient: "linear-gradient(140deg, #5d7183 0%, #333e48 60%, #191f24 100%)",
  },
  {
    id: "voltaic",
    title: "Voltaic",
    href: "/work/voltaic",
    gradient: "linear-gradient(140deg, #ffc266 0%, #ff9900 45%, #485865 100%)",
  },
  {
    id: "lumen",
    title: "Lumen",
    href: "/work/lumen",
    gradient: "linear-gradient(140deg, #485865 0%, #262e36 55%, #ff9900 110%)",
  },
];

/* The hero is the first thing the user sees, so it occupies the full
   viewport (`min-height: 100dvh`). Layout is markup-only at this stage:
   animations (entrance, parallax, scroll-driven motion) will be wired
   on top of this DOM in the next pass.

   The background slot is a `<video>` placeholder. The asset goes into
   `/public/video/hero_bg.mp4` (looped, muted, autoplay) when ready —
   it doesn't need to exist for the layout to render correctly. */
export function Hero() {
  const { t, locale } = useLocale();
  const { hero } = t;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/* --- BG layer ----------------------------------------------- */}
      <div className={styles.videoBackground} aria-hidden="true">
        <video
          className={styles.video}
          /* When the asset is missing the element renders nothing — no
             broken-icon, no console error. */
          src="/video/hero_bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        {/* Soft brand-tinted overlay for legibility regardless of clip. */}
        <div className={styles.videoOverlay} />
      </div>

      {/* --- Content ------------------------------------------------- */}
      <div className={styles.inner}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>{hero.eyebrow}</span>

          <h1 id="hero-title" className={styles.title}>
            <span className={styles.titleLine}>{hero.titleStart}</span>
            <span className={styles.titleLine}>
              {hero.titleEnd}{" "}
              <span className={styles.titleHighlight}>
                {hero.titleHighlight}
              </span>
            </span>
          </h1>

          <p className={styles.lede}>{hero.lede}</p>

          <div className={styles.cta}>
            <Button
              href={localizedPath(locale, "/contact")}
              variant="accent"
              size="md"
              icon={<ArrowIcon />}
            >
              {hero.cta}
            </Button>
          </div>
        </header>

        {/* --- Bottom row: feature cards (≈75%) + recent works (≈25%) -- */}
        <div className={styles.bottomRow}>
          <ul className={styles.cards}>
            {hero.cards.map((card) => {
              const Icon = HERO_CARD_ICONS[card.id as HeroCardId];
              return (
                <li key={card.id} className={styles.card}>
                  <span
                    className={styles.cardIcon}
                    data-card={card.id}
                    aria-hidden="true"
                  >
                    {Icon ? <Icon className={styles.cardIconSvg} /> : null}
                  </span>
                  <div className={styles.cardCopy}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardBody}>{card.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className={styles.recent} aria-label={hero.recentWorksLabel}>
            <ProductCards
              cards={RECENT_WORKS}
              eyebrowLabel={hero.recentWorksLabel}
              className={styles.recentCards}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
