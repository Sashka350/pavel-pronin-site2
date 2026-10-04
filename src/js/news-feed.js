/**
 * news-feed.js — общая сборка ленты «Новости» для главной (/ в announcements.js)
 * и для страницы /news/ (в news.js).
 *
 * Здесь живут: выбор языка, сортировка и разметка карточек анонсов и записей,
 * чтобы на главной и в разделе отображалось одно и то же.
 */
import { upcoming, posts } from '../data/news-data.js';
import { newsEn } from '../data/news-en.js';

/** Подписи внутри карточек. Названия подразделов живут в статической разметке. */
export const ui = {
  ru: { more: 'Подробнее', read: 'Читать' },
  en: { more: 'Details', read: 'Read' }
};

/** Анонсы по возрастанию даты. */
function sortUpcoming(list) {
  return list.slice().sort(function (a, b) {
    return String(a.date || '').localeCompare(String(b.date || ''));
  });
}

/** Записи по убыванию даты — новые сверху. */
function sortPosts(list) {
  return list.slice().sort(function (a, b) {
    return String(b.date || '').localeCompare(String(a.date || ''));
  });
}

/**
 * Анонсы для показа. limit = 0 — без обрезки.
 * Перевод берётся из src/data/news-en.js по slug, пустое поле — русский текст.
 */
export function upcomingFeed(isEn, limit) {
  const en = isEn ? newsEn.upcoming || {} : {};
  const list = sortUpcoming(upcoming).map(function (a) {
    const t = en[a.slug] || {};
    return {
      slug: a.slug,
      dateLabel: t.dateLabel || a.dateLabel,
      kind: t.kind || a.kind,
      title: t.title || a.title,
      place: t.place || a.place,
      note: a.note,
      link: a.link
    };
  });
  return limit ? list.slice(0, limit) : list;
}

/** Записи ленты по убыванию даты. limit = 0 — без обрезки. */
export function postsFeed(isEn, limit) {
  const en = isEn ? newsEn.posts || {} : {};
  const list = sortPosts(posts).map(function (p) {
    const t = en[p.slug] || {};
    return {
      slug: p.slug,
      dateLabel: t.dateLabel || p.dateLabel,
      title: t.title || p.title,
      excerpt: t.excerpt || p.excerpt,
      cover: p.cover,
      tags: t.tags || p.tags
    };
  });
  return limit ? list.slice(0, limit) : list;
}

/** Карточка анонса. lead — первое ближайшее событие, на главной во всю ширину. */
export function eventCard(a, opts) {
  const o = opts || {};
  return (
    '<article class="event-card animate-on-scroll' + (o.lead ? ' event-card--lead' : '') + '">' +
    '<div class="event-card__meta">' +
    '<span class="event-card__date">' + a.dateLabel + '</span>' +
    (a.kind ? '<span class="badge">' + a.kind + '</span>' : '') +
    '</div>' +
    '<h3 class="event-card__title">' + a.title + '</h3>' +
    (a.place ? '<div class="event-card__place">' + a.place + '</div>' : '') +
    (a.note ? '<p class="event-card__note">' + a.note + '</p>' : '') +
    (a.link
      ? '<a class="link-arrow event-card__link" href="' + a.link + '" target="_blank" rel="noopener">' + o.more + ' <span class="arrow">→</span></a>'
      : '') +
    '</article>'
  );
}

/** Карточка записи ленты со ссылкой на /news/<slug>/. */
export function postCard(p, opts) {
  const o = opts || {};
  const tags = Array.isArray(p.tags) && p.tags.length
    ? '<div class="post-card__tags">' + p.tags.map(function (tag) {
        return '<span class="badge">' + tag + '</span>';
      }).join('') + '</div>'
    : '';
  const media = p.cover
    ? '<div class="post-card__media"><img src="' + p.cover + '" alt="' + p.title + '" loading="lazy" /></div>'
    : '';
  return (
    '<a class="post-card animate-on-scroll" href="' + o.base + 'news/' + p.slug + '/">' +
    media +
    '<div class="post-card__body">' +
    '<div class="post-card__meta"><span class="post-card__date">' + p.dateLabel + '</span></div>' +
    '<h3 class="post-card__title">' + p.title + '</h3>' +
    (p.excerpt ? '<p class="post-card__excerpt">' + p.excerpt + '</p>' : '') +
    tags +
    '<span class="link-arrow">' + o.read + ' <span class="arrow">→</span></span>' +
    '</div>' +
    '</a>'
  );
}