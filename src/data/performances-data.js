/**
 * performances-data.js — реестр спектаклей.
 * Источник: старый сайт и документы режиссёра; новые материалы сверяются
 * с папкой «Материалы для сайта» на Яндекс.Диске.
 *
 * Поля:
 *   slug    — англ. слаг для URL (/performances/<slug>/)
 *   title   — название спектакля
 *   author  — автор / первоисточник
 *   theater — театр
 *   year    — год премьеры
 *   status  — 'live' (идёт в репертуаре) | 'archive' (архив)
 *   ticketUrl — страница театра с информацией о спектакле и билетах, если дана
 *   hideVideos — скрыть видеоссылку по просьбе режиссёра, пока спектакль идёт
 *   image   — обложка (афиша). У 28 спектаклей это локальные файлы из
 *             `public/images/performances/<slug>/poster.webp` (афиши из
 *             актуальной папки «Материалы для сайта» на Яндекс.Диске,
 *             пережаты 11.11.2026). У `starboy` и `retrohbk` пока ссылка со
 *             старого сайта: у Звёздного мальчика афиши нет, у Ретро
 *             (Хабаровск) в папке лежит скриншот из Instagram — ждём файл
 *             от Павла. Путь задаём БЕЗ базы и без ведущего слэша: BASE
 *             подставляет каталог (import.meta.env.BASE_URL), генератор
 *             страниц — withBase().
 *
 * Описания, эпиграфы, составы команды, прессу, видео и фотографии здесь
 * НЕ держат: тексты лежат в performances-archive.js, снимки постановки —
 * в performances-gallery.js (старые галереи собраны из Материалы для сайта.zip),
 * а страницы собирает scripts/generate-performances.mjs.
 *
 * ВАЖНО: документы найдены для 29 спектаклей; тексты внесены по ним. Статус
 * live и ссылки на театр ставятся только по прямым отметкам в документах.
 */

