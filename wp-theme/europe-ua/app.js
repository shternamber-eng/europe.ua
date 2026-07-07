/* ==========================================================
   Громада — логіка прототипу
   Дані демонстраційні; у бойовій версії їх віддає API/CMS.
   Підтримка двох мов інтерфейсу: uk / en.
   ========================================================== */

// ---------- Тексти інтерфейсу ----------

const STRINGS = {
  uk: {
    tabUkraine: "Україна",
    tabHere: "Тут",
    feedUpdated: "Стрічка · оновлено щойно",
    bridgeTitle: "Корисне у вашій країні",
    localNews: "Місцеві новини",
    footer: "europe.ua · твоя громада, де б ти не був",
    themeToggle: "Перемкнути тему",
    langToggle: "Switch to English",
    langLabel: "EN",
    docTitle: "europe.ua — новини та життя в Європі",
    docDescription: "Новини з України та практичні гіди для українців у Європі",
    tagline: "Тебе пам'ятають. Тебе обіймуть.",
    allNewsLink: label => `Всі новини ${label} →`,
    allGuidesLink: label => `Усі гайди: ${label} →`,
    hubComingSoon: label => `Довідник для ${label} готується`,
    guideCount: n => `${n} ${pluralizeUk(n, "гайд", "гайди", "гайдів")}`,
    lifeGoesOn: "Життя триває",
    moreGoodNews: "Більше хороших новин →",
    checkedPrefix: "перевірено",
  },
  en: {
    tabUkraine: "Ukraine",
    tabHere: "Here",
    feedUpdated: "Feed · updated just now",
    bridgeTitle: "Useful in your country",
    localNews: "Local news",
    footer: "europe.ua · your community, wherever you are",
    themeToggle: "Toggle theme",
    langToggle: "Перемкнути на українську",
    langLabel: "UA",
    docTitle: "europe.ua — news and life in Europe",
    docDescription: "News from Ukraine and practical guides for Ukrainians in Europe",
    tagline: "You are remembered. You are embraced.",
    allNewsLink: label => `All ${label} news →`,
    allGuidesLink: label => `All guides: ${label} →`,
    hubComingSoon: label => `Guide hub for ${label} is coming soon`,
    guideCount: n => `${n} ${n === 1 ? "guide" : "guides"}`,
    lifeGoesOn: "Life goes on",
    moreGoodNews: "More good news →",
    checkedPrefix: "checked",
  },
};

// Українська множина ("1 гайд" / "2 гайди" / "5 гайдів") — винятки для 11-14
// не потрапляють у "N%10" гілку.
function pluralizeUk(n, one, few, many) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

// Хаби практичних гайдів існують поки лише для Німеччини й Польщі — для
// решти країн у COUNTRY_ORDER просто немає запису тут, і блок гайдів
// на вкладці «Тут» для них не рендериться взагалі (нема чого показувати).
const GUIDE_HUBS = {
  de: { tag: "guide-germany", hubUrl: "https://europe.ua/dovidnyk/nimechchyna/" },
  pl: { tag: "guide-poland",  hubUrl: "https://europe.ua/dovidnyk/polshcha/" },
};

// Плитки «Корисне у вашій країні» на вкладці «Тут» — фіксовані 3 теми
// (тема "Житло" поки не має жодного гайда в жодній країні, тому їй тут
// плитки немає; вона все ще є в page-guide-hub.php й з'явиться сама,
// коли для неї опублікують перший гайд).
const HUB_TILES = [
  { theme: "tema-legalizatsiya", title: { uk: "Документи", en: "Documents" } },
  { theme: "tema-hroshi", title: { uk: "Робота і гроші", en: "Work & money" } },
  { theme: "tema-povsyakdenne", title: { uk: "Школи й діти та повсякдення", en: "Schools, kids & everyday life" } },
];

// Родовий відмінок (укр.) для фрази «Всі новини ______»: назви країн у HUBS
// стоять в називному ("Німеччина"), а тут треба "Німеччини" — тому окрема
// мапа замість спроби відмінювати рядок програмно.
const ALL_NEWS_LABELS = {
  ua: { uk: "України", en: "Ukraine" },
  de: { uk: "Німеччини", en: "Germany" },
  pl: { uk: "Польщі", en: "Poland" },
  cz: { uk: "Чехії", en: "the Czech Republic" },
  gb: { uk: "Великої Британії", en: "the UK" },
  es: { uk: "Іспанії", en: "Spain" },
  it: { uk: "Італії", en: "Italy" },
  nl: { uk: "Нідерландів", en: "the Netherlands" },
  eu: { uk: "Європейської комісії", en: "the European Commission" },
};

const LIFE_CATEGORY_SLUG = "zhyttia-tryvaie";

// ---------- Зображення (Wikimedia Commons, вільна ліцензія) ----------

