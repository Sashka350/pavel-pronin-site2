/**
 * theme.js — переключатель тёмной/светлой темы.
 * 1. Проверяем localStorage('theme') — ручной выбор важнее всего.
 * 2. Если его нет — выбираем тему по местному времени: день светлый, ночь тёмная.
 * 3. По клику переключаем data-theme на <html>.
 * 4. Сохраняем выбор в localStorage.
 * 5. Обновляем атрибут color-scheme для нативных контролов.
 *
 * Те же правила продублированы инлайном в <head> каждой страницы —
 * он выставляет тему до первой отрисовки, чтобы не было вспышки.
 * Если меняешь границы часов — правь и здесь, и там.
 */
(function () {
  const STORAGE_KEY = 'theme';
  const LIGHT_FROM = 7;
  const LIGHT_TO = 21;
  const root = document.documentElement;

  function themeByTime() {
    const hour = new Date().getHours();
    return hour >= LIGHT_FROM && hour < LIGHT_TO ? 'light' : 'dark';
  }

  function getInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    return themeByTime();
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
  }

  function setTheme(theme, persist) {
    applyTheme(theme);
    if (persist !== false) {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  }

  const buttons = document.querySelectorAll('[data-theme-toggle]');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const current =
        root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  });

  setTheme(getInitialTheme(), false);
})();
