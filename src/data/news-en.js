/**
 * news-en.js — English versions of the news data.
 * Mirrors src/data/news-data.js: upcoming by slug, posts by slug.
 * Пустое поле = взять русский оригинал (как в performances-en.js).
 */
export const newsEn = {
  upcoming: {
    'plato-dialogues-seminar': {
      title: 'Seminar on Plato’s Dialogues',
      dateLabel: 'October 2026',
      kind: 'Seminar',
      place: 'Moscow'
    },
    'turandot-premiere': {
      title: 'The Turandot premiere',
      dateLabel: 'November 2026',
      kind: 'Premiere',
      place: 'Elista'
    }
  },
  posts: {}
};