/* ==========================================================================
   check-seo.mjs — SEO safety check before deploying   (npm run check)

   Reads every .html page in site/ and prints a table of problems:

     page · problem · severity

   ERRORS make the script exit with code 1 (this stops the pre-commit hook
   and npm run prepare-deploy). WARNINGS are only printed.

   ERRORS
   - <title> missing, duplicated on another page, or longer than 60 characters
   - meta description missing, duplicated, or longer than 155 characters
   - canonical missing (indexable pages), not https://jibinjohnson.in/...,
     not the page's own URL, more than one, or the same as another page's
   - not exactly one <h1>
   - <img> without alt, width or height
   - JSON-LD that is not valid JSON
   - FAQPage JSON-LD text that is not word-for-word the visible FAQ
   - internal links (href, src, srcset) to files that don't exist, or page
     links without the trailing slash
   - indexable pages missing from sitemap.xml, noindex pages inside it
   - <!-- PARTIAL:x --> blocks that differ from partials/x.html
   - /assets/ links without the current ?v= fingerprint
   - class="todo" or "[placeholder]" brackets on an indexable page
   - og:image / twitter:image files that don't exist

   WARNINGS
   - skipped heading levels (h2 → h4)
   - images over ~200 KB; images below the fold without loading="lazy"
   - fewer than 300 words (except contact, thank-you, 404, privacy)
   - a primary keyword (docs/website-content.md) in the <title> of 2+ pages

   Only built-in Node modules. Run from the project root.
   ========================================================================== */

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, relative, sep } from "node:path";

const SITE_DIR = "site";
const PARTIALS_DIR = "partials";
const CONTENT_DOC = "docs/website-content.md";
const ORIGIN = "https://jibinjohnson.in";

const MAX_TITLE = 60;
const MAX_DESCRIPTION = 155;
const MAX_IMAGE_BYTES = 200 * 1024;
const MIN_WORDS = 300;
const SHORT_PAGES_OK = ["/contact/", "/thank-you/", "/404.html", "/privacy/"];


// --- 1. Collecting problems ------------------------------------------------------

const problems = [];   // { page, problem, severity }

function error(page, problem) { problems.push({ page, problem, severity: "ERROR" }); }
function warn(page, problem)  { problems.push({ page, problem, severity: "WARNING" }); }


// --- 2. Small HTML helpers (regex based: fine for our own hand-written HTML) -----

// site/about/index.html → /about/     site/index.html → /     site/404.html → /404.html
function pageUrl(file) {
  const path = relative(SITE_DIR, file).split(sep).join("/");
  if (path === "index.html") return "/";
  if (path.endsWith("/index.html")) return "/" + path.slice(0, -"index.html".length);
  return "/" + path;
}

function stripComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, "");
}

