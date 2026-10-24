
/*
  THE MARTIAN'S PURSUITS
  Scroll animation foundation
*/

(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  /*
    Converts scroll progress into a value between 0 and 1.
    We will use this to animate the bow, string, and arrow.
  */
  function getScrollProgress(element) {
    const rect = element.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;

    if (scrollableDistance <= 0) {
      return 0;
    }

    return Math.min(
      1,
      Math.max(0, -rect.top / scrollableDistance)
    );
  }

  /*
    Animation will be connected to the SVG artwork
    after that section has been created.
  */
  function initialiseBowAnimation() {
    const section = document.querySelector("[data-bow-section]");

    if (!section) {
      return;
    }

    let ticking = false;

    function updateAnimation() {
      const progress = reducedMotion.matches
        ? 1
        : getScrollProgress(section);

      section.style.setProperty(
        "--bow-progress",
        progress.toFixed(3)
      );

      ticking = false;
    }

    function requestUpdate() {
      if (!ticking) {
        window.requestAnimationFrame(updateAnimation);
        ticking = true;
      }
    }

    window.addEventListener("scroll", requestUpdate, {
      passive: true
    });

    window.addEventListener("resize", requestUpdate);

    reducedMotion.addEventListener("change", requestUpdate);

    updateAnimation();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initialiseBowAnimation();
  });
})();
