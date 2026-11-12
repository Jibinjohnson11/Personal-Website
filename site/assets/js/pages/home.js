/* ==========================================================================
   pages/home.js — Home page only: the pinned horizontal work gallery,
   with its "01 / 04" counter and progress line

   On desktop (≥ 1024px) with motion allowed:
   - adds .work--horizontal to the Selected work section (home.css lays the
     cards out in one row)
   - pins the section's content to the screen and, while you scroll down, moves the
     row of cards to the left until the last item reaches the right edge
   Everywhere else (phones, tablets, reduced motion, no JavaScript) the
   cards stay in the normal grid from home.css. Nothing here adds content.

   gsap.matchMedia() runs the setup only while the media query matches,
   and automatically undoes it (removes the pin, resets the transform)
   when it stops matching, e.g. when the window is made narrower.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.gsap || !window.ScrollTrigger) return;

  const section = document.querySelector("[data-work]");
  const track = section ? section.querySelector("[data-work-track]") : null;
  if (!track) return;

  // The visible width the track scrolls inside (the container's content box)
  const viewport = track.parentElement;

  // What gets pinned: the section's .container, NOT the section itself.
  // GSAP adds the pinned scroll distance as padding around the pinned
  // element; inside the section, that keeps the section as tall as the
  // whole pinned stretch, so motion.js's ivory background and header
  // theme (which watch the section's top and bottom) stay correct.
  const pinBox = section.querySelector(".container");

  // How far the track must move so its last item ends at the right edge
  function distance() {
    return Math.max(0, track.scrollWidth - viewport.clientWidth);
  }

  // Gallery hint: "01 / 04" counter and a progress line under the cards.
  // The "04" is written in the HTML; only the current number changes here.
  const currentEl = section.querySelector("[data-work-current]");
  const fillEl = section.querySelector("[data-work-fill]");
  const cardCount = track.querySelectorAll(".work-card").length;

  // progress: 0 at the start of the gallery, 1 at the end
  function updateHint(progress) {
    if (fillEl) gsap.set(fillEl, { scaleX: progress });

    if (currentEl && cardCount) {
      // Card 1 at the start, the last card at the end, evenly in between
      const index = Math.round(progress * (cardCount - 1)) + 1;
      const text = String(index).padStart(2, "0");   // 1 → "01"
      if (currentEl.textContent !== text) currentEl.textContent = text;
    }
  }

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", function () {
    section.classList.add("work--horizontal");

    gsap.to(track, {
      x: function () { return -distance(); },
      ease: "none",
      scrollTrigger: {
        trigger: pinBox,
        start: "top top",
        // Scroll exactly as far down as the track moves sideways
        end: function () { return "+=" + distance(); },
        pin: true,
        scrub: 1,                  // 1s of smoothing behind the scrollbar
        invalidateOnRefresh: true, // re-measure after resizes and font loads
        // motion.js made its ScrollTriggers (background crossfade, reveals)
        // BEFORE this pin existed. The pin adds scroll length, so it must be
        // measured first, or every trigger below it fires too early (e.g.
        // the page turns ink while the gallery is still pinned).
        refreshPriority: 1,
        onUpdate: function (self) { updateHint(self.progress); }
      }
    });

    // Re-order all ScrollTriggers (pin first) and re-measure them
    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    // Cleanup when the query stops matching (GSAP undoes the tween itself)
    return function () {
      section.classList.remove("work--horizontal");
      updateHint(0);
    };
  });
})();