const IMG = {
  kyiv: "https://commons.wikimedia.org/wiki/Special:FilePath/Kyiv_skyline_(15688086793).jpg?width=480",
  rada: "https://commons.wikimedia.org/wiki/Special:FilePath/Verkhovna_rada_kyiv.jpg?width=480",
  patriot: "https://commons.wikimedia.org/wiki/Special:FilePath/Patriot_missile_launch_b.jpg?width=480",
  pylons: "https://commons.wikimedia.org/wiki/Special:FilePath/Electricity%20pylons%2C%20Ukraine%2055.jpg?width=480",
  refinery: "https://commons.wikimedia.org/wiki/Special:FilePath/Mina-Al-Ahmadi_oil_refinery_night.jpg?width=480",
  berlin: "https://commons.wikimedia.org/wiki/Special:FilePath/Berlin_Brandenburg_Gate.JPG?width=480",
  warsaw: "https://commons.wikimedia.org/wiki/Special:FilePath/Old_Town_Market_Place-Warsaw-Poland.JPG?width=480",
  medyka: "https://commons.wikimedia.org/wiki/Special:FilePath/Poland%E2%80%93Ukraine_border_crossing_Medyka%E2%80%93Shehyni_summer_2017.JPG?width=480",
  prague: "https://commons.wikimedia.org/wiki/Special:FilePath/Charles_Bridge%2C_Prague_03.jpg?width=480",
  london: "https://commons.wikimedia.org/wiki/Special:FilePath/Big_Ben%2C_London.JPG?width=480",
  madrid: "https://commons.wikimedia.org/wiki/Special:FilePath/Madrid_-_Puerta_del_Sol_(35664312740).jpg?width=480",
  rome: "https://commons.wikimedia.org/wiki/Special:FilePath/Colosseum_in_rome.jpg?width=480",
  amsterdam: "https://commons.wikimedia.org/wiki/Special:FilePath/Amsterdam_-_Canal_-_0603.jpg?width=480",
  brussels: "https://commons.wikimedia.org/wiki/Special:FilePath/European_Parliament_building_Brussels_1.jpg?width=480",
};

// ---------- Дані (реальні новини станом на 02.07.2026) ----------

const UKRAINE_NEWS = [
  { title: { uk: "Росія завдала масованого удару по Києву: щонайменше 31 загиблий", en: "Russia launches massive strike on Kyiv: at least 31 killed" }, tag: { uk: "Головне", en: "Top" }, time: { uk: "2 дні тому", en: "2 days ago" }, major: true, image: IMG.kyiv },
  { title: { uk: "Зеленський і Трамп обговорили ситуацію на фронті напередодні Дня незалежності США", en: "Zelensky and Trump discussed the frontline situation ahead of US Independence Day" }, tag: { uk: "Політика", en: "Politics" }, time: { uk: "вчора", en: "yesterday" }, image: IMG.rada },
  { title: { uk: "Українські сили завдали удару по нафтовому терміналу в Санкт-Петербурзі", en: "Ukrainian forces struck an oil terminal in St. Petersburg" }, tag: { uk: "Війна", en: "War" }, time: { uk: "вчора", en: "yesterday" }, image: IMG.refinery },
  { title: { uk: "Єврокомісія обговорює жорсткіші правила захисту для чоловіків призовного віку", en: "European Commission discusses stricter protection rules for men of conscription age" }, tag: { uk: "Європа", en: "Europe" }, time: { uk: "3 дні тому", en: "3 days ago" }, image: IMG.brussels },
  { title: { uk: "Польща скоротила виплати біженцям — Німеччина побоюється нової хвилі переїзду", en: "Poland cuts refugee benefits — Germany fears a new wave of arrivals" }, tag: { uk: "Виплати", en: "Benefits" }, time: { uk: "цього тижня", en: "this week" }, image: IMG.warsaw },
];

const COUNTRY_ORDER = ["de", "pl", "cz", "gb", "es", "it", "nl", "eu"];

