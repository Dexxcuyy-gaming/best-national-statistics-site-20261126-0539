/* DataNusa data file: every figure on the site, each with its source and year.
   All figures were checked against Statistics Indonesia (BPS) releases and
   World Bank World Development Indicators before this file was written. */

const DATA = {
  meta: {
    country: "Indonesia",
    updated: "26 November 2026",
    sources: [
      { short: "BPS", full: "Statistics Indonesia (Badan Pusat Statistik)" },
      { short: "World Bank", full: "World Bank, World Development Indicators" },
      { short: "UN WPP", full: "United Nations, World Population Prospects 2024" },
    ],
  },

  /* Headline indicators shown on the Overview page. */
  kpis: [
    { label: "Population", value: "283.5M", note: "2024 · World Bank", page: "#/people" },
    { label: "GDP", value: "US$1.396T", note: "2024 · World Bank", page: "#/economy" },
    { label: "GDP growth", value: "5.03%", note: "2024 · BPS", page: "#/economy" },
    { label: "Inflation", value: "1.57%", note: "Dec 2024, y-o-y · BPS", page: "#/prices" },
    { label: "Unemployment", value: "4.91%", note: "Aug 2024 · BPS", page: "#/labour" },
    { label: "Poverty rate", value: "8.57%", note: "Sep 2024 · BPS", page: "#/people" },
    { label: "Human Development Index", value: "75.02", note: "2024 · BPS", page: "#/people" },
    { label: "Life expectancy", value: "74.15 yrs", note: "2024 · BPS", page: "#/people" },
  ],

  /* Real GDP growth, percent per year (BPS). */
  gdpGrowth: {
    title: "Real GDP growth",
    unit: "% per year",
    source: "BPS",
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.70, 5.31, 5.05, 5.03],
  },

  /* Nominal GDP (BPS, current prices). */
  gdpLevel: {
    title: "Nominal GDP",
    unit: "Rp trillion",
    source: "BPS",
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [11526.3, 12401.7, 13588.8, 14838.3, 15832.0, 15443.4, 16976.7, 19588.4, 20943.9, 22139.0],
  },

  /* GDP by expenditure, share of nominal GDP, full year 2024 (BPS).
     The five items below sum to about 96.4%; non-profit institutions
     serving households and changes in inventories make up the rest. */
  gdpExpenditure: {
    title: "What GDP is spent on",
    source: "BPS, full year 2024",
    rows: [
      { component: "Household consumption", share: 54.04 },
      { component: "Investment (gross fixed capital formation)", share: 29.15 },
      { component: "Exports of goods and services", share: 22.18 },
      { component: "Government consumption", share: 7.73 },
      { component: "Imports of goods and services", share: -20.39 },
    ],
    remainderNote: "Non-profit institutions serving households and changes in inventories make up the remaining ~3.6%. Shares are rounded; they do not sum to exactly 100%.",
  },

  trade: {
    exportsGoods: 264.70,
    importsGoods: 233.66,
    surplusGoods: 31.04,
    source: "BPS, 2024 (goods trade, US$ billion)",
    note: "Goods exports reached US$264.70 billion in 2024 against imports of US$233.66 billion, a goods surplus of US$31.04 billion. Including services, exports were about US$300.9 billion and imports about US$279.4 billion.",
  },

  /* Population at census and World Bank estimate years. */
  population: {
    title: "Population",
    unit: "million people",
    years: [2010, 2015, 2020, 2024],
    values: [237.6, 258.4, 270.2, 283.5],
    labels: ["2010 Census (BPS)", "2015 (World Bank)", "2020 Census (BPS)", "2024 (World Bank)"],
    source: "BPS censuses and World Bank, 2010–2024",
  },

  ageStructure: {
    title: "Age structure, 2024",
    source: "UN World Population Prospects 2024",
    groups: [
      { group: "Children, 0–14 years", share: 24.6 },
      { group: "Working age, 15–64 years", share: 68.1 },
      { group: "Older people, 65+ years", share: 7.3 },
    ],
    medianAge: 30.1,
    fertility: 2.1,
    urbanShare: 59.0,
  },

  development: {
    hdi: [
      { year: 2023, value: 74.39 },
      { year: 2024, value: 75.02 },
    ],
    lifeExpectancy: 74.15,
    expectedSchooling: 13.21,
    meanSchooling: 8.85,
    povertySep2024: 8.57,
    source: "BPS, 2024",
  },

  /* Consumer price inflation, December year-on-year (BPS). */
  inflation: {
    title: "Consumer price inflation",
    unit: "% (December, year-on-year)",
    source: "BPS",
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57],
  },

  /* Open unemployment rate (TPT), August survey each year (BPS). */
  unemployment: {
    title: "Open unemployment rate (TPT)",
    unit: "% of the labour force (August)",
    source: "BPS (Sakernas)",
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    values: [6.18, 5.61, 5.50, 5.34, 5.28, 7.07, 6.49, 5.86, 5.32, 4.91],
  },

  labour: {
    labourForce: 147.1,
    labourForceNote: "million people, 2024 · BPS",
    participationNote: "About 7.2 million people were openly unemployed in August 2024, the lowest rate since the series began in its current form.",
    source: "BPS, 2024",
  },

  /* Ten largest provinces by population, BPS mid-year estimates, 2025. */
  provinces: {
    title: "Largest provinces by population",
    source: "BPS, mid-year estimates 2025",
    total: 284.44,
    rows: [
      { province: "West Java", capital: "Bandung", population: 50759000, share: 17.8 },
      { province: "East Java", capital: "Surabaya", population: 42089300, share: 14.8 },
      { province: "Central Java", capital: "Semarang", population: 38233900, share: 13.4 },
      { province: "North Sumatra", capital: "Medan", population: 15785800, share: 5.5 },
      { province: "Banten", capital: "Serang", population: 12537400, share: 4.4 },
      { province: "Jakarta", capital: "Jakarta", population: 10678000, share: 3.8 },
      { province: "South Sulawesi", capital: "Makassar", population: 9563130, share: 3.4 },
      { province: "Lampung", capital: "Bandar Lampung", population: 9522900, share: 3.3 },
      { province: "South Sumatra", capital: "Palembang", population: 8928500, share: 3.1 },
      { province: "Riau", capital: "Pekanbaru", population: 6811200, share: 2.4 },
    ],
  },
};

