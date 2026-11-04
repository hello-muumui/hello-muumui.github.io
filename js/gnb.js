// Hides the GNB while scrolling down; shows it again on scroll up.
(function () {
  const gnb = document.querySelector(".gnb");
  if (!gnb) return;

  const THRESHOLD = 8; // px; ignore tiny trackpad jitters
  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    const delta = y - lastY;

    if (y <= gnb.offsetHeight) {
      gnb.classList.remove("is-hidden");
    } else if (delta > THRESHOLD) {
      gnb.classList.add("is-hidden");
    } else if (delta < -THRESHOLD) {
      gnb.classList.remove("is-hidden");
    }
    gnb.classList.toggle("is-scrolled", y > 0);

    if (Math.abs(delta) > THRESHOLD) lastY = y;
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  // keyboard users: always show the GNB when focus moves into it
  gnb.addEventListener("focusin", () => gnb.classList.remove("is-hidden"));
})();
