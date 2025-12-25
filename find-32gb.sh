#!/bin/bash

echo "🔍 RICERCA 32GB Documents"
echo "========================="
echo ""

echo "📁 Mobile Documents (iCloud):"
du -sh ~/Library/Mobile\ Documents/ 2>/dev/null

echo ""
echo "📱 Backup iPhone/iPad (MobileSync):"
du -sh ~/Library/Application\ Support/MobileSync/ 2>/dev/null
du -sh ~/Library/Application\ Support/MobileSync/Backup/*/ 2>/dev/null

echo ""
echo "📦 Containers:"
du -sh ~/Library/Containers/ 2>/dev/null

echo ""
echo "📦 Group Containers:"
du -sh ~/Library/Group\ Containers/ 2>/dev/null

echo ""
echo "📂 Tutte le cartelle grandi in Library:"
du -sh ~/Library/*/ 2>/dev/null | sort -hr | head -20

echo ""
echo "📂 Cartelle grandi TOTALI sulla home:"
du -sh ~/*/ 2>/dev/null | sort -hr | head -15

echo ""
echo "🔍 File grandi ovunque (>500MB):"
find ~ -type f -size +500M 2>/dev/null | head -20
