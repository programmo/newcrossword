#!/bin/bash

# ==========================================
# 🚀 SETUP NUOVO MAC (LINK SIMBOLICI) - v2.0
# ==========================================
# Collega il Mac ai dati su disco esterno SSD.
# Idempotente: puoi lanciarlo quante volte vuoi senza danni.

EXTERNAL_USER="osext"
EXTERNAL_PATH="/Volumes/$EXTERNAL_USER"

# 1. Lista Cartelle Dati [PATH_LOCALE]="PATH_ESTERNO"
declare -A DATA_LINKS
DATA_LINKS=(
    ["$HOME/.ollama"]="$EXTERNAL_PATH/.ollama"
    ["$HOME/.colima"]="$EXTERNAL_PATH/.colima"
    ["$HOME/.android"]="$EXTERNAL_PATH/.android"
    ["$HOME/.gradle"]="$EXTERNAL_PATH/.gradle"
    ["$HOME/.vscode"]="$EXTERNAL_PATH/.vscode"      # Estensioni VS Code Sync!
    ["$HOME/.pub-cache"]="$EXTERNAL_PATH/.pub-cache" # Cache Flutter Sync!
    ["$HOME/Downloads"]="$EXTERNAL_PATH/Downloads"   # Downloads su Ext Disk!
    ["$HOME/Library/Android"]="$EXTERNAL_PATH/Android"
    ["$HOME/Library/Developer/Xcode"]="$EXTERNAL_PATH/Developer/Xcode"
    # Browser Caches
    ["$HOME/Library/Caches/Google"]="$EXTERNAL_PATH/Library/Caches/Google"
    ["$HOME/Library/Caches/Microsoft Edge"]="$EXTERNAL_PATH/Library/Caches/Microsoft Edge"
    ["$HOME/Library/Caches/Firefox"]="$EXTERNAL_PATH/Library/Caches/Firefox"
    ["$HOME/Library/Caches/BraveSoftware"]="$EXTERNAL_PATH/Library/Caches/BraveSoftware"
)

# 2. Lista Applicazioni (Link in /Applications)
APPS_TO_LINK=(
    "Microsoft Word.app"
    "Microsoft Excel.app"
    "Microsoft PowerPoint.app"
    "Microsoft OneNote.app"
    "Microsoft Teams.app"
    "OneDrive.app"
)

echo "=========================================="
echo "🍏 SETUP NUOVO MAC - RESTORE LINKS v2.0"
echo "=========================================="

# CHECK DISCO ESTERNO
if [ ! -d "$EXTERNAL_PATH" ]; then
    echo "❌ ERRORE: Disco esterno NON collegato in $EXTERNAL_PATH"
    exit 1
fi
echo "✅ Disco esterno trovato!"

# --- FASE 1: DATI & CONFIG ---
echo ""
echo "📂 --- SINCRONIZZAZIONE CARTELLE DATI ---"
for LOCAL_PATH in "${!DATA_LINKS[@]}"; do
    TARGET_PATH="${DATA_LINKS[$LOCAL_PATH]}"
    
    echo -n "🔗 $LOCAL_PATH ... "

    # Check Target Esistenza
    if [ ! -d "$TARGET_PATH" ]; then
        echo "⚠️  SKIP (Manca su disco esterno)"
        continue
    fi

    # Logica Idempotente
    if [ -L "$LOCAL_PATH" ]; then
        # Verifica se punta al posto giusto
        CURRENT_LINK=$(readlink "$LOCAL_PATH")
        if [ "$CURRENT_LINK" == "$TARGET_PATH" ]; then
            echo "✅ OK (Già linkato)"
        else
            echo "⚠️  ESISTE MA PUNTA ALTROVE ($CURRENT_LINK). NON TOCCO."
        fi
    elif [ -d "$LOCAL_PATH" ]; then
        # Cartella reale esistente
        if [ -z "$(ls -A "$LOCAL_PATH")" ]; then
           rm -rf "$LOCAL_PATH"
           ln -s "$TARGET_PATH" "$LOCAL_PATH"
           echo "✅ LINK CREATO (Cartella vuota rimossa)"
        else
           echo "❌ ERRORE (Cartella piena esistente! Rimuovila a mano)"
        fi
    else
        # Non esiste nulla -> Crea Link
        mkdir -p "$(dirname "$LOCAL_PATH")"
        ln -s "$TARGET_PATH" "$LOCAL_PATH"
        echo "✅ LINK CREATO (Nuovo)"
    fi
done

# --- FASE 2: APPLICAZIONI ---
echo ""
echo "📱 --- SINCRONIZZAZIONE APPLICAZIONI ---"
for APP_NAME in "${APPS_TO_LINK[@]}"; do
    EXTERNAL_APP="$EXTERNAL_PATH/Applications/$APP_NAME"
    LOCAL_APP="/Applications/$APP_NAME"

    echo -n "APPLICATION: $APP_NAME ... "

    if [ ! -d "$EXTERNAL_APP" ]; then
        echo "⚠️  NON TROVATA su disco esterno"
        continue
    fi

    if [ -L "$LOCAL_APP" ]; then
        echo "✅ OK (Già linkata)"
    elif [ -e "$LOCAL_APP" ]; then
        echo "⚠️  SKIP (Esiste già installata in locale)"
    else
        ln -s "$EXTERNAL_APP" "$LOCAL_APP"
        echo "✅ LINK CREATO"
    fi
done

echo ""
echo "=========================================="
echo "🎉 TUTTO PRONTO! IL TUO AMBIENTE È SYNCED."
echo "=========================================="
