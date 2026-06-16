/**
 * ==========================================================
 * CONFIGURATION - PRO ESTATE PARTNERS
 * ==========================================================
 *
 * Centralna konfiguracja dla wszystkich ustawień aplikacji.
 * Łączy zmienne z .env (production) i defaults (development)
 *
 * Użycie:
 * - import Config from './config.js'
 * - Config.GOOGLE_ANALYTICS_ID
 * - Config.isDevelopment()
 * - Config.isProduction()
 */

// ========================================================
// ENVIRONMENT DETECTION
// ========================================================

const getEnvironment = () => {
  // Sprawdź czy jesteśmy na localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'development';
  }
  // Sprawdź czy URL zawiera staging/staging.
  if (window.location.hostname.includes('staging')) {
    return 'staging';
  }
  // Inaczej production
  return 'production';
};

// ========================================================
// DOMYŚLNE WARTOŚCI (Development)
// ========================================================

const DEFAULTS = {
  // Environment
  ENVIRONMENT: getEnvironment(),
  DEBUG_MODE: getEnvironment() !== 'production',
  VERBOSE_LOGGING: false,

  // Domain
  DOMAIN: 'https://proestatepartners.com',
  DOMAIN_LOCAL: 'http://localhost:8001',
  CURRENT_DOMAIN: window.location.origin,

  // Google Services
  GOOGLE_ANALYTICS_ID: '', // Wypełnij w .env
  GOOGLE_TAG_MANAGER_ID: '', // Wypełnij w .env
  GOOGLE_SEARCH_CONSOLE_VERIFY: '', // Wypełnij w .env

  // Facebook / Meta
  META_PIXEL_ID: '', // Wypełnij w .env
  FACEBOOK_APP_ID: '', // Wypełnij w .env
  FACEBOOK_PAGE_ID: '', // Wypełnij w .env

  // Session Recording
  HOTJAR_ID: '', // Wypełnij w .env
  CLARITY_ID: '', // Wypełnij w .env

  // Social Media & Advertising
  LINKEDIN_PARTNER_ID: '', // Wypełnij w .env
  TIKTOK_PIXEL_ID: '', // Wypełnij w .env

  // Contact Info
  PHONE_NUMBER: '+48602218958',
  EMAIL: 'info@proestatepartners.com',
  ADDRESS: 'Szczecin, Polska',

  // Feature Flags
  TRACK_PHONE_CLICKS: true,
  TRACK_FORM_SUBMISSIONS: false,
  TRACK_SCROLL_DEPTH: false,
  SHOW_COOKIES_BANNER: true,

  // Performance
  LAZY_LOAD_IMAGES: true,
  DNS_PREFETCH: true,
  CACHE_STRATEGY: 'network-first', // network-first, cache-first, stale-while-revalidate

  // Security
  CSP_ENABLED: true,
  HTTPS_ONLY: true,
  X_FRAME_OPTIONS: 'SAMEORIGIN',

  // Third Party Services
  SENDGRID_API_KEY: '', // Wypełnij w .env
  STRIPE_PUBLIC_KEY: '', // Wypełnij w .env
  ZAPIER_WEBHOOK_URL: '', // Wypełnij w .env

  // WordPress
  WP_API_URL: 'https://proestatepartners.com/wp-json',
  WP_API_KEY: '', // Wypełnij w .env

  // Maintenance
  MAINTENANCE_MODE: false,
  MAINTENANCE_MESSAGE: 'Strona jest w trakcie konserwacji. Proszę powrócić później.',

  // Monitoring
  SENTRY_DSN: '', // Wypełnij w .env
  LOGROCKET_ID: '', // Wypełnij w .env

  // Conversion Events
  CONVERSION_EVENTS: {
    PHONE_CLICK: 'phone_call',
    FORM_SUBMISSION: 'lead',
    PAGE_VIEW: 'page_view',
    SCROLL_DEPTH: 'scroll',
  },
};

// ========================================================
// FUNKCJE POMOCNICZE
// ========================================================

/**
 * Pobierz zmienną konfiguracyjną
 * @param {string} key - Klucz zmiennej
 * @param {any} fallback - Wartość fallback (opcjonalne)
 * @returns {any} - Wartość zmiennej
 */
const get = (key, fallback = undefined) => {
  return DEFAULTS[key] ?? fallback;
};

/**
 * Sprawdź czy jesteśmy w development mode
 * @returns {boolean}
 */
const isDevelopment = () => {
  return DEFAULTS.ENVIRONMENT === 'development';
};

/**
 * Sprawdź czy jesteśmy w staging mode
 * @returns {boolean}
 */
const isStaging = () => {
  return DEFAULTS.ENVIRONMENT === 'staging';
};

/**
 * Sprawdź czy jesteśmy w production mode
 * @returns {boolean}
 */
const isProduction = () => {
  return DEFAULTS.ENVIRONMENT === 'production';
};

/**
 * Sprawdź czy API key jest skonfigurowany
 * @param {string} serviceName - Nazwa usługi (np. 'GOOGLE_ANALYTICS_ID')
 * @returns {boolean}
 */
const isConfigured = (serviceName) => {
  const value = DEFAULTS[serviceName];
  return value !== '' && value !== undefined && value !== null;
};

/**
 * Zaloguj konfigurację (tylko w debug mode)
 * @param {string} section - Sekcja do logowania (opcjonalne)
 */
