/* ==========================================================================
   sync-partials.mjs — Copies shared HTML into every page   (npm run sync)

   Will: read each file in partials/ (header, footer, WhatsApp button,
   scripts), then go through every .html file in site/ and replace whatever
   sits between <!-- PARTIAL:name --> and <!-- /PARTIAL:name --> with the
   latest partial. Edit a partial once → every page updates.
   ========================================================================== */
