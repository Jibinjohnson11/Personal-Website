/* ==========================================================================
   cache-bust.mjs — Adds ?v=<hash> to every local asset link   (npm run bust)

   Why: CSS, JS, fonts and images are cached by browsers for a whole year
   (site/_headers). To make sure visitors still get a changed file, every
   link to it carries a short fingerprint of the file's CONTENT:

     /assets/css/base.css   →   /assets/css/base.css?v=3f9a2c71

   The fingerprint is the first 8 characters of the file's SHA-256 hash.
   Same file → same hash → same URL (the cached copy is used).
   Changed file → new hash → new URL (the browser downloads it again).

   What it updates (only paths that start with /assets/):
     1. CSS files in site/assets/css — url(...) to fonts and images.
        Done FIRST, because adding ?v= to a font link changes the CSS
        file itself, and so the CSS file's own hash.
     2. partials/*.html — so npm run sync copies the hashed links
     3. every .html page in site/ — href, src, srcset, imagesrcset and url(...)

   Not touched: absolute https://jibinjohnson.in/... URLs (og:image and
   schema images are read by crawlers, not cached by visitors' browsers),
   and root files like /favicon.svg (not long-cached).

   Idempotent: an existing ?v=… is replaced by the current hash, so running
   it twice changes nothing. Files are only saved when something changed.
   ========================================================================== */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const SITE_DIR = "site";
const CSS_DIR = "site/assets/css";
const PARTIALS_DIR = "partials";

// A local asset path, e.g. /assets/img/work/aq-air-800.webp?v=12ab34cd
//  (?<=["'(\s,])   it must follow a quote, "(", a space or a comma, so the
//                  /assets/ inside https://jibinjohnson.in/assets/... is skipped
//  group 1         the path itself
//  (?:\?v=…)?      an old fingerprint, if there is one (it gets replaced)
const ASSET = /(?<=["'(\s,])(\/assets\/[\w\-./]+\.(?:css|js|mjs|woff2?|ttf|otf|png|jpe?g|webp|avif|gif|svg|ico|mp4|webm))(?:\?v=[0-9a-f]{8})?/g;


// --- 1. Helpers ------------------------------------------------------------------

// Hashes are remembered, so each file is read and hashed only once.
// (CSS files are hashed only after step 2 has updated them.)
const hashCache = new Map();

function hashOf(urlPath) {
  if (!hashCache.has(urlPath)) {
    const file = join(SITE_DIR, urlPath);
    if (!existsSync(file)) {
      hashCache.set(urlPath, null);
      console.warn(`⚠  Not found: ${file} (link left without ?v=)`);
    } else {
      const hash = createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 8);
      hashCache.set(urlPath, hash);
    }
  }
  return hashCache.get(urlPath);
}

// Replace every asset link in some text with its fingerprinted version
function bust(text) {
  return text.replace(ASSET, (match, path) => {
    const hash = hashOf(path);
    return hash ? `${path}?v=${hash}` : match;
  });
}

// Update one file on disk; returns true if it changed
function updateFile(file) {
  const original = readFileSync(file, "utf8");
  const updated = bust(original);
  if (updated === original) return false;
  writeFileSync(file, updated);
  console.log(`✔  ${file}`);
  return true;
}

function listFiles(dir, extension) {
  return readdirSync(dir, { recursive: true })
    .filter((file) => file.endsWith(extension))
    .map((file) => join(dir, file));
}


// --- 2. CSS files first (their url() links change their own hash) ------------------

let changed = 0;
for (const file of listFiles(CSS_DIR, ".css")) {
  if (updateFile(file)) changed++;
}


// --- 3. Partials, then every page ---------------------------------------------------

for (const file of [...listFiles(PARTIALS_DIR, ".html"), ...listFiles(SITE_DIR, ".html")]) {
  if (updateFile(file)) changed++;
}

console.log(changed === 0 ? "All asset links already up to date." : `${changed} files updated.`);
