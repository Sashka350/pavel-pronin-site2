/**
 * generate-sketches.mjs — генератор скрытых страниц эскизов лабораторий.
 * Запускается ПОСЛЕ `vite build` (npm run postbuild), читает собранные
 * CSS/JS хэши из dist/index.html и создаёт dist/sketches/<slug>/index.html
 * для каждого эскиза из src/data/sketches-data.js.
 *
 * Страницы эскизов — скрытые: их нет в меню, каталоге и sitemap, в <head>
 * стоит noindex. Доступны по прямой ссылке. Связь со спектаклями —
 * только по прямому упоминанию в тексте документа (поле related).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sketches } from '../src/data/sketches-data.js';
import { esc, getAssets, wrapHtml, withBase, SITE } from './page-template.js';

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(root, '..');
const outDir = join(projectRoot, 'dist');

const { cssHref, jsSrc } = getAssets(outDir);

function paragraphs(list) {
  return list.map((p) => '<p>' + esc(p) + '</p>').join('');
}

function teamList(team) {
  return (
    '<ul class="perf-page__team">' +
    team
      .map(
        (m) =>
          '<li><span class="perf-spec__role">' +
          esc(m.role) +
          '</span> — ' +
          esc(m.name) +
          '</li>'
      )
      .join('') +
    '</ul>'
  );
}

function videoList(urls) {
  return (
    '<ul class="perf-page__links">' +
    urls
      .map(
        (u) =>
          '<li><a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(u) + '</a></li>'
      )
      .join('') +
    '</ul>'
  );
}

function page(s) {
  const url = '/sketches/' + s.slug + '/';
  const cover = s.photos.length ? s.photos[0] : null;

  const metaLead =
    s.description[0].length > 150
      ? s.description[0].slice(0, 147).replace(/\s\S*$/, '') + '…'
      : s.description[0];
  const description =
    metaLead.replace(/\s+/g, ' ').replace(/[.!?…\s]+$/, '') +
    '. Эскиз лаборатории. Режиссёр Павел Пронин.';

  const galleryItems = s.photos
    .map(
      (ph, i) =>
        '<figure class="gallery__item">' +
        '<a class="gallery__link" href="' + withBase('/' + ph.full) + '" data-lightbox="' + s.slug + '" data-caption="">' +
        '<img src="' + withBase('/' + ph.thumb) + '" alt="' + esc(s.title) + ' — кадр ' + (i + 1) + '" loading="lazy" />' +
        '</a>' +
        '</figure>'
    )
    .join('');

  const related = s.related
    ? '<div class="perf-page__section animate-on-scroll">' +
      '<h2 class="perf-page__section-title">Связанная работа</h2>' +
      '<p class="perf-page__desc"><a href="' + withBase('/performances/' + s.related.slug + '/') + '">' + esc(s.related.label) + '</a></p>' +
      '</div>'
    : '';

  const body =
    '<section class="section perf-page__head">' +
    '<div class="container">' +
    '<div class="perf-page__meta animate-on-scroll">' +
    '<span class="badge">Эскиз лаборатории</span>' +
    '<span>' + esc(s.city) + ' · ' + esc(s.showDate) + '</span>' +
    '</div>' +
    '<h1 class="perf-page__title animate-on-scroll">' + esc(s.title) + '</h1>' +
    (s.author ? '<p class="perf-page__author animate-on-scroll">' + esc(s.author) + '</p>' : '') +
    '</div>' +
    '</section>' +

    '<section class="section section--tight">' +
    '<div class="container">' +
    (cover
      ? '<div class="perf-page__cover animate-on-scroll">' +
        '<img src="' + withBase('/' + cover.full) + '" alt="' + esc(s.title) + ' — кадр из эскиза" />' +
        '</div>'
      : '') +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">Об эскизе</h2>' +
    '<div class="perf-page__desc">' + paragraphs(s.description) + '</div>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">Сведения</h2>' +
    '<div class="perf-page__specs">' +
    '<div class="perf-spec"><span class="perf-spec__label">Театр</span><span class="perf-spec__value">' + esc(s.theater) + '</span></div>' +
    '<div class="perf-spec"><span class="perf-spec__label">Город</span><span class="perf-spec__value">' + esc(s.city) + '</span></div>' +
    '<div class="perf-spec"><span class="perf-spec__label">Тема лаборатории</span><span class="perf-spec__value">' + esc(s.lab) + '</span></div>' +
    '<div class="perf-spec"><span class="perf-spec__label">Дата показа</span><span class="perf-spec__value">' + esc(s.showDate) + '</span></div>' +
    '<div class="perf-spec"><span class="perf-spec__label">Команда</span><div class="perf-spec__value">' + teamList(s.team) + '</div></div>' +
    '</div>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">Видео</h2>' +
    '<div class="perf-spec__value">' + videoList(s.videos) + '</div>' +
    '</div>' +

    related +

    (s.photos.length
      ? '<div class="perf-page__section animate-on-scroll">' +
        '<h2 class="perf-page__section-title">Фотографии</h2>' +
        '<p class="perf-page__hint">Кадры из эскиза</p>' +
        '<div class="gallery">' + galleryItems + '</div>' +
        '</div>'
      : '') +
    '</div>' +
    '</section>';

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: s.title,
    author: { '@type': 'Person', name: 'Павел Пронин' },
    url: SITE + url,
    image: cover ? SITE + '/' + cover.full : undefined
  };

  return wrapHtml({
    active: 'sketches',
    enPath: '/en/',
    title: s.title + ' — эскиз лаборатории · Павел Пронин',
    description,
    ogDescription: s.theater + ', ' + s.city,
    ogImage: cover ? SITE + '/' + cover.full : undefined,
    ogType: 'article',
    canonical: url,
    jsonld,
    robots: 'noindex',
    body,
    cssHref,
    jsSrc
  });
}

let count = 0;
for (const s of sketches) {
  const dir = join(outDir, 'sketches', s.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page(s), 'utf8');
  count++;
}
console.log('Сгенерировано страниц эскизов: ' + count + ' → dist/sketches/<slug>/ (скрытые, noindex, в sitemap не входят)');

// --- Страницы-списки /sketches/ и /en/sketches/ (скрытые, noindex) ---
// Вводный текст — из «+ Эскизы.docx» (папка «Эскизы» на Диске).
const { wrapHtml: wrapHtmlEn, esc: escEn } = await import('./page-template-en.js');

const INTRO_RU =
  'Лаборатория в театре – это особый формат работы театра. В основе любой лаборатории лежит такая идея: быстро и без особых затрат сделать небольшие эскизы нескольких будущих спектаклей и выбрать один из них. Эскиз спектакля неуловим. Иногда от него не остаётся ничего, кроме воспоминаний, если же есть видео (пусть даже и не очень хорошего качества), то уже повезло. Здесь собраны некоторые из лабораторных эскизов, которые мне дороги.';

const INTRO_EN =
  'A theatre laboratory is a special format of work. The idea behind any laboratory is to quickly and inexpensively create small sketches of several future productions and to choose one of them. A sketch of a performance is elusive. Sometimes nothing remains of it except memories; if there is a video (even of not very good quality), you are already lucky. Here are collected some of the laboratory sketches that are dear to me.';

function sketchSection(s, lang) {
  const href = withBase('/sketches/' + s.slug + '/');
  const title = lang === 'en' ? escEn(s.title) : esc(s.title);
  const link = lang === 'en' ? title + ' <span class="perf-spec__role">(in Russian)</span>' : title;
  return (
    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title"><a href="' + href + '">' + link + '</a></h2>' +
    '<p class="perf-spec__role">' + esc(s.theater) + ' · ' + esc(s.city) + ' · ' + esc(s.showDate) + '</p>' +
    '<div class="perf-page__desc"><p>' + esc(s.lab) + '</p></div>' +
    '</div>'
  );
}

const listRu = sketches.map((s) => sketchSection(s, 'ru')).join('');
const listEn = sketches.map((s) => sketchSection(s, 'en')).join('');

const bodyRu =
  '<section class="section page-head">' +
  '<div class="container">' +
  '<div class="page-head__inner animate-on-scroll">' +
  '<h1 class="page-head__title">Эскизы лабораторий</h1>' +
  '<p class="page-head__lead">' + esc(INTRO_RU) + '</p>' +
  '</div>' +
  '</div>' +
  '</section>' +
  '<section class="section section--tight">' +
  '<div class="container">' +
  listRu +
  '<p class="perf-page__desc"><a href="' + withBase('/performances/') + '">← Все спектакли</a></p>' +
  '</div>' +
  '</section>';

writeFileSync(
  join(outDir, 'sketches', 'index.html'),
  wrapHtml({
    active: 'sketches',
    enPath: '/en/sketches/',
    title: 'Эскизы лабораторий · Павел Пронин',
    description: 'Лабораторные эскизы спектаклей режиссёра Павла Пронина: «Ловушка для одинокого мужчины», «Сказка о царе Салтане…», «Один билет до Марса».',
    canonical: '/sketches/',
    robots: 'noindex',
    ogImage: SITE + '/' + sketches[0].photos[0].full,
    body: bodyRu,
    cssHref,
    jsSrc
  }),
  'utf8'
);

const bodyEn =
  '<section class="section page-head">' +
  '<div class="container">' +
  '<div class="page-head__inner animate-on-scroll">' +
  '<h1 class="page-head__title">Laboratory Sketches</h1>' +
  '<p class="page-head__lead">' + escEn(INTRO_EN) + '</p>' +
  '</div>' +
  '</div>' +
  '</section>' +
  '<section class="section section--tight">' +
  '<div class="container">' +
  listEn +
  '<p class="perf-page__desc"><a href="' + withBase('/en/performances/') + '">← All performances</a></p>' +
  '</div>' +
  '</section>';

mkdirSync(join(outDir, 'en', 'sketches'), { recursive: true });
writeFileSync(
  join(outDir, 'en', 'sketches', 'index.html'),
  wrapHtmlEn({
    active: 'sketches',
    ruPath: '/sketches/',
    title: 'Laboratory Sketches · Pavel Pronin',
    description: 'Laboratory sketches of performances by director Pavel Pronin. The sketch texts are published in Russian only.',
    canonical: '/en/sketches/',
    robots: 'noindex',
    ogImage: SITE + '/' + sketches[0].photos[0].full,
    body: bodyEn,
    cssHref,
    jsSrc
  }),
  'utf8'
);
console.log('Сгенерированы страницы-списки: dist/sketches/index.html и dist/en/sketches/index.html (скрытые, noindex)');
