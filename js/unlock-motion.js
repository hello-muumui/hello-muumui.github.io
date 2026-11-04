// Zigbang: looping door-lock unlock animation, ported from the Figma Make file.
// Starts from the beginning when the phone scrolls into view and stops when it leaves.
(function () {
  const root = document.querySelector(".um");
  if (!root) return;

  const title = root.querySelector(".um-title");
  let timers = [];

  const setPhase = (phase) => {
    root.dataset.phase = phase;
    title.textContent = phase === "loading" || phase === "open" ? "열림" : "잠김";
  };

  const stop = () => {
    timers.forEach(clearTimeout);
    timers = [];
    setPhase("locked");
  };

  const run = () => {
    setPhase("locked");
    timers = [
      setTimeout(() => setPhase("sliding"), 700),
      setTimeout(() => setPhase("loading"), 2250),
      setTimeout(() => setPhase("open"), 3850),
      setTimeout(run, 6100),
    ];
  };

  if (!("IntersectionObserver" in window)) {
    run();
    return;
  }

  let playing = false;
  new IntersectionObserver(
    (entries) => {
      const visible = entries[entries.length - 1].isIntersecting;
      if (visible === playing) return;
      playing = visible;
      if (playing) run();
      else stop();
    },
    { threshold: 0.3 }
  ).observe(root.parentElement);
})();
