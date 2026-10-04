/**
 * check-responsive.mjs — проверка адаптива на опубликованном сайте.
 *
 * Запуск (из корня проекта):
 *   npm install --no-save puppeteer-core
 *   node scripts/check-responsive.mjs
 *
 * Что делает: открывает сайт в установленном Chrome через puppeteer-core,
 * проходит по списку ширин, снимает скриншоты и печатает метрики шапки,
 * меню и переполнения. Нужен, потому что обычные скриншоты Chrome на Windows
 * врут: headless-окно зажимается до 504px, и картинка выглядит как «уехавший»
 * мобильный экран, хотя вёрстка корректна.
 *
 * Правки вёрстки без такой проверки — вслепую (правило AGENTS.md).
 */
import { mkdirSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const SITE =
  process.env.SITE_URL || 'https://sashka350.github.io/pavel-pronin-site2/';

const WIDTHS = (process.env.WIDTHS || '320,360,390,768,1024,1152,1280,1440,1920')
  .split(',')
  .map(Number);

const CHROME_CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

const OUT_DIR = join(tmpdir(), 'opencode', 'shots');
mkdirSync(OUT_DIR, { recursive: true });

function findChrome() {
  for (const path of CHROME_CANDIDATES) {
    if (existsSync(path)) return path;
  }
  return CHROME_CANDIDATES[0];
}

async function measure(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const header = document.querySelector('.header__inner');
    const nav = document.querySelector('.header__nav');
    const burger = document.querySelector('.burger');
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    };
    return {
      docOverflow: doc.scrollWidth - doc.clientWidth,
      headerOverflow: header ? header.scrollWidth - header.clientWidth : null,
      headerH: header ? Math.round(header.getBoundingClientRect().height) : null,
      navVisible: nav ? getComputedStyle(nav).display !== 'none' : false,
      burgerVisible: burger ? getComputedStyle(burger).display !== 'none' : false,
      buttons: [...document.querySelectorAll('.header__nav .nav-link')].map((a) => {
        const r = rect(a);
        return a.textContent.trim() + ':' + r.w + 'x' + r.h;
      })
    };
  });
}

async function main() {
  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars']
  });

  for (const width of WIDTHS) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 800, deviceScaleFactor: 1 });
    await page.goto(SITE, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    // 12 секунд — чтобы анимация логотипа гарантированно остановилась.
    await new Promise((r) => setTimeout(r, 12000));

    const m = await measure(page);
    await page.screenshot({ path: join(OUT_DIR, `check-${width}.png`) });

    const problems = [];
    if (m.docOverflow > 0) problems.push(`переполнение документа ${m.docOverflow}px`);
    if (m.headerOverflow > 0) problems.push(`переполнение шапки ${m.headerOverflow}px`);
    if (m.headerH !== 64) problems.push(`высота шапки ${m.headerH}px (ожидалось 64)`);
    if (width >= 1024 && m.buttons.length === 0) problems.push('нет пунктов меню');

    console.log(
      `${width}px  ${problems.length ? 'ПРОБЛЕМА: ' + problems.join('; ') : 'ок'}` +
        `  [header ${m.headerH}px, nav=${m.navVisible}, burger=${m.burgerVisible}]` +
        (m.navVisible && m.buttons.length ? '\n         ' + m.buttons.join('  ') : '')
    );

    await page.close();
  }

  // Мобильное меню на самой узкой рабочей ширине.
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 800, deviceScaleFactor: 1 });
  await page.goto(SITE, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.click('.burger');
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: join(OUT_DIR, 'check-menu-390.png') });
  const items = await page.evaluate(() =>
    [...document.querySelectorAll('.mobile-menu .nav-link')].map((a) => {
      const r = a.getBoundingClientRect();
      return a.textContent.trim() + ':' + Math.round(r.width) + 'x' + Math.round(r.height);
    })
  );
  console.log('мобильное меню: ' + items.join('  '));
  const low = items.filter((i) => Number(i.split(':')[1].split('x')[1]) < 44);
  if (low.length) console.log('ПРОБЛЕМА: ниже 44px по высоте: ' + low.join('  '));
  await page.close();

  await browser.close();
  console.log('Скриншоты: ' + OUT_DIR);
}

main();