export const performances = [
  {
    slug: 'fivespoonsofelixir',
    title: '«Пять ложек эликсира»',
    author: 'по киносценарию А. и Б. Стругацких',
    theater: 'Московский театр Et Cetera',
    year: 2026,
    status: 'live',
    ticketUrl: 'https://et-cetera.ru/performance/pyat-lozhek-eliksira/',
    hideVideos: true,
    image: 'images/performances/fivespoonsofelixir/poster.webp'
  },
  {
    slug: 'magicnutnutcracker',
    title: '«Волшебный орех. История Щелкунчика»',
    author: 'по Э.Т.А. Гофману',
    theater: 'Чувашский театр юного зрителя им. М. Сеспеля',
    year: 2025,
    status: 'live',
    ticketUrl: 'https://xn--e1aasoib4f.xn--p1ai/repertuar--1/volshebny-orekh-istoriya-shchelkunchika',
    hideVideos: true,
    image: 'images/performances/magicnutnutcracker/poster.webp'
  },
  {
    slug: 'remember',
    title: '«Помни»',
    author: 'спектакль-посвящение',
    theater: 'Краснодарский Молодёжный театр',
    year: 2025,
    status: 'live',
    ticketUrl: 'https://kmto-premiera.ru/molodezhnyy-teatr/afisha/16579/',
    hideVideos: true,
    image: 'images/performances/remember/poster.webp'
  },
  {
    slug: 'sorrowfromthemind',
    title: '«Горе от ума»',
    author: 'А.С. Грибоедов',
    theater: 'Краснодарский Молодёжный театр',
    year: 2024,
    status: 'live',
    ticketUrl: 'https://kmto-premiera.ru/molodezhnyy-teatr/afisha/16023/',
    hideVideos: true,
    image: 'images/performances/sorrowfromthemind/poster.webp'
  },
  {
    slug: 'retrohbk',
    title: '«Ретро»',
    author: 'А. Галин',
    theater: 'Хабаровский театр юного зрителя',
    year: 2024,
    status: 'live',
    ticketUrl: 'https://tuz-xa.ru/repertoire/retro',
    image: 'images/performances/retrohbk/poster.webp'
  },
  {
    slug: 'kalleblomkvist',
    title: '«Калле Блюмквист — суперсыщик!»',
    author: 'П. Пронин по одноимённой повести А. Линдгрен',
    theater: '«Ведогонь-театр» (Зеленоград, Москва)',
    year: 2023,
    status: 'live',
    ticketUrl: 'https://vedogon.ru/kalle#!/tab/645426278-1',
    hideVideos: true,
    image: 'images/performances/kalleblomkvist/poster.webp'
  },
  {
    slug: 'dedmoroz',
    title: '«Дед Мороз»',
    author: 'П. Пронин по мотивам сказки «Морозко»',
    theater: 'Московский областной театр драмы и комедии',
    year: 2023,
    status: 'live',
    ticketUrl: 'https://mosobldrama.ru/ded_moroz',
    hideVideos: true,
    image: 'images/performances/dedmoroz/poster.webp'
  },
  {
    slug: 'starfall',
    title: '«Звездопад»',
    author: 'по одноимённой повести В.П. Астафьева',
    theater: 'Русский драматический театр Башкортостана, г. Уфа',
    year: 2023,
    status: 'archive',
    image: 'images/performances/starfall/poster.webp'
  },
  {
    slug: 'scarletsails',
    title: '«Алые паруса»',
    author: 'П. Морозов по А. Грину',
    theater: 'Ачинский драматический театр',
    year: 2023,
    status: 'live',
    ticketUrl: 'https://www.achdt.ru/?page_id=17861',
    hideVideos: true,
    image: 'images/performances/scarletsails/poster.webp'
  },
  {
    slug: 'princessturandot',
    title: '«Принцесса Турандот»',
    author: 'Карло Гоцци',
    theater: 'Национальный драматический театр им. Б. Басангова',
    year: 2026,
    status: 'live',
    ticketUrl: 'https://quicktickets.ru/elista-teatr-basangova/e94',
    hideVideos: true,
    image: 'images/performances/princessturandot/poster.webp'
  },
  {
    slug: 'babytimetalkshow',
    title: '«Мама, я — блогер!»',
    author: 'эскиз А. Стрижевской',
    theater: 'Проект «Открытая репетиция» Московского театра на Таганке',
    year: 2022,
    status: 'archive',
    image: 'images/performances/babytimetalkshow/poster.webp'
  },
  {
    slug: 'thethreefatmen',
    title: '«Три толстяка»',
    author: 'по одноимённому роману для детей Ю.К. Олеши',
    theater: 'Молодёжный Театр Алтая',
    year: 2022,
    status: 'archive',
    image: 'images/performances/thethreefatmen/poster.webp'
  },
  {
    slug: 'theatrehistory',
    title: '«Театральная история»',
    author: '',
    theater: 'Московский областной театр драмы и комедии',
    year: 2022,
    status: 'archive',
    image: 'images/performances/theatrehistory/poster.webp'
  },
  {
    slug: 'babayagakids',
    title: '«Баба Яга против зла»',
    author: 'Ю. Бочарова',
    theater: 'Московский областной театр драмы и комедии',
    year: 2021,
    status: 'archive',
    image: 'images/performances/babayagakids/poster.webp'
  },
  {
    slug: 'babayagawoment',
    title: '«Женское счастье Бабы Яги»',
    author: 'Ю. Бочарова',
    theater: 'Московский областной театр драмы и комедии',
    year: 2021,
    status: 'archive',
    image: 'images/performances/babayagawoment/poster.webp'
  },
  {
    slug: 'thewizardoftheemeraldcity',
    title: '«Волшебник Изумрудного города»',
    author: 'А. Богачёва по сказочной повести А. Волкова',
    theater: 'Екатеринбургский ТЮЗ',
    year: 2021,
    status: 'archive',
    image: 'images/performances/thewizardoftheemeraldcity/poster.webp'
  },
  {
    slug: 'retro',
    title: '«Ретро»',
    author: 'А. Галин',
    theater: 'Екатеринбургский театр юного зрителя',
    year: 2021,
    status: 'live',
    ticketUrl: 'https://xn--g1av0b.xn--80acgfbsl1azdqr.xn--p1ai/performances/item/188',
    hideVideos: true,
    image: 'images/performances/retro/poster.webp'
  },
  {
    slug: 'thegoldenkey',
    title: '«Золотой ключик»',
    author: 'А. К. Толстой',
    theater: 'Екатеринбургский театр юного зрителя',
    year: 2020,
    status: 'archive',
    image: 'images/performances/thegoldenkey/poster.webp'
  },
  {
    slug: 'warsawmelody',
    title: '«Варшавская мелодия»',
    author: 'Л.Г. Зорин',
    theater: 'Учебный театр ГИТИС',
    year: 2020,
    status: 'archive',
    image: 'images/performances/warsawmelody/poster.webp'
  },
  {
    slug: 'nutcracker',
    title: '«Щелкунчик»',
    author: 'Э.Т.А. Гофман',
    theater: 'Севастопольский академический драматический театр имени А.В. Луначарского',
    year: 2019,
    status: 'archive',
    image: 'images/performances/nutcracker/poster.webp'
  },
  {
    slug: 'timurandhisteam',
    title: '«Тимур и его команда»',
    author: 'А.П. Гайдар',
    theater: 'Екатеринбургский театр юного зрителя',
    year: 2019,
    status: 'archive',
    image: 'images/performances/timurandhisteam/poster.webp'
  },
  {
    slug: 'backtomurder',
    title: '«Назад к убийству»',
    author: 'А. Кристи',
    theater: 'Драматический театр «Колесо» им. н.а. России Г.Б. Дроздова',
    year: 2019,
    status: 'archive',
    image: 'images/performances/backtomurder/poster.webp'
  },
  {
    slug: 'starboy',
    title: '«Звёздный мальчик»',
    author: 'О. Уайлд',
    theater: 'Драматический театр «Колесо» им. н.а. России Г.Б. Дроздова',
    year: 2018,
    status: 'archive',
    image: 'https://images.squarespace-cdn.com/content/v1/60bdb86ed3018332f3c6113e/1623222623835-ZAO4HGQGOB6IUV88SGA9/mal_15_na_9.jpg'
  },
  {
    slug: 'parodist',
    title: '«Пародист»',
    author: 'Е. Водолазкин',
    theater: 'Драматический театр «Колесо» им. н.а. России Г.Б. Дроздова',
    year: 2018,
    status: 'archive',
    image: 'images/performances/parodist/poster.webp'
  },
  {
    slug: 'acityinlove',
    title: 'Мюзикл «Влюблённый город»',
    author: '',
    theater: 'Драматический театр «Колесо» им. н.а. России Г.Б. Дроздова',
    year: 2018,
    status: 'archive',
    image: 'images/performances/acityinlove/poster.webp'
  },
  {
    slug: 'comedyoferrors',
    title: '«Комедия ошибок»',
    author: 'У. Шекспир',
    theater: 'Национальный драматический театр им. Б. Басангова',
    year: 2017,
    status: 'archive',
    image: 'images/performances/comedyoferrors/poster.webp'
  },
  {
    slug: 'zoikasappartament',
    title: '«Зойкина квартира»',
    author: 'М.А. Булгаков',
    theater: 'Национальный академический драматический театр им. Горького',
    year: 2017,
    status: 'archive',
    image: 'images/performances/zoikasappartament/poster.webp'
  },
  {
    slug: 'intheceilingthestarsareshining',
    title: '«Звёзды светят на потолке»',
    author: 'Павел Пронин по одноимённому роману Юханны Тидель',
    theater: 'Краснодарский Молодёжный театр',
    year: 2017,
    status: 'archive',
    image: 'images/performances/intheceilingthestarsareshining/poster.webp'
  },
  {
    slug: 'gagarinway',
    title: '«Проезд Гагарина»',
    author: 'Г. Бёрк',
    theater: 'Русский театр Эстонии',
    year: 2017,
    status: 'archive',
    image: 'images/performances/gagarinway/poster.webp'
  },
  {
    slug: 'boyhood',
    title: '«Отрочество»',
    author: 'Я. Пулинович по Л.Н. Толстому',
    theater: 'Режиссёрский факультет ГИТИС',
    year: 2016,
    status: 'archive',
    image: 'images/performances/boyhood/poster.webp'
  }
];
