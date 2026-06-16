# Instrukcja Podłączenia Narzędzi Analitycznych
## Pro Estate Partners

Poniższa instrukcja opisuje krok po kroku, jak podłączyć wszystkie narzędzia analityczne i marketingowe do strony Pro Estate Partners.

---

## 📋 Spis Treści

1. [Google Analytics 4](#1-google-analytics-4)
2. [Google Tag Manager](#2-google-tag-manager)
3. [Meta Pixel (Facebook)](#3-meta-pixel-facebook)
4. [Google Search Console](#4-google-search-console)
5. [Google Business Profile](#5-google-business-profile-moja-firma)
6. [Dodatkowe Narzędzia](#6-dodatkowe-narzędzia)
7. [Weryfikacja Działania](#7-weryfikacja-działania)

---

## 1. Google Analytics 4

### Krok 1: Utwórz konto Google Analytics
1. Przejdź na https://analytics.google.com
2. Kliknij **"Utwórz konto"**
3. Podaj dane:
   - **Nazwa konta**: Pro Estate Partners
   - **Nazwa właściwości**: Pro Estate Partners Website
   - **Fuso czasowe**: Europe/Warsaw
   - **Waluta**: PLN

### Krok 2: Pobierz Measurement ID
1. Po utworzeniu konta, przejdź do **Admin** (ikona koła zębatego)
2. Kolumna prawa → **Dane streamu** → **Web**
3. Kliknij na stronie internetowej
4. Skopiuj **Measurement ID** (wygląda jak `G-XXXXXXXXXX`)

### Krok 3: Dodaj ID do konfiguracji
1. Otwórz plik `analytics-config.js`
2. Zastąp wartość:
```javascript
GOOGLE_ANALYTICS_ID: 'G-XXXXXXXXXX', // Wstaw tutaj swoje ID
```
3. Zapisz plik

### Krok 4: Weryfikacja
- Przejdź na http://localhost:8001
- Otwórz DevTools (F12 lub Ctrl+Shift+J)
- W konsoli powinna pojawić się wiadomość: `"Google Analytics initialized: G-XXXXXXXXXX"`
- W Google Analytics, w sekcji **Raport czasu rzeczywistego**, powinna pojawić się Twoja sesja

---

## 2. Google Tag Manager

### Krok 1: Utwórz konto GTM
1. Przejdź na https://tagmanager.google.com
2. Kliknij **"Utwórz konto"**
3. Podaj dane:
   - **Nazwa konta**: Pro Estate Partners
   - **Kraj**: Poland
   - **Nazwa kontenera**: Website
   - **Typ celu**: Web

### Krok 2: Pobierz Container ID
1. Po utworzeniu kontenera, zobaczysz **Container ID** (wygląda jak `GTM-XXXXXXXX`)
2. Skopiuj ten ID

### Krok 3: Dodaj ID do konfiguracji
1. Otwórz plik `analytics-config.js`
2. Zastąp wartość:
```javascript
GOOGLE_TAG_MANAGER_ID: 'GTM-XXXXXXXX', // Wstaw tutaj swoje ID
```
3. Zapisz plik

### Krok 4: Opublikuj kontener
1. W GTM, kliknij **"Opublikuj"** (przycisk u góry)
2. Dodaj wersję i opisz zmiany
3. Kliknij **"Publikuj"**

---

## 3. Meta Pixel (Facebook)

### Krok 1: Utwórz Pixel w Meta Business
1. Przejdź na https://www.facebook.com/business
2. Zaloguj się na swoje konto Facebook Business
3. Przejdź do **Business Manager** → **Aktywa** → **Piksele** (Data)
4. Kliknij **"Utwórz pixel"**
5. Podaj nazwę: **Pro Estate Partners Website**

### Krok 2: Pobierz Pixel ID
1. Po utworzeniu piksela, w sekcji **Instalacja piksela**, skopiuj **Pixel ID** (liczba 16 cyfr)
2. Możesz też znaleźć go w ustawieniach piksela

### Krok 3: Dodaj ID do konfiguracji
1. Otwórz plik `analytics-config.js`
2. Zastąp wartość:
```javascript
META_PIXEL_ID: 'XXXXXXXXXXXXXXXXXX', // Wstaw tutaj swoje ID (16 cyfr)
```
3. Zapisz plik

### Krok 4: Weryfikacja w Meta Events Manager
1. W Meta Business, przejdź do **Events Manager**
2. Wybierz Twój pixel
3. Przejdź na http://localhost:8001
4. Powinna pojawić się wiadomość **"Test Events Received"**

---

## 4. Google Search Console

### Krok 1: Zarejestruj stronę
1. Przejdź na https://search.google.com/search-console
2. Kliknij **"Dodaj nieruchomość"**
3. Wpisz URL: `https://proestatepartners.com`

### Krok 2: Weryfikacja własności
Masz kilka opcji:

#### Opcja A: HTML tag (najprościej)
1. Wybierz **HTML tag**
2. Skopiuj kod z atrybutem `content="..."`
3. Otwórz `index.html`
4. Dodaj tag w sekcji `<head>`:
```html
<meta name="google-site-verification" content="SKOPIOWANY_KOD_TUTAJ">
```
5. Zapisz i wdrażaj stronę
6. W Search Console kliknij **"Weryfikuj"**

#### Opcja B: Upload pliku HTML (dla hostingu)
1. Pobierz plik `google[kod].html`
2. Wgraj na główny katalog strony (proestatepartners.com/)
3. Kliknij **"Weryfikuj"** w Search Console

### Krok 3: Dodaj sitemap
1. W Search Console, przejdź do **Mapy witryn** (Sitemaps)
2. Wpisz URL: `https://proestatepartners.com/sitemap.xml`
3. Kliknij **"Prześlij"**

### Krok 4: Monitoruj wyniki
- Przejdź do **Wyniki wyszukiwania** aby zobaczyć kliki i wrażenia
- Sprawdzaj raporty co tydzień

---

## 5. Google Business Profile (Moja Firma)

### Krok 1: Utwórz/Zaloguj się do profilu
1. Przejdź na https://business.google.com
2. Kliknij **"Zarządzaj teraz"** (jeśli już masz profil)
3. Lub **"Utwórz nowy profil"** (jeśli jest to nowe)

### Krok 2: Uzupełnij dane biznesu
Dodaj:
- **Nazwa firmy**: Pro Estate Partners
- **Kategoria**: Zarządzanie Nieruchomościami
- **Adres**: Szczecin, Polska
- **Telefon**: 602 218 958
- **Strona internetowa**: https://proestatepartners.com
- **Godziny otwarcia**: Pon-Pt 8:00-18:00
- **Opis**: Profesjonalne zarządzanie najmem nieruchomości w Szczecinie i Stargardzie

### Krok 3: Dodaj zdjęcia
- Logo firmy
- Zdjęcia przykładowych nieruchomości
- Zdjęcie zespołu (opcjonalne)

### Krok 4: Włącz Google Site Kit (opcjonalne)
1. Zainstaluj wtyczkę Site Kit by Google
2. Połącz z tym profilem
3. Będziesz mieć dostęp do Analytics, Search Console itp. z jednego miejsca

---

## 6. Dodatkowe Narzędzia

### Hotjar (Session Recording)
**Cel**: Nagrywanie sesji użytkowników aby zobaczyć, jak ludzie przeglądają stronę.

1. Przejdź na https://www.hotjar.com
2. Zaloguj się lub utwórz konto
3. Skopiuj **Site ID**
4. W `analytics-config.js`:
```javascript
HOTJAR_ID: 'XXXXXXXXXX', // Wstaw Site ID
```

### Microsoft Clarity
**Cel**: Bezpłatna alternatywa dla Hotjar.

1. Przejdź na https://clarity.microsoft.com
2. Zaloguj się kontem Microsoft
3. Utwórz projekt
4. Skopiuj **Project ID**
5. W `analytics-config.js`:
```javascript
CLARITY_ID: 'XXXXXXXXXX', // Wstaw Project ID
```

### LinkedIn Insight Tag
**Cel**: Śledzenie kampanii B2B na LinkedIn.

1. Przejdź na https://business.linkedin.com
2. Otwórz **Campaign Manager** → **Conversion tracking**
3. Skopiuj **Partner ID**
4. W `analytics-config.js`:
```javascript
LINKEDIN_PARTNER_ID: 'XXXXXXXXXX', // Wstaw Partner ID
```

### TikTok Pixel
**Cel**: Jeśli prowadzisz kampanie na TikTok.

1. Przejdź na https://ads.tiktok.com
2. Otwórz **Event Manager**
3. Utwórz pixel
4. Skopiuj **Pixel ID**
5. W `analytics-config.js`:
```javascript
TIKTOK_PIXEL_ID: 'XXXXXXXXXX', // Wstaw Pixel ID
```

---

## 7. Weryfikacja Działania

### Krok 1: Włącz Debug Mode
W `analytics-config.js`:
```javascript
DEBUG_MODE: true, // Zmień na true
```

### Krok 2: Testuj w DevTools
1. Otwórz http://localhost:8001
2. Otwórz DevTools (F12)
3. Przejdź do **Console**
4. Powinieneś zobaczyć wiadomości:
   - `"Google Analytics initialized: G-XXXXXXXXXX"`
   - `"Meta Pixel initialized: XXXXXXXXXXXXXXXXXX"`
   - `"Google Tag Manager initialized: GTM-XXXXXXXX"`
   - itd.

### Krok 3: Testuj zdarzenia
1. Kliknij przycisk **"Zadzwoń: 602 218 958"**
2. W konsoli powinna pojawić się: `"Phone button clicked: tel:+48602218958"`
3. W Google Analytics, przejdź do **Raport czasu rzeczywistego** i sprawdź czy pojawia się nowe zdarzenie `phone_call`

### Krok 4: Usuń Debug Mode
Po weryfikacji:
```javascript
DEBUG_MODE: false, // Zmień z powrotem na false
```

---

## 📊 Checklist Wdrożenia

Zaznacz co zostało zrobione:

- [ ] Google Analytics 4 - ID dodane i działające
- [ ] Google Tag Manager - ID dodane i opublikowane
- [ ] Meta Pixel - ID dodane i zweryfikowane
- [ ] Google Search Console - strona zarejestrowana i sitemap dodany
- [ ] Google Business Profile - profil uzupełniony
- [ ] Sitemap.xml - wdrożony na serwerze
- [ ] Robots.txt - wdrożony na serwerze
- [ ] Analytics-config.js - wszystkie ID dodane
- [ ] Debug mode - wyłączony
- [ ] Testy - zdarzenia śledzone poprawnie

---

## 🚀 Wdrożenie na Produkcję

Gdy wszystko jest gotowe:

1. **Aktualizuj analytics-config.js**
   - Zmień `ENVIRONMENT: 'production'`
   - Upewnij się, że `DEBUG_MODE: false`

2. **Wdrażanie**
   - Wgraj wszystkie pliki na serwer (včetně analytics-config.js i sitemap.xml)
   - Upewnij się, że sitemap.xml jest dostępny na `https://proestatepartners.com/sitemap.xml`
   - Upewnij się, że robots.txt jest dostępny na `https://proestatepartners.com/robots.txt`

3. **Finalna weryfikacja**
   - Czekaj 24-48 godzin aż Google zaindeksuje stronę
   - W Search Console sprawdzaj **Abdeckung** (Pokrycie)
   - W Analytics sprawdzaj **Raport czasu rzeczywistego**

---

## 📞 Wsparcie i Pytania

Jeśli masz pytania dotyczące:
- **Google Analytics**: https://support.google.com/analytics
- **Meta Pixel**: https://www.facebook.com/business/help
- **Google Search Console**: https://support.google.com/webmasters
- **Pro Estate Partners**: 602 218 958

---

**Powodzenia w implementacji!** 🎉