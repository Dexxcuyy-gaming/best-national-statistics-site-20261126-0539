/* DataNusa views: hash router and one renderer per page.
   Every page is built from DATA (data.js) and drawn with charts.js. */

const NAV = [
  { hash: "#/", label: "Overview" },
  { hash: "#/economy", label: "Economy" },
  { hash: "#/people", label: "People" },
  { hash: "#/prices", label: "Prices" },
  { hash: "#/labour", label: "Labour" },
  { hash: "#/provinces", label: "Provinces" },
  { hash: "#/sources", label: "Sources & data" },
];

const TITLES = {
  "": "DataNusa — Indonesia in Numbers",
  economy: "Economy — DataNusa",
  people: "People — DataNusa",
  prices: "Prices — DataNusa",
  labour: "Labour — DataNusa",
  provinces: "Provinces — DataNusa",
  sources: "Sources & data — DataNusa",
};

/* Page state that survives re-renders within a session. */
const state = {
  economyChart: "bar",
  pricesRange: "all",
  provinceSort: { key: "population", dir: -1 },
  provinceQuery: "",
};

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function sourceNote(text) {
  return `<p class="source-note"><strong>Source:</strong> ${esc(text)}</p>`;
}

function kpiCards() {
  return `<div class="kpi-grid">` + DATA.kpis.map((k) =>
    `<a class="kpi" href="${k.page}"><div class="kpi-label">${esc(k.label)}</div>` +
    `<div class="kpi-value">${esc(k.value)}</div><div class="kpi-source">${esc(k.note)}</div></a>`
  ).join("") + `</div>`;
}

function renderOverview() {
  const g = DATA.gdpGrowth;
  return `<h1>Indonesia in Numbers</h1>
  <p class="lede">The headline statistics for Indonesia — population, economy, prices, work and
  where people live — each figure with its source and year. Updated ${esc(DATA.meta.updated)}.</p>
  ${kpiCards()}
  <div class="card chart-box"><h2>Real GDP growth, 2015–2024</h2>
    ${barChart(g, { height: 210 })}
    ${sourceNote("BPS, real GDP growth, % per year. Growth was negative only in 2020, the first pandemic year.")}
  </div>
  <div class="glance">
    <div class="glance-item"><h3>Biggest economy in Southeast Asia</h3>
      <p>GDP of US$1.396 trillion in 2024 (World Bank), about Rp22,139 trillion (BPS).</p></div>
    <div class="glance-item"><h3>A young, urbanising country</h3>
      <p>Median age 30.1 years; 59.0% of people live in towns and cities (UN WPP, 2024).</p></div>
    <div class="glance-item"><h3>Steady prices in 2024</h3>
      <p>Inflation ended 2024 at 1.57% year-on-year (BPS), the lowest December reading in the decade.</p></div>
  </div>
  <h2>Explore the numbers</h2>
  <div class="quick-links">
    <a href="#/economy">Economy →</a><a href="#/people">People →</a><a href="#/prices">Prices →</a>
    <a href="#/labour">Labour →</a><a href="#/provinces">Provinces →</a><a href="#/sources">Download the data →</a>
  </div>`;
}

