/* ==========================================================================
   make-og.mjs — Makes the 1200×630 social share images   (npm run og)

   Reads tools/og-pages.json and writes one JPEG per entry into
   site/assets/img/ (e.g. "og/seo.jpg" → site/assets/img/og/seo.jpg).
   Pages then point their og:image and twitter:image at that file.

   How it works, in plain words:
   1. We write a tiny HTML page that uses the site's own fonts (Boska and
      Switzer, read from site/assets/fonts) and colours (the tokens below).
   2. We open it in Google Chrome without a window ("headless"), using the
      playwright-core package (a dev dependency; it drives your installed
      Chrome, so nothing extra is downloaded).
   3. For each entry we fill in the text, shrink the type until everything
      fits inside the safe area, check it, and take a screenshot.

   The design (same as og/home.jpg):
   - ink background
   - small Switzer label with a thin wine line before it
   - Boska title, Boska italic subtitle, short wine line underneath
   - optional visual on the right: the portrait, a screenshot, or a
     typographic cover in the style of .cover--type (components.css)

   Safe area: all text stays at least 80px from every edge (some apps crop
   the image). Long titles wrap; if they still don't fit, the font gets
   smaller. While the title is large it may use at most 2 lines; only below
   72px may it wrap onto a third. Text is never cut: if something can't fit even at the smallest
   size, the script stops with an error instead of saving a bad image.

   Config fields (tools/og-pages.json), one object per image:
     file      where to save it, relative to site/assets/img/   (required)
     label     small uppercase line at the top                   (required)
     title     the big serif line                                (required)
     subtitle  the italic line under it                          (required)
     photo     true = portrait on the right
     image     a screenshot instead, relative to site/assets/img/
               (e.g. "work/aq-air-website-1600.webp")
     cover     a typographic cover instead:
               { "label": "SEO case study", "word": "Healthcare", "tone": "ink" | "wine" }
     alt       description of the image, to copy into the page's
               og:image:alt and twitter:image:alt (not used by this script)
   With none of photo / image / cover, the text uses the full width.
   ========================================================================== */

