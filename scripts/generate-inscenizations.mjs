/**
 * generate-inscenizations.mjs — генератор страниц инсценировок с чтением отрывка.
 * Запускается ПОСЛЕ `vite build` (npm run postbuild), читает собранные
 * CSS/JS хэши из dist/index.html и создаёт dist/inscenizations/<slug>/index.html
 * для каждой работы из src/data/inscenizations-data.js.
 *
 * Текст отрывка — src/data/inscenizations/<slug>.txt (его собирает
 * scripts/import-inscenization.mjs из файлов режиссёра). Формат файла:
 * абзацы разделены пустой строкой, «# » — подзаголовок сцены, «- » — строка
 * списка действующих лиц, «{b}…{/b}» — полужирное (имя говорящего),
 * «{i}…{/i}» — курсивное (сценическая ремарка).
 *
 * Как собрана страница: врезка «полная версия — по запросу», список действующих
 * лиц, оглавление по сценам, сцены в <details> (первая раскрыта), в конце —
 * «Конец фрагмента» со счётчиком абзацев. Так читателю не надо прокручивать
 * 30 экранов, а текст остаётся в HTML целиком.
 *
 * EN-страниц нет: тексты инсценировок на английский не переведены
 * (решение 04.10.2026), на /en/inscenizations/ лежит список с пометкой.
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inscenizations } from '../src/data/inscenizations-data.js';
import { esc, getAssets, wrapHtml, withBase } from './page-template.js';

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(root, '..');
const outDir = join(projectRoot, 'dist');
const textDir = join(projectRoot, 'src', 'data', 'inscenizations');

const { cssHref, jsSrc } = getAssets(outDir);

/** Сколько абзацев показываем сразу в работах без заголовков сцен. */
const LEAD_PARAGRAPHS = 12;

/** Заголовок списка действующих лиц — по заголовку, до следующего подзаголовка. */
function isCastHeading(title) {
  return /действующ\S*\s+лиц/i.test(title);
}

/** Разметка абзаца → куски {text, bold, italic}. */
function parseInline(s) {
  const parts = [];
  const re = /\{(\/?)([bi])\}/g;
  let last = 0;
  let bold = false;
  let italic = false;
  let m;
  while ((m = re.exec(s))) {
    if (m.index > last) parts.push({ text: s.slice(last, m.index), bold: bold, italic: italic });
    if (m[1]) {
      if (m[2] === 'b') bold = false;
      else italic = false;
    } else if (m[2] === 'b') bold = true;
    else italic = true;
    last = m.index + m[0].length;
  }
  if (last < s.length) parts.push({ text: s.slice(last), bold: bold, italic: italic });
  return parts.filter(function (p) {
    return p.text;
  });
}

function toPlain(parts) {
  return parts
    .map(function (p) {
      return p.text;
    })
    .join('')
    .trim();
}

/**
 * Абзац → HTML. Ремарка — это абзац, у которого весь текст курсивный;
 * такие абзацы получают свой класс, а полужирные имена внутри них остаются
 * выделенными. Всё остальное — речь: если первое слово полужирное, это имя
 * говорящего. Курсив внутри речи (в «Циниках» так оформлена «хроника»)
 * ремаркой не считаем.
 */
function renderParagraph(parts) {
  const content = parts.filter(function (p) {
    return p.text.trim();
  });
  const stage = content.length > 0 && content.every(function (p) {
    return p.italic;
  });
  let firstContent = true;
  const html = parts
    .map(function (p) {
      let t = esc(p.text);
      if (!t) return '';
      if (p.bold && /[0-9A-Za-zА-Яа-яЁё]/.test(p.text)) {
        const cls = !stage && firstContent ? ' class="insc-text__who"' : '';
        firstContent = false;
        t = '<strong' + cls + '>' + t + '</strong>';
      } else if (p.text.trim()) firstContent = false;
      if (p.italic && !stage) t = '<em>' + t + '</em>';
      return t;
    })
    .join('');
  return stage
    ? '<p class="insc-text__stage">' + html + '</p>'
    : '<p class="insc-text__p">' + html + '</p>';
}

