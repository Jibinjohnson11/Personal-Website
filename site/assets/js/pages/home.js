/* ==========================================================================
   pages/home.js — Home page only:
   A. the scroll-told story (sketch → website → found)
   B. the pinned horizontal work gallery, with its "01 / 04" counter
      and progress line

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


  /* ------------------------------------------------------------------------
     A. STORY — three beats: a wireframe draws itself, fills into a
     finished page, then a search result rises in with a "Found ✓" tag.

     Desktop (≥1024px, motion allowed): adds .story--pinned (home.css
     stacks the illustrations), pins the section's .container and plays
     one timeline while you scroll (scrub). Captions brighten one at a
     time and the burgundy thread fills down the left (scaleY).
     Smaller screens: the steps stay stacked; motion.js fades them in
     ([data-reveal]) and here we only draw the wireframe once.
     Reduced motion / no JavaScript: nothing runs; everything is visible.

     Note: motion.js animates the [data-reveal] elements (captions and the
     inner <svg>/card). This timeline animates OTHER elements (the caption
     text spans and the .story__art wrappers), so they never fight.
     ------------------------------------------------------------------------ */

  const story = document.querySelector("[data-story]");
  const storyMM = gsap.matchMedia();

  if (story) {
    const storyPin = story.querySelector(".container");
    const texts = gsap.utils.toArray(".story__caption-text", story);
    const arts = gsap.utils.toArray(".story__art", story);
    const strokes = gsap.utils.toArray(".story__wire > *", story);
    const tag = story.querySelector("[data-story-tag]");
    const fill = story.querySelector("[data-story-fill]");
    const DIM = 0.3;   // opacity of the captions that aren't "now"

    storyMM.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", function () {
      story.classList.add("story--pinned");

      // Starting state: beat 1 only, wireframe undrawn, thread empty
      gsap.set(texts.slice(1), { opacity: DIM });
      gsap.set(arts.slice(1), { opacity: 0 });
      gsap.set(arts[2], { y: 60 });
      gsap.set(strokes, { strokeDashoffset: 1 });
      gsap.set(tag, { opacity: 0, scale: 0.6 });
      gsap.set(fill, { scaleY: 0 });

      // Times are in "beats": 0–1.3 sketch, 1.3–2.4 website, 2.4+ found.
      // With scrub the timeline's length is spread over the pinned scroll.
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: storyPin,
          start: "top top",
          end: "+=250%",             // 2.5 screen heights of scrolling
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: 2         // above the work gallery pin: measure first
        }
      })
        // Beat 1: the sketch draws itself; the thread fills all the way
        .to(strokes, { strokeDashoffset: 0, duration: 0.4, stagger: 0.06 }, 0)
        .to(fill, { scaleY: 1, duration: 2.6 }, 0)

        // Beat 2: the sketch fills into the finished page
        .to(texts[0], { opacity: DIM, duration: 0.3 }, 1.3)
        .to(texts[1], { opacity: 1, duration: 0.3 }, 1.3)
        .to(arts[0], { opacity: 0, duration: 0.4 }, 1.3)
        .fromTo(arts[1], { scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.4 }, 1.3)

        // Beat 3: the page steps back, the search result rises in
        .to(texts[1], { opacity: DIM, duration: 0.3 }, 2.4)
        .to(texts[2], { opacity: 1, duration: 0.3 }, 2.4)
        .to(arts[1], { opacity: 0, y: -40, duration: 0.4 }, 2.4)
        .to(arts[2], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 2.4)
        .to(tag, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, 2.9)

        // A short hold on the last beat before the pin lets go
        .to({}, { duration: 0.4 });

      return function () {
        story.classList.remove("story--pinned");
      };
    });

    storyMM.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", function () {
      if (!strokes.length) return;
      gsap.fromTo(strokes, { strokeDashoffset: 1 }, {
        strokeDashoffset: 0,
        duration: 1.4,
        stagger: 0.06,
        ease: "power2.inOut",
        scrollTrigger: { trigger: strokes[0].ownerSVGElement, start: "top 80%", once: true }
      });
    });
  }


  /* ------------------------------------------------------------------------
     B. SELECTED WORK — pinned horizontal gallery
     ------------------------------------------------------------------------ */

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
