/**
 * import-inscenization.mjs — конвейер «файл Павла → текст на сайте».
 *
 * Запуск (из корня проекта):
 *   node scripts/import-inscenization.mjs
 *
 * Что делает: берёт `inscenizations-src/<slug>.docx` (файлы, присланные режиссёром)
 * и кладёт текст в `src/data/inscenizations/<slug>.txt`.
 * Формат txt: абзацы разделены пустой строкой, строка сцены начинается с `# `,
 * строка списка действующих лиц — с `- `, полужирное — `{b}…{/b}`, курсивное —
 * `{i}…{/i}`. Дальше `scripts/generate-inscenizations.mjs` собирает из txt
 * страницу — правьте txt руками, если нужно.
 *
 * Зависимостей нет: docx распаковывается своим чтением zip (node:zlib).
 *
 * Если Паша пришлёт `.doc` (старый формат Word) — сначала пересохраните его в
 * `.docx` (Файл → Сохранить как → Документ Word) и положите в `inscenizations-src/`.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'inscenizations-src');
const OUT = join(root, 'src', 'data', 'inscenizations');

/**
 * Границы разделов в каждом файле. Номера строк — после удаления шапки
 * (строки 1…DROP_HEAD), с нуля. castAt — строка «Действующие лица»
 * (castEnd — на −1, если списка нет), castEnd — первая строка текста.
 * Числа выверены по всем 11 файлам; для нового файла посмотрите начало
 * текста в Word и поправьте.
 */
const LAYOUT = {
  chroniclesofnarnia: { drop: 4, castAt: 0, castEnd: 15 },
  intheceilingthestarsareshining: { drop: 3, castAt: 0, castEnd: 10 },
  cynics: { drop: 3, castAt: 0, castEnd: 10 },
  timurandhisteam: { drop: 4, castAt: 4, castEnd: 15 },
  thegoldenkey: { drop: 5, castAt: 0, castEnd: 20 },
  nutcracker: { drop: 4, castAt: 0, castEnd: 28 },
  thethreefatmen: { drop: 3, castAt: 1, castEnd: 21 },
  teenager: { drop: 3, castAt: 1, castEnd: 15 },
  butterball: { drop: 3, castAt: 1, castEnd: 14 },
  captainsdaughter: { drop: 6, castAt: -1, castEnd: 0 },
  boywithasword: { drop: 2, castAt: 1, castEnd: 13 }
};

/**
 * Сколько строк в начале файла не показываем на сайте: это название, автор
 * первоисточника и подпись «по мотивам…» — они уже есть в данных страницы
 * (title, author в src/data/inscenizations-data.js).
 */
function dropHead(slug) {
  const l = LAYOUT[slug];
  if (!l) throw new Error(slug + ': нет записи в LAYOUT');
  return l.drop;
}

/** Служебные строки в конце файла: «полный текст по запросу», почта, «КОНЕЦ». */
const FOOTER_RE = [
  /^полный текст инсценировки/i,
  /^по\s*запросу/i,
  /^почту$/i,
  /pavel\.pronin1986@gmail\.com/i,
  /^конец(\s|$)/i
];

/**
 * Заголовок сцены/акта/картины. Важно: после кириллицы нельзя ставить \b —
 * в регулярках JS без флага u кириллица не считается «буквой слова».
 */
const SCENE_RE = /^(?:[а-яё]+\s+)?(?:сцена|эпизод|картина|действие|часть|разговор|акт|пролог|эпилог|интерлюдия)(\s|:|\.|$)/i;

/** Ключевое слово, по которому строка из заглавных букв считается заголовком. */
const HEAD_WORD_RE = /(?:ДЕЙСТВИЕ|СЦЕНА|ЭПИЗОД|КАРТИНА|ЧАСТЬ|РАЗГОВОР|ПРОЛОГ|ЭПИЛОГ|АКТ|ИНТЕРЛЮДИЯ|ПРИЕЗД|ФИНАЛ)/i;

function readZipEntry(buf, wanted) {
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
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(off) !== 0x02014b50) throw new Error('zip: битое оглавление');
    const method = buf.readUInt16LE(off + 10);
    const compSize = buf.readUInt32LE(off + 20);
    const nameLen = buf.readUInt16LE(off + 28);
    const extraLen = buf.readUInt16LE(off + 30);
    const commentLen = buf.readUInt16LE(off + 32);
    const localOff = buf.readUInt32LE(off + 42);
    const name = buf.toString('utf8', off + 46, off + 46 + nameLen);
    if (name === wanted) {
      const lNameLen = buf.readUInt16LE(localOff + 26);
      const lExtraLen = buf.readUInt16LE(localOff + 28);
      const start = localOff + 30 + lNameLen + lExtraLen;
      const data = buf.subarray(start, start + compSize);
      return method === 0 ? data : inflateRawSync(data);
    }
    off += 46 + nameLen + extraLen + commentLen;
  }
  throw new Error('zip: нет ' + wanted);
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
 * Абзацы Word → строки, где полужирное и курсивное помечены.
 * Разбираем runs (`<w:r>`), а не абзац целиком: иначе имя говорящего и ремарки
 * теряют начертание, а режиссёр писал их полужирным и курсивом намеренно.
 * Возвращает те же строки, что и раньше, но с `**…**` и `*…*`.
 */