const HUBS = {
  de: {
    label: { uk: "Німеччина", en: "Germany" },
    hint: "DE",
    intro: { uk: "Життя в Німеччині: документи, Jobcenter, школи — покроково і з датами перевірки.", en: "Life in Germany: paperwork, Jobcenter, schools — step by step, with review dates." },
    news: [
      { title: { uk: "Єврокомісія пропонує продовжити тимчасовий захист до березня 2028", en: "European Commission proposes extending temporary protection until March 2028" }, tag: { uk: "Німеччина", en: "Germany" }, time: { uk: "26.06.2026", en: "26.06.2026" }, image: IMG.berlin },
      { title: { uk: "Німеччина побоюється нової хвилі переїзду через скорочення виплат у Польщі", en: "Germany fears a new wave of arrivals after Poland cuts benefits" }, tag: { uk: "Німеччина", en: "Germany" }, time: { uk: "цього тижня", en: "this week" }, image: IMG.berlin },
    ],
    bridge: [
      { icon: "📄", title: { uk: "Документи", en: "Documents" }, note: { uk: "перевірено: 06.2026", en: "checked: 06.2026" } },
      { icon: "💼", title: { uk: "Робота", en: "Work" }, note: { uk: "Jobcenter, дипломи", en: "Jobcenter, diplomas" } },
      { icon: "🏫", title: { uk: "Школи й діти", en: "Schools & kids" }, note: { uk: "запис, мова", en: "enrollment, language" } },
      { icon: "📅", title: { uk: "Події поруч", en: "Nearby events" }, note: { uk: "афіша громади", en: "community listings" } },
    ],
  },

  pl: {
    label: { uk: "Польща", en: "Poland" },
    hint: "PL",
    intro: { uk: "Життя в Польщі: новини громади, робота та все про поїздки додому.", en: "Life in Poland: community news, work and everything about trips home." },
    news: [
      { title: { uk: "Польща отримала право не приймати нових біженців — чинний захист зберігається", en: "Poland granted the right to stop accepting new refugees — existing protections remain" }, tag: { uk: "Польща", en: "Poland" }, time: { uk: "06.2026", en: "06.2026" }, image: IMG.warsaw },
      { title: { uk: "На переході Медика — Шегині відновили рух: деталі", en: "Traffic resumed at the Medyka–Shehyni crossing: details" }, tag: { uk: "Кордон", en: "Border" }, time: { uk: "2 год тому", en: "2h ago" }, image: IMG.medyka },
      { title: { uk: "Варшава скоротила соціальні виплати біженцям з березня", en: "Warsaw has cut refugee benefits since March" }, tag: { uk: "Виплати", en: "Benefits" }, time: { uk: "цього тижня", en: "this week" }, image: IMG.warsaw },
    ],
    bridge: [
      { icon: "🚌", title: { uk: "Поїздка додому", en: "Trip home" }, note: { uk: "кордон, перевізники", en: "border, carriers" } },
      { icon: "💼", title: { uk: "Робота", en: "Work" }, note: { uk: "вакансії, договори", en: "jobs, contracts" } },
      { icon: "📄", title: { uk: "PESEL UKR", en: "PESEL UKR" }, note: { uk: "перевірено: 06.2026", en: "checked: 06.2026" } },
      { icon: "📅", title: { uk: "Події поруч", en: "Nearby events" }, note: { uk: "афіша громади", en: "community listings" } },
    ],
  },

  eu: {
    label: { uk: "Інша країна ЄС", en: "Other EU country" },
    hint: { uk: "ЄС", en: "EU" },
    intro: { uk: "Загальне для всіх у ЄС: тимчасовий захист, банки, консульства, поїздки додому.", en: "General info for everyone in the EU: temporary protection, banks, consulates, trips home." },
    news: [
      { title: { uk: "Єврокомісія пропонує продовжити тимчасовий захист до березня 2028", en: "European Commission proposes extending temporary protection until March 2028" }, tag: { uk: "Європа", en: "Europe" }, time: { uk: "26.06.2026", en: "26.06.2026" }, image: IMG.brussels },
    ],
    bridge: [
      { icon: "🛡️", title: { uk: "Тимчасовий захист", en: "Temporary protection" }, note: { uk: "права в ЄС", en: "rights in the EU" } },
      { icon: "🏦", title: { uk: "Банки", en: "Banks" }, note: { uk: "рахунки, перекази", en: "accounts, transfers" } },
      { icon: "🛂", title: { uk: "Консульства", en: "Consulates" }, note: { uk: "документи", en: "documents" } },
      { icon: "🚌", title: { uk: "Поїздка додому", en: "Trip home" }, note: { uk: "маршрути", en: "routes" } },
    ],
  },

  cz: {
    label: { uk: "Чехія", en: "Czech Republic" },
    hint: "CZ",
    intro: { uk: "Життя в Чехії: тимчасовий захист, реєстрація, робота та школи — головне по кроках.", en: "Life in Czechia: temporary protection, registration, work and schools — the essentials, step by step." },
    news: [
      { title: { uk: "Чехія отримала право не приймати нових біженців — чинний захист зберігається", en: "Czechia granted the right to stop accepting new refugees — existing protections remain" }, tag: { uk: "Чехія", en: "Czechia" }, time: { uk: "06.2026", en: "06.2026" }, image: IMG.prague },
      { title: { uk: "Прага розширює курси чеської мови для біженців", en: "Prague expands Czech language courses for refugees" }, tag: { uk: "Чехія", en: "Czechia" }, time: { uk: "сьогодні", en: "today" }, image: IMG.prague },
    ],
    bridge: [
      { icon: "📄", title: { uk: "Тимчасовий захист", en: "Temporary protection" }, note: { uk: "перевірено: 06.2026", en: "checked: 06.2026" } },
      { icon: "💼", title: { uk: "Робота", en: "Work" }, note: { uk: "Úřad práce, курси", en: "Úřad práce, courses" } },
      { icon: "🏫", title: { uk: "Школи й діти", en: "Schools & kids" }, note: { uk: "запис, адаптація", en: "enrollment, adaptation" } },
      { icon: "📅", title: { uk: "Події поруч", en: "Nearby events" }, note: { uk: "афіша громади", en: "community listings" } },
    ],
  },

  gb: {
    label: { uk: "Велика Британія", en: "United Kingdom" },
    hint: "UK",
    intro: { uk: "Життя у Великій Британії: візові схеми, Universal Credit, NHS і школи.", en: "Life in the UK: visa schemes, Universal Credit, the NHS and schools." },
    news: [
      { title: { uk: "Уряд Британії підтвердив умови Ukraine Permission Extension Scheme", en: "UK government confirms terms of the Ukraine Permission Extension Scheme" }, tag: { uk: "Британія", en: "UK" }, time: { uk: "06.2026", en: "06.2026" }, image: IMG.london },
      { title: { uk: "Зміни у виплаті Universal Credit для новоприбулих", en: "Changes to Universal Credit for new arrivals" }, tag: { uk: "Виплати", en: "Benefits" }, time: { uk: "2 год тому", en: "2h ago" }, image: IMG.london },
      { title: { uk: "Лондон: ярмарок вакансій для українців цього тижня", en: "London: job fair for Ukrainians this week" }, tag: { uk: "Робота", en: "Work" }, time: { uk: "вчора", en: "yesterday" }, image: IMG.london },
    ],
    bridge: [
      { icon: "🛂", title: { uk: "Візова схема", en: "Visa scheme" }, note: { uk: "перевірено: 06.2026", en: "checked: 06.2026" } },
      { icon: "💷", title: { uk: "Виплати", en: "Benefits" }, note: { uk: "Universal Credit", en: "Universal Credit" } },
      { icon: "🏥", title: { uk: "NHS", en: "NHS" }, note: { uk: "лікар, реєстрація", en: "GP, registration" } },
      { icon: "🏫", title: { uk: "Школи й діти", en: "Schools & kids" }, note: { uk: "запис, ради", en: "enrollment, councils" } },
    ],
  },

  es: {
    label: { uk: "Іспанія", en: "Spain" },
    hint: "ES",
    intro: { uk: "Життя в Іспанії: тимчасовий захист, empadronamiento, робота та школа.", en: "Life in Spain: temporary protection, empadronamiento, work and school." },
    news: [
      { title: { uk: "Єврокомісія пропонує продовжити тимчасовий захист до березня 2028", en: "European Commission proposes extending temporary protection until March 2028" }, tag: { uk: "Іспанія", en: "Spain" }, time: { uk: "26.06.2026", en: "26.06.2026" }, image: IMG.madrid },
      { title: { uk: "Мадрид продовжує програму мовної адаптації", en: "Madrid extends the language adaptation programme" }, tag: { uk: "Іспанія", en: "Spain" }, time: { uk: "сьогодні", en: "today" }, image: IMG.madrid },
    ],
    bridge: [
      { icon: "📄", title: { uk: "Захист", en: "Protection" }, note: { uk: "перевірено: 06.2026", en: "checked: 06.2026" } },
      { icon: "🏠", title: { uk: "Empadronamiento", en: "Empadronamiento" }, note: { uk: "реєстрація адреси", en: "address registration" } },
      { icon: "🏥", title: { uk: "Медицина", en: "Healthcare" }, note: { uk: "tarjeta sanitaria", en: "tarjeta sanitaria" } },
      { icon: "💼", title: { uk: "Робота", en: "Work" }, note: { uk: "вакансії, NIE", en: "jobs, NIE" } },
    ],
  },

  it: {
    label: { uk: "Італія", en: "Italy" },
    hint: "IT",
    intro: { uk: "Життя в Італії: тимчасовий захист, permesso di soggiorno, медицина та школа.", en: "Life in Italy: temporary protection, permesso di soggiorno, healthcare and school." },
    news: [
      { title: { uk: "Єврокомісія пропонує продовжити тимчасовий захист до березня 2028", en: "European Commission proposes extending temporary protection until March 2028" }, tag: { uk: "Італія", en: "Italy" }, time: { uk: "26.06.2026", en: "26.06.2026" }, image: IMG.rome },
      { title: { uk: "Рим спрощує подачу документів на permesso", en: "Rome simplifies permesso document submission" }, tag: { uk: "Італія", en: "Italy" }, time: { uk: "сьогодні", en: "today" }, image: IMG.rome },
    ],
    bridge: [
      { icon: "📄", title: { uk: "Захист", en: "Protection" }, note: { uk: "перевірено: 06.2026", en: "checked: 06.2026" } },
      { icon: "🪪", title: { uk: "Permesso", en: "Permesso" }, note: { uk: "дозвіл на проживання", en: "residence permit" } },
      { icon: "🏥", title: { uk: "SSN", en: "SSN" }, note: { uk: "медична допомога", en: "healthcare" } },
      { icon: "💼", title: { uk: "Робота", en: "Work" }, note: { uk: "вакансії, codice fiscale", en: "jobs, codice fiscale" } },
    ],
  },

  nl: {
    label: { uk: "Нідерланди", en: "Netherlands" },
    hint: "NL",
    intro: { uk: "Життя в Нідерландах: тимчасовий захист, BSN, житло та медична страховка.", en: "Life in the Netherlands: temporary protection, BSN, housing and health insurance." },
    news: [
      { title: { uk: "У Нідерландах українці отримують 260–350 євро на особу щомісяця плюс ~215 євро на харчування", en: "In the Netherlands Ukrainians receive €260–350 per person monthly plus about €215 for food" }, tag: { uk: "Виплати", en: "Benefits" }, time: { uk: "06.2026", en: "06.2026" }, image: IMG.amsterdam },
      { title: { uk: "Амстердам розширює програму мовних курсів", en: "Amsterdam expands its language course programme" }, tag: { uk: "Нідерланди", en: "Netherlands" }, time: { uk: "сьогодні", en: "today" }, image: IMG.amsterdam },
    ],
    bridge: [
      { icon: "📄", title: { uk: "Захист", en: "Protection" }, note: { uk: "перевірено: 06.2026", en: "checked: 06.2026" } },
      { icon: "🪪", title: { uk: "BSN", en: "BSN" }, note: { uk: "реєстраційний номер", en: "citizen number" } },
      { icon: "🏠", title: { uk: "Житло", en: "Housing" }, note: { uk: "муніципальне житло", en: "municipal housing" } },
      { icon: "🏥", title: { uk: "Медицина", en: "Healthcare" }, note: { uk: "страховка", en: "insurance" } },
    ],
  },
};

