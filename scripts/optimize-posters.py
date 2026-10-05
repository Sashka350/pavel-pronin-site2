"""
optimize-posters.py — пережать уже перенесённые афиши (public/images/performances/
<slug>/poster.webp) до параметров афиши в import-photos.py: 1200px по длинной
стороне, WebP q74.

Зачем (шаг 11, проверка скорости): афиша — обложка страницы спектакля и карточка
каталога, то есть первый экран. После переноса фотографий афиша «Тимур и его
команда» весила 323 КБ — это 84% веса страницы, а самый тяжёлый элемент первого
экрана должен быть лёгким.

Запуск из корня проекта:  python scripts/optimize-posters.py
Скрипт идемпотентный: файлы, которые уже меньше 1200px и легче 60 КБ, не трогает.
Пережать из архива заново можно import-photos.py — он уже сохраняет афиши с
этими параметрами.
"""
import os
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTERS_DIR = os.path.join(ROOT, 'public', 'images', 'performances')
MAX_SIDE = 1200
QUALITY = 74
SKIP_UNDER = 60 * 1024  # меньше 60 КБ пережимать смысла нет


def main():
    if not os.path.isdir(POSTERS_DIR):
        print('Нет папки с афишами: ' + POSTERS_DIR)
        return
    total_before = total_after = 0
    for slug in sorted(os.listdir(POSTERS_DIR)):
        path = os.path.join(POSTERS_DIR, slug, 'poster.webp')
        if not os.path.isfile(path):
            continue
        before = os.path.getsize(path)
        total_before += before
        if before < SKIP_UNDER:
            print('%-28s %6d КБ  пропущен (уже лёгкая)' % (slug, before / 1024))
            total_after += before
            continue
        im = Image.open(path)
        w, h = im.size
        im = ImageOps.exif_transpose(im)
        if max(w, h) > MAX_SIDE:
            scale = MAX_SIDE / float(max(w, h))
            im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
        if im.mode not in ('RGB', 'RGBA'):
            im = im.convert('RGB')
        im.save(path, 'WEBP', quality=QUALITY, method=6)
        after = os.path.getsize(path)
        total_after += after
        print('%-28s %6d -> %5d КБ  %dx%d' % (slug, before / 1024, after / 1024, im.size[0], im.size[1]))
    print('\nВсего афиш: %d КБ -> %d КБ' % (total_before / 1024, total_after / 1024))


if __name__ == '__main__':
    main()