# 🚀 DEPLOYMENT CHECKLIST - PRO ESTATE PARTNERS
## Kompletna Instrukcja Wdrażania & Podłączenia Wszystkich Usług

---

## 📋 Spis Treści

1. [Przygotowanie Pre-Deployment](#przygotowanie-pre-deployment)
2. [Konfiguracja Zmiennych (.env)](#konfiguracja-zmiennych-env)
3. [Google Services](#google-services)
4. [Meta / Facebook](#meta--facebook)
5. [Session Recording](#session-recording)
6. [Performance & Security](#performance--security)
7. [Testing & Validation](#testing--validation)
8. [Deployment](#deployment)
9. [Post-Deployment](#post-deployment)
10. [Monitoring](#monitoring)

---

## Przygotowanie Pre-Deployment

### ✅ Checklist Przed Wdrożeniem

```
□ Wszystkie HTML pliki zawierają config.js
□ CSS i JS są zminiowały (production ready)
□ Sitemap.xml jest prawidłowy
□ Robots.txt zawiera Sitemap link
□ .gitignore zawiera .env
□ .env.example jest kompletny
□ Brak hardcoded API keys w kodzie
□ Debug mode jest wyłączony (ENVIRONMENT=production)
□ HTTPS jest włączony
```

### 📁 Struktura Plików (Finalna)

```
ProEstatePartners/
├── index.html
├── polityka-prywatnosci.html
├── regulamin.html
├── cookies.html
├── styles.css
├── scripts.js
├── config.js                    # 🆕 Config
├── analytics-config.js          # (opcjonalnie - mogę być w config.js)
├── sitemap.xml
├── robots.txt
├── .env                         # 🆕 Zmienne (LOCAL - nie commituj!)
├── .env.example                 # 🆕 Template (commituj!)
├── .gitignore                   # 🆕 Git ignore
├── README.md
├── SETUP_ANALYTICS.md
├── SITEMAP_GUIDE.md
├── DEPLOYMENT_CHECKLIST.md      # Ten plik
└── check-sitemap.sh
```

---

## Konfiguracja Zmiennych (.env)

### Krok 1: Stwórz .env z .env.example

```bash
cp .env.example .env
```

### Krok 2: Wypełnij Zmienne

Otwórz `.env` i wpisz wszystkie wartości:

```bash
# Basics
ENVIRONMENT=production
DOMAIN=https://proestatepartners.com
DEBUG_MODE=false

# Phone
PHONE_NUMBER=+48602218958

# Flags
TRACK_PHONE_CLICKS=true
SHOW_COOKIES_BANNER=true
```

### Krok 3: Sprawdzenie

```bash
# Sprawdzenie czy plik jest prawidłowy
cat .env | grep -v "^#" | grep -v "^$"
```

### ⚠️ WAŻNE: Zabezpieczenie

```bash
# Upewnij się że .env jest w .gitignore
grep ".env" .gitignore

# Jeśli niechcący commitałeś .env:
git rm --cached .env
git commit --amend -m "Remove .env from history"
```

---

## Google Services

### 1️⃣ Google Analytics 4

#### Krok 1: Utwórz Konto
- Przejdź: https://analytics.google.com
- Zaloguj się
- Kliknij "Utwórz konto"
- Nazwa: `Pro Estate Partners`

#### Krok 2: Pobierz Measurement ID
1. Admin (⚙️) → Data Streams → Web
2. Skopiuj: **Measurement ID** (G-XXXXXXXXXX)

#### Krok 3: Dodaj do .env
```bash
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

#### Krok 4: Verify
- Otwórz DevTools (F12)
- Console tab
- Powinno być: `Google Analytics initialized`

---

### 2️⃣ Google Tag Manager

#### Krok 1: Utwórz Konto
- Przejdź: https://tagmanager.google.com
- Utwórz konto
- Nazwa: `Pro Estate Partners`

#### Krok 2: Pobierz Container ID
- Po utworzeniu kontenera
- Skopiuj: **Container ID** (GTM-XXXXXXXX)

#### Krok 3: Dodaj do .env
```bash
GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXXX
```

#### Krok 4: Opublikuj
- W GTM: Kliknij "Opublikuj"
- Potwierdź publikację

---

### 3️⃣ Google Search Console

#### Krok 1: Zarejestruj Stronę
- Przejdź: https://search.google.com/search-console
- "Dodaj nieruchomość"
- URL: `https://proestatepartners.com`

#### Krok 2: Weryfikacja
**Opcja A: HTML Tag (polecane)**
1. Wybierz "HTML tag"
2. Skopiuj kod z atrybutem `content="..."`
3. Dodaj do `index.html` w `<head>`:
```html
<meta name="google-site-verification" content="WPISZ_TUTAJ">
```
4. Kliknij "Weryfikuj"

**Opcja B: Upload Pliku**
1. Pobierz: `google[kod].html`
2. Wgraj na serwer
3. Kliknij "Weryfikuj"

#### Krok 3: Dodaj Sitemap
1. Search Console → Mapy witryn
2. Wpisz: `https://proestatepartners.com/sitemap.xml`
3. Kliknij "Prześlij"

#### Krok 4: Monitoruj
- Czekaj 24-48h na indeksowanie
- Sprawdzaj "Pokrycie" (Coverage)

---

### 4️⃣ Google Business Profile (Moja Firma)

#### Krok 1: Utwórz Profil
- Przejdź: https://business.google.com
- "Zarządzaj teraz" lub "Utwórz profil"

#### Krok 2: Wypełnij Dane
- Nazwa: `Pro Estate Partners`
- Kategoria: `Zarządzanie Nieruchomościami`
- Adres: `Szczecin, Polska`
- Telefon: `602 218 958`
- WWW: `https://proestatepartners.com`
- Godziny: Pon-Pt 8:00-18:00

#### Krok 3: Dodaj Zdjęcia
- Logo firmy
- Zdjęcia nieruchomości
- Zespół (opcjonalnie)

---

## Meta / Facebook

### 1️⃣ Meta Pixel (Facebook Pixel)

#### Krok 1: Utwórz Pixel
- Przejdź: https://business.facebook.com
- Business Manager → Data → Pixels
- "Utwórz pixel"
- Nazwa: `Pro Estate Partners Website`

#### Krok 2: Pobierz Pixel ID
- W Pixel Settings
- Skopiuj: **Pixel ID** (16-cyfrowa liczba)

#### Krok 3: Dodaj do .env
```bash
META_PIXEL_ID=XXXXXXXXXXXXXXXXXX
```

#### Krok 4: Verify
- W Events Manager
- Przejdź na: https://proestatepartners.com
- Powinna być wiadomość: "Test Events Received"

---

### 2️⃣ Facebook Business Account

#### Krok 1: Utwórz Business Account
- https://business.facebook.com
- Zaloguj się kontem Facebook

#### Krok 2: Utwórz Stronę Firmową
- Pages → "Utwórz stronę"
- Typ: `Lokalny biznes lub miejsce`
- Kategoria: `Zarządzanie Nieruchomościami`

#### Krok 3: Wypełnij Dane
- Nazwa: `Pro Estate Partners`
- Telefon: `602 218 958`
- Godziny otwarcia
- Adres

#### Krok 4: Dodaj do .env (opcjonalnie)
```bash
FACEBOOK_PAGE_ID=XXXXXXXXXXXXX
FACEBOOK_APP_ID=XXXXXXXXXXXXX
```

---

## Session Recording

### 1️⃣ Hotjar (Opcjonalnie)

#### Krok 1: Utwórz Konto
- https://www.hotjar.com
- Zaloguj się
- Utwórz projekt

#### Krok 2: Pobierz Site ID
- Settings → Site ID
- Skopiuj Site ID

#### Krok 3: Dodaj do .env
```bash
HOTJAR_ID=XXXXXXXXXX
```

---

### 2️⃣ Microsoft Clarity (Opcjonalnie, Darmowe)

#### Krok 1: Utwórz Projekt
- https://clarity.microsoft.com
- Zaloguj się kontem Microsoft
- "Create a new project"

#### Krok 2: Pobierz Project ID
- Settings → Project ID
- Skopiuj Project ID

#### Krok 3: Dodaj do .env
```bash
CLARITY_ID=XXXXXXXXXX
```

---

## Performance & Security

### 1️⃣ HTTPS Certificate

#### Let's Encrypt (Darmowe)
```bash
# Instalacja certbot (jeśli używasz Apache/Nginx)
sudo apt-get install certbot python3-certbot-apache

# Generowanie certyfikatu
sudo certbot certonly -a apache -d proestatepartners.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

### 2️⃣ Security Headers

Dodaj do `.htaccess` (Apache):
```apache
# HTTPS Redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Security Headers
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Cache Control
<FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|svg)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

<FilesMatch "\.(html)$">
  Header set Cache-Control "max-age=3600, must-revalidate"
</FilesMatch>
```

### 3️⃣ Gzip Compression

Dodaj do `.htaccess`:
```apache
# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

---

## Testing & Validation

### ✅ Pre-Launch Checks

```bash
# 1. Sitemap validation
./check-sitemap.sh

# 2. XML Sitemap online
https://www.xml-sitemaps.com/validate-xml-sitemap.html

# 3. Robots.txt test
https://search.google.com/search-console (Tools → Test robots.txt)

# 4. Mobile-friendly test
https://search.google.com/test/mobile-friendly

# 5. Lighthouse audit
DevTools → Lighthouse → Generate report

# 6. WAVE accessibility
https://wave.webaim.org/
```

### 🔍 Browser Testing

```
✓ Chrome
✓ Firefox
✓ Safari
✓ Edge
✓ Mobile Safari (iPhone)
✓ Chrome Mobile (Android)
```

### ⚡ Performance Metrics

```
✓ Largest Contentful Paint (LCP): < 2.5s
✓ First Input Delay (FID): < 100ms
✓ Cumulative Layout Shift (CLS): < 0.1
```

---

## Deployment

### 📦 Przygotowanie do Wdrażania

```bash
# 1. Commit wszystkich zmian
git add .
git commit -m "Pre-deployment: All configurations ready"

# 2. Sprawdzenie że .env nie jest staged
git status
# Nie powinno być: .env

# 3. Sprawdzenie ostatnich commitów
git log --oneline -5

# 4. Tag dla wersji
git tag -a v1.0.0 -m "Production release v1.0.0"
git push origin v1.0.0
```

### 🌐 Upload na Hosting

**Via SFTP (Recommended):**
```bash
# Using Filezilla lub WinSCP:
1. Podłącz się do serwera (host, user, password)
2. Przejdź do public_html/ lub www/
3. Upload wszystkich plików OPRÓCZ:
   - .env (wpisz ręcznie na serwerze!)
   - .git/
   - node_modules/ (jeśli będzie)
   - .gitignore
   - SETUP_ANALYTICS.md (opcjonalnie)
```

**Via Git (Advanced):**
```bash
# Na serwerze:
cd /home/user/public_html
git clone https://github.com/username/proestatepartners.git .
cp .env.example .env
# Edytuj .env na serwerze
chmod 644 .env
chmod 644 .htaccess
```

### 🔐 Konfiguracja na Serwerze

```bash
# 1. Utwórz .env na serwerze
nano .env

# Wpisz wszystkie zmienne (GOOGLE_ANALYTICS_ID, itd.)

# 2. Ustawy uprawnienia
chmod 644 .env           # Czytelny tylko dla serwera
chmod 644 robots.txt
chmod 644 .htaccess

# 3. Sprawdzenie plików
ls -la | grep "^\."      # Pokaż pliki ukryte
```

### ✅ Verify Deployment

```bash
# 1. Sprawdzenie dostępności
curl -I https://proestatepartners.com

# 2. Sprawdzenie sitemap
curl https://proestatepartners.com/sitemap.xml | head -20

# 3. Sprawdzenie robots.txt
curl https://proestatepartners.com/robots.txt | head -10

# 4. Sprawdzenie HTTPS
https://www.ssllabs.com/ssltest/analyze.html?d=proestatepartners.com
```

---

## Post-Deployment

### 📊 Monitoring Konfiguracji

```bash
# 1. Google Search Console
https://search.google.com/search-console
- Czekaj na Pokrycie (Coverage)
- Szukaj błędów

# 2. Google Analytics
https://analytics.google.com
- Raport czasu rzeczywistego
- Powinni się pojawić użytkownicy

# 3. Meta Pixel
https://business.facebook.com/pixels
- Events Manager
- Powinni się pojawić Page View events

# 4. Bing Webmaster
https://www.bing.com/webmasters
- Submit sitemap
```

### 📋 First 48 Hours Checklist

```
□ Google Search Console - strona zaindeksowana
□ Google Analytics - widać real-time traffic
□ Meta Pixel - widać Page View events
□ Robots.txt - accessible na /robots.txt
□ Sitemap - accessible na /sitemap.xml
□ HTTPS certificate - valid (lock icon)
□ Mobile friendly - passed test
□ No 404 errors - sprawdzić logs
□ Contact phone button - działający
□ All pages load - no errors
```

---

## Monitoring

### 📈 Daily Checks (Pierwszy Tydzień)

```
□ Google Search Console - Pokrycie bez błędów
□ Google Analytics - Traffic rozsądny
□ Errors log - Brak 500 errors
□ Uptime - https://updown.io/ (darmowy monitoring)
```

### 📊 Weekly Checks

```
□ Search Console - New indexed pages
□ Analytics - Traffic trends
□ Rankings - Sprawdzenie pozycji w Google
□ Backlinks - Kto linkuje do Ciebie
□ Competitors - Analiza konkurencji
```

### 🔄 Monthly Tasks

```
□ Update .env zmienne (jeśli się zmienią)
□ Review Config (validateConfiguration())
□ Backup strony
□ Security audit
□ Performance optimization
□ Content updates
```

---

## 🚨 Emergency Procedures

### Jeśli Coś Pójdzie Nie Tak

#### ❌ Google Analytics nie działa
```
1. Sprawdzić GOOGLE_ANALYTICS_ID w .env
2. Poczekać 24h na rejestrację GA
3. Sprawdzić DevTools Console (F12)
4. Wyczyścić cache przeglądarki
```

#### ❌ Meta Pixel nie rejestruje
```
1. Sprawdzić META_PIXEL_ID w .env
2. W Events Manager - powinno być "Test Events"
3. Sprawdzić czy JavaScript nie ma błędów
4. Sprawdzić czy Pixel ID jest prawidłowy
```

#### ❌ Sitemap nie indeksuje
```
1. Sprawdzić sitemap.xml czy nie ma błędów
2. Wpisać https://proestatepartners.com/sitemap.xml w Search Console
3. Czekać 24-48h
4. Sprawdzić czy strona nie ma robots.txt Disallow
```

#### ❌ Strona się nie ładuje
```
1. Sprawdzić status serwera HTTP
2. Sprawdzić błędy w server logs
3. Sprawdzić czy plik index.html istnieje
4. Sprawdzić uprawnienia plików (chmod)
```

---

## 📞 Support Contacts

- **Google Support**: https://support.google.com
- **Facebook Support**: https://www.facebook.com/help
- **Hosting Support**: [kontakt u hosta]
- **Pro Estate Partners**: +48 602 218 958

---

## ✨ Gratulacje!

🎉 Strona Pro Estate Partners jest teraz **LIVE** i **FULLY CONFIGURED**!

**Następne kroki:**
1. Monitor traffic przez tydzień
2. Optimize based on analytics
3. Add more content/features
4. Continuous improvement

---

**Ostatnia aktualizacja**: 2026-06-15  
**Version**: 1.0.0  
**Status**: Production Ready ✅