// Read one attribute from a tag string, e.g. attr('<img alt="x">', "alt") → "x"
// Returns null when the attribute is not there at all.
function attr(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}(?:\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+)))?(?=[\\s/>])`, "i"));
  if (!match) return null;
  return match[1] ?? match[2] ?? match[3] ?? "";
}

// All opening tags of one kind, e.g. tags(html, "img")
function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) || [];
}

// content="" of a <meta name|property="…"> tag ("" if missing, null if no tag)
function meta(html, key) {
  const tag = tags(html, "meta").find((t) => attr(t, "name") === key || attr(t, "property") === key);
  return tag ? attr(tag, "content") : null;
}

// HTML entities → characters (the ones we actually use, plus any numeric one)
const ENTITIES = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " ",
  rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", mdash: "—", ndash: "–", hellip: "…", middot: "·", rarr: "→", times: "×", copy: "©" };

function decode(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, code) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return String.fromCodePoint(n);
    }
    return ENTITIES[code.toLowerCase()] ?? whole;
  });
}

// Tags removed, entities decoded, whitespace collapsed.
// Inline tags (<a>, <strong>…) vanish without a space, so "See <a>x</a>." stays
// "See x." — block tags (<p>, <li>…) become a space so words don't run together.
const INLINE_TAGS = /<\/?(?:a|abbr|b|code|em|i|small|span|strong|sub|sup|time)\b[^>]*>/gi;

function textOf(html) {
  return decode(html.replace(INLINE_TAGS, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

// Visible text of the page: no comments, <head>, scripts, styles, SVG or tags
function visibleText(html) {
  return textOf(
    stripComments(html)
      .replace(/<head[\s\S]*?<\/head>/i, " ")
      .replace(/<(script|style|svg|template|noscript)\b[\s\S]*?<\/\1>/gi, " ")
  );
}

function isNoindex(html) {
  return (meta(stripComments(html), "robots") || "").toLowerCase().includes("noindex");
}


// --- 3. Local files: does a URL exist, and what is its fingerprint? -----------------

// Path part of an internal URL, or null for external / special links.
//   "/about/#faq" → "/about/"     "https://jibinjohnson.in/x/" → "/x/"
function internalPath(url) {
  url = url.trim();
  if (url.startsWith(ORIGIN + "/")) url = url.slice(ORIGIN.length);
  if (!url.startsWith("/") || url.startsWith("//")) return null;
  return url.split("#")[0].split("?")[0];
}

// "/about/" → site/about/index.html     "/assets/x.css" → site/assets/x.css
function fileFor(path) {
  return join(SITE_DIR, decodeURIComponent(path.endsWith("/") ? path + "index.html" : path));
}

// A "page" link has no file extension in its last segment (/about, /work/aq-air)
function isPageLink(path) {
  const last = path.split("/").pop();
  return !last.includes(".");
}

// Same fingerprint as tools/cache-bust.mjs: first 8 chars of the SHA-256
const hashCache = new Map();
function hashOf(path) {
  if (!hashCache.has(path)) {
    const file = fileFor(path);
    hashCache.set(path, existsSync(file)
      ? createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 8)
      : null);
  }
  return hashCache.get(path);
}


// --- 4. Partials (same replacement as tools/sync-partials.mjs) -----------------------

// The header partial gets aria-current="…" added per page by sync-partials,
// so that attribute is ignored when comparing.
function normalisePartial(text) {
  return text.replace(/ aria-current="(?:page|true)"/g, "").trim();
}

const partialCache = new Map();
function partial(name) {
  if (!partialCache.has(name)) {
    const file = join(PARTIALS_DIR, `${name}.html`);
    partialCache.set(name, existsSync(file) ? normalisePartial(readFileSync(file, "utf8")) : null);
  }
  return partialCache.get(name);
}


// --- 5. Primary keywords from docs/website-content.md ---------------------------------
//   - **URL:** `/about/`
//   - **Primary keyword:** Jibin Johnson (brand) / about web developer Trivandrum
// "(…)" notes are dropped and "/" separates several keywords.
// The brand name is skipped: it is meant to be in every title.

const BRAND = "jibin johnson";

function primaryKeywords() {
  if (!existsSync(CONTENT_DOC)) return [];
  const list = [];
  let url = null;
  for (const line of readFileSync(CONTENT_DOC, "utf8").split("\n")) {
    const urlMatch = line.match(/^- \*\*URL:\*\* `([^`]+)`/);
    if (urlMatch) url = urlMatch[1];
    const kwMatch = line.match(/^- \*\*Primary keyword:\*\* (.+)$/);
    if (kwMatch && url) {
      for (const kw of kwMatch[1].replace(/\([^)]*\)/g, "").split("/")) {
        const keyword = kw.trim().toLowerCase();
        if (keyword && keyword !== BRAND) list.push({ url, keyword });
      }
    }
  }
  return list;
}


// --- 6. FAQ: JSON-LD vs. visible text --------------------------------------------------

// Every FAQPage object anywhere in the parsed JSON-LD (also inside @graph)
function findFaqPages(node, found = []) {
  if (Array.isArray(node)) node.forEach((n) => findFaqPages(n, found));
  else if (node && typeof node === "object") {
    const type = node["@type"];
    if (type === "FAQPage" || (Array.isArray(type) && type.includes("FAQPage"))) found.push(node);
    Object.values(node).forEach((v) => findFaqPages(v, found));
  }
  return found;
}

