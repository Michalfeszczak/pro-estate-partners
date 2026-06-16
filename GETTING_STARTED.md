# 🚀 GETTING STARTED - PRO ESTATE PARTNERS
## Praktyczny Przewodnik dla Nowych Członków Zespołu

---

## 📖 Welcome! 👋

Witaj w projekcie **Pro Estate Partners**!

Ten dokument wyjaśnia:
- 🗂️ Strukturę projektu
- ⚡ Jak uruchomić lokalnie
- 🔧 Jak robić zmiany
- 🎯 Workflow zespołu
- 📤 Jak deployować

**Szacunkowy czas przeczytania**: 15 minut

---

## ⚡ Quick Start (5 minut)

### 1️⃣ Pobierz Projekt

```bash
# Klonuj repozytorium
git clone https://github.com/username/proestatepartners.git
cd proestatepartners
```

### 2️⃣ Uruchom Lokalnie

```bash
# Metoda 1: Python (polecane)
python3 -m http.server 8001

# Metoda 2: Node.js
npx http-server -p 8001
```

### 3️⃣ Otwórz w Przeglądarce

```
http://localhost:8001
```

**✅ Gotowe!** Strona powinna się ładować.

---

## 🗂️ Struktura Projektu

```
proestatepartners/
│
├─ 📄 HTML FILES
│  ├─ index.html                    # Strona główna
│  ├─ polityka-prywatnosci.html    # Polityka RODO
│  ├─ regulamin.html               # Regulamin usług
│  └─ cookies.html                 # Polityka cookies
│
├─ 🎨 STYLING & SCRIPTS
│  ├─ styles.css                   # Stylowanie (responsive)
│  └─ scripts.js                   # Interaktywność
│
├─ ⚙️ CONFIGURATION
│  ├─ config.js                    # Centralna konfiguracja
│  ├─ analytics-config.js          # Analytics setup
│  ├─ .env.example                 # Template zmiennych
│  └─ .env                         # Zmienne (NIGDY nie commituj!)
│
├─ 🔍 SEO
│  ├─ sitemap.xml                  # Mapa strony
│  ├─ robots.txt                   # Instrukcje botów
│  └─ check-sitemap.sh             # Walidacja sitemap
│
├─ 📚 DOCUMENTATION
│  ├─ README.md                    # Overview projektu
│  ├─ GETTING_STARTED.md          # Ten plik
│  ├─ SETUP_ANALYTICS.md          # Instrukcja Analytics
│  ├─ SITEMAP_GUIDE.md            # Instrukcja Sitemap
│  └─ DEPLOYMENT_CHECKLIST.md     # Wdrażanie
│
└─ 🔧 GIT
   ├─ .git/                        # Git historia (nie edituj!)
   └─ .gitignore                   # Co nie commitować

```

### Które Pliki Edytować?

**✅ EDYTUJ ŚMIAŁO:**
- `index.html` - treść strony
- `styles.css` - wygląd
- `scripts.js` - logika
- Pliki HTML (polityka, regulamin, cookies)

**⚠️ BĄDŹ OSTROŻNY:**
- `.env` - zmienne produkcji (NIGDY nie commituj!)
- `.gitignore` - kontrola Git
- `robots.txt` - SEO
- `sitemap.xml` - SEO

**❌ NIE EDITUJ:**
- `.git/` - Git internals
- `node_modules/` - dependencies

---

## ✏️ Edytowanie Plików

### Zmiana HTML

```html
<!-- Zmień tekst w index.html -->

<!-- ❌ Nie rób tak (hardcoded data) -->
<p>602 218 958</p>

<!-- ✅ Rób tak (ze zmiennych) -->
<p><a href="tel:+48602218958">602 218 958</a></p>
```

### Zmiana CSS

```css
/* W styles.css - zmienne CSS */
:root {
  --color-primary: #527267;     /* Główny kolor */
  --color-primary-hover: #405D54; /* Hover state */
  --color-text: #25302D;        /* Tekst */
  --color-bg: #F7F8F5;          /* Tło */
}

/* Użycie zmiennych */
a:hover {
  color: var(--color-primary-hover);
}
```

### Zmiana JavaScript

```javascript
// W scripts.js - dodaj nowe funkcje
function mojaNowaFunkcja() {
  console.log('Hello World');
}

// Inicjalizuj na load
document.addEventListener('DOMContentLoaded', () => {
  mojaNowaFunkcja();
});
```

---

## 🔧 Configuration

### Setup Lokalny (Development)

