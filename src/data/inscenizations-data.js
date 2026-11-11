/**
 * inscenizations-data.js — список инсценировок.
 * Источник: старый сайт pavelpronin.me (навигация, перенесено 01.09.2026),
 * тексты — из файлов режиссёра в inscenizations-src/<slug>.docx.
 *
 * Поля:
 *   slug   — адрес страницы: /inscenizations/<slug>/ (текст — src/data/inscenizations/<slug>.txt)
 *   title  — название
 *   author — автор первоисточника
 *
 * Тексты лежат отдельно в src/data/inscenizations/<slug>.txt (формат:
 * абзацы через пустую строку, строка сцены начинается с «# »). Пересобрать
 * их из файлов Word: node scripts/import-inscenization.mjs.
 */
export const inscenizations = [
  { slug: 'chroniclesofnarnia', title: '«Хроники Нарнии. Племянник чародея»', author: 'по К.С. Льюису' },
  { slug: 'intheceilingthestarsareshining', title: '«Звёзды светят на потолке»', author: 'по Ю. Тидль' },
  { slug: 'cynics', title: '«Циники»', author: 'по А. Мариенгофу' },
  { slug: 'timurandhisteam', title: '«Тимур и его команда»', author: 'по А.П. Гайдару' },
  { slug: 'thegoldenkey', title: '«Золотой ключик»', author: 'по А.Н. Толстому' },
  { slug: 'nutcracker', title: '«Щелкунчик»', author: 'по Э.Т.А. Гофману' },
  { slug: 'thethreefatmen', title: '«Три Толстяка»', author: 'по Ю.К. Олеше' },
  { slug: 'teenager', title: '«Подросток»', author: 'по Ф.М. Достоевскому' },
  { slug: 'butterball', title: '«Пышка»', author: 'по Ги де Мопассану' },
  { slug: 'captainsdaughter', title: '«Капитанская дочка»', author: 'по А.С. Пушкину' },
  { slug: 'boywithasword', title: '«Мальчик со шпагой»', author: 'по В.П. Крапивину' },
  { slug: 'magicnut', title: '«Волшебный орех. История Щелкунчика»', author: 'по Э.Т.А. Гофману' },
  { slug: 'dedmoroz', title: '«Дед Мороз»', author: 'по мотивам русских сказок' },
  { slug: 'starfall', title: '«Звездопад»', author: 'по В.П. Астафьеву' },
  { slug: 'starboy', title: '«Звёздный мальчик»', author: 'по О. Уайльду' },
  { slug: 'kalleblomkvist', title: '«Калле Блюмквист — сыщик!»', author: 'по А. Линдгрен' }
];