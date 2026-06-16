/**
 * ==========================================================
 * COOKIE CONSENT — Pro Estate Partners
 * ==========================================================
 * Baner zgody zgodny z RODO i prawem telekomunikacyjnym (ePrivacy):
 *  - cookies niezbędne zawsze aktywne, opcjonalne (analityczne /
 *    marketingowe) domyślnie WYŁĄCZONE,
 *  - "Akceptuj wszystkie" i "Odrzuć opcjonalne" równie łatwo dostępne,
 *  - zgoda zapisywana w localStorage z wersją i datą,
 *  - skrypty śledzące NIE są ładowane przed zgodą.
 *
 * Integracja analityki: sprawdzaj PEPConsent.allowed('analytics')
 * lub nasłuchuj zdarzenia 'pep-consent-change' zanim załadujesz GA/Meta.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'pep_cookie_consent';
  var VERSION = 1; // podbij, gdy zmienią się cele/kategorie — wymusi ponowną zgodę

  var DEFAULT = { necessary: true, analytics: false, marketing: false };

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || data.v !== VERSION) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(state) {
    var data = {
      v: VERSION,
      ts: new Date().toISOString(),
      necessary: true,
      analytics: !!state.analytics,
      marketing: !!state.marketing
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
    window.dispatchEvent(new CustomEvent('pep-consent-change', { detail: data }));
    return data;
  }

  /* ---------- Public API (gate dla przyszłej analityki) ---------- */
  window.PEPConsent = {
    get: function () { return readConsent() || Object.assign({}, DEFAULT); },
    allowed: function (category) {
      var c = readConsent();
      if (category === 'necessary') return true;
      return !!(c && c[category]);
    },
    openSettings: function () { openModal(); },
    reset: function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      location.reload();
    }
  };

  /* ---------- Budowa DOM ---------- */
  var banner, modal, toggles = {};

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }

  function buildBanner() {
    banner = el('div', {
      class: 'cookie-banner',
      id: 'cookieBanner',
      role: 'dialog',
      'aria-label': 'Zgoda na pliki cookies',
      'aria-live': 'polite'
    });
    banner.innerHTML =
      '<div class="cookie-banner__inner">' +
        '<div class="cookie-banner__text">' +
          '<h3>Szanujemy Twoją prywatność</h3>' +
          '<p>Używamy plików cookies niezbędnych do działania strony oraz — za Twoją zgodą — ' +
          'analitycznych i marketingowych. Możesz zaakceptować wszystkie, odrzucić opcjonalne ' +
          'albo wybrać ustawienia. Szczegóły w <a href="cookies.html">Polityce Cookies</a>.</p>' +
        '</div>' +
        '<div class="cookie-banner__actions">' +
          '<button type="button" class="cookie-btn cookie-btn--ghost" data-cookie="settings">Ustawienia</button>' +
          '<button type="button" class="cookie-btn cookie-btn--outline" data-cookie="reject">Odrzuć opcjonalne</button>' +
          '<button type="button" class="cookie-btn cookie-btn--solid" data-cookie="accept">Akceptuj wszystkie</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);
    banner.addEventListener('click', onAction);
  }

  function buildModal() {
    modal = el('div', {
      class: 'cookie-modal',
      id: 'cookieModal',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': 'Ustawienia plików cookies',
      hidden: 'hidden'
    });
    modal.innerHTML =
      '<div class="cookie-modal__backdrop" data-cookie="close"></div>' +
      '<div class="cookie-modal__card" role="document">' +
        '<h3>Ustawienia plików cookies</h3>' +
        '<p>Zarządzaj zgodą na poszczególne kategorie. Cookies niezbędne są zawsze aktywne, ' +
        'bo bez nich strona nie działa poprawnie.</p>' +
        '<div class="cookie-cat">' +
          '<div class="cookie-cat__head"><strong>Niezbędne</strong>' +
          '<span class="cookie-cat__always">Zawsze aktywne</span></div>' +
          '<p>Konieczne do prawidłowego działania strony (np. zapamiętanie Twojej zgody). Nie można ich wyłączyć.</p>' +
        '</div>' +
        '<div class="cookie-cat">' +
          '<div class="cookie-cat__head"><strong>Analityczne</strong>' +
          '<label class="cookie-switch"><input type="checkbox" data-cat="analytics"><span></span></label></div>' +
          '<p>Pomagają zrozumieć, jak korzystasz ze strony (np. Google Analytics). Uruchamiane tylko za Twoją zgodą.</p>' +
        '</div>' +
        '<div class="cookie-cat">' +
          '<div class="cookie-cat__head"><strong>Marketingowe</strong>' +
          '<label class="cookie-switch"><input type="checkbox" data-cat="marketing"><span></span></label></div>' +
          '<p>Służą do mierzenia skuteczności i personalizacji reklam (np. Meta Pixel). Uruchamiane tylko za Twoją zgodą.</p>' +
        '</div>' +
        '<div class="cookie-modal__actions">' +
          '<button type="button" class="cookie-btn cookie-btn--outline" data-cookie="reject">Odrzuć opcjonalne</button>' +
          '<button type="button" class="cookie-btn cookie-btn--ghost" data-cookie="save">Zapisz wybór</button>' +
          '<button type="button" class="cookie-btn cookie-btn--solid" data-cookie="accept">Akceptuj wszystkie</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
    toggles.analytics = modal.querySelector('input[data-cat="analytics"]');
    toggles.marketing = modal.querySelector('input[data-cat="marketing"]');
    modal.addEventListener('click', onAction);
  }

  /* ---------- Pokazywanie / ukrywanie ---------- */
  function showBanner() { banner.classList.add('is-visible'); }
  function hideBanner() { banner.classList.remove('is-visible'); }

  function openModal() {
    var c = readConsent() || DEFAULT;
    toggles.analytics.checked = !!c.analytics;
    toggles.marketing.checked = !!c.marketing;
    modal.removeAttribute('hidden');
    setTimeout(function () { modal.classList.add('is-visible'); }, 20);
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('is-visible');
    document.body.style.overflow = '';
    setTimeout(function () { modal.setAttribute('hidden', 'hidden'); }, 250);
  }

  /* ---------- Akcje ---------- */
  function onAction(e) {
    var btn = e.target.closest('[data-cookie]');
    if (!btn) return;
    var action = btn.getAttribute('data-cookie');
    if (action === 'accept') {
      saveConsent({ analytics: true, marketing: true });
      hideBanner(); closeModal();
    } else if (action === 'reject') {
      saveConsent({ analytics: false, marketing: false });
      hideBanner(); closeModal();
    } else if (action === 'settings') {
      openModal();
    } else if (action === 'save') {
      saveConsent({ analytics: toggles.analytics.checked, marketing: toggles.marketing.checked });
      hideBanner(); closeModal();
    } else if (action === 'close') {
      closeModal();
    }
  }

  /* ---------- Ponowne otwarcie z linku w stopce ---------- */
  function wireReopenLinks() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('[data-cookie-settings]');
      if (link) { e.preventDefault(); openModal(); }
    });
  }

  /* ---------- Esc zamyka modal ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && !modal.hasAttribute('hidden')) closeModal();
  });

  /* ---------- Init ---------- */
  function init() {
    buildBanner();
    buildModal();
    wireReopenLinks();
    if (!readConsent()) {
      // brak zapisanej zgody → pokaż baner (opcjonalne cookies pozostają wyłączone)
      setTimeout(showBanner, 60);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
