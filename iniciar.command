#!/bin/bash
# =======================================================
# Rosterheim Local - Lanzador para macOS
# =======================================================

# Navegar a la carpeta donde se encuentra este script
cd "$(dirname "$0")" || exit 1

PORT=8080

# Comprobar si el puerto 8080 ya está ocupado, y si es así probar con 8081, 8082...
while lsof -i :$PORT >/dev/null 2>&1; do
    echo "El puerto $PORT está ocupado, probando siguiente puerto..."
    PORT=$((PORT + 1))
done

echo "======================================================="
echo "   ROSTERHEIM - GESTOR LOCAL DE BANDAS DE MORDHEIM"
echo "======================================================="
echo "Iniciando servidor local en: http://localhost:$PORT"
echo "Abriendo tu navegador automáticamente..."
echo ""
echo "Tus datos se guardan de forma 100% segura y privada"
echo "en el almacenamiento local de tu propio navegador."
echo "Puedes cerrar esta ventana de Terminal cuando termines de jugar."
echo "======================================================="

# Abrir el navegador tras 1 segundo
(sleep 1 && open "http://localhost:$PORT") &

# Iniciar el servidor HTTP con Python 3
python3 -m http.server $PORT