// Visible FAQ: each .faq__question with the .faq__answer that follows it
function visibleFaq(html) {
  const items = [];
  const re = /class="[^"]*\bfaq__question\b[^"]*"[^>]*>([\s\S]*?)<\/h\d>[\s\S]*?class="[^"]*\bfaq__answer\b[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
  for (const m of stripComments(html).matchAll(re)) {
    items.push({ question: textOf(m[1]), answer: textOf(m[2]) });
  }
  return items;
}

function clean(text) {
  return textOf(String(text ?? ""));
}

function checkFaq(page, html, faqPages) {
  const visible = visibleFaq(html);
  for (const faq of faqPages) {
    const entities = [].concat(faq.mainEntity || []);
    if (entities.length !== visible.length) {
      error(page, `FAQPage has ${entities.length} questions, visible FAQ has ${visible.length}`);
    }
    entities.forEach((entity, i) => {
      const question = clean(entity.name);
      const answer = clean([].concat(entity.acceptedAnswer || [])[0]?.text);
      const shown = visible.find((v) => v.question === question);
      if (!shown) {
        error(page, `FAQPage question not in visible FAQ: "${question}"`);
      } else if (shown.answer !== answer) {
        error(page, `FAQPage answer differs from visible text for: "${question}"`);
      } else if (visible[i] !== shown) {
        warn(page, `FAQ question order differs from JSON-LD: "${question}"`);
      }
    });
  }
}


// --- 7. Check one page ---------------------------------------------------------------

const pages = readdirSync(SITE_DIR, { recursive: true })
  .filter((file) => file.endsWith(".html"))
  .map((file) => join(SITE_DIR, file))
  .sort();

const titles = new Map();         // title → [pages]
const descriptions = new Map();   // description → [pages]
const canonicals = new Map();     // canonical → [pages]
const indexable = new Set();      // page URLs that should be in the sitemap
const noindexed = new Set();
const pageTitles = [];            // { page, title } for the keyword check

function remember(map, key, page) {
  if (!map.has(key)) map.set(key, []);
  map.get(key).push(page);
}

