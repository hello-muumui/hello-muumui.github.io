// About isn't ready yet: every About link opens a "coming soon" popup instead of navigating.
(function () {
  const dialog = document.createElement("dialog");
  dialog.className = "about-dialog";
  dialog.setAttribute("aria-label", "About");
  dialog.innerHTML =
    '<p class="about-dialog__text">Coming soon</p>' +
    '<button class="about-dialog__close" type="button">Close</button>';
  document.body.appendChild(dialog);

  dialog.querySelector(".about-dialog__close").addEventListener("click", () => dialog.close());
  // a click on the backdrop lands on the dialog element itself
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  document.querySelectorAll("[data-about]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      dialog.showModal();
    });
  });
})();