// ---------- Переклад значень ----------

function tx(val) {
  if (val && typeof val === "object" && ("uk" in val || "en" in val)) {
    return val[lang] || val.uk;
  }
  return val;
}

// ---------- Стан ----------

let country = localStorage.getItem("hromada.country") || "de";
let lang = localStorage.getItem("hromada.lang") || "uk";
let activeTab = "ukraine";

// ---------- Елементи ----------

const el = {
  countryBtn: document.getElementById("countryBtn"),
  countryLabel: document.getElementById("countryLabel"),
  countryMenu: document.getElementById("countryMenu"),
  themeBtn: document.getElementById("themeBtn"),
  langBtn: document.getElementById("langBtn"),
  langLabel: document.getElementById("langLabel"),
  hereHint: document.getElementById("hereHint"),
  tagline: document.getElementById("tagline"),
  tabUkraineLabel: document.getElementById("tabUkraineLabel"),
  tabHereLabel: document.getElementById("tabHereLabel"),
  tabs: document.querySelectorAll(".tab"),
  viewUkraine: document.getElementById("view-ukraine"),
  viewHere: document.getElementById("view-here"),
  feedMeta: document.getElementById("feedMeta"),
  ukraineFeed: document.getElementById("ukraineFeed"),
  ukraineFeedMore: document.getElementById("ukraineFeedMore"),
  bridgeTitle: document.getElementById("bridgeTitle"),
  bridgeGrid: document.getElementById("bridgeGrid"),
  hubIntro: document.getElementById("hubIntro"),
  hubFeedBlock: document.getElementById("hubFeedBlock"),
  hubFeed: document.getElementById("hubFeed"),
  hubFeedMore: document.getElementById("hubFeedMore"),
  hubNewsTitle: document.getElementById("hubNewsTitle"),
  hubUsefulBlock: document.getElementById("hubUsefulBlock"),
  hubUsefulTitle: document.getElementById("hubUsefulTitle"),
  hubUsefulGrid: document.getElementById("hubUsefulGrid"),
  hubGuidesMore: document.getElementById("hubGuidesMore"),
  footerText: document.getElementById("footerText"),
};

