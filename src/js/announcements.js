/**
 * announcements.js — блок «Новости» на главной (лента «Ближайшее»).
 * Если массив анонсов пуст — блок скрывается (display: none).
 */
(function () {
  const section = document.querySelector('[data-announcements]');
  if (!section) return;

  const grid = section.querySelector('[data-announcements-grid]');
  if (!grid) return;

  // ЗАГЛУШКА: реальные анонсы появятся после согласования с заказчиком.
  // Чтобы скрыть блок полностью — сделайте массив пустым: []
  const DATA = {
    ru: [
      {
        title: 'Премьера «Принцессы Турандот»',
        date: 'Ноябрь 2026',
        place: 'Элиста'
      },
      {
        title: 'Семинар по Диалогам Платона',
        date: 'Октябрь 2026',
        place: 'Москва'
      }
    ],
    en: [
      {
        title: '«The Turandot» premiere',
        date: 'November 2026',
        place: 'Elista'
      },
      {
        title: 'Seminar on Plato’s Dialogues',
        date: 'October 2026',
        place: 'Moscow'
      }
    ]
  };

  const announcements = grid.getAttribute('data-lang') === 'en' ? DATA.en : DATA.ru;

  if (!announcements.length) {
    section.classList.add('is-hidden');
    return;
  }

  const cards = announcements
    .map(function (a) {
      return (
        '<article class="event-card animate-on-scroll">' +
        '<div class="event-card__date">' + a.date + '</div>' +
        '<h3 class="event-card__title">' + a.title + '</h3>' +
        '<div class="event-card__place">' + a.place + '</div>' +
        '</article>'
      );
    })
    .join('');

  grid.innerHTML = cards;

  // Анимации для только что отрендеренных карточек.
  if (window.initScrollAnimations) {
    window.initScrollAnimations(grid);
  }
})();
