/**
 * generate-news.mjs — генератор страниц записей раздела «Новости».
 * Запускается ПОСЛЕ `vite build` (npm run postbuild), читает собранные
 * CSS/JS хэши из dist/index.html и создаёт dist/news/<slug>/index.html
 * для каждой записи из src/data/news-data.js (и зеркало в dist/en/news/<slug>/).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { posts } from '../src/data/news-data.js';
import { newsEn } from '../src/data/news-en.js';
import { esc, getAssets, wrapHtml, SITE } from './page-template.js';
import { wrapHtml as wrapHtmlEn, SITE as SITE_EN } from './page-template-en.js';

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(root, '..');
const outDir = join(projectRoot, 'dist');

const { cssHref, jsSrc } = getAssets(outDir);

const PLACEHOLDER = {
  ru: 'Текст записи будет добавлен после получения материала от режиссёра.',
  en: 'The text of this entry will be added once the director provides the material.'
};

/** Текст записи: абзацы разделяются пустой строкой. */
function paragraphs(body) {
  return String(body || '')
    .split(/\n\s*\n/)
    .map(function (p) {
      return p.trim();
    })
    .filter(Boolean)
    .map(function (p) {
      return '<p>' + esc(p) + '</p>';
    })
    .join('');
}

function page(p, lang) {
  if (!p.slug) return null;
  const isEn = lang === 'en';
  const en = (newsEn.posts || {})[p.slug] || {};
  const title = isEn ? (en.title || p.title) : p.title;
  const dateLabel = isEn ? (en.dateLabel || p.dateLabel) : p.dateLabel;
  const tags = isEn ? (en.tags || p.tags) : p.tags;
  const url = (isEn ? '/en' : '') + '/news/' + p.slug + '/';

  const body = isEn ? (en.body || p.body) : p.body;
  const text = paragraphs(body) || '<p>' + esc(isEn ? PLACEHOLDER.en : PLACEHOLDER.ru) + '</p>';

  const backLabel = isEn ? 'All news' : 'Все новости';
  const backHref = isEn ? '/en/news/' : '/news/';
  const imgAlt = isEn ? title + ' — photo' : title + ' — фото';

  const meta = ['<span class="news-page__date">' + esc(dateLabel) + '</span>'];
  if (Array.isArray(tags) && tags.length) {
    tags.forEach(function (tag) {
      meta.push('<span class="badge">' + esc(tag) + '</span>');
    });
  }

  const cover = p.cover
    ? '<div class="perf-page__cover news-page__cover animate-on-scroll">' +
      '<img src="' + esc(p.cover) + '" alt="' + esc(imgAlt) + '" />' +
      '</div>'
    : '';

  const content =
    '<section class="section perf-page__head">' +
    '<div class="container">' +
    '<a class="perf-page__back animate-on-scroll" href="' + (isEn ? '/en/news/' : '/news/') + '"><span class="arrow">→</span>' + backLabel + '</a>' +
    '<div class="perf-page__meta animate-on-scroll">' +
    meta.join('') +
    '</div>' +
    '<h1 class="perf-page__title animate-on-scroll">' + esc(title) + '</h1>' +
    '</div>' +
    '</section>' +

    '<section class="section section--tight">' +
    '<div class="container">' +
    cover +
    '<div class="perf-page__section animate-on-scroll">' +
    '<div class="perf-page__desc news-page__body">' + text + '</div>' +
    '</div>' +
    '<div class="news-page__back-all animate-on-scroll">' +
    '<a class="link-arrow" href="' + backHref + '">' + backLabel + ' <span class="arrow">→</span></a>' +
    '</div>' +
    '</div>' +
    '</section>';

  const site = isEn ? SITE_EN : SITE;
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': title,
    'datePublished': p.date || '',
    'author': { '@type': 'Person', 'name': isEn ? 'Pavel Pronin' : 'Павел Пронин' },
    'url': site + url,
    ...(p.cover ? { image: p.cover } : {})
  };

  const opts = {
    active: 'news',
    enPath: '/en/news/' + p.slug + '/',
    ruPath: isEn ? '/news/' + p.slug + '/' : undefined,
    title: title + (isEn ? ' — News · Pavel Pronin' : ' — Новости · Павел Пронин'),
    description: (isEn ? en.excerpt || p.excerpt : p.excerpt) || title,
    ogImage: p.cover || undefined,
    ogType: 'article',
    canonical: url,
    jsonld,
    body: content,
    cssHref,
    jsSrc
  };

  return isEn ? wrapHtmlEn(opts) : wrapHtml(opts);
}

let count = 0;
for (const p of posts) {
  const html = page(p, 'ru');
  if (!html) continue;
  const dir = join(outDir, 'news', p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html, 'utf8');

  const htmlEn = page(p, 'en');
  if (htmlEn) {
    const dirEn = join(outDir, 'en', 'news', p.slug);
    mkdirSync(dirEn, { recursive: true });
    writeFileSync(join(dirEn, 'index.html'), htmlEn, 'utf8');
  }
  count++;
}
console.log('Сгенерировано страниц новостей: ' + count + ' → dist/news/<slug>/ и dist/en/news/<slug>/');