function renderEconomy() {
  const g = DATA.gdpGrowth;
  const lvl = DATA.gdpLevel;
  const exp = DATA.gdpExpenditure;
  const chart = state.economyChart === "line" ? lineChart(g) : barChart(g);
  const shortRows = exp.rows.map((r) => ({
    label: r.component.replace(" (gross fixed capital formation)", " (GFCF)").replace(" of goods and services", ""),
    share: r.share,
  }));
  return `<h1>Economy</h1>
  <p class="lede">Indonesia's economy grew 5.03% in 2024 to Rp22,139.0 trillion (US$1.396 trillion).
  Growth has stayed close to 5% a year for a decade, apart from the 2020 pandemic contraction.</p>
  <div class="stat-row">
    <div class="stat"><div class="stat-value">US$1.396T</div><div class="stat-label">GDP, 2024 · World Bank</div></div>
    <div class="stat"><div class="stat-value">Rp22,139.0T</div><div class="stat-label">GDP, 2024 · BPS</div></div>
    <div class="stat"><div class="stat-value">US$4,960.3</div><div class="stat-label">GDP per capita, 2024 · BPS</div></div>
    <div class="stat"><div class="stat-value">5.03%</div><div class="stat-label">Real GDP growth, 2024 · BPS</div></div>
  </div>
  <div class="card chart-box"><h2>Real GDP growth, 2015–2024</h2>
    <div class="controls" role="group" aria-label="Chart type">
      <button class="btn${state.economyChart === "bar" ? " active" : ""}" data-chart="bar">Bars</button>
      <button class="btn${state.economyChart === "line" ? " active" : ""}" data-chart="line">Line</button>
    </div>
    ${chart}
    ${sourceNote("BPS, % per year.")}
  </div>
  <div class="card chart-box"><h2>Nominal GDP, 2015–2024</h2>
    ${barChart(lvl)}
    ${sourceNote("BPS, Rp trillion at current prices. Nominal GDP roughly doubled in nine years.")}
  </div>
  <div class="card chart-box"><h2>What GDP is spent on — 2024</h2>
    ${shareBars(shortRows, "share", "label")}
    <p>${esc(exp.remainderNote)}</p>
    ${sourceNote("BPS, share of nominal GDP, full year 2024. Household consumption is more than half of the economy; investment is the second-largest part.")}
  </div>
  <div class="card"><h2>Trade in 2024</h2>
    <p>Goods exports reached <strong>US$${DATA.trade.exportsGoods.toFixed(2)} billion</strong> in 2024 against
    imports of <strong>US$${DATA.trade.importsGoods.toFixed(2)} billion</strong>, a goods surplus of
    <strong>US$${DATA.trade.surplusGoods.toFixed(2)} billion</strong>. ${esc(DATA.trade.note)}</p>
    ${sourceNote(DATA.trade.source)}
  </div>`;
}

function renderPeople() {
  const p = DATA.population;
  const a = DATA.ageStructure;
  const d = DATA.development;
  return `<h1>People</h1>
  <p class="lede">Indonesia is the world's fourth most populous country: 283.5 million people in 2024,
  growing about 0.8% a year, with a median age of 30.1 years.</p>
  <div class="stat-row">
    <div class="stat"><div class="stat-value">283.5M</div><div class="stat-label">Population, 2024 · World Bank</div></div>
    <div class="stat"><div class="stat-value">30.1 yrs</div><div class="stat-label">Median age, 2024 · UN WPP</div></div>
    <div class="stat"><div class="stat-value">59.0%</div><div class="stat-label">Urban population, 2024 · UN WPP</div></div>
    <div class="stat"><div class="stat-value">2.1</div><div class="stat-label">Fertility rate, 2024 · UN WPP</div></div>
  </div>
  <div class="card chart-box"><h2>Population, 2010–2024</h2>
    ${barChart({ title: p.title, years: p.years, values: p.values })}
    <p>${p.labels.join(" · ")}.</p>
    ${sourceNote(p.source)}
  </div>
  <div class="card chart-box"><h2>Age structure, 2024</h2>
    ${shareBars(a.groups.map((g) => ({ label: g.group, share: g.share })), "share", "label")}
    ${sourceNote(a.source + ". About two in three Indonesians are of working age (15–64), a demographic dividend that lasts while the share stays high.")}
  </div>
  <div class="card"><h2>Human development</h2>
    <div class="stat-row">
      <div class="stat"><div class="stat-value">${d.hdi[1].value.toFixed(2)}</div><div class="stat-label">Human Development Index, 2024 · BPS (2023: ${d.hdi[0].value.toFixed(2)})</div></div>
      <div class="stat"><div class="stat-value">${d.lifeExpectancy.toFixed(2)} yrs</div><div class="stat-label">Life expectancy at birth, 2024 · BPS</div></div>
      <div class="stat"><div class="stat-value">${d.expectedSchooling.toFixed(2)} yrs</div><div class="stat-label">Expected years of schooling, 2024 · BPS</div></div>
      <div class="stat"><div class="stat-value">${d.meanSchooling.toFixed(2)} yrs</div><div class="stat-label">Mean years of schooling, 2024 · BPS</div></div>
    </div>
    <p><strong>Poverty:</strong> ${d.povertySep2024.toFixed(2)}% of people lived below the poverty line in
    September 2024 (BPS) — about 24.1 million people.</p>
    ${sourceNote(d.source)}
  </div>`;
}

