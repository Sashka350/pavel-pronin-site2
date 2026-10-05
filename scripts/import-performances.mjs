/**
 * import-performances.mjs — конвейер «файлы из архива → данные спектаклей».
 *
 * Запуск (из корня проекта):
 *   node scripts/import-performances.mjs
 *
 * Источник: `Материалы для сайта.zip` (архив заказчика, 445 МБ — в git не
 * коммитится). В нём 12 папок «Спектакль NN Название», в каждой один `.docx`
 * с готовой структурой:
 *
 *   название / автор / эпиграф (курсив, выключка вправо) / описание
 *   Театр / Город / Премьера / Режиссёр / Художник-постановщик
 *   (Хореограф / Художник по свету — не везде) / Фестивали и награды /
 *   Пресса (название + URL) / Ссылка на видео (URL либо «видео не осталось»).
 *
 * Архив целиком не распаковывается: там два TIFF на 300+ и 130 МБ, а нужны
 * 12 `.docx` по 16–19 КБ. Читаем zip своим кодом на `node:zlib`, зависимостей
 * нет. Имена файлов в архиве — в кодировке cp866 (флаг UTF-8 не выставлен),
 * поэтому читаются через `new TextDecoder('ibm866')`; внутри `.docx` имена
 * уже UTF-8.
 *
 * Что делает: пишет `src/data/performances-archive.js` — тексты 12 спектаклей
 * по `slug`. Реестр (`src/data/performances-data.js`) скрипт не трогает: там
 * год, статус и картинка, их надо править руками. Файл перезаписывается
 * целиком, поэтому правки руками после импорта будут потеряны — импортируйте
 * один раз, а потом правьте `performances-archive.js`.
 *
 * Повторить для новых файлов: положить их в тот же архив и запустить скрипт.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';
import { performances } from '../src/data/performances-data.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ARCHIVE = join(root, 'Материалы для сайта.zip');
const OUT = join(root, 'src', 'data', 'performances-archive.js');

/**
 * Папка архива → slug реестра. Порядок номеров в именах папок («Спектакль 01…»)
 * не связан с порядком в реестре, поэтому соответствие задано явно. Ошибка в
 * таблице не приведёт к тихой потере данных: скрипт сверяет каждый slug с
 * `performances-data.js` и падает, если такого там нет.
 */
const SLUGS = {
  '01': 'boyhood',
  '02': 'gagarinway',
  '03': 'intheceilingthestarsareshining',
  '04': 'zoikasappartament',
  '05': 'comedyoferrors',
  '06': 'acityinlove',
  '07': 'parodist',
  '08': 'starboy',
  '09': 'backtomurder',
  '10': 'timurandhisteam',
  '11': 'nutcracker',
  '12': 'warsawmelody'
};

/** Одиночные поля «подпись — значение». */
const SCALARS = {
  'театр': 'theater',
  'город': 'city',
  'премьера': 'premiere'
};

/** Подписи ролей в команде: значение под ними — имя. */
const TEAM_ROLES = [
  'режиссёр',
  'режиссёр, автор инсценировки',
  'режиссёр, автор инсценировки и текстов песен',
  'художник-постановщик',
  'художник',
  'художник по костюмам',
  'художник по свету',
  'хореограф',
  'композитор',
  'музыкальный руководитель',
  'режиссёр по пластике',
  'педагог по вокалу'
];

/** Подписи, после которых идёт список, а не «подпись — значение». */
const LIST_LABELS = {
  'пресса': 'press',
  'ссылка на видео': 'videos',
  'фестивали и награды': 'awards',
  'награды и фестивали': 'awards'
};

/** Подписи ролей, отсортированные по длине: иначе «Художник» съел бы
 *  «Художник по свету» — проверка идёт по началу строки. */
const TEAM_ROLES_SORTED = TEAM_ROLES.slice().sort(function (a, b) {
  return b.length - a.length;
});

const URL_RE = /https?:\/\/[^\s<>"]+/i;

/** Подпись поля или '' — так проверять её в условии удобнее. */
function labelOf(text) {
  const key = norm(text);
  if (key in SCALARS) return key;
  if (key in LIST_LABELS) return key;
  return TEAM_ROLES_SORTED.find(function (r) {
    return key === r || key.startsWith(r + ',') || key.startsWith(r + ' ');
  }) || '';
}

function norm(s) {
  return s.toLowerCase().replace(/\s+/g, ' ').replace(/[:.\s]+$/, '').trim();
}

/** Прочитать оглавление zip: имена и смещения записей. */
function zipEntries(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= 0; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error('zip: не найден конец архива');

  const count = buf.readUInt16LE(eocd + 10);
  let off = buf.readUInt32LE(eocd + 16);
  const out = [];
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(off) !== 0x02014b50) throw new Error('zip: битое оглавление');
    const method = buf.readUInt16LE(off + 10);
    const compSize = buf.readUInt32LE(off + 20);
    const nameLen = buf.readUInt16LE(off + 28);
    const extraLen = buf.readUInt16LE(off + 30);
    const commentLen = buf.readUInt16LE(off + 32);
    const localOff = buf.readUInt32LE(off + 42);
    const flags = buf.readUInt16LE(off + 8);
    const raw = buf.subarray(off + 46, off + 46 + nameLen);
    const name = flags & 0x800 ? raw.toString('utf8') : new TextDecoder('ibm866').decode(raw);
    out.push({ name, method, compSize, localOff });
    off += 46 + nameLen + extraLen + commentLen;
  }
  return out;
}