/* One flat table of every figure, used by the Sources page and the CSV download. */
function allFigures() {
  const out = [];
  DATA.kpis.forEach((k) => out.push({ indicator: k.label, value: k.value, year: 2024, source: k.note }));
  DATA.gdpGrowth.years.forEach((y, i) =>
    out.push({ indicator: "Real GDP growth (%)", value: DATA.gdpGrowth.values[i].toFixed(2), year: y, source: "BPS" }));
  DATA.gdpLevel.years.forEach((y, i) =>
    out.push({ indicator: "Nominal GDP (Rp trillion)", value: DATA.gdpLevel.values[i].toFixed(1), year: y, source: "BPS" }));
  DATA.gdpExpenditure.rows.forEach((r) =>
    out.push({ indicator: "GDP by expenditure — " + r.component + " (% of GDP)", value: r.share.toFixed(2), year: 2024, source: "BPS" }));
  DATA.inflation.years.forEach((y, i) =>
    out.push({ indicator: "Inflation, December y-o-y (%)", value: DATA.inflation.values[i].toFixed(2), year: y, source: "BPS" }));
  DATA.unemployment.years.forEach((y, i) =>
    out.push({ indicator: "Open unemployment rate, August (%)", value: DATA.unemployment.values[i].toFixed(2), year: y, source: "BPS (Sakernas)" }));
  DATA.provinces.rows.forEach((r) =>
    out.push({ indicator: "Population — " + r.province, value: String(r.population), year: 2025, source: "BPS, mid-year estimate" }));
  out.push({ indicator: "Population (million)", value: "283.5", year: 2024, source: "World Bank" });
  out.push({ indicator: "GDP (US$ trillion)", value: "1.396", year: 2024, source: "World Bank" });
  out.push({ indicator: "GDP per capita (US$)", value: "4960.3", year: 2024, source: "BPS" });
  out.push({ indicator: "Human Development Index", value: "75.02", year: 2024, source: "BPS" });
  out.push({ indicator: "Life expectancy (years)", value: "74.15", year: 2024, source: "BPS" });
  out.push({ indicator: "Expected years of schooling", value: "13.21", year: 2024, source: "BPS" });
  out.push({ indicator: "Mean years of schooling", value: "8.85", year: 2024, source: "BPS" });
  out.push({ indicator: "Poverty rate, September (%)", value: "8.57", year: 2024, source: "BPS" });
  out.push({ indicator: "Labour force (million)", value: "147.1", year: 2024, source: "BPS" });
  out.push({ indicator: "Urban population (%)", value: "59.0", year: 2024, source: "UN WPP 2024" });
  out.push({ indicator: "Median age (years)", value: "30.1", year: 2024, source: "UN WPP 2024" });
  out.push({ indicator: "Fertility rate (children per woman)", value: "2.1", year: 2024, source: "UN WPP 2024" });
  return out;
}
