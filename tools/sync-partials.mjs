/* ==========================================================================
   sync-partials.mjs — Copies shared HTML into every page   (npm run sync)

   For every .html file in site/:
   - finds each   <!-- PARTIAL:name --> … <!-- /PARTIAL:name -->   block
   - replaces what's between the markers with partials/name.html
   - marks the current page's link in the header <nav> with aria-current="page",
     or aria-current="true" on the section link when the page is inside it
   - saves the file only if something changed, and prints its name

   Edit a partial once → run this → every page is updated.
   ========================================================================== */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const SITE_DIR = "site";
const PARTIALS_DIR = "partials";

// Matches a whole partial block. ([\w-]+) captures the name, e.g. "header";
// \1 makes sure the closing marker has the same name.
const PARTIAL_BLOCK = /<!-- PARTIAL:([\w-]+) -->[\s\S]*?<!-- \/PARTIAL:\1 -->/g;


// --- 1. Read a partial file (each one is read only once) ---------------------

const partialCache = new Map();

function getPartial(name) {
  if (!partialCache.has(name)) {
    const file = join(PARTIALS_DIR, `${name}.html`);
    if (existsSync(file)) {
      partialCache.set(name, readFileSync(file, "utf8").trim());
    } else {
      console.warn(`⚠  Missing ${file} — leaving the "${name}" block as it is.`);
      partialCache.set(name, null);
    }
  }
  return partialCache.get(name);
}


// --- 2. Work out a page's URL from its file path ------------------------------
//   site/index.html          → /
//   site/about/index.html    → /about/
//   site/404.html            → /404.html

function pageUrl(file) {
  const path = relative(SITE_DIR, file).split(sep).join("/");
  if (path === "index.html") return "/";
  if (path.endsWith("/index.html")) return "/" + path.slice(0, -"index.html".length);
  return "/" + path;
}


// --- 3. Mark the current link in the header navigation ------------------------
// Only inside <nav> elements, so e.g. the "Start a project" button in the
// header is not marked when you are on /contact/.
//
//   exact match         href="/work/" on /work/          → aria-current="page"
//   parent section      href="/work/" on /work/aq-air/   → aria-current="true"
//                       href="/services/" on /services/seo/ → aria-current="true"
// "/" is never treated as a parent, otherwise it would match every page.

function markCurrentLink(html, url) {
  return html.replace(/<nav[\s\S]*?<\/nav>/g, (nav) =>
    nav.replace(/href="([^"]*)"/g, (attr, href) => {
      if (href === url) return `${attr} aria-current="page"`;
      if (href !== "/" && href.endsWith("/") && url.startsWith(href)) {
        return `${attr} aria-current="true"`;
      }
      return attr;
    })
  );
}


// --- 4. Go through every page -----------------------------------------------

// recursive: true lists files in all sub-folders (site/work/aq-air/index.html …)
const pages = readdirSync(SITE_DIR, { recursive: true })
  .filter((file) => file.endsWith(".html"))
  .map((file) => join(SITE_DIR, file));

let changedCount = 0;

for (const file of pages) {
  const original = readFileSync(file, "utf8");
  const url = pageUrl(file);

  const updated = original.replace(PARTIAL_BLOCK, (block, name) => {
    let content = getPartial(name);
    if (content === null) return block;               // partial missing: keep as is
    if (name === "header") content = markCurrentLink(content, url);
    return `<!-- PARTIAL:${name} -->\n${content}\n<!-- /PARTIAL:${name} -->`;
  });

  if (updated !== original) {
    writeFileSync(file, updated);
    console.log(`✔  Updated ${file}`);
    changedCount++;
  }
}

console.log(
  changedCount === 0
    ? `All ${pages.length} pages already up to date.`
    : `${changedCount} of ${pages.length} pages updated.`
);