/** Достать содержимое записи zip по её локальному заголовку. */
function zipRead(buf, entry) {
  const lNameLen = buf.readUInt16LE(entry.localOff + 26);
  const lExtraLen = buf.readUInt16LE(entry.localOff + 28);
  const start = entry.localOff + 30 + lNameLen + lExtraLen;
  const data = buf.subarray(start, start + entry.compSize);
  return entry.method === 0 ? data : inflateRawSync(data);
}

function decode(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&amp;/g, '&');
}

/**
 * Абзацы Word → { text, italic, align }. Разбираем runs, потому что эпиграф
 * набран курсивом, и по одной только разметке абзаца его не отличить от
 * обычного текста.
 */
function docxParagraphs(buf) {
  const inner = zipEntries(buf);
  const entry = inner.find((e) => e.name === 'word/document.xml');
  if (!entry) throw new Error('в .docx нет word/document.xml');
  const xml = zipRead(buf, entry).toString('utf8');

  return xml
    .split('</w:p>')
    .map((p) => {
      const runs = [];
      const runRe = /<w:r(?:\s[^>]*)?>([\s\S]*?)<\/w:r>/g;
      let m;
      while ((m = runRe.exec(p))) {
        const innerRun = m[1];
        const text = decode(
          innerRun
            .replace(/<w:tab[^>]*\/>/g, ' ')
            .replace(/<w:br[^>]*\/>/g, '\n')
            .replace(/<w:cr[^>]*\/>/g, '\n')
            .replace(/<[^>]+>/g, '')
        );
        if (!text) continue;
        runs.push({
          text,
          bold: /<w:b(?:\s[^>]*)?\/?>/.test(innerRun),
          italic: /<w:i(?:\s[^>]*)?\/?>/.test(innerRun)
        });
      }
      const jc = /<w:jc w:val="([^"]+)"/.exec(p);
      const body = runs.filter((r) => r.text.trim());
      return {
        // Runs склеиваем все, включая пробельные: иначе «20» и «апреля» из
        // разных runs схлопываются в «20апреля» — такое в файлах есть.
        text: runs.map((r) => r.text).join('').replace(/\s+/g, ' ').trim(),
        // Абзац целиком курсивный — так режиссёр помечает эпиграф и цитаты
        // в ремарках; смешанное начертание не считаем.
        italic: body.length > 0 && body.every((r) => r.italic),
        align: jc ? jc[1] : ''
      };
    })
    .filter((p) => p.text);
}

