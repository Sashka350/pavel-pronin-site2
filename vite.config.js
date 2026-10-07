import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// Основной сайт работает на корне кастомного домена.
// Для адреса GitHub Pages репозитория задайте BASE_PATH=/pavel-pronin-site2/.
const basePath = process.env.BASE_PATH || '/';

export default defineConfig({
  root: '.',
  base: basePath,
  plugins: [
    {
      name: 'strip-project-pages-prefix-for-custom-domain',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          return basePath === '/' ? html.replaceAll('/pavel-pronin-site2/', '/') : html;
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        en: fileURLToPath(new URL('./en/index.html', import.meta.url)),
        enPerformances: fileURLToPath(new URL('./en/performances/index.html', import.meta.url)),
        enPedagogy: fileURLToPath(new URL('./en/pedagogy/index.html', import.meta.url)),
        enInscenizations: fileURLToPath(new URL('./en/inscenizations/index.html', import.meta.url)),
        enNews: fileURLToPath(new URL('./en/news/index.html', import.meta.url)),
        performances: fileURLToPath(new URL('./performances/index.html', import.meta.url)),
        pedagogy: fileURLToPath(new URL('./pedagogy/index.html', import.meta.url)),
        inscenizations: fileURLToPath(new URL('./inscenizations/index.html', import.meta.url)),
        news: fileURLToPath(new URL('./news/index.html', import.meta.url))
      }
    }
  },
  server: {
    port: 5173,
    open: false
  }
});
