/* ==========================================================
   Громада — логіка прототипу
   Дані демонстраційні; у бойовій версії їх віддає API/CMS.
   ========================================================== */

// ---------- Демо-дані ----------

const UKRAINE_NEWS = [
  { title: "Головна новина дня: великий заголовок, який видно одразу", tag: "Головне", time: "12 хв тому", major: true, emoji: "🇺🇦" },
  { title: "Кабмін ухвалив нову програму підтримки — що зміниться", tag: "Політика", time: "34 хв тому", emoji: "🏛️" },
  { title: "Енергетики попереджають про планові роботи у трьох областях", tag: "Суспільство", time: "1 год тому", emoji: "⚡" },
  { title: "Гривня та курс: короткий підсумок тижня", tag: "Економіка", time: "2 год тому", emoji: "📊" },
  { title: "Культурна подія тижня: фестиваль повертається до Львова", tag: "Культура", time: "3 год тому", emoji: "🎭" },
];

const HUBS = {
  de: {
    label: "Німеччина",
    hint: "DE",
    intro: "Життя в Німеччині: документи, Jobcenter, школи — покроково і з датами перевірки.",
    guidesFirst: true, // німецький хаб — довідник-first
    guides: [
      { term: "Anmeldung", title: "реєстрація за місцем проживання", desc: "Куди йти, які документи, скільки чекати термін.", checked: "06.2026", updated: true },
      { term: "§24", title: "статус тимчасового захисту і що далі", desc: "Продовження, перехід на інші типи дозволів.", checked: "06.2026", updated: false },
      { term: "Jobcenter", title: "виплати та пошук роботи", desc: "Bürgergeld, курси мови, визнання дипломів.", checked: "05.2026", updated: false },
      { term: "Kita і школа", title: "як записати дитину", desc: "Черги, документи, мовна підтримка для дітей.", checked: "06.2026", updated: false },
      { term: "Krankenkasse", title: "медичне страхування", desc: "Вибір каси, запис до лікаря, невідкладна допомога.", checked: "04.2026", updated: false },
    ],
    news: [
      { title: "Берлін розширює програму мовних курсів для дорослих", tag: "Німеччина", time: "сьогодні", emoji: "🇩🇪" },
      { title: "Що зміниться у правилах оренди житла з липня", tag: "Житло", time: "вчора", emoji: "🏠" },
    ],
    bridge: [
      { icon: "📄", title: "Документи", note: "перевірено: 06.2026" },
      { icon: "💼", title: "Робота", note: "Jobcenter, дипломи" },
      { icon: "🏫", title: "Школи й діти", note: "запис, мова" },
      { icon: "📅", title: "Події поруч", note: "афіша громади" },
    ],
  },

  pl: {
    label: "Польща",
    hint: "PL",
    intro: "Життя в Польщі: новини громади, робота та все про поїздки додому.",
    guidesFirst: false, // польський хаб — новини та сервіси-first
    guides: [
      { term: "PESEL UKR", title: "статус і що він дає", desc: "Продовження спецзакону, права, виплати.", checked: "06.2026", updated: true },
      { term: "Поїздка в Україну", title: "кордон зараз", desc: "Черги на переходах, перевізники, що можна везти.", checked: "цього тижня", updated: false },
      { term: "Робота", title: "легальне працевлаштування", desc: "Umowa o pracę чи zlecenie: різниця і пастки.", checked: "05.2026", updated: false },
      { term: "Школа", title: "запис дитини та іспити", desc: "Обов'язковість навчання, українські класи.", checked: "06.2026", updated: false },
    ],
    news: [
      { title: "На переході Медика — Шегині відновили рух: деталі", tag: "Кордон", time: "2 год тому", emoji: "🚌" },
      { title: "Варшава: ярмарок вакансій для українців цієї суботи", tag: "Робота", time: "сьогодні", emoji: "💼" },
      { title: "Сейм розглядає зміни до спецзакону — що відомо", tag: "Польща", time: "вчора", emoji: "🏛️" },
    ],
    bridge: [
      { icon: "🚌", title: "Поїздка додому", note: "кордон, перевізники" },
      { icon: "💼", title: "Робота", note: "вакансії, договори" },
      { icon: "📄", title: "PESEL UKR", note: "перевірено: 06.2026" },
      { icon: "📅", title: "Події поруч", note: "афіша громади" },
    ],
  },

  eu: {
    label: "Інша країна ЄС",
    hint: "ЄС",
    intro: "Загальне для всіх у ЄС: тимчасовий захист, банки, консульства, поїздки додому.",
    guidesFirst: true,
    guides: [
      { term: "Тимчасовий захист", title: "права в усіх країнах ЄС", desc: "Що гарантує директива і до якої дати.", checked: "06.2026", updated: false },
      { term: "Банки й перекази", title: "рахунки та гроші в Україну", desc: "Відкриття рахунку, комісії, ліміти.", checked: "05.2026", updated: false },
      { term: "Консульства", title: "документи за кордоном", desc: "Паспорти, довіреності, записи в чергу.", checked: "06.2026", updated: false },
      { term: "Переїзд між країнами", title: "зміна країни захисту", desc: "Чи можна і як переоформити статус.", checked: "04.2026", updated: false },
    ],
    news: [
      { title: "Рада ЄС обговорює продовження тимчасового захисту", tag: "Європа", time: "сьогодні", emoji: "🇪🇺" },
    ],
    bridge: [
      { icon: "🛡️", title: "Тимчасовий захист", note: "права в ЄС" },
      { icon: "🏦", title: "Банки", note: "рахунки, перекази" },
      { icon: "🛂", title: "Консульства", note: "документи" },
      { icon: "🚌", title: "Поїздка додому", note: "маршрути" },
    ],
  },
};

