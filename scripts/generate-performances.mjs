/**
 * generate-performances.mjs — генератор страниц спектаклей.
 * Запускается ПОСЛЕ `vite build` (npm run postbuild), читает собранные
 * CSS/JS хэши из dist/index.html и создаёт dist/performances/<slug>/index.html
 * для каждого спектакля из src/data/performances-data.js.
 */
import { mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { performances } from '../src/data/performances-data.js';
import { performancesEn } from '../src/data/performances-en.js';
import { performancesArchive } from '../src/data/performances-archive.js';
import { performancesArchiveEn } from '../src/data/performances-archive-en.js';
import { galleries } from '../src/data/performances-gallery.js';
import { esc, getAssets, wrapHtml, withBase, SITE } from './page-template.js';
import { wrapHtml as wrapHtmlEn } from './page-template-en.js';

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(root, '..');
const outDir = join(projectRoot, 'dist');

const { cssHref, jsSrc } = getAssets(outDir);

const PLACEHOLDER_RU = {
  description: 'Описание появится после получения текстов от режиссёра.',
  team: 'Состав команды будет добавлен.',
  press: 'Материалы прессы будут добавлены.',
  videos: 'Видеозаписи будут добавлены.',
  premiere: 'Информация уточняется.',
  gallery: '— афиша'
};

const PLACEHOLDER_EN = {
  description: 'A description will appear once the director provides the texts.',
  team: 'The creative team will be added.',
  press: 'Press materials will be added.',
  videos: 'Video recordings will be added.',
  premiere: 'To be confirmed.',
  gallery: '— poster'
};

/**
 * Названия, которые встречаются в реестре больше одного раза: «Ретро» есть и в
 * Хабаровске, и в Екатеринбурге. Страницы с одинаковым <title> конкурируют
 * друг с другом, поэтому для таких добавляем театр и год — по visible-заголовку
 * на странице ничего не меняется.
 */
function repeatedTitles(list, pick) {
  const count = new Map();
  for (const item of list) {
    const key = pick(item);
    count.set(key, (count.get(key) || 0) + 1);
  }
  return new Set([...count.keys()].filter((k) => count.get(k) > 1));
}

const REPEATED_RU = repeatedTitles(performances, (p) => p.title);
const REPEATED_EN = repeatedTitles(performances, (p) => (performancesEn[p.slug] || {}).title || p.title);

/** <title> страницы спектакля: уникальный и не длиннее ~70 знаков. */
function metaTitle(title, theater, year, isEn) {
  const suffix = isEn ? ' — Pavel Pronin' : ' — Павел Пронин';
  const repeated = (isEn ? REPEATED_EN : REPEATED_RU).has(title);
  const where = repeated ? title + ' — ' + theater + (year ? ', ' + year : '') : title + suffix;
  return where.length > 70 ? where.replace(suffix, '') : where + (repeated ? suffix : '');
}

/** Список строк ссылок. */
function linkList(items, emptyLabel) {
  return (
    '<ul>' +
    items
      .map(function (it) {
        return '<li><a href="' + it.url + '" target="_blank" rel="noopener">' + esc(it.label || emptyLabel) + '</a></li>';
      })
      .join('') +
    '</ul>'
  );
}

/** Команда «роль — имя». */
function teamList(team) {
  return (
    '<ul>' +
    team
      .map(function (t) {
        return '<li><span class="perf-spec__role">' + esc(t.role) + '</span> — ' + esc(t.name) + '</li>';
      })
      .join('') +
    '</ul>'
  );
}

/** Описание режиссёра абзацами: переносы из файла должны стать абзацами. */
function paragraphs(list) {
  return list
    .map(function (p) {
      return '<p>' + esc(p) + '</p>';
    })
    .join('');
}

/**
 * Тексты спектакля для страницы: слой перевода поверх русского оригинала.
 * Перевод берётся только при isEn (см. page()), поэтому RU-страница
 * английского текста не получает никогда.
 * Если поле в переводе пропущено или разошлось по длине — берём русский
 * оригинал и печатаем предупреждение: молча разойтись нельзя.
 */
function text(slug, isEn, a, aEn, field) {
  const ru = a ? a[field] : null;
  const en = aEn ? aEn[field] : null;
  if (!isEn || !aEn) return ru;
  if (en == null || en === '' || (Array.isArray(en) && !en.length)) {
    if (ru && ru.length) {
      console.warn('EN: нет перевода «' + field + '» у ' + slug + ' — показан русский оригинал');
    }
    return ru;
  }
  if (Array.isArray(en) && Array.isArray(ru) && en.length !== ru.length) {
    console.warn('EN: «' + field + '» у ' + slug + ' — в переводе ' + en.length + ', в оригинале ' + ru.length);
  }
  return en;
}

/**
 * Абсолютный адрес картинки — для og:image и JSON-LD. Картинки общие для двух
 * языков (в `en/` их нет), поэтому адрес всегда от корня сайта.
 */
function siteImg(relPath) {
  if (!relPath) return '';
  return SITE + '/' + relPath;
}

function page(p, lang) {
  const isEn = lang === 'en';
  const pl = isEn ? PLACEHOLDER_EN : PLACEHOLDER_RU;
  const en = performancesEn[p.slug] || {};
  const title = isEn ? (en.title || p.title) : p.title;
  const author = isEn ? (en.author != null && en.author !== '' ? en.author : (p.author || '')) : (p.author || '');
  const theater = isEn ? en.theater || p.theater : p.theater;
  const url = (isEn ? '/en' : '') + '/performances/' + p.slug + '/';
  const badgeLive = isEn ? 'On stage' : 'Идёт';
  const badgeArchive = isEn ? 'Archive' : 'Архив';
  const badge = p.status === 'live'
    ? '<span class="badge badge--live">' + badgeLive + '</span>'
    : '<span class="badge">' + badgeArchive + '</span>';
  const backLabel = isEn ? 'All performances' : 'Все спектакли';
  const imgAlt = title + ' ' + pl.gallery;

  // Обложка: у части спектаклей это ссылка на старый сайт, у части — наш
  // локальный файл (путь без базы, withBase() его дополняет).
  const imgPath = p.image || '';
  const imgSrc = /^https?:\/\//.test(imgPath) ? imgPath : withBase('/' + imgPath);
  const jsonldImage = /^https?:\/\//.test(imgPath) ? imgPath : siteImg(imgPath);
  const gallery = galleries[p.slug] || null;
  const photos = gallery && gallery.photos ? gallery.photos : [];

  // Галерея: сетка из превью, лайтбокс открывает полный размер. Если
  // фотографий нет (16 спектаклей без архива) — показываем одну афишу.
  const photoLabel = isEn ? 'Production photograph' : 'Снимок спектакля';
  const sketchLabel = isEn ? 'Set design sketch' : 'Эскиз декораций';
  const galleryItems = photos.length
    ? photos
        .map(function (ph) {
          const isSketch = ph.kind === 'makET';
          // Подпись в лайтбоксе — только когда она есть: у съёмок
          // постановки показывать нечего, пустая строка лишняя.
          const caption = isSketch ? sketchLabel : (ph.caption || '');
          const alt = (isSketch ? sketchLabel : photoLabel) + ' — ' + title;
          return (
            '<figure class="gallery__item">' +
            '<a class="gallery__link" href="' + withBase('/' + ph.full) + '" data-lightbox="' + p.slug + '" data-caption="' + esc(caption) + '">' +
            '<img src="' + withBase('/' + ph.thumb) + '" alt="' + esc(alt) + '" loading="lazy" />' +
            '</a>' +
            '</figure>'
          );
        })
        .join('')
    : (
        '<figure class="gallery__item">' +
        '<a class="gallery__link" href="' + imgSrc + '" data-lightbox="' + p.slug + '" data-caption="' + esc(title) + '">' +
        '<img src="' + imgSrc + '" alt="' + esc(imgAlt) + '" loading="lazy" />' +
        '</a>' +
        '</figure>'
      );

  // Тексты из архива заказчика. Их нет у 16 спектаклей — для них остаются
  // заглушки, которые показываем явно.
  const a = performancesArchive[p.slug] || null;
  // Перевод (шаг 10) берётся исключительно при isEn — на русской странице
  // английского текста быть не должно (подводный камень 11).
  const aEn = isEn ? (performancesArchiveEn[p.slug] || null) : null;

  const descText = text(p.slug, isEn, a, aEn, 'description') || [];
  const epigraphText = text(p.slug, isEn, a, aEn, 'epigraph') || [];
  const teamText = text(p.slug, isEn, a, aEn, 'team') || [];
  const pressText = text(p.slug, isEn, a, aEn, 'press') || [];
  const awardsText = text(p.slug, isEn, a, aEn, 'awards') || [];
  const premiereText = text(p.slug, isEn, a, aEn, 'premiere');
  const cityText = text(p.slug, isEn, a, aEn, 'city');

  const hasDescription = descText.length > 0;
  // Пока перевода нет, русский текст на EN-странице показываем с пометкой и
  // ссылкой на русскую версию — молча смешивать языки нельзя.
  const ruNote = isEn && a && !aEn
    ? '<p class="perf-page__lang-note">The director’s text and the production details are published in Russian. ' +
      '<a href="' + withBase('/performances/' + p.slug + '/') + '">Read in Russian</a></p>'
    : '';

  const epigraph = epigraphText.length
    ? '<div class="perf-page__epigraph animate-on-scroll">' +
      epigraphText
        .map(function (line) {
          return '<p>' + esc(line) + '</p>';
        })
        .join('') +
      '</div>'
    : '';

  const description = hasDescription
    ? '<div class="perf-page__desc">' + paragraphs(descText) + '</div>'
    : '<p class="perf-page__desc">' + esc(pl.description) + '</p>';

  const team = teamText.length
    ? teamList(teamText)
    : '<p class="perf-page__desc">' + pl.team + '</p>';

  const press = a
    ? (a.press.length
        ? linkList(
            a.press.map(function (it, i) {
              return { url: it.url, label: (pressText[i] && pressText[i].label) || it.label };
            }),
            isEn ? 'Press' : 'Пресса'
          )
        : '<p class="perf-page__desc">' + (isEn ? 'No press materials.' : 'Пресса не писала об этой постановке.') + '</p>')
    : '<p class="perf-page__desc">' + pl.press + '</p>';

  const videos = a
    ? (a.videos.length
        ? linkList(a.videos, isEn ? 'Watch the performance' : 'Посмотреть спектакль')
        : '<p class="perf-page__desc">' + (isEn ? 'No video available.' : 'Видеозаписи нет.') + '</p>')
    : '<p class="perf-page__desc">' + pl.videos + '</p>';

  const premiere = a ? (premiereText || String(a.year)) : pl.premiere;
  const city = cityText ? esc(cityText) : '';
  const awards = awardsText.length
    ? '<ul>' + awardsText.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'
    : '';

  const site = SITE;
  // Лид описания режиссёра идёт в meta description: «Театр + Режиссёр» мало,
  // а первые слова описания объясняют, что за работа. Обрезаем по границе
  // слова, чтобы не оставить обрывок.
const lead = hasDescription ? descText[0] : '';
  const leadBase = (
    lead
      ? lead.length > 150 ? lead.slice(0, 147).replace(/\s\S*$/, '') + '…' : lead
      : title + '. ' + theater
  )
    .replace(/\s+/g, ' ')
    // хвостовую точку/вопросительный знак убираем, дальше своя пунктуация —
    // иначе выходит «Which plays … love?. Director». Кавычки-ёлочки не трогаем.
    .replace(/[.!?…\s]+$/, '');
  const metaDescription = leadBase + (isEn ? '. Director Pavel Pronin.' : '. Режиссёр Павел Пронин.');

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': title,
    'author': { '@type': 'Person', 'name': isEn ? 'Pavel Pronin' : 'Павел Пронин' },
    'url': site + url,
    'image': jsonldImage || undefined,
    'dateCreated': p.year ? String(p.year) : undefined
  };

  let t = 'Театр', o = 'О спектакле', info = 'Сведения о постановке', pr = 'Премьера', cityLabel = 'Город', cr = 'Творческая команда', aw = 'Фестивали и награды', prs = 'Пресса', vid = 'Видео', ph = 'Фотографии', phHint = 'Снимки постановки и эскизы декораций';
  if (isEn) { t = 'Theatre'; o = 'About the play'; info = 'Production details'; pr = 'Premiere'; cityLabel = 'City'; cr = 'Creative team'; aw = 'Festivals and awards'; prs = 'Press'; vid = 'Video'; ph = 'Photos'; phHint = 'Production photographs and set design sketches'; }

  const body =
    '<section class="section perf-page__head">' +
    '<div class="container">' +
    '<a class="perf-page__back animate-on-scroll" href="' + withBase(isEn ? '/en/performances/' : '/performances/') + '"><span class="arrow">→</span>' + backLabel + '</a>' +
    '<div class="perf-page__meta animate-on-scroll">' +
    badge +
    '<span>' + p.year + '</span>' +
    '</div>' +
    '<h1 class="perf-page__title animate-on-scroll">' + esc(title) + '</h1>' +
    (author ? '<p class="perf-page__author animate-on-scroll">' + esc(author) + '</p>' : '') +
    '</div>' +
    '</section>' +

    '<section class="section section--tight">' +
    '<div class="container">' +
    '<div class="perf-page__cover animate-on-scroll">' +
    '<img src="' + imgSrc + '" alt="' + esc(imgAlt) + '" />' +
    '</div>' +
    ruNote +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">' + t + '</h2>' +
    '<p class="perf-page__desc">' + esc(theater) + '</p>' +
    '</div>' +

    epigraph +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">' + o + '</h2>' +
    description +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">' + info + '</h2>' +
    '<div class="perf-page__specs">' +
    '<div class="perf-spec"><span class="perf-spec__label">' + pr + '</span><span class="perf-spec__value">' + esc(premiere) + '</span></div>' +
    (city ? '<div class="perf-spec"><span class="perf-spec__label">' + cityLabel + '</span><span class="perf-spec__value">' + city + '</span></div>' : '') +
    '<div class="perf-spec"><span class="perf-spec__label">' + cr + '</span><div class="perf-spec__value">' + team + '</div></div>' +
    (awards ? '<div class="perf-spec"><span class="perf-spec__label">' + aw + '</span><div class="perf-spec__value">' + awards + '</div></div>' : '') +
    '</div>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">' + prs + '</h2>' +
    '<div class="perf-spec__value">' + press + '</div>' +
    '</div>' +

    '<div class="perf-page__section animate-on-scroll">' +
    '<h2 class="perf-page__section-title">' + vid + '</h2>' +
    '<div class="perf-spec__value">' + videos + '</div>' +
    '</div>' +

    (photos.length
      ? '<div class="perf-page__section animate-on-scroll">' +
        '<h2 class="perf-page__section-title">' + ph + '</h2>' +
        '<p class="perf-page__hint">' + esc(phHint) + '</p>' +
        '<div class="gallery">' + galleryItems + '</div>' +
        '</div>'
      : '') +
    '</div>' +
    '</section>';

  const opts = {
    active: 'performances',
    enPath: '/en/performances/' + p.slug + '/',
    ruPath: isEn ? '/performances/' + p.slug + '/' : undefined,
    title: metaTitle(title, theater, p.year, isEn),
    description: metaDescription,
    ogDescription: theater,
    ogImage: jsonldImage || undefined,
    ogType: 'article',
    canonical: url,
    jsonld,
    body,
    cssHref,
    jsSrc
  };

  return isEn ? wrapHtmlEn(opts) : wrapHtml(opts);
}