function inflationSlice() {
  const inf = DATA.inflation;
  if (state.pricesRange === "early") return { years: inf.years.slice(0, 5), values: inf.values.slice(0, 5) };
  if (state.pricesRange === "late") return { years: inf.years.slice(5), values: inf.values.slice(5) };
  return { years: inf.years, values: inf.values };
}

function renderPrices() {
  const inf = DATA.inflation;
  const s = inflationSlice();
  const rangeBtn = (key, label) =>
    `<button class="btn${state.pricesRange === key ? " active" : ""}" data-range="${key}">${label}</button>`;
  return `<h1>Prices</h1>
  <p class="lede">Consumer price inflation ended 2024 at 1.57% year-on-year (BPS) — the lowest December
  reading of the decade. The spike to 5.51% in 2022 followed the global energy shock.</p>
  <div class="stat-row">
    <div class="stat"><div class="stat-value">1.57%</div><div class="stat-label">Inflation, Dec 2024 y-o-y · BPS</div></div>
    <div class="stat"><div class="stat-value">5.51%</div><div class="stat-label">Peak of the decade, Dec 2022 · BPS</div></div>
    <div class="stat"><div class="stat-value">2.70%</div><div class="stat-label">Average, 2020–2024 · BPS</div></div>
  </div>
  <div class="card chart-box"><h2>Consumer price inflation, December year-on-year</h2>
    <div class="controls" role="group" aria-label="Year range">
      <span><label>Show years:</label></span>
      ${rangeBtn("all", "2015–2024")}${rangeBtn("early", "2015–2019")}${rangeBtn("late", "2020–2024")}
    </div>
    ${barChart({ title: inf.title, years: s.years, values: s.values })}
    ${sourceNote("BPS, December year-on-year CPI inflation, %.")}
  </div>
  <div class="card"><h2>How to read it</h2>
    <p>Each bar is the change in consumer prices in December compared with the December before it.
    Inflation above 5% in 2015 reflected the fuel-subsidy reform; the 2022 jump followed higher global
    energy and food prices; by 2024 it had fallen back inside Bank Indonesia's 1.5%–3.5% target range.</p>
  </div>`;
}

function renderLabour() {
  const u = DATA.unemployment;
  const l = DATA.labour;
  return `<h1>Labour</h1>
  <p class="lede">Open unemployment fell to 4.91% in August 2024 (BPS), its lowest in the decade.
  The pandemic pushed it to 7.07% in 2020; it has fallen every year since.</p>
  <div class="stat-row">
    <div class="stat"><div class="stat-value">${l.labourForce.toFixed(1)}M</div><div class="stat-label">Labour force, 2024 · BPS</div></div>
    <div class="stat"><div class="stat-value">4.91%</div><div class="stat-label">Open unemployment, Aug 2024 · BPS</div></div>
    <div class="stat"><div class="stat-value">−2.16 pts</div><div class="stat-label">Fall from the 2020 peak (7.07%) · BPS</div></div>
  </div>
  <div class="card chart-box"><h2>Open unemployment rate, August each year</h2>
    ${lineChart(u)}
    ${sourceNote("BPS (Sakernas), % of the labour force, August survey.")}
  </div>
  <div class="card"><h2>What the numbers mean</h2>
    <p>${esc(l.participationNote)}</p>
    <p>The open unemployment rate (TPT) counts people without work who are looking for it, as a share of
    the labour force — everyone working or looking for work. It does not count underemployment or informal
    work, which remain large in Indonesia.</p>
    ${sourceNote(l.source)}
  </div>`;
}

