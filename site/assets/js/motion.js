/* ==========================================================================
   motion.js — Page animations with GSAP, ScrollTrigger, SplitText and Lenis

   Pages don't need their own JavaScript: add a data attribute in the HTML
   and this file animates it.

     data-reveal            fade + move up when it enters the screen
     data-reveal="lines"    headline slides up line by line from a mask
     data-words             words brighten from mute to full as you scroll
     data-parallax          image drifts gently inside its frame
                            (optional strength in %, e.g. data-parallax="12")
     data-magnetic          button leans toward the mouse (desktop only)
     data-bg="paper"/"ink"  page background crossfades when the section enters

   Contents
   1. Setup (and a safety net if the libraries fail to load)
   2. Lenis smooth scrolling, connected to GSAP and ScrollTrigger
   3. [data-reveal]          fade + move up
   4. [data-reveal="lines"]  line-by-line headline
   5. [data-words]           words brighten on scroll
   6. [data-parallax]        image parallax
   7. [data-magnetic]        magnetic buttons
   8. [data-bg]              background crossfade
   8b. Header theme follows the section behind it (ink or paper)
   9. Recalculate after fonts load

   Reduced motion: no Lenis, no pinning, no scrubbing — only simple fades.
   Only transform and opacity are animated. All text is already in the
   HTML; this file never adds content.
   ========================================================================== */

