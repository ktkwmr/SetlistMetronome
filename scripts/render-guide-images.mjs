#!/usr/bin/env node
// Takes the app screenshots used in the guide page:
//   public/setlistmetronome/images/guide/{en,ja}-{overview,phone}.png
// Requires Playwright, as for scripts/render-og-image.mjs:
//   npm install --no-save playwright && npx playwright install chromium
//   (or: npm install --no-save playwright-core, and set PW_CHANNEL=msedge or chrome)
// Then:
//   node scripts/render-guide-images.mjs
// Re-run it when the app's look changes.
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const { chromium } = await import("playwright").catch(() => import("playwright-core"));
const PUBLIC = fileURLToPath(new URL("../public/", import.meta.url));
const OUT = join(PUBLIC, "setlistmetronome/images/guide/");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".md": "text/markdown; charset=utf-8" };
const PATH = { en: "/setlistmetronome/?lang=en", ja: "/setlistmetronome/ja/" };

// Minimal static server for public/ (the app needs http:// for its absolute paths)
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path.endsWith("/")) path += "index.html";
  const file = normalize(join(PUBLIC, path));
  if (!file.startsWith(PUBLIC)) return res.writeHead(403).end();
  try {
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;

// Numbered markers drawn next to controls, matching the numbered list in the guide.
// side: "left" | "right" | "inside" (top-right corner of the element) | "below" (under the left edge)
async function addMarkers(page, targets) {
  await page.evaluate((targets) => {
    targets.forEach(([sel, n, side]) => {
      const el = [...document.querySelectorAll(sel)].find((e) => e.getBoundingClientRect().width > 0);
      if (!el) throw new Error("marker target not found: " + sel);
      const r = el.getBoundingClientRect();
      const m = document.createElement("div");
      m.textContent = n;
      const size = 22;
      const x = side === "left" ? r.left - size - 4 : side === "inside" ? r.right - size - 6 : side === "below" ? r.left : r.right + 4;
      const y = side === "inside" ? r.top + 6 : side === "below" ? r.bottom + 4 : r.top + r.height / 2 - size / 2;
      Object.assign(m.style, {
        position: "absolute", left: x + scrollX + "px", top: y + scrollY + "px", width: size + "px", height: size + "px", zIndex: 99999,
        borderRadius: "50%", background: "#e11d48", color: "#fff", font: "700 13px/22px system-ui, sans-serif",
        textAlign: "center", boxShadow: "0 0 0 2px #fff", pointerEvents: "none",
      });
      document.body.appendChild(m);
    });
  }, targets);
}

// Example setlist (made-up titles), saved in the browser before the app opens
const SONGS = {
  en: ["Opening number", "Mid-tempo rock", "Waltz", "6/8 ballad", "Shuffle blues"],
  ja: ["オープニング", "ミディアムテンポのロック", "ワルツ", "6/8 のバラード", "シャッフルのブルース"],
};
function exampleState(lang) {
  const s = [
    { bpm: 120, num: 4, den: 4, sub: "8", sound: "click" },
    { bpm: 96, num: 4, den: 4, sub: "16", sound: "drums" },
    { bpm: 156, num: 3, den: 4, sub: "q", sound: "wood" },
    { bpm: 132, num: 6, den: 8, sub: "q", sound: "beep" },
    { bpm: 88, num: 4, den: 4, sub: "shuf", sound: "cowbell", swing: 0.67 },
  ].map((o, i) => ({ id: "s" + i, name: SONGS[lang][i], swing: 0.67, vol: 0.8, subVol: 0.5, ...o }));
  return { presets: s, current: "s0" };
}
async function setUp(page, lang) {
  await page.addInitScript((state) => {
    try { localStorage.setItem("setlistmetronome-state", JSON.stringify(state)); } catch (e) {}
  }, exampleState(lang));
  await page.goto(origin + PATH[lang]);
  await page.waitForTimeout(200);
}

const launch = { channel: process.env.PW_CHANNEL || undefined };
const browser = await chromium.launch(launch);
await mkdir(OUT, { recursive: true });
for (const lang of ["en", "ja"]) {
  // 1. Computer, whole screen with numbered controls
  {
    const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1, locale: lang });
    const page = await ctx.newPage();
    await setUp(page, lang);
    await addMarkers(page, [
      ["#songs", "1", "right"],
      [".list-actions", "2", "right"],
      ["#songNo", "3", "below"],
      ["#prevBtn", "4", "left"],
      ["[data-bpm='5']", "5", "right"],
      ["#beats", "6", "right"],
      ["#playBtn", "7", "left"],
      ["#denUp", "8", "right"],
      ["#subs .chip:last-child", "9", "right"],
      ["#sounds .chip:last-child", "10", "right"],
      ["label[for=vol]", "11", "left"],
      ["#settingsBtn", "12", "left"],
    ]);
    await page.screenshot({ path: join(OUT, `${lang}-overview.png`), fullPage: true });
    await ctx.close();
  }
  // 2. Phone, the top of the screen
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 760 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: lang });
    const page = await ctx.newPage();
    await setUp(page, lang);
    await page.screenshot({ path: join(OUT, `${lang}-phone.png`) });
    await ctx.close();
  }
  console.log(`Wrote the ${lang} screenshots`);
}
await browser.close();
server.close();
