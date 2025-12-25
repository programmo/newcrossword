#!/bin/bash

echo "🔥🔥🔥 MEGA PULIZIA AGGRESSIVA 🔥🔥🔥"
echo "====================================="
echo ""
echo "📊 Spazio PRIMA:"
df -h / | tail -1 | awk '{print $4 " liberi"}'
echo ""

# === DEVELOPER ===
echo "🗑️ Rimuovo Developer (Xcode cache, simulatori)..."
rm -rf ~/Library/Developer/Xcode/DerivedData 2>/dev/null
rm -rf ~/Library/Developer/Xcode/Archives 2>/dev/null
rm -rf ~/Library/Developer/Xcode/iOS\ DeviceSupport 2>/dev/null
rm -rf ~/Library/Developer/CoreSimulator 2>/dev/null
rm -rf ~/Library/Developer 2>/dev/null

# === CACHES ===
echo "🗑️ Rimuovo TUTTE le cache..."
rm -rf ~/Library/Caches/* 2>/dev/null
sudo rm -rf /Library/Caches/* 2>/dev/null

# === LOGS ===
echo "🗑️ Rimuovo log..."
rm -rf ~/Library/Logs/* 2>/dev/null
sudo rm -rf /var/log/* 2>/dev/null
sudo rm -rf /private/var/log/* 2>/dev/null

# === APPLICATION SUPPORT (tutto tranne Antigravity) ===
echo "🗑️ Rimuovo Application Support (tranne Antigravity)..."
find ~/Library/Application\ Support -maxdepth 1 -type d ! -name "Antigravity" ! -name "Application Support" -exec rm -rf {} \; 2>/dev/null

# === CONTAINERS ===
echo "🗑️ Rimuovo Containers..."
rm -rf ~/Library/Containers/* 2>/dev/null

# === GROUP CONTAINERS ===
echo "🗑️ Rimuovo Group Containers..."
rm -rf ~/Library/Group\ Containers/* 2>/dev/null

# === HTTP STORAGES ===
echo "🗑️ Rimuovo HTTPStorages..."
rm -rf ~/Library/HTTPStorages/* 2>/dev/null

# === WEBKIT ===
echo "🗑️ Rimuovo WebKit..."
rm -rf ~/Library/WebKit/* 2>/dev/null

# === SAVED APPLICATION STATE ===
echo "🗑️ Rimuovo Saved Application State..."
rm -rf ~/Library/Saved\ Application\ State/* 2>/dev/null

# === MAIL ===
echo "🗑️ Rimuovo Mail..."
rm -rf ~/Library/Mail/* 2>/dev/null

# === MESSAGES ===
echo "🗑️ Rimuovo Messages..."
rm -rf ~/Library/Messages/* 2>/dev/null

# === SAFARI ===
echo "🗑️ Rimuovo Safari data..."
rm -rf ~/Library/Safari/* 2>/dev/null

# === COOKIES ===
echo "🗑️ Rimuovo Cookies..."
rm -rf ~/Library/Cookies/* 2>/dev/null

# === HOMEBREW ===
echo "🗑️ Pulizia Homebrew..."
brew cleanup --prune=all 2>/dev/null

# === NPM ===
echo "🗑️ Pulizia npm..."
npm cache clean --force 2>/dev/null
rm -rf ~/.npm 2>/dev/null

# === DOCKER ===  
echo "🗑️ Pulizia Docker..."
docker system prune -a -f --volumes 2>/dev/null

# === TRASH ===
echo "🗑️ Svuoto Cestino..."
rm -rf ~/.Trash/* 2>/dev/null

# === CARTELLE HOME NON NECESSARIE ===
echo "🗑️ Rimuovo cartelle home non necessarie..."
rm -rf ~/projects 2>/dev/null
rm -rf ~/exp 2>/dev/null
rm -rf ~/dockreaders 2>/dev/null
rm -rf ~/ok 2>/dev/null
rm -rf ~/cfg 2>/dev/null

# === ALTRE PULIZIE ===
echo "🗑️ Altre pulizie..."
rm -rf ~/Library/Finance 2>/dev/null
rm -rf ~/Library/Assistant 2>/dev/null
rm -rf ~/Library/RenPy 2>/dev/null
rm -rf ~/Library/Passes 2>/dev/null
rm -rf ~/Library/KeyboardServices 2>/dev/null
rm -rf ~/Library/Stickers 2>/dev/null
rm -rf ~/Library/Accessibility 2>/dev/null
rm -rf ~/Library/DBeaverData 2>/dev/null

echo ""
echo "✅✅✅ PULIZIA COMPLETATA! ✅✅✅"
echo ""
echo "📊 Spazio DOPO:"
df -h / | tail -1 | awk '{print $4 " liberi"}'
