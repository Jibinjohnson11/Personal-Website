/* ==========================================================================
   main.js — Small, general behaviour for every page

   0. Shared settings (window.site) read by motion.js, thread.js, cursor.js
   1. Footer year
   2. Floating WhatsApp button: shows after scrolling past the hero

   Still to come: GA4 click tracking for WhatsApp / resume download (loaded
   after the first user interaction so it doesn't slow the page).

   Rule: this file never injects content — all text lives in the HTML.
   ========================================================================== */

(function () {
  "use strict";


  /* ------------------------------------------------------------------------
     0. SHARED SETTINGS
     Answered once here, so every motion file asks the same questions the
     same way. main.js loads before the motion files (see partials/scripts.html).
     - reducedMotion: the visitor asked their device for less motion
     - finePointer:   a real mouse or trackpad (not a finger)
     - customCursor:  fine pointer AND a desktop-size window (≥ 1024px);
                      the only case where cursor.js runs
     ------------------------------------------------------------------------ */

  window.site = {
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    finePointer: window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    customCursor: window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches
  };


  /* ------------------------------------------------------------------------
     1. FOOTER YEAR
     The year is already written in the HTML; this only updates it if the
     page was last synced in an earlier year.
     ------------------------------------------------------------------------ */

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());


  /* ------------------------------------------------------------------------
     2. FLOATING WHATSAPP BUTTON
     Shown only when BOTH are true:
     - the hero (or, on pages without one, the first section of <main>) has
       scrolled out of view ABOVE the screen
     - no [data-whatsapp-hide] area is on screen. These are places that
       already have their own WhatsApp link: the footer and final CTA blocks.
     Hidden = no .is-visible class. The CSS then fades it out and sets
     visibility: hidden, which also takes it out of the Tab order and away
     from screen readers (components.css, section 11).
     ------------------------------------------------------------------------ */

  const waButton = document.querySelector("[data-whatsapp-float]");
  const hero = document.querySelector(".hero") || document.querySelector("main section");
  const hideZones = document.querySelectorAll("[data-whatsapp-hide]");

  if (waButton && hero && "IntersectionObserver" in window) {
    let pastHero = false;
    const zonesInView = new Set();   // the hide areas currently on screen

    function update() {
      waButton.classList.toggle("is-visible", pastHero && zonesInView.size === 0);
    }

    new IntersectionObserver(function (entries) {
      const entry = entries[0];
      // Not intersecting AND its top is above the screen = we are past it
      pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      update();
    }).observe(hero);

    const zoneObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) zonesInView.add(entry.target);
        else zonesInView.delete(entry.target);
      });
      update();
    });
    hideZones.forEach(function (zone) { zoneObserver.observe(zone); });
  } else if (waButton) {
    waButton.classList.add("is-visible"); // nothing to watch: just show it
  }
})();
