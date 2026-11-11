// Разовая загрузка публичной папки Яндекс.Диска (рекурсивно, файл за файлом).
// Запуск: node scripts/download-yadisk.mjs <public_url> <dest_dir>
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const [publicUrl, destDir] = process.argv.slice(2);
if (!publicUrl || !destDir) {
  console.error('Usage: node scripts/download-yadisk.mjs <public_url> <dest_dir>');
  process.exit(1);
}

const API = 'https://cloud-api.yandex.net/v1/disk/public/resources';
const failed = [];

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function list(dirPath) {
  const url = `${API}?public_key=${encodeURIComponent(publicUrl)}&path=${encodeURIComponent(dirPath)}&limit=1000`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`list ${dirPath}: HTTP ${res.status}`);
  return res.json();
}

async function collect(dirPath, out) {
  const data = await list(dirPath);
  for (const item of data._embedded?.items ?? []) {
    if (item.type === 'dir') await collect(item.path, out);
    else out.push(item);
  }
  return out;
}

async function downloadUrl(filePath) {
  const url = `https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=${encodeURIComponent(publicUrl)}&path=${encodeURIComponent(filePath)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download-url ${filePath}: HTTP ${res.status}`);
  const { href } = await res.json();
  return href;
}

// Windows не допускает в именах \ / : * ? " < > | — заменяем на _
function sanitize(rel) {
  return rel
    .split('/')
    .map((seg) => seg.replace(/[\\/:*?"<>|]/g, '_'))
    .join('/');
}

async function downloadFile(file) {
  const rel = sanitize(file.path.replace(/^\//, ''));
  const dest = path.join(destDir, rel);
  await mkdir(path.dirname(dest), { recursive: true });
  if (await exists(dest)) {
    console.log(`SKIP ${rel} (уже скачан)`);
    return;
  }
  try {
    const href = await downloadUrl(file.path);
    const res = await fetch(href);
    if (!res.ok) throw new Error(`fetch: HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    console.log(`OK  ${rel} (${buf.length} bytes)`);
  } catch (err) {
    failed.push(rel);
    console.error(`FAIL ${rel}: ${err.message}`);
  }
}

const files = await collect('/', []);
console.log(`Найдено файлов: ${files.length}`);
let i = 0;
for (const f of files) {
  i++;
  console.log(`[${i}/${files.length}]`);
  await downloadFile(f);
}
console.log(failed.length ? `Ошибок: ${failed.length}\n${failed.join('\n')}` : 'Все файлы загружены.');
process.exit(failed.length ? 1 : 0);
