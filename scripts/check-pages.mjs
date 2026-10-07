/**
 * check-pages.mjs — постоянная проверка собранного сайта (шаг 11 ТЗ).
 *
 * Запуск (из корня проекта):
 *   npm install --no-save puppeteer-core
 *   npm run build
 *   node scripts/check-pages.mjs
 *
 * Что делает:
 *   1. поднимает сервер над `dist` под базовым префиксом из `vite.config.js`
 *      (`vite preview` не работает, `file://` блокирует ES-модули — камни 5);
 *   2. обходит все страницы сборки и на каждой ширине меряет горизонтальное
 *      переполнение, высоту шапки, размер бургера и плитки галереи;
 *   3. собирает `href`, которые строит JS, и проверяет их HTTP-запросом —
 *      обход HTML такие ссылки не видит (камень 22);
 *   4. ищет кириллицу в текстовых узлах EN-страниц, в том числе отрисованных JS;
 *   5. собирает `title` / `description` / `canonical` / OG и ищет дубли между
 *      страницами — страницы с одинаковыми мета конкурируют друг с другом;
 *   6. меряет скорость: навигационные тайминги, вес и число запросов и
 *      отдельно — грузятся ли полные размеры фотографий без клика в лайтбокс.
 *
 * Ключи командной строки:
 *   --checks=responsive,links,external,cyrillic,seo,speed,images,console  (по умолчанию все)
 *   --widths=320,390,768,1024,1440        (по умолчанию)
 *   --filter=inscenizations                подстрока в пути страницы
 *   --paths=/,/news/                       явный список путей через запятую
 *   --limit=10                             первые N страниц
 *   --browser=chrome|edge|yandex|firefox|auto  (по умолчанию auto: Chrome, иначе Edge)
 *   --live                                 проверять опубликованный сайт (SITE_URL)
 *   --shots                                скриншоты в %TEMP%\opencode\pageshots
 *   --port=4411
 *
 * Переменные окружения: WIDTHS, CHECKS, PAGES, PORT, SITE_URL, BASE_PATH, BROWSER.
 * Код возврата ненулевой, если найдены проблемы.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { join, extname, dirname, sep, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const LIVE_SITE = 'https://sashka350.github.io/pavel-pronin-site2/';

// ─── Ключи командной строки ──────────────────────────────────────────────────
const argv = process.argv.slice(2);
const arg = (name, def) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : argv.includes(`--${name}`) ? '1' : def;
};

const WIDTHS = String(arg('widths', process.env.WIDTHS || '320,390,768,1024,1440'))
  .split(',')
  .map(Number)
  .filter(Boolean);
const CHECKS = String(arg('checks', process.env.CHECKS || 'responsive,links,external,cyrillic,seo,speed,images,console'))
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const FILTER = arg('filter', process.env.PAGES || '');
const PATHS = arg('paths', '');
const LIMIT = Number(arg('limit', '0')) || 0;
const SHOTS = Boolean(arg('shots', null));
const LIVE = Boolean(arg('live', null));
const PORT = Number(arg('port', process.env.PORT || '4411'));
const BROWSER = arg('browser', process.env.BROWSER || 'auto');

const BASE = process.env.BASE_PATH || readBaseFromViteConfig();
// Пути страниц в списке — от корня сборки, без базового префикса.
// В --live адрес сайта уже включает базу (SITE_URL можно задать с ней или без).
const ORIGIN = LIVE
  ? (() => {
      const raw = (process.env.SITE_URL || LIVE_SITE).replace(/\/+$/, '');
      const base = BASE.replace(/\/$/, '');
      return raw.endsWith(base) ? raw : raw + base;
    })()
  : `http://127.0.0.1:${PORT}`;
const PREFIX = LIVE ? ORIGIN : ORIGIN + BASE.replace(/\/$/, '');
const toUrl = (path) => PREFIX + path;
// Домен без базового пути — по нему понимаем, «своя» ссылка или внешняя.
const SITE_ORIGIN = new URL(PREFIX).origin;

const OUT_DIR = join(tmpdir(), 'opencode', 'pageshots');
if (SHOTS) mkdirSync(OUT_DIR, { recursive: true });

// ─── Константы проекта ───────────────────────────────────────────────────────
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4'
};

const BROWSERS = {
  chrome: [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe')
  ],
  edge: [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ],
  yandex: [
    'C:\\Program Files (x86)\\Yandex\\YandexBrowser\\Application\\browser.exe',
    join(process.env.LOCALAPPDATA || '', 'Yandex', 'YandexBrowser', 'Application', 'browser.exe')
  ],
  firefox: [
    'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
    'C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe'
  ]
};

const has = (name) => CHECKS.includes(name);
const kb = (bytes) => (bytes / 1024 < 10 ? (bytes / 1024).toFixed(1) : Math.round(bytes / 1024)) + ' КБ';
// Пути в списке страниц — от корня сборки, без базового префикса.
const isEnPath = (path) => path.startsWith('/en/');

// ─── Пути и список страниц ───────────────────────────────────────────────────
function readBaseFromViteConfig() {
  const file = join(ROOT, 'vite.config.js');
  if (!existsSync(file)) return '/pavel-pronin-site2/';
  const hit = readFileSync(file, 'utf8').match(/BASE_PATH\s*\|\|\s*'([^']+)'/);
  return hit ? hit[1] : '/pavel-pronin-site2/';
}

function listPagesFromDist() {
  const pages = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (name === 'assets' || name === 'images') continue;
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name === 'index.html') {
        const rel = relative(DIST, full).split(sep).join('/').replace(/index\.html$/, '');
        pages.push('/' + rel);
      }
    }
  };
  if (existsSync(DIST)) walk(DIST);
  return pages.sort();
}

async function listPagesFromSitemap() {
  const xml = await (await fetch(ORIGIN + BASE + 'sitemap.xml')).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

function pickPages(all) {
  if (PATHS) return PATHS.split(',').map((p) => p.trim()).filter(Boolean);
  let pages = all;
  if (FILTER) pages = pages.filter((p) => p.includes(FILTER));
  if (LIMIT) pages = pages.slice(0, LIMIT);
  return pages;
}

// ─── Сервер над dist ─────────────────────────────────────────────────────────
function startServer() {
  const server = createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, ORIGIN).pathname);
    } catch {
      pathname = '/';
    }
    if (!pathname.startsWith(BASE)) return send404(req, res);

    let rel = pathname.slice(BASE.length);
    if (rel === '' || rel.endsWith('/')) rel += 'index.html';

    const file = join(DIST, rel.split('/').join(sep));
    if (!file.startsWith(DIST + sep) || !existsSync(file) || !statSync(file).isFile()) return send404(req, res);

    const body = readFileSync(file);
    res.writeHead(200, {
      'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': body.length,
      'Cache-Control': 'no-store'
    });
    res.end(req.method === 'HEAD' ? undefined : body);
  });

  function send404(req, res) {
    const file = join(DIST, '404.html');
    const body = existsSync(file) ? readFileSync(file) : Buffer.from('404');
    res.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': body.length,
      'Cache-Control': 'no-store'
    });
    res.end(req.method === 'HEAD' ? undefined : body);
  }

  return new Promise((resolve) => server.listen(PORT, '127.0.0.1', () => resolve(server)));
}

// ─── Браузер ─────────────────────────────────────────────────────────────────
function findBrowserPath(name) {
  for (const path of BROWSERS[name] || []) if (path && existsSync(path)) return path;
  return null;
}

async function launchBrowser(puppeteer, name) {
  const executablePath = findBrowserPath(name);
  if (!executablePath) throw new Error(name + ' не установлен');
  const opts = { executablePath, headless: true };
  if (name === 'firefox') opts.browser = 'firefox';
  else opts.args = ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'];
  try {
    return await puppeteer.launch(opts);
  } catch (err) {
    throw new Error(name + ' не запустился: ' + err.message);
  }
}

// ─── Сборщики данных со страницы (сериализуются puppeteer-ом и идут в браузер) ─
function collectConsole(page, origin) {
  const errors = [];
  const badResponses = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text().slice(0, 200));
  });
  page.on('pageerror', (err) => errors.push('JS: ' + String(err.message).slice(0, 200)));
  page.on('response', (res) => {
    const url = res.url();
    // favicon.ico браузер запрашивает всегда, а favicon в проекте — data: URI.
    if (url.endsWith('/favicon.ico')) return;
    if (res.status() >= 400 && url.startsWith(ORIGIN)) {
      badResponses.push(res.status() + ' ' + url.replace(ORIGIN, ''));
    }
  });
  return { errors, badResponses };
}

// Логотип с анимацией, текст для скринридеров и закрытое мобильное меню
// вылезают за край окна всегда — на них смотрим только если нужно понять, кто шире.
const WIDE_ALLOW = '.header__logo, .visually-hidden, .mobile-menu, [hidden], [aria-hidden="true"]';

function measureLayout() {
  const doc = document.documentElement;
  const header = document.querySelector('.header__inner');
  const burger = document.querySelector('.burger');
  const gallery = document.querySelector('.gallery');
  const out = {
    overflow: doc.scrollWidth - doc.clientWidth,
    clientWidth: doc.clientWidth,
    headerH: header ? Math.round(header.getBoundingClientRect().height) : null,
    headerOverflow: header ? header.scrollWidth - header.clientWidth : 0,
    burger: null,
    gallery: null,
    wide: []
  };
  if (burger && getComputedStyle(burger).display !== 'none') {
    const r = burger.getBoundingClientRect();
    // Область клика может быть расширена псевдоэлементом (::after с inset),
    // тогда кнопка на экране меньше, а пальцу попадать проще.
    const cs = getComputedStyle(burger, '::after');
    let h = r.height;
    let w = r.width;
    if (cs.content && cs.content !== 'none' && cs.position === 'absolute') {
      if (cs.top !== 'auto') h += Math.abs(parseFloat(cs.top) || 0);
      if (cs.bottom !== 'auto') h += Math.abs(parseFloat(cs.bottom) || 0);
      if (cs.left !== 'auto') w += Math.abs(parseFloat(cs.left) || 0);
      if (cs.right !== 'auto') w += Math.abs(parseFloat(cs.right) || 0);
    }
    out.burger = Math.round(w) + 'x' + Math.round(h);
  }
  if (gallery) {
    const tiles = [...gallery.querySelectorAll('.gallery__item')];
    const widths = tiles.map((t) => Math.round(t.getBoundingClientRect().width));
    out.gallery = {
      count: tiles.length,
      cols: new Set(tiles.map((t) => Math.round(t.getBoundingClientRect().left))).size,
      min: widths.length ? Math.min.apply(null, widths) : 0
    };
  }
  if (out.overflow > 0) {
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      if (r.right <= out.clientWidth + 1) continue;
      if (el.matches(WIDE_ALLOW) || el.closest(WIDE_ALLOW)) continue;
      const cls = typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).join('.') : '';
      out.wide.push(el.tagName.toLowerCase() + cls + ' → ' + Math.round(r.right) + 'px');
      if (out.wide.length >= 6) break;
    }
  }
  return out;
}

function measureSpeed() {
  const nav = performance.getEntriesByType('navigation')[0] || {};
  const paints = {};
  for (const p of performance.getEntriesByType('paint')) paints[p.name] = Math.round(p.startTime);
  const res = performance.getEntriesByType('resource');
  let bytes = nav.transferSize || 0;
  const byType = {};
  for (const r of res) {
    bytes += r.transferSize || 0;
    byType[r.initiatorType || 'other'] = (byType[r.initiatorType || 'other'] || 0) + 1;
  }
  const heavy = res
    .map((r) => ({ n: r.name.split('/').slice(-1)[0], b: r.transferSize || 0 }))
    .sort((a, b) => b.b - a.b)
    .slice(0, 4);
  const fullGallery = res
    .map((r) => r.name)
    .filter((n) => /\/gallery\/\d+\.webp$/.test(n) && !/-sm\.webp$/.test(n));
  return {
    ttfb: nav.responseStart ? Math.round(nav.responseStart) : null,
    dcl: nav.domContentLoadedEventEnd ? Math.round(nav.domContentLoadedEventEnd) : null,
    load: nav.loadEventEnd ? Math.round(nav.loadEventEnd) : null,
    fcp: paints['first-contentful-paint'] || null,
    bytes,
    requests: res.length + 1,
    byType,
    heavy,
    fullGallery
  };
}

function collectDom() {
  const meta = (sel) => {
    const el = document.querySelector(sel);
    return el ? el.getAttribute('content') || '' : '';
  };
  const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
    try {
      const j = JSON.parse(s.textContent);
      return (Array.isArray(j) ? j : [j]).map((x) => x && x['@type']).join('+');
    } catch (e) {
      return 'СБОЙ JSON';
    }
  });
  const canonical = document.querySelector('link[rel="canonical"]');
  const imgs = [...document.images];
  return {
    hrefs: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
    seo: {
      title: document.title,
      description: meta('meta[name="description"]'),
      canonical: canonical ? canonical.href : '',
      ogUrl: meta('meta[property="og:url"]'),
      ogTitle: meta('meta[property="og:title"]'),
      ogDescription: meta('meta[property="og:description"]'),
      ogImage: meta('meta[property="og:image"]'),
      ogType: meta('meta[property="og:type"]'),
      lang: document.documentElement.lang,
      h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim()),
      jsonld
    },
    images: {
      total: imgs.length,
      broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src).slice(0, 5),
      // alt="" — это норма для декоративных картинок; нет самого атрибута — плохо.
      noAlt: imgs.filter((i) => !i.hasAttribute('alt')).map((i) => (i.currentSrc || i.src).split('/').slice(-1)[0]).slice(0, 5)
    }
  };
}

function collectCyrillic() {
  const found = [];
  const seen = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const text = (walker.currentNode.nodeValue || '').replace(/\s+/g, ' ').trim();
    if (!/[\u0400-\u04FF]/.test(text)) continue;
    const sample = text.slice(0, 70);
    if (seen.has(sample)) continue;
    seen.add(sample);
    found.push(sample);
    if (found.length >= 8) break;
  }
  return found;
}

async function scrollThrough() {
  document.documentElement.style.scrollBehavior = 'auto';
  const step = Math.round(window.innerHeight * 0.8);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
  document.querySelectorAll('.animate-on-scroll').forEach((el) => el.classList.add('animated'));
  await new Promise((r) => setTimeout(r, 400));
  return true;
}

// ─── Проверки ────────────────────────────────────────────────────────────────
const problems = [];
const report = (check, where, text) => {
  problems.push({ check, where, text });
  console.log('  ✗ [' + check + '] ' + where + ' — ' + text);
};

function checkSeoPage(path, seo, seen) {
  const need = (key, value) => {
    if (!value) report('seo', path, 'нет ' + key);
  };
  need('title', seo.title);
  need('description', seo.description);
  need('canonical', seo.canonical);
  need('og:title', seo.ogTitle);
  need('og:description', seo.ogDescription);
  need('og:url', seo.ogUrl);
  if (!seo.ogImage) report('seo', path, 'нет og:image');
  if (!seo.canonical) return;

  // canonical должен совпадать с адресом страницы: сравниваем пути, а не строки.
  let canonPath = '';
  try {
    canonPath = new URL(seo.canonical).pathname.replace(/\/$/, '');
  } catch {
    canonPath = seo.canonical;
  }
  const pathNoSlash = (BASE + path.slice(1)).replace(/\/$/, '');
  if (canonPath !== pathNoSlash) {
    report('seo', path, 'canonical указывает на другую страницу: ' + seo.canonical);
  }
  if (seo.description.length > 200) report('seo', path, 'description длинный, ' + seo.description.length + ' знаков');
  if (seo.title.length > 80) report('seo', path, 'title длинный, ' + seo.title.length + ' знаков');
  if (seo.h1.length === 0) report('seo', path, 'нет h1');
  if (seo.h1.length > 1) report('seo', path, 'h1 несколько: ' + seo.h1.length);
  if (seo.jsonld.some((t) => t === 'СБОЙ JSON')) report('seo', path, 'JSON-LD не разбирается');
  if (isEnPath(path) && seo.lang !== 'en') report('seo', path, 'html lang=' + seo.lang + ', ожидался en');

  const tKey = seo.title.trim().toLowerCase();
  if (tKey) {
    if (seen.title.has(tKey)) report('seo', path, 'title дублируется с ' + seen.title.get(tKey));
    else seen.title.set(tKey, path);
  }
  const dKey = seo.description.trim().toLowerCase();
  if (dKey) {
    if (seen.desc.has(dKey)) report('seo', path, 'description дублируется с ' + seen.desc.get(dKey));
    else seen.desc.set(dKey, path);
  }
}

// Внешние ссылки (пресса, видео, соцсети) проверяем в конце одним проходом:
// часть из них закрыта от ботов или недоступна из этой среды — это не битая
// ссылка на сайте, но знать о таком нужно.
async function checkExternal(urls) {
  const agent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
  let ok = 0;
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        redirect: 'follow',
        headers: { 'user-agent': agent, accept: 'text/html,*/*' },
        signal: AbortSignal.timeout(15000)
      });
      if (res.status === 200) {
        ok++;
        continue;
      }
      report('external', url, 'HTTP ' + res.status);
    } catch (err) {
      report('external', url, 'не проверена: ' + (err.cause?.code || err.name));
    }
  }
  console.log('Внешних ссылок проверено: ' + urls.size + ', ответили 200: ' + ok);
}