```bash
# Skopiuj template zmiennych
cp .env.example .env

# Edytuj .env (otwórz w edytorze)
nano .env

# Możesz zostawić puste (development):
GOOGLE_ANALYTICS_ID=
META_PIXEL_ID=
DEBUG_MODE=true
```

### Czytanie Konfiguracji w Kodzie

```javascript
// config.js automatycznie ładuje zmienne

// Pobranie zmiennej
const gaId = Config.GOOGLE_ANALYTICS_ID;

// Sprawdzenie czy jest skonfigurowana
if (Config.isConfigured('GOOGLE_ANALYTICS_ID')) {
  console.log('GA is configured!');
}

// Sprawdzenie środowiska
if (Config.isDevelopment()) {
  console.log('Running in development mode');
}

// Logowanie konfiguracji (tylko w debug)
Config.logConfig('GOOGLE');
```

---

## 🚀 Workflow Zespołu

### Dla Developerów

#### 1️⃣ Rozpoczęcie Pracy

```bash
# 1. Zaktualizuj lokalny repo
git pull origin main

# 2. Stwórz nowy branch
git checkout -b feature/nazwa-funkcji

# 3. Uruchom dev server
python3 -m http.server 8001

# 4. Otwórz przeglądarkę
# http://localhost:8001
```

#### 2️⃣ Robienie Zmian

```bash
# Edytuj pliki w swoim edytorze
# Zmiana w index.html, styles.css, itp.

# Testuj w przeglądarce (http://localhost:8001)
# Sprawdzaj DevTools (F12) na błędy
```

#### 3️⃣ Commit Zmian

```bash
# Sprawdzenie zmian
git status

# Upewnij się że .env nie jest staged
git diff .env  # Nie powinno być zmian

# Dodaj pliki
git add index.html styles.css scripts.js

# Commit z opisem
git commit -m "feat: Add new feature description"

# Format commitów:
# feat: nowa funkcja
# fix: poprawka błędu
# docs: dokumentacja
# style: formatowanie
# refactor: refaktoryzacja
```

#### 4️⃣ Push na GitHub

```bash
# Wyślij na GitHub
git push origin feature/nazwa-funkcji

# Stwórz Pull Request na GitHub
# Opisz zmiany, czekaj na review
```

### Dla Content Managera

#### Aktualizacja Treści

```html
<!-- Edytuj tekst bezpośrednio w HTML -->

<!-- Strona główna: index.html -->
<h1>Pro Estate Partners</h1>
<p>Twoim tekstem...</p>

<!-- Polityka: polityka-prywatnosci.html -->
<h2>Polityka Prywatności</h2>
<p>Twój tekst...</p>
```

#### Zmiana Kolorów

```css
/* W styles.css, na górzę: */
:root {
  --color-primary: #527267;  /* Zmień tutaj */
}
```

#### Zmiana Numeru Telefonu

```bash
# Szukaj wszędzie w projekcie
grep -r "602218958" .

# Zmień w:
# 1. index.html
# 2. polityka-prywatnosci.html
# 3. regulamin.html
# 4. cookies.html
# 5. config.js (PHONE_NUMBER)
# 6. analytics-config.js (PHONE_NUMBER)
```

---

## 🧪 Testing

### Testowanie Lokalnie

```bash
# 1. Otwórz http://localhost:8001
# 2. Sprawdzaj w różnych przeglądarkach:
#    - Chrome
#    - Firefox
#    - Safari
#    - Edge

# 3. Testuj na mobile (DevTools → Toggle device)
#    - iPhone
#    - Android
#    - Tablet

# 4. Sprawdzaj konsolę (F12)
#    Nie powinno być RED errors
```

### Walidacja Sitemap

```bash
# Uruchom skrypt walidacji
./check-sitemap.sh

# Powinieneś zobaczyć:
# ✓ XML jest poprawny
# ✓ Liczba URL-i w normie
# ✓ Wszystkie priority są prawidłowe
```

### Performance Check

```bash
# 1. DevTools → Lighthouse
# 2. Uruchom audit
# 3. Szukaj problemów w:
#    - Performance (powinno być > 90)
#    - Accessibility (powinno być > 90)
#    - Best Practices (powinno być > 90)
#    - SEO (powinno być > 90)
```

---

## 🐛 Debugowanie

### Gdy Coś Nie Działa

#### Krok 1: Sprawdzenie Konsoli

```javascript
// Otwórz DevTools (F12)
// Console tab

// Powinni być logi:
// 🚀 Pro Estate Partners - Configuration Loaded
// 📋 Config: GOOGLE
// ✓ Sitemap jest referencjonowany w robots.txt
```

#### Krok 2: Network Tab