const logConfig = (section = null) => {
  if (!DEFAULTS.DEBUG_MODE) return;

  if (section) {
    console.group(`📋 Config: ${section}`);
    Object.keys(DEFAULTS)
      .filter(key => key.toLowerCase().includes(section.toLowerCase()))
      .forEach(key => {
        const value = DEFAULTS[key];
        const isSet = value !== '' && value !== undefined && value !== null;
        console.log(`${key}: ${isSet ? '✓ Configured' : '✗ Not configured'}`);
      });
    console.groupEnd();
  } else {
    console.group('📋 Full Configuration');
    Object.keys(DEFAULTS).forEach(key => {
      const value = DEFAULTS[key];
      if (typeof value === 'object') {
        console.log(`${key}:`, value);
      } else {
        const isSet = value !== '' && value !== undefined && value !== null;
        console.log(`${key}: ${isSet ? '✓' : '✗'}`);
      }
    });
    console.groupEnd();
  }
};

/**
 * Zwróć status wszystkich konfiguracji
 * @returns {object} - Raport ze statusów
 */
const getConfigStatus = () => {
  const status = {
    environment: DEFAULTS.ENVIRONMENT,
    configured: {},
    notConfigured: {},
  };

  // Klucze które wymagają konfiguracji
  const configKeys = [
    'GOOGLE_ANALYTICS_ID',
    'GOOGLE_TAG_MANAGER_ID',
    'META_PIXEL_ID',
    'HOTJAR_ID',
    'CLARITY_ID',
    'LINKEDIN_PARTNER_ID',
    'TIKTOK_PIXEL_ID',
  ];

  configKeys.forEach(key => {
    if (isConfigured(key)) {
      status.configured[key] = true;
    } else {
      status.notConfigured[key] = false;
    }
  });

  return status;
};

// ========================================================
// VALIDATION HELPERS
// ========================================================

/**
 * Sprawdź czy URL jest HTTPS (na produkcji)
 * @returns {boolean}
 */
const isSecureConnection = () => {
  if (isDevelopment()) return true; // Dev nie wymaga HTTPS
  return window.location.protocol === 'https:';
};

/**
 * Sprawdź czy wszystkie wymagane API keys są skonfigurowane
 * @returns {object} - { valid: boolean, missing: array }
 */
const validateConfiguration = () => {
  const result = {
    valid: true,
    missing: [],
    warnings: [],
  };

  // Sprawdzenie na produkcji
  if (isProduction()) {
    const required = [
      'GOOGLE_ANALYTICS_ID',
      'GOOGLE_SEARCH_CONSOLE_VERIFY',
    ];

    required.forEach(key => {
      if (!isConfigured(key)) {
        result.valid = false;
        result.missing.push(key);
      }
    });

    // Warnings (polecane ale nie wymagane)
    const recommended = [
      'META_PIXEL_ID',
      'GOOGLE_TAG_MANAGER_ID',
    ];

    recommended.forEach(key => {
      if (!isConfigured(key)) {
        result.warnings.push(`${key} nie skonfigurowany (polecane dla SEO/tracking)`);
      }
    });
  }

  return result;
};

// ========================================================
// EXPORT
// ========================================================

const Config = {
  // Zmienne
  ...DEFAULTS,

  // Funkcje
  get,
  isDevelopment,
  isStaging,
  isProduction,
  isConfigured,
  logConfig,
  getConfigStatus,
  isSecureConnection,
  validateConfiguration,
};

// ========================================================
// INITIALIZATION
// ========================================================

// Zaloguj konfigurację na start (jeśli debug)
document.addEventListener('DOMContentLoaded', () => {
  if (Config.DEBUG_MODE) {
    console.log('🚀 Pro Estate Partners - Configuration Loaded');
    Config.logConfig();

    // Sprawdzenie walidacji
    const validation = Config.validateConfiguration();
    if (!validation.valid) {
      console.warn('⚠️ Brakujące wymagane konfiguracje:', validation.missing);
    }
    if (validation.warnings.length > 0) {
      console.info('ℹ️ Rekomendowane konfiguracje:', validation.warnings);
    }
  }
});

// ========================================================
// EXPORT FOR MODULE SYSTEMS
// ========================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Config;
}

// ========================================================
// USAGE EXAMPLES
// ========================================================

/**
 * PRZYKŁADY UŻYCIA:
 *
 * // Pobierz zmienną
 * const gaId = Config.GOOGLE_ANALYTICS_ID;
 * const gaId = Config.get('GOOGLE_ANALYTICS_ID');
 *
 * // Sprawdzenie środowiska
 * if (Config.isDevelopment()) { ... }
 * if (Config.isProduction()) { ... }
 *
 * // Sprawdzenie czy service jest skonfigurowany
 * if (Config.isConfigured('META_PIXEL_ID')) { ... }
 *
 * // Logi
 * Config.logConfig('GOOGLE'); // Log tylko Google services
 * Config.logConfig(); // Log wszystko
 *
 * // Status raport
 * const status = Config.getConfigStatus();
 * console.log(status.configured); // Już skonfigurowane
 * console.log(status.notConfigured); // Brakujące
 *
 * // Walidacja
 * const valid = Config.validateConfiguration();
 * if (!valid.valid) {
 *   console.error('Missing:', valid.missing);
 * }
 */