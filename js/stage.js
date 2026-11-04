// Scales each fixed-size .stage to the width of its parent.
(function () {
  const stages = document.querySelectorAll(".stage");

  const fit = (stage) => {
    const scale = stage.parentElement.clientWidth / stage.offsetWidth;
    stage.style.setProperty("--scale", scale);
  };

  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.querySelectorAll(":scope > .stage").forEach(fit);
    });
  });

  stages.forEach((stage) => {
    fit(stage);
    observer.observe(stage.parentElement);
  });
})();