/** Файл → части текста: абзацы, подзаголовки сцен, список действующих лиц. */
function parseText(text) {
  const blocks = text.split(/\n\s*\n/).map(function (b) {
    return b.trim();
  }).filter(Boolean);

  const items = [];
  let cast = null;

  blocks.forEach(function (block) {
    if (block.charAt(0) === '#') {
      const title = toPlain(parseInline(block.replace(/^#\s*/, '')));
      if (isCastHeading(title)) {
        cast = [];
        items.push({ type: 'cast', title: title, names: cast });
        return;
      }
      cast = null;
      items.push({ type: 'scene', title: title });
      return;
    }
    if (block.charAt(0) === '-' && cast) {
      cast.push(toPlain(parseInline(block.replace(/^-\s*/, ''))));
      return;
    }
    cast = null;
    items.push({ type: 'p', parts: parseInline(block) });
  });

  return items;
}

function renderCast(item) {
  if (!item.names.length) return '';
  const items = item.names
    .map(function (line) {
      // «Жители города:» — заголовок группы внутри списка, не персонаж.
      return /:$/.test(line)
        ? '<li class="insc-cast__group">' + esc(line) + '</li>'
        : '<li>' + esc(line) + '</li>';
    })
    .join('');
  return (
    '<section class="insc-cast-block animate-on-scroll">' +
    '<h2 class="insc-cast__title">' + esc(item.title) + '</h2>' +
    '<ul class="insc-cast">' + items + '</ul>' +
    '</section>'
  );
}

function renderToc(scenes) {
  const links = scenes
    .map(function (s) {
      return (
        '<li><a class="insc-toc__link" href="#' + s.id + '" data-inc-scene="' + s.id + '">' +
        esc(s.title) +
        '</a></li>'
      );
    })
    .join('');
  return (
    '<nav class="insc-toc animate-on-scroll" aria-labelledby="inc-toc-title">' +
    '<div class="insc-toc__head">' +
    '<h2 class="insc-toc__title" id="inc-toc-title">Содержание фрагмента</h2>' +
    '<button class="inc-btn" type="button" data-inc-toggle>Развернуть всё</button>' +
    '</div>' +
    '<ol class="insc-toc__list">' + links + '</ol>' +
    '</nav>'
  );
}

function renderScene(scene, open) {
  const body = scene.parts.map(renderParagraph).join('\n');
  return (
    '<details class="insc-scene" id="' + scene.id + '"' + (open ? ' open' : '') + '>' +
    '<summary class="insc-scene__summary">' +
    '<span class="insc-scene__title">' + esc(scene.title) + '</span>' +
    (scene.note ? '<span class="insc-scene__note">' + esc(scene.note) + '</span>' : '') +
    '<span class="insc-scene__chevron" aria-hidden="true"></span>' +
    '</summary>' +
    '<div class="insc-scene__body">' + body + '</div>' +
    '</details>'
  );
}

function renderText(items) {
  const cast = items.filter(function (i) {
    return i.type === 'cast';
  });
  const scenes = [];
  const lead = [];
  items.forEach(function (i) {
    if (i.type === 'scene') scenes.push({ id: 'scene-' + (scenes.length + 1), title: i.title, parts: [] });
    else if (i.type === 'p') {
      if (scenes.length) scenes[scenes.length - 1].parts.push(i.parts);
      else lead.push(i.parts);
    }
  });

  const paragraphs = items.filter(function (i) {
    return i.type === 'p';
  }).length;

  let out = cast.map(renderCast).join('\n');

  if (scenes.length) {
    out += renderToc(scenes);
    if (lead.length) {
      out += '<div class="insc-lead">' + lead.map(renderParagraph).join('\n') + '</div>';
    }
    scenes.forEach(function (scene, i) {
      out += renderScene(scene, i === 0);
    });
  } else {
    // Заголовков сцен нет («Подросток»): оглавление строить не по чему,
    // поэтому показываем начало, а остальное — под кнопку.
    if (lead.length) {
      const head = lead.slice(0, LEAD_PARAGRAPHS);
      const rest = lead.slice(LEAD_PARAGRAPHS);
      out += '<div class="insc-lead">' + head.map(renderParagraph).join('\n') + '</div>';
      if (rest.length) {
        out += renderScene(
          {
            id: 'scene-rest',
            title: 'Читать продолжение',
            note: 'ещё ' + rest.length + ' ' + plural(rest.length, 'абзац', 'абзаца', 'абзацев'),
            parts: rest
          },
          false
        );
      }
    }
  }

  out +=
    '<p class="insc-text__end">Конец фрагмента · ' +
    paragraphs +
    ' ' + plural(paragraphs, 'абзац', 'абзаца', 'абзацев') +
    (scenes.length ? ' в ' + scenes.length + ' ' + plural(scenes.length, 'сцене', 'сценах', 'сценах') : '') +
    '</p>';

  return out;
}

function plural(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

function page(item) {
  const title = item.title;
  const author = item.author;
  const text = readFileSync(join(textDir, item.slug + '.txt'), 'utf8');
  const url = '/inscenizations/' + item.slug + '/';
  const listHref = withBase('/inscenizations/');
  const contactsPath = withBase('/#contacts');

  const head =
    '<section class="section perf-page__head">' +
    '<div class="container">' +
    '<a class="perf-page__back animate-on-scroll" href="' + listHref + '"><span class="arrow">→</span>Все инсценировки</a>' +
    '<p class="perf-page__meta animate-on-scroll">Инсценировки</p>' +
    '<h1 class="perf-page__title animate-on-scroll">' + esc(title) + '</h1>' +
    '<p class="perf-page__author animate-on-scroll">' + esc(author) + '</p>' +
    '</div>' +
    '</section>';

  const body =
    head +
    '<section class="section section--tight">' +
    '<div class="container">' +
    '<aside class="insc-full animate-on-scroll">' +
    '<p class="insc-full__text">Здесь опубликован ознакомительный фрагмент. Полную версию инсценировки присылаю по запросу — напишите мне, и я отправлю текст.</p>' +
    '<a class="btn btn--primary" href="' + contactsPath + '">Связаться</a>' +
    '</aside>' +
    '<article class="insc-text" data-inc-reader>' +
    renderText(parseText(text)) +
    '</article>' +
    '</div>' +
    '</section>';

  const opts = {
    active: 'inscenizations',
    // EN-страницы работ не делаем — перевода нет, только список с пометкой.
    enPath: '/en/inscenizations/',
    title: title + ' — Инсценировка · Павел Пронин',
    description: title + '. Инсценировка Павла Пронина ' + author + '. Отрывок для чтения.',
    canonical: url,
    body,
    cssHref,
    jsSrc
  };

  return wrapHtml(opts);
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
  writeFileSync(join(dir, 'index.html'), page(item), 'utf8');
  count++;
}

if (skipped.length) {
  console.warn('Без текста (страница не создана): ' + skipped.join(', '));
}
console.log('Сгенерировано страниц инсценировок: ' + count + ' → dist/inscenizations/<slug>/');