// ---------- Реальні пости з WordPress ----------

const WP_REST_BASE = "https://europe.ua/?rest_route=";

// Ті самі slug'и категорій, що й у hromada-bot (sources.json / official-sources.json)
const CATEGORY_SLUGS = {
  ua: "ukraina",
  de: "nimechchyna",
  pl: "polshcha",
  cz: "chekhiia",
  gb: "brytaniia",
  es: "ispaniia",
  it: "italiia",
  nl: "niderlandy",
  eu: "yevrokomisiya",
};

const realPostsCache = {}; // slug -> Promise<Array<{title,link,date,image}>>

function getRealPosts(slug, count = 5) {
  if (!slug) return Promise.resolve([]);
  if (!(slug in realPostsCache)) {
    realPostsCache[slug] = fetch(`${WP_REST_BASE}/wp/v2/categories&slug=${slug}`)
      .then(r => (r.ok ? r.json() : []))
      .then(cats => {
        if (!cats.length) return [];
        return fetch(`${WP_REST_BASE}/wp/v2/posts&categories=${cats[0].id}&per_page=${count}&_embed`)
          .then(r => (r.ok ? r.json() : []))
          .then(posts => posts.map(p => ({
            title: (p.title?.rendered || "").replace(/&#8217;/g, "’").replace(/&amp;/g, "&"),
            link: p.link,
            date: p.date,
            image: p._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium?.source_url
              || p._embedded?.["wp:featuredmedia"]?.[0]?.source_url
              || null,
          })));
      })
      .catch(() => []);
  }
  return realPostsCache[slug];
}

function formatPostDate(iso) {
  const d = new Date(iso);
  const locale = lang === "en" ? "en-GB" : "uk-UA";
  const date = d.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
  const time = d.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
  return `${date}, ${time}`;
}

function formatShortDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(lang === "en" ? "en-GB" : "uk-UA", { day: "2-digit", month: "2-digit", year: "numeric" });
}

