/**
 * inscenizations-en.js — рендер английского списка инсценировок.
 * Зеркало src/js/inscenizations.js для страницы en/inscenizations.
 *
 * Английских страниц работ нет: тексты инсценировок не переведены
 * (решение 04.10.2026), поэтому показываем английские названия, но ведём
 * на русское чтение и подписываем это прямо в списке.
 */
import { inscenizationsEn } from '../data/inscenizations-en.js';

(function () {
  const list = document.querySelector('[data-inscenizations-list]');
  if (!list) return;

  const base = import.meta.env.BASE_URL || '/';

  list.innerHTML = inscenizationsEn
    .map(function (item) {
      const href = base + 'inscenizations/' + item.slug + '/';
      return (
        '<li class="insc-item animate-on-scroll">' +
        '<a class="insc-item__link" href="' + href + '">' +
        '<span class="insc-item__title">' + item.title + '</span>' +
        '<span class="insc-item__author">' + item.author + '</span>' +
        '<span class="insc-item__note">Read in Russian</span>' +
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