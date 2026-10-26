#!/bin/bash
# =======================================================
# Grimheim Local - Lanzador para macOS
# =======================================================

# Navegar a la carpeta donde reside este script
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR" || exit 1

# Eliminar atributos de cuarentena de macOS si existen
xattr -d com.apple.quarantine "$0" 2>/dev/null
xattr -c "$DIR"/*.command 2>/dev/null

PORT=8080

echo "======================================================="
echo "    GRIMHEIM - GESTOR LOCAL DE BANDAS DE MORDHEIM"
echo "======================================================="

# Abrir el navegador tras 1.2 segundos
(sleep 1.2 && open "http://localhost:$PORT") &

# Priorizar Node.js si está instalado (muy rápido y compatible con ES modules)
if command -v node >/dev/null 2>&1; then
    echo "Iniciando con Node.js en: http://localhost:$PORT"
    PORT=$PORT node server.js
elif [ -f "/opt/homebrew/bin/node" ]; then
    echo "Iniciando con Node.js (/opt/homebrew/bin/node) en: http://localhost:$PORT"
    PORT=$PORT /opt/homebrew/bin/node server.js
elif command -v python3 >/dev/null 2>&1; then
    echo "Iniciando con Python 3 en: http://localhost:$PORT"
    python3 -m http.server $PORT --bind 127.0.0.1
else
    echo "Error: No se ha encontrado ni Node.js ni Python 3 en tu sistema."
    echo "Por favor instala Node.js o Python 3 para ejecutar el servidor local."
    read -p "Presiona Intro para salir..."
fi
