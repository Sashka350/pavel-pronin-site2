/**
 * generate-inscenizations.mjs — генератор страниц инсценировок с чтением отрывка.
 * Запускается ПОСЛЕ `vite build` (npm run postbuild), читает собранные
 * CSS/JS хэши из dist/index.html и создаёт dist/inscenizations/<slug>/index.html
 * для каждой работы из src/data/inscenizations-data.js.
 *
 * Текст отрывка — src/data/inscenizations/<slug>.txt (его собирает
 * scripts/import-inscenization.mjs из файлов режиссёра). Формат файла:
 * абзацы разделены пустой строкой, «# » в начале строки — подзаголовок сцены,
 * «- » — строка списка действующих лиц.
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inscenizations } from '../src/data/inscenizations-data.js';
import { inscenizationsEn } from '../src/data/inscenizations-en.js';
import { esc, getAssets, wrapHtml, withBase } from './page-template.js';
import { wrapHtml as wrapHtmlEn, withEn } from './page-template-en.js';

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(root, '..');
const outDir = join(projectRoot, 'dist');
const textDir = join(projectRoot, 'src', 'data', 'inscenizations');

const { cssHref, jsSrc } = getAssets(outDir);

const enBySlug = {};
inscenizationsEn.forEach(function (i) {
  enBySlug[i.slug] = i;
});

/** Список действующих лиц по заголовку — до следующего подзаголовка. */
function isCastHeading(title) {
  return /действующ\S*\s+лиц/i.test(title);
}

/** Текст файла → HTML. */
function renderText(text) {
  const blocks = text.split(/\n\s*\n/).map(function (b) {
    return b.trim();
  }).filter(Boolean);

  const out = [];
  let cast = null;

  blocks.forEach(function (block) {
    if (block.charAt(0) === '#') {
      const title = block.replace(/^#\s*/, '');
      if (isCastHeading(title)) {
        cast = [];
        out.push({ scene: title, cast: cast });
        return;
      }
      cast = null;
      out.push({ scene: title });
      return;
    }
    if (block.charAt(0) === '-' && cast) {
      cast.push(block.replace(/^-\s*/, ''));
      return;
    }
    cast = null;
    out.push({ p: block });
  });

  return out
    .map(function (part) {
      if (part.scene !== undefined) {
        const head = '<h2 class="insc-text__scene">' + esc(part.scene) + '</h2>';
        if (!part.cast) return head;
        // «Жители города:» —group header внутри списка, не персонаж.
        const items = part.cast
          .map(function (line) {
            return /:$/.test(line)
              ? '<li class="insc-cast__group">' + esc(line) + '</li>'
              : '<li>' + esc(line) + '</li>';
          })
          .join('');
        return head + '<ul class="insc-cast">' + items + '</ul>';
      }
      return '<p class="insc-text__p">' + esc(part.p) + '</p>';
    })
    .join('\n');
}

function page(item, lang) {
  const isEn = lang === 'en';
  const en = enBySlug[item.slug] || {};
  const title = isEn ? (en.title || item.title) : item.title;
  const author = isEn ? (en.author || item.author) : item.author;
  const text = readFileSync(join(textDir, item.slug + '.txt'), 'utf8');
  const url = (isEn ? '/en' : '') + '/inscenizations/' + item.slug + '/';

  let backLabel = 'Все инсценировки';
  let crumb = 'Инсценировки';
  let fullNote = 'Здесь опубликован ознакомительный фрагмент. Полную версию инсценировки присылаю по запросу — напишите мне, и я отправлю текст.';
  let cta = 'Связаться';
  let langNote = 'Отрывок на русском языке.';
  let listHref = withBase('/inscenizations/');
  let contactsPath = withBase('/#contacts');
  if (isEn) {
    backLabel = 'All adaptations';
    crumb = 'Stage adaptations';
    fullNote = 'Only an excerpt is published here. Ask me and I will send the full text of the adaptation.';
    cta = 'Get in touch';
    langNote = 'The excerpt is in Russian.';
    listHref = withEn('/inscenizations/');
    contactsPath = withEn('/#contacts');
  }

  const head =
    '<section class="section perf-page__head">' +
    '<div class="container">' +
    '<a class="perf-page__back animate-on-scroll" href="' + listHref + '"><span class="arrow">→</span>' + backLabel + '</a>' +
    '<p class="perf-page__meta animate-on-scroll">' + crumb + '</p>' +
    '<h1 class="perf-page__title animate-on-scroll">' + esc(title) + '</h1>' +
    '<p class="perf-page__author animate-on-scroll">' + esc(author) + '</p>' +
    '</div>' +
    '</section>';

  const body =
    head +
    '<section class="section section--tight">' +
    '<div class="container">' +
    '<aside class="insc-full animate-on-scroll">' +
    '<p class="insc-full__text">' + esc(fullNote) + '</p>' +
    '<a class="btn btn--primary" href="' + contactsPath + '">' + cta + '</a>' +
    '</aside>' +
    '<article class="insc-text">' +
    '<p class="insc-text__note">' + esc(langNote) + '</p>' +
    renderText(text) +
    '</article>' +
    '</div>' +
    '</section>';

  const opts = {
    active: 'inscenizations',
    enPath: '/en/inscenizations/' + item.slug + '/',
    ruPath: isEn ? '/inscenizations/' + item.slug + '/' : undefined,
    title: title + (isEn ? ' — Stage adaptation · Pavel Pronin' : ' — Инсценировка · Павел Пронин'),
    description: title + (isEn
      ? '. Stage adaptation by Pavel Pronin ' + author + '. Excerpt for reading.'
      : '. Инсценировка Павла Пронина ' + author + '. Отрывок для чтения.'),
    canonical: url,
    body,
    cssHref,
    jsSrc
  };

  return isEn ? wrapHtmlEn(opts) : wrapHtml(opts);
}

let count = 0;
const skipped = [];
for (const item of inscenizations) {
  if (!existsSync(join(textDir, item.slug + '.txt'))) {
    skipped.push(item.slug);
    continue;
  }
  const dir = join(outDir, 'inscenizations', item.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page(item, 'ru'), 'utf8');

  const dirEn = join(outDir, 'en', 'inscenizations', item.slug);
  mkdirSync(dirEn, { recursive: true });
  writeFileSync(join(dirEn, 'index.html'), page(item, 'en'), 'utf8');
  count++;
}

if (skipped.length) {
  console.warn('Без текста (страница не создана): ' + skipped.join(', '));
}
console.log('Сгенерировано страниц инсценировок: ' + count + ' → dist/inscenizations/<slug>/ и dist/en/inscenizations/<slug>/');