/**
 * inscenizations.js — рендер списка инсценировок.
 * Ссылка ведёт на страницу отрывка: /inscenizations/<slug>/,
 * её собирает scripts/generate-inscenizations.mjs.
 */
import { inscenizations } from '../data/inscenizations-data.js';

(function () {
  const list = document.querySelector('[data-inscenizations-list]');
  if (!list) return;

  const base = import.meta.env.BASE_URL || '/';

  list.innerHTML = inscenizations
    .map(function (item) {
      const href = base + 'inscenizations/' + item.slug + '/';
      return (
        '<li class="insc-item animate-on-scroll">' +
        '<a class="insc-item__link" href="' + href + '">' +
        '<span class="insc-item__title">' + item.title + '</span>' +
        '<span class="insc-item__author">' + item.author + '</span>' +
        '<span class="link-arrow"><span class="arrow">→</span></span>' +
        '</a>' +
        '</li>'
      );
    })
    .join('');

  if (window.initScrollAnimations) {
    window.initScrollAnimations(list);
  }
})();