let count = 0;
for (const p of performances) {
  const dir = join(outDir, 'performances', p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page(p, 'ru'), 'utf8');

  const dirEn = join(outDir, 'en', 'performances', p.slug);
  mkdirSync(dirEn, { recursive: true });
  writeFileSync(join(dirEn, 'index.html'), page(p, 'en'), 'utf8');
  count++;
}
console.log('Сгенерировано страниц спектаклей: ' + count + ' → dist/performances/<slug>/ и dist/en/performances/<slug>/');

// Спектакли из архива без английского перевода: на EN-странице они покажут
// русский текст с пометкой. Список нужен, чтобы видеть объём незакрытого.
const withoutEn = Object.keys(performancesArchive).filter(function (slug) {
  return !performancesArchiveEn[slug];
});
if (withoutEn.length) {
  console.log('Без перевода EN (текст режиссёра): ' + withoutEn.length + ' из ' + Object.keys(performancesArchive).length + ' → ' + withoutEn.join(', '));
}

// --- robots.txt ---
writeFileSync(join(outDir, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: ' + SITE + '/sitemap.xml\n', 'utf8');

// --- sitemap (спектакли + педагогические проекты, RU + EN) ---
const pedagogyPaths = new Set();
const pedagogyPathsEn = new Set();
try {
  const { pedagogyProjects } = await import('../src/data/pedagogy-data.js');
  pedagogyProjects.forEach(function (pr) {
    if (pr.slug) pedagogyPaths.add(SITE + '/pedagogy/' + pr.slug + '/');
    if (pr.slug) pedagogyPathsEn.add(SITE + '/en/pedagogy/' + pr.slug + '/');
  });
} catch (e) {
  console.error('Не удалось прочитать педагогические проекты для sitemap:', e.message);
}

const newsPaths = new Set();
const newsPathsEn = new Set();
try {
  const { posts } = await import('../src/data/news-data.js');
  posts.forEach(function (n) {
    if (n.slug) newsPaths.add(SITE + '/news/' + n.slug + '/');
    if (n.slug) newsPathsEn.add(SITE + '/en/news/' + n.slug + '/');
  });
} catch (e) {
  console.error('Не удалось прочитать новости для sitemap:', e.message);
}

const inscenizationPaths = new Set();
try {
  const { inscenizations } = await import('../src/data/inscenizations-data.js');
  inscenizations.forEach(function (i) {
    // EN-страниц инсценировок нет: тексты не переведены (решение 04.10.2026).
    if (i.slug) inscenizationPaths.add(SITE + '/inscenizations/' + i.slug + '/');
  });
} catch (e) {
  console.error('Не удалось прочитать инсценировки для sitemap:', e.message);
}

const staticPages = [
  '',
  'performances/',
  'pedagogy/',
  'inscenizations/',
  'news/'
];

const staticPagesEn = [
  'en/',
  'en/performances/',
  'en/pedagogy/',
  'en/inscenizations/',
  'en/news/'
];

const urls = [];
const today = new Date().toISOString().slice(0, 10);
staticPages.forEach(function (p) {
  urls.push({ loc: SITE + '/' + p, lastmod: today, priority: p === '' ? '1.0' : '0.8' });
});
staticPagesEn.forEach(function (p) {
  urls.push({ loc: SITE + '/' + p, lastmod: today, priority: '0.7' });
});
performances.forEach(function (p) {
  urls.push({
    loc: SITE + '/performances/' + p.slug + '/',
    lastmod: today,
    priority: p.status === 'live' ? '0.9' : '0.6'
  });
  urls.push({
    loc: SITE + '/en/performances/' + p.slug + '/',
    lastmod: today,
    priority: p.status === 'live' ? '0.8' : '0.5'
  });
});
pedagogyPaths.forEach(function (loc) {
  urls.push({ loc: loc, lastmod: today, priority: '0.6' });
});
pedagogyPathsEn.forEach(function (loc) {
  urls.push({ loc: loc, lastmod: today, priority: '0.5' });
});
newsPaths.forEach(function (loc) {
  urls.push({ loc: loc, lastmod: today, priority: '0.6' });
});
newsPathsEn.forEach(function (loc) {
  urls.push({ loc: loc, lastmod: today, priority: '0.5' });
});
inscenizationPaths.forEach(function (loc) {
  urls.push({ loc: loc, lastmod: today, priority: '0.6' });
});

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(function (u) {
    return (
      '  <url>\n' +
      '    <loc>' + u.loc + '</loc>\n' +
      '    <lastmod>' + u.lastmod + '</lastmod>\n' +
      '    <priority>' + u.priority + '</priority>\n' +
      '  </url>'
    );
  }).join('\n') +
  '\n</urlset>\n';

writeFileSync(join(outDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('Сгенерированы robots.txt и sitemap.xml (' + urls.length + ' URL).');
