import {
  STUDIO_ADDRESS_FULL,
  STUDIO_ADDRESS_LINE1,
  STUDIO_ADDRESS_LINE2,
  STUDIO_EMAIL,
} from "@/content/studio-location";
import type { Dictionary } from "../types";

export const pl: Dictionary = {
  meta: {
    title: "Lakierowanie i renowacja felg Warszawa | Rim Studio",
    description:
      "Rim Studio w Warszawie — proszkowe lakierowanie felg, naprawa, toczenie diamentowe, wulkanizacja i lakier zacisków. Gwarancja, termin 1–3 dni. Adres: ul. Inwestycyjna 9, 05-800 Pruszków.",
    siteName: "Rim Studio",
  },
  header: {
    menu: "Menu",
    close: "Zamknij",
    contact: "Skontaktuj się",
  },
  menu: {
    servicesHeading: "Usługi",
    studioHeading: "Studio",
    services: {
      wheelPainting: "Lakierowanie felg",
      wheelRepair: "Naprawa felg",
      diamondCutting: "Szlifowanie diamentowe felg",
      tireMounting: "Montaż opon",
      caliperPainting: "Lakierowanie zacisków",
      motorcycleWheelPainting: "Lakierowanie felg moto + części",
      tigWelding: "Spawanie argonowe TIG",
    },
    studio: {
      about: "O nas",
      contact: "Kontakt",
    },
    legalHeading: "Dokumenty",
    legal: {
      privacy: "Polityka prywatności",
      terms: "Warunki korzystania",
    },
  },
  pages: {
    services: {
      wheelPainting: {
        title: "Lakierowanie felg",
        lead:
          "Proszkowe lakierowanie i renowacja felg w Warszawie — dobierzemy kolor, przygotujemy powierzchnię i przywrócimy fabryczny wygląd.",
        banner: {
          layout: "tiles",
          titleLines: [
            { text: "Lakierowanie felg" },
            { text: "w Warszawie", accent: true },
          ],
          ledeParts: [
            {
              text: "Chcesz odświeżyć wygląd kół? Dobierzemy odcień i przywrócimy felgom ",
            },
            { text: "fabryczny wygląd.", accent: true },
          ],
          highlights: [
            {
              id: "powder",
              icon: "sparkles",
              title: "Lakier proszkowy",
              subtitle: "Równa powłoka i trwały kolor",
            },
            {
              id: "prep",
              icon: "wrench",
              title: "Przygotowanie powierzchni",
              subtitle: "Czyszczenie, szlifowanie, grunt",
            },
            {
              id: "palette",
              icon: "palette",
              title: "Katalog kolorów i faktur",
              subtitle: "RAL, metalik, mat",
            },
            {
              id: "protection",
              icon: "shieldCheck",
              title: "Ochrona przed odpryskami",
              subtitle: "Trwała warstwa na całej felgi",
            },
          ],
          ctaPrimary: { label: "Sprawdź koszt lakierowania" },
        },
      },
      wheelRepair: {
        title: "Naprawa felg",
        lead:
          "Usuwamy wgniecenia, pęknięcia i korozję. Diagnostyka, prostowanie geometrii i przygotowanie pod lakier — w jednym miejscu.",
        banner: {
          layout: "tiles",
          titleLines: [
            { text: "Naprawa felg" },
            { text: "w Warszawie", accent: true },
          ],
          ledeParts: [{ text: "Uszkodziłeś felgę? Wiemy, co zrobić." }],
          highlights: [
            {
              id: "geometry",
              icon: "gauge",
              title: "Prostowanie geometrii",
              subtitle: "Walce i kontrola bicia",
            },
            {
              id: "tig",
              icon: "flame",
              title: "Spawanie argonowe",
              subtitle: "Lokalna naprawa pęknięć",
            },
            {
              id: "cracks",
              icon: "sparkles",
              title: "Naprawa pęknięć",
              subtitle: "Po diagnostyce",
            },
            {
              id: "curb",
              icon: "crosshair",
              title: "Usuwanie ubytków od krawężnika",
              subtitle: "Krawędź i front",
            },
          ],
          ctaPrimary: { label: "Umów diagnostykę" },
        },
      },
      diamondCutting: {
        title: "Szlifowanie diamentowe felg",
        lead:
          "Diamentowe toczenie obrzeży i powierzchni — głęboki połysk, wyraźna faktura i czyste przejścia bez przegrzania metalu.",
        banner: {
          layout: "pair",
          titleLines: [
            { text: "Diamentowe toczenie" },
            { text: "i szlif felg" },
            { text: "w Warszawie", accent: true },
          ],
          ledeParts: [
            {
              text: "Przywracamy fabryczny połysk felg metodą ",
            },
            { text: "Diamond Cut", accent: true },
            { text: "." },
          ],
          highlights: [
            {
              id: "shine",
              icon: "sparkles",
              title: "Fabryczny połysk",
              subtitle: "Lustrzana obrzeż i wyraźna faktura",
            },
            {
              id: "precision",
              icon: "gem",
              title: "Precyzyjne toczenie",
              subtitle: "Bez przegrzania i zbędnego ścierania",
            },
          ],
          ctaPrimary: { label: "Umów konsultację" },
        },
      },
      tireMounting: {
        title: "Montaż opon",
        lead:
          "Sezonowa wymiana, wyważanie i montaż opon z dbałością o felgi — bez zarysowań i zbędnego obciążenia powłoki.",
        banner: {
          layout: "grid",
          titleLines: [
            { text: "Nowoczesny montaż opon" },
            { text: "w Warszawie", accent: true },
          ],
          ledeParts: [
            {
              text: "Delikatna wymiana opon i precyzyjne wyważanie. Dbamy o to, by felgi pozostały ",
            },
            { text: "w idealnym stanie", accent: true },
            { text: "." },
          ],
          highlights: [
            {
              id: "equipment",
              icon: "circleDot",
              title: "Nowoczesny sprzęt",
              subtitle: "Hunter / Corghi",
            },
            {
              id: "care",
              icon: "shieldCheck",
              title: "Delikatna praca",
              subtitle: "Bez uszkodzeń felg",
            },
            {
              id: "balance",
              icon: "crosshair",
              title: "Precyzyjne wyważanie",
              subtitle: "Komfort i bezpieczeństwo",
            },
            {
              id: "season",
              icon: "sunSnow",
              title: "Wymiana sezonowa",
              subtitle: "Lato / zima",
            },
          ],
          ctaPrimary: { label: "Umów montaż opon" },
        },
      },
      caliperPainting: {
        title: "Lakierowanie zacisków",
        lead:
          "Lakierowanie zacisków hamulcowych w trwałe odcienie proszkowe — od demontażu po montaż, z ochroną powierzchni roboczych.",
        banner: {
          layout: "grid",
          titleLines: [
            { text: "Lakierowanie zacisków" },
            { text: "w Warszawie", accent: true },
          ],
          ledeParts: [
            {
              text: "Trwałe odcienie proszkowe na zaciski hamulcowe — od demontażu po montaż, z ochroną ",
            },
            { text: "powierzchni roboczych", accent: true },
            { text: "." },
          ],
          highlights: [
            {
              id: "powder",
              icon: "circleDot",
              title: "Powłoka proszkowa",
              subtitle: "Odporność na ciepło i chemię",
            },
            {
              id: "colors",
              icon: "palette",
              title: "Dowolny odcień",
              subtitle: "Klasyka i mocne akcenty",
            },
            {
              id: "care",
              icon: "shieldCheck",
              title: "Ochrona stref montażowych",
              subtitle: "Tłoczki i prowadnice bez lakieru",
            },
            {
              id: "full",
              icon: "settings",
              title: "Pełen cykl prac",
              subtitle: "Demontaż, przygotowanie, montaż",
            },
          ],
          ctaPrimary: { label: "Umów lakierowanie zacisków" },
        },
      },
      motorcycleWheelPainting: {
        title: "Lakierowanie felg moto + części",
        lead:
          "Lakierowanie motocyklowych felg, obręczy i dodatków — małe rozmiary, złożone kształty i precyzyjne przygotowanie.",
        banner: {
          layout: "tiles",
          titleLines: [
            { text: "Lakierowanie felg moto" },
            { text: "i detali w Warszawie", accent: true },
          ],
          ledeParts: [
            {
              text: "Każdy detal ma znaczenie — powłoka proszkowa na felgi, obręcze i elementy dodatkowe.",
            },
          ],
          highlights: [
            {
              id: "chips",
              icon: "shieldCheck",
              title: "Odporność na odpryski i rysy",
              subtitle: "Trwała powłoka proszkowa",
            },
            {
              id: "rust",
              icon: "shieldBadge",
              title: "Ochrona przed korozją",
              subtitle: "Szczelna warstwa na całej detali",
            },
            {
              id: "uv",
              icon: "sun",
              title: "Nie blaknie na słońcu",
              subtitle: "Trwałe pigmenty i lakier",
            },
            {
              id: "colors",
              icon: "palette",
              title: "Szeroki wybór kolorów i faktur",
              subtitle: "Dopasujemy odcień do moto",
            },
          ],
          ctaPrimary: { label: "Sprawdź koszt lakierowania" },
        },
      },
      tigWelding: {
        title: "Spawanie argonowe TIG",
        lead:
          "Spawanie TIG elementów aluminiowych i stalowych felg — lokalna naprawa pęknięć i odtworzenie stref montażowych.",
        banner: {
          layout: "tiles",
          titleLines: [
            { text: "Spawanie TIG aluminium" },
            { text: "w Warszawie", accent: true },
          ],
          ledeParts: [
            {
              text: "Spawiamy detale aluminiowe do aut, motocykli i innych produktów. Każda naprawa zaczyna się od oceny stanu i możliwości bezpiecznej regeneracji.",
            },
          ],
          highlights: [
            {
              id: "aluminum",
              icon: "flame",
              title: "Spawanie aluminium",
              subtitle: "TIG / ochrona argonowa",
            },
            {
              id: "accuracy",
              icon: "crosshair",
              title: "Wysoka precyzja",
              subtitle: "Staranny szew bez nadmiernego grzania",
            },
            {
              id: "diagnostics",
              icon: "search",
              title: "Wstępna diagnostyka",
              subtitle: "Ocena przed rozpoczęciem prac",
            },
            {
              id: "scope",
              icon: "settings",
              title: "Auto • moto • inne",
              subtitle: "Lokalna naprawa i odtwarzanie",
            },
          ],
          ctaPrimary: {
            label: "Umów diagnostykę",
          },
        },
      },
    },
    about: {
      title: "O nas",
      lead:
        "Rim Studio — pracownia renowacji i lakierowania felg w Warszawie. Pracujemy starannie, z gwarancją i bez zbędnego pośpiechu.",
    },
    contact: {
      eyebrow: "Rim Studio · Warszawa",
      title: "Kontakt",
      lead:
        "Przyjedź do studia, zadzwoń lub zostaw numer — odpowiemy w godzinach pracy i umówimy dogodny termin.",
      formTitle: "Umów konsultację",
      formLead:
        "Podaj imię i telefon — oddzwonimy, doprecyzujemy zakres prac i wycenę.",
    },
    privacy: {
      eyebrow: "Dokumenty",
      title: "Polityka prywatności",
      lead:
        "{{companyName}} (marka {{brandName}}) — studio wulkanizacji, lakierowania i renowacji felg w {{city}}, {{country}}. Poniżej opisujemy, jak przetwarzamy dane osobowe na stronie i w kontakcie ze studiem.",
      updated: "Ostatnia aktualizacja: 11 października 2026 r.",
      backToHome: "Strona główna",
      sections: [
        {
          id: "admin",
          title: "1. Administrator danych",
          paragraphs: [
            "Administratorem danych osobowych (RODO) jest {{companyName}}, adres: {{registeredAddress}}, e-mail: {{email}}, telefon: {{phone}}.",
            "W sprawach ochrony danych pisz na {{email}}. Dane rejestrowe (NIP {{nip}}, KRS {{krs}}, REGON {{regon}}) są dostępne na żądanie.",
          ],
        },
        {
          id: "scope",
          title: "2. Jakie dane przetwarzamy",
          paragraphs: ["W zależności od formy kontaktu możemy przetwarzać:"],
          bullets: [
            "imię i numer telefonu — przy zapisie na konsultację, oddzwonieniu, zniżce na pierwszą wizytę;",
            "numer telefonu i zgodę na SMS — jeśli zaznaczysz opcjonalne przypomnienia o wymianie opon i promocjach;",
            "dane techniczne strony — adres IP, przeglądarka, język, pliki cookies;",
            "treść wiadomości i zdjęcia felg przesłane dobrowolnie do wyceny.",
          ],
        },
        {
          id: "purposes",
          title: "3. Cele i podstawy przetwarzania",
          paragraphs: ["Dane wykorzystujemy w celu:"],
          bullets: [
            "obsługi zgłoszeń na konsultację i kontaktu w sprawie usług wulkanizacji, lakierowania i naprawy felg;",
            "potwierdzenia zniżki na pierwszą wizytę — za Twoją zgodą;",
            "wysyłki SMS marketingowych — tylko po osobnej zgodzie;",
            "działania i bezpieczeństwa strony;",
            "realizacji umowy o świadczenie usług w warszawskim studio oraz obowiązków prawnych w Polsce.",
          ],
        },
        {
          id: "telegram",
          title: "4. Zgłoszenia z formularza",
          paragraphs: [
            "Zgłoszenia z formularza konsultacji trafiają do zabezpieczonego kanału roboczego administratora (Telegram) wyłącznie w celu obsługi zapytania przez upoważnionych pracowników {{brandName}}.",
          ],
        },
        {
          id: "recipients",
          title: "5. Odbiorcy danych",
          paragraphs: [
            "Dane mogą być przetwarzane przez hosting, dostawców SMS/e-mail (po podłączeniu), księgowość i wsparcie IT — w niezbędnym zakresie i na podstawie umów powierzenia, gdy wymaga tego prawo.",
            "Nie sprzedajemy danych osobowych.",
          ],
        },
        {
          id: "retention",
          title: "6. Okres przechowywania",
          paragraphs: [
            "Zgłoszenia ze strony — do 24 miesięcy od ostatniego kontaktu, jeśli umowa nie została zawarta; dane klientów usług — przez okres wymagany przepisami podatkowymi i rachunkowymi.",
            "Dane marketingowe SMS — do cofnięcia zgody.",
          ],
        },
        {
          id: "rights",
          title: "7. Twoje prawa",
          paragraphs: [
            "Przysługują Ci prawa RODO: dostęp, sprostowanie, usunięcie, ograniczenie, przenoszenie (gdy ma zastosowanie), sprzeciw oraz cofnięcie zgody.",
            "Skargę możesz złożyć do Prezesa UODO, ul. Stawki 2, 00-193 Warszawa, www.uodo.gov.pl.",
          ],
        },
        {
          id: "cookies",
          title: "8. Cookies",
          paragraphs: [
            "Strona może używać niezbędnych cookies (język, sesja). Po podłączeniu analityki zaktualizujemy ten rozdział i — jeśli trzeba — poprosimy o zgodę.",
          ],
        },
        {
          id: "security",
          title: "9. Bezpieczeństwo",
          paragraphs: [
            "Stosujemy środki organizacyjne i techniczne adekwatne do skali studia: HTTPS, ograniczenie dostępu, przechowywanie tokenów wyłącznie na serwerze.",
          ],
        },
        {
          id: "changes",
          title: "10. Zmiany polityki",
          paragraphs: [
            "Aktualna wersja jest zawsze na tej stronie. O istotnych zmianach możemy poinformować na stronie lub e-mailem.",
          ],
        },
      ],
    },
    terms: {
      eyebrow: "Dokumenty",
      title: "Warunki korzystania ze strony",
      lead:
        "Zasady korzystania ze strony {{brandName}} i ogólne informacje o usługach studia w {{city}}. Przetwarzanie danych osobowych opisuje osobna polityka prywatności.",
      updated: "Ostatnia aktualizacja: 11 października 2026 r.",
      backToHome: "Strona główna",
      sections: [
        {
          id: "general",
          title: "1. Postanowienia ogólne",
          paragraphs: [
            "Stroną zarządza {{companyName}} (marka {{brandName}}). Informujemy o usługach w Warszawie: wulkanizacja, lakierowanie proszkowe i renowacja felg, naprawa i prostowanie, toczenie diamentowe, lakierowanie zacisków, felgi motocyklowe oraz spawanie TIG.",
            "Korzystając ze strony, wysyłając formularze lub kontaktując się telefonicznie, akceptujesz niniejsze warunki.",
          ],
        },
        {
          id: "services",
          title: "2. Usługi i rezerwacja",
          paragraphs: [
            "Zgłoszenie przez formularz, telefon {{phone}} lub e-mail {{email}} to prośba o kontakt, a nie zawarta umowa.",
            "Cenę, termin i zakres prac ustalamy po oględzinach felg w studiu (lub po uzgodnionej wstępnej wycenie). Cennik na stronie ma charakter informacyjny.",
          ],
        },
        {
          id: "user",
          title: "3. Obowiązki użytkownika",
          paragraphs: [
            "Podawaj prawdziwe dane kontaktowe w formularzach. Nie wykorzystuj strony do spamu, dystrybucji złośliwego oprogramowania ani prób nieautoryzowanego dostępu.",
          ],
        },
        {
          id: "content",
          title: "4. Treści i prawa autorskie",
          paragraphs: [
            "Teksty, zdjęcia realizacji, wideo i layout strony należą do {{companyName}} lub są używane na podstawie licencji. Kopiowanie bez pisemnej zgody jest zabronione, z wyjątkami przewidzianymi prawem.",
            "{{brandName}} może aktualizować materiały i cennik bez osobnego ogłoszenia na stronie.",
          ],
        },
        {
          id: "liability",
          title: "5. Odpowiedzialność",
          paragraphs: [
            "Strona jest udostępniana „w stanie, w jakim jest”. Dążymy do ciągłości działania, ale nie gwarantujemy braku krótkich przerw. Odpowiedzialność za decyzje podjęte wyłącznie na podstawie treści strony, bez konsultacji w studiu, jest ograniczona w granicach dopuszczalnych przez prawo polskie.",
          ],
        },
        {
          id: "privacy",
          title: "6. Dane osobowe",
          paragraphs: [
            "Formularze są przetwarzane zgodnie z polityką prywatności {{brandName}} — link w stopce i menu strony („Polityka prywatności”).",
          ],
        },
        {
          id: "law",
          title: "7. Prawo właściwe",
          paragraphs: [
            "Do korzystania ze strony i sporów wynikających z warunków stosuje się prawo polskie. Spory rozstrzygają sądy właściwe dla siedziby {{companyName}}, o ile bezwzględnie obowiązujące przepisy nie stanowią inaczej.",
          ],
        },
        {
          id: "contact",
          title: "8. Kontakt",
          paragraphs: [
            "Pytania o usługi i warunki: {{email}}, {{phone}}, {{registeredAddress}}.",
          ],
        },
      ],
    },
  },
  hero: {
    titleStart: "Studio lakierowania",
    titleEnd: "i renowacji felg",
    titleHighlight: "w Warszawie",
    lede:
      "Przywrócimy felgom nienaganny wygląd bez przepłacania za nowe felgi. Szybko, starannie i z gwarancją.",
    banner: {
      layout: "rail",
      highlightsPlacement: "trust",
      titleLines: [
        { text: "Studio lakierowania" },
        {
          parts: [
            { text: "i" },
            { text: "renowacji", accent: true },
            { text: "felg" },
          ],
        },
        { text: "w Warszawie" },
      ],
      ledeParts: [
        { text: "Przywrócimy felgom " },
        {
          parts: [
            { text: "nienaganny", accent: true },
            { text: "wygląd" },
          ],
        },
        { text: "bez przepłacania", accent: true },
        { text: "za nowe felgi. Szybko, starannie i" },
        { text: "z gwarancją", accent: true },
        { text: "." },
      ],
      highlights: [
        {
          id: "warranty",
          icon: "shieldCheck",
          title: "Gwarancja",
          subtitle: "do 12 miesięcy",
        },
        {
          id: "time",
          icon: "clock",
          title: "Termin realizacji",
          subtitle: "1–3 dni",
        },
      ],
      ctaPrimary: { label: "Umów konsultację" },
    },
    features: [
      {
        id: "warranty",
        icon: "shield",
        label: "Gwarancja",
        value: "do 12 miesięcy",
      },
      {
        id: "time",
        icon: "clock",
        label: "Termin realizacji",
        value: "1–3 dni",
      },
    ],
    ctaPrimary: { label: "Umów konsultację" },
    consultationModal: {
      title: "Umów konsultację",
      submitLabel: "Wyślij",
      successTitle: "Zgłoszenie wysłane",
      successBody:
        "Skontaktujemy się w najbliższym czasie roboczym i doprecyzujemy szczegóły.",
      sendAgainLabel: "Wyślij ponownie",
      privacyBefore:
        "Wysyłając formularz, przyjmujesz do wiadomości, że Twoje dane osobowe będą przetwarzane w celu obsługi Twojego zapytania. Szczegółowe informacje znajdziesz w naszej ",
      privacyLinkLabel: "Polityce prywatności",
      privacyAfter: ".",
      privacyHref: "/legal/privacy",
      fields: {
        nameLabel: "Imię",
        namePlaceholder: "Jak się do Ciebie zwracać",
        phoneLabel: "Telefon",
        phonePlaceholder: "+48 ___ ___ ___",
      },
      errors: {
        nameRequired: "Podaj imię",
        phoneRequired: "Podaj numer telefonu",
        submitFailed:
          "Nie udało się wysłać zgłoszenia. Zadzwoń do nas lub spróbuj później.",
        rateLimitExceeded:
          "Osiągnięto limit 5 zgłoszeń na 24 godziny z tej przeglądarki. Spróbuj później lub zadzwoń do nas.",
      },
      contexts: {
        home: {
          body:
            "Ocenimy stan felg, dobierzemy kolor i podamy termin — przed rezerwacją lakierowania.",
        },
        wheelPainting: {
          body:
            "Opowiemy o lakierowaniu felg, terminach i orientacyjnej wycenie Twojego kompletu.",
        },
        wheelRepair: {
          body:
            "Ocenimy uszkodzenia i zaproponujemy naprawę z jasnym terminem i ceną.",
        },
        diamondCutting: {
          body:
            "Pomożemy dobrać toczenie diamentowe, lakier i harmonogram prac.",
        },
        tireMounting: {
          body:
            "Umówimy wymianę opon i podpowiemy dogodny termin wizyty w studiu.",
        },
        caliperPainting: {
          body:
            "Dobierzemy kolor zacisków i ustalimy termin przed rozpoczęciem prac.",
        },
        motorcycleWheelPainting: {
          body:
            "Omówimy lakierowanie moto-felg, kolor i czas realizacji.",
        },
        tigWelding: {
          body:
            "Ocenimy zadanie spawalnicze TIG i zaproponujemy najlepszą metodę naprawy.",
        },
        benefits: {
          body:
            "Opowiemy, czym Rim Studio wyróżnia się na tle typowego serwisu, i dobierzemy zakres prac do Twoich felg.",
        },
        process: {
          body:
            "Wyjaśnimy etapy prac — od diagnostyki do odbioru — i umówimy dogodny termin wizyty.",
        },
        about: {
          body:
            "Odpowiemy na pytania o studio, podejście do prac i umówimy konsultację w serwisie.",
        },
        beforeAfter: {
          body:
            "Pokażemy przykłady realizacji i pomóżemy umówić lakierowanie lub naprawę felg.",
        },
        firstVisitPromo: {
          body:
            "Zapiszemy zniżkę na pierwszą wizytę i oddzwonimy, aby doprecyzować szczegóły.",
        },
        visitMap: {
          body:
            "Oddzwonimy na podany numer i pomóżemy z rezerwacją lub dojazdem do studia.",
        },
        contactSheet: {
          body:
            "Oddzwonimy w najbliższym czasie roboczym — doprecyzujemy zadanie i termin wizyty.",
        },
        contactPage: {
          body:
            "Oddzwonimy w najbliższym czasie roboczym i pomóżemy umówić wizytę w studiu.",
        },
      },
    },
    ctaSecondary: { label: "Zadzwoń", href: "tel:+48786444468" },
    sectionNavLabel: "Nawigacja po sekcjach",
    scrollHint: "Przewiń",
  },
  sectionNav: {
    pricing: "Cennik",
    beforeAfter: "Realizacje",
    showcase: "Usługi",
    loyalty: "Lojalność",
    about: "O studiu",
    process: "Proces",
    benefits: "Atuty",
    testimonials: "Opinie",
  },
  contactSheet: {
    eyebrow: "Rim Studio",
    title: "Skontaktuj się z nami",
    closeLabel: "Zamknij panel kontaktowy",
    mapAriaLabel: "Mapa — lokalizacja studia Rim Studio w Warszawie",
    routeLabel: "Wyznacz trasę",
    addressActionLabel: "Pokaż trasę do studia w Mapach Google",
    directionsModalTitle: "Trasa w Mapach Google",
    directionsModalBody:
      "Wyznaczymy trasę do Rim Studio pod poniższym adresem. Mapy otworzą się w nowej karcie.",
    directionsModalHint:
      "Możesz też skopiować adres i wkleić go w dowolnej aplikacji nawigacyjnej.",
    directionsModalCancelLabel: "Nie teraz",
    directionsModalCloseLabel: "Zamknij",
    addressTitle: "Adres",
    addressLine1: STUDIO_ADDRESS_LINE1,
    addressLine2: STUDIO_ADDRESS_LINE2,
    phoneTitle: "Telefon",
    callbackTitle: "Oddzwonienie",
    callbackBody:
      "Zostaw numer — oddzwonimy w godzinach pracy i pomożemy dobrać usługę.",
    callbackPhoneLabel: "Telefon",
    callbackPhonePlaceholder: "+48 ___ ___ ___",
    callbackPhoneRequired: "Podaj numer telefonu",
    callbackCta: "Zamów telefon",
    callbackSuccessTitle: "Zgłoszenie przyjęte",
    callbackSuccessBody: "Oddzwonimy w najbliższym czasie roboczym.",
    socialTitle: "Social media",
    emailLabel: "Email",
    whatsAppAriaLabel: "Napisz do nas na WhatsApp",
    instagramDmAriaLabel: "Wyślij wiadomość na Instagramie",
  },
  pricing: {
    tabsAriaLabel: "Kategorie cen",
    introTitleStrong: "Koszt naszych usług.",
    currencyDisclaimer:
      "* Ceny w złotych (zł). Dokładną kwotę ustalamy po diagnostyce — przed rozpoczęciem prac.",
    scrollHint: "Przewiń tabelę w poziomie →",
    panels: {
      paint: {
        tabLabelLine1: "Lakier",
        tabLabelLine2: "proszkowy",
        table: {
          title: "Usługa",
          columns: [
            "R13-15",
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
              label: "Lakierowanie proszkowe",
              prices: [
                "900",
                "900",
                "1050",
                "1200",
                "1400",
                "1700",
                "2000",
                "2300",
                "2500",
                "2800",
              ],
            },
            {
              label: "Lakier termiczny (ciecze)",
              prices: [
                "1100",
                "1100",
                "1260",
                "1560",
                "1860",
                "2100",
                "2400",
                "2600",
                "2800",
                "3200",
              ],
            },
          ],
          extras: [
            {
              label: "Lakierowanie proszkowe felg stalowych",
              value: "800",
            },
            {
              label: "Lakierowanie zacisków, komplet",
              value: "od 1000",
            },
          ],
          footnote:
            "* Usługi wulkanizacji i naprawa felg są płatne oddzielnie.",
        },
      },
      repair: {
        tabLabelLine1: "Prostowanie",
        tabLabelLine2: "felg",
        table: {
          title: "Usługa",
          columns: [
            "R13-15",
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
              label: "Prostowanie felgi aluminiowej",
              prices: [
                "100",
                "100",
                "150",
                "180",
                "200",
                "250",
                "300",
                "350",
                "400",
                "450",
              ],
            },
          ],
          footnote: "* Usługi wulkanizacji są płatne oddzielnie.",
        },
      },
      diamond: {
        tabLabelLine1: "Toczenie",
        tabLabelLine2: "CNC",
        table: {
          title: "Usługa",
          columns: [
            "R13-15",
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
              label: "Toczenie diamentowe",
              prices: [
                "—",
                "800",
                "800",
                "900",
                "1000",
                "1200",
                "1300",
                "1400",
                "1600",
                "1800",
              ],
            },
          ],
          footnote:
            "* Lakierowanie płatne oddzielnie — zależy od wybranej metody (proszek lub emalia termiczna).",
        },
      },
      tire: {
        tabLabelLine1: "Wulkanizacja",
        tabLabelLine2: "opon",
        table: {
          title: "Usługa",
          columns: [
            "R13-15",
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
              label: "Demontaż / montaż koła",
              prices: [
                "15",
                "15",
                "15",
                "20",
                "20",
                "25",
                "25",
                "30",
                "30",
                "35",
              ],
            },
            {
              label: "Demontaż / montaż opony",
              prices: [
                "15",
                "15",
                "20",
                "20",
                "25",
                "25",
                "30",
                "35",
                "40",
                "45",
              ],
            },
            {
              label: "Wyważanie koła",
              prices: [
                "20",
                "20",
                "20",
                "20",
                "25",
                "25",
                "30",
                "35",
                "40",
                "45",
              ],
            },
            {
              label: "Sezonowa wymiana, 1 koło",
              prices: [
                "50",
                "50",
                "55",
                "60",
                "70",
                "75",
                "85",
                "100",
                "110",
                "125",
              ],
            },
            {
              label: "Komplet, 4 koła",
              prices: [
                "200",
                "200",
                "220",
                "240",
                "280",
                "300",
                "340",
                "400",
                "440",
                "500",
              ],
            },
            {
              label: "SUV, 1 koło",
              prices: [
                "55",
                "55",
                "60",
                "65",
                "75",
                "80",
                "90",
                "105",
                "115",
                "135",
              ],
            },
            {
              label: "Komplet, 4 koła (SUV / crossover)",
              prices: [
                "220",
                "220",
                "240",
                "260",
                "300",
                "320",
                "360",
                "420",
                "460",
                "540",
              ],
            },
          ],
          footnote:
            "* Opony run-flat i niskoprofilowe: dopłata +10 zł za 1 koło.",
        },
      },
      caliper: {
        tabLabelLine1: "Lakierowanie",
        tabLabelLine2: "zacisków",
        table: {
          title: "Lakierowanie zacisków",
          columns: ["1 oś", "2 osie", "Komplet", "Z logo"],
          rows: [
            {
              label: "Lakier proszkowy",
              prices: ["4500", "8000", "12000", "15000"],
            },
            {
              label: "Lakier + odtłuszczanie",
              prices: ["5500", "9500", "14000", "17500"],
            },
            {
              label: "Demontaż / montaż zacisku",
              prices: ["1500", "2800", "4000", "5000"],
            },
          ],
        },
      },
      motorcycle: {
        tabLabelLine1: "Felgi moto",
        tabLabelLine2: "+ detale",
        table: {
          title: "Lakierowanie felg moto i detali",
          columns: ["10–12\"", "13–17\"", "18–21\"", "Detale"],
          rows: [
            {
              label: "Lakier felgi (1 szt.)",
              prices: ["3500", "4500", "5500", "od 1500"],
            },
            {
              label: "Lakier kompletu (2 felgi)",
              prices: ["6500", "8500", "10000", "—"],
            },
            {
              label: "Naprawa / prostowanie felgi moto",
              prices: ["2500", "3000", "3500", "—"],
            },
          ],
        },
      },
      tig: {
        tabLabelLine1: "Spawanie",
        tabLabelLine2: "TIG",
        table: {
          title: "Spawanie argonowo-łukowe (TIG)",
          columns: ["Do 3 cm", "3–8 cm", "8–15 cm", "Trudny szew"],
          rows: [
            {
              label: "Spawanie pęknięcia na felge",
              prices: ["3500", "5000", "7000", "od 9000"],
            },
            {
              label: "Naprawa gniazda",
              prices: ["2500", "4000", "5500", "od 7500"],
            },
            {
              label: "Regeneracja strefy piaskowania",
              prices: ["2000", "3500", "5000", "od 6500"],
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
    openCardLabel: "Otwórz usługę",
    modalCloseLabel: "Zamknij",
    modalPlaceholder:
      "Szczegółowy opis, ceny i warunki pojawią się tutaj w kolejnym kroku.",
    cards: {
      wheelPainting: {
        category: "Lakierowanie",
        title: "Lakierowanie felg",
        summary:
          "Lakier proszkowy i emalia termoutwardzalna — przygotujemy powierzchnię, dobierzemy kolor i nałożymy równą, trwałą warstwę.",
        linkLabel: "Więcej",
      },
      wheelRepair: {
        category: "Naprawa",
        title: "Naprawa i renowacja felg",
        summary:
          "Prawienie geometrii, usuwanie odprysków i pęknięć — najpierw diagnostyka, potem staranna renowacja pod lakier.",
        linkLabel: "Więcej",
      },
      diamondCutting: {
        category: "Szlifowanie",
        title: "Diamentowe toczenie felg",
        summary:
          "Diamond Cut: lustrzana polerka i wyraźna faktura — toczenie bez przegrzania i zbędnego zdejmowania metalu.",
        linkLabel: "Więcej",
      },
      tireMounting: {
        category: "Opony",
        title: "Montaż opon",
        summary:
          "Montaż, wyważanie i wymiana sezonowa — delikatnie do felg, bez zbędnych zarysowań.",
        linkLabel: "Więcej",
      },
      caliperPainting: {
        category: "Zaciski",
        title: "Lakierowanie zacisków",
        summary:
          "Powłoka proszkowa w kolorze nadwozia lub mocny akcent — tłoczki i strefy montażowe zostawiamy nietknięte.",
        linkLabel: "Więcej",
      },
      motorcycleWheelPainting: {
        category: "Moto",
        title: "Lakierowanie felg moto",
        summary:
          "Felgi, obręcze i detale — proszkowe lakierowanie trudnych form z dokładnym przygotowaniem każdej powierzchni.",
        linkLabel: "Więcej",
      },
      tigWelding: {
        category: "Spawanie",
        title: "Spawanie TIG",
        summary:
          "Lokalna naprawa pęknięć i stref aluminiowych — ocenimy stan i zespawamy precyzyjnie, bez nadmiernego nagrzewania.",
        linkLabel: "Więcej",
      },
    },
  },
  beforeAfter: {
    titleStrong: "Przykłady",
    titleMuted: "naszej pracy.",
    beforeLabel: "Przed",
    afterLabel: "Po",
    prevLabel: "Poprzednia miniatura",
    nextLabel: "Następna miniatura",
    thumbAltFallback: "Przykład pracy",
    galleryCounter: "{current} / {total}",
    galleryOpenLabel: "Otwórz galerię na pełnym ekranie",
    galleryCloseLabel: "Zamknij galerię",
    categories: {
      paint: {
        thumbsAriaLabel: "Przykłady lakierowania felg",
        compareFallback: {
          beforeAlt: "Felga przed lakierowaniem",
          afterAlt: "Felga po lakierowaniu",
          thumbAlt: "Przykład lakierowania felgi",
        },
      },
      tire: {
        thumbsAriaLabel: "Galeria wulkanizacji",
        galleryFallback: {
          alt: "Prace wulkanizacyjne w Rim Studio",
          thumbAlt: "Miniatura wulkanizacji",
        },
      },
      repair: {
        thumbsAriaLabel: "Przykłady naprawy felg",
        compareFallback: {
          beforeAlt: "Felga przed naprawą",
          afterAlt: "Felga po naprawie",
          thumbAlt: "Przykład naprawy felgi",
        },
      },
      caliper: {
        thumbsAriaLabel: "Galeria lakierowania zacisków",
        galleryFallback: {
          alt: "Lakierowanie zacisków hamulcowych w Rim Studio",
          thumbAlt: "Przykład lakierowania zacisku",
        },
      },
      diamond: {
        thumbsAriaLabel: "Galeria szlifowania diamentowego",
        galleryFallback: {
          alt: "Szlifowanie diamentowe felgi w Rim Studio",
          thumbAlt: "Przykład szlifowania diamentowego",
        },
      },
      motorcycle: {
        thumbsAriaLabel: "Galeria motocyklowych felg i części",
        galleryFallback: {
          alt: "Lakierowanie motocyklowej felgi lub części",
          thumbAlt: "Miniatura pracy motocyklowej",
        },
      },
      tig: {
        thumbsAriaLabel: "Przykłady spawania TIG",
        compareFallback: {
          beforeAlt: "Felga przed spawaniem",
          afterAlt: "Felga po spawaniu",
          thumbAlt: "Przykład spawania argonowego",
        },
      },
    },
    booking: {
      eyebrow: "Konsultacja",
      title: "Umów się na",
      titleAccent: "bezpłatną konsultację",
      body:
        "Ocenimy stan felg, dobierzemy kolor i podamy termin — zanim zapiszesz się na lakierowanie.",
      cta: {
        label: "Umów konsultację",
        href: "/contact",
      },
    },
  },
  benefits: {
    eyebrow: "Dlaczego my",
    titleStrong: "Nasze",
    titleAccent: "atuty",
    lead: "Dlaczego powierzają nam swoje felgi",
    cards: {
      prepayment: {
        title: "Płatność po wykonaniu prac",
        body:
          "Najpierw odbierasz gotowy efekt — dopiero potem płacisz.",
        imageAlt: "Płatność po zakończeniu usługi",
      },
      colors: {
        title: "Uzgodnienie przed startem",
        body:
          "Z góry ustalamy kolor, powłokę, koszt i termin.",
        imageAlt: "Uzgodnienie koloru i wykończenia",
      },
      warranty: {
        title: "Gwarancja na wykonane prace",
        body:
          "Udzielamy gwarancji na usługi, dla których jest przewidziana.",
        imageAlt: "Gwarancja na usługi",
      },
      storage: {
        title: "7 dni przechowania gratis",
        body:
          "Nie możesz odebrać felg od razu? Przechowujemy je bezpłatnie do 7 dni.",
        imageAlt: "Magazyn felg",
      },
      parking: {
        title: "Bezpieczeństwo",
        body:
          "Ogrodzony teren z monitoringiem. Twoje felgi są pod kontrolą.",
        imageAlt: "Monitoring na terenie studia",
      },
      experience: {
        title: "Ponad 10 lat doświadczenia",
        body:
          "Od 2014 roku renowujemy i lakierujemy felgi. Wiemy, jak radzić sobie ze skomplikowanymi uszkodzeniami i doprowadzać efekt do fabrycznego poziomu.",
        imageAlt: "Mistrz przy pracy nad felgą",
      },
    },
    hub: {
      brand: "Rim Studio",
      tagline: "Renowacja bez niespodzianek",
      heroImageAlt: "Odrestaurowane i polakierowane felgi",
      steps: {
        diagnostics: { label: "Diagnostyka" },
        agreement: { label: "Uzgodnienie" },
        work: { label: "Praca" },
        result: { label: "Efekt" },
      },
    },
    cta: {
      label: "Umów diagnostykę felg",
      href: "/contact",
    },
    cardsSlider: {
      ariaLabel: "Atuty studia",
      prevLabel: "Poprzedni atut",
      nextLabel: "Następny atut",
    },
  },
  aboutSection: {
    eyebrow: "O studiu",
    headingBrand: "RIM STUDIO —",
    headingAccent: "renowacja i lakierowanie",
    headingRest: "felg",
    lead:
      "Ponad 10 lat praktyki w renowacji felg: od diagnostyki i geometrii po przygotowanie powierzchni, lakierowanie i wykończenie.",
    cta: {
      label: "Umów diagnostykę felg",
      href: "/contact",
    },
    founder: {
      role: "Założyciel",
      name: "Giorgi",
    },
    approach: {
      label: "Nasze podejście",
      titleStart: "Detale, które",
      titleAccent: "mają znaczenie",
      body:
        "Dbamy o każdy etap — od przygotowania powierzchni po wykończenie, aby efekt był bezbłędny.",
    },
    pillars: [
      {
        id: "equipment",
        title: "Nowoczesny sprzęt",
        body:
          "Profesjonalne maszyny i technologie do precyzyjnej renowacji i lakierowania.",
      },
      {
        id: "materials",
        title: "Sprawdzone materiały",
        body: "Certyfikowane powłoki i chemia z przewidywalnym efektem.",
      },
      {
        id: "control",
        title: "Kontrola na każdym etapie",
        body:
          "Osobisty nadzór od diagnostyki do odbioru — bez „martwych stref” w procesie.",
      },
      {
        id: "timing",
        title: "Terminowość",
        body: "Ustalamy termin przed startem i go dotrzymujemy — szanujemy Twój czas.",
      },
      {
        id: "team",
        title: "Zespół profesjonalistów",
        body:
          "Doświadczeni specjaliści, którzy znają fach i odpowiadają za wynik.",
      },
    ],
    pillarsSlider: {
      ariaLabel: "Kluczowe atuty studia",
      prevLabel: "Poprzednia karta",
      nextLabel: "Następna karta",
    },
    journey: {
      label: "Moja droga",
      milestones: [
        {
          year: "2014",
          title: "Lakierowanie proszkowe",
          body: "Start w branży, zarządzanie zakładem produkcyjnym",
        },
        {
          year: "2016",
          title: "Star Wheels · Odessa",
          body: "Własny warsztat renowacji i naprawy felg",
        },
        {
          year: "2024",
          title: "Factory Felgen · Düsseldorf",
          body: "Studio renowacji w Niemczech",
        },
        {
          year: "2026",
          title: "RIM STUDIO · Warszawa",
          body: "Wulkanizacja i pełny cykl renowacji w Polsce",
        },
      ],
    },
    summary: {
      label: "Podsumowanie",
      titleStart: "Doświadczenie, które pracuje",
      titleAccent: "na Twój rezultat",
      body:
        "Dziś wykorzystujemy to doświadczenie w RIM STUDIO w Warszawie — pełen cykl usług felg w jednym miejscu.",
    },
  },
  process: {
    eyebrow: "Jak wygląda",
    titleStrong: "praca",
    lead: "Przejrzysto i jasno na każdym etapie",
    intro:
      "Wiesz, co robimy, ile to kosztuje i kiedy będzie gotowe — jeszcze przed rozpoczęciem prac",
    carouselAriaLabel: "Etapy pracy Rim Studio",
    prevLabel: "Poprzedni etap",
    nextLabel: "Następny etap",
    cta: {
      label: "Umów diagnostykę felg",
      href: "/contact",
    },
    steps: [
      {
        id: "diagnostics",
        label: "Diagnostyka",
        tagline: "Oceniamy stan felg i wykrywamy uszkodzenia",
        description:
          "Przesyłasz zdjęcia lub przywozisz felgi do Rim Studio. Sprawdzamy stan i ustalamy zakres prac.",
        imageAlt: "Diagnostyka felg na stanowisku",
      },
      {
        id: "agreement",
        label: "Uzgodnienie",
        tagline: "Z góry znasz koszt i termin",
        description:
          "Omawiamy wariant renowacji, kolor i wykończenie. Przed startem ustalamy dokładną cenę i termin realizacji.",
        imageAlt: "Uzgodnienie koloru z klientem",
      },
      {
        id: "restoration",
        label: "Renowacja",
        tagline: "Profesjonalna praca na każdym etapie",
        description:
          "Felgi przechodzą pełny cykl: naprawa, przygotowanie powierzchni, lakierowanie i wykończenie. Każdy etap według sprawdzonych technologii i z kontrolą jakości.",
        imageAlt: "Renowacja i lakierowanie felgi",
      },
      {
        id: "delivery",
        label: "Kontrola i odbiór",
        tagline: "Odbierasz gotowy komplet i wiesz, za co płacisz",
        description:
          "Sprawdzamy efekt, montujemy opony (jeśli trzeba) i przekazujemy komplet. Płatność po zakończeniu prac.",
        imageAlt: "Odbiór kompletu i płatność",
      },
    ],
  },
  loyalty: {
    eyebrow: "Program lojalnościowy",
    claimRuns: [
      {
        group: "muted",
        text: "System rabatów",
        breakAfter: true,
      },
      { group: "muted", text: "dla stałych klientów —" },
      { group: "strong", text: "do 15% zniżki" },
    ],
    body:
      "Każde zlecenie przybliża Cię do kolejnego poziomu. Rabat naliczamy automatycznie — im więcej prac wykonasz w Rim Studio, tym korzystniejsze warunki na lakierowanie, naprawę i montaż opon.",
    carouselAriaLabel: "Poziomy programu lojalnościowego Rim Studio",
    cta: {
      label: "Sprawdź swój poziom",
      href: "/contact",
    },
    secondaryCta: {
      label: "Jak naliczamy punkty",
      href: "/about",
    },
    tiers: {
      silver: {
        level: "Srebro",
        discount: "7%",
        discountLabel: "zniżki na usługi",
        thresholdLabel: "suma zamówień",
        threshold: "od 35 000 zł",
        perks: ["Rabat na montaż opon", "7 dni przechowania"],
      },
      gold: {
        level: "Złoto",
        discount: "10%",
        discountLabel: "zniżki na usługi",
        thresholdLabel: "suma zamówień",
        threshold: "od 70 000 zł",
        perks: ["Rabat na zaciski", "Osobisty opiekun"],
      },
      platinum: {
        level: "Platyna",
        discount: "15%",
        discountLabel: "zniżki na usługi",
        thresholdLabel: "suma zamówień",
        threshold: "od 120 000 zł",
        perks: ["Maksymalny rabat", "VIP bez kolejki"],
      },
    },
  },
  firstVisitPromo: {
    eyebrow: "Zniżka na pierwszą wizytę",
    carouselAriaLabel: "Zniżka na pierwszą wizytę Rim Studio",
    title: "Poznaj Rim Studio — 20% mniej na dowolną usługę",
    body:
      "Pierwszy raz zawsze trudno oddać felgi nowemu fachowcu. Dlatego na start — zniżka: oceń jakość i zdecyduj, czy zostajesz z nami.",
    validityNote: "Promocja obowiązuje do 31 grudnia 2026 r.",
    card: {
      brand: "Rim Studio",
      badge: "Pierwsza wizyta",
      discount: "20%",
      discountLabel: "zniżki na dowolną usługę",
      validUntil: "do 31.12.2026",
      audienceLabel: "Dla kogo",
      audience: "nowi klienci studia",
      perks: [
        "Stała cena po diagnostyce",
        "Zdjęcia przed i po każdej usługi",
      ],
      securedLabel: "Zarezerwowane",
      phoneCaption: "Podaj numer podczas wizyty",
    },
    form: {
      phoneLabel: "Numer telefonu",
      phonePlaceholder: "+48 600 000 000",
      consentMarketing:
        "Chcę SMS o sezonowej wymianie opon i promocjach (opcjonalnie)",
      submitLabel: "Odbierz zniżkę",
      termsLabel: "Warunki promocji",
      termsHref: "/legal/terms",
      successTitle: "Zgłoszenie przyjęte",
      successBody:
        "Skontaktujemy się pod podanym numerem i potwierdzimy zniżkę na pierwszą wizytę.",
      errors: {
        phoneRequired: "Podaj numer telefonu",
      },
    },
  },
  testimonials: {
    eyebrow: "Opinie klientów",
    sliderAriaLabel: "Opinie klientów Rim Studio",
    prevLabel: "Poprzednia opinia",
    nextLabel: "Następna opinia",
    counterAriaLabel: "Opinia {current} z {total}",
    items: [
      {
        id: "anna-k",
        quote:
          "Zleciliśmy lakierowanie kompletu R19 — kolor trafiony za pierwszym razem, termin jak obiecany. Felgi wyglądają jak nowe, bez smug i różnic w odcieniu.",
        author: "Anna Kowalska",
        role: "BMW X5, Warszawa",
        initials: "AK",
      },
      {
        id: "mikhail-n",
        quote:
          "Po uderzeniu w krawężnik odzyskali geometrię i polakierowali komplet — widać, że profesjonaliści. Auto na czas, bez niespodzianek w cenie.",
        author: "Michał Nowak",
        role: "Mercedes C-Class",
        initials: "MN",
      },
      {
        id: "olga-w",
        quote:
          "Robiliśmy toczenie diamentowe i lakier zacisków — połysk równy, przejścia czyste. Miło, że można wysłać zdjęcia i od razu dostać jasną wycenę.",
        author: "Olga Wiśniewska",
        role: "Audi A6",
        initials: "OW",
      },
      {
        id: "tomasz-l",
        quote:
          "Sezonowa wymiana opon poszła szybko, felg nie porysowano. Przechowywanie kół wygodne — nie trzeba ciągnąć kompletu po mieszkaniu między sezonami.",
        author: "Tomasz Lewandowski",
        role: "VW Tiguan",
        initials: "TL",
      },
    ],
  },
  faq: {
    eyebrow: "Najczęstsze pytania",
    title: "Pytania i odpowiedzi",
    lead:
      "Krótko o usłudze «{service}» — terminy, proces i to, o co pytają najczęściej.",
    listAriaLabel: "Pytania i odpowiedzi — {service}",
  },
  visitMap: {
    title: "Zapis i kontakt",
    contactsEyebrow: "Studio",
    contactsTitle: "Jak nas znaleźć",
    bookingEyebrow: "Serwis",
    hoursLabel: "Godziny otwarcia",
    hoursValue: "Pn–Pt · 09:00–18:00, Sob · 09:00–15:00",
  },
  footer: {
    addressLines: [STUDIO_ADDRESS_FULL, STUDIO_EMAIL],
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
      {
        href: "/services/tire-mounting",
        label: "Montaż opon (zapis online)",
      },
      { href: "/services/wheel-repair", label: "Naprawa felg" },
      { href: "/services/caliper-painting", label: "Lakierowanie zacisków" },
      {
        href: "/services/diamond-cutting",
        label: "Szlifowanie diamentowe felg",
      },
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
      terms: "Warunki korzystania",
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
    copyright: "© Rim Studio",
  },
};
