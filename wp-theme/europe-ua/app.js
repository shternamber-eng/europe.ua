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
    checkedPrefix: "перевірено",
    updatedBadge: "правила змінились",
    docTitle: "europe.ua — новини та життя в Європі",
    docDescription: "Новини з України та практичні гіди для українців у Європі",
    tagline: "Тебе пам'ятають. Тебе обіймуть.",
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
    checkedPrefix: "checked",
    updatedBadge: "rules changed",
    docTitle: "europe.ua — news and life in Europe",
    docDescription: "News from Ukraine and practical guides for Ukrainians in Europe",
    tagline: "You are remembered. You are embraced.",
  },
};

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
    guidesFirst: true,
    guides: [
      { term: "Anmeldung", title: { uk: "реєстрація за місцем проживання", en: "registering your address" }, desc: { uk: "Куди йти, які документи, скільки чекати термін.", en: "Where to go, which documents, how long it takes." }, checked: { uk: "06.2026", en: "06.2026" }, updated: true },
      { term: "§24", title: { uk: "статус тимчасового захисту і що далі", en: "temporary protection status and what's next" }, desc: { uk: "Продовження, перехід на інші типи дозволів.", en: "Renewal, switching to other permit types." }, checked: { uk: "06.2026", en: "06.2026" }, updated: false },
      { term: "Jobcenter", title: { uk: "виплати та пошук роботи", en: "benefits and job search" }, desc: { uk: "Bürgergeld, курси мови, визнання дипломів.", en: "Bürgergeld, language courses, recognition of diplomas." }, checked: { uk: "05.2026", en: "05.2026" }, updated: false },
      { term: "Kita і школа", title: { uk: "як записати дитину", en: "enrolling a child" }, desc: { uk: "Черги, документи, мовна підтримка для дітей.", en: "Waiting lists, documents, language support for kids." }, checked: { uk: "06.2026", en: "06.2026" }, updated: false },
      { term: "Krankenkasse", title: { uk: "медичне страхування", en: "health insurance" }, desc: { uk: "Вибір каси, запис до лікаря, невідкладна допомога.", en: "Choosing a fund, booking a doctor, emergency care." }, checked: { uk: "04.2026", en: "04.2026" }, updated: false },
    ],
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
    guidesFirst: false,
    guides: [
      { term: "PESEL UKR", title: { uk: "статус і що він дає", en: "status and what it grants" }, desc: { uk: "Продовження спецзакону, права, виплати.", en: "Special law renewal, rights, benefits." }, checked: { uk: "06.2026", en: "06.2026" }, updated: true },
      { term: "Поїздка в Україну", title: { uk: "кордон зараз", en: "the border right now" }, desc: { uk: "Черги на переходах, перевізники, що можна везти.", en: "Crossing queues, carriers, what you can bring." }, checked: { uk: "цього тижня", en: "this week" }, updated: false },
      { term: "Робота", title: { uk: "легальне працевлаштування", en: "legal employment" }, desc: { uk: "Umowa o pracę чи zlecenie: різниця і пастки.", en: "Umowa o pracę vs zlecenie: the difference and pitfalls." }, checked: { uk: "05.2026", en: "05.2026" }, updated: false },
      { term: "Школа", title: { uk: "запис дитини та іспити", en: "enrollment and exams" }, desc: { uk: "Обов'язковість навчання, українські класи.", en: "Compulsory schooling, Ukrainian classes." }, checked: { uk: "06.2026", en: "06.2026" }, updated: false },
    ],
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
    guidesFirst: true,
    guides: [
      { term: "Тимчасовий захист", title: { uk: "права в усіх країнах ЄС", en: "rights across the EU" }, desc: { uk: "Що гарантує директива і до якої дати.", en: "What the directive guarantees and until when." }, checked: { uk: "06.2026", en: "06.2026" }, updated: false },
      { term: "Банки й перекази", title: { uk: "рахунки та гроші в Україну", en: "accounts and money transfers to Ukraine" }, desc: { uk: "Відкриття рахунку, комісії, ліміти.", en: "Opening an account, fees, limits." }, checked: { uk: "05.2026", en: "05.2026" }, updated: false },
      { term: "Консульства", title: { uk: "документи за кордоном", en: "documents abroad" }, desc: { uk: "Паспорти, довіреності, записи в чергу.", en: "Passports, powers of attorney, queue booking." }, checked: { uk: "06.2026", en: "06.2026" }, updated: false },
      { term: "Переїзд між країнами", title: { uk: "зміна країни захисту", en: "changing your host country" }, desc: { uk: "Чи можна і як переоформити статус.", en: "Whether and how to transfer your status." }, checked: { uk: "04.2026", en: "04.2026" }, updated: false },
    ],
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
    guidesFirst: true,
    guides: [
      { term: "Dočasná ochrana", title: { uk: "тимчасовий захист і продовження", en: "temporary protection and renewal" }, desc: { uk: "Як подовжити статус, які документи потрібні.", en: "How to renew status and which documents are required." }, checked: { uk: "06.2026", en: "06.2026" }, updated: true },
      { term: "Registrace pobytu", title: { uk: "реєстрація місця проживання", en: "registration of residence" }, desc: { uk: "Куди звертатися після переїзду на нову адресу.", en: "Where to report after moving to a new address." }, checked: { uk: "05.2026", en: "05.2026" }, updated: false },
      { term: "Úřad práce", title: { uk: "працевлаштування та допомога", en: "employment and benefits" }, desc: { uk: "Пошук роботи, мовні курси, підтвердження освіти.", en: "Job search, language courses, recognition of education." }, checked: { uk: "05.2026", en: "05.2026" }, updated: false },
      { term: "Škola", title: { uk: "запис дитини до школи", en: "enrolling a child in school" }, desc: { uk: "Черги, документи, адаптаційні групи.", en: "Waiting lists, documents, adaptation classes." }, checked: { uk: "06.2026", en: "06.2026" }, updated: false },
      { term: "Zdravotní pojištění", title: { uk: "медичне страхування", en: "health insurance" }, desc: { uk: "Вибір страхової компанії, візити до лікаря.", en: "Choosing an insurer, doctor visits." }, checked: { uk: "04.2026", en: "04.2026" }, updated: false },
    ],
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
    guidesFirst: false,
    guides: [
      { term: "Homes for Ukraine", title: { uk: "продовження візової схеми", en: "visa scheme extension" }, desc: { uk: "Умови Ukraine Permission Extension Scheme.", en: "Terms of the Ukraine Permission Extension Scheme." }, checked: { uk: "06.2026", en: "06.2026" }, updated: true },
      { term: "Universal Credit", title: { uk: "виплати та підтримка доходу", en: "benefits and income support" }, desc: { uk: "Як подати заявку, строки розгляду.", en: "How to apply, processing times." }, checked: { uk: "05.2026", en: "05.2026" }, updated: false },
      { term: "NHS", title: { uk: "реєстрація у лікаря", en: "registering with a GP" }, desc: { uk: "Як знайти GP surgery поруч і записатися.", en: "How to find a nearby GP surgery and register." }, checked: { uk: "05.2026", en: "05.2026" }, updated: false },
      { term: "School admissions", title: { uk: "запис дитини до школи", en: "school enrollment" }, desc: { uk: "Через місцеву раду (local council), терміни подачі.", en: "Via the local council, application deadlines." }, checked: { uk: "06.2026", en: "06.2026" }, updated: false },
    ],
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
    guidesFirst: true,
    guides: [
      { term: "Protección temporal", title: { uk: "продовження статусу захисту", en: "protection status renewal" }, desc: { uk: "Терміни, документи, куди подавати.", en: "Deadlines, documents, where to apply." }, checked: { uk: "06.2026", en: "06.2026" }, updated: true },
      { term: "Empadronamiento", title: { uk: "реєстрація за місцем проживання", en: "municipal registration" }, desc: { uk: "Навіщо потрібна і як отримати в ayuntamiento.", en: "Why you need it and how to get it at the ayuntamiento." }, checked: { uk: "05.2026", en: "05.2026" }, updated: false },
      { term: "NIE", title: { uk: "ідентифікаційний номер іноземця", en: "foreigner ID number" }, desc: { uk: "Де оформити і навіщо він потрібен.", en: "Where to get it and why it's required." }, checked: { uk: "05.2026", en: "05.2026" }, updated: false },
      { term: "Tarjeta sanitaria", title: { uk: "медична картка", en: "health card" }, desc: { uk: "Запис до лікаря, невідкладна допомога.", en: "Booking a doctor, emergency care." }, checked: { uk: "04.2026", en: "04.2026" }, updated: false },
    ],
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
    guidesFirst: true,
    guides: [
      { term: "Protezione temporanea", title: { uk: "продовження статусу", en: "status renewal" }, desc: { uk: "Строки дії та порядок продовження.", en: "Validity period and renewal process." }, checked: { uk: "06.2026", en: "06.2026" }, updated: true },
      { term: "Permesso di soggiorno", title: { uk: "дозвіл на проживання", en: "residence permit" }, desc: { uk: "Де подати заявку і скільки чекати.", en: "Where to apply and how long it takes." }, checked: { uk: "05.2026", en: "05.2026" }, updated: false },
      { term: "Codice fiscale", title: { uk: "податковий код", en: "tax code" }, desc: { uk: "Навіщо потрібен і як отримати.", en: "What it's for and how to get one." }, checked: { uk: "05.2026", en: "05.2026" }, updated: false },
      { term: "SSN", title: { uk: "реєстрація в системі охорони здоров'я", en: "national health service registration" }, desc: { uk: "Вибір лікаря, безкоштовна допомога.", en: "Choosing a doctor, free care." }, checked: { uk: "04.2026", en: "04.2026" }, updated: false },
    ],
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
    guidesFirst: true,
    guides: [
      { term: "Tijdelijke bescherming", title: { uk: "тимчасовий захист", en: "temporary protection" }, desc: { uk: "Продовження статусу та строки.", en: "Status renewal and deadlines." }, checked: { uk: "06.2026", en: "06.2026" }, updated: true },
      { term: "BSN", title: { uk: "реєстраційний номер", en: "citizen service number" }, desc: { uk: "Де і як отримати, навіщо потрібен.", en: "Where and how to get it, why you need it." }, checked: { uk: "05.2026", en: "05.2026" }, updated: false },
      { term: "Huisvesting", title: { uk: "житло та переселення", en: "housing and relocation" }, desc: { uk: "Муніципальне житло, черги, права.", en: "Municipal housing, waiting lists, rights." }, checked: { uk: "05.2026", en: "05.2026" }, updated: false },
      { term: "Zorgverzekering", title: { uk: "медичне страхування", en: "health insurance" }, desc: { uk: "Обов'язкова страховка та як оформити.", en: "Mandatory insurance and how to arrange it." }, checked: { uk: "04.2026", en: "04.2026" }, updated: false },
    ],
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
  bridgeTitle: document.getElementById("bridgeTitle"),
  bridgeGrid: document.getElementById("bridgeGrid"),
  hubIntro: document.getElementById("hubIntro"),
  hubGuides: document.getElementById("hubGuides"),
  hubFeed: document.getElementById("hubFeed"),
  hubNewsTitle: document.getElementById("hubNewsTitle"),
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

