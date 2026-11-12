/* ==========================================================================
   generate-sitemap.mjs — Builds site/sitemap.xml and site/rss.xml
   (npm run sitemap)

   sitemap.xml
   - finds every index.html in site/ (404.html is not an index.html, so it
     is never included)
   - skips pages whose <meta name="robots"> says "noindex" (thank-you,
     drafts…) and everything under /styleguide/
   - writes absolute https://jibinjohnson.in/.../ URLs (trailing slash)
   - <lastmod> = the date the page's CONTENT last changed in git:
       · it walks back through the page's commits (newest first) and takes
         the first one that changed more than the ?v= fingerprints
         (cache-bust.mjs) or the shared header/footer blocks (PARTIAL
         markers), because those touch every page at once and say nothing
         about that page's own content
       · a page that is new (not committed yet), or whose content has
         uncommitted edits, uses the file's date on disk instead

   rss.xml
   - every PUBLISHED blog post: site/blog/<slug>/index.html that is not
     noindex. Title, link, description and date come from the page itself
     (<title>, canonical, meta description, article:published_time).
   - newest first

   Only the real robots <meta> tag counts: the word "noindex" inside an
   HTML comment is ignored.
   ========================================================================== */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { execFileSync } from "node:child_process";

const SITE_DIR = "site";
const ORIGIN = "https://jibinjohnson.in";
const SKIP = ["/styleguide/"];   // URL prefixes that never go in the sitemap


// --- 1. Helpers ------------------------------------------------------------------

// site/about/index.html → /about/      site/index.html → /
function pageUrl(file) {
  const path = relative(SITE_DIR, file).split(sep).join("/");
  return "/" + path.slice(0, -"index.html".length);
}

// Remove HTML comments, so text inside them can't be mistaken for real tags
function stripComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, "");
}

// Read the content="" of a <meta> tag, e.g. meta(html, "name", "robots")
function meta(html, attr, value) {
  const tag = html.match(new RegExp(`<meta[^>]*${attr}="${value}"[^>]*>`, "i"));
  if (!tag) return "";
  const content = tag[0].match(/content="([^"]*)"/i);
  return content ? content[1] : "";
}

function isNoindex(html) {
  return meta(html, "name", "robots").toLowerCase().includes("noindex");
}

// HTML entities in <title> etc. → plain text, then escaped again for XML
function decode(text) {
  return text
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function xml(text) {
  return text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

// YYYY-MM-DD from a Date
function day(date) {
  return date.toISOString().slice(0, 10);
}


// --- 1b. Last real content change, from git ------------------------------------------

// Run git and return its output as text ("" if the command fails)
function git(...args) {
  try {
    return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    return "";
  }
}

// The page with the parts that don't count removed: ?v= fingerprints and
// everything between <!-- PARTIAL:x --> and <!-- /PARTIAL:x -->
function normalise(html) {
  return html
    .replace(/<!-- PARTIAL:([\w-]+) -->[\s\S]*?<!-- \/PARTIAL:\1 -->/g, "")
    .replace(/\?v=[0-9a-f]{8}/g, "");
}

function lastContentChange(file) {
  const path = file.split(sep).join("/");
  const onDisk = day(statSync(file).mtime);

  // Commits that touched this file, newest first: "hash date" per line
  const commits = git("log", "--format=%H %cs", "--", path)
    .trim().split("\n").filter(Boolean)
    .map((line) => { const [hash, date] = line.split(" "); return { hash, date }; });

  if (!commits.length) return onDisk;                       // new page, not committed yet

  const versions = commits.map((c) => normalise(git("show", `${c.hash}:${path}`)));

  // Uncommitted edits to the page's own content → today's file date
  if (normalise(readFileSync(file, "utf8")) !== versions[0]) return onDisk;

  // First commit (newest → oldest) whose content differs from the one before it
  for (let i = 0; i < commits.length - 1; i++) {
    if (versions[i] !== versions[i + 1]) return commits[i].date;
  }
  return commits[commits.length - 1].date;                  // the commit that created it
}


// --- 2. Collect the indexable pages -------------------------------------------------

const files = readdirSync(SITE_DIR, { recursive: true })
  .filter((file) => file.split(sep).pop() === "index.html")
  .map((file) => join(SITE_DIR, file));

const pages = [];

for (const file of files) {
  const url = pageUrl(file);
  if (SKIP.some((prefix) => url.startsWith(prefix))) continue;

  const html = stripComments(readFileSync(file, "utf8"));
  if (isNoindex(html)) continue;

  pages.push({ file, url, html, lastmod: lastContentChange(file) });
}

// Home first, then alphabetical: easier to read and compare between runs
pages.sort((a, b) => (a.url === "/" ? -1 : b.url === "/" ? 1 : a.url.localeCompare(b.url)));


// --- 3. Write sitemap.xml ------------------------------------------------------------

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${ORIGIN}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
  </url>`).join("\n")}
</urlset>
`;

writeFileSync(join(SITE_DIR, "sitemap.xml"), sitemap);
console.log(`✔  site/sitemap.xml  (${pages.length} pages)`);


// --- 4. Write rss.xml (published blog posts only) ------------------------------------

const posts = pages
  .filter((page) => /^\/blog\/[^/]+\/$/.test(page.url))   // /blog/<slug>/, not /blog/ itself
  .map((page) => {
    const title = (page.html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "";
    const published = meta(page.html, "property", "article:published_time") || page.lastmod;
    return {
      title: decode(title.trim()),
      link: ORIGIN + page.url,
      description: decode(meta(page.html, "name", "description")),
      date: new Date(published + "T09:00:00+05:30"),   // 9 am India time
    };
  })
  .sort((a, b) => b.date - a.date);

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jibin Johnson — Blog</title>
    <link>${ORIGIN}/blog/</link>
    <description>Practical articles on SEO, web performance and website development for businesses in Kerala, written from real client projects.</description>
    <language>en-IN</language>
    <atom:link href="${ORIGIN}/rss.xml" rel="self" type="application/rss+xml"/>
${posts.length ? `    <lastBuildDate>${posts[0].date.toUTCString()}</lastBuildDate>\n` : ""}${posts.map((post) => `    <item>
      <title>${xml(post.title)}</title>
      <link>${post.link}</link>
      <guid isPermaLink="true">${post.link}</guid>
      <description>${xml(post.description)}</description>
      <pubDate>${post.date.toUTCString()}</pubDate>
    </item>`).join("\n")}
  </channel>
</rss>
`;

writeFileSync(join(SITE_DIR, "rss.xml"), rss);
console.log(`✔  site/rss.xml  (${posts.length} published posts)`);
