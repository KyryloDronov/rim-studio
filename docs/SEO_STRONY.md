# SEO: мета-теги по страницам (Rim Studio)

Только то, что **сейчас в коде**: `src/i18n/seo/pl.ts`, `src/i18n/seo/ru.ts`, сборка — `src/lib/seo-metadata.ts`, JSON-LD — `src/components/Seo/SiteJsonLd.tsx`.

**Сайт:** `https://rim-studio.pl` (или `NEXT_PUBLIC_SITE_URL`)  
**Языки:** PL — URL без префикса; RU — префикс `/ru`  
**Рынок / гео в SEO:** Warszawa (Варшава) — в title, description, `geo.placename`, `areaServed` в JSON-LD.  
**Адрес на картах и в разметке:** ul. Inwestycyjna 9, 05-800 Pruszków, Polska (юридический / фактический pin).  

**Не подключено:** `og:image`, Twitter image, картинки в JSON-LD (`image: []`).  
**Favicon / PWA:** `public/favicon/`, метаданные в `src/app/layout.tsx`, `src/app/manifest.ts` → `/manifest.webmanifest`.

---

## Теги на каждой странице

| Элемент | Значение |
|--------|----------|
| `<title>` | Уникальный title страницы |
| `<meta name="description">` | Уникальное description |
| `<meta name="keywords">` | Список keywords из SEO-копии |
| `link rel="canonical"` | URL текущей языковой версии |
| `link rel="alternate" hreflang` | `pl-PL`, `ru-RU`, `x-default` (x-default → PL) |
| Open Graph | `type`, `title`, `description`, `url`, `locale`, `locale:alternate`; `siteName` из layout |
| Twitter | `card=summary`, `title`, `description` |
| Robots | `index, follow` |
| Geo (`other`) | `geo.region=PL-MZ`, `geo.placename=Warszawa` |
| JSON-LD (layout) | `AutoRepair`, `Organization`, `WebSite` |

**Layout** (`src/app/[lang]/layout.tsx`): `metadataBase`, дефолт title/description с главной, шаблон title `%s · Rim Studio`, `applicationName`, базовый `og:siteName`. Canonical/hreflang задаёт каждая страница.

**Sitemap / robots:** `src/app/sitemap.ts`, `src/app/robots.ts`.

---

## URL

| Страница | PL | RU |
|----------|----|----|
| Главная | `/` | `/ru` |
| О студии | `/about` | `/ru/about` |
| Контакты | `/contact` | `/ru/contact` |
| Политика конфиденциальности | `/legal/privacy` | `/ru/legal/privacy` |
| Регламент | `/legal/terms` | `/ru/legal/terms` |
| Все услуги (хаб) | `/services` | `/ru/services` |
| Покраска дисков | `/services/wheel-painting` | `/ru/services/wheel-painting` |
| Шиномонтаж | `/services/tire-mounting` | `/ru/services/tire-mounting` |
| Ремонт дисков | `/services/wheel-repair` | `/ru/services/wheel-repair` |
| Алмазная проточка | `/services/diamond-cutting` | `/ru/services/diamond-cutting` |
| Покраска суппортов | `/services/caliper-painting` | `/ru/services/caliper-painting` |
| Покраска мото-дисков | `/services/motorcycle-wheel-painting` | `/ru/services/motorcycle-wheel-painting` |
| Сварка TIG | `/services/tig-welding` | `/ru/services/tig-welding` |

---

## 1. Главная

### PL

- **Title:** Lakierowanie i renowacja felg Warszawa \| Rim Studio
- **Description:** Rim Studio w Warszawie — proszkowe lakierowanie felg, naprawa, toczenie diamentowe, wulkanizacja i lakier zacisków. Gwarancja, termin 1–3 dni. Adres: ul. Inwestycyjna 9, 05-800 Pruszków.
- **Keywords:** lakierowanie felg Warszawa, renowacja felg, malowanie felg proszkowe, naprawa felg Warszawa, Rim Studio, felgi Warszawa

### RU

- **Title:** Покраска и реставрация дисков Варшава \| Rim Studio
- **Description:** Rim Studio в Варшаве — порошковая покраска дисков, ремонт, алмазная проточка, шиномонтаж и покраска суппортов. Гарантия, срок 1–3 дня. Адрес: ul. Inwestycyjna 9, 05-800 Pruszków, Polska.
- **Keywords:** покраска дисков Варшава, реставрация дисков, порошковая покраска дисков, ремонт дисков Варшава, Rim Studio, диски Варшава

---

## 2. О студии (`/about`)

### PL

- **Title:** O studiu Rim Studio — renowacja felg Warszawa
- **Description:** Poznaj Rim Studio w Warszawie: ponad 10 lat doświadczenia w lakierowaniu i naprawie felg, proces bez niespodzianek i gwarancja na prace.
- **Keywords:** studio felg Warszawa, Rim Studio o nas, renowacja felg doświadczenie

### RU

