/* ==========================================================================
   pages/blog.js — Tag filter on the blog index

   Each filter button has data-filter="seo" (or "all"); each post has
   data-post and data-tags="seo local-seo" (space-separated).
   Clicking a button hides the posts without that tag and marks the button
   with aria-pressed="true".

   Without JavaScript the filter bar stays hidden (blog.css) and every
   post is shown. Nothing here adds content: the "no posts" message is
   already in the HTML, this file only shows or hides it.
   ========================================================================== */

(function () {
  "use strict";

  const buttons = Array.from(document.querySelectorAll("[data-filter]"));
  const posts = Array.from(document.querySelectorAll("[data-post]"));
  const empty = document.querySelector("[data-filter-empty]");
  if (!buttons.length || !posts.length) return;

  function applyFilter(filter) {
    // Show or hide each post
    posts.forEach(function (post) {
      const tags = (post.dataset.tags || "").split(" ");
      post.hidden = filter !== "all" && !tags.includes(filter);
    });

    // Mark the chosen button
    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
    });

    // "No posts in this category yet" only when nothing is left
    if (empty) {
      empty.hidden = posts.some(function (post) { return !post.hidden; });
    }

    // The page got shorter or longer: let scroll animations re-measure
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyFilter(button.dataset.filter);
    });
  });
})();