function provinceRows() {
  let rows = DATA.provinces.rows.slice();
  const q = state.provinceQuery.trim().toLowerCase();
  if (q) rows = rows.filter((r) => r.province.toLowerCase().includes(q) || r.capital.toLowerCase().includes(q));
  const { key, dir } = state.provinceSort;
  rows.sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (typeof av === "number") return (av - bv) * dir;
    return String(av).localeCompare(String(bv)) * dir;
  });
  return rows;
}

function renderProvinces() {
  const rows = provinceRows();
  const maxPop = Math.max(...DATA.provinces.rows.map((r) => r.population));
  const arrow = (key) => state.provinceSort.key === key ? (state.provinceSort.dir === 1 ? " ▲" : " ▼") : "";
  const th = (key, label, cls) =>
    `<th class="${cls || ""}"><button data-sort="${key}">${label}${arrow(key)}</button></th>`;
  const body = rows.map((r) =>
    `<tr><td>${esc(r.province)}</td><td>${esc(r.capital)}</td>` +
    `<td class="num">${r.population.toLocaleString("en-US")}</td>` +
    `<td class="num">${r.share.toFixed(1)}%</td>` +
    `<td class="bar-cell"><span class="mini-bar" style="width:${(r.population / maxPop * 100).toFixed(1)}%"></span></td></tr>`
  ).join("");
  return `<h1>Provinces</h1>
  <p class="lede">The ten largest of Indonesia's 38 provinces hold about 72% of the country's people.
  West Java alone has 50.8 million residents — more than most countries in Europe.</p>
  <div class="card">
    <div class="controls">
      <label for="prov-search">Search provinces:</label>
      <input type="search" id="prov-search" placeholder="Type a province or capital…" value="${esc(state.provinceQuery)}">
    </div>
    <table class="data-table">
      <thead><tr>${th("province", "Province")}${th("capital", "Capital")}${th("population", "Population", "num")}${th("share", "Share", "num")}<th class="bar-cell">Share of largest</th></tr></thead>
      <tbody>${body || `<tr><td colspan="5">No province matches “${esc(state.provinceQuery)}”. Try another search.</td></tr>`}</tbody>
    </table>
    <p>Showing ${rows.length} of 10 provinces. Click a column heading to sort.</p>
    ${sourceNote(DATA.provinces.source + ". National total mid-2025: " + DATA.provinces.total.toFixed(2) + " million people. Shares are of the national total.")}
  </div>`;
}

function renderSources() {
  const figs = allFigures();
  const rows = figs.map((f) =>
    `<tr><td>${esc(f.indicator)}</td><td class="num">${esc(f.value)}</td><td class="num">${f.year}</td><td>${esc(f.source)}</td></tr>`
  ).join("");
  return `<h1>Sources &amp; data</h1>
  <p class="lede">Every figure on this site, with its source and year — and the whole dataset as a
  downloadable CSV file, built in your browser from the same numbers the pages show.</p>
  <div class="card">
    <h2>Download the data</h2>
    <p>Get all ${figs.length} figures in one CSV file. The file is generated on this page from the
    site's own data — nothing is fetched from the internet.</p>
    <button class="btn primary" id="csv-download">Download all figures (CSV)</button>
    <p id="csv-status" class="source-note" role="status"></p>
  </div>
  <div class="card">
    <h2>Sources</h2>
    <ul>
      <li><strong>BPS — Statistics Indonesia (Badan Pusat Statistik):</strong> GDP, GDP growth, inflation,
      unemployment, poverty, Human Development Index, schooling, life expectancy and provincial populations.</li>
      <li><strong>World Bank, World Development Indicators:</strong> population, GDP in US dollars, inflation (annual average).</li>
      <li><strong>United Nations, World Population Prospects 2024:</strong> age structure, median age, fertility, urban share.</li>
    </ul>
    <h2>Methods</h2>
    <p>Inflation is the December year-on-year change in the consumer price index, as BPS publishes it.
    Unemployment is the open unemployment rate (TPT) from the August National Labour Force Survey
    (Sakernas). Provincial populations are BPS mid-year estimates for 2025. GDP by expenditure shares are
    full-year 2024 shares of nominal GDP; they are rounded, so the five items shown sum to about 96.4%
    and non-profit institutions plus inventory changes make up the rest. Figures are shown as published;
    where a source later revises a figure, this site keeps the value as published at the time of writing.</p>
  </div>
  <div class="card">
    <h2>All figures</h2>
    <table class="data-table">
      <thead><tr><th>Indicator</th><th class="num">Value</th><th class="num">Year</th><th>Source</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    ${sourceNote("Compiled 26 November 2026 from the sources above.")}
  </div>`;
}

