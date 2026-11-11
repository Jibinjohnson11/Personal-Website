/* ==========================================================================
   generate-sitemap.mjs — Builds site/sitemap.xml   (npm run sitemap)

   Will: find every index.html page in site/, skip pages marked noindex
   (thank-you, 404, drafts), and write sitemap.xml with absolute
   https://jibinjohnson.in/.../ URLs (trailing slash) and last-modified dates.
   ========================================================================== */