async function checkLink(url) {
  try {
    const res = await fetch(url, { redirect: 'follow' });
    return res.status;
  } catch (err) {
    return 'ошибка ' + (err.cause?.code || err.message);
  }
}

// sitemap.xml и robots.txt проверяем один раз, а не на каждой странице.
async function checkSitemapAndRobots(allPages) {
  const norm = (pathname) => {
    const p = pathname.replace(BASE, '/').replace(/\/$/, '');
    return p === '' ? '/' : p;
  };

  let locs = [];
  try {
    const res = await fetch(PREFIX + '/sitemap.xml');
    if (res.status !== 200) {
      report('seo', '/sitemap.xml', 'отдаёт ' + res.status);
      return;
    }
    locs = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => norm(new URL(m[1]).pathname));
  } catch (err) {
    report('seo', '/sitemap.xml', 'не читается: ' + err.message);
    return;
  }

  const seen = new Set();
  for (const loc of locs) {
    if (seen.has(loc)) report('seo', '/sitemap.xml', 'адрес повторяется дважды: ' + loc);
    seen.add(loc);
  }
  for (const page of allPages) {
    if (!seen.has(norm(page))) report('seo', page, 'страницы нет в sitemap.xml');
  }
  for (const loc of seen) {
    if (loc !== '/' && !allPages.some((page) => norm(page) === loc)) {
      report('seo', '/sitemap.xml', 'в sitemap есть адрес без страницы: ' + loc);
    }
  }
  console.log('sitemap.xml: адресов ' + locs.length + ', страниц в сборке ' + allPages.length);

  try {
    const robots = await fetch(PREFIX + '/robots.txt');
    if (robots.status !== 200) {
      report('seo', '/robots.txt', 'отдаёт ' + robots.status);
      return;
    }
    const text = await robots.text();
    if (!/sitemap:\s*\S+/i.test(text)) report('seo', '/robots.txt', 'нет строки Sitemap:');
  } catch (err) {
    report('seo', '/robots.txt', 'не читается: ' + err.message);
  }
}

