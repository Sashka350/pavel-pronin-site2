/**
 * pedagogy-specs.js — строки «Кем был» / «Чему учил» в карточке педпроекта.
 * Общий код для RU и EN списков, чтобы подписи не разъехались
 * (та же мысль, что в src/js/news-feed.js).
 * Пустое поле = строка не выводится совсем.
 */
export const specLabels = {
  ru: { role: 'Кем был', taught: 'Чему учил' },
  en: { role: 'Role', taught: 'Taught' }
};

function spec(label, value) {
  return (
    '<div class="perf-spec">' +
    '<span class="perf-spec__label">' + label + '</span>' +
    '<span class="perf-spec__value">' + value + '</span>' +
    '</div>'
  );
}

/**
 * Блок «Кем был» / «Чему учил» для карточки проекта.
 * p — проект с уже подставленным переводом (см. pedagogy.js / pedagogy-en.js).
 * Возвращает пустую строку, если обе строки пустые.
 */
export function pedagogySpecs(p, lang) {
  const labels = specLabels[lang === 'en' ? 'en' : 'ru'];
  const rows = [];
  if (p.role) rows.push(spec(labels.role, p.role));
  if (p.taught) rows.push(spec(labels.taught, p.taught));
  return rows.length ? '<div class="perf-card__specs">' + rows.join('') + '</div>' : '';
}