function docxParagraphs(file) {
  const xml = readZipEntry(readFileSync(file), 'word/document.xml').toString('utf8');
  return xml
    .split('</w:p>')
    .map((p) => {
      const runs = [];
      const runRe = /<w:r(?:\s[^>]*)?>([\s\S]*?)<\/w:r>/g;
      let m;
      while ((m = runRe.exec(p))) {
        const inner = m[1];
        const text = decode(
          inner
            .replace(/<w:tab[^>]*\/>/g, ' ')
            // Перенос строки внутри абзаца — это отдельная строка текста,
            // иначе заголовок сцены склеивается с предыдущим абзацем.
            .replace(/<w:br[^>]*\/>/g, '\n')
            .replace(/<w:cr[^>]*\/>/g, '\n')
            .replace(/<[^>]+>/g, '')
        );
        if (!text) continue;
        runs.push({
          text,
          // <w:iCs> — это сложный курсив, обычный курсив он не ловит.
          bold: /<w:b(?:\s[^>]*)?\/?>/.test(inner),
          italic: /<w:i(?:\s[^>]*)?\/?>/.test(inner)
        });
      }
      return runs;
    })
    .flatMap((runs) => markRuns(runs).split('\n'))
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .filter(Boolean);
}

/**
 * Runs → строка с разметкой: `{b}полужирное{/b}`, `{i}курсивное{/i}`,
 * оба вместе — `{b}{i}…{/i}{/b}`. Разметку выбрали тегами, а не `**` и `_`,
 * потому что в оригинале курсив и полужирное вложены друг в друга
 * (ремарка целиком курсивная, а имя внутри неё — полужирное курсивное),
 * и звёздочки в таком виде читаются неоднозначно.
 */
function markRuns(runs) {
  const merged = [];
  runs.forEach(function (r) {
    const last = merged[merged.length - 1];
    if (last && last.bold === r.bold && last.italic === r.italic) last.text += r.text;
    else merged.push({ text: r.text, bold: r.bold, italic: r.italic });
  });
  while (merged.length && !merged[0].text.trim()) merged.shift();
  while (merged.length && !merged[merged.length - 1].text.trim()) merged.pop();
  return merged
    .map(function (r) {
      const t = r.text.replace(/\s+/g, ' ');
      if (!r.bold && !r.italic) return t;
      // Пробелы по краям выносим за теги, иначе выделение «съедает» их.
      const lead = /^\s*/.exec(t)[0];
      const tail = /\s*$/.exec(t)[0];
      const core = t.slice(lead.length, t.length - tail.length);
      if (!core) return t;
      let out = core;
      if (r.italic) out = '{i}' + out + '{/i}';
      if (r.bold) out = '{b}' + out + '{/b}';
      return lead + out + tail;
    })
    .join('');
}

/** Убрать разметку — для заголовков сцен и строк списка действующих лиц. */
function stripMarks(s) {
  return s.replace(/\{\/?[bi]\}/g, '');
}

function isUpperLine(line) {
  const letters = line.replace(/[^A-Za-zА-Яа-яЁё]/g, '');
  return letters.length > 2 && letters === letters.toUpperCase();
}

function isSceneHeading(line) {
  if (line.length > 90) return false;
  if (isUpperLine(line)) return HEAD_WORD_RE.test(line);
  return SCENE_RE.test(line);
}

function convert(file, slug) {
  const { castAt, castEnd } = LAYOUT[slug];
  const all = docxParagraphs(file);
  const lines = all.slice(dropHead(slug)).filter((l) => !FOOTER_RE.some((re) => re.test(stripMarks(l))));

  const out = [];
  lines.forEach(function (line, i) {
    if (i === castAt) {
      out.push('# ' + stripMarks(line).replace(/[:\s]+$/, ''));
      return;
    }
    if (isSceneHeading(stripMarks(line))) {
      out.push('# ' + stripMarks(line).replace(/[:\s]+$/, ''));
      return;
    }
    // Строка списка действующих лиц помечается дефисом — иначе при сборке
    // абзацев их нельзя отличить друг от друга. В заголовках и списке
    // разметку снимаем: она там не нужна, а в обычных абзацах — сохраняем.
    const inCast = castAt >= 0 && i > castAt && i < castEnd;
    out.push((inCast ? '- ' : '') + (inCast ? stripMarks(line) : line));
  });

  return out.join('\n\n') + '\n';
}

mkdirSync(OUT, { recursive: true });
let count = 0;
for (const name of readdirSync(SRC).filter((n) => n.endsWith('.docx')).sort()) {
  const slug = name.replace(/\.docx$/, '');
  if (!existsSync(join(SRC, name))) continue;
  const text = convert(join(SRC, name), slug);
  writeFileSync(join(OUT, slug + '.txt'), text, 'utf8');
  const paragraphs = text.split('\n\n').length;
  console.log(slug + ': ' + paragraphs + ' блоков, ' + text.length + ' символов');
  count++;
}
console.log('Импортировано файлов: ' + count + ' → src/data/inscenizations/<slug>.txt');