```
// DevTools → Network tab
// Każdy plik powinien mieć status 200 (OK)

// Jeśli jest 404:
// - Sprawdzić scieżkę pliku
// - Sprawdzić czy plik istnieje
// - Sprawdzić czy nazwa jest prawidłowa (case-sensitive!)
```

#### Krok 3: Elements Tab

```
// DevTools → Elements tab
// Sprawdzać struktura HTML

// Szukaj błędów:
// - Zamknięte tagi </ >
// - Atrybuty w cudzysłowach
// - Prawidłowa zagnieżdżenie
```

### Częste Problemy

| Problem | Rozwiązanie |
|---------|------------|
| Strona się nie ładuje | Sprawdzić czy server HTTP działa |
| CSS nie działa | Sprawdzić ścieżkę do styles.css |
| JavaScript błędy | Sprawdzić Console (F12) na błędy |
| Sitemap nie działa | Uruchomić `./check-sitemap.sh` |
| Telefon nie dzwoni | Sprawdzić format `tel:+48...` |

---

## 📤 Wdrażanie (Dla Admin)

### Gdy Wszystko Jest Gotowe

```bash
# 1. Sprawdzenie czy główny branch jest czysty
git status

# 2. Ostatni commit
git log --oneline -5

# 3. Wdrażanie na produkcję
# (Instrukcje w DEPLOYMENT_CHECKLIST.md)
```

---

## 📚 Dodatkowe Zasoby

### Dokumenty Projektu

- [README.md](README.md) - Overview
- [SETUP_ANALYTICS.md](SETUP_ANALYTICS.md) - Google Analytics setup
- [SITEMAP_GUIDE.md](SITEMAP_GUIDE.md) - SEO Sitemap
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Wdrażanie

### Zewnętrzne Zasoby

- [MDN Web Docs](https://developer.mozilla.org) - HTML/CSS/JS
- [Google Developers](https://developers.google.com) - Google Services
- [Can I Use](https://caniuse.com) - Browser Support
- [CSS Tricks](https://css-tricks.com) - CSS Tutorials

---

## 💬 Pomoc & Support

### Pytania?

1. **Sprawdzić dokumentację** - czyt powyżej
2. **Google** - większość pytań jest na Stack Overflow
3. **Zespół** - zapytaj kolegów z zespołu
4. **Admin** - w ostateczności skontaktuj się z adminem

### Raportowanie Błędów

```bash
# Jeśli znaleźłeś bug:
# 1. Stwórz Issue na GitHub
# 2. Opisz co się stało
# 3. Jak to zreprodukować
# 4. Co się powinno stać
# 5. Dołącz screenshot (F12)
```

---

## ✅ Checklist Dla Nowych

```
□ Pobrałem projekt (git clone)
□ Czytam dokumentację
□ Uruchomiłem lokalnie (python3 -m http.server)
□ Testowałem w przeglądarce
□ Sprawdziłem DevTools na błędy
□ Zapoznałem się ze strukturą projektu
□ Wiem gdzie editować HTML/CSS/JS
□ Wiem jak robić git commits
□ Czytam README.md co tydzień
□ Pytam gdy czego nie wiem 👋
```

---

## 🎓 Nauka & Development

### Progresja Umiejętności

**Level 1: Podstawy (Tydzień 1)**
- [ ] Potrafi uruchomić projekt lokalnie
- [ ] Potrafi edytować HTML
- [ ] Potrafi robić git commits

**Level 2: Pośredni (Tydzień 2-4)**
- [ ] Potrafi edytować CSS
- [ ] Potrafi dodać nową funkcję JavaScript
- [ ] Potrafi testować zmiany

**Level 3: Zaawansowany (Miesiąc 1)**
- [ ] Potrafi deployować na produkcję
- [ ] Potrafi konfigurować API keys
- [ ] Potrafi monitorować Performance

**Level 4: Expert (Miesiąc 2+)**
- [ ] Potrafi architektować nowe funkcje
- [ ] Potrafi optymalizować wydajność
- [ ] Potrafi mentorować nowych członków

---

## 🎉 Ready?

Gratulacje! Jesteś gotowy do pracy z **Pro Estate Partners**! 

**Następne kroki:**
1. ✅ Przeczytaj ten dokument
2. ✅ Uruchom projekt lokalnie
3. ✅ Zrób pierwszą zmianę (commit)
4. ✅ Zapytaj zespół o poradę
5. ✅ Zacznij kodować! 🚀

---

**Ostatnia aktualizacja**: 2026-06-15  
**Wersja**: 1.0.0  
**Status**: Ready for Development ✅

Powodzenia! 🚀