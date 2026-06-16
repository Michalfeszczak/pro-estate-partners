# Pro Estate Partners - Strona Internetowa

Profesjonalna strona internetowa dla Pro Estate Partners - firmy zarządzającej nieruchomościami w Szczecinie i Stargardzie.

---

## 📁 Struktura Projektu

```
ProEstatePartners/
├── index.html                          # Strona główna
├── polityka-prywatnosci.html          # Polityka prywatności (RODO)
├── regulamin.html                      # Regulamin usług
├── cookies.html                        # Polityka cookies
├── styles.css                          # Stylowanie CSS (responsywny)
├── scripts.js                          # JavaScript (interaktywność)
├── analytics-config.js                 # Konfiguracja narzędzi analitycznych
├── sitemap.xml                         # Mapa strony (SEO)
├── robots.txt                          # Instrukcje dla botów
├── SETUP_ANALYTICS.md                  # Instrukcja podłączenia Google Analytics
├── README.md                           # Ten plik
└── .claude/
    └── launch.json                     # Konfiguracja dev servera
```

---

## 🚀 Szybki Start

### Uruchomienie Lokalnie

```bash
cd /Users/michalfeszczak/Documents/ProEstatePartners
python3 -m http.server 8001
```

Następnie otwórz w przeglądarce: **http://localhost:8001**

### Alternatywnie - Node.js

```bash
npx http-server -p 8001
```

---

## 📄 Opis Plików

### HTML
- **index.html** - Główna strona z sekcjami: Hero, O nas, Oferta, Proces, Zalety, Cennik, FAQ, Kontakt
- **polityka-prywatnosci.html** - Pełna Polityka Prywatności (zgodna z RODO)
- **regulamin.html** - Regulamin świadczenia usług
- **cookies.html** - Polityka używania cookies

### CSS & JavaScript
- **styles.css** - Stylowanie strony (responsywne, dostępne, 1200px breakpoint)
  - Zmienne CSS dla kolorów (`--color-primary`, `--color-text`, itd.)
  - Grid/Flexbox do layoutu
  - Media queries dla mobile/tablet
  - Animacje i hover effects
  
- **scripts.js** - Logika JavaScript:
  - Sticky header
  - Mobile menu toggle
  - Smooth scroll
  - Śledzenie kliknięć na telefon
  - Integracja z narzędziami analitycznymi

- **analytics-config.js** - Centralna konfiguracja:
  - Google Analytics 4
  - Google Tag Manager
  - Meta Pixel (Facebook)
  - Hotjar, Microsoft Clarity, LinkedIn, TikTok
  - Zmienne dla wszystkich ID i ustawień

### SEO & Konfiguracja
- **sitemap.xml** - Mapa strony (4 URLs)
  - index.html (priority: 1.0)
  - polityka-prywatnosci.html (priority: 0.7)
  - regulamin.html (priority: 0.7)
  - cookies.html (priority: 0.6)

- **robots.txt** - Instrukcje dla botów:
  - Zezwolenie na indeksowanie całej strony
  - Link do sitemap.xml
  - Specjalne reguły dla Google, Bing, Facebook

### Dokumentacja
- **SETUP_ANALYTICS.md** - Krok po kroku instrukcja:
  - Google Analytics 4
  - Google Tag Manager
  - Meta Pixel
  - Google Search Console
  - Google Business Profile
  - Dodatkowe narzędzia (Hotjar, Clarity, LinkedIn, TikTok)
  - Weryfikacja działania

- **README.md** - Ten plik

---

## 🎨 Kolorystyka & Design

### Kolory (zmienne CSS)
```css
--color-bg: #F7F8F5         /* Tło (jasne szare) */
--color-primary: #527267    /* Główny (ciemny zielony) */
--color-primary-hover: #405D54  /* Hover (ciemniejszy zielony) */
--color-text: #25302D       /* Tekst (grafitowy) */
--color-text-light: #5a6562 /* Tekst jasny */
--color-accent: #D9CBAF     /* Akcent (beż) */
--color-white: #FFFFFF      /* Biały */
--color-border: #E5E5E5     /* Granice */
```

### Fonty
- **Manrope** - Nagłówki (h1, h2, h3)
- **Inter** - Tekst główny i paragrafy
- Obie z Google Fonts

### Responsywność
- **Desktop**: 1200px width, full navigation
- **Tablet** (max 768px): Menu collapse, mobile-friendly
- **Mobile** (max 480px): Single column, larger touch targets

---

## ✨ Funkcjonalności

### Na Stronie
✅ Sticky header z nawigacją  
✅ Smooth scroll do sekcji  
✅ Mobile menu (hamburger)  
✅ Przyciski "Zadzwoń" z link tel:  
✅ Scroll-to-top button  
✅ Responsive design  
✅ WCAG AA dostępność (kontrast, alt, semantyka)  
✅ JSON-LD schema (LocalBusiness)  
✅ Meta tags (SEO)  

### Analityka (przygotowana do podłączenia)
✅ Google Analytics 4  
✅ Google Tag Manager  
✅ Meta Pixel (Facebook)  
✅ Hotjar (session recording)  
✅ Microsoft Clarity  
✅ LinkedIn Insight  
✅ TikTok Pixel  

