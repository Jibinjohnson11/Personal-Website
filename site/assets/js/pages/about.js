/* ==========================================================================
   pages/about.js — "How I got here" timeline lights up as the thread passes

   Each .story__step gets .is-lit when its top reaches 60% down the screen,
   the same spot as the thread's tip (thread.js), so the big numbers
   brighten one by one as the line hooks into each step.
   about.css does the fade (opacity only).

   Nothing here adds content: all text is already in the HTML.
   Without JavaScript, or with reduced motion, the numbers are simply
   shown at full brightness (see about.css).
   ========================================================================== */

(function () {
  "use strict";

  if (!window.gsap || !window.ScrollTrigger) return;

  const reduced = window.site ? window.site.reducedMotion : false;
  if (reduced) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray("[data-story] .story__step").forEach(function (step) {
    ScrollTrigger.create({
      trigger: step,
      start: "top 60%",
      end: "max",   // stays lit once reached; scrolling back above dims it
      toggleClass: { targets: step, className: "is-lit" }
    });
  });
})();
