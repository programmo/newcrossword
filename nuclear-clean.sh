#!/bin/bash

# 🔥 NUCLEAR CLEAN - Pulizia Aggressiva
# Mantiene solo: .gemini (Antigravity), crosswords, e file di sistema essenziali

echo "🔥 NUCLEAR CLEAN - Pulizia Aggressiva"
echo "======================================"
echo ""

# Funzione per mostrare spazio liberato
show_space() {
    df -h / | grep -v Filesystem | awk '{print "Spazio libero: " $4}'
}

echo "📊 Prima della pulizia:"
show_space
echo ""

# === CACHE DI SISTEMA ===
echo "🗑️  Pulizia cache di sistema..."
rm -rf ~/Library/Caches/* 2>/dev/null
rm -rf /Library/Caches/* 2>/dev/null

# === CONTAINERS DELLE APP ===
echo "🗑️  Pulizia containers app (tranne essenziali)..."
rm -rf ~/Library/Containers/com.apple.mediaanalysisd/Data/Library/Caches/* 2>/dev/null
rm -rf ~/Library/Containers/com.docker.docker 2>/dev/null
rm -rf ~/Library/Containers/com.microsoft.Powerpoint 2>/dev/null
rm -rf ~/Library/Containers/com.microsoft.Word 2>/dev/null
rm -rf ~/Library/Containers/com.microsoft.Excel 2>/dev/null
rm -rf ~/Library/Containers/com.corel.CorelDRAW 2>/dev/null

# === LOG E DIAGNOSTICA ===
echo "🗑️  Pulizia log e diagnostica..."
rm -rf ~/Library/Logs/* 2>/dev/null
rm -rf /var/log/* 2>/dev/null
sudo rm -rf /private/var/log/* 2>/dev/null

# === DEVELOPER TOOLS ===
echo "🗑️  Pulizia developer cache..."
rm -rf ~/Library/Developer/Xcode/DerivedData/* 2>/dev/null
rm -rf ~/Library/Developer/Xcode/Archives/* 2>/dev/null
rm -rf ~/Library/Developer/CoreSimulator/Devices/* 2>/dev/null
rm -rf ~/Library/Developer/Xcode/iOS\ DeviceSupport/* 2>/dev/null

# === NPM E NODE ===
echo "🗑️  Pulizia npm cache..."
npm cache clean --force 2>/dev/null
rm -rf ~/.npm/_cacache/* 2>/dev/null
rm -rf ~/Library/Caches/npm/* 2>/dev/null

# === APPLICATION SUPPORT (cache delle app) ===
echo "🗑️  Pulizia Application Support cache..."
rm -rf ~/Library/Application\ Support/Code/Cache/* 2>/dev/null
rm -rf ~/Library/Application\ Support/Code/CachedData/* 2>/dev/null
rm -rf ~/Library/Application\ Support/Cursor/Cache/* 2>/dev/null
rm -rf ~/Library/Application\ Support/Cursor/CachedData/* 2>/dev/null
rm -rf ~/Library/Application\ Support/Google/Chrome/Default/Cache/* 2>/dev/null
rm -rf ~/Library/Application\ Support/Slack/Cache/* 2>/dev/null
rm -rf ~/Library/Application\ Support/Spotify/PersistentCache/* 2>/dev/null
rm -rf ~/Library/Application\ Support/discord/Cache/* 2>/dev/null

# === SAFARI ===
echo "🗑️  Pulizia Safari..."
rm -rf ~/Library/Safari/LocalStorage/* 2>/dev/null
rm -rf ~/Library/Caches/com.apple.Safari/* 2>/dev/null

# === MAIL ===
echo "🗑️  Pulizia Mail cache..."
rm -rf ~/Library/Mail/V*/MailData/Envelope\ Index* 2>/dev/null
rm -rf ~/Library/Containers/com.apple.mail/Data/Library/Caches/* 2>/dev/null

# === HOMEBREW ===
echo "🗑️  Pulizia Homebrew..."
brew cleanup --prune=all 2>/dev/null
rm -rf ~/Library/Caches/Homebrew/* 2>/dev/null

# === TRASH ===
echo "🗑️  Svuotamento Cestino..."
rm -rf ~/.Trash/* 2>/dev/null
sudo rm -rf /Volumes/*/.Trashes/* 2>/dev/null

# === DOCKER (se presente) ===
echo "🗑️  Pulizia Docker completa..."
docker system prune -a -f --volumes 2>/dev/null

# === SPOTLIGHT ===
echo "🗑️  Reset indice Spotlight..."
sudo mdutil -E / 2>/dev/null

echo ""
echo "✅ PULIZIA COMPLETATA!"
echo ""
echo "📊 Dopo la pulizia:"
show_space