- **Title:** О студии Rim Studio — реставрация дисков в Варшаве
- **Description:** Rim Studio в Варшаве: более 10 лет опыта в покраске и ремонте дисков, прозрачный процесс работ и гарантия на услуги.
- **Keywords:** студия дисков Варшава, Rim Studio о нас, реставрация дисков опыт

---

## 3. Контакты (`/contact`)

### PL

- **Title:** Kontakt — Rim Studio Warszawa, ul. Inwestycyjna 9
- **Description:** Skontaktuj się z Rim Studio w Warszawie: telefon, e-mail, mapa dojazdu i formularz konsultacji. Lakierowanie i naprawa felg — umów wizytę.
- **Keywords:** kontakt Rim Studio, warsztat felg Warszawa, adres Rim Studio

### RU

- **Title:** Контакты Rim Studio Варшава — ul. Inwestycyjna 9
- **Description:** Связаться с Rim Studio в Варшаве: телефон, e-mail, карта проезда и форма записи на консультацию. Покраска и ремонт дисков.
- **Keywords:** контакты Rim Studio, мастерская дисков Варшава, адрес Rim Studio

---

## 4. Политика конфиденциальности (`/legal/privacy`)

### PL

- **Title:** Polityka prywatności — Rim Studio
- **Description:** Polityka prywatności Rim Studio (Warszawa): zasady przetwarzania danych osobowych, formularze na stronie i kontakt w sprawach RODO.
- **Keywords:** polityka prywatności Rim Studio, RODO warsztat felg

### RU

- **Title:** Политика конфиденциальности — Rim Studio
- **Description:** Политика конфиденциальности Rim Studio (Варшава): обработка персональных данных, формы на сайте и контакты по вопросам GDPR/RODO.
- **Keywords:** политика конфиденциальности Rim Studio, GDPR автосервис дисков

---

## 5. Регламент (`/legal/terms`)

### PL

- **Title:** Regulamin — Rim Studio Warszawa
- **Description:** Regulamin świadczenia usług Rim Studio w Warszawie: lakierowanie felg, naprawa, wulkanizacja — warunki współpracy i reklamacje.
- **Keywords:** regulamin Rim Studio, warunki usług felgi Warszawa

### RU

- **Title:** Условия оказания услуг — Rim Studio Варшава
- **Description:** Правила оказания услуг Rim Studio в Варшаве: покраска дисков, ремонт, шиномонтаж — порядок работ, оплата и рекламации.
- **Keywords:** условия Rim Studio, договор покраска дисков Варшава

---

## 6. Все услуги (`/services`)

### PL

- **Title:** Usługi — lakierowanie i naprawa felg Warszawa \| Rim Studio
- **Description:** Wszystkie usługi Rim Studio w Warszawie: proszkowe lakierowanie felg, naprawa, toczenie diamentowe, wulkanizacja, lakier zacisków i spawanie TIG. Wybierz usługę i umów wizytę.
- **Keywords:** usługi felgi Warszawa, lakierowanie felg Rim Studio, warsztat felg Warszawa, renowacja felg usługi

### RU

- **Title:** Услуги — покраска и ремонт дисков Варшава \| Rim Studio
- **Description:** Все услуги Rim Studio в Варшаве: порошковая покраска дисков, ремонт, алмазная проточка, шиномонтаж, покраска суппортов и сварка TIG. Выберите услугу и запишитесь.
- **Keywords:** услуги диски Варшава, покраска дисков Rim Studio, мастерская дисков Варшава, реставрация дисков услуги

---

## 7. Покраска дисков (`/services/wheel-painting`)

### PL

- **Title:** Lakierowanie felg Warszawa — proszkowe malowanie \| Rim Studio
- **Description:** Proszkowe lakierowanie felg w Warszawie: dobór koloru RAL, przygotowanie powierzchni i trwała powłoka. Wycena i termin — Rim Studio, ul. Inwestycyjna 9, Pruszków.
- **Keywords:** lakierowanie felg Warszawa, malowanie felg proszkowe, powłoka proszkowa felgi

### RU

- **Title:** Покраска дисков Варшава — порошковое напыление \| Rim Studio
- **Description:** Порошковая покраска дисков в Варшаве: подбор цвета RAL, подготовка поверхности и стойкое покрытие. Оценка и срок — Rim Studio, ul. Inwestycyjna 9, Pruszków.
- **Keywords:** покраска дисков Варшава, порошковая покраска дисков, малярка дисков

---

## 8. Ремонт дисков (`/services/wheel-repair`)

### PL

- **Title:** Naprawa felg Warszawa — prostowanie i spawanie \| Rim Studio
- **Description:** Naprawa felg w Warszawie: prostowanie geometrii, usuwanie wgnieceń, spawanie TIG i przygotowanie pod lakier. Diagnostyka w Rim Studio.
- **Keywords:** naprawa felg Warszawa, prostowanie felg, spawanie felg

### RU

