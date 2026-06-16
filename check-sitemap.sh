#!/bin/bash

# ============================================
# SKRYPT DO SPRAWDZENIA SITEMAP
# Pro Estate Partners
# ============================================
# Użycie: ./check-sitemap.sh
# ============================================

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         SPRAWDZENIE SITEMAP PRO ESTATE PARTNERS                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Kolory dla outputu
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================
# 1. SPRAWDZENIE PLIKU LOKALNIE
# ============================================
echo -e "${BLUE}1. Sprawdzanie pliku sitemap.xml lokalnie...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ ! -f "sitemap.xml" ]; then
    echo -e "${RED}✗ Plik sitemap.xml nie znaleziony${NC}"
    exit 1
else
    echo -e "${GREEN}✓ Plik sitemap.xml znaleziony${NC}"
    SIZE=$(du -h sitemap.xml | cut -f1)
    echo "  Rozmiar: $SIZE"
fi

# ============================================
# 2. WALIDACJA XML
# ============================================
echo ""
echo -e "${BLUE}2. Walidacja poprawności XML...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if command -v xmllint &> /dev/null; then
    if xmllint sitemap.xml --noout 2>/dev/null; then
        echo -e "${GREEN}✓ XML jest poprawny${NC}"
    else
        echo -e "${RED}✗ XML zawiera błędy${NC}"
        xmllint sitemap.xml --noout
        exit 1
    fi
else
    echo -e "${YELLOW}⚠ xmllint nie jest zainstalowany${NC}"
    echo "  Instalacja: brew install libxml2"
fi

# ============================================
# 3. LICZBA URL-I
# ============================================
echo ""
echo -e "${BLUE}3. Liczba URL-i w sitemap...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

URL_COUNT=$(grep -c "^[[:space:]]*<loc>" sitemap.xml)
echo "Liczba URL-i: $URL_COUNT"

if [ "$URL_COUNT" -gt 50000 ]; then
    echo -e "${RED}✗ Za dużo URL-i (limit: 50000)${NC}"
    exit 1
elif [ "$URL_COUNT" -gt 100 ]; then
    echo -e "${YELLOW}⚠ Wiele URL-i ($URL_COUNT)${NC}"
else
    echo -e "${GREEN}✓ Liczba URL-i w normie${NC}"
fi

# ============================================
# 4. SPRAWDZENIE PROTOKOŁU HTTPS
# ============================================
echo ""
echo -e "${BLUE}4. Sprawdzenie protokołu URL...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

HTTP_COUNT=$(grep -c "^[[:space:]]*<loc>http://" sitemap.xml || true)
HTTPS_COUNT=$(grep -c "^[[:space:]]*<loc>https://" sitemap.xml || true)

if [ "$HTTP_COUNT" -gt 0 ]; then
    echo -e "${RED}✗ Znalezione URL-i z http:// (powinny być https://)${NC}"
    echo "  HTTP URL-i: $HTTP_COUNT"
else
    echo -e "${GREEN}✓ Wszystkie URL-y używają https://${NC}"
    echo "  HTTPS URL-y: $HTTPS_COUNT"
fi

# ============================================
# 5. SPRAWDZENIE DUPLIKATÓW
# ============================================
echo ""
echo -e "${BLUE}5. Sprawdzenie duplikatów URL...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

DUPLICATES=$(grep "^[[:space:]]*<loc>" sitemap.xml | sort | uniq -d)

if [ -z "$DUPLICATES" ]; then
    echo -e "${GREEN}✓ Brak duplikatów URL${NC}"
else
    echo -e "${RED}✗ Znalezione duplikaty:${NC}"
    echo "$DUPLICATES"
fi

# ============================================
# 6. OSTATNIA MODYFIKACJA (lastmod)
# ============================================
echo ""
echo -e "${BLUE}6. Sprawdzenie dat lastmod...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

LASTMOD_COUNT=$(grep -c "^[[:space:]]*<lastmod>" sitemap.xml)
echo "URL-y z datą lastmod: $LASTMOD_COUNT / $URL_COUNT"

if [ "$LASTMOD_COUNT" -eq "$URL_COUNT" ]; then
    echo -e "${GREEN}✓ Wszystkie URL-y mają datę lastmod${NC}"
else
    echo -e "${YELLOW}⚠ Nie wszystkie URL-y mają lastmod${NC}"
fi

