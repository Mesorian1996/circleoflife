// ESM-Imports direkt vom CDN (funktioniert ohne Bundler)
(() => {
  const ready = (fn) => (document.readyState !== 'loading')
    ? fn()
    : document.addEventListener('DOMContentLoaded', fn);

  ready(() => {
    const bootstrap = window.bootstrap;
    if (!bootstrap) return;
    const { Collapse, Dropdown } = bootstrap;

    document.querySelectorAll('.collapse').forEach(el => {
      new Collapse(el, { toggle: false });
    });

    document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(el => {
      new Dropdown(el, { autoClose: 'outside' });
    });
  });
})();
