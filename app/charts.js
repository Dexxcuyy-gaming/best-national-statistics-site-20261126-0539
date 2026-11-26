/* DataNusa chart builders: hand-rolled SVG bar and line charts.
   No library, no network — every chart is drawn from the numbers in data.js. */

const CHART = {
  width: 760,
  height: 300,
  padLeft: 52,
  padRight: 16,
  padTop: 18,
  padBottom: 34,
  navy: "#102A5C",
  red: "#D8232A",
  amber: "#F5A623",
  teal: "#0E7C7B",
  grid: "#D8DEE9",
  axis: "#5A6478",
};

function fmt(n, decimals) {
  return Number(n).toFixed(decimals === undefined ? 2 : decimals);
}

function niceMax(max) {
  const steps = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000];
  for (const s of steps) if (max <= s) return s;
  return Math.ceil(max / 10000) * 10000;
}

function chartFrame(years, values, unit, height) {
  const min = Math.min(0, ...values);
  const max = niceMax(Math.max(...values) * 1.12);
  const w = CHART.width;
  const h = height || CHART.height;
  const plotW = w - CHART.padLeft - CHART.padRight;
  const plotH = h - CHART.padTop - CHART.padBottom;
  const yOf = (v) => CHART.padTop + plotH * (1 - (v - min) / (max - min));
  const xOf = (i) => CHART.padLeft + (plotW * (i + 0.5)) / years.length;
  const ticks = 4;
  let grid = "";
  for (let t = 0; t <= ticks; t++) {
    const v = min + ((max - min) * t) / ticks;
    const y = yOf(v);
    grid += `<line x1="${CHART.padLeft}" y1="${y}" x2="${w - CHART.padRight}" y2="${y}" stroke="${CHART.grid}" stroke-width="1"/>` +
      `<text x="${CHART.padLeft - 8}" y="${y + 4}" text-anchor="end" font-size="12" fill="${CHART.axis}">${fmt(v, 0)}</text>`;
  }
  const labels = years.map((y, i) =>
    `<text x="${xOf(i)}" y="${h - 10}" text-anchor="middle" font-size="12" fill="${CHART.axis}">${y}</text>`).join("");
  return { min, max, yOf, xOf, grid, labels, plotW, plotH };
}

/* Vertical bar chart with a value label on every bar. */
function barChart(series, opts) {
  const o = opts || {};
  const years = series.years;
  const values = series.values;
  const f = chartFrame(years, values, undefined, o.height);
  const slot = f.plotW / years.length;
  const barW = Math.min(46, slot * 0.62);
  let bars = "";
  values.forEach((v, i) => {
    const x = f.xOf(i) - barW / 2;
    const y = f.yOf(Math.max(v, 0));
    const base = f.yOf(0);
    const height = Math.abs(base - y);
    const colour = v < 0 ? CHART.red : (i === values.length - 1 ? CHART.red : CHART.navy);
    /* A negative bar hangs below the zero line, so its label sits just above it. */
    const labelY = v < 0 ? base - 6 : y - 6;
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW}" height="${Math.max(height, 1).toFixed(1)}" rx="3" fill="${colour}"/>` +
      `<text x="${f.xOf(i).toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="${CHART.navy}">${fmt(v)}</text>`;
  });
  return `<svg viewBox="0 0 ${CHART.width} ${f.plotH + CHART.padTop + CHART.padBottom}" role="img" aria-label="${series.title} bar chart, ${series.years[0]} to ${series.years[series.years.length - 1]}">${f.grid}${bars}${f.labels}</svg>`;
}

/* Line chart with dots and a value label on every point. */
function lineChart(series, opts) {
  const o = opts || {};
  const years = series.years;
  const values = series.values;
  const f = chartFrame(years, values);
  const pts = values.map((v, i) => `${f.xOf(i).toFixed(1)},${f.yOf(v).toFixed(1)}`).join(" ");
  let dots = "";
  values.forEach((v, i) => {
    dots += `<circle cx="${f.xOf(i).toFixed(1)}" cy="${f.yOf(v).toFixed(1)}" r="5" fill="${CHART.red}" stroke="#fff" stroke-width="2"/>` +
      `<text x="${f.xOf(i).toFixed(1)}" y="${(f.yOf(v) - 11).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="${CHART.navy}">${fmt(v)}</text>`;
  });
  return `<svg viewBox="0 0 ${CHART.width} ${CHART.height}" role="img" aria-label="${series.title} line chart, ${series.years[0]} to ${series.years[series.years.length - 1]}"><polyline points="${pts}" fill="none" stroke="${CHART.navy}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${f.grid}${dots}${f.labels}</svg>`;
}

/* Horizontal bars for shares (GDP by expenditure, age structure). */
function shareBars(rows, valueKey, labelKey, unit) {
  const max = Math.max(...rows.map((r) => Math.abs(r[valueKey])));
  const w = 760;
  const rowH = 44;
  const h = rows.length * rowH + 8;
  let out = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="share bars">`;
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const v = r[valueKey];
    const bw = (Math.abs(v) / max) * 380;
    const colour = v < 0 ? CHART.red : (i === 0 ? CHART.red : CHART.navy);
    out += `<text x="0" y="${y + 20}" font-size="15" font-weight="600" fill="${CHART.navy}">${r[labelKey]}</text>` +
      `<rect x="300" y="${y + 4}" width="${bw.toFixed(1)}" height="22" rx="4" fill="${colour}"/>` +
      `<text x="${(300 + bw + 10).toFixed(1)}" y="${y + 21}" font-size="15" font-weight="700" fill="${CHART.navy}">${fmt(v)}${unit || "%"}</text>`;
  });
  return out + "</svg>";
}
