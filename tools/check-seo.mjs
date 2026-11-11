/* ==========================================================================
   check-seo.mjs — SEO safety check before deploying   (npm run check)

   Will scan every page in site/ and report problems, e.g.:
   - missing/duplicate <title> (> 60 chars) or meta description (> 155 chars)
   - missing or wrong canonical, not exactly one <h1>
   - images without alt or width/height
   - internal links without a trailing slash, leftover [square brackets]
   Exits with an error if anything fails, so it can stop a bad deploy.
   ========================================================================== */