const RENDERERS = {
  "": renderOverview,
  economy: renderEconomy,
  people: renderPeople,
  prices: renderPrices,
  labour: renderLabour,
  provinces: renderProvinces,
  sources: renderSources,
};

function currentRoute() {
  const hash = window.location.hash || "#/";
  const route = hash.replace(/^#\/?/, "").split("?")[0];
  return RENDERERS[route] ? route : "";
}

function render() {
  const route = currentRoute();
  const app = document.getElementById("app");
  app.innerHTML = RENDERERS[route]();
  document.title = TITLES[route];
  document.querySelectorAll(".main-nav a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#/" + route);
  });
  window.scrollTo(0, 0);
}

function downloadCsv() {
  const figs = allFigures();
  const escCsv = (v) => /[",\n]/.test(String(v)) ? '"' + String(v).replace(/"/g, '""') + '"' : String(v);
  const lines = ["Indicator,Value,Year,Source"].concat(
    figs.map((f) => [f.indicator, f.value, f.year, f.source].map(escCsv).join(","))
  );
  const blob = new Blob([lines.join("\n") + "\n"], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "datanusa-indonesia-figures.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  const status = document.getElementById("csv-status");
  if (status) status.textContent = "Downloaded datanusa-indonesia-figures.csv — " + figs.length + " figures.";
}

/* Delegated clicks: chart toggles, range buttons, table sorting, CSV download. */
document.addEventListener("click", (event) => {
  const chartBtn = event.target.closest("[data-chart]");
  if (chartBtn) {
    state.economyChart = chartBtn.getAttribute("data-chart");
    render();
    return;
  }
  const rangeBtn = event.target.closest("[data-range]");
  if (rangeBtn) {
    state.pricesRange = rangeBtn.getAttribute("data-range");
    render();
    return;
  }
  const sortBtn = event.target.closest("[data-sort]");
  if (sortBtn) {
    const key = sortBtn.getAttribute("data-sort");
    if (state.provinceSort.key === key) state.provinceSort.dir *= -1;
    else state.provinceSort = { key, dir: key === "population" || key === "share" ? -1 : 1 };
    render();
    return;
  }
  if (event.target.closest("#csv-download")) downloadCsv();
});

/* Delegated input: province search, live filtering without losing focus. */
document.addEventListener("input", (event) => {
  if (event.target.id === "prov-search") {
    state.provinceQuery = event.target.value;
    const app = document.getElementById("app");
    const pos = event.target.selectionStart;
    const rows = provinceRows();
    const maxPop = Math.max(...DATA.provinces.rows.map((r) => r.population));
    const tbody = app.querySelector("tbody");
    if (tbody) {
      tbody.innerHTML = rows.map((r) =>
        `<tr><td>${esc(r.province)}</td><td>${esc(r.capital)}</td>` +
        `<td class="num">${r.population.toLocaleString("en-US")}</td>` +
        `<td class="num">${r.share.toFixed(1)}%</td>` +
        `<td class="bar-cell"><span class="mini-bar" style="width:${(r.population / maxPop * 100).toFixed(1)}%"></span></td></tr>`
      ).join("") || `<tr><td colspan="5">No province matches “${esc(state.provinceQuery)}”. Try another search.</td></tr>`;
      const note = app.querySelector(".card p");
      if (note) note.textContent = `Showing ${rows.length} of 10 provinces. Click a column heading to sort.`;
    }
    const input = document.getElementById("prov-search");
    if (input && pos !== null) input.setSelectionRange(pos, pos);
  }
});

window.addEventListener("hashchange", render);
