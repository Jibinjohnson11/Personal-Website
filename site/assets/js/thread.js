/* ==========================================================================
   thread.js — The signature burgundy "thread"

   One thin SVG line that draws itself down the page as you scroll.
   Route:
   - it runs down a "rail" in the LEFT GUTTER (the empty margin left of the
     content column), so it never crosses headings, text, buttons or images
   - at each section label it curves in to touch the start of the label's
     own little wine line, then curves back out to the rail
   - between labels it sways gently, but only inside the gutter
   - it starts a little above the first (hero) label and ends exactly at
     the last label: no loose tail
   It also sits behind the content (z-index, see motion.css), so if it ever
   touches something, the text stays on top.

   How the drawing works
   - A path's stroke can be dashed. With one dash as long as the whole path
     (stroke-dasharray = length) and the dash pushed away by the same amount
     (stroke-dashoffset = length), nothing shows. Lowering the offset reveals
     the line from its start.
   - ScrollTrigger reports the scroll position. We find how much of the path
     lies above a point 60% down the screen, and reveal exactly that much —
     so the line's tip always sits just below the middle of the screen.

   Contents
   1. Setup
   2. Measuring (element positions on the page)
   3. Building the path
   4. Drawing on scroll
   5. Rebuild when the layout changes

   Hidden below 768px (CSS + a check here), where it would cross the text.
   Reduced motion: the line is drawn once, in full, with no scrubbing.
   The SVG is decorative (aria-hidden) and contains no content.
   ========================================================================== */

