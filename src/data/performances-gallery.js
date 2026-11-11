/**
 * performances-gallery.js — фотографии и афиши спектаклей.
 * Собрано из архива заказчика 05.10.2026 скриптом
 * `scripts/import-photos.py`; 11.11.2026 дополнено из актуальной папки
 * «Материалы для сайта» на Яндекс.Диске (17 новых галерей, афиши).
 * Пути относительные, без ведущего слэша и без базового пути: BASE
 * подставляет каталог (import.meta.env.BASE_URL), генератор — withBase().
 *
 * Поля записи спектакля:
 *   poster — афиша (обложка страницы, карточка каталога, og:image);
 *   photos[] — снимки постановки:
 *     full  — до 1600px WebP, для лайтбокса;
 *     thumb — превью 600px WebP, для сетки галереи;
 *     kind  — 'photo' (фото спектакля) | 'makET' (макет/эскиз декораций);
 *     caption — «Макет декораций» или «Эскиз декораций» для kind 'makET'.
 *
 * Правь руками, если нужно поменять подписи или порядок; повторный запуск
 * скрипта перезапишет файл целиком.
 */

export const galleries = {
  acityinlove: {
    poster: "images/performances/acityinlove/poster.webp",
    photos: [
      { full: "images/performances/acityinlove/gallery/01.webp", thumb: "images/performances/acityinlove/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/acityinlove/gallery/02.webp", thumb: "images/performances/acityinlove/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/acityinlove/gallery/03.webp", thumb: "images/performances/acityinlove/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/acityinlove/gallery/04.webp", thumb: "images/performances/acityinlove/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/acityinlove/gallery/05.webp", thumb: "images/performances/acityinlove/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/acityinlove/gallery/06.webp", thumb: "images/performances/acityinlove/gallery/06-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/acityinlove/gallery/07.webp", thumb: "images/performances/acityinlove/gallery/07-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/acityinlove/gallery/08.webp", thumb: "images/performances/acityinlove/gallery/08-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/acityinlove/gallery/09.webp", thumb: "images/performances/acityinlove/gallery/09-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/acityinlove/gallery/10.webp", thumb: "images/performances/acityinlove/gallery/10-sm.webp", kind: 'makET', caption: "Макет декораций" },
    ]
  },
  babayagakids: {
    poster: "images/performances/babayagakids/poster.webp",
    photos: [
      { full: "images/performances/babayagakids/gallery/01.webp", thumb: "images/performances/babayagakids/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/babayagakids/gallery/02.webp", thumb: "images/performances/babayagakids/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/babayagakids/gallery/03.webp", thumb: "images/performances/babayagakids/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/babayagakids/gallery/04.webp", thumb: "images/performances/babayagakids/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/babayagakids/gallery/05.webp", thumb: "images/performances/babayagakids/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/babayagakids/gallery/06.webp", thumb: "images/performances/babayagakids/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/babayagakids/gallery/07.webp", thumb: "images/performances/babayagakids/gallery/07-sm.webp", kind: 'photo' },
    ]
  },
  babayagawoment: {
    poster: "images/performances/babayagawoment/poster.webp",
    photos: [
      { full: "images/performances/babayagawoment/gallery/01.webp", thumb: "images/performances/babayagawoment/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/babayagawoment/gallery/02.webp", thumb: "images/performances/babayagawoment/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/babayagawoment/gallery/03.webp", thumb: "images/performances/babayagawoment/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/babayagawoment/gallery/04.webp", thumb: "images/performances/babayagawoment/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/babayagawoment/gallery/05.webp", thumb: "images/performances/babayagawoment/gallery/05-sm.webp", kind: 'photo' },
    ]
  },
  babytimetalkshow: {
    poster: "images/performances/babytimetalkshow/poster.webp",
    photos: [
      { full: "images/performances/babytimetalkshow/gallery/01.webp", thumb: "images/performances/babytimetalkshow/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/babytimetalkshow/gallery/02.webp", thumb: "images/performances/babytimetalkshow/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/babytimetalkshow/gallery/03.webp", thumb: "images/performances/babytimetalkshow/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/babytimetalkshow/gallery/04.webp", thumb: "images/performances/babytimetalkshow/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/babytimetalkshow/gallery/05.webp", thumb: "images/performances/babytimetalkshow/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/babytimetalkshow/gallery/06.webp", thumb: "images/performances/babytimetalkshow/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/babytimetalkshow/gallery/07.webp", thumb: "images/performances/babytimetalkshow/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/babytimetalkshow/gallery/08.webp", thumb: "images/performances/babytimetalkshow/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/babytimetalkshow/gallery/09.webp", thumb: "images/performances/babytimetalkshow/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/babytimetalkshow/gallery/10.webp", thumb: "images/performances/babytimetalkshow/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/babytimetalkshow/gallery/11.webp", thumb: "images/performances/babytimetalkshow/gallery/11-sm.webp", kind: 'photo' },
      { full: "images/performances/babytimetalkshow/gallery/12.webp", thumb: "images/performances/babytimetalkshow/gallery/12-sm.webp", kind: 'photo' },
      { full: "images/performances/babytimetalkshow/gallery/13.webp", thumb: "images/performances/babytimetalkshow/gallery/13-sm.webp", kind: 'photo' },
      { full: "images/performances/babytimetalkshow/gallery/14.webp", thumb: "images/performances/babytimetalkshow/gallery/14-sm.webp", kind: 'photo' },
      { full: "images/performances/babytimetalkshow/gallery/15.webp", thumb: "images/performances/babytimetalkshow/gallery/15-sm.webp", kind: 'photo' },
    ]
  },
  backtomurder: {
    poster: "images/performances/backtomurder/poster.webp",
    photos: [
      { full: "images/performances/backtomurder/gallery/01.webp", thumb: "images/performances/backtomurder/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/backtomurder/gallery/02.webp", thumb: "images/performances/backtomurder/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/backtomurder/gallery/03.webp", thumb: "images/performances/backtomurder/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/backtomurder/gallery/04.webp", thumb: "images/performances/backtomurder/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/backtomurder/gallery/05.webp", thumb: "images/performances/backtomurder/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/backtomurder/gallery/06.webp", thumb: "images/performances/backtomurder/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/backtomurder/gallery/07.webp", thumb: "images/performances/backtomurder/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/backtomurder/gallery/08.webp", thumb: "images/performances/backtomurder/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/backtomurder/gallery/09.webp", thumb: "images/performances/backtomurder/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/backtomurder/gallery/10.webp", thumb: "images/performances/backtomurder/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/backtomurder/gallery/11.webp", thumb: "images/performances/backtomurder/gallery/11-sm.webp", kind: 'photo' },
      { full: "images/performances/backtomurder/gallery/12.webp", thumb: "images/performances/backtomurder/gallery/12-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/backtomurder/gallery/13.webp", thumb: "images/performances/backtomurder/gallery/13-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/backtomurder/gallery/14.webp", thumb: "images/performances/backtomurder/gallery/14-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/backtomurder/gallery/15.webp", thumb: "images/performances/backtomurder/gallery/15-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/backtomurder/gallery/16.webp", thumb: "images/performances/backtomurder/gallery/16-sm.webp", kind: 'makET', caption: "Макет декораций" },
    ]
  },
  boyhood: {
    poster: "images/performances/boyhood/poster.webp",
    photos: [
      { full: "images/performances/boyhood/gallery/01.webp", thumb: "images/performances/boyhood/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/boyhood/gallery/02.webp", thumb: "images/performances/boyhood/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/boyhood/gallery/03.webp", thumb: "images/performances/boyhood/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/boyhood/gallery/04.webp", thumb: "images/performances/boyhood/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/boyhood/gallery/05.webp", thumb: "images/performances/boyhood/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/boyhood/gallery/06.webp", thumb: "images/performances/boyhood/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/boyhood/gallery/07.webp", thumb: "images/performances/boyhood/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/boyhood/gallery/08.webp", thumb: "images/performances/boyhood/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/boyhood/gallery/09.webp", thumb: "images/performances/boyhood/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/boyhood/gallery/10.webp", thumb: "images/performances/boyhood/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/boyhood/gallery/11.webp", thumb: "images/performances/boyhood/gallery/11-sm.webp", kind: 'photo' },
    ]
  },
  comedyoferrors: {
    poster: "images/performances/comedyoferrors/poster.webp",
    photos: [
      { full: "images/performances/comedyoferrors/gallery/01.webp", thumb: "images/performances/comedyoferrors/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/comedyoferrors/gallery/02.webp", thumb: "images/performances/comedyoferrors/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/comedyoferrors/gallery/03.webp", thumb: "images/performances/comedyoferrors/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/comedyoferrors/gallery/04.webp", thumb: "images/performances/comedyoferrors/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/comedyoferrors/gallery/05.webp", thumb: "images/performances/comedyoferrors/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/comedyoferrors/gallery/06.webp", thumb: "images/performances/comedyoferrors/gallery/06-sm.webp", kind: 'photo' },
    ]
  },
  dedmoroz: {
    poster: "null",
    photos: [
      { full: "images/performances/dedmoroz/gallery/01.webp", thumb: "images/performances/dedmoroz/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/dedmoroz/gallery/02.webp", thumb: "images/performances/dedmoroz/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/dedmoroz/gallery/03.webp", thumb: "images/performances/dedmoroz/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/dedmoroz/gallery/04.webp", thumb: "images/performances/dedmoroz/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/dedmoroz/gallery/05.webp", thumb: "images/performances/dedmoroz/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/dedmoroz/gallery/06.webp", thumb: "images/performances/dedmoroz/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/dedmoroz/gallery/07.webp", thumb: "images/performances/dedmoroz/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/dedmoroz/gallery/08.webp", thumb: "images/performances/dedmoroz/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/dedmoroz/gallery/09.webp", thumb: "images/performances/dedmoroz/gallery/09-sm.webp", kind: 'photo' },
    ]
  },
  fivespoonsofelixir: {
    poster: "images/performances/fivespoonsofelixir/poster.webp",
    photos: [
      { full: "images/performances/fivespoonsofelixir/gallery/01.webp", thumb: "images/performances/fivespoonsofelixir/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/fivespoonsofelixir/gallery/02.webp", thumb: "images/performances/fivespoonsofelixir/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/fivespoonsofelixir/gallery/03.webp", thumb: "images/performances/fivespoonsofelixir/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/fivespoonsofelixir/gallery/04.webp", thumb: "images/performances/fivespoonsofelixir/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/fivespoonsofelixir/gallery/05.webp", thumb: "images/performances/fivespoonsofelixir/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/fivespoonsofelixir/gallery/06.webp", thumb: "images/performances/fivespoonsofelixir/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/fivespoonsofelixir/gallery/07.webp", thumb: "images/performances/fivespoonsofelixir/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/fivespoonsofelixir/gallery/08.webp", thumb: "images/performances/fivespoonsofelixir/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/fivespoonsofelixir/gallery/09.webp", thumb: "images/performances/fivespoonsofelixir/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/fivespoonsofelixir/gallery/10.webp", thumb: "images/performances/fivespoonsofelixir/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/fivespoonsofelixir/gallery/11.webp", thumb: "images/performances/fivespoonsofelixir/gallery/11-sm.webp", kind: 'photo' },
      { full: "images/performances/fivespoonsofelixir/gallery/12.webp", thumb: "images/performances/fivespoonsofelixir/gallery/12-sm.webp", kind: 'photo' },
      { full: "images/performances/fivespoonsofelixir/gallery/13.webp", thumb: "images/performances/fivespoonsofelixir/gallery/13-sm.webp", kind: 'photo' },
      { full: "images/performances/fivespoonsofelixir/gallery/14.webp", thumb: "images/performances/fivespoonsofelixir/gallery/14-sm.webp", kind: 'photo' },
    ]
  },
  gagarinway: {
    poster: "images/performances/gagarinway/poster.webp",
    photos: [
      { full: "images/performances/gagarinway/gallery/01.webp", thumb: "images/performances/gagarinway/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/gagarinway/gallery/02.webp", thumb: "images/performances/gagarinway/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/gagarinway/gallery/03.webp", thumb: "images/performances/gagarinway/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/gagarinway/gallery/04.webp", thumb: "images/performances/gagarinway/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/gagarinway/gallery/05.webp", thumb: "images/performances/gagarinway/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/gagarinway/gallery/06.webp", thumb: "images/performances/gagarinway/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/gagarinway/gallery/07.webp", thumb: "images/performances/gagarinway/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/gagarinway/gallery/08.webp", thumb: "images/performances/gagarinway/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/gagarinway/gallery/09.webp", thumb: "images/performances/gagarinway/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/gagarinway/gallery/10.webp", thumb: "images/performances/gagarinway/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/gagarinway/gallery/11.webp", thumb: "images/performances/gagarinway/gallery/11-sm.webp", kind: 'photo' },
    ]
  },
  intheceilingthestarsareshining: {
    poster: "images/performances/intheceilingthestarsareshining/poster.webp",
    photos: [
      { full: "images/performances/intheceilingthestarsareshining/gallery/01.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/intheceilingthestarsareshining/gallery/02.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/intheceilingthestarsareshining/gallery/03.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/intheceilingthestarsareshining/gallery/04.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/intheceilingthestarsareshining/gallery/05.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/intheceilingthestarsareshining/gallery/06.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/intheceilingthestarsareshining/gallery/07.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/intheceilingthestarsareshining/gallery/08.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/intheceilingthestarsareshining/gallery/09.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/intheceilingthestarsareshining/gallery/10.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/intheceilingthestarsareshining/gallery/11.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/11-sm.webp", kind: 'photo' },
      { full: "images/performances/intheceilingthestarsareshining/gallery/12.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/12-sm.webp", kind: 'photo' },
      { full: "images/performances/intheceilingthestarsareshining/gallery/13.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/13-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/14.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/14-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/15.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/15-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/16.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/16-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/17.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/17-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/18.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/18-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/19.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/19-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/20.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/20-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/21.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/21-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/22.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/22-sm.webp", kind: 'makET', caption: "Макет декораций" },
    ]
  },
  kalleblomkvist: {
    poster: "images/performances/kalleblomkvist/poster.webp",
    photos: [
      { full: "images/performances/kalleblomkvist/gallery/01.webp", thumb: "images/performances/kalleblomkvist/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/02.webp", thumb: "images/performances/kalleblomkvist/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/03.webp", thumb: "images/performances/kalleblomkvist/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/04.webp", thumb: "images/performances/kalleblomkvist/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/05.webp", thumb: "images/performances/kalleblomkvist/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/06.webp", thumb: "images/performances/kalleblomkvist/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/07.webp", thumb: "images/performances/kalleblomkvist/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/08.webp", thumb: "images/performances/kalleblomkvist/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/09.webp", thumb: "images/performances/kalleblomkvist/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/10.webp", thumb: "images/performances/kalleblomkvist/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/11.webp", thumb: "images/performances/kalleblomkvist/gallery/11-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/12.webp", thumb: "images/performances/kalleblomkvist/gallery/12-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/13.webp", thumb: "images/performances/kalleblomkvist/gallery/13-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/14.webp", thumb: "images/performances/kalleblomkvist/gallery/14-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/15.webp", thumb: "images/performances/kalleblomkvist/gallery/15-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/16.webp", thumb: "images/performances/kalleblomkvist/gallery/16-sm.webp", kind: 'photo' },
      { full: "images/performances/kalleblomkvist/gallery/17.webp", thumb: "images/performances/kalleblomkvist/gallery/17-sm.webp", kind: 'photo' },
    ]
  },
  magicnutnutcracker: {
    poster: "images/performances/magicnutnutcracker/poster.webp",
    photos: [
      { full: "images/performances/magicnutnutcracker/gallery/01.webp", thumb: "images/performances/magicnutnutcracker/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/magicnutnutcracker/gallery/02.webp", thumb: "images/performances/magicnutnutcracker/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/magicnutnutcracker/gallery/03.webp", thumb: "images/performances/magicnutnutcracker/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/magicnutnutcracker/gallery/04.webp", thumb: "images/performances/magicnutnutcracker/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/magicnutnutcracker/gallery/05.webp", thumb: "images/performances/magicnutnutcracker/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/magicnutnutcracker/gallery/06.webp", thumb: "images/performances/magicnutnutcracker/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/magicnutnutcracker/gallery/07.webp", thumb: "images/performances/magicnutnutcracker/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/magicnutnutcracker/gallery/08.webp", thumb: "images/performances/magicnutnutcracker/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/magicnutnutcracker/gallery/09.webp", thumb: "images/performances/magicnutnutcracker/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/magicnutnutcracker/gallery/10.webp", thumb: "images/performances/magicnutnutcracker/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/magicnutnutcracker/gallery/11.webp", thumb: "images/performances/magicnutnutcracker/gallery/11-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/magicnutnutcracker/gallery/12.webp", thumb: "images/performances/magicnutnutcracker/gallery/12-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/magicnutnutcracker/gallery/13.webp", thumb: "images/performances/magicnutnutcracker/gallery/13-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/magicnutnutcracker/gallery/14.webp", thumb: "images/performances/magicnutnutcracker/gallery/14-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/magicnutnutcracker/gallery/15.webp", thumb: "images/performances/magicnutnutcracker/gallery/15-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
    ]
  },
  nutcracker: {
    poster: "images/performances/nutcracker/poster.webp",
    photos: [
      { full: "images/performances/nutcracker/gallery/01.webp", thumb: "images/performances/nutcracker/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/nutcracker/gallery/02.webp", thumb: "images/performances/nutcracker/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/nutcracker/gallery/03.webp", thumb: "images/performances/nutcracker/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/nutcracker/gallery/04.webp", thumb: "images/performances/nutcracker/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/nutcracker/gallery/05.webp", thumb: "images/performances/nutcracker/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/nutcracker/gallery/06.webp", thumb: "images/performances/nutcracker/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/nutcracker/gallery/07.webp", thumb: "images/performances/nutcracker/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/nutcracker/gallery/08.webp", thumb: "images/performances/nutcracker/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/nutcracker/gallery/09.webp", thumb: "images/performances/nutcracker/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/nutcracker/gallery/10.webp", thumb: "images/performances/nutcracker/gallery/10-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/nutcracker/gallery/11.webp", thumb: "images/performances/nutcracker/gallery/11-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/nutcracker/gallery/12.webp", thumb: "images/performances/nutcracker/gallery/12-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/nutcracker/gallery/13.webp", thumb: "images/performances/nutcracker/gallery/13-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/nutcracker/gallery/14.webp", thumb: "images/performances/nutcracker/gallery/14-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/nutcracker/gallery/15.webp", thumb: "images/performances/nutcracker/gallery/15-sm.webp", kind: 'makET', caption: "Макет декораций" },
    ]
  },
  parodist: {
    poster: "images/performances/parodist/poster.webp",
    photos: [
      { full: "images/performances/parodist/gallery/01.webp", thumb: "images/performances/parodist/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/parodist/gallery/02.webp", thumb: "images/performances/parodist/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/parodist/gallery/03.webp", thumb: "images/performances/parodist/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/parodist/gallery/04.webp", thumb: "images/performances/parodist/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/parodist/gallery/05.webp", thumb: "images/performances/parodist/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/parodist/gallery/06.webp", thumb: "images/performances/parodist/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/parodist/gallery/07.webp", thumb: "images/performances/parodist/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/parodist/gallery/08.webp", thumb: "images/performances/parodist/gallery/08-sm.webp", kind: 'photo' },
    ]
  },
  princessturandot: {
    poster: "images/performances/princessturandot/poster.webp",
    photos: [
      { full: "images/performances/princessturandot/gallery/01.webp", thumb: "images/performances/princessturandot/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/princessturandot/gallery/02.webp", thumb: "images/performances/princessturandot/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/princessturandot/gallery/03.webp", thumb: "images/performances/princessturandot/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/princessturandot/gallery/04.webp", thumb: "images/performances/princessturandot/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/princessturandot/gallery/05.webp", thumb: "images/performances/princessturandot/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/princessturandot/gallery/06.webp", thumb: "images/performances/princessturandot/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/princessturandot/gallery/07.webp", thumb: "images/performances/princessturandot/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/princessturandot/gallery/08.webp", thumb: "images/performances/princessturandot/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/princessturandot/gallery/09.webp", thumb: "images/performances/princessturandot/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/princessturandot/gallery/10.webp", thumb: "images/performances/princessturandot/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/princessturandot/gallery/11.webp", thumb: "images/performances/princessturandot/gallery/11-sm.webp", kind: 'photo' },
      { full: "images/performances/princessturandot/gallery/12.webp", thumb: "images/performances/princessturandot/gallery/12-sm.webp", kind: 'photo' },
    ]
  },
  remember: {
    poster: "images/performances/remember/poster.webp",
    photos: [
      { full: "images/performances/remember/gallery/01.webp", thumb: "images/performances/remember/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/02.webp", thumb: "images/performances/remember/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/03.webp", thumb: "images/performances/remember/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/04.webp", thumb: "images/performances/remember/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/05.webp", thumb: "images/performances/remember/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/06.webp", thumb: "images/performances/remember/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/07.webp", thumb: "images/performances/remember/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/08.webp", thumb: "images/performances/remember/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/09.webp", thumb: "images/performances/remember/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/10.webp", thumb: "images/performances/remember/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/11.webp", thumb: "images/performances/remember/gallery/11-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/12.webp", thumb: "images/performances/remember/gallery/12-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/13.webp", thumb: "images/performances/remember/gallery/13-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/14.webp", thumb: "images/performances/remember/gallery/14-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/15.webp", thumb: "images/performances/remember/gallery/15-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/16.webp", thumb: "images/performances/remember/gallery/16-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/17.webp", thumb: "images/performances/remember/gallery/17-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/18.webp", thumb: "images/performances/remember/gallery/18-sm.webp", kind: 'photo' },
      { full: "images/performances/remember/gallery/19.webp", thumb: "images/performances/remember/gallery/19-sm.webp", kind: 'photo' },
    ]
  },
  retro: {
    poster: "images/performances/retro/poster.webp",
    photos: [
      { full: "images/performances/retro/gallery/01.webp", thumb: "images/performances/retro/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/retro/gallery/02.webp", thumb: "images/performances/retro/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/retro/gallery/03.webp", thumb: "images/performances/retro/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/retro/gallery/04.webp", thumb: "images/performances/retro/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/retro/gallery/05.webp", thumb: "images/performances/retro/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/retro/gallery/06.webp", thumb: "images/performances/retro/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/retro/gallery/07.webp", thumb: "images/performances/retro/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/retro/gallery/08.webp", thumb: "images/performances/retro/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/retro/gallery/09.webp", thumb: "images/performances/retro/gallery/09-sm.webp", kind: 'photo' },
    ]
  },
  retrohbk: {
    poster: "null",
    photos: [
      { full: "images/performances/retrohbk/gallery/01.webp", thumb: "images/performances/retrohbk/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/retrohbk/gallery/02.webp", thumb: "images/performances/retrohbk/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/retrohbk/gallery/03.webp", thumb: "images/performances/retrohbk/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/retrohbk/gallery/04.webp", thumb: "images/performances/retrohbk/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/retrohbk/gallery/05.webp", thumb: "images/performances/retrohbk/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/retrohbk/gallery/06.webp", thumb: "images/performances/retrohbk/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/retrohbk/gallery/07.webp", thumb: "images/performances/retrohbk/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/retrohbk/gallery/08.webp", thumb: "images/performances/retrohbk/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/retrohbk/gallery/09.webp", thumb: "images/performances/retrohbk/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/retrohbk/gallery/10.webp", thumb: "images/performances/retrohbk/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/retrohbk/gallery/11.webp", thumb: "images/performances/retrohbk/gallery/11-sm.webp", kind: 'photo' },
      { full: "images/performances/retrohbk/gallery/12.webp", thumb: "images/performances/retrohbk/gallery/12-sm.webp", kind: 'photo' },
      { full: "images/performances/retrohbk/gallery/13.webp", thumb: "images/performances/retrohbk/gallery/13-sm.webp", kind: 'photo' },
      { full: "images/performances/retrohbk/gallery/14.webp", thumb: "images/performances/retrohbk/gallery/14-sm.webp", kind: 'photo' },
      { full: "images/performances/retrohbk/gallery/15.webp", thumb: "images/performances/retrohbk/gallery/15-sm.webp", kind: 'photo' },
    ]
  },
  scarletsails: {
    poster: "images/performances/scarletsails/poster.webp",
    photos: [
      { full: "images/performances/scarletsails/gallery/01.webp", thumb: "images/performances/scarletsails/gallery/01-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/scarletsails/gallery/02.webp", thumb: "images/performances/scarletsails/gallery/02-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/scarletsails/gallery/03.webp", thumb: "images/performances/scarletsails/gallery/03-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/scarletsails/gallery/04.webp", thumb: "images/performances/scarletsails/gallery/04-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/scarletsails/gallery/05.webp", thumb: "images/performances/scarletsails/gallery/05-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/scarletsails/gallery/06.webp", thumb: "images/performances/scarletsails/gallery/06-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/scarletsails/gallery/07.webp", thumb: "images/performances/scarletsails/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/scarletsails/gallery/08.webp", thumb: "images/performances/scarletsails/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/scarletsails/gallery/09.webp", thumb: "images/performances/scarletsails/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/scarletsails/gallery/10.webp", thumb: "images/performances/scarletsails/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/scarletsails/gallery/11.webp", thumb: "images/performances/scarletsails/gallery/11-sm.webp", kind: 'photo' },
      { full: "images/performances/scarletsails/gallery/12.webp", thumb: "images/performances/scarletsails/gallery/12-sm.webp", kind: 'photo' },
    ]
  },
  sorrowfromthemind: {
    poster: "images/performances/sorrowfromthemind/poster.webp",
    photos: [
      { full: "images/performances/sorrowfromthemind/gallery/01.webp", thumb: "images/performances/sorrowfromthemind/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/02.webp", thumb: "images/performances/sorrowfromthemind/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/03.webp", thumb: "images/performances/sorrowfromthemind/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/04.webp", thumb: "images/performances/sorrowfromthemind/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/05.webp", thumb: "images/performances/sorrowfromthemind/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/06.webp", thumb: "images/performances/sorrowfromthemind/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/07.webp", thumb: "images/performances/sorrowfromthemind/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/08.webp", thumb: "images/performances/sorrowfromthemind/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/09.webp", thumb: "images/performances/sorrowfromthemind/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/10.webp", thumb: "images/performances/sorrowfromthemind/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/11.webp", thumb: "images/performances/sorrowfromthemind/gallery/11-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/12.webp", thumb: "images/performances/sorrowfromthemind/gallery/12-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/13.webp", thumb: "images/performances/sorrowfromthemind/gallery/13-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/14.webp", thumb: "images/performances/sorrowfromthemind/gallery/14-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/15.webp", thumb: "images/performances/sorrowfromthemind/gallery/15-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/16.webp", thumb: "images/performances/sorrowfromthemind/gallery/16-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/17.webp", thumb: "images/performances/sorrowfromthemind/gallery/17-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/18.webp", thumb: "images/performances/sorrowfromthemind/gallery/18-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/19.webp", thumb: "images/performances/sorrowfromthemind/gallery/19-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/20.webp", thumb: "images/performances/sorrowfromthemind/gallery/20-sm.webp", kind: 'photo' },
      { full: "images/performances/sorrowfromthemind/gallery/21.webp", thumb: "images/performances/sorrowfromthemind/gallery/21-sm.webp", kind: 'photo' },
    ]
  },
  starboy: {
    poster: "null",
    photos: [
      { full: "images/performances/starboy/gallery/01.webp", thumb: "images/performances/starboy/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/starboy/gallery/02.webp", thumb: "images/performances/starboy/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/starboy/gallery/03.webp", thumb: "images/performances/starboy/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/starboy/gallery/04.webp", thumb: "images/performances/starboy/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/starboy/gallery/05.webp", thumb: "images/performances/starboy/gallery/05-sm.webp", kind: 'photo' },
    ]
  },
  starfall: {
    poster: "images/performances/starfall/poster.webp",
    photos: [
      { full: "images/performances/starfall/gallery/01.webp", thumb: "images/performances/starfall/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/starfall/gallery/02.webp", thumb: "images/performances/starfall/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/starfall/gallery/03.webp", thumb: "images/performances/starfall/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/starfall/gallery/04.webp", thumb: "images/performances/starfall/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/starfall/gallery/05.webp", thumb: "images/performances/starfall/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/starfall/gallery/06.webp", thumb: "images/performances/starfall/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/starfall/gallery/07.webp", thumb: "images/performances/starfall/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/starfall/gallery/08.webp", thumb: "images/performances/starfall/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/starfall/gallery/09.webp", thumb: "images/performances/starfall/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/starfall/gallery/10.webp", thumb: "images/performances/starfall/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/starfall/gallery/11.webp", thumb: "images/performances/starfall/gallery/11-sm.webp", kind: 'photo' },
    ]
  },
  theatrehistory: {
    poster: "images/performances/theatrehistory/poster.webp",
    photos: [
      { full: "images/performances/theatrehistory/gallery/01.webp", thumb: "images/performances/theatrehistory/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/theatrehistory/gallery/02.webp", thumb: "images/performances/theatrehistory/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/theatrehistory/gallery/03.webp", thumb: "images/performances/theatrehistory/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/theatrehistory/gallery/04.webp", thumb: "images/performances/theatrehistory/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/theatrehistory/gallery/05.webp", thumb: "images/performances/theatrehistory/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/theatrehistory/gallery/06.webp", thumb: "images/performances/theatrehistory/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/theatrehistory/gallery/07.webp", thumb: "images/performances/theatrehistory/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/theatrehistory/gallery/08.webp", thumb: "images/performances/theatrehistory/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/theatrehistory/gallery/09.webp", thumb: "images/performances/theatrehistory/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/theatrehistory/gallery/10.webp", thumb: "images/performances/theatrehistory/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/theatrehistory/gallery/11.webp", thumb: "images/performances/theatrehistory/gallery/11-sm.webp", kind: 'photo' },
    ]
  },
  thegoldenkey: {
    poster: "images/performances/thegoldenkey/poster.webp",
    photos: [
      { full: "images/performances/thegoldenkey/gallery/01.webp", thumb: "images/performances/thegoldenkey/gallery/01-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/thegoldenkey/gallery/02.webp", thumb: "images/performances/thegoldenkey/gallery/02-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/thegoldenkey/gallery/03.webp", thumb: "images/performances/thegoldenkey/gallery/03-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/thegoldenkey/gallery/04.webp", thumb: "images/performances/thegoldenkey/gallery/04-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/thegoldenkey/gallery/05.webp", thumb: "images/performances/thegoldenkey/gallery/05-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/thegoldenkey/gallery/06.webp", thumb: "images/performances/thegoldenkey/gallery/06-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/thegoldenkey/gallery/07.webp", thumb: "images/performances/thegoldenkey/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/thegoldenkey/gallery/08.webp", thumb: "images/performances/thegoldenkey/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/thegoldenkey/gallery/09.webp", thumb: "images/performances/thegoldenkey/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/thegoldenkey/gallery/10.webp", thumb: "images/performances/thegoldenkey/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/thegoldenkey/gallery/11.webp", thumb: "images/performances/thegoldenkey/gallery/11-sm.webp", kind: 'photo' },
      { full: "images/performances/thegoldenkey/gallery/12.webp", thumb: "images/performances/thegoldenkey/gallery/12-sm.webp", kind: 'photo' },
      { full: "images/performances/thegoldenkey/gallery/13.webp", thumb: "images/performances/thegoldenkey/gallery/13-sm.webp", kind: 'photo' },
      { full: "images/performances/thegoldenkey/gallery/14.webp", thumb: "images/performances/thegoldenkey/gallery/14-sm.webp", kind: 'photo' },
      { full: "images/performances/thegoldenkey/gallery/15.webp", thumb: "images/performances/thegoldenkey/gallery/15-sm.webp", kind: 'photo' },
      { full: "images/performances/thegoldenkey/gallery/16.webp", thumb: "images/performances/thegoldenkey/gallery/16-sm.webp", kind: 'photo' },
      { full: "images/performances/thegoldenkey/gallery/17.webp", thumb: "images/performances/thegoldenkey/gallery/17-sm.webp", kind: 'photo' },
    ]
  },
  thethreefatmen: {
    poster: "images/performances/thethreefatmen/poster.webp",
    photos: [
      { full: "images/performances/thethreefatmen/gallery/01.webp", thumb: "images/performances/thethreefatmen/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/02.webp", thumb: "images/performances/thethreefatmen/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/03.webp", thumb: "images/performances/thethreefatmen/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/04.webp", thumb: "images/performances/thethreefatmen/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/05.webp", thumb: "images/performances/thethreefatmen/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/06.webp", thumb: "images/performances/thethreefatmen/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/07.webp", thumb: "images/performances/thethreefatmen/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/08.webp", thumb: "images/performances/thethreefatmen/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/09.webp", thumb: "images/performances/thethreefatmen/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/10.webp", thumb: "images/performances/thethreefatmen/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/11.webp", thumb: "images/performances/thethreefatmen/gallery/11-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/12.webp", thumb: "images/performances/thethreefatmen/gallery/12-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/13.webp", thumb: "images/performances/thethreefatmen/gallery/13-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/14.webp", thumb: "images/performances/thethreefatmen/gallery/14-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/15.webp", thumb: "images/performances/thethreefatmen/gallery/15-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/16.webp", thumb: "images/performances/thethreefatmen/gallery/16-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/17.webp", thumb: "images/performances/thethreefatmen/gallery/17-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/18.webp", thumb: "images/performances/thethreefatmen/gallery/18-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/19.webp", thumb: "images/performances/thethreefatmen/gallery/19-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/20.webp", thumb: "images/performances/thethreefatmen/gallery/20-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/21.webp", thumb: "images/performances/thethreefatmen/gallery/21-sm.webp", kind: 'photo' },
      { full: "images/performances/thethreefatmen/gallery/22.webp", thumb: "images/performances/thethreefatmen/gallery/22-sm.webp", kind: 'photo' },
    ]
  },
  thewizardoftheemeraldcity: {
    poster: "images/performances/thewizardoftheemeraldcity/poster.webp",
    photos: [
      { full: "images/performances/thewizardoftheemeraldcity/gallery/01.webp", thumb: "images/performances/thewizardoftheemeraldcity/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/thewizardoftheemeraldcity/gallery/02.webp", thumb: "images/performances/thewizardoftheemeraldcity/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/thewizardoftheemeraldcity/gallery/03.webp", thumb: "images/performances/thewizardoftheemeraldcity/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/thewizardoftheemeraldcity/gallery/04.webp", thumb: "images/performances/thewizardoftheemeraldcity/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/thewizardoftheemeraldcity/gallery/05.webp", thumb: "images/performances/thewizardoftheemeraldcity/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/thewizardoftheemeraldcity/gallery/06.webp", thumb: "images/performances/thewizardoftheemeraldcity/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/thewizardoftheemeraldcity/gallery/07.webp", thumb: "images/performances/thewizardoftheemeraldcity/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/thewizardoftheemeraldcity/gallery/08.webp", thumb: "images/performances/thewizardoftheemeraldcity/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/thewizardoftheemeraldcity/gallery/09.webp", thumb: "images/performances/thewizardoftheemeraldcity/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/thewizardoftheemeraldcity/gallery/10.webp", thumb: "images/performances/thewizardoftheemeraldcity/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/thewizardoftheemeraldcity/gallery/11.webp", thumb: "images/performances/thewizardoftheemeraldcity/gallery/11-sm.webp", kind: 'photo' },
    ]
  },
  timurandhisteam: {
    poster: "images/performances/timurandhisteam/poster.webp",
    photos: [
      { full: "images/performances/timurandhisteam/gallery/01.webp", thumb: "images/performances/timurandhisteam/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/timurandhisteam/gallery/02.webp", thumb: "images/performances/timurandhisteam/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/timurandhisteam/gallery/03.webp", thumb: "images/performances/timurandhisteam/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/timurandhisteam/gallery/04.webp", thumb: "images/performances/timurandhisteam/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/timurandhisteam/gallery/05.webp", thumb: "images/performances/timurandhisteam/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/timurandhisteam/gallery/06.webp", thumb: "images/performances/timurandhisteam/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/timurandhisteam/gallery/07.webp", thumb: "images/performances/timurandhisteam/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/timurandhisteam/gallery/08.webp", thumb: "images/performances/timurandhisteam/gallery/08-sm.webp", kind: 'photo' },
      { full: "images/performances/timurandhisteam/gallery/09.webp", thumb: "images/performances/timurandhisteam/gallery/09-sm.webp", kind: 'photo' },
      { full: "images/performances/timurandhisteam/gallery/10.webp", thumb: "images/performances/timurandhisteam/gallery/10-sm.webp", kind: 'photo' },
      { full: "images/performances/timurandhisteam/gallery/11.webp", thumb: "images/performances/timurandhisteam/gallery/11-sm.webp", kind: 'photo' },
      { full: "images/performances/timurandhisteam/gallery/12.webp", thumb: "images/performances/timurandhisteam/gallery/12-sm.webp", kind: 'photo' },
      { full: "images/performances/timurandhisteam/gallery/13.webp", thumb: "images/performances/timurandhisteam/gallery/13-sm.webp", kind: 'photo' },
      { full: "images/performances/timurandhisteam/gallery/14.webp", thumb: "images/performances/timurandhisteam/gallery/14-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/timurandhisteam/gallery/15.webp", thumb: "images/performances/timurandhisteam/gallery/15-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/timurandhisteam/gallery/16.webp", thumb: "images/performances/timurandhisteam/gallery/16-sm.webp", kind: 'makET', caption: "Макет декораций" },
      { full: "images/performances/timurandhisteam/gallery/17.webp", thumb: "images/performances/timurandhisteam/gallery/17-sm.webp", kind: 'makET', caption: "Макет декораций" },
    ]
  },
  warsawmelody: {
    poster: "images/performances/warsawmelody/poster.webp",
    photos: [
      { full: "images/performances/warsawmelody/gallery/01.webp", thumb: "images/performances/warsawmelody/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/warsawmelody/gallery/02.webp", thumb: "images/performances/warsawmelody/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/warsawmelody/gallery/03.webp", thumb: "images/performances/warsawmelody/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/warsawmelody/gallery/04.webp", thumb: "images/performances/warsawmelody/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/warsawmelody/gallery/05.webp", thumb: "images/performances/warsawmelody/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/warsawmelody/gallery/06.webp", thumb: "images/performances/warsawmelody/gallery/06-sm.webp", kind: 'photo' },
      { full: "images/performances/warsawmelody/gallery/07.webp", thumb: "images/performances/warsawmelody/gallery/07-sm.webp", kind: 'photo' },
      { full: "images/performances/warsawmelody/gallery/08.webp", thumb: "images/performances/warsawmelody/gallery/08-sm.webp", kind: 'photo' },
    ]
  },
  zoikasappartament: {
    poster: "images/performances/zoikasappartament/poster.webp",
    photos: [
      { full: "images/performances/zoikasappartament/gallery/01.webp", thumb: "images/performances/zoikasappartament/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/zoikasappartament/gallery/02.webp", thumb: "images/performances/zoikasappartament/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/zoikasappartament/gallery/03.webp", thumb: "images/performances/zoikasappartament/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/zoikasappartament/gallery/04.webp", thumb: "images/performances/zoikasappartament/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/zoikasappartament/gallery/05.webp", thumb: "images/performances/zoikasappartament/gallery/05-sm.webp", kind: 'photo' },
      { full: "images/performances/zoikasappartament/gallery/06.webp", thumb: "images/performances/zoikasappartament/gallery/06-sm.webp", kind: 'photo' },
    ]
  },
};
