/**
 * type-cycle.js — смена типографики на [data-type-cycle] первые RUN_MS после загрузки.
 * После этого цикл останавливается, элементы фиксируются на FINAL_TYPE.
 */
(function () {
  const CYCLE_MS = 500;
  const RUN_MS = 10000;
  const FINAL_TYPE = '0';

  const els = document.querySelectorAll('[data-type-cycle]');
  if (!els.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const total = 5;
  let i = 0;
  const interval = window.setInterval(function () {
    i = (i + 1) % total;
    els.forEach(function (el) {
      el.setAttribute('data-type', String(i));
    });
  }, CYCLE_MS);

  window.setTimeout(function () {
    window.clearInterval(interval);
    els.forEach(function (el) {
      el.setAttribute('data-type', FINAL_TYPE);
      el.removeAttribute('data-type-motion');
    });
  }, RUN_MS);
})();