// Гайди країни для плиток «Корисне у вашій країні» — реальні пости з WP,
// відфільтровані за тегом країни (guide-germany/guide-poland). WP REST без
// авторизації й так віддає лише status=publish, тому чернетки сюди не
// потраплять самі собою. per_page=50 — з запасом, реальних гайдів на країну
// поки максимум 7, рахуємо теми (і найсвіжішу дату) по цьому набору клієнтськи,
// бо REST-параметр tags= — це "АБО" по декільком id, а не "І".
const realGuidesCache = {};

function getRealGuides(tagSlug, count = 50) {
  if (!tagSlug) return Promise.resolve([]);
  if (!(tagSlug in realGuidesCache)) {
    realGuidesCache[tagSlug] = fetch(`${WP_REST_BASE}/wp/v2/tags&slug=${tagSlug}`)
      .then(r => (r.ok ? r.json() : []))
      .then(tags => {
        if (!tags.length) return [];
        return fetch(`${WP_REST_BASE}/wp/v2/posts&tags=${tags[0].id}&per_page=${count}`)
          .then(r => (r.ok ? r.json() : []))
          .then(posts => posts.map(p => ({ modified: p.modified, tags: p.tags || [] })));
      })
      .catch(() => []);
  }
  return realGuidesCache[tagSlug];
}

// Id тегів тем (Легалізація/Гроші/Повсякденне) — один запит, кешується.
// Пост із REST вже містить масив id своїх тегів (post.tags), тому щоб
// перевірити належність до теми, достатньо порівняти id, без другого фільтра.
let themeTagIdsPromise = null;

function getThemeTagIds() {
  if (!themeTagIdsPromise) {
    const slugs = HUB_TILES.map(t => t.theme).join(",");
    themeTagIdsPromise = fetch(`${WP_REST_BASE}/wp/v2/tags&slug=${slugs}&per_page=10`)
      .then(r => (r.ok ? r.json() : []))
      .then(tags => {
        const map = {};
        tags.forEach(t => { map[t.slug] = t.id; });
        return map;
      })
      .catch(() => ({}));
  }
  return themeTagIdsPromise;
}

// Групує гайди країни по фіксованих 3 темах: рахує кількість і бере
// найсвіжішу дату оновлення серед них. Тема без жодного гайда просто не
// потрапляє в результат — плитки для неї не буде.
function buildHubTiles(guides, themeTagIds, hubUrl) {
  return HUB_TILES.map(t => {
    const themeId = themeTagIds[t.theme];
    const matched = themeId ? guides.filter(g => g.tags.includes(themeId)) : [];
    if (!matched.length) return null;
    const latest = matched.reduce((max, g) => (new Date(g.modified) > new Date(max) ? g.modified : max), matched[0].modified);
    return { title: t.title, count: matched.length, checked: formatShortDate(latest), href: `${hubUrl}#${t.theme}` };
  }).filter(Boolean);
}

// ---------- Рендер ----------