# ============================================
# 7. PRIORITY RANGE
# ============================================
echo ""
echo -e "${BLUE}7. Sprawdzenie wartości priority...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Wyciągnij wszystkie priority
PRIORITIES=$(grep -o "<priority>[^<]*</priority>" sitemap.xml | sed 's/<[^>]*>//g')

INVALID_PRIORITY=0
while read -r p; do
    if ! awk -v x=$p 'BEGIN {exit !(x>=0 && x<=1)}'; then
        INVALID_PRIORITY=$((INVALID_PRIORITY + 1))
    fi
done <<< "$PRIORITIES"

if [ "$INVALID_PRIORITY" -eq 0 ]; then
    echo -e "${GREEN}✓ Wszystkie priority są w zakresie 0.0-1.0${NC}"
else
    echo -e "${RED}✗ Błędne wartości priority (znalezione: $INVALID_PRIORITY)${NC}"
fi

# ============================================
# 8. CHANGEF FREQ SPRAWDZENIE
# ============================================
echo ""
echo -e "${BLUE}8. Sprawdzenie wartości changefreq...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

VALID_FREQ=("always" "hourly" "daily" "weekly" "monthly" "yearly" "never")
CHANGEFREQ=$(grep -o "<changefreq>[^<]*</changefreq>" sitemap.xml | sed 's/<[^>]*>//g' | sort -u)

INVALID_FREQ=0
while read -r freq; do
    if [ -n "$freq" ]; then
        FOUND=0
        for valid in "${VALID_FREQ[@]}"; do
            if [ "$freq" = "$valid" ]; then
                FOUND=1
                break
            fi
        done
        if [ "$FOUND" -eq 0 ]; then
            INVALID_FREQ=$((INVALID_FREQ + 1))
            echo -e "${RED}✗ Nieprawidłowa changefreq: $freq${NC}"
        fi
    fi
done <<< "$CHANGEFREQ"

if [ "$INVALID_FREQ" -eq 0 ]; then
    echo -e "${GREEN}✓ Wszystkie changefreq są prawidłowe${NC}"
    echo "  Używane wartości:"
    echo "$CHANGEFREQ" | sed 's/^/    - /'
fi

# ============================================
# 9. ROBOTS.TXT SPRAWDZENIE
# ============================================
echo ""
echo -e "${BLUE}9. Sprawdzenie robots.txt...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ ! -f "robots.txt" ]; then
    echo -e "${YELLOW}⚠ robots.txt nie znaleziony${NC}"
else
    if grep -q "sitemap.xml" robots.txt; then
        echo -e "${GREEN}✓ Sitemap jest referencjonowany w robots.txt${NC}"
        grep "Sitemap:" robots.txt
    else
        echo -e "${YELLOW}⚠ Sitemap nie jest wymieniony w robots.txt${NC}"
        echo "  Dodaj linię: Sitemap: https://proestatepartners.com/sitemap.xml"
    fi
fi

# ============================================
# 10. TEST ONLINE (jeśli dostępne)
# ============================================
echo ""
echo -e "${BLUE}10. Test dostępności sitemap online...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Sprawdzenie online (jeśli localhost)
if grep -q "localhost" sitemap.xml 2>/dev/null; then
    echo -e "${YELLOW}⚠ Sitemap zawiera localhost (test lokalny)${NC}"
elif grep -q "proestatepartners.com" sitemap.xml; then
    echo -e "${GREEN}✓ Sitemap zawiera prawidłowe domeny${NC}"
fi

# ============================================
# PODSUMOWANIE
# ============================================
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                   PODSUMOWANIE SITEMAP                          ║"
echo "╚════════════════════════════════════════════════════════════════╝"

echo ""
echo -e "${GREEN}✓ Sitemap jest prawidłowy i gotowy do użytku!${NC}"
echo ""
echo "Następne kroki:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Wdrażanie na produkcję:"
echo "   - Wgraj sitemap.xml na serwer"
echo "   - URL powinien być: https://proestatepartners.com/sitemap.xml"
echo ""
echo "2. Rejestracja w Google Search Console:"
echo "   - Przejdź na: https://search.google.com/search-console"
echo "   - Mapy witryn (Sitemaps) → Dodaj nową mapę"
echo "   - Wpisz: https://proestatepartners.com/sitemap.xml"
echo ""
echo "3. Monitorowanie:"
echo "   - Czekaj 24-48 godzin na indeksowanie"
echo "   - Sprawdzaj Status pokrycia w GSC"
echo ""
echo "Więcej informacji: SITEMAP_GUIDE.md"
echo ""
