/* ==========================================================================
   pages/contact.js — Inline, accessible validation for the contact form

   Without JavaScript the browser's own validation (required, type="email")
   still stops an empty or broken form. With JavaScript we switch that off
   (novalidate) and show our own messages instead, which are already in the
   HTML under each field (.field__error).

   How a field is marked invalid (components.css shows the message):
     aria-invalid="true"                → error text appears, line turns rose
     aria-describedby="<error id>"      → screen readers read the message
   Both are removed again once the field is fixed. aria-describedby is only
   set while invalid, so a hidden message is never read out.

   When:
   - on submit: check every field; if any fail, stop the submit and move
     focus to the first one (its message is then read out)
   - after a field has been left once (blur), re-check it as you type, so
     the message disappears as soon as it's fixed
   ========================================================================== */

(function () {
  "use strict";

  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  // Our messages replace the browser's bubbles
  form.noValidate = true;

  // Only fields that can fail: required ones, and the email format
  const fields = Array.from(form.querySelectorAll("input[required], textarea[required]"));


  /* Check one field, update its state, and return true if it's valid */
  function check(field) {
    const error = document.getElementById(field.id + "-error");
    const valid = field.checkValidity();

    // The email field has two messages: "missing" and "not a valid address"
    if (error && error.dataset.errorMissing) {
      error.textContent = field.validity.valueMissing
        ? error.dataset.errorMissing
        : error.dataset.errorInvalid;
    }

    if (valid) {
      field.removeAttribute("aria-invalid");
      field.removeAttribute("aria-describedby");
    } else {
      field.setAttribute("aria-invalid", "true");
      if (error) field.setAttribute("aria-describedby", error.id);
    }
    return valid;
  }


  /* Live re-checking, but only after the visitor has left the field once
     (no red messages while someone is still typing their first answer) */
  fields.forEach(function (field) {
    field.addEventListener("blur", function () {
      // Don't complain about a field nobody has typed in yet
      if (field.value.trim() !== "" || field.hasAttribute("aria-invalid")) {
        field.dataset.touched = "true";
        check(field);
      }
    });

    field.addEventListener("input", function () {
      if (field.dataset.touched) check(field);
    });
  });


  /* On submit: check everything; stop and focus the first problem */
  form.addEventListener("submit", function (event) {
    let firstInvalid = null;

    fields.forEach(function (field) {
      field.dataset.touched = "true";
      // A name or message of only spaces counts as empty
      if (field.value.trim() === "") field.value = "";
      if (!check(field) && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      event.preventDefault();
      firstInvalid.focus();
    }
  });
})();