// ---------- Стан ----------

let country = localStorage.getItem("hromada.country") || "de";
let activeTab = "ukraine";

// ---------- Елементи ----------

const el = {
  countryBtn: document.getElementById("countryBtn"),
  countryLabel: document.getElementById("countryLabel"),
  countryMenu: document.getElementById("countryMenu"),
  themeBtn: document.getElementById("themeBtn"),
  hereHint: document.getElementById("hereHint"),
  tabs: document.querySelectorAll(".tab"),
  viewUkraine: document.getElementById("view-ukraine"),
  viewHere: document.getElementById("view-here"),
  ukraineFeed: document.getElementById("ukraineFeed"),
  bridgeGrid: document.getElementById("bridgeGrid"),
  hubIntro: document.getElementById("hubIntro"),
  hubGuides: document.getElementById("hubGuides"),
  hubFeed: document.getElementById("hubFeed"),
  hubNewsTitle: document.getElementById("hubNewsTitle"),
};

// ---------- Рендер ----------

function newsCard(item) {
  const major = item.major ? " card--major" : "";
  return `
    <a href="#" class="card${major}">
      <div class="card__img" aria-hidden="true">${item.emoji}</div>
      <div>
        <p class="card__title">${item.title}</p>
        <p class="card__meta"><span class="card__tag">${item.tag}</span> · ${item.time}</p>
      </div>
    </a>`;
}

function guideCard(g) {
  const updated = g.updated ? " guide--updated" : "";
  const badge = g.updated ? "правила змінились" : `перевірено: ${g.checked}`;
  return `
    <div class="guide${updated}" role="button" tabindex="0">
      <p class="guide__title"><code>${g.term}</code> — ${g.title}</p>
      <p class="guide__desc">${g.desc}</p>
      <div class="guide__meta"><span class="guide__badge">${badge}</span></div>
    </div>`;
}

function bridgeItem(b) {
  return `
    <button class="bridge__item" type="button">
      <strong>${b.icon} ${b.title}</strong>
      <span>${b.note}</span>
    </button>`;
}

function render() {
  const hub = HUBS[country];

  // Шапка й таби
  el.countryLabel.textContent = hub.label;
  el.hereHint.textContent = ` · ${hub.hint}`;
  el.countryMenu.querySelectorAll("li").forEach(li => {
    li.setAttribute("aria-selected", li.dataset.country === country ? "true" : "false");
  });

  // Українська стрічка (спільна) + мостик у країновий хаб
  el.ukraineFeed.innerHTML = UKRAINE_NEWS.map(newsCard).join("");
  el.bridgeGrid.innerHTML = hub.bridge.map(bridgeItem).join("");

  // Країновий хаб: у Німеччині довідник вище новин, у Польщі — навпаки
  el.hubIntro.textContent = hub.intro;
  el.hubGuides.innerHTML = hub.guides.map(guideCard).join("");
  el.hubFeed.innerHTML = hub.news.map(newsCard).join("");

  const guidesBlock = el.hubGuides;
  const newsBlock = el.hubFeed;
  const parent = guidesBlock.parentNode;
  if (hub.guidesFirst) {
    parent.insertBefore(guidesBlock, el.hubNewsTitle);
  } else {
    parent.insertBefore(newsBlock, guidesBlock);
    parent.insertBefore(el.hubNewsTitle, newsBlock);
  }
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

// ---------- Старт ----------

render();