// Демо-картка (плейсхолдер) — навмисно НЕ клікабельна: посилання нема нікуди,
// доки для цієї категорії немає жодного реального посту на сайті.
function demoCard(item) {
  const major = item.major ? " card--major" : "";
  const title = tx(item.title).replace(/"/g, "&quot;");
  return `
    <div class="card${major} card--demo">
      <div class="card__img"><img src="${item.image}" alt="${title}" loading="lazy"></div>
      <div>
        <p class="card__title">${tx(item.title)}</p>
        <p class="card__meta"><span class="card__tag">${tx(item.tag)}</span> · ${tx(item.time)}</p>
      </div>
    </div>`;
}

// Картка реального посту — клікабельна, веде на статтю на europe.ua
function realCard(post) {
  const imgBlock = post.image
    ? `<div class="card__img"><img src="${post.image}" alt="${post.title.replace(/"/g, "&quot;")}" loading="lazy"></div>`
    : "";
  return `
    <a href="${post.link}" class="card">
      ${imgBlock}
      <div>
        <p class="card__title">${post.title}</p>
        <p class="card__meta">${formatPostDate(post.date)}</p>
      </div>
    </a>`;
}

// Стрічка «Україна»: перші 4 картки, далі (якщо є пости) видимий блок
// «Життя триває», далі решта. Порожньої заглушки немає — секція просто
// не рендериться, якщо в категорії ще нема жодного посту.
function renderUkraineFeed(posts, cardFn, lifePosts) {
  const first = posts.slice(0, 4).map(cardFn).join("");
  const rest = posts.slice(4).map(cardFn).join("");
  if (!lifePosts || !lifePosts.length) return first + rest;

  const life = `
    <div class="life-section">
      <h2 class="section-title life-section__title">🌻 ${STRINGS[lang].lifeGoesOn}</h2>
      <div class="feed">${lifePosts.slice(0, 3).map(realCard).join("")}</div>
      <p class="feed-more"><a href="https://europe.ua/category/${LIFE_CATEGORY_SLUG}/">${STRINGS[lang].moreGoodNews}</a></p>
    </div>`;

  return first + life + rest;
}

// Плитка теми в «Корисне у вашій країні» — веде на хаб країни, одразу на
// секцію цієї теми (якір з page-guide-hub.php).
function hubTileCard(t) {
  return `
    <a href="${t.href}" class="bridge__item bridge__item--link">
      <strong>${tx(t.title)}</strong>
      <span>${STRINGS[lang].guideCount(t.count)} · ${STRINGS[lang].checkedPrefix}: ${t.checked}</span>
    </a>`;
}

// Поки для країни не опубліковано жодного гайда — замість плиток одна
// картка-заглушка на хаб, без порожніх "скоро" по кожній темі окремо.
function hubComingSoonCard(hubUrl, label) {
  return `<a href="${hubUrl}" class="bridge__item bridge__item--link">${STRINGS[lang].hubComingSoon(label)}</a>`;
}

function bridgeItem(b) {
  return `
    <button class="bridge__item" type="button">
      <strong>${b.icon} ${tx(b.title)}</strong>
      <span>${tx(b.note)}</span>
    </button>`;
}

function renderCountryMenu() {
  el.countryMenu.innerHTML = COUNTRY_ORDER.map(code => `
    <li role="option" data-country="${code}" aria-selected="${code === country ? "true" : "false"}">${tx(HUBS[code].label)}</li>
  `).join("");
}

function renderChrome() {
  const s = STRINGS[lang];
  document.documentElement.lang = lang === "en" ? "en" : "uk";
  document.title = s.docTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = s.docDescription;

  el.langLabel.textContent = s.langLabel;
  el.langBtn.setAttribute("aria-label", s.langToggle);
  el.themeBtn.setAttribute("aria-label", s.themeToggle);

  el.tabUkraineLabel.textContent = s.tabUkraine;
  el.tabHereLabel.textContent = s.tabHere;
  el.feedMeta.textContent = s.feedUpdated;
  el.bridgeTitle.textContent = s.bridgeTitle;
  el.hubNewsTitle.textContent = s.localNews;
  el.hubUsefulTitle.textContent = s.bridgeTitle;
  el.footerText.textContent = s.footer;
  el.tagline.textContent = s.tagline;
  el.ukraineFeedMore.textContent = s.allNewsLink(ALL_NEWS_LABELS.ua[lang]);
}

function render() {
  const hub = HUBS[country];

  renderChrome();

  // Шапка й таби
  el.countryLabel.textContent = tx(hub.label);
  el.hereHint.textContent = ` · ${tx(hub.hint)}`;
  renderCountryMenu();

  // Українська стрічка (спільна) + мостик у країновий хаб
  el.ukraineFeed.innerHTML = renderUkraineFeed(UKRAINE_NEWS, demoCard, []);
  el.bridgeGrid.innerHTML = hub.bridge.map(bridgeItem).join("");

  // Країновий хаб: спершу стрічка новин, нижче — «Корисне у вашій країні»
  el.hubIntro.textContent = tx(hub.intro);
  el.hubFeed.innerHTML = hub.news.map(demoCard).join("");
  el.hubFeedMore.href = `https://europe.ua/category/${CATEGORY_SLUGS[country]}/`;
  el.hubFeedMore.textContent = STRINGS[lang].allNewsLink(ALL_NEWS_LABELS[country][lang]);

  // «Корисне у вашій країні»: плитки тем — тільки для країн із хабом гайдів.
  // Поки дані не підвантажені, сітка лишається порожньою (без демо).
  const guideHub = GUIDE_HUBS[country];
  el.hubUsefulBlock.hidden = !guideHub;
  el.hubUsefulGrid.innerHTML = "";
  if (guideHub) {
    el.hubGuidesMore.href = guideHub.hubUrl;
    el.hubGuidesMore.textContent = STRINGS[lang].allGuidesLink(tx(hub.label));
  }

  refreshRealPosts(country);
}

// Підвантажує реальні пости з WordPress і підміняє демо-картки, якщо для
// категорії вже є хоч один опублікований матеріал. Захист від «гонки» —
// застосовуємо результат, тільки якщо користувач не встиг перемкнути країну.
function refreshRealPosts(requestedCountry) {
  Promise.all([getRealPosts(CATEGORY_SLUGS.ua), getRealPosts(LIFE_CATEGORY_SLUG, 3)]).then(([posts, lifePosts]) => {
    if (posts.length) el.ukraineFeed.innerHTML = renderUkraineFeed(posts, realCard, lifePosts);
  });

  const slug = CATEGORY_SLUGS[requestedCountry];
  getRealPosts(slug).then(posts => {
    if (country !== requestedCountry) return; // користувач вже перемкнув країну
    if (posts.length) el.hubFeed.innerHTML = posts.map(realCard).join("");
  });

  const guideHub = GUIDE_HUBS[requestedCountry];
  if (!guideHub) return;

  Promise.all([getRealGuides(guideHub.tag), getThemeTagIds()]).then(([guides, themeTagIds]) => {
    if (country !== requestedCountry) return;

    if (!guides.length) {
      el.hubUsefulGrid.className = "useful-grid useful-grid--single";
      el.hubUsefulGrid.innerHTML = hubComingSoonCard(guideHub.hubUrl, ALL_NEWS_LABELS[requestedCountry][lang]);
      return;
    }

    const tiles = buildHubTiles(guides, themeTagIds, guideHub.hubUrl);
    if (!tiles.length) {
      el.hubUsefulGrid.className = "useful-grid useful-grid--single";
      el.hubUsefulGrid.innerHTML = hubComingSoonCard(guideHub.hubUrl, ALL_NEWS_LABELS[requestedCountry][lang]);
    } else {
      el.hubUsefulGrid.className = "useful-grid";
      el.hubUsefulGrid.innerHTML = tiles.map(hubTileCard).join("");
    }
  });
}

// ---------- Таби ----------

el.tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    activeTab = tab.dataset.tab;
    el.tabs.forEach(t => t.classList.toggle("is-active", t === tab));
    el.viewUkraine.hidden = activeTab !== "ukraine";
    el.viewHere.hidden = activeTab !== "here";
    window.scrollTo({ top: 0 });
  });
});