### Tracking Zdarzeń
- Phone click (tel: kliknięcie)
- Page views
- Scroll depth
- Form submissions (jeśli będą dodane)

---

## 🔧 Jak Podłączyć Analytics

### Szybka Metoda (5 minut)

1. Otwórz plik `analytics-config.js`

2. Dodaj swoje ID:
```javascript
GOOGLE_ANALYTICS_ID: 'G-XXXXXXXXXX',      // Z Google Analytics
META_PIXEL_ID: 'XXXXXXXXXXXXXXXXXX',      // Z Meta/Facebook
GOOGLE_TAG_MANAGER_ID: 'GTM-XXXXXXXX',    // Z Google Tag Manager
```

3. Włącz debug mode i testuj:
```javascript
DEBUG_MODE: true,
```

4. Otwórz DevTools (F12) i sprawdź konsolę

5. Wyłącz debug mode:
```javascript
DEBUG_MODE: false,
```

Pełne instrukcje: [SETUP_ANALYTICS.md](SETUP_ANALYTICS.md)

---

## 📱 Testowanie

### Browser DevTools
```
F12 lub Ctrl+Shift+J → Console
```
Powinieneś zobaczyć:
- Google Analytics initialized
- Meta Pixel initialized
- itd.

### Responsywność
W DevTools → Toggle device toolbar (Ctrl+Shift+M)
Testuj: iPhone, iPad, Desktop

### Accessibility
- **WAVE**: https://wave.webaim.org/
- **Lighthouse**: DevTools → Lighthouse tab
- **Contrast**: https://webaim.org/resources/contrastchecker/

---

## 🌍 Wdrażanie

### Lokalne (development)
```bash
python3 -m http.server 8001
```
Otwórz: http://localhost:8001

### Produkcja
1. Wgraj wszystkie pliki na hosting (SFTP/FTP)
2. Upewnij się, że:
   - sitemap.xml jest dostępny na `/sitemap.xml`
   - robots.txt jest dostępny na `/robots.txt`
   - analytics-config.js ma właściwe ID
   - DEBUG_MODE: false

3. Dodaj stronę do Google Search Console:
   - Zarejestruj https://proestatepartners.com
   - Prześlij sitemap.xml
   - Czekaj na indeksowanie (24-48h)

4. Stwórz profil Google Business Profile (Moja Firma)

---

## 📊 Monitorowanie

### Google Analytics
- Raport czasu rzeczywistego - sprawdzaj odwiedzenia na bieżąco
- Konwersje - śledź kliknięcia na "Zadzwoń"
- Źródła ruchu - skąd przychodzą użytkownicy
- Urządzenia - desktop vs. mobile

### Google Search Console
- Pokrycie - które strony są zaindeksowane
- Wydajność - kliki, wrażenia, pozycje
- Błędy - 404, problemy crawl

### Meta Pixel
- Events Manager - sprawdzaj PageView i Contact events
- Pixel ID - weryfikuj czy pixel pracuje

---

## 🔐 Bezpieczeństwo & RODO

✅ Polityka Prywatności (polityka-prywatnosci.html)  
✅ Polityka Cookies (cookies.html)  
✅ Regulamin (regulamin.html)  
✅ Meta tags (viewport, charset)  
✅ SSL/HTTPS (na produkcji)  
✅ WCAG AA dostępność  

---

## 🐛 Troubleshooting

### Analytics nie działają
- Sprawdź czy ID w `analytics-config.js` są prawidłowe
- Włącz DEBUG_MODE aby zobaczyć błędy w konsoli
- Czekaj kilka sekund aż skrypty się załadują
- Przeczytaj SETUP_ANALYTICS.md

### Strona się nie ładuje
- Sprawdź czy server HTTP jest uruchomiony (port 8001)
- Czy plik index.html istnieje w tym samym folderze
- Czy wszystkie linki CSS/JS są prawidłowe

### CSS nie działa
- Otwórz DevTools → Sources
- Sprawdź czy styles.css się ładuje
- Nie powinny być błędy 404

### Mobile menu nie działa
- Upewnij się że JavaScript jest włączony
- Przeczytaj error log w konsoli (F12)

---

## 📞 Kontakt

**Pro Estate Partners**
- Telefon: 602 218 958
- Strona: https://proestatepartners.com
- Email: info@proestatepartners.com (jeśli będzie dodane)

---

## 📝 Historia Zmian

### v1.0 (2026-06-15)
- ✅ Struktura HTML (index.html + 3 podstrony)
- ✅ Stylowanie CSS (responsywne, accessible)
- ✅ JavaScript (interaktywność, analytics)
- ✅ Sitemap.xml i robots.txt
- ✅ Konfiguracja narzędzi analitycznych
- ✅ Instrukcje setup

---

## 📚 Przydatne Linki

- **Google Analytics**: https://analytics.google.com
- **Google Search Console**: https://search.google.com/search-console
- **Meta Business**: https://business.facebook.com
- **Google Tag Manager**: https://tagmanager.google.com
- **Web.dev Accessibility**: https://web.dev/lighthouse-accessibility/
- **MDN Web Docs**: https://developer.mozilla.org/

---

**Powodzenia! 🚀**

Jeśli masz pytania, skontaktuj się z zespołem na **602 218 958**