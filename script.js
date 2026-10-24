
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

      // Use pixel values for reliable CSS transforms.
      section.style.setProperty(
        "--bow-shift",
        `${progress * 55}px`
      );

      section.style.setProperty(
        "--bow-bend",
        `${progress * 12}px`
      );

      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(updateAnimation);
    }

    window.addEventListener("scroll", requestUpdate, {
      passive: true
    });

    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    updateAnimation();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initialiseBowAnimation
    );
  } else {
    initialiseBowAnimation();
  }
})();
