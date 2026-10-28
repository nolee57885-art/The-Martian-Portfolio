/* The Martian's Pursuits — scroll-triggered bow and arrow sequence.
   The animation plays once when the illustration enters view. */
(() => {
  const stage = document.querySelector("[data-bow-stage]");
  if (!stage) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches || !("IntersectionObserver" in window)) return;
  let played = false;
  const observer = new IntersectionObserver((entries) => {
    if (played || !entries.some((entry) => entry.isIntersecting)) return;
    played = true;
    stage.classList.add("is-drawing");
    window.setTimeout(() => {
      stage.classList.remove("is-drawing");
      stage.classList.add("is-releasing");
    }, 1250);
    observer.disconnect();
  }, { threshold: 0.35 });
  observer.observe(stage);
})();