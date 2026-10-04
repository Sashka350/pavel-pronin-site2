/**
 * announcements.js — блок «Новости» на главной.
 * Показывает 1–2 ближайших анонса (первое — во всю ширину) и до трёх
 * последних записей. Если данных нет вообще — блок скрывается целиком.
 */
import { eventCard, postCard, upcomingFeed, postsFeed, ui } from './news-feed.js';

const BASE = import.meta.env.BASE_URL;

(function () {
  const section = document.querySelector('[data-announcements]');
  if (!section) return;

  const grid = section.querySelector('[data-announcements-grid]');
  if (!grid) return;

  const isEn = grid.getAttribute('data-lang') === 'en';
  const t = isEn ? ui.en : ui.ru;

  const list = upcomingFeed(isEn, 2);
  const feed = postsFeed(isEn, 3);

  if (!list.length && !feed.length) {
    section.classList.add('is-hidden');
    return;
  }

  if (list.length) {
    grid.innerHTML = list.map(function (a, i) {
      return eventCard(a, { lead: i === 0, more: t.more });
    }).join('');
  } else {
    grid.classList.add('is-hidden');
  }

  const recentSection = section.querySelector('[data-news-recent-section]');
  const recentGrid = section.querySelector('[data-news-recent]');

  if (feed.length && recentGrid) {
    recentGrid.innerHTML = feed.map(function (p) {
      return postCard(p, { base: BASE, read: t.read });
    }).join('');
    if (recentSection) {
      recentSection.classList.remove('is-hidden');
    }
  } else if (recentSection) {
    recentSection.classList.add('is-hidden');
  }

  if (window.initScrollAnimations) {
    window.initScrollAnimations(section);
  }
})();