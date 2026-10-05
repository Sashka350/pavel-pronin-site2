/**
 * generate-pedagogy.mjs — генератор страниц педагогических проектов.
 * Запускается ПОСЛЕ `vite build` (npm run postbuild), читает собранные
 * CSS/JS хэши из dist/index.html и создаёт dist/pedagogy/<slug>/index.html
 * для каждого проекта из src/data/pedagogy-data.js.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pedagogyProjects } from '../src/data/pedagogy-data.js';
import { pedagogyProjectsEn } from '../src/data/pedagogy-en.js';
import { esc, getAssets, wrapHtml, withBase } from './page-template.js';
import { wrapHtml as wrapHtmlEn } from './page-template-en.js';

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(root, '..');
const outDir = join(projectRoot, 'dist');

const { cssHref, jsSrc } = getAssets(outDir);

/**
 * Одинаковые названия проектов (ГИТИС 2016 и ГИТИС 2024) дают одинаковые
 * <title> и meta description — страницы конкурируют друг с другом. Для таких
 * дописываем годы. Заголовок на самой странице не трогаем.
 */
function repeatedTitles(list, pick) {
  const count = new Map();
  for (const item of list) {
    const key = pick(item);
    count.set(key, (count.get(key) || 0) + 1);
  }
  return new Set([...count.keys()].filter((k) => count.get(k) > 1));
}

/** «2016 — 2018» → «2016–2018», «2024 — н.вр.» → «2024–». */
function years(period) {
  const found = String(period || '').match(/\d{4}/g);
  if (!found) return '';
  return found.length > 1 ? found[0] + '–' + found[1] : found[0] + '–';
}

const REPEATED_RU = repeatedTitles(pedagogyProjects, (p) => p.title);
const REPEATED_EN = repeatedTitles(pedagogyProjects, (p) => (pedagogyProjectsEn[p.slug] || {}).title || p.title);

function page(p, lang) {
  if (!p.slug) return null;
  const isEn = lang === 'en';
  const en = pedagogyProjectsEn[p.slug] || {};
  const title = isEn ? (en.title || p.title) : p.title;
  const period = isEn ? (en.period != null ? en.period : p.period) : p.period;
  const place = isEn ? (en.place != null ? en.place : p.place) : p.place;
  const role = isEn ? (en.role || p.role) : p.role;
  const taught = isEn ? (en.taught || p.taught) : p.taught;
  const url = (isEn ? '/en' : '') + '/pedagogy/' + p.slug + '/';
  const imgSrc = p.image || 'https://placehold.co/800x1067/141414/ffffff?text=' + encodeURIComponent(title);

  let descPh = 'Описание проекта появится после получения материалов от режиссёра.';
  let backLabel = 'Все проекты';
  let crumb = 'Педагогика';
  let oProj = 'О проекте';
  let details = 'Сведения';
  let periodLabel = 'Период';
  let cityLabel = 'Город';
  let metaCrumb = 'Педагогика';
  let roleLabel = 'Кем был';
  let taughtLabel = 'Чему учил';
  if (isEn) {
    descPh = 'A description of the project will appear once the director provides the materials.';
    backLabel = 'All projects';
    crumb = 'Pedagogy';
    oProj = 'About the project';
    details = 'Details';
    periodLabel = 'Period';
    cityLabel = 'City';
    metaCrumb = 'Pedagogy';
    roleLabel = 'Role';
    taughtLabel = 'Taught';
  }
  const description = p.description ? p.description : descPh;

  const meta = [];
  if (period) meta.push('<div class="perf-spec"><span class="perf-spec__label">' + periodLabel + '</span><span class="perf-spec__value">' + esc(period) + '</span></div>');
  if (place) meta.push('<div class="perf-spec"><span class="perf-spec__label">' + cityLabel + '</span><span class="perf-spec__value">' + esc(place) + '</span></div>');
  if (role) meta.push('<div class="perf-spec"><span class="perf-spec__label">' + roleLabel + '</span><span class="perf-spec__value">' + esc(role) + '</span></div>');
  if (taught) meta.push('<div class="perf-spec"><span class="perf-spec__label">' + taughtLabel + '</span><span class="perf-spec__value">' + esc(taught) + '</span></div>');

  const body =
    '<section class="section perf-page__head">' +
    '<div class="container">' +
    '<a class="perf-page__back animate-on-scroll" href="' + withBase(isEn ? '/en/pedagogy/' : '/pedagogy/') + '"><span class="arrow">→</span>' + backLabel + '</a>' +
    '<p class="perf-page__meta animate-on-scroll">' + metaCrumb + '</p>' +
    '<h1 class="perf-page__title animate-on-scroll">' + esc(title) + '</h1>' +
    '</div>' +
    '</section>' +

    '<section class="section section--tight">' +
    '<div class="container">' +
    '<div class="perf-page__cover animate-on-scroll">' +
    '<img src="' + imgSrc + '" alt="' + esc(title) + '" />' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">' + oProj + '</h2>' +
    '<div class="perf-page__desc"><p>' + esc(description) + '</p></div>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">' + details + '</h2>' +
    '<div class="perf-page__specs">' + meta.join('') + '</div>' +
    '</div>' +
    '</div>' +
    '</section>';

  // Часть названий проектов длинная, а <title> должен быть уникальным и
  // помещаться в выдачу — при повторах добавляем годы, при длине убираем хвост.
  const suffix = isEn ? ' — Pedagogy · Pavel Pronin' : ' — Педагогика · Павел Пронин';
  const repeated = (isEn ? REPEATED_EN : REPEATED_RU).has(title);
  const span = repeated ? years(period) : '';
  const withSpan = span ? title + ' (' + span + ')' : title;
  const metaTitle = (withSpan + suffix).length > 70 ? withSpan : withSpan + suffix;

  const opts = {
    active: 'pedagogy',
    enPath: '/en/pedagogy/',
    ruPath: isEn ? '/pedagogy/' + p.slug + '/' : undefined,
    title: metaTitle,
    description: title + (isEn
      ? '. Pedagogical project of Pavel Pronin.' + (span ? ' ' + span + '.' : '') + (place ? ' ' + place + '.' : '')
      : '. Педагогический проект Павла Пронина.' + (span ? ' ' + span + '.' : '') + (place ? ' ' + place + '.' : '')),
    ogImage: imgSrc,
    canonical: url,
    body,
    cssHref,
    jsSrc
  };

  return isEn ? wrapHtmlEn(opts) : wrapHtml(opts);
}

let count = 0;
for (const p of pedagogyProjects) {
  const html = page(p, 'ru');
  if (!html) continue;
  const dir = join(outDir, 'pedagogy', p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html, 'utf8');

  const htmlEn = page(p, 'en');
  if (htmlEn) {
    const dirEn = join(outDir, 'en', 'pedagogy', p.slug);
    mkdirSync(dirEn, { recursive: true });
    writeFileSync(join(dirEn, 'index.html'), htmlEn, 'utf8');
  }
  count++;
}
console.log('Сгенерировано страниц педагогических проектов: ' + count + ' → dist/pedagogy/<slug>/ и dist/en/pedagogy/<slug>/');
