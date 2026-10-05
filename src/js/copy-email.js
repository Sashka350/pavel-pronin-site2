/**
 * copy-email.js — карточка почты в блоке контактов.
 *
 * Разметка:
 *   <button class="contact-card contact-card--copy"
 *           data-copy-email="почта"
 *           data-copy-done="Скопировано"
 *           data-copy-fail="Не получилось скопировать">
 *     <div class="contact-card__label" data-copy-label>Нажмите, чтобы скопировать</div>
 *     <div class="contact-card__value">почта</div>
 *   </button>
 *
 * По клику адрес кладётся в буфер обмена, подпись карточки на пару секунд
 * меняется на результат. Переход по адресу не происходит — почта остаётся
 * текстом, и её видно на странице.
 */
(function () {
  const RESET_MS = 2500;
  const buttons = Array.from(document.querySelectorAll('[data-copy-email]'));
  if (!buttons.length) return;

  /** Копирование для незащищённого контекста и старых браузеров. */
  function fallbackCopy(text) {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-1000px';
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  }

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () {
          return true;
        },
        function () {
          return fallbackCopy(text);
        }
      );
    }
    return Promise.resolve(fallbackCopy(text));
  }

  function flash(button, text) {
    const label = button.querySelector('[data-copy-label]');
    if (!label) return;
    if (label.dataset.copyIdle === undefined) label.dataset.copyIdle = label.textContent;
    label.textContent = text;
    button.classList.add('is-copied');
    clearTimeout(button.copyTimer);
    button.copyTimer = setTimeout(function () {
      label.textContent = label.dataset.copyIdle;
      button.classList.remove('is-copied');
    }, RESET_MS);
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const email = button.getAttribute('data-copy-email');
      if (!email) return;
      copy(email).then(function (ok) {
        flash(button, button.getAttribute(ok ? 'data-copy-done' : 'data-copy-fail') || email);
      });
    });
  });
})();