- **Title:** Ремонт дисков Варшава — правка и сварка \| Rim Studio
- **Description:** Ремонт дисков в Варшаве: восстановление геометрии, устранение вмятин, аргонная сварка и подготовка под покраску. Диагностика в Rim Studio.
- **Keywords:** ремонт дисков Варшава, правка дисков, сварка дисков

---

## 9. Алмазная проточка (`/services/diamond-cutting`)

### PL

- **Title:** Szlifowanie diamentowe felg Warszawa \| Rim Studio
- **Description:** Toczenie diamentowe (Diamond Cut) felg w Warszawie — fabryczny połysk obrzeży, precyzyjna obróbka i lakier ochronny. Rim Studio.
- **Keywords:** szlifowanie diamentowe felg, diamond cut Warszawa, toczenie felg

### RU

- **Title:** Алмазная проточка дисков Варшава \| Rim Studio
- **Description:** Diamond Cut в Варшаве — зеркальный блеск полки диска, точная обработка и защитный лак. Rim Studio, реставрация премиум-класса.
- **Keywords:** алмазная проточка дисков, diamond cut Варшава, полировка дисков

---

## 10. Шиномонтаж (`/services/tire-mounting`)

### PL

- **Title:** Wulkanizacja i montaż opon Warszawa \| Rim Studio
- **Description:** Montaż opon i wulkanizacja w Warszawie przy Rim Studio: wyważanie, sezonowa wymiana, run-flat. Felgi i opony w jednym miejscu.
- **Keywords:** wulkanizacja Warszawa, montaż opon felgi, wymiana opon Warszawa

### RU

- **Title:** Шиномонтаж Варшава \| Rim Studio
- **Description:** Шиномонтаж и балансировка в Варшаве в Rim Studio: сезонная замена, run-flat, диски и шины в одном сервисе.
- **Keywords:** шиномонтаж Варшава, монтаж шин диски, замена шин Варшава

---

## 11. Покраска суппортов (`/services/caliper-painting`)

### PL

- **Title:** Lakierowanie zacisków hamulcowych Warszawa \| Rim Studio
- **Description:** Malowanie zacisków w Warszawie — proszkowa powłoka, demontaż i przygotowanie. Dobór koloru i trwałość termiczna. Rim Studio.
- **Keywords:** lakierowanie zacisków Warszawa, malowanie zacisków hamulcowych

### RU

- **Title:** Покраска суппортов Варшава \| Rim Studio
- **Description:** Покраска тормозных суппортов в Варшаве — термостойкое порошковое покрытие, разборка и подготовка. Подбор цвета. Rim Studio.
- **Keywords:** покраска суппортов Варшава, покраска тормозных суппортов

---

## 12. Покраска мото-дисков (`/services/motorcycle-wheel-painting`)

### PL

- **Title:** Lakierowanie felg motocyklowych Warszawa \| Rim Studio
- **Description:** Lakierowanie felg moto i części w Warszawie: proszkowa powłoka, renowacja i indywidualny kolor. Rim Studio — konsultacja i wycena.
- **Keywords:** lakierowanie felg motocyklowych, felgi moto Warszawa, malowanie felg moto

### RU

- **Title:** Покраска мото-дисков Варшава \| Rim Studio
- **Description:** Покраска мотоциклетных дисков и деталей в Варшаве: порошковое покрытие, реставрация и индивидуальный цвет. Rim Studio.
- **Keywords:** покраска мото дисков, мото диски Варшава, покраска мото колёс

---

## 13. Сварка TIG (`/services/tig-welding`)

### PL

- **Title:** Spawanie argonowe TIG felg Warszawa \| Rim Studio
- **Description:** Spawanie TIG aluminium i stali felg w Warszawie — naprawa pęknięć i uszkodzeń po uderzeniu. Rim Studio, precyzyjna diagnostyka.
- **Keywords:** spawanie felg Warszawa, spawanie TIG aluminium, naprawa pęknięć felgi

### RU

- **Title:** Аргонная сварка TIG дисков Варшава \| Rim Studio
- **Description:** Сварка TIG алюминия и стали дисков в Варшаве — ремонт трещин и сколов после удара. Rim Studio, точная диагностика.
- **Keywords:** сварка дисков Варшава, TIG сварка алюминия, ремонт трещин диска

---

## JSON-LD (на всех страницах)

**AutoRepair** (`#localbusiness`): Rim Studio, URL сайта, телефон +48786444468, rim.studio.pl@gmail.com, адрес ul. Inwestycyjna 9, 05-800 Pruszków, geo 52.1924159 / 20.8130378, areaServed Warszawa, часы Пн–Пт 09:00–18:00, Сб 09:00–15:00, priceRange $$, inLanguage по странице (pl-PL / ru-RU), image: [].

**Organization** (`#organization`): имя, URL, email, телефон, адрес, sameAs: Instagram, Facebook.

**WebSite** (`#website`): имя, URL, inLanguage pl-PL и ru-RU, publisher → localbusiness.
