(function () {
  var KEY = 'pep-language';
  var rootPath = '/';
  var englishPath = '/en/';
  var path = window.location.pathname;
  var isEnglishPage = path === englishPath || path.indexOf(englishPath) === 0;
  var isPolishHome = path === rootPath || path === '/index.html';
  var saved = null;

  try {
    saved = window.localStorage.getItem(KEY);
  } catch (error) {
    saved = null;
  }

  function storeLanguage(language) {
    try {
      window.localStorage.setItem(KEY, language);
    } catch (error) {
      // The switch still works when storage is unavailable.
    }
  }

  function preferredBrowserLanguage() {
    var languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    var browserLanguage = (languages[0] || '').toLowerCase();
    var localeLanguage = '';

    try {
      localeLanguage = (Intl.DateTimeFormat().resolvedOptions().locale || '').toLowerCase();
    } catch (error) {
      localeLanguage = '';
    }

    if (browserLanguage.indexOf('pl') === 0 || localeLanguage.indexOf('pl') === 0) return 'pl';
    if (browserLanguage.indexOf('en') === 0 || localeLanguage.indexOf('en') === 0) return 'en';
    return 'pl';
  }

  function isCrawler() {
    return /bot|crawler|spider|crawling|google|bing|yandex|duckduck|baidu|slurp|facebookexternalhit|twitterbot|linkedinbot|whatsapp/i.test(navigator.userAgent || '');
  }

  function targetPath(language) {
    return language === 'en' ? englishPath : rootPath;
  }

  function redirectTo(language) {
    var target = targetPath(language) + window.location.hash;
    if ((language === 'en' && !isEnglishPage) || (language === 'pl' && isEnglishPage)) {
      window.location.replace(target);
    }
  }

  if (saved === 'en' || saved === 'pl') {
    redirectTo(saved);
  } else if (!isCrawler() && isPolishHome && preferredBrowserLanguage() === 'en') {
    redirectTo('en');
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-language-switch]').forEach(function (link) {
      link.addEventListener('click', function () {
        storeLanguage(link.getAttribute('data-language-switch'));
      });
    });
  });
})();
