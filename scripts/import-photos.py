"""
import-photos.py — перенос фотографий из архива заказчика на сайт.

Запуск (из корня проекта):
    python scripts/import-photos.py

Источник: `Материалы для сайта.zip` (445 МБ, в git не коммитится). В нём
12 папок «Спектакль NN Название», в каждой — фотографии постановки
(«Фото», «Фотографии», «Фотографии спектакля»), эскизы декораций
(«Фотографии макета») и афиши (папка «Афиша» / «Фото афиша»).

Почему Python, а не Node: пережать и переверстать JPEG без потери качества
на чистом Node нельзя, а ставить sharp ради одноразовой операции не хочется.
Скрипт одноразовый, результат его работы (файлы картинок и
`src/data/performances-gallery.js`) лежит в git.

Что делает:
  1. Для каждого спектакля выбирает афишу (см. POSTERS) и кладёт её в
     `public/images/performances/<slug>/poster.webp`.
  2. Остальные снимки кладёт в `.../gallery/NN.webp` (до 1600px) и
     `.../gallery/NN-sm.webp` (превью 600px) — формат WebP, качество 82.
  3. Пишет `src/data/performances-gallery.js`: slug → { poster, photos[] }.

Что пропускает и почему:
  * два TIFF по 368 и 130 МБ из «Отрочества» — это те же афиши, что лежат
    рядом файлами `май 1.jpg` и `май 2.jpg` (те же размеры в пикселях);
  * копии афиш, попавшие в папку с фотографиями (у «Тимура и его команда»
    два файла повторяются) — иначе афиша показывалась бы дважды;
  * картинки меньше 400px по короткой стороне — в сетке галереи они всё равно
    показываются мелко;
  * лишние файлы из папок «Афиша» / «Фото афиша»: афиша показывается отдельно
    (обложка и карточка каталога), а в галерею снимков постановки попадали бы
    фотографии буклета на столе и витрины кассы.

Скрипт НЕ трогает `src/data/performances-data.js`: путь к картинке в реестре
(`image`) ставится руками — там же год и статус.
"""
import io
import json
import os
import re
import zipfile

from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARCHIVE = os.path.join(ROOT, 'Материалы для сайта.zip')
IMAGES = os.path.join(ROOT, 'public', 'images', 'performances')
OUT_DATA = os.path.join(ROOT, 'src', 'data', 'performances-gallery.js')

# Афиша для каждого спектакля. Выбрана глазами по распакованным файлам:
# в папках «Афиша» лежит не только настоящая афиша, но и просто фотографии
# (буклет на столе, витрина кассы, фасад театра), а у двух спектаклей
# папки с афишей нет вовсе.
#   slug → (папка, имя файла) или None, если афиши в архиве нет
POSTERS = {
    'boyhood': ('Афиши', 'май 1.jpg'),
    'gagarinway': ('Афиша', 'IMG_3083.JPG'),
    'intheceilingthestarsareshining': ('Афиша', '17967018_1330186023713385_7613522504421188907_o.jpg'),
    'zoikasappartament': ('Афиша', 'IMG_8727.PNG'),
    'comedyoferrors': ('Афиша', 'IMG_8872.JPEG'),
    'acityinlove': ('Афиша', 'IMG_9816.JPEG'),
    'parodist': ('Афиша', 'IMG_4596.JPEG'),
    'starboy': None,
    'backtomurder': ('Фото афиша', '7TeKOPifvgfu3BbYvbkrv0Ngo70Y2USwpwTAi1ztOLxcYVTgicuFH21OslQWYJXGegDuJd-M.jpg'),
    'timurandhisteam': ('Афиша', 'RV-MITZS8akozQCUz5rxaCF8LMrCy7I2UrlGavYkYlegF9tnJFD5CI4KQJbDtfBOaQKIict9.jpg'),
    'nutcracker': ('Афиша', 'Ap2pDlVaJ45PVSG9orIJ095QDekkdr9ib-azjG-8XimRwjlIWcwHBtpmLTFcOkqZ_fMe9CiC.jpg'),
    'warsawmelody': ('Афиша', 'Varshavskaya_afisha.webp'),
}

# Папка → slug реестра. Порядок номеров в именах папок («Спектакль 01…»)
# не связан с порядком в реестре, поэтому соответствие задано явно.
SLUGS = {
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
    '12': 'warsawmelody',
}

FULL_MAX = 1600
SMALL_MAX = 600
POSTER_MAX = 1200
QUALITY = 82
# Афиша — обложка страницы спектакля и карточка каталога, она в первом экране.
# На шаге 11 замерили: 1400px q82 давали до 323 КБ, это 84% веса страницы.
POSTER_QUALITY = 74

