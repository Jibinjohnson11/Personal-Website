/* ==========================================================================
   cursor.js — Custom cursor (mouse/trackpad only)

   A small dot follows the pointer. Over links and buttons it grows; over
   elements with data-cursor="view" (e.g. work cards) it turns into a
   burgundy disc that says "View".

   Contents
   1. Only on mouse/trackpad devices, window ≥ 1024px
   2. Create the two cursor elements
   3. Follow the pointer
   4. Grow over links, "View" over [data-cursor="view"]
   5. Hide when the pointer leaves the window

   How it looks is in motion.css (section 8). This file only moves the
   elements and toggles classes on <html>:
     has-cursor       custom cursor is running (native arrow hidden)
     cursor-visible   pointer is inside the window
     cursor-link      pointer is over a link/button
     cursor-view-on   pointer is over a [data-cursor="view"] element
   ========================================================================== */

(function () {
  "use strict";


  /* ------------------------------------------------------------------------
     1. ONLY ON MOUSE/TRACKPAD DEVICES WITH A DESKTOP-SIZE WINDOW
     Checked BEFORE anything is created: on phones and tablets the cursor
     elements never exist and the normal cursor is never hidden.
     (motion.css repeats the same media query as a second safety net.)
     ------------------------------------------------------------------------ */

  if (!window.site || !window.site.customCursor) return;
  if (!window.gsap) return;

  const root = document.documentElement;
  const reduced = window.site.reducedMotion;


  /* ------------------------------------------------------------------------
     2. CREATE THE TWO CURSOR ELEMENTS
     Decorative, empty elements (the word "View" comes from CSS), hidden
     from screen readers. They are two separate elements because the dot
     uses mix-blend-mode and the "View" disc must not.
     ------------------------------------------------------------------------ */

  function makeCursorPart(className, innerClass) {
    const outer = document.createElement("div");
    outer.className = className;
    outer.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.className = innerClass;
    outer.appendChild(inner);
    document.body.appendChild(outer);
    return outer;
  }

  const dot = makeCursorPart("cursor", "cursor__dot");
  const view = makeCursorPart("cursor-view", "cursor-view__disc");

  root.classList.add("has-cursor");


  /* ------------------------------------------------------------------------
     3. FOLLOW THE POINTER
     gsap.quickTo returns a function that smoothly moves an element to a
     new x/y. The dot follows quickly; the bigger disc lags a little more,
     which feels softer. With reduced motion both jump straight there.
     ------------------------------------------------------------------------ */

  const dotSpeed = reduced ? 0 : 0.15;   // seconds to catch up
  const viewSpeed = reduced ? 0 : 0.35;

  const dotX = gsap.quickTo(dot, "x", { duration: dotSpeed, ease: "power3.out" });
  const dotY = gsap.quickTo(dot, "y", { duration: dotSpeed, ease: "power3.out" });
  const viewX = gsap.quickTo(view, "x", { duration: viewSpeed, ease: "power3.out" });
  const viewY = gsap.quickTo(view, "y", { duration: viewSpeed, ease: "power3.out" });

  let firstMove = true;

  window.addEventListener("pointermove", function (event) {
    // Ignore touch/pen on hybrid laptops; only the mouse drives the cursor
    if (event.pointerType !== "mouse") return;

    // First move: jump straight to the pointer (no slide in from the corner)
    if (firstMove) {
      gsap.set([dot, view], { x: event.clientX, y: event.clientY });
      firstMove = false;
    }

    dotX(event.clientX);
    dotY(event.clientY);
    viewX(event.clientX);
    viewY(event.clientY);

    root.classList.add("cursor-visible");
  }, { passive: true });


  /* ------------------------------------------------------------------------
     4. GROW OVER LINKS, "VIEW" OVER [data-cursor="view"]
     One listener on the whole document ("event delegation"): whenever the
     pointer moves onto a new element, check what it is inside of.
     ------------------------------------------------------------------------ */

  const LINK_SELECTOR = "a[href], button, [role='button'], label, summary, [data-magnetic]";

  document.addEventListener("pointerover", function (event) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const overView = !!target.closest("[data-cursor='view']");
    const overLink = !overView && !!target.closest(LINK_SELECTOR);

    root.classList.toggle("cursor-view-on", overView);
    root.classList.toggle("cursor-link", overLink);
  });


  /* ------------------------------------------------------------------------
     5. HIDE WHEN THE POINTER LEAVES THE WINDOW
     ------------------------------------------------------------------------ */

  // "pointerout" with no relatedTarget = the pointer went to nothing on the
  // page, i.e. it left the browser window
  document.addEventListener("pointerout", function (event) {
    if (!event.relatedTarget) root.classList.remove("cursor-visible");
  });
})();
