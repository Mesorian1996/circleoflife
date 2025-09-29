// ESM-Imports direkt vom CDN (funktioniert ohne Bundler)
import 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/esm/index.js';
import { Collapse, Dropdown } from 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.esm.min.js';

// Init, sobald DOM bereit ist
const ready = (fn) => (document.readyState !== 'loading') ? fn() : document.addEventListener('DOMContentLoaded', fn);

ready(() => {
  // Navbar-Collapse (mobile)
  document.querySelectorAll('.collapse').forEach(el => {
    // toggle:false = kein auto-open on load
    new Collapse(el, { toggle: false });
  });

  // Dropdowns (Desktop & Mobile)
  document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(el => {
    new Dropdown(el, { autoClose: 'outside' });
  });
});
