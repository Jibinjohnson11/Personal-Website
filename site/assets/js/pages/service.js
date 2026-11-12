/* ==========================================================================
   pages/service.js — The "distinctive moment" on each service page

   Each block below runs only if its data attribute is on the page, so one
   file serves every service page:

     [data-split]     /services/                 two panels slide together
     [data-benefits]  /services/web-development/ pinned "What you get" index
     [data-process]   /services/seo/             process line drawn on scroll
     [data-areas]     Trivandrum pages and       area names (or journey steps)
                      /seo-for-healthcare-clinics/ light up as the thread
                                                 passes them
     [data-searches]  /seo-for-education-institutes/ course searches light
                                                 up the same way
     [data-launch]    /web-design-for-startups/  launch timeline drawn on
                                                 scroll

   Rules (same as motion.js):
   - Nothing here adds content; all text is already in the HTML.
   - Only transform and opacity are animated (CSS transitions handle the
     class changes; GSAP handles the scrubbed transforms).
   - Reduced motion: no pins, no scrubs. Without JavaScript every block is
     a normal, fully visible layout (see pages/service.css).

   gsap.matchMedia() runs a setup only while its media query matches and
   undoes it (pins, transforms) when it stops matching, e.g. on resize.

   Contents
   1. Setup
   2. Split panels (/services/)
   3. Pinned benefits index (/services/web-development/)
   4. Process line (/services/seo/)
   5. Lists that light up as the thread passes (areas, journey, searches)
   6. Launch timeline (/web-design-for-startups/)
   ========================================================================== */