# Ниже этого размера по короткой стороне кадр в галерее не берём: в сетке
# он всё равно показан мелким, а в лайтбоксе мылит. 640×426 и750×499
# проходят — они нормальные по качеству.
MIN_SIDE = 400

# Папки с афишами. В галерею они не идут: афиша показывается отдельно
# (обложка страницы и карточка каталога), а лишние варианты вроде фотографии
# буклета на столе или витрины кассы смотрелись бы в галерее снимков
# постановки случайными кадрами.
POSTER_FOLDERS = {'афиша', 'афиши', 'фото афиша'}

# Подпись вида «фото спектакля» / «эскиз декораций» по имени папки.
KINDS = [
    ('макета', 'makET', 'Эскиз декораций'),
    ('макет', 'makET', 'Эскиз декораций'),
    ('фото', 'photo', ''),
    ('фотографии', 'photo', ''),
]

EXT = ('.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff')


def read_archive():
    """Список (путь, ZipInfo) с именами, переведёнными из cp866."""
    z = zipfile.ZipFile(ARCHIVE)
    items = []
    for info in z.infolist():
        name = info.filename
        if not (info.flag_bits & 0x800):
            # Флаг UTF-8 не выставлен: имена лежат в cp866, а zipfile
            # читает их как cp437. Подводный камень 21 в ПРОДОЛЖИТЬ.md.
            try:
                name = name.encode('cp437').decode('cp866')
            except (UnicodeEncodeError, UnicodeDecodeError):
                pass
        items.append((name, info))
    return z, items


def kind_of(folder_name):
    low = folder_name.lower()
    for needle, kind, caption in KINDS:
        if needle in low:
            return kind, caption
    return None, ''


def fit(im, max_side):
    """Уменьшить по длинной стороне, не увеличивая."""
    w, h = im.size
    if max(w, h) <= max_side:
        return im
    scale = max_side / float(max(w, h))
    return im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)


def save_webp(im, path, max_side, quality=QUALITY):
    im = ImageOps.exif_transpose(im)
    if im.mode not in ('RGB', 'RGBA'):
        im = im.convert('RGB')
    if im.mode == 'RGBA':
        im.save(path, 'WEBP', quality=quality, method=6)
    else:
        fit(im, max_side).save(path, 'WEBP', quality=quality, method=6)
    return os.path.getsize(path)


def natural_key(name):
    """IMG_2430 < IMG_2431, чтобы номера кадров шли по порядку."""
    base = os.path.splitext(os.path.basename(name))[0]
    return [int(p) if p.isdigit() else p.lower() for p in re.split(r'(\d+)', base)]