// ─── Основной проход ─────────────────────────────────────────────────────────
async function main() {
  if (!LIVE && !existsSync(DIST)) {
    console.error('Нет папки dist. Сначала npm run build.');
    process.exit(1);
  }

  const allPages = existsSync(DIST) ? listPagesFromDist() : await listPagesFromSitemap();
  const pages = pickPages(allPages);

  console.log('Проверяю ' + pages.length + ' страниц из ' + allPages.length + (FILTER ? ' (фильтр: ' + FILTER + ')' : ''));
  console.log('Источник: ' + PREFIX + '/ ' + (LIVE ? '(живой сайт)' : '(локальная сборка)'));
  console.log('Проверки: ' + CHECKS.join(', '));
  console.log('Ширины: ' + WIDTHS.join(', ') + '\n');

  const server = LIVE ? null : await startServer();
  const puppeteer = (await import('puppeteer-core')).default;
  const browserName = BROWSER === 'auto' ? (findBrowserPath('chrome') ? 'chrome' : 'edge') : BROWSER;
  const browser = await launchBrowser(puppeteer, browserName);
  console.log('Браузер: ' + browserName + '\n');

  const seen = { title: new Map(), desc: new Map() };
  const linkCache = new Map();
  const externalUrls = new Set();
  const speedRows = [];
  const t0 = Date.now();

  for (let i = 0; i < pages.length; i++) {
    const path = pages[i];
    const url = toUrl(path);
    console.log('[' + (i + 1) + '/' + pages.length + '] ' + path);

    const page = await browser.newPage();
    await page.setViewport({ width: WIDTHS[0], height: 900, deviceScaleFactor: 1 });
    const log = collectConsole(page, SITE_ORIGIN);

    try {
      await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
    } catch (err) {
      report('console', path, 'страница не открылась: ' + err.message);
      await page.close();
      continue;
    }

    if (has('speed')) {
      const s = await page.evaluate(measureSpeed);
      speedRows.push({ path, bytes: s.bytes, requests: s.requests, fcp: s.fcp, load: s.load, heavy: s.heavy });
      if (s.fullGallery.length) {
        report('speed', path, 'полные фото грузятся без клика: ' + s.fullGallery.length +
          ' шт., напр. ' + s.fullGallery[0].split('/').slice(-1)[0]);
      }
      console.log('     вес ' + kb(s.bytes) + ', запросов ' + s.requests + ', FCP ' + (s.fcp || '—') +
        ' мс, load ' + (s.load || '—') + ' мс' + (LIVE ? '' : ' (локально: вес честный, время нет)'));
    }

    const dom = await page.evaluate(collectDom);

    if (has('console')) {
      for (const e of log.errors) report('console', path, e);
      for (const b of log.badResponses) report('console', path, 'HTTP ' + b);
    }
    if (has('images')) {
      if (dom.images.broken.length) report('images', path, 'битые картинки: ' + dom.images.broken.join(', '));
      if (dom.images.noAlt.length) report('images', path, 'картинки без alt: ' + dom.images.noAlt.join(', '));
    }
    if (has('cyrillic') && isEnPath(path)) {
      const hits = await page.evaluate(collectCyrillic);
      if (hits.length) report('cyrillic', path, 'русский текст: ' + hits.map((h) => '«' + h + '»').join(' '));
    }
    if (has('seo')) checkSeoPage(path, dom.seo, seen);

    if (has('links')) {
      const absolute = dom.hrefs
        .filter((h) => h && !/^(#|tel:|mailto:|javascript:|data:)/.test(h))
        .map((h) => {
          try {
            return new URL(h.split('#')[0], url);
          } catch {
            return null;
          }
        })
        .filter(Boolean);
      const internal = [...new Set(absolute.filter((u) => u.origin === SITE_ORIGIN).map((u) => u.href))];
      if (has('external')) {
        for (const u of absolute) {
          if (u.origin !== SITE_ORIGIN) externalUrls.add(u.href);
        }
      }
      const bad = [];
      for (const href of internal) {
        if (!linkCache.has(href)) linkCache.set(href, await checkLink(href));
        const st = linkCache.get(href);
        if (st !== 200) bad.push(href.replace(SITE_ORIGIN, '') + ' → ' + st);
      }
      if (bad.length) report('links', path, 'битых внутренних ссылок: ' + bad.join(', '));
    }

    if (has('responsive')) {
      await page.evaluate(scrollThrough);
      for (const width of WIDTHS) {
        await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
        await new Promise((r) => setTimeout(r, 250));
        const m = await page.evaluate(measureLayout);
        const notes = [];
        if (m.overflow > 0) {
          notes.push('переполнение документа ' + m.overflow + 'px' + (m.wide.length ? ' [' + m.wide.join(', ') + ']' : ''));
        }
        if (m.headerOverflow > 0) notes.push('переполнение шапки ' + m.headerOverflow + 'px');
        if (m.headerH !== null && (m.headerH < 60 || m.headerH > 70)) notes.push('высота шапки ' + m.headerH + 'px');
        if (m.burger && Number(m.burger.split('x')[1]) < 44) notes.push('бургер ' + m.burger + ' — ниже 44px');
        if (m.gallery && m.gallery.min > 0 && m.gallery.min < 120) notes.push('плитка галереи ' + m.gallery.min + 'px — уже 120px');
        if (notes.length) report('responsive', path + ' @' + width, notes.join('; '));
      }
      if (SHOTS) {
        const safe = path.replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '') || 'root';
        await page.setViewport({ width: WIDTHS[WIDTHS.length - 1], height: 900, deviceScaleFactor: 1 });
        await new Promise((r) => setTimeout(r, 300));
        await page.screenshot({ path: join(OUT_DIR, safe + '.png'), fullPage: true });
      }
    }

    await page.close();
  }

  // Пока сервер поднят — проверяем sitemap.xml и robots.txt.
  if (has('seo') && !PATHS && !FILTER) await checkSitemapAndRobots(allPages);
  if (has('external') && externalUrls.size) await checkExternal(externalUrls);

  await browser.close();
  if (server) server.close();

  // ─── Итог ──────────────────────────────────────────────────────────────────
  console.log('\n─── Итог (' + Math.round((Date.now() - t0) / 1000) + ' с, ' + pages.length + ' страниц) ───');
  if (has('speed')) printSpeed(speedRows, LIVE);
  if (has('links')) console.log('Уникальных внутренних адресов проверено: ' + linkCache.size);

  if (!problems.length) {
    console.log('\nПроблем не найдено.');
    return;
  }
  const byCheck = {};
  for (const p of problems) (byCheck[p.check] = byCheck[p.check] || []).push(p);
  console.log('\nПроблем: ' + problems.length);
  for (const check of Object.keys(byCheck)) {
    console.log('\n[' + check + '] — ' + byCheck[check].length);
    for (const p of byCheck[check]) console.log('  ' + p.where + ' — ' + p.text);
  }
  process.exitCode = 1;
}

function printSpeed(rows, live) {
  console.log('\nСамые тяжёлые страницы по суммарному весу:');
  for (const r of rows.slice().sort((a, b) => b.bytes - a.bytes).slice(0, 8)) {
    console.log('  ' + kb(r.bytes).padStart(9) + '  запросов ' + String(r.requests).padStart(3) +
      '  FCP ' + String(r.fcp || '—').padStart(5) + ' мс  ' + r.path);
    if (r.heavy.length) console.log('             топ: ' + r.heavy.map((h) => h.n + ' ' + kb(h.b)).join(', '));
  }
  if (!live) console.log('\nВремя на локальном сервере не показательно — задержки сети нет. Для времени: --live.');
}

main();
