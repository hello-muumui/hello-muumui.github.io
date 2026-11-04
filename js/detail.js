// Detail pages: scroll reveal, next-project link, back-to-top button.
(function () {
  const PROJECTS = [
    { href: "zigbang.html", title: "Zigbang Smarthome" },
    { href: "hyelectric.html", title: "Hyundai Electric" },
    { href: "hanatour.html", title: "Hanatour" },
    { href: "kbstargate.html", title: "KB Stargate" },
    { href: "woojoo.html", title: "우주메리" },
    { href: "swim.html", title: "Sports Center" },
    { href: "twd.html", title: "TWD" },
    { href: "hana1q.html", title: "Hana1Q" },
    { href: "kingsdown.html", title: "Kingsdown" },
  ];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const main = document.querySelector("main");

  /* ---------- scroll reveal ---------- */
  // skip the hero (already on screen), the project info block, and sections whose
  // artwork continues across a section boundary (data-no-reveal), which would split apart
  const targets = Array.from(main.querySelectorAll(":scope > .section:not(.info)"))
    .slice(1)
    .filter((s) => !s.hasAttribute("data-no-reveal"))
    .map((s) => s.querySelector(".section__inner") || s.firstElementChild)
    .filter(Boolean);

  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    targets.forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  /* ---------- next project ---------- */
  const here = location.pathname.split("/").pop();
  const idx = PROJECTS.findIndex((p) => p.href === here);
  if (idx !== -1) {
    const next = PROJECTS[(idx + 1) % PROJECTS.length];
    const link = document.createElement("a");
    link.className = "next-project";
    link.href = next.href;
    // Cal Sans has no Korean glyphs; Korean titles use Pretendard at a matching weight
    const titleClass = /[\u3131-\uD79D]/.test(next.title) ? "next-project__title is-ko" : "next-project__title";
    link.innerHTML =
      '<p class="next-project__label">Next Project</p>' +
      `<p class="${titleClass}">${next.title}` +
      '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5"/></svg></p>';
    main.appendChild(link);
  }

  /* ---------- back to top ---------- */
  const topBtn = document.createElement("button");
  topBtn.type = "button";
  topBtn.className = "to-top";
  topBtn.setAttribute("aria-label", "맨 위로");
  topBtn.innerHTML =
    '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 16V4M5 9l5-5 5 5"/></svg>';
  topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
  document.body.appendChild(topBtn);

  const updateTop = () => topBtn.classList.toggle("is-on", window.scrollY > window.innerHeight);
  window.addEventListener("scroll", updateTop, { passive: true });
  updateTop();
})();