(function () {
  "use strict";

  if (!window.gsap || !window.ScrollTrigger) return;

  const main = document.querySelector("main");
  if (!main) return;


  /* ------------------------------------------------------------------------
     1. SETUP
     ------------------------------------------------------------------------ */

  const reduced = window.site ? window.site.reducedMotion : false;
  const wideScreen = window.matchMedia("(min-width: 768px)");

  const TIP = 0.6;          // the line's tip follows 60% down the screen
  const SAMPLE_STEP = 16;   // px between measured points along the path

  // The SVG namespace is needed to create SVG elements from JavaScript
  const NS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "thread");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");

  const path = document.createElementNS(NS, "path");
  path.setAttribute("class", "thread__path");
  svg.appendChild(path);

  document.body.appendChild(svg);

  // Filled in by build(): total path length, and a list of
  // [length along the path, y on the page] pairs used by draw()
  let pathLength = 0;
  let samples = [];


  /* ------------------------------------------------------------------------
     2. MEASURING
     offsetTop/offsetLeft ignore transforms, so a label that is still moved
     down by its reveal animation is measured at its final, resting place.
     We add them up through each offsetParent to get page coordinates.
     ------------------------------------------------------------------------ */

  function pagePosition(el) {
    let x = 0;
    let y = 0;
    let node = el;
    while (node) {
      x += node.offsetLeft;
      y += node.offsetTop;
      node = node.offsetParent;
    }
    return { x: x, y: y };
  }


  /* ------------------------------------------------------------------------
     3. BUILDING THE PATH
     All x positions stay between the screen edge and the content column:
       contentX  where the content (and every label) starts
       railX     the middle of the left gutter — the line's "home"
       sway      how far it may drift left/right of the rail (kept small,
                 so it never reaches the screen edge or the content)
     For every label:
       1. come down the rail to just above the label (gentle S-sway)
       2. curve right into the label's start point ("hook in")
       3. curve back out to the rail just below it (skipped for the last
          label, so the line ends there)
     Every piece only ever moves DOWN the page, which draw() relies on.
     ------------------------------------------------------------------------ */

  const HOOK = 48;        // px above/below a label where the curve into it starts
  const LEAD_IN = 200;    // px of rail drawn above the first label

  function build() {
    // Phones: nothing to draw (CSS hides the SVG too)
    if (!wideScreen.matches) {
      path.removeAttribute("d");
      pathLength = 0;
      return;
    }

    // Collapse the SVG first so it never props the page open while measuring
    svg.style.height = "0px";

    // A label can opt out with data-thread-skip, e.g. the right-hand panel
    // label on /services/ (the line would have to cross the left panel)
    const labels = Array.from(main.querySelectorAll(".label:not([data-thread-skip])"));
    if (!labels.length) return;

    // Label start points: left edge of the label (= start of its wine
    // line), vertically centred on the label text
    const points = labels.map(function (label) {
      const pos = pagePosition(label);
      return { x: pos.x, y: pos.y + label.offsetHeight / 2 };
    });

    // The gutter = the label container's left padding
    const container = labels[0].closest(".container") || main;
    const gutter = parseFloat(getComputedStyle(container).paddingLeft) || 0;
    const contentX = points[0].x;
    const railX = contentX - gutter / 2;
    const sway = Math.min(gutter * 0.25, 24);

    // Start: above the first label, but never above the top of <main>
    // (i.e. never behind the header area of the page)
    const firstY = points[0].y;
    const startY = Math.max(pagePosition(main).y + HOOK, firstY - LEAD_IN);

    let d = "M " + railX + " " + startY;
    let y = startY;   // where the rail currently is

    points.forEach(function (point, i) {
      const isLast = i === points.length - 1;
      const hookTop = point.y - HOOK;

      // 1. Down the rail to just above the label. A cubic curve whose two
      //    handles lean opposite ways gives a soft S inside the gutter.
      if (hookTop > y) {
        const third = (hookTop - y) / 3;
        const lean = i % 2 ? sway : -sway;  // alternate the S direction
        d += " C " +
          (railX + lean) + " " + (y + third) + ", " +
          (railX - lean) + " " + (hookTop - third) + ", " +
          railX + " " + hookTop;
      }

      // 2. Hook in: from the rail, curve down and right into the label's
      //    start point. (Quadratic curve; its handle sits on the rail at
      //    the label's height, so it arrives moving sideways, like the
      //    label's own wine line continuing.)
      d += " Q " + railX + " " + point.y + ", " + point.x + " " + point.y;

      if (isLast) return; // end exactly at the last label

      // 3. Hook out: back to the rail, just below the label
      d += " Q " + railX + " " + point.y + ", " + railX + " " + (point.y + HOOK);
      y = point.y + HOOK;
    });

    path.setAttribute("d", d);
    const lastY = points[points.length - 1].y;
    svg.style.height = lastY + HOOK + "px";

    // Measure the finished path
    pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;

    // Sample the path: which y (page height) is reached after each length?
    // The path only ever goes downward, so y grows along the list.
    samples = [];
    for (let len = 0; len <= pathLength; len += SAMPLE_STEP) {
      samples.push([len, path.getPointAtLength(len).y]);
    }
    samples.push([pathLength, path.getPointAtLength(pathLength).y]);

    draw(window.scrollY);
  }


  /* ------------------------------------------------------------------------
     4. DRAWING ON SCROLL
     Given the scroll position, find the length of path above the "tip"
     line (60% down the screen) and reveal that much.
     ------------------------------------------------------------------------ */

  // Length of path whose y is at or above targetY.
  // Binary search: halve the list until we find the two samples around
  // targetY, then blend between them for a smooth result.
  function lengthAtY(targetY) {
    if (!samples.length || targetY <= samples[0][1]) return 0;
    const last = samples[samples.length - 1];
    if (targetY >= last[1]) return pathLength;

    let low = 0;
    let high = samples.length - 1;
    while (high - low > 1) {
      const mid = (low + high) >> 1;  // >> 1 = divide by 2, rounded down
      if (samples[mid][1] < targetY) low = mid;
      else high = mid;
    }

    const a = samples[low];
    const b = samples[high];
    const t = (targetY - a[1]) / (b[1] - a[1] || 1);
    return a[0] + (b[0] - a[0]) * t;
  }

  function draw(scrollY) {
    if (!pathLength) return;

    // Reduced motion: always fully drawn
    if (reduced) {
      path.style.strokeDashoffset = 0;
      return;
    }

    const shown = lengthAtY(scrollY + window.innerHeight * TIP);
    path.style.strokeDashoffset = pathLength - shown;
  }

  // One ScrollTrigger covering the whole page (0 → max scroll). It updates
  // on every scroll frame, including Lenis's smoothed scrolling.
  if (!reduced) {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: function (self) {
        draw(self.scroll());
      }
    });
  }


  /* ------------------------------------------------------------------------
     5. REBUILD WHEN THE LAYOUT CHANGES
     ScrollTrigger "refreshes" after window resizes, after fonts load (see
     motion.js) and when the page finishes loading. Every refresh = rebuild,
     so the thread always meets the labels exactly.
     Crossing the 768px breakpoint also rebuilds (to clear or create it).
     ------------------------------------------------------------------------ */

  ScrollTrigger.addEventListener("refresh", build);
  wideScreen.addEventListener("change", build);

  build();
})();
