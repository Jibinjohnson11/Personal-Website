/* ==========================================================================
   menu.js — Site header behaviour and the mobile menu

   1. Header on scroll: hides when scrolling down, comes back when scrolling
      up, and gets a blurred ink background after 80px.
   2. Mobile menu: full-screen overlay. The toggle's aria-expanded is kept in
      sync, Tab/Shift+Tab stay inside the menu, Escape closes it, and the
      page behind cannot scroll while it is open.

   All links are real HTML in partials/header.html; this file only adds and
   removes classes. The look of each state is in components.css.
   ========================================================================== */

(function () {
  "use strict";

  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  if (!header) return;


  /* ------------------------------------------------------------------------
     1. HEADER ON SCROLL
     ------------------------------------------------------------------------ */

  const SOLID_AFTER = 80; // px scrolled before the header gets its background
  const MIN_DELTA = 6;    // ignore tiny scroll jitters (trackpads, Lenis)

  let lastY = window.scrollY;
  let ticking = false;
  let menuOpen = false;

  function updateHeader() {
    const y = window.scrollY;

    header.classList.toggle("site-header--solid", y > SOLID_AFTER);

    // Never hide while the menu is open or while a header link has keyboard focus
    const keepVisible = menuOpen || header.contains(document.activeElement);

    if (keepVisible || y <= header.offsetHeight) {
      header.classList.remove("site-header--hidden");
    } else if (y > lastY + MIN_DELTA) {
      header.classList.add("site-header--hidden");    // scrolling down
    } else if (y < lastY - MIN_DELTA) {
      header.classList.remove("site-header--hidden"); // scrolling up
    } else {
      return; // movement too small: keep lastY so small steps add up
    }

    lastY = y;
  }

  // Scroll events fire very often; requestAnimationFrame runs the update
  // at most once per frame.
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateHeader();
      ticking = false;
    });
  }, { passive: true });

  // A keyboard user tabbing into a hidden header brings it back
  header.addEventListener("focusin", function () {
    header.classList.remove("site-header--hidden");
  });

  updateHeader(); // correct state if the page loads already scrolled


  /* ------------------------------------------------------------------------
     2. MOBILE MENU
     ------------------------------------------------------------------------ */

  if (!toggle || !menu) return;

  const root = document.documentElement;

  // Everything that can receive focus inside the menu, plus the toggle
  // (so the menu can be closed again with the keyboard).
  function trapItems() {
    return [toggle].concat(Array.from(menu.querySelectorAll("a[href], button")));
  }

  // Page parts behind the menu: made "inert" while it is open, so screen
  // readers and the mouse can't reach them either.
  function backgroundParts() {
    return document.querySelectorAll("body > :not(.site-header):not(.menu):not(script)");
  }

  function openMenu() {
    menuOpen = true;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu"); // CSS swaps the visible word to "Close"
    menu.classList.add("is-open");
    root.classList.add("is-menu-open"); // CSS locks page scroll
    header.classList.remove("site-header--hidden");
    backgroundParts().forEach(function (el) { el.inert = true; });
    if (window.lenis) window.lenis.stop(); // pause smooth scroll (motion.js, later)

    const firstLink = menu.querySelector("a[href]");
    if (firstLink) firstLink.focus();
  }

  function closeMenu(returnFocus) {
    menuOpen = false;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");  // CSS swaps the visible word back to "Menu"
    menu.classList.remove("is-open");
    root.classList.remove("is-menu-open");
    backgroundParts().forEach(function (el) { el.inert = false; });
    if (window.lenis) window.lenis.start();

    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener("click", function () {
    if (menuOpen) closeMenu(true);
    else openMenu();
  });

  // Clicking a link closes the menu (matters for links to the same page)
  menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) closeMenu(false);
  });

  document.addEventListener("keydown", function (event) {
    if (!menuOpen) return;

    // Escape closes the menu and puts focus back on the toggle
    if (event.key === "Escape") {
      closeMenu(true);
      return;
    }

    // Focus trap: Tab on the last item jumps to the first, and
    // Shift+Tab on the first item jumps to the last.
    if (event.key === "Tab") {
      const items = trapItems();
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!items.includes(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // If the window grows to desktop size while the menu is open, close it
  // (the overlay doesn't exist on desktop). Matches the 1024px breakpoint in CSS.
  const desktop = window.matchMedia("(min-width: 1024px)");
  desktop.addEventListener("change", function (event) {
    if (event.matches && menuOpen) closeMenu(false);
  });
})();
