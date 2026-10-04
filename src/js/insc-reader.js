/**
 * insc-reader.js — поведение страницы чтения инсценировки.
 * На странице есть оглавление по сценам, сцены в <details> и кнопка
 * «Развернуть всё». Скрипт только дополняет то, что и так работает
 * без JS: <details> раскрываются сами по клику на заголовок.
 */
(function () {
  const root = document.querySelector('[data-inc-reader]');
  if (!root) return;

  const scenes = Array.prototype.slice.call(root.querySelectorAll('.insc-scene'));
  const toggle = root.querySelector('[data-inc-toggle]');
  const links = Array.prototype.slice.call(root.querySelectorAll('[data-inc-scene]'));

  function anyClosed() {
    return scenes.some(function (s) {
      return !s.open;
    });
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      // Есть свёрнутые сцены — раскрываем все, иначе сворачиваем все.
      const open = anyClosed();
      scenes.forEach(function (s) {
        s.open = open;
      });
      toggle.textContent = open ? 'Свернуть всё' : 'Развернуть всё';
    });
    toggle.textContent = anyClosed() ? 'Развернуть всё' : 'Свернуть всё';
  }

  // Клик по оглавлению: раскрыть сцену, если свёрнута, и подождать
  // отрисовки — иначе браузер прокрутит к свёрнутому блоку.
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      const target = document.getElementById(link.getAttribute('data-inc-scene'));
      if (!target) return;
      target.open = true;
      if (toggle) toggle.textContent = anyClosed() ? 'Развернуть всё' : 'Свернуть всё';
    });
  });

  // Подсветка активной сцены в оглавлении: активна та, чей заголовок
  // последним прошёл линию чтения (верх окна + запас под шапку).
  if (links.length && scenes.length) {
    const line = 120;
    let queued = false;

    function updateActive() {
      queued = false;
      let active = scenes[0];
      scenes.forEach(function (s) {
        if (s.getBoundingClientRect().top <= line) active = s;
      });
      links.forEach(function (l) {
        l.classList.toggle('is-active', l.getAttribute('data-inc-scene') === active.id);
      });
    }

    window.addEventListener(
      'scroll',
      function () {
        if (queued) return;
        queued = true;
        window.requestAnimationFrame(updateActive);
      },
      { passive: true }
    );
    window.addEventListener('resize', updateActive);
    updateActive();
  }
})();