// Мостик на головній веде в таб «Тут»
el.bridgeGrid.addEventListener("click", () => {
  document.querySelector('[data-tab="here"]').click();
});

// ---------- Вибір країни ----------

el.countryBtn.addEventListener("click", () => {
  const open = !el.countryMenu.hidden;
  el.countryMenu.hidden = open;
  el.countryBtn.setAttribute("aria-expanded", String(!open));
});

el.countryMenu.addEventListener("click", e => {
  const li = e.target.closest("li[data-country]");
  if (!li) return;
  country = li.dataset.country;
  localStorage.setItem("hromada.country", country);
  el.countryMenu.hidden = true;
  el.countryBtn.setAttribute("aria-expanded", "false");
  render();
});

document.addEventListener("click", e => {
  if (!el.countryMenu.hidden && !e.target.closest(".header__controls") && !e.target.closest(".country-menu")) {
    el.countryMenu.hidden = true;
    el.countryBtn.setAttribute("aria-expanded", "false");
  }
});

// ---------- Тема ----------

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("hromada.theme", theme);
}

const savedTheme = localStorage.getItem("hromada.theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
}

el.themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
});

// ---------- Мова ----------

el.langBtn.addEventListener("click", () => {
  lang = lang === "en" ? "uk" : "en";
  localStorage.setItem("hromada.lang", lang);
  render();
});

// ---------- Старт ----------

render();
