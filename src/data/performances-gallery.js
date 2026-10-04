/**
 * performances-gallery.js — фотографии спектаклей.
 * Собрано из `Материалы для сайта.zip` 05.10.2026 скриптом
 * `scripts/import-photos.py`. Пути относительные, без ведущего слэша и
 * без базового пути: BASE подставляет каталог (import.meta.env.BASE_URL),
 * генератор — withBase().
 *
 * Поля записи спектакля:
 *   poster — афиша (обложка страницы, карточка каталога, og:image);
 *   photos[] — снимки постановки:
 *     full  — до 1600px WebP, для лайтбокса;
 *     thumb — превью 600px WebP, для сетки галереи;
 *     kind  — 'photo' (фото спектакля) | 'makET' (эскиз декораций);
 *     caption — подпись, если есть.
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
      { full: "images/performances/acityinlove/gallery/06.webp", thumb: "images/performances/acityinlove/gallery/06-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/acityinlove/gallery/07.webp", thumb: "images/performances/acityinlove/gallery/07-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/acityinlove/gallery/08.webp", thumb: "images/performances/acityinlove/gallery/08-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/acityinlove/gallery/09.webp", thumb: "images/performances/acityinlove/gallery/09-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/acityinlove/gallery/10.webp", thumb: "images/performances/acityinlove/gallery/10-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
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
      { full: "images/performances/backtomurder/gallery/12.webp", thumb: "images/performances/backtomurder/gallery/12-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/backtomurder/gallery/13.webp", thumb: "images/performances/backtomurder/gallery/13-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/backtomurder/gallery/14.webp", thumb: "images/performances/backtomurder/gallery/14-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/backtomurder/gallery/15.webp", thumb: "images/performances/backtomurder/gallery/15-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/backtomurder/gallery/16.webp", thumb: "images/performances/backtomurder/gallery/16-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
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
      { full: "images/performances/intheceilingthestarsareshining/gallery/13.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/13-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/14.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/14-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/15.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/15-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/16.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/16-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/17.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/17-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/18.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/18-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/19.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/19-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/20.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/20-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/21.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/21-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/intheceilingthestarsareshining/gallery/22.webp", thumb: "images/performances/intheceilingthestarsareshining/gallery/22-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
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
      { full: "images/performances/nutcracker/gallery/10.webp", thumb: "images/performances/nutcracker/gallery/10-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/nutcracker/gallery/11.webp", thumb: "images/performances/nutcracker/gallery/11-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/nutcracker/gallery/12.webp", thumb: "images/performances/nutcracker/gallery/12-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/nutcracker/gallery/13.webp", thumb: "images/performances/nutcracker/gallery/13-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/nutcracker/gallery/14.webp", thumb: "images/performances/nutcracker/gallery/14-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/nutcracker/gallery/15.webp", thumb: "images/performances/nutcracker/gallery/15-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
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
  starboy: {
    poster: null,
    photos: [
      { full: "images/performances/starboy/gallery/01.webp", thumb: "images/performances/starboy/gallery/01-sm.webp", kind: 'photo' },
      { full: "images/performances/starboy/gallery/02.webp", thumb: "images/performances/starboy/gallery/02-sm.webp", kind: 'photo' },
      { full: "images/performances/starboy/gallery/03.webp", thumb: "images/performances/starboy/gallery/03-sm.webp", kind: 'photo' },
      { full: "images/performances/starboy/gallery/04.webp", thumb: "images/performances/starboy/gallery/04-sm.webp", kind: 'photo' },
      { full: "images/performances/starboy/gallery/05.webp", thumb: "images/performances/starboy/gallery/05-sm.webp", kind: 'photo' },
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
      { full: "images/performances/timurandhisteam/gallery/14.webp", thumb: "images/performances/timurandhisteam/gallery/14-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/timurandhisteam/gallery/15.webp", thumb: "images/performances/timurandhisteam/gallery/15-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/timurandhisteam/gallery/16.webp", thumb: "images/performances/timurandhisteam/gallery/16-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
      { full: "images/performances/timurandhisteam/gallery/17.webp", thumb: "images/performances/timurandhisteam/gallery/17-sm.webp", kind: 'makET', caption: "Эскиз декораций" },
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
