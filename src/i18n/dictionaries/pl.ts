import type { Dictionary } from "../types";

export const pl: Dictionary = {
  meta: {
    title: "rim/studio — Kreatywne studio cyfrowe",
    description:
      "rim/studio to kreatywne studio cyfrowe tworzące strony, marki i interaktywne produkty.",
    siteName: "rim/studio",
  },
  header: {
    menu: "Menu",
    close: "Zamknij",
    contact: "Pogadajmy",
  },
  menu: {
    home: "Start",
    work: "Prace",
    lab: "Lab",
  },
  hero: {
    titleStart: "Renowacja i lakierowanie",
    titleEnd: "felg",
    titleHighlight: "w Warszawie",
    lede: "Przywrócimy felgi do stanu nowych — bez kupowania nowych. Czysto, równo i na czas.",
    features: [
      {
        id: "warranty",
        icon: "shield",
        label: "Gwarancja",
        value: "do 12 mies.",
      },
      {
        id: "time",
        icon: "clock",
        label: "Termin",
        value: "1–3 dni",
      },
      {
        id: "payment",
        icon: "wallet",
        label: "Płatność",
        value: "Bez przedpłaty",
      },
    ],
    ctaPrimary: { label: "Wyślij zdjęcie felg", href: "/contact" },
    photoModal: {
      title: "Zdjęcia Twoich felg",
      body: "Zrób kilka zdjęć kół w świetle dziennym i prześlij je do nas — na ich podstawie ocenimy stan i zaproponujemy opcje renowacji i lakierowania.",
      submitLabel: "Wyślij",
    },
    ctaSecondary: { label: "Zadzwoń", href: "tel:+48000000000" },
    recentWorksLabel: "Ostatnie realizacje",
    scrollHint: "Przewiń",
  },
  pricing: {
    tabsAriaLabel: "Kategorie cen",
    panels: {
      paint: {
        tabLabel: "Lakierowanie felg",
        table: {
          title: "Lakierowanie felg",
          columns: [
            "R12-14",
            "R15",
            "R16",
            "R17",
            "R18",
            "R19",
            "R20",
            "R21",
            "R22",
            "R23",
            "R24",
          ],
          rows: [
            {
              label: "Lakierowanie felg (komplet)",
              prices: [
                "15000",
                "18000",
                "19000",
                "21000",
                "22000",
                "23000",
                "25000",
                "26000",
                "28000",
                "30000",
                "35000",
              ],
            },
            {
              label: "Lakier + toczenie diamentowe (komplet)",
              prices: [
                "28000",
                "30000",
                "35000",
                "37000",
                "39000",
                "42000",
                "43000",
                "44000",
                "48000",
                "50000",
                "55000",
              ],
            },
            {
              label: "Lakier z kolorowym rantem (komplet)",
              prices: [
                "30000",
                "32000",
                "34000",
                "36000",
                "38000",
                "40000",
                "43000",
                "45000",
                "47000",
                "48000",
                "50000",
              ],
            },
          ],
        },
      },
      repair: {
        tabLabel: "Naprawa",
        table: {
          title: "Naprawa felg",
          columns: ["R15-16", "R17-18", "R19-20", "R21+"],
          rows: [
            {
              label: "Prostowanie (1 felga)",
              prices: ["2500", "3000", "3500", "4000"],
            },
            {
              label: "Spawanie pęknięcia",
              prices: ["3500", "4000", "4500", "5000"],
            },
            {
              label: "Regeneracja gniazda",
              prices: ["2000", "2500", "3000", "3500"],
            },
          ],
        },
      },
      tire: {
        tabLabel: "Opony",
        table: {
          title: "Montaż opon",
          columns: ["R14-15", "R16-17", "R18-19", "R20+"],
          rows: [
            {
              label: "Demontaż / montaż (komplet)",
              prices: ["800", "900", "1000", "1200"],
            },
            {
              label: "Wyważanie (komplet)",
              prices: ["600", "700", "800", "900"],
            },
            {
              label: "Naprawa przebicia",
              prices: ["400", "450", "500", "550"],
            },
          ],
        },
      },
      finish: {
        tabLabel: "Polerowanie",
        table: {
          title: "Polerowanie i finisz",
          columns: ["R15-16", "R17-18", "R19-20", "R21+"],
          rows: [
            {
              label: "Polerowanie rantów (komplet)",
              prices: ["4500", "5000", "5500", "6000"],
            },
            {
              label: "Wykończenie szczotkowane (komplet)",
              prices: ["5500", "6000", "6500", "7000"],
            },
            {
              label: "Toczenie diamentowe bez lakieru",
              prices: ["12000", "14000", "16000", "18000"],
            },
          ],
        },
      },
    },
  },
  showcase: {
    titleStrong: "Nasze usługi.",
    titleMuted: "Wybierz to, co pasuje do Ciebie.",
    sliderAriaLabel: "Karuzela usług",
    prevLabel: "Poprzednia karta",
    nextLabel: "Następna karta",
    cards: [
      {
        id: "paint",
        category: "Lakierowanie",
        title: "Proszkowe lakierowanie felg dowolnej złożoności",
        href: "/services/wheel-painting",
        linkLabel: "Więcej",
      },
      {
        id: "repair",
        category: "Naprawa",
        title: "Naprawa i renowacja uszkodzonych felg",
        href: "/services/wheel-repair",
        linkLabel: "Więcej",
      },
      {
        id: "tire",
        category: "Opony",
        title: "Montaż opon i sezonowe przechowywanie",
        href: "/services/tire-mounting",
        linkLabel: "Więcej",
      },
      {
        id: "diamond",
        category: "Szlifowanie",
        title: "Diamentowe toczenie i lustrzany połysk",
        href: "/services/diamond-cutting",
        linkLabel: "Więcej",
      },
      {
        id: "polish",
        category: "Polerowanie",
        title: "Polerowanie rantów i wykończenie",
        href: "/services/lip-polishing",
        linkLabel: "Więcej",
      },
      {
        id: "caliper",
        category: "Zaciski",
        title: "Lakierowanie zacisków w kolorze nadwozia",
        href: "/services/caliper-painting",
        linkLabel: "Więcej",
      },
    ],
  },
  beforeAfter: {
    titleStrong: "Przed i po.",
    titleMuted: "Efekt naszej pracy.",
    beforeLabel: "Przed",
    afterLabel: "Po",
    thumbsAriaLabel: "Wybór przykładu przed i po",
    prevLabel: "Poprzednia miniatura",
    nextLabel: "Następna miniatura",
    thumbAltFallback: "Przykład pracy",
    pairs: [
      {
        id: "amg-r19-a",
        beforeAlt: "Felga Mercedes AMG przed renowacją",
        afterAlt: "Felga Mercedes AMG po renowacji",
        thumbAlt: "Przykład renowacji felgi Mercedes AMG",
      },
      {
        id: "amg-r19-b",
        beforeAlt: "Druga felga Mercedes AMG przed renowacją",
        afterAlt: "Druga felga Mercedes AMG po renowacji",
        thumbAlt: "Drugi przykład renowacji felgi Mercedes AMG",
      },
    ],
  },
  benefits: {
    titleStrong: "Nasze atuty.",
    titleMuted: "Dlaczego rim/studio.",
    cards: {
      warranty: {
        title: "3 lata gwarancji na nasze usługi",
        imageAlt: "Gwarancja na usługi",
      },
      prepayment: {
        title: "Pracujemy bez przedpłaty",
        note: "Płatność wygodną metodą — BLIK, karta, gotówka lub faktura",
        imageAlt: "Płatność bez przedpłaty",
      },
      parking: {
        title: "Strzeżony parking z monitoringiem",
        imageAlt: "Strzeżony parking",
      },
      colors: {
        title: "100+ kolorów lakierowania felg",
        note: "Lakier w cenie",
        imageAlt: "Katalog kolorów",
      },
      storage: {
        title: "7 dni bezpłatnego przechowywania felg",
        imageAlt: "Przechowywanie felg",
      },
      equipment: {
        title: "Profesjonalny, wysokiej jakości sprzęt",
        note: "Gema, Hofmann, Haweka",
        imageAlt: "Sprzęt do lakierowania i wyważania",
      },
      dimet: {
        title: "Technologia «Dimet»",
        note: "Po renowacji felg nie zobaczysz różnicy względem oryginału",
        imageAlt: "Technologia Dimet",
      },
    },
    cta: {
      titleStart: "Umów się na",
      titleHighlight: "bezpłatną diagnostykę felg",
      titleEnd: "",
      phoneLabel: "Telefon",
      phonePlaceholder: "+48 000 000 000",
      submitLabel: "Umów diagnostykę",
      privacyBefore: "Klikając przycisk, akceptujesz warunki ",
      privacyLinkLabel: "polityki prywatności",
      privacyHref: "/privacy",
    },
  },
  footer: {
    addressLines: ["Warszawa, Polska", "hello@rim.studio"],
    columnStudio: "Studio",
    columnServices: "Usługi",
    columnLegal: "Prawne",
    studioLinks: {
      about: "O nas",
      process: "Proces",
      contact: "Kontakt",
    },
    serviceItems: [
      { href: "/services/wheel-painting", label: "Lakierowanie felg" },
      { href: "/services/wheel-repair", label: "Naprawa felg" },
      {
        href: "/services/diamond-cutting",
        label: "Szlifowanie diamentowe felg",
      },
      {
        href: "/services/tire-mounting",
        label: "Montaż opon (zapis online)",
      },
      { href: "/services/caliper-painting", label: "Lakierowanie zacisków" },
      {
        href: "/services/lip-polishing",
        label: "Polerowanie rantów felg",
      },
      {
        href: "/services/center-caps",
        label: "Wykonanie zaślepek / dekielków",
      },
      {
        href: "/services/split-wheel-painting",
        label: "Lakierowanie felg wieloczęściowych",
      },
      {
        href: "/services/motorcycle-wheel-painting",
        label: "Lakierowanie felg motocyklowych",
      },
      {
        href: "/services/dimet-restoration",
        label: "Renowacja felg technologią Dimet",
      },
      {
        href: "/services/tig-welding",
        label: "Spawanie łukiem argonowym (TIG)",
      },
      { href: "/services/wheel-straightening", label: "Prostowanie felg" },
      {
        href: "/services/brushed-finish",
        label: "Wykończenie szczotkowane (brush)",
      },
      { href: "/services/forged-wheels", label: "Wykonanie felg kowanych" },
    ],
    legalLinks: {
      privacy: "Polityka prywatności",
      terms: "Warunki świadczenia usług",
    },
    claimRuns: [
      {
        group: "muted",
        text: "Studio profesjonalnej naprawy",
        breakAfter: true,
      },
      { group: "muted", text: "i proszkowego" },
      { group: "strong", text: "lakierowania felg" },
    ],
    shopNow: "Wybrane projekty",
    copyright: "© rim/studio",
  },
};