function guideCard(g) {
  const updated = g.updated ? " guide--updated" : "";
  const badge = g.updated ? STRINGS[lang].updatedBadge : `${STRINGS[lang].checkedPrefix}: ${tx(g.checked)}`;
  return `
    <div class="guide${updated}" role="button" tabindex="0">
      <p class="guide__title"><code>${g.term}</code> — ${tx(g.title)}</p>
      <p class="guide__desc">${tx(g.desc)}</p>
      <div class="guide__meta"><span class="guide__badge">${badge}</span></div>
    </div>`;
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
  el.footerText.textContent = s.footer;
  el.tagline.textContent = s.tagline;
}

function render() {
  const hub = HUBS[country];

  renderChrome();

  // Шапка й таби
  el.countryLabel.textContent = tx(hub.label);
  el.hereHint.textContent = ` · ${tx(hub.hint)}`;
  renderCountryMenu();

  // Українська стрічка (спільна) + мостик у країновий хаб
  el.ukraineFeed.innerHTML = UKRAINE_NEWS.map(demoCard).join("");
  el.bridgeGrid.innerHTML = hub.bridge.map(bridgeItem).join("");

  // Країновий хаб: у деяких країнах довідник вище новин, в інших — навпаки
  el.hubIntro.textContent = tx(hub.intro);
  el.hubGuides.innerHTML = hub.guides.map(guideCard).join("");
  el.hubFeed.innerHTML = hub.news.map(demoCard).join("");

  const guidesBlock = el.hubGuides;
  const newsBlock = el.hubFeed;
  const parent = guidesBlock.parentNode;
  if (hub.guidesFirst) {
    parent.insertBefore(guidesBlock, el.hubNewsTitle);
  } else {
    parent.insertBefore(newsBlock, guidesBlock);
    parent.insertBefore(el.hubNewsTitle, newsBlock);
  }

  refreshRealPosts(country);
}

// Підвантажує реальні пости з WordPress і підміняє демо-картки, якщо для
// категорії вже є хоч один опублікований матеріал. Захист від «гонки» —
// застосовуємо результат, тільки якщо користувач не встиг перемкнути країну.
function refreshRealPosts(requestedCountry) {
  getRealPosts(CATEGORY_SLUGS.ua).then(posts => {
    if (posts.length) el.ukraineFeed.innerHTML = posts.map(realCard).join("");
  });

  const slug = CATEGORY_SLUGS[requestedCountry];
  getRealPosts(slug).then(posts => {
    if (country !== requestedCountry) return; // користувач вже перемкнув країну
    if (posts.length) el.hubFeed.innerHTML = posts.map(realCard).join("");
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
