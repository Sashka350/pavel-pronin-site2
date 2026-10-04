/**
 * type-cycle.js — смена типографики на [data-type-cycle] первые RUN_MS после загрузки.
 * После этого цикл останавливается, элементы фиксируются на FINAL_TYPE.
 * Анимация показывается только при первом заходе в рамках одной сессии
 * браузера (sessionStorage), чтобы при переходе между разделами она не начиналась заново.
 * Чтобы сделать её разовой навсегда, замени sessionStorage на localStorage.
 */
(function () {
  const CYCLE_MS = 500;
  const RUN_MS = 10000;
  const FINAL_TYPE = '0';
  const SEEN_KEY = 'typeCycleSeen';

  const els = document.querySelectorAll('[data-type-cycle]');
  if (!els.length) return;

  function seen() {
    try {
      return sessionStorage.getItem(SEEN_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function markSeen() {
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch (e) {
      /* приватный режим — просто покажем анимацию ещё раз */
    }
  }

  function settle() {
    els.forEach(function (el) {
      el.setAttribute('data-type', FINAL_TYPE);
      el.removeAttribute('data-type-motion');
    });
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  if (seen()) {
    settle();
    return;
  }

  markSeen();

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
    settle();
  }, RUN_MS);
})();