(function () {
  "use strict";


  /* ------------------------------------------------------------------------
     1. SETUP
     ------------------------------------------------------------------------ */

  const root = document.documentElement;

  // Safety net: if GSAP didn't load, the CSS hidden states would keep
  // content invisible forever. .no-motion switches them off (motion.css).
  if (!window.gsap || !window.ScrollTrigger || !window.SplitText) {
    root.classList.add("no-motion");
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText);

  const reduced = window.site ? window.site.reducedMotion : false;
  const finePointer = window.site ? window.site.finePointer : false;

  // Shared timing, matching the tokens in tokens.css (--dur-*, --stagger)
  const DUR_REVEAL = 0.6;
  const DUR_HERO = 0.9;
  const STAGGER = 0.06;
  const MOVE_UP = 40;          // px that [data-reveal] travels upward
  const START = "top 85%";     // "when the element's top reaches 85% down the screen"

  // True if the element is already on screen when the page loads (e.g. the
  // hero). Those animate straight away instead of waiting for ScrollTrigger,
  // so the H1 is readable within ~0.6s.
  function onScreenNow(el) {
    return el.getBoundingClientRect().top < window.innerHeight;
  }


  /* ------------------------------------------------------------------------
     2. LENIS SMOOTH SCROLLING
     Lenis smooths the native scroll. GSAP's ticker drives it (one animation
     loop for everything), and every Lenis scroll tells ScrollTrigger to
     update. Exposed as window.lenis so menu.js can stop/start it while the
     mobile menu is open.
     ------------------------------------------------------------------------ */

  if (!reduced && window.Lenis) {
    const lenis = new Lenis({
      autoRaf: false   // we call lenis.raf() ourselves from the GSAP ticker
    });

    lenis.on("scroll", ScrollTrigger.update);

    // GSAP gives time in seconds; Lenis wants milliseconds
    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });

    // Don't let GSAP "catch up" after a slow frame (would make scroll jump)
    gsap.ticker.lagSmoothing(0);

    window.lenis = lenis;
  }


  /* ------------------------------------------------------------------------
     3. [data-reveal] — FADE + MOVE UP
     The CSS starts these at opacity 0. Here we also push them down a little
     (not with reduced motion), then bring them up as they enter the screen.
     ScrollTrigger.batch groups items that enter together so they appear one
     after another (stagger) instead of all at once.
     With reduced motion, [data-reveal="lines"] is treated the same way:
     a plain fade, no line splitting.
     ------------------------------------------------------------------------ */

  const revealSelector = reduced ? "[data-reveal]" : "[data-reveal]:not([data-reveal='lines'])";
  const revealItems = gsap.utils.toArray(revealSelector);

  function showItems(items) {
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: DUR_REVEAL,
      ease: "expo.out",
      stagger: STAGGER,
      overwrite: true
    });
  }

  if (revealItems.length) {
    // Sort BEFORE moving anything down: an item just above the bottom of
    // the screen (e.g. the hero buttons) would otherwise be pushed below
    // it by MOVE_UP and wrongly wait for a scroll.
    const onScreen = revealItems.filter(onScreenNow);
    const later = revealItems.filter(function (el) { return !onScreenNow(el); });

    gsap.set(revealItems, { y: reduced ? 0 : MOVE_UP });

    // Already visible on load → show now. The rest → when they scroll in.
    showItems(onScreen);

    ScrollTrigger.batch(later, {
      start: START,
      once: true,         // animate once; never hide again
      onEnter: showItems
    });
  }


  /* ------------------------------------------------------------------------
     4. [data-reveal="lines"] — HEADLINE LINE BY LINE
     SplitText wraps each line in a mask (overflow: clip), and we slide each
     line up from below its mask.
     - aria: "auto" puts the full original sentence in an aria-label on the
       heading and hides the line wrappers from screen readers, so assistive
       tech reads one normal sentence. The words also stay in the HTML, so
       Google reads them as usual.
     - autoSplit re-splits when fonts load or the width changes (lines break
       in new places). onSplit returns the animation, so SplitText can swap
       in a fresh one and keep its progress.
     ------------------------------------------------------------------------ */

  if (!reduced) {
    gsap.utils.toArray("[data-reveal='lines']").forEach(function (el) {
      const startNow = onScreenNow(el);

      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",   // the masks get "split-line-mask"
        aria: "auto",
        autoSplit: true,
        onSplit: function (self) {
          // The heading itself becomes visible; the lines are hidden by
          // sitting below their masks until the animation runs.
          gsap.set(el, { opacity: 1 });

          return gsap.from(self.lines, {
            yPercent: 110,
            duration: DUR_HERO,
            ease: "expo.out",
            stagger: STAGGER * 2,
            // Hero: plays immediately. Others: when they scroll in.
            scrollTrigger: startNow ? null : { trigger: el, start: START, once: true }
          });
        }
      });
    });
  }


  /* ------------------------------------------------------------------------
     5. [data-words] — WORDS BRIGHTEN AS YOU SCROLL
     Text is written in the normal colour (--paper on ink). Each word starts
     at 62% opacity, which on ink looks the same as --mute (#A1A1A1), and
     reaches full opacity in reading order as the paragraph moves up the
     screen. Opacity instead of colour = only transform/opacity animated.
     Reduced motion: skipped (no scrubbing) — the text is simply full colour.
     aria: "none": SplitText adds no aria-label here. [data-words] is usually
     a <p>, and aria-label is not allowed on a plain paragraph (Lighthouse
     flags it). Splitting into words only adds inline <span>s, so screen
     readers still read the sentence normally.
     ------------------------------------------------------------------------ */

  if (!reduced) {
    gsap.utils.toArray("[data-words]").forEach(function (el) {
      SplitText.create(el, {
        type: "words",
        aria: "none",
        autoSplit: true,
        onSplit: function (self) {
          return gsap.fromTo(self.words,
            { opacity: 0.62 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: {
                trigger: el,
                start: "top 80%",   // starts when the paragraph enters
                end: "bottom 50%",  // done when its end reaches mid-screen
                scrub: true         // tied directly to the scroll position
              }
            });
        }
      });
    });
  }


  /* ------------------------------------------------------------------------
     6. [data-parallax] — GENTLE IMAGE PARALLAX
     The element is a frame (overflow: hidden in motion.css). Its first child
     moves from -amount% to +amount% of its height while the frame crosses
     the screen, and is scaled up just enough that its edges never show.
     Reduced motion: skipped (it is a scrub).
     ------------------------------------------------------------------------ */

  if (!reduced) {
    gsap.utils.toArray("[data-parallax]").forEach(function (frame) {
      const media = frame.firstElementChild;
      if (!media) return;

      const amount = parseFloat(frame.dataset.parallax) || 8; // default 8%

      gsap.fromTo(media,
        { yPercent: -amount, scale: 1 + (amount * 2.2) / 100 },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",  // frame's top enters from the bottom…
            end: "bottom top",    // …until its bottom leaves at the top
            scrub: true
          }
        });
    });
  }


  /* ------------------------------------------------------------------------
     7. [data-magnetic] — MAGNETIC BUTTONS (mouse only)
     While the mouse is over the button, the button moves 30% of the way
     toward the pointer. On leave it springs back to its place.
     gsap.quickTo makes a reusable, smooth "move x/y to" function.
     ------------------------------------------------------------------------ */

  if (!reduced && finePointer) {
    const PULL = 0.3;

    gsap.utils.toArray("[data-magnetic]").forEach(function (el) {
      const moveX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const moveY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

      el.addEventListener("pointermove", function (event) {
        const box = el.getBoundingClientRect();
        // Distance from the button's centre to the pointer
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        moveX(dx * PULL);
        moveY(dy * PULL);
      });

      el.addEventListener("pointerleave", function () {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)", overwrite: true });
      });
    });
  }


  /* ------------------------------------------------------------------------
     8. [data-bg] — BACKGROUND CROSSFADE
     One fixed paper layer (.bg-fade) sits behind the whole page. [data-bg]
     sections are transparent (motion.css), so the layer shows through.
     When a [data-bg="paper"] section reaches the middle of the screen the
     layer fades in; when a [data-bg="ink"] section does, it fades out.
     This is a short timed fade (not a scrub), so it also runs — gently —
     with reduced motion.
     The layer is an empty decorative <div>; no content is added.
     <html> gets .bg-ink or .bg-paper to say what the layer is right now.
     motion.css uses it to (a) make [data-bg] sections transparent and
     (b) give them the matching text colours, so text never ends up ink on
     ink (or paper on paper) next to a section boundary.
     ------------------------------------------------------------------------ */

  const bgSections = gsap.utils.toArray("[data-bg]");
  let layerIsPaper = false;          // read by the header code in 8b
  let onLayerChange = function () {}; // 8b replaces this to restyle the header

  if (bgSections.length) {
    const layer = document.createElement("div");
    layer.className = "bg-fade";
    layer.setAttribute("aria-hidden", "true");
    document.body.prepend(layer);
    root.classList.add("bg-ink");    // the layer starts invisible = ink

    // After ANY section enters or leaves, ask one question: "is a paper
    // section in the middle of the screen right now?" Yes → ivory, no → ink.
    // (Only reacting to sections that ENTER left the layer stuck on ivory
    // when you scrolled back up into sections without data-bg, like the
    // hero — and the transparent header at the top showed it.)
    const paperTriggers = [];

    const updateLayer = function () {
      const overPaper = paperTriggers.some(function (t) { return t.isActive; });
      layerIsPaper = overPaper;
      root.classList.toggle("bg-paper", overPaper);
      root.classList.toggle("bg-ink", !overPaper);
      onLayerChange();
      gsap.to(layer, {
        opacity: overPaper ? 1 : 0,
        duration: DUR_REVEAL,
        ease: "power2.out",
        overwrite: true
      });
    };

    bgSections.forEach(function (section) {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 50%",     // section's top passes the middle of the screen
        end: "bottom 50%",    // until its bottom passes the middle
        onToggle: updateLayer
      });
      if (section.dataset.bg === "paper") paperTriggers.push(trigger);
    });
  }


  /* ------------------------------------------------------------------------
     8b. HEADER THEME FOLLOWS WHAT IS BEHIND IT
     The header is see-through, so it must match the section underneath:
     while an ivory section ([data-bg="paper"] or .section--paper) is behind
     the middle of the header, add .site-header--light (ink text, paper
     glass — see components.css). Otherwise the normal dark theme is used.
     Several ivory sections can exist, so after any change we ask "is ANY
     of them behind the header right now?".
     [data-bg] sections (ink or paper) show whatever the crossfade layer
     is (section 8), so behind the header they count as ivory only while
     the layer is paper. Plain .section--paper sections are always ivory.
     ------------------------------------------------------------------------ */

  const header = document.querySelector("[data-header]");
  const watchSections = gsap.utils.toArray("[data-bg], .section--paper");

  if (header && watchSections.length) {
    const headerTriggers = [];

    const updateHeaderTheme = function () {
      const overPaper = headerTriggers.some(function (t) {
        if (!t.isActive) return false;
        return t.trigger.hasAttribute("data-bg") ? layerIsPaper : true;
      });
      header.classList.toggle("site-header--light", overPaper);
    };

    onLayerChange = updateHeaderTheme;

    watchSections.forEach(function (section) {
      headerTriggers.push(ScrollTrigger.create({
        trigger: section,
        // Functions, so the header height is measured again on every refresh.
        // "top 36" = the section's top reaches 36px from the screen top
        // (the middle of a 72px header).
        start: function () { return "top " + header.offsetHeight / 2; },
        end: function () { return "bottom " + header.offsetHeight / 2; },
        onToggle: updateHeaderTheme
      }));
    });
  }


  /* ------------------------------------------------------------------------
     9. RECALCULATE AFTER FONTS LOAD
     Boska/Switzer change text heights slightly when they arrive, which moves
     every section. Refreshing makes ScrollTrigger (and thread.js, which
     listens for "refresh") measure the final layout.
     ------------------------------------------------------------------------ */

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      ScrollTrigger.refresh();
    });
  }
})();
