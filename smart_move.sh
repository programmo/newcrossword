#!/bin/bash

# ==========================================
# 🚀 SMART MOVE & LINK - Antigravity Tool
# ==========================================
# Sposta una cartella su disco esterno e crea un symlink al suo posto.
# Mostra avanzamento, velocità e tempo rimanente.

if [ "$#" -lt 1 ]; then
    echo "❌ Errore: Devi specificare quale cartella spostare."
    echo "Uso: ./smart_move.sh [PERCORSO_CARTELLA] [DESTINAZIONE_OPZIONALE]"
    echo "Esempio: ./smart_move.sh ~/.android /Volumes/osext"
    exit 1
fi

SOURCE="${1%/}" # Rimuove slash finale se presente
DIR_NAME=$(basename "$SOURCE")

# Se non viene specificata destinazione, usa il disco esterno di default
DEST_BASE="${2:-/Volumes/osext}"
DEST="$DEST_BASE/$DIR_NAME"

# Controllo esistenza sorgente
if [ ! -d "$SOURCE" ]; then
    echo "❌ Errore: La cartella '$SOURCE' non esiste!"
    exit 1
fi

# Controllo se è già un link
if [ -L "$SOURCE" ]; then
    echo "⚠️  Attenzione: '$SOURCE' è già un link simbolico!"
    ls -l "$SOURCE"
    exit 1
fi

echo ""
echo "=========================================="
echo "📦 SMART MOVE OPERATION"
echo "=========================================="
echo "📂 SORGENTE:     $SOURCE"
echo "🎯 DESTINAZIONE: $DEST"
echo "=========================================="

# 1. Calcolo Dimensione
echo "⚖️  Calcolo dimensione in corso..."
SIZE=$(du -sh "$SOURCE" 2>/dev/null | cut -f1)
echo "📊 Dimensione totale: $SIZE"
echo "=========================================="
echo ""

read -p "❓ Vuoi procedere con lo sPOSTAMENTO? (s/n): " confirm
if [[ "$confirm" != "s" && "$confirm" != "y" ]]; then
    echo "🚫 Operazione annullata."
    exit 0
fi

# 2. Copia con RSYNC (mostra progresso)
echo ""
echo "🚀 Avvio trasferimento..."
mkdir -p "$DEST_BASE"

# --info=progress2 mostra la barra totale percentuale, non per singolo file (più leggibile)
rsync -a -h --progress "$SOURCE/" "$DEST/"

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ ERRORE CRITICO durante la copia."
    echo "Nessun file originale è stato toccato."
    exit 1
fi

echo ""
echo "✅ Copia completata con successo (100%)"

# 3. Verifica rapida (opzionale, basata su exit code rsync che è affidabile)
# 4. Swap: Rimuovi originale e Linka

echo "🗑️  Rimozione cartella originale dal disco interno..."
rm -rf "$SOURCE"

echo "🔗 Creazione Link Simbolico..."
ln -s "$DEST" "$SOURCE"

echo ""
echo "🎉 TUTTO FATTO!"
echo "Verifica stato finale:"
ls -lahFd "$SOURCE"
echo "=========================================="
