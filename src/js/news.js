/**
 * news.js — страница раздела «Новости» (/news/ и /en/news/).
 * Две ленты: анонсы («Ближайшее») и записи («Недавнее»).
 * Если данных нет вообще — показывается спокойный пустой блок.
 */
import { eventCard, postCard, upcomingFeed, postsFeed, ui } from './news-feed.js';

const BASE = import.meta.env.BASE_URL;

(function () {
  const root = document.querySelector('[data-news]');
  if (!root) return;

  const isEn = root.getAttribute('data-lang') === 'en';
  const t = isEn ? ui.en : ui.ru;

  const list = upcomingFeed(isEn, 0);
  const feed = postsFeed(isEn, 0);

  const upcomingSection = root.querySelector('[data-news-upcoming-section]');
  const upcomingGrid = root.querySelector('[data-news-upcoming]');
  const postsSection = root.querySelector('[data-news-posts-section]');
  const postsList = root.querySelector('[data-news-posts]');
  const emptyNotice = root.querySelector('[data-news-empty]');

  if (list.length && upcomingGrid) {
    upcomingGrid.innerHTML = list.map(function (a) {
      return eventCard(a, { more: t.more });
    }).join('');
  } else if (upcomingSection) {
    upcomingSection.classList.add('is-hidden');
  }

  if (feed.length && postsList) {
    postsList.innerHTML = feed.map(function (p) {
      return postCard(p, { base: BASE, read: t.read });
    }).join('');
  } else if (postsSection) {
    postsSection.classList.add('is-hidden');
  }

  if (!list.length && !feed.length && emptyNotice) {
    emptyNotice.classList.remove('is-hidden');
  }

  if (window.initScrollAnimations) {
    window.initScrollAnimations(root);
  }
})();