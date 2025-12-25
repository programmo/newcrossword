#!/bin/bash

# ============================================
# FREESPACE - Mac Disk Cleanup Script
# ============================================
# Autore: Antigravity AI
# Data: 2025-12-25
# ============================================

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo ""
echo -e "${PURPLE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║              🧹 FREESPACE - Mac Disk Cleaner 🧹              ║${NC}"
echo -e "${PURPLE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Funzione per convertire bytes in formato leggibile
human_readable() {
    local bytes=$1
    if [ $bytes -ge 1073741824 ]; then
        echo "$(echo "scale=2; $bytes/1073741824" | bc)GB"
    elif [ $bytes -ge 1048576 ]; then
        echo "$(echo "scale=2; $bytes/1048576" | bc)MB"
    elif [ $bytes -ge 1024 ]; then
        echo "$(echo "scale=2; $bytes/1024" | bc)KB"
    else
        echo "${bytes}B"
    fi
}

# Ottieni spazio libero iniziale
get_free_space() {
    df -k / | tail -1 | awk '{print $4}'
}

INITIAL_FREE=$(get_free_space)
INITIAL_FREE_HR=$(df -h / | tail -1 | awk '{print $4}')

echo -e "${CYAN}📊 Spazio libero iniziale: ${YELLOW}${INITIAL_FREE_HR}${NC}"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Contatore spazio liberato
TOTAL_FREED=0

