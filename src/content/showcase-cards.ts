import type { ProductCard } from "@/components/ProductCards";

/**
 * Showcase stack — codenames only (not translated). Single source for Hero
 * recent-works strip and Footer product fan-out.
 */
export const SHOWCASE_WORK_CARDS: ReadonlyArray<ProductCard> = [
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