for (const file of pages) {
  const raw = readFileSync(file, "utf8");
  const html = stripComments(raw);
  const page = pageUrl(file);
  const noindex = isNoindex(html);
  (noindex ? noindexed : indexable).add(page);

  // <title>
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decode(titleMatch[1]).trim() : "";
  if (!title) error(page, "<title> missing");
  else {
    if (title.length > MAX_TITLE) error(page, `<title> is ${title.length} characters (max ${MAX_TITLE})`);
    remember(titles, title, page);
    pageTitles.push({ page, title });
  }

  // Meta description
  const description = decode(meta(html, "description") || "").trim();
  if (!description) error(page, "meta description missing");
  else {
    if (description.length > MAX_DESCRIPTION) error(page, `meta description is ${description.length} characters (max ${MAX_DESCRIPTION})`);
    remember(descriptions, description, page);
  }

  // Canonical (noindex pages may leave it out, but if present it must be right)
  const canonicalTags = tags(html, "link").filter((t) => attr(t, "rel") === "canonical");
  if (canonicalTags.length > 1) error(page, `${canonicalTags.length} canonical tags`);
  if (canonicalTags.length === 0) {
    if (!noindex) error(page, "canonical missing");
  } else {
    const canonical = attr(canonicalTags[0], "href") || "";
    if (!canonical.startsWith(ORIGIN + "/")) error(page, `canonical is not absolute ${ORIGIN}/...: ${canonical}`);
    else if (canonical !== ORIGIN + page) error(page, `canonical ${canonical} does not match page URL ${ORIGIN + page}`);
    remember(canonicals, canonical, page);
  }

  // Exactly one <h1>
  const h1Count = tags(html, "h1").length;
  if (h1Count !== 1) error(page, `${h1Count} <h1> elements (need exactly 1)`);

  // Heading levels: no skipping down (h2 → h4)
  let previous = 0;
  for (const m of html.matchAll(/<h([1-6])\b/gi)) {
    const level = Number(m[1]);
    if (previous && level > previous + 1) warn(page, `heading level skipped: h${previous} → h${level}`);
    previous = level;
  }

  // Images: alt, width, height, size, lazy-loading
  const body = html.replace(/<head[\s\S]*?<\/head>/i, "");
  tags(body, "img").forEach((img, index) => {
    const src = attr(img, "src") || "(no src)";
    const missing = ["alt", "width", "height"].filter((a) => attr(img, a) === null);
    if (missing.length) error(page, `<img> ${src} missing ${missing.join(", ")}`);

    // First image = assumed to be in the first viewport (often the LCP image).
    // Every later image should be lazy, unless it is marked fetchpriority="high".
    const lazy = (attr(img, "loading") || "").toLowerCase() === "lazy";
    const priority = (attr(img, "fetchpriority") || "").toLowerCase() === "high";
    if (index > 0 && !lazy && !priority) warn(page, `<img> ${src} has no loading="lazy" (below the fold?)`);
  });

  // Big image files (img src/srcset and <source srcset>)
  const imageUrls = new Set();
  for (const t of [...tags(body, "img"), ...tags(body, "source")]) {
    const src = attr(t, "src");
    if (src) imageUrls.add(src);
    for (const part of (attr(t, "srcset") || "").split(",")) {
      const url = part.trim().split(/\s+/)[0];
      if (url) imageUrls.add(url);
    }
  }
  for (const url of imageUrls) {
    const path = internalPath(url);
    if (!path) continue;
    const imageFile = fileFor(path);
    if (existsSync(imageFile) && statSync(imageFile).size > MAX_IMAGE_BYTES) {
      warn(page, `image ${path} is ${Math.round(statSync(imageFile).size / 1024)} KB (over ~200 KB)`);
    }
  }

  // JSON-LD must parse; FAQPage must match the visible FAQ
  const faqPages = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      findFaqPages(JSON.parse(m[1]), faqPages);
    } catch (err) {
      error(page, `JSON-LD does not parse: ${err.message}`);
    }
  }
  if (faqPages.length) checkFaq(page, html, faqPages);

  // Internal links: href, src, srcset (and imagesrcset on preload links)
  const urls = [];
  for (const m of html.matchAll(/\s(href|src)="([^"]*)"/gi)) urls.push({ kind: m[1].toLowerCase(), url: m[2] });
  for (const m of html.matchAll(/\s(?:srcset|imagesrcset)="([^"]*)"/gi)) {
    for (const part of m[1].split(",")) {
      const url = part.trim().split(/\s+/)[0];
      if (url) urls.push({ kind: "srcset", url });
    }
  }
  const reported = new Set();   // report each broken link once per page
  for (const { kind, url } of urls) {
    const path = internalPath(url);
    if (!path || reported.has(url)) continue;

    if (kind === "href" && isPageLink(path) && !path.endsWith("/")) {
      error(page, `link without trailing slash: ${url}`);
      reported.add(url);
      continue;
    }
    if (!existsSync(fileFor(path))) {
      error(page, `broken internal link: ${url}`);
      reported.add(url);
      continue;
    }
    // Local /assets/ links need the current ?v= fingerprint (npm run bust)
    if (path.startsWith("/assets/") && !url.startsWith(ORIGIN)) {
      const version = (url.match(/\?v=([0-9a-f]{8})/) || [])[1];
      if (version !== hashOf(path)) {
        error(page, version ? `outdated ?v= fingerprint: ${url}` : `no ?v= fingerprint: ${url}`);
        reported.add(url);
      }
    }
  }

  // og:image / twitter:image files must exist
  for (const key of ["og:image", "twitter:image"]) {
    const url = meta(html, key);
    if (!url) continue;
    const path = internalPath(url);
    if (path && !existsSync(fileFor(path))) error(page, `${key} file not found: ${url}`);
  }

  // PARTIAL blocks must equal partials/<name>.html (checked on the raw file)
  for (const m of raw.matchAll(/<!-- PARTIAL:([\w-]+) -->([\s\S]*?)<!-- \/PARTIAL:\1 -->/g)) {
    const expected = partial(m[1]);
    if (expected === null) error(page, `PARTIAL:${m[1]} has no partials/${m[1]}.html`);
    else if (normalisePartial(m[2]) !== expected) error(page, `PARTIAL:${m[1]} out of sync (run npm run sync)`);
  }

  // Placeholders on indexable pages
  const text = visibleText(raw);
  if (!noindex) {
    if (/class="[^"]*\btodo\b/i.test(html)) error(page, 'class="todo" placeholder left on the page');
    const bracket = text.match(/.{0,30}\[.{0,30}/);
    if (bracket) error(page, `"[" placeholder bracket in text: …${bracket[0]}…`);
  }

  // Word count
  const words = text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  if (words < MIN_WORDS && !SHORT_PAGES_OK.includes(page)) warn(page, `only ${words} words (under ${MIN_WORDS})`);
}


