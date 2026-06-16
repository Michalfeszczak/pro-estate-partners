/**
 * ==========================================================
 * ANALYTICS & INTEGRATIONS CONFIGURATION
 * ==========================================================
 *
 * Plik konfiguracyjny do podłączenia wszystkich narzędzi
 * analitycznych i marketingowych dla Pro Estate Partners.
 *
 * Instrukcje: Zastąp wartości poniżej właściwymi ID z Twoich kont.
 */

const AnalyticsConfig = {
  // ========== GOOGLE ANALYTICS 4 ==========
  // Pobierz ID z: https://analytics.google.com
  // Instrukcja: Zaloguj się > Admin > Data Streams > Web > Measurement ID
  GOOGLE_ANALYTICS_ID: 'G-XXXXXXXXXX', // Zastąp XXXXXXXXXX na rzeczywisty ID

  // ========== GOOGLE TAG MANAGER ==========
  // Pobierz ID z: https://tagmanager.google.com
  // Instrukcja: Zaloguj się > Workspace > Copy Container ID
  GOOGLE_TAG_MANAGER_ID: 'GTM-XXXXXXXX', // Zastąp XXXXXXXX na rzeczywisty ID

  // ========== META PIXEL (FACEBOOK) ==========
  // Pobierz ID z: https://business.facebook.com/
  // Instrukcja: Business Manager > Dane > Pixel > Pobierz ID piksela
  META_PIXEL_ID: 'XXXXXXXXXXXXXXXXXX', // Zastąp XXXXXXXXXXXXXXXXXX na rzeczywisty ID

  // ========== GOOGLE SEARCH CONSOLE ==========
  // Pobierz kod z: https://search.google.com/search-console
  // Instrukcja: Dodaj nieruchomość > Wybierz metodę > HTML tag
  GOOGLE_SEARCH_CONSOLE_VERIFICATION: '', // Opcjonalne - verify code

  // ========== GOOGLE BUSINESS PROFILE (MOJA FIRMA) ==========
  // Informacje o firmie (do ręcznego dodania w Google Moja Firma)
  BUSINESS_NAME: 'Pro Estate Partners',
  BUSINESS_PHONE: '+48602218958',
  BUSINESS_ADDRESS: 'Szczecin, Polska',
  BUSINESS_URL: 'https://proestatepartners.com',
  BUSINESS_CATEGORY: 'Zarządzanie Nieruchomościami',

  // ========== GOOGLE SITE KIT ==========
  // Połączenie z: https://sitekit.withgoogle.com
  // Instrukcja: Zainstaluj wtyczkę Site Kit by Google
  GOOGLE_SITE_KIT_ENABLED: false, // Zmień na true po instalacji wtyczki

  // ========== HOTJAR (SESSION RECORDING) ==========
  // Pobierz ID z: https://www.hotjar.com
  // Instrukcja: Zaloguj się > Settings > Copy Site ID
  HOTJAR_ID: '', // Opcjonalne - do zapisywania sesji użytkowników

  // ========== MICROSOFT CLARITY ==========
  // Pobierz ID z: https://clarity.microsoft.com
  // Instrukcja: Dodaj projekt > Pobierz Project ID
  CLARITY_ID: '', // Opcjonalne - alternatywa dla Hotjar

  // ========== LINKEDIN INSIGHT TAG ==========
  // Pobierz ID z: https://business.linkedin.com/
  // Instrukcja: Campaign Manager > Conversion tracking
  LINKEDIN_PARTNER_ID: '', // Opcjonalne - dla B2B kampanii

  // ========== TIKTOK PIXEL ==========
  // Pobierz ID z: https://ads.tiktok.com/
  // Instrukcja: Event Manager > Web Events > Pixel
  TIKTOK_PIXEL_ID: '', // Opcjonalne - jeśli używasz TikTok Ads

  // ========== USTAWIENIA OGÓLNE ==========
  ENVIRONMENT: 'production', // production, staging, development
  DEBUG_MODE: false, // Zmień na true do debugowania
  TRACK_PHONE_CLICKS: true, // Śledź kliknięcia na numer telefonu
  TRACK_EMAIL_CLICKS: false, // Śledź kliknięcia na e-mail
  TRACK_FORM_SUBMISSIONS: false, // Śledź wysyłanie formularzy (jeśli są)

  // ========== KONWERSJE ==========
  // Zdefiniuj zdarzenia konwersji
  CONVERSION_EVENTS: {
    PHONE_CLICK: 'phone_call', // Kliknięcie na Zadzwoń
    FORM_SUBMISSION: 'lead', // Wysłanie formularza
    PAGE_VIEW: 'page_view', // Wyświetlenie strony
    SCROLL_DEPTH: 'scroll', // Przewinięcie strony
  }
};

// ========== EKSPORT ==========
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnalyticsConfig;
}