(function () {
  "use strict";


  /* ------------------------------------------------------------------------
     1. SETUP
     ------------------------------------------------------------------------ */

  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  const reduced = window.site ? window.site.reducedMotion : false;
  const mm = gsap.matchMedia();

  // Same queries as the CSS: desktop, and "motion is allowed"
  const DESKTOP_MOTION = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";


  /* ------------------------------------------------------------------------
     2. SPLIT PANELS  (/services/)
     Desktop only. While the section scrolls up from the bottom of the
     screen, the left panel slides in from the left and the right panel
     from the right; they meet at the seam, the seam line draws down and
     the "&" disc grows in. Scrubbed: it follows the scrollbar.
     ------------------------------------------------------------------------ */

  const split = document.querySelector("[data-split]");

  if (split) {
    const left = split.querySelector("[data-split-left]");
    const right = split.querySelector("[data-split-right]");
    const amp = split.querySelector("[data-split-amp]");

    mm.add(DESKTOP_MOTION, function () {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: split,
          start: "top 95%",   // section's top just inside the screen…
          end: "top 30%",     // …until it is near the top
          scrub: 1            // 1s of smoothing behind the scrollbar
        }
      });

      timeline
        .from(left, { xPercent: -14, ease: "none" }, 0)
        .from(right, { xPercent: 14, ease: "none" }, 0)
        .from(amp, { scale: 0.4, rotate: -45, ease: "none" }, 0.2);
    });
  }


  /* ------------------------------------------------------------------------
     3. PINNED BENEFITS INDEX  (/services/web-development/)
     Desktop with motion: adds .service-benefits--pinned (service.css lays
     the list out as a big index + one text panel), pins the section's
     .container, and while you scroll it makes each benefit active in turn.
     Only if the pinned layout FITS the screen; otherwise (short laptop
     screens) the normal grid stays and nothing is pinned.
     ------------------------------------------------------------------------ */

  const benefitsSection = document.querySelector("[data-benefits]");

  if (benefitsSection) {
    const list = benefitsSection.querySelector(".service-benefits");
    const items = gsap.utils.toArray(".service-benefit", list);
    const fill = benefitsSection.querySelector("[data-benefits-fill]");
    const header = document.querySelector("[data-header]");

    // What gets pinned: the .container, not the section, so the section
    // stays as tall as the pinned stretch (the ivory background and the
    // header theme in motion.js watch the section's top and bottom)
    const pinBox = benefitsSection.querySelector(".container");

    // Make benefit number "index" active, all others inactive
    function setActive(index) {
      items.forEach(function (item, i) {
        item.classList.toggle("is-active", i === index);
      });
    }

    function turnOff() {
      list.classList.remove("service-benefits--pinned");
      benefitsSection.classList.remove("service-benefits-section--pinned");
      items.forEach(function (item) { item.classList.remove("is-active"); });
    }

    mm.add(DESKTOP_MOTION, function () {
      list.classList.add("service-benefits--pinned");
      benefitsSection.classList.add("service-benefits-section--pinned");

      // Does the pinned block fit between the header and the bottom of the
      // screen (with the header's height of air at the bottom too)?
      const headerHeight = header ? header.offsetHeight : 0;
      if (pinBox.offsetHeight > window.innerHeight - headerHeight * 2) {
        turnOff();
        return;
      }

      setActive(0);

      ScrollTrigger.create({
        trigger: pinBox,
        // Pin when the block is centred on the screen
        start: "center center",
        // Half a screen of scrolling per benefit
        end: function () { return "+=" + items.length * window.innerHeight * 0.5; },
        pin: true,
        invalidateOnRefresh: true,
        // This pin adds scroll length, so it must be measured before the
        // triggers motion.js already made (see the same note in home.js)
        refreshPriority: 1,
        onUpdate: function (self) {
          // progress 0 → 1 split into equal steps, one per benefit
          const index = Math.min(items.length - 1, Math.floor(self.progress * items.length));
          setActive(index);
          if (fill) gsap.set(fill, { scaleX: self.progress });
        }
      });

      ScrollTrigger.sort();
      ScrollTrigger.refresh();

      // Cleanup when the query stops matching (GSAP removes the pin itself)
      return turnOff;
    });
  }


  /* ------------------------------------------------------------------------
     4. PROCESS LINE  (/services/seo/)
     All screen sizes, motion allowed. The burgundy line grows down from
     the section label as the block passes 60% down the screen (the same
     spot where the page's thread has its tip), and each step is marked
     .is-reached when the line gets to it. Reduced motion: nothing runs;
     the CSS shows the line fully drawn.
     ------------------------------------------------------------------------ */

  const process = document.querySelector("[data-process]");

  if (process && !reduced) {
    const line = process.querySelector("[data-process-fill]");
    const steps = gsap.utils.toArray("[data-process-step]", process);

    gsap.fromTo(line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: process,
          start: "top 60%",
          end: "bottom 60%",
          scrub: true
        }
      });

    // Distance from a step's top to the centre of its ring marker (the
    // ::before in service.css), so the step lights up exactly when the
    // line's tip reaches the marker. Re-measured on every refresh.
    function markerCentre(step) {
      const marker = getComputedStyle(step, "::before");
      return parseFloat(marker.top) + parseFloat(marker.height) / 2;
    }

    steps.forEach(function (step) {
      ScrollTrigger.create({
        trigger: step,
        start: function () { return "top+=" + markerCentre(step) + " 60%"; },
        onEnter: function () { step.classList.add("is-reached"); },
        onLeaveBack: function () { step.classList.remove("is-reached"); }
      });
    });
  }


  /* ------------------------------------------------------------------------
     5. LISTS THAT LIGHT UP AS THE THREAD PASSES
        [data-areas]    .areas__item     Trivandrum pages (area names) and
                                         the healthcare page (patient journey)
        [data-searches] .searches__item  education page (course searches)
     All screen sizes, motion allowed. Each row gets .is-lit when its
     centre passes 60% down the screen — the same spot as the thread's
     tip — so the rows light up one by one as the thread goes past them.
     service.css does the fade (and, for areas, draws the reach line).
     end: "max" means a row stays lit once reached; scrolling back up above
     it (onLeaveBack) dims it again. Reduced motion: nothing runs and the
     CSS shows every row lit.
     ------------------------------------------------------------------------ */

  if (!reduced) {
    const rows = gsap.utils.toArray("[data-areas] .areas__item, [data-searches] .searches__item");

    rows.forEach(function (row) {
      ScrollTrigger.create({
        trigger: row,
        start: "center 60%",
        end: "max",
        toggleClass: { targets: row, className: "is-lit" }
      });
    });
  }


  /* ------------------------------------------------------------------------
     6. LAUNCH TIMELINE  (/web-design-for-startups/)
     Motion allowed, all screen sizes. The burgundy fill grows along the
     line as the timeline scrolls through the screen (scrubbed):
     - phones/tablets: the line is vertical, so it grows with scaleY
     - desktop (1024px+): the line runs across the top, so scaleX
     Each stop is marked .is-reached once the fill gets to its marker.
     A stop's place on the line (0 = start, 1 = end) is measured from its
     position inside the timeline: offsetTop for the vertical line,
     offsetLeft for the horizontal one. Reduced motion: nothing runs and
     the CSS shows the line fully drawn.
     ------------------------------------------------------------------------ */

  const launch = document.querySelector("[data-launch]");

  if (launch) {
    const launchFill = launch.querySelector("[data-launch-fill]");
    const stops = gsap.utils.toArray("[data-launch-stop]", launch);

    // across = true on desktop (horizontal line), false on smaller screens
    function setupLaunch(across) {
      // Where a stop sits along the line, from 0 to 1
      function stopPoint(stop) {
        if (across) return stop.offsetLeft / launch.offsetWidth;
        return stop.offsetTop / launch.offsetHeight;
      }

      // Mark every stop the fill has reached (progress runs 0 → 1)
      function markStops(progress) {
        stops.forEach(function (stop) {
          stop.classList.toggle("is-reached", progress > 0 && progress >= stopPoint(stop));
        });
      }

      const from = across ? { scaleX: 0 } : { scaleY: 0 };
      const to = across ? { scaleX: 1 } : { scaleY: 1 };

      to.ease = "none";
      to.scrollTrigger = {
        trigger: launch,
        start: "top 60%",                          // where the thread's tip is
        end: across ? "bottom 35%" : "bottom 60%", // the desktop row is short: give it more scroll
        scrub: true,
        onUpdate: function (self) { markStops(self.progress); }
      };

      gsap.fromTo(launchFill, from, to);

      // Cleanup when the query stops matching (e.g. window resized)
      return function () { markStops(0); };
    }

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", function () {
      return setupLaunch(true);
    });

    mm.add("(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)", function () {
      return setupLaunch(false);
    });
  }
})();
