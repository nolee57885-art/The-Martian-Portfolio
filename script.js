
/*
  THE MARTIAN'S PURSUITS
  Scroll-driven bow animation
*/

(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function initialiseBowAnimation() {
    const section = document.querySelector("[data-bow-section]");

    if (!section) return;

    let ticking = false;

    function updateAnimation() {
      const rect = section.getBoundingClientRect();
      const travel = section.offsetHeight - window.innerHeight;

      const progress = reducedMotion.matches || travel <= 0
        ? 0
        : Math.min(1, Math.max(0, -rect.top / travel));

      section.style.setProperty("--bow-progress", progress.toFixed(3));

      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(updateAnimation);
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    updateAnimation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseBowAnimation);
  } else {
    initialiseBowAnimation();
  }
})();