# ============================================
# 1. SVUOTA CESTINO
# ============================================
echo -e "\n${YELLOW}🗑️  [1/8] Svuotamento Cestino...${NC}"
TRASH_SIZE=$(du -sk ~/.Trash 2>/dev/null | cut -f1)
if [ -n "$TRASH_SIZE" ] && [ "$TRASH_SIZE" -gt 0 ]; then
    rm -rf ~/.Trash/* 2>/dev/null
    TOTAL_FREED=$((TOTAL_FREED + TRASH_SIZE))
    echo -e "   ${GREEN}✓ Liberati: $(human_readable $((TRASH_SIZE * 1024)))${NC}"
else
    echo -e "   ${CYAN}○ Cestino già vuoto${NC}"
fi

# ============================================
# 2. CACHE UTENTE
# ============================================
echo -e "\n${YELLOW}📦 [2/8] Pulizia Cache Utente...${NC}"
CACHE_SIZE=$(du -sk ~/Library/Caches 2>/dev/null | cut -f1)
if [ -n "$CACHE_SIZE" ] && [ "$CACHE_SIZE" -gt 0 ]; then
    rm -rf ~/Library/Caches/* 2>/dev/null
    TOTAL_FREED=$((TOTAL_FREED + CACHE_SIZE))
    echo -e "   ${GREEN}✓ Liberati: $(human_readable $((CACHE_SIZE * 1024)))${NC}"
else
    echo -e "   ${CYAN}○ Cache già pulita${NC}"
fi

# ============================================
# 3. LOG DI SISTEMA UTENTE
# ============================================
echo -e "\n${YELLOW}📝 [3/8] Pulizia Log Utente...${NC}"
LOG_SIZE=$(du -sk ~/Library/Logs 2>/dev/null | cut -f1)
if [ -n "$LOG_SIZE" ] && [ "$LOG_SIZE" -gt 0 ]; then
    rm -rf ~/Library/Logs/* 2>/dev/null
    TOTAL_FREED=$((TOTAL_FREED + LOG_SIZE))
    echo -e "   ${GREEN}✓ Liberati: $(human_readable $((LOG_SIZE * 1024)))${NC}"
else
    echo -e "   ${CYAN}○ Nessun log da pulire${NC}"
fi

# ============================================
# 4. XCODE DERIVED DATA
# ============================================
echo -e "\n${YELLOW}🔨 [4/8] Pulizia Xcode DerivedData...${NC}"
if [ -d ~/Library/Developer/Xcode/DerivedData ]; then
    XCODE_DD_SIZE=$(du -sk ~/Library/Developer/Xcode/DerivedData 2>/dev/null | cut -f1)
    if [ -n "$XCODE_DD_SIZE" ] && [ "$XCODE_DD_SIZE" -gt 0 ]; then
        rm -rf ~/Library/Developer/Xcode/DerivedData/* 2>/dev/null
        TOTAL_FREED=$((TOTAL_FREED + XCODE_DD_SIZE))
        echo -e "   ${GREEN}✓ Liberati: $(human_readable $((XCODE_DD_SIZE * 1024)))${NC}"
    else
        echo -e "   ${CYAN}○ DerivedData già pulito${NC}"
    fi
else
    echo -e "   ${CYAN}○ Xcode non installato${NC}"
fi

# ============================================
# 5. XCODE ARCHIVES
# ============================================
echo -e "\n${YELLOW}📦 [5/8] Pulizia Xcode Archives...${NC}"
if [ -d ~/Library/Developer/Xcode/Archives ]; then
    XCODE_AR_SIZE=$(du -sk ~/Library/Developer/Xcode/Archives 2>/dev/null | cut -f1)
    if [ -n "$XCODE_AR_SIZE" ] && [ "$XCODE_AR_SIZE" -gt 0 ]; then
        rm -rf ~/Library/Developer/Xcode/Archives/* 2>/dev/null
        TOTAL_FREED=$((TOTAL_FREED + XCODE_AR_SIZE))
        echo -e "   ${GREEN}✓ Liberati: $(human_readable $((XCODE_AR_SIZE * 1024)))${NC}"
    else
        echo -e "   ${CYAN}○ Archives già pulito${NC}"
    fi
else
    echo -e "   ${CYAN}○ Nessun archivio Xcode${NC}"
fi

# ============================================
# 6. iOS SIMULATORS NON DISPONIBILI
# ============================================
echo -e "\n${YELLOW}📱 [6/8] Rimozione Simulatori iOS non disponibili...${NC}"
if command -v xcrun &> /dev/null; then
    BEFORE_SIM=$(du -sk ~/Library/Developer/CoreSimulator 2>/dev/null | cut -f1)
    xcrun simctl delete unavailable 2>/dev/null
    AFTER_SIM=$(du -sk ~/Library/Developer/CoreSimulator 2>/dev/null | cut -f1)
    SIM_FREED=$((BEFORE_SIM - AFTER_SIM))
    if [ "$SIM_FREED" -gt 0 ]; then
        TOTAL_FREED=$((TOTAL_FREED + SIM_FREED))
        echo -e "   ${GREEN}✓ Liberati: $(human_readable $((SIM_FREED * 1024)))${NC}"
    else
        echo -e "   ${CYAN}○ Nessun simulatore da rimuovere${NC}"
    fi
else
    echo -e "   ${CYAN}○ Xcode command line tools non installati${NC}"
fi

# ============================================
# 7. NPM CACHE
# ============================================
echo -e "\n${YELLOW}📦 [7/8] Pulizia NPM Cache...${NC}"
if command -v npm &> /dev/null; then
    NPM_CACHE=$(npm cache ls 2>/dev/null | wc -l)
    npm cache clean --force 2>/dev/null
    echo -e "   ${GREEN}✓ Cache NPM pulita${NC}"
else
    echo -e "   ${CYAN}○ NPM non installato${NC}"
fi

# ============================================
# 8. DOCKER (solo se installato)
# ============================================
echo -e "\n${YELLOW}🐳 [8/8] Pulizia Docker...${NC}"
if command -v docker &> /dev/null; then
    BEFORE_DOCKER=$(docker system df 2>/dev/null | tail -1 | awk '{print $4}' | sed 's/[^0-9.]//g')
    docker system prune -af 2>/dev/null
    echo -e "   ${GREEN}✓ Docker pulito${NC}"
else
    echo -e "   ${CYAN}○ Docker non installato${NC}"
fi

# ============================================
# RIEPILOGO FINALE
# ============================================
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

FINAL_FREE=$(get_free_space)
FINAL_FREE_HR=$(df -h / | tail -1 | awk '{print $4}')
ACTUAL_FREED=$((FINAL_FREE - INITIAL_FREE))

echo -e "${PURPLE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║                    📊 RIEPILOGO FINALE                     ║${NC}"
echo -e "${PURPLE}╠════════════════════════════════════════════════════════════╣${NC}"
echo -e "${PURPLE}║${NC}  Spazio libero prima:  ${YELLOW}${INITIAL_FREE_HR}${NC}"
echo -e "${PURPLE}║${NC}  Spazio libero dopo:   ${GREEN}${FINAL_FREE_HR}${NC}"
echo -e "${PURPLE}║${NC}  "
echo -e "${PURPLE}║${NC}  ${GREEN}🎉 SPAZIO GUADAGNATO: $(human_readable $((ACTUAL_FREED * 1024)))${NC}"
echo -e "${PURPLE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Mostra suggerimenti se c'è ancora poco spazio
if [ $FINAL_FREE -lt 5242880 ]; then  # Meno di 5GB
    echo -e "${YELLOW}⚠️  Suggerimenti per liberare altro spazio:${NC}"
    echo ""
    echo -e "   1. ${CYAN}Elimina applicazioni non usate${NC}"
    echo -e "   2. ${CYAN}Rimuovi download vecchi: ~/Downloads${NC}"
    echo -e "   3. ${CYAN}Controlla Steam/OpenEmu per giochi non usati${NC}"
    echo -e "   4. ${CYAN}Usa 'Informazioni su questo Mac > Spazio' per analisi${NC}"
    echo ""
fi

echo -e "${GREEN}✅ Pulizia completata!${NC}"
echo ""
