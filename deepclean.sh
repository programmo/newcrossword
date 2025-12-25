#!/bin/bash

# ============================================
# DEEP CLEAN - Pulizia profonda Mac
# ============================================
# Esegui con: ./deepclean.sh
# ============================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${RED}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${RED}║         🔥 DEEP CLEAN - Pulizia Profonda Mac 🔥            ║${NC}"
echo -e "${RED}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Spazio iniziale
INITIAL=$(df -h / | tail -1 | awk '{print $4}')
echo -e "${CYAN}📊 Spazio libero iniziale: ${YELLOW}${INITIAL}${NC}"
echo ""

# ============================================
# 1. DOCKER DATI (21GB)
# ============================================
echo -e "${YELLOW}🐳 [1/7] Eliminazione dati Docker (21GB)...${NC}"
if [ -d ~/Library/Containers/com.docker.docker ]; then
    rm -rf ~/Library/Containers/com.docker.docker
    echo -e "   ${GREEN}✓ Docker dati eliminati${NC}"
else
    echo -e "   ${CYAN}○ Non trovato${NC}"
fi

# ============================================
# 2. ANDROID SDK (12GB)
# ============================================
echo -e "${YELLOW}🤖 [2/7] Eliminazione Android SDK (12GB)...${NC}"
if [ -d ~/Library/Android ]; then
    rm -rf ~/Library/Android
    echo -e "   ${GREEN}✓ Android SDK eliminato${NC}"
else
    echo -e "   ${CYAN}○ Non trovato${NC}"
fi

# ============================================
# 3. UNITY CACHE (1.4GB)
# ============================================
echo -e "${YELLOW}🎮 [3/7] Eliminazione Unity cache (1.4GB)...${NC}"
if [ -d ~/Library/Unity ]; then
    rm -rf ~/Library/Unity
    echo -e "   ${GREEN}✓ Unity cache eliminata${NC}"
else
    echo -e "   ${CYAN}○ Non trovato${NC}"
fi

# ============================================
# 4. PROGETTI VECCHI
# ============================================
echo -e "${YELLOW}📁 [4/7] Eliminazione progetti vecchi...${NC}"

# bestcropper (1GB)
if [ -d ~/bestcropper ]; then
    rm -rf ~/bestcropper
    echo -e "   ${GREEN}✓ bestcropper eliminato (1GB)${NC}"
fi

# headbreaker-react-sample (323MB)
if [ -d ~/headbreaker-react-sample ]; then
    rm -rf ~/headbreaker-react-sample
    echo -e "   ${GREEN}✓ headbreaker-react-sample eliminato${NC}"
fi

# flutter-push-notification (167MB)
if [ -d ~/flutter-push-notification ]; then
    rm -rf ~/flutter-push-notification
    echo -e "   ${GREEN}✓ flutter-push-notification eliminato${NC}"
fi

# AndroidStudioProjects (36MB)
if [ -d ~/AndroidStudioProjects ]; then
    rm -rf ~/AndroidStudioProjects
    echo -e "   ${GREEN}✓ AndroidStudioProjects eliminato${NC}"
fi

# ============================================
# 5. GOOGLE CHROME CACHE (2.7GB)
# ============================================
echo -e "${YELLOW}🌐 [5/7] Pulizia cache Google Chrome...${NC}"
if [ -d ~/Library/Application\ Support/Google/Chrome ]; then
    rm -rf ~/Library/Application\ Support/Google/Chrome/Default/Cache/*
    rm -rf ~/Library/Application\ Support/Google/Chrome/Default/Code\ Cache/*
    echo -e "   ${GREEN}✓ Cache Chrome pulita${NC}"
else
    echo -e "   ${CYAN}○ Chrome non trovato${NC}"
fi

# ============================================
# 6. ALTRI EMULATORI
# ============================================
echo -e "${YELLOW}🎮 [6/7] Eliminazione emulatori e dati...${NC}"

# RetroArch
if [ -d ~/Library/Application\ Support/RetroArch ]; then
    rm -rf ~/Library/Application\ Support/RetroArch
    echo -e "   ${GREEN}✓ RetroArch dati eliminati${NC}"
fi

# AetherSX2
if [ -d ~/Library/Application\ Support/AetherSX2 ]; then
    rm -rf ~/Library/Application\ Support/AetherSX2
    echo -e "   ${GREEN}✓ AetherSX2 dati eliminati${NC}"
fi

# rpcs3
if [ -d ~/Library/Application\ Support/rpcs3 ]; then
    rm -rf ~/Library/Application\ Support/rpcs3
    echo -e "   ${GREEN}✓ RPCS3 dati eliminati${NC}"
fi

# Kodi
if [ -d ~/Library/Application\ Support/Kodi ]; then
    rm -rf ~/Library/Application\ Support/Kodi
    echo -e "   ${GREEN}✓ Kodi dati eliminati${NC}"
fi

# ============================================
# 7. PULIZIA FINALE
# ============================================
echo -e "${YELLOW}🧹 [7/7] Pulizia cache e log...${NC}"
rm -rf ~/Library/Caches/* 2>/dev/null
rm -rf ~/Library/Logs/* 2>/dev/null
echo -e "   ${GREEN}✓ Cache e log puliti${NC}"

# ============================================
# RISULTATO
# ============================================
echo ""
FINAL=$(df -h / | tail -1 | awk '{print $4}')
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                    📊 RISULTATO                            ║${NC}"
echo -e "${GREEN}╠════════════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║${NC}  Spazio libero prima: ${YELLOW}${INITIAL}${NC}"
echo -e "${GREEN}║${NC}  Spazio libero dopo:  ${GREEN}${FINAL}${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${GREEN}✅ Deep clean completato!${NC}"
echo ""