/** «15 апреля 2016 года» → «15 апреля 2016 г.», год отдельным числом. */
function normalizePremiere(value) {
  const year = /(\d{4})/.exec(value);
  // `\b` после кириллицы в JS не работает (кириллица не «буква слова»),
  // поэтому «года» ищем явно.
  const short = value
    .replace(/\s*года?\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  return { text: short + ' г.', year: year ? Number(year[1]) : null };
}

/**
 * Пресса: строки идут произвольно — то «название» и URL на следующей строке,
 * то всё в одной строке («название // источник от даты https://…»). Прочие
 * строки без URL («И видео не осталось у меня.», «Тут же есть только один
 * анонс.») — это заметки режиссёра себе, на сайте их не показываем.
 */
function parseLinks(lines, warnings) {
  const out = [];
  let pending = null;
  lines.forEach((line) => {
    const m = URL_RE.exec(line);
    if (!m) {
      if (/^https?/i.test(line)) return;
      pending = line;
      return;
    }
    let label = line.replace(m[0], '').replace(/\s*\/\/\s*$/, '').replace(/\s{2,}/g, ' ').trim();
    if (!label) label = pending || '';
    // Ссылка может прийти с utm-метками (в файлах режиссёра есть, в одной —
    // с utm_referrer на старый Squarespace). На сайте они лишние, особенно
    // если ссылку потом перешлют.
    const clean = m[0].replace(/[?&](utm_[^=]+=[^&#]*|utm_referrer=[^&#]*)/gi, '').replace(/[?&]$/, '');
    out.push({ label: label, url: clean });
    pending = null;
  });
  lines.filter((l) => !URL_RE.test(l)).forEach((l) => {
    if (out.some((o) => o.label === l)) return;
    warnings.push('без URL, пропущено: ' + l);
  });
  return out;
}

function convert(fileBuf, warnings) {
  const paras = docxParagraphs(fileBuf);

  // Шапка: название, автор, затем эпиграф (курсив, выключка вправо).
  const title = paras[0].text;
  const author = paras[1] ? paras[1].text : '';
  const epigraph = [];
  let i = 2;
  while (i < paras.length && paras[i].italic) {
    epigraph.push(paras[i].text);
    i++;
  }

  // Описание — всё до подписи «Театр».
  const description = [];
  while (i < paras.length && labelOf(paras[i].text) !== 'театр') {
    description.push(paras[i].text);
    i++;
  }

  const out = {
    title,
    author,
    epigraph,
    description,
    city: '',
    premiere: '',
    year: null,
    team: [],
    awards: [],
    press: [],
    videos: []
  };

  let mode = null;
  let pending = null;
  const list = { press: [], awards: [], videos: [] };

  for (; i < paras.length; i++) {
    const p = paras[i];
    const key = norm(p.text);

    if (key in SCALARS) {
      pending = SCALARS[key];
      mode = null;
      continue;
    }
    if (key in LIST_LABELS) {
      mode = LIST_LABELS[key];
      pending = null;
      continue;
    }
    const role = TEAM_ROLES_SORTED.find(function (r) {
      return key === r || key.startsWith(r + ',') || key.startsWith(r + ' ');
    });
    if (role) {
      // Роль берём как в файле («Режиссёр, автор инсценировки»), а не по
      // таблице: подписи вроде «Режиссёр, автор инсценировки и текстов песен»
      // режиссёр писал сам, и терять уточнение незачем.
      pending = { team: p.text };
      mode = null;
      continue;
    }
    if (mode) {
      list[mode].push(p.text);
      continue;
    }
    if (typeof pending === 'string') {
      if (pending === 'premiere') {
        const pr = normalizePremiere(p.text);
        out.premiere = pr.text;
        out.year = pr.year;
      } else {
        out[pending] = p.text;
      }
      pending = null;
      continue;
    }
    if (pending && pending.team) {
      out.team.push({ role: pending.team, name: p.text });
      pending = null;
      continue;
    }
    warnings.push('нераспознанная строка: ' + p.text);
  }

  out.press = parseLinks(list.press, warnings);
  out.videos = parseLinks(list.videos, warnings).map((v) => ({ label: '', url: v.url }));
  out.awards = list.awards;
  return out;
}

const known = new Set(performances.map((p) => p.slug));
const archive = readFileSync(ARCHIVE);
const files = zipEntries(archive).filter((e) => /\.docx$/i.test(e.name));

const result = {};
files.forEach((entry) => {
  const num = /Спектакль (\d\d)/.exec(entry.name);
  const slug = num ? SLUGS[num[1]] : null;
  if (!slug) throw new Error('нет slug для ' + entry.name);
  if (!known.has(slug)) throw new Error('slug ' + slug + ' не найден в performances-data.js');
  if (result[slug]) throw new Error('дубль ' + slug);

  const warnings = [];
  const data = convert(zipRead(archive, entry), warnings);

  result[slug] = data;
  console.log(
    slug +
      ': абзацев ' + data.description.length +
      ', эпиграф ' + data.epigraph.length +
      ', команда ' + data.team.length +
      ', пресса ' + data.press.length +
      ', награды ' + data.awards.length +
      ', видео ' + data.videos.length +
      ', премьера ' + data.premiere
  );
  warnings.forEach((w) => console.log('   ! ' + w));
});

const missing = Object.keys(SLUGS).filter((n) => !files.some((e) => new RegExp('Спектакль ' + n + ' ').test(e.name)));
if (missing.length) console.warn('В архиве нет папок: ' + missing.join(', '));

const js =
  '/**\n' +
  ' * performances-archive.js — тексты спектаклей из архива заказчика.\n' +
  ' *\n' +
  ' * Собран автоматически: `node scripts/import-performances.mjs`\n' +
  ' * (источник — `Материалы для сайта.zip`, 12 файлов `.docx`).\n' +
  ' * Файл перезаписывается импортом целиком — правьте его руками,\n' +
  ' * импортировать второй раз не нужно.\n' +
  ' *\n' +
  ' * Поля (по slug из performances-data.js):\n' +
  ' *   title, author — как в файле режиссёра;\n' +
  ' *   epigraph    — эпиграф, массив строк;\n' +
  ' *   description — описание режиссёра, массив абзацев;\n' +
  ' *   city, premiere, year — город, дата премьеры, год;\n' +
  ' *   team        — [{ role, name }], роль как в файле;\n' +
  ' *   awards      — фестивали и награды, массив строк;\n' +
  ' *   press       — [{ label, url }] (только настоящие ссылки);\n' +
  ' *   videos      — [{ url }].\n' +
  ' *\n' +
  ' * Чего здесь нет: фотографий (архив с ними не распаковывается) и\n' +
  ' * английского перевода — это шаги 9 (фото) и 10 (EN).\n' +
  ' */\n' +
  'export const performancesArchive = ' +
  JSON.stringify(result, null, 2).replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, '$1:').replace(/"/g, "'") +
  ';\n';

writeFileSync(OUT, js, 'utf8');
console.log('\nЗаписано ' + Object.keys(result).length + ' спектаклей → src/data/performances-archive.js');