import { readFileSync, mkdirSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { chromium } from "playwright-core";


// --- 1. Settings ---------------------------------------------------------------

const CONFIG = "tools/og-pages.json";
const IMG_DIR = "site/assets/img";
const FONT_DIR = "site/assets/fonts";
const PORTRAIT = "jibin-johnson-web-developer-trivandrum.jpg";   // in IMG_DIR

const WIDTH = 1200;
const HEIGHT = 630;
const SAFE = 80;            // minimum space between text and every edge
const JPEG_QUALITY = 86;    // good quality, ~50KB per image

// Starting font sizes (px). The fitting step only ever makes them smaller.
const TITLE_MAX = 104;
const TITLE_MAX_WIDE = 120;  // when there is no visual and the text has the full width
const TITLE_MIN = 44;
const TITLE_TWO_LINES_MIN = 72;  // down to this size, prefer a title of at most 2 lines
const SUBTITLE_RATIO = 0.44; // subtitle = 44% of the title size (46px next to 104px)
const SUBTITLE_MIN = 26;


// --- 2. Helpers --------------------------------------------------------------

// Read a file and turn it into a "data:" URL, so the HTML page needs no
// web server: fonts and images are written straight into it.
function dataUrl(path) {
  const types = { ".woff2": "font/woff2", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif" };
  const type = types[extname(path).toLowerCase()];
  if (!type) throw new Error(`Unsupported file type: ${path}`);
  return `data:${type};base64,${readFileSync(path).toString("base64")}`;
}

// Stop early, with a clear message, if an entry is missing something
function checkEntry(entry, i) {
  for (const key of ["file", "label", "title", "subtitle"]) {
    if (!entry[key]) throw new Error(`${CONFIG}, entry ${i + 1}: "${key}" is missing.`);
  }
  const visuals = [entry.photo === true, Boolean(entry.image), Boolean(entry.cover)].filter(Boolean).length;
  if (visuals > 1) throw new Error(`${CONFIG}, "${entry.file}": use only one of photo, image or cover.`);
}


// --- 3. The HTML page ----------------------------------------------------------
// One page, loaded once. Each image only swaps the text and the visual.
// The colours are the site tokens (tokens.css). Layout boxes:
//   .text    the text area: starts 80px from the top/left/bottom
//   .visual  the right-hand side (portrait, screenshot or cover)

const page_html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face { font-family: "Boska"; font-weight: 500; font-style: normal;
    src: url(${dataUrl(join(FONT_DIR, "Boska-Medium.woff2"))}) format("woff2"); }
  @font-face { font-family: "Boska"; font-weight: 500; font-style: italic;
    src: url(${dataUrl(join(FONT_DIR, "Boska-MediumItalic.woff2"))}) format("woff2"); }
  @font-face { font-family: "Switzer"; font-weight: 100 900;
    src: url(${dataUrl(join(FONT_DIR, "Switzer-Variable.woff2"))}) format("woff2"); }

  :root {
    --ink: #0E0E0E; --ink-2: #1A1A1A; --line: #2D2D2D; --paper: #F5F5F5;
    --white: #FFFFFF; --mute: #A1A1A1; --silver: #D9D9D9;
    --wine: #6D001A; --wine-2: #8F1D33; --rose: #B76A79;
    --safe: ${SAFE}px;
  }
  * { margin: 0; box-sizing: border-box; }
  html, body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; background: var(--ink); }

  /* ----- Text area. Its width is set per image (see layouts below). ----- */
  .text {
    position: absolute;
    top: var(--safe); bottom: var(--safe); left: var(--safe);
    display: flex; flex-direction: column; justify-content: center;
  }
  .stack { display: flex; flex-direction: column; }

  /* Label: Switzer 500, uppercase, 0.18em tracking, wine line before it */
  .label {
    display: flex; align-items: center; gap: 16px;
    font: 500 15px/1.4 "Switzer"; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--mute);
  }
  .label::before { content: ""; flex-shrink: 0; width: 40px; height: 2px; background: var(--wine-2); }

  /* Title and subtitle: sizes come from the fitting step (CSS variables) */
  .title {
    margin-top: 28px;
    font: 500 var(--title-size)/0.98 "Boska"; letter-spacing: -0.02em;
    color: var(--white); text-wrap: balance; overflow-wrap: normal;
  }
  .subtitle {
    margin-top: 24px;
    font: italic 500 var(--subtitle-size)/1.12 "Boska"; letter-spacing: -0.01em;
    color: var(--paper); text-wrap: balance;
  }
  .rule { margin-top: 40px; width: 120px; height: 2px; background: var(--wine-2); }

  /* ----- Layouts ----- */
  /* No visual: text may use the whole width inside the safe area */
  .layout-none .text   { width: calc(${WIDTH}px - 2 * var(--safe)); }
  .layout-none .visual { display: none; }

  /* Portrait: right 470px, bleeding off the top/right/bottom edges, fading
     into the ink on its left. Text stops 30px before the photo's edge. */
  .layout-photo .text   { width: 640px; }
  .layout-photo .visual { position: absolute; top: 0; right: 0; width: 470px; height: 100%; }
  .layout-photo .visual img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 22%; }
  .layout-photo .visual::after {
    content: ""; position: absolute; inset: 0;
    background:
      linear-gradient(90deg, var(--ink) 0%, rgba(14, 14, 14, 0) 32%),
      linear-gradient(0deg, rgba(14, 14, 14, 0.55) 0%, rgba(14, 14, 14, 0) 25%);
  }

  /* Screenshot or cover: a 16:9 framed card, fully inside the safe area,
     vertically centred. Text gets the left side. */
  .layout-card .text   { width: 520px; }
  .layout-card .visual {
    position: absolute; right: var(--safe); top: 50%;
    width: 480px; aspect-ratio: 16 / 9; transform: translateY(-50%);
    overflow: hidden; border: 1px solid var(--line); border-radius: 4px;
  }
  .layout-card .visual img { width: 100%; height: 100%; object-fit: cover; object-position: top; }

  /* Typographic cover, same look as .cover--type in components.css */
  .cover {
    position: relative; width: 100%; height: 100%;
    display: flex; flex-direction: column; justify-content: flex-end; gap: 16px;
    padding: 32px; color: var(--white);
    background:
      radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.09), transparent 60%),
      var(--cover-bg);
  }
  .cover--ink  { --cover-bg: var(--ink-2); --cover-mute: var(--mute);   --cover-line: var(--wine-2); }
  .cover--wine { --cover-bg: var(--wine);  --cover-mute: var(--silver); --cover-line: var(--rose); }
  .cover::before {   /* faint grain, as on the site */
    content: ""; position: absolute; inset: 0; opacity: 0.12; mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .cover__label {
    position: relative; display: flex; align-items: center; gap: 16px;
    font: 500 13px/1.4 "Switzer"; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--cover-mute);
  }
  .cover__label::before { content: ""; width: 32px; height: 1px; background: var(--cover-line); }
  .cover__word { position: relative; font: italic 500 64px/1 "Boska"; letter-spacing: -0.015em; }
</style></head>
<body>
  <div class="visual"></div>
  <div class="text">
    <div class="stack">
      <p class="label"></p>
      <p class="title"></p>
      <p class="subtitle"></p>
      <div class="rule"></div>
    </div>
  </div>
