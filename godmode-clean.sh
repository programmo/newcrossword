#!/bin/bash

# 🔥🔥🔥 SCRIPT DELLA MADONNA - ULTRA AGGRESSIVO 🔥🔥🔥
# Eseguire con: sudo ./godmode-clean.sh
# MANTIENE SOLO: .gemini, .antigravity, crosswords

echo "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥"
echo "   GODMODE CLEAN - DISTRUZIONE TOTALE"
echo "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥"
echo ""
echo "📊 SPAZIO PRIMA:"
df -h / | tail -1 | awk '{print "   " $4 " liberi su " $2}'
echo ""

USER_HOME="/Users/pierpaoloromanelli"

# ============================================
# CARTELLE NASCOSTE (.*)
# ============================================
echo "💀 [1/10] Cartelle nascoste..."
rm -rf $USER_HOME/.ollama 2>/dev/null
rm -rf $USER_HOME/.android 2>/dev/null
rm -rf $USER_HOME/.gradle 2>/dev/null
rm -rf $USER_HOME/.sdkman 2>/dev/null
rm -rf $USER_HOME/.nvm 2>/dev/null
rm -rf $USER_HOME/.vscode 2>/dev/null
rm -rf $USER_HOME/.dartServer 2>/dev/null
rm -rf $USER_HOME/.pub-cache 2>/dev/null
rm -rf $USER_HOME/.npm 2>/dev/null
rm -rf $USER_HOME/.docker 2>/dev/null
rm -rf $USER_HOME/.cocoapods 2>/dev/null
rm -rf $USER_HOME/.cargo 2>/dev/null
rm -rf $USER_HOME/.rustup 2>/dev/null
rm -rf $USER_HOME/.flutter 2>/dev/null
rm -rf $USER_HOME/.dart 2>/dev/null
rm -rf $USER_HOME/.pub 2>/dev/null
rm -rf $USER_HOME/.composer 2>/dev/null
rm -rf $USER_HOME/.bundle 2>/dev/null
rm -rf $USER_HOME/.gem 2>/dev/null
rm -rf $USER_HOME/.rbenv 2>/dev/null
rm -rf $USER_HOME/.pyenv 2>/dev/null
rm -rf $USER_HOME/.conda 2>/dev/null
rm -rf $USER_HOME/.local 2>/dev/null
rm -rf $USER_HOME/.cache 2>/dev/null
rm -rf $USER_HOME/.config 2>/dev/null
rm -rf $USER_HOME/.Trash 2>/dev/null

# ============================================
# LIBRARY - CACHES
# ============================================
echo "💀 [2/10] Library Caches..."
rm -rf $USER_HOME/Library/Caches/* 2>/dev/null
rm -rf /Library/Caches/* 2>/dev/null
rm -rf /System/Library/Caches/* 2>/dev/null

# ============================================
# LIBRARY - APPLICATION SUPPORT (tranne Antigravity)
# ============================================
echo "💀 [3/10] Application Support..."
find $USER_HOME/Library/Application\ Support -maxdepth 1 -type d \
    ! -name "Antigravity" \
    ! -name "Application Support" \
    -exec rm -rf {} \; 2>/dev/null

# ============================================
# LIBRARY - CONTAINERS
# ============================================
echo "💀 [4/10] Containers..."
rm -rf $USER_HOME/Library/Containers/* 2>/dev/null
rm -rf $USER_HOME/Library/Group\ Containers/* 2>/dev/null

# ============================================
# LIBRARY - DEVELOPER
# ============================================
echo "💀 [5/10] Developer..."
rm -rf $USER_HOME/Library/Developer/* 2>/dev/null
rm -rf /Library/Developer/CommandLineTools 2>/dev/null

# ============================================
# LIBRARY - ALTRI
# ============================================
echo "💀 [6/10] Altri Library..."
rm -rf $USER_HOME/Library/Logs/* 2>/dev/null
rm -rf $USER_HOME/Library/Mail/* 2>/dev/null
rm -rf $USER_HOME/Library/Messages/* 2>/dev/null
rm -rf $USER_HOME/Library/Safari/* 2>/dev/null
rm -rf $USER_HOME/Library/Cookies/* 2>/dev/null
rm -rf $USER_HOME/Library/HTTPStorages/* 2>/dev/null
rm -rf $USER_HOME/Library/WebKit/* 2>/dev/null
rm -rf $USER_HOME/Library/Saved\ Application\ State/* 2>/dev/null
rm -rf $USER_HOME/Library/Mobile\ Documents/* 2>/dev/null

# ============================================
# SYSTEM LOGS E TEMP
# ============================================
echo "💀 [7/10] System logs e temp..."
rm -rf /var/log/* 2>/dev/null
rm -rf /private/var/log/* 2>/dev/null
rm -rf /private/var/folders/* 2>/dev/null
rm -rf /tmp/* 2>/dev/null
rm -rf /private/tmp/* 2>/dev/null

# ============================================
# HOMEBREW
# ============================================
echo "💀 [8/10] Homebrew cleanup..."
if command -v brew &> /dev/null; then
    brew cleanup --prune=all 2>/dev/null
    rm -rf $(brew --cache) 2>/dev/null
fi

# ============================================
# DOCKER
# ============================================
echo "💀 [9/10] Docker cleanup..."
if command -v docker &> /dev/null; then
    docker system prune -a -f --volumes 2>/dev/null
fi
rm -rf $USER_HOME/Library/Containers/com.docker.docker 2>/dev/null
rm -rf $USER_HOME/.docker 2>/dev/null

# ============================================
# CARTELLE HOME NON NECESSARIE
# ============================================
echo "💀 [10/10] Cartelle home..."
rm -rf $USER_HOME/projects 2>/dev/null
rm -rf $USER_HOME/exp 2>/dev/null
rm -rf $USER_HOME/dockreaders 2>/dev/null
rm -rf $USER_HOME/ok 2>/dev/null
rm -rf $USER_HOME/cfg 2>/dev/null
rm -rf $USER_HOME/Music/* 2>/dev/null
rm -rf $USER_HOME/Movies/* 2>/dev/null
rm -rf $USER_HOME/Pictures/* 2>/dev/null
rm -rf $USER_HOME/Downloads/* 2>/dev/null
rm -rf $USER_HOME/Documents/* 2>/dev/null
rm -rf $USER_HOME/Desktop/* 2>/dev/null
rm -rf $USER_HOME/Public/* 2>/dev/null

# ============================================
# FLUSH DNS E PURGE MEMORIA
# ============================================
echo "🔄 Flush DNS e purge memoria..."
dscacheutil -flushcache 2>/dev/null
killall -HUP mDNSResponder 2>/dev/null
purge 2>/dev/null

echo ""
echo "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥"
echo "   ✅ DISTRUZIONE COMPLETATA!"
echo "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥"
echo ""
echo "📊 SPAZIO DOPO:"
df -h / | tail -1 | awk '{print "   " $4 " liberi su " $2}'
echo ""
echo "✅ Mantenuti: .gemini, .antigravity, crosswords"