// --- 8. Checks across all pages ---------------------------------------------------------

for (const [title, list] of titles) {
  if (list.length > 1) list.forEach((page) => error(page, `duplicate <title> (also on ${list.filter((p) => p !== page).join(", ")}): "${title}"`));
}
for (const [, list] of descriptions) {
  if (list.length > 1) list.forEach((page) => error(page, `duplicate meta description (also on ${list.filter((p) => p !== page).join(", ")})`));
}
for (const [canonical, list] of canonicals) {
  if (list.length > 1) list.forEach((page) => error(page, `duplicate canonical ${canonical} (also on ${list.filter((p) => p !== page).join(", ")})`));
}

// Sitemap: every indexable page in it, no noindex page in it
const sitemapFile = join(SITE_DIR, "sitemap.xml");
if (!existsSync(sitemapFile)) {
  error("/sitemap.xml", "sitemap.xml missing (run npm run sitemap)");
} else {
  const inSitemap = new Set(
    [...readFileSync(sitemapFile, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim().replace(ORIGIN, ""))
  );
  for (const page of indexable) {
    if (!inSitemap.has(page)) error(page, "indexable page missing from sitemap.xml");
  }
  for (const page of noindexed) {
    if (inSitemap.has(page)) error(page, "noindex page is listed in sitemap.xml");
  }
}

// A primary keyword should appear in only one indexable page's <title>.
// Reported once, on the page the keyword belongs to.
//
// ALLOW: pages whose <title> may share a keyword with another page.
//   "/" — the home page intentionally targets the combined phrase
//         "web developer and SEO specialist in Kerala", so its title naturally
//         contains "SEO specialist in Kerala" too. That's on purpose.
const KEYWORD_TITLE_ALLOW = ["/"];

for (const { url, keyword } of primaryKeywords()) {
  const using = pageTitles
    .filter((t) => indexable.has(t.page) && !KEYWORD_TITLE_ALLOW.includes(t.page))
    .filter((t) => t.title.toLowerCase().includes(keyword))
    .map((t) => t.page);
  if (using.length > 1) warn(url, `primary keyword "${keyword}" is in the <title> of ${using.length} pages: ${using.join(", ")}`);
}


// --- 9. Print the table and exit -----------------------------------------------------------

const errors = problems.filter((p) => p.severity === "ERROR");
const warnings = problems.filter((p) => p.severity === "WARNING");

if (problems.length) {
  // Errors first, then by page
  const rows = [...errors, ...warnings].sort((a, b) =>
    a.severity === b.severity ? a.page.localeCompare(b.page) : a.severity === "ERROR" ? -1 : 1);
  const pageWidth = Math.max(4, ...rows.map((r) => r.page.length));
  const problemWidth = Math.min(100, Math.max(7, ...rows.map((r) => r.problem.length)));
  const line = (a, b, c) => `${a.padEnd(pageWidth)} · ${b.padEnd(problemWidth)} · ${c}`;

  console.log(line("PAGE", "PROBLEM", "SEVERITY"));
  console.log("-".repeat(pageWidth + problemWidth + 14));
  for (const r of rows) console.log(line(r.page, r.problem, r.severity));
  console.log("");
}

console.log(`Checked ${pages.length} pages: ${errors.length} error(s), ${warnings.length} warning(s).`);

if (errors.length) {
  console.log("✘  Fix the errors above before deploying.");
  process.exit(1);
}
console.log("✔  No SEO errors.");