def main():
    if not os.path.exists(ARCHIVE):
        raise SystemExit('Нет архива: ' + ARCHIVE)

    z, items = read_archive()

    # Раскладываем файлы по спектаклям.
    per_slug = {}
    for name, info in items:
        parts = name.split('/')
        if len(parts) < 3:
            continue
        m = re.match(r'Спектакль (\d\d)', parts[1])
        if not m:
            continue
        slug = SLUGS.get(m.group(1))
        if not slug:
            print('ПРЕДУПРЕЖДЕНИЕ: папка без slug: ' + parts[1])
            continue
        per_slug.setdefault(slug, []).append((parts[2], '/'.join(parts[3:]), info))

    report = []
    data = {}

    for num in sorted(SLUGS.values()):
        files = per_slug.get(num, [])
        if not files:
            print('НЕТ ФАЙЛОВ: ' + num)
            continue

        slug_dir = os.path.join(IMAGES, num)
        os.makedirs(os.path.join(slug_dir, 'gallery'), exist_ok=True)

        # --- Афиша ---
        poster_rel = None
        poster_spec = POSTERS.get(num)
        poster_crc = None
        if poster_spec:
            folder, want = poster_spec
            found = None
            for f, sub, info in files:
                if f == folder and sub == want:
                    found = info
                    break
            if found is None:
                print('ПРЕДУПРЕЖДЕНИЕ: афиша не найдена у ' + num + ': ' + str(poster_spec))
            else:
                im = Image.open(io.BytesIO(z.read(found)))
                poster_crc = found.CRC
                save_webp(im, os.path.join(slug_dir, 'poster.webp'), POSTER_MAX, POSTER_QUALITY)
                poster_rel = 'images/performances/%s/poster.webp' % num
                report.append('%s  афиша  %sx%s  %s' % (num, im.size[0], im.size[1], want))

        # --- Галерея ---
        # Порядок папок: съёмка постановки, потом эскизы декораций. Внутри
        # папки — по имени файла, чтобы IMG_2430 шёл раньше IMG_2431
        # (иначе кадры в галерее идут как попало в архиве).
        def sort_key(item):
            folder, sub, info = item
            rank = 1 if kind_of(folder)[0] == 'makET' else 0
            return (rank, natural_key(sub))

        photos = []
        seen_crc = {poster_crc} if poster_crc is not None else set()
        for folder, sub, info in sorted(files, key=sort_key):
            if not sub.lower().endswith(EXT):
                continue
            if folder.lower() in POSTER_FOLDERS:
                if poster_crc is None or info.CRC != poster_crc:
                    report.append('%s  афиша, в галерею не берём  %s/%s'
                                  % (num, folder, sub))
                continue
            kind, caption = kind_of(folder)
            if kind is None:
                print('ПРЕДУПРЕЖДЕНИЕ: папка без фотографий: %s/%s' % (folder, sub))
                continue
            if info.CRC in seen_crc:
                # Точный дубль: у «Тимура и его команда» файлы из папки
                # «Афиша» побайтово повторяются в «Фотографиях спектакля».
                continue
            try:
                im = Image.open(io.BytesIO(z.read(info)))
                w, h = im.size
            except Exception as e:
                print('ПРОПУЩЕН (не читается): %s/%s — %s' % (folder, sub, e))
                continue

            seen_crc.add(info.CRC)

            if min(w, h) < MIN_SIDE:
                report.append('%s  ПРОПУЩЕН мелкий %dx%d  %s/%s'
                              % (num, w, h, folder, sub))
                continue

            n = len(photos) + 1
            full_rel = 'images/performances/%s/gallery/%02d.webp' % (num, n)
            small_rel = 'images/performances/%s/gallery/%02d-sm.webp' % (num, n)
            full_path = os.path.join(slug_dir, 'gallery', '%02d.webp' % n)
            small_path = os.path.join(slug_dir, 'gallery', '%02d-sm.webp' % n)
            full_bytes = save_webp(im, full_path, FULL_MAX)
            small_bytes = save_webp(im, small_path, SMALL_MAX)

            entry = {'full': full_rel, 'thumb': small_rel, 'kind': kind}
            if caption:
                entry['caption'] = caption
            photos.append(entry)
            report.append('%s  %-5s %5dx%-5d %6d/%6d  %s/%s' % (
                num, kind, w, h, small_bytes, full_bytes, folder, sub))

        data[num] = {'poster': poster_rel, 'photos': photos}

    lines = [
        '/**',
        ' * performances-gallery.js — фотографии спектаклей.',
        ' * Собрано из `Материалы для сайта.zip` 05.10.2026 скриптом',
        ' * `scripts/import-photos.py`. Пути относительные, без ведущего слэша и',
        ' * без базового пути: BASE подставляет каталог (import.meta.env.BASE_URL),',
        ' * генератор — withBase().',
        ' *',
        ' * Поля записи спектакля:',
        ' *   poster — афиша (обложка страницы, карточка каталога, og:image);',
        ' *   photos[] — снимки постановки:',
        ' *     full  — до 1600px WebP, для лайтбокса;',
        ' *     thumb — превью 600px WebP, для сетки галереи;',
        ' *     kind  — \'photo\' (фото спектакля) | \'makET\' (эскиз декораций);',
        ' *     caption — подпись, если есть.',
        ' *',
        ' * Правь руками, если нужно поменять подписи или порядок; повторный запуск',
        ' * скрипта перезапишет файл целиком.',
        ' */',
        '',
        'export const galleries = {',
    ]
    for slug in sorted(SLUGS.values()):
        entry = data.get(slug)
        if not entry:
            continue
        lines.append("  %s: {" % slug)
        lines.append("    poster: %s," % json.dumps(entry['poster'], ensure_ascii=False))
        lines.append('    photos: [')
        for ph in entry['photos']:
            parts = ["full: %s" % json.dumps(ph['full'], ensure_ascii=False)]
            parts.append("thumb: %s" % json.dumps(ph['thumb'], ensure_ascii=False))
            parts.append("kind: '%s'" % ph['kind'])
            if ph.get('caption'):
                parts.append('caption: %s' % json.dumps(ph['caption'], ensure_ascii=False))
            lines.append('      { ' + ', '.join(parts) + ' },')
        lines.append('    ]')
        lines.append('  },')
    lines.append('};')
    lines.append('')

    os.makedirs(os.path.dirname(OUT_DATA), exist_ok=True)
    with open(OUT_DATA, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))

    # Отчёт — вне public/, иначе он попадёт в dist и будет отдаваться
    # как файл на сайте.
    report_path = os.path.join(ROOT, 'фото-отчёт.txt')
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(report))

    total_photos = sum(len(v['photos']) for v in data.values())
    print('Спектаклей: %d, фото: %d, отчёт: фото-отчёт.txt'
          % (len(data), total_photos))


if __name__ == '__main__':
    main()