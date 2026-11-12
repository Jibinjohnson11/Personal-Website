/* ==========================================================================
   pages/post.js — Highlights the section you are reading in the
   table of contents (blog posts only)

   The table of contents is plain HTML links (#section ids). This file only
   adds .is-active to the link whose H2 was passed most recently, so the
   reader can see where they are. post.css styles .is-active.

   Without JavaScript the links still work; nothing is highlighted.
   Nothing here adds content.
   ========================================================================== */

(function () {
  "use strict";

  const links = Array.from(document.querySelectorAll("[data-toc] a[href^='#']"));
  if (!links.length || !("IntersectionObserver" in window)) return;

  // Pair each link with the heading it points to
  const pairs = links
    .map(function (link) {
      return { link: link, heading: document.getElementById(link.hash.slice(1)) };
    })
    .filter(function (pair) { return pair.heading; });

  // Mark one link active and clear the others
  function setActive(activeLink) {
    pairs.forEach(function (pair) {
      pair.link.classList.toggle("is-active", pair.link === activeLink);
    });
  }

  // Whenever a heading crosses the top third of the screen, find the last
  // heading that is above that line: that is the section being read.
  function update() {
    const line = window.innerHeight * 0.33;
    let current = null;
    pairs.forEach(function (pair) {
      if (pair.heading.getBoundingClientRect().top <= line) current = pair.link;
    });
    setActive(current);
  }

  const observer = new IntersectionObserver(update, { rootMargin: "0px 0px -66% 0px" });
  pairs.forEach(function (pair) { observer.observe(pair.heading); });
  update();
})();