</body></html>`;


// --- 4. Fill in one image and make it fit --------------------------------------
// This function runs INSIDE the browser page (page.evaluate), so it can
// measure real text with the real fonts. It returns the font sizes used and
// the measured boxes, or an error message.

function fillAndFit(data) {
  const body = document.body;
  const text = document.querySelector(".text");
  const stack = document.querySelector(".stack");
  const visual = document.querySelector(".visual");

  // Text: set with textContent, so characters like "&" are shown as typed
  document.querySelector(".label").textContent = data.label;
  document.querySelector(".title").textContent = data.title;
  document.querySelector(".subtitle").textContent = data.subtitle;

  // Visual on the right
  visual.innerHTML = "";
  body.className = "layout-" + data.layout;
  if (data.imageUrl) {
    const img = document.createElement("img");
    img.src = data.imageUrl;
    img.alt = "";
    visual.appendChild(img);
  }
  if (data.cover) {
    visual.innerHTML =
      '<div class="cover cover--' + (data.cover.tone === "wine" ? "wine" : "ink") + '">' +
      '<p class="cover__label"></p><p class="cover__word"></p></div>';
    visual.querySelector(".cover__label").textContent = data.cover.label || "";
    visual.querySelector(".cover__word").textContent = data.cover.word || "";
  }

  // Does everything fit at these sizes?
  // - the whole stack is no taller than the text area
  // - no single line or word is wider than the text area
  // - while the title is still large, it uses at most 2 lines (a third
  //   line of one short word looks broken, e.g. "Web / development / and…")
  const title = document.querySelector(".title");

  function titleLines(size) {
    return Math.round(title.offsetHeight / (size * 0.98));   // 0.98 = its line height
  }

  function fits(size) {
    const tooTall = stack.offsetHeight > text.clientHeight;
    const tooWide = [...stack.children].some((el) => el.scrollWidth > text.clientWidth);
    const tooManyLines = size > data.titleTwoLinesMin && titleLines(size) > 2;
    return !tooTall && !tooWide && !tooManyLines;
  }

  // Start big; shrink 2px at a time until it fits (or we hit the minimum)
  let titleSize = data.titleMax;
  while (true) {
    const subtitleSize = Math.max(data.subtitleMin, Math.round(titleSize * data.subtitleRatio));
    body.style.setProperty("--title-size", titleSize + "px");
    body.style.setProperty("--subtitle-size", subtitleSize + "px");
    if (fits(titleSize)) break;
    if (titleSize <= data.titleMin) {
      return { error: "Text does not fit even at the smallest size. Shorten the title or subtitle." };
    }
    titleSize -= 2;
  }

  // Final check on the real glyph boxes (italic letters can lean past their
  // box, so we measure the ink, not the element). Every text box must stay
  // inside the safe area.
  const boxes = [".label", ".title", ".subtitle", ".cover__label", ".cover__word"]
    .map((selector) => document.querySelector(selector))
    .filter(Boolean)
    .map((el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      const r = range.getBoundingClientRect();
      return { name: el.className, left: r.left, top: r.top, right: r.right, bottom: r.bottom };
    });

  const s = data.safe;
  const outside = boxes.filter((b) =>
    b.left < s || b.top < s || b.right > innerWidth - s || b.bottom > innerHeight - s);
  if (outside.length) {
    return { error: "Text outside the safe area: " + outside.map((b) => b.name).join(", ") };
  }

  return { titleSize, subtitleSize: parseInt(getComputedStyle(body).getPropertyValue("--subtitle-size"), 10) };
}


// --- 5. Run --------------------------------------------------------------------

const entries = JSON.parse(readFileSync(CONFIG, "utf8"));
entries.forEach(checkEntry);

let browser;
try {
  browser = await chromium.launch({ channel: "chrome" });   // your installed Google Chrome
} catch (error) {
  console.error("Could not start Google Chrome. Is it installed?\n" + error.message);
  process.exit(1);
}

const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });
await page.setContent(page_html);
await page.evaluate(() => document.fonts.ready);

let failed = 0;

for (const entry of entries) {
  // Which layout and which picture?
  let layout = "none";
  let imageUrl = null;
  if (entry.photo === true) { layout = "photo"; imageUrl = dataUrl(join(IMG_DIR, PORTRAIT)); }
  if (entry.image)          { layout = "card";  imageUrl = dataUrl(join(IMG_DIR, entry.image)); }
  if (entry.cover)          { layout = "card"; }

  const result = await page.evaluate(fillAndFit, {
    label: entry.label,
    title: entry.title,
    subtitle: entry.subtitle,
    cover: entry.cover || null,
    layout,
    imageUrl,
    safe: SAFE,
    titleMax: layout === "none" ? TITLE_MAX_WIDE : TITLE_MAX,
    titleMin: TITLE_MIN,
    titleTwoLinesMin: TITLE_TWO_LINES_MIN,
    subtitleRatio: SUBTITLE_RATIO,
    subtitleMin: SUBTITLE_MIN
  });

  if (result.error) {
    console.error(`✘  ${entry.file}: ${result.error}`);
    failed++;
    continue;
  }

  // Wait until the picture has loaded and fonts are ready, then save
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
  });

  const out = join(IMG_DIR, entry.file);
  mkdirSync(dirname(out), { recursive: true });
  await page.screenshot({ path: out, type: "jpeg", quality: JPEG_QUALITY });
  console.log(`✔  ${out}  (title ${result.titleSize}px, subtitle ${result.subtitleSize}px, ${layout})`);
}

await browser.close();

if (failed) {
  console.error(`${failed} image(s) not made. Fix the entries above and run again.`);
  process.exit(1);
}
console.log(`${entries.length} share images made.`);
