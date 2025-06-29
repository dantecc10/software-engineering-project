#!/bin/bash

CLEAN=false

# Obtener la ruta y eliminarla de $1 si es --clean
if [ "$1" == "--clean" ]; then
    CLEAN=true
    TARGET_DIR=""
    echo "🧹 La opción --clean está activada. Los archivos .html originales serán eliminados después de la conversión."
elif [ -n "$1" ]; then
    TARGET_DIR="$1"
else
    TARGET_DIR=""
fi

# Si la segunda posición es --clean
if [ "$2" == "--clean" ]; then
    CLEAN=true
    echo "🧹 La opción --clean está activada. Los archivos .html originales serán eliminados después de la conversión."
fi

# Si no se recibió ruta, usar directorio del script
if [ -z "$TARGET_DIR" ]; then
    # Directorio donde está el script
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    TARGET_DIR="$SCRIPT_DIR"
fi

echo "🔄 Cambiando al directorio: $TARGET_DIR"
cd "$TARGET_DIR" || { echo "❌ No se pudo cambiar al directorio $TARGET_DIR"; exit 1; }

echo "🔎 Buscando archivos .html en el directorio actual..."

# Procesar cada archivo .html
for html_file in *.html; do
    # Si no hay archivos .html, saltar
    [ -e "$html_file" ] || continue

    blade_file="${html_file%.html}.blade.php"

    echo "📄 Procesando $html_file -> $blade_file"

    # Copiar archivo
    cp "$html_file" "$blade_file"

    # Reemplazo manual sin -i (para evitar errores de permisos)
    tmp_file=$(mktemp)

    # Reemplazar links CSS
    sed 's|href="\([^"]*\)"|href="{{ asset('\''\1'\'') }}"|g' "$blade_file" > "$tmp_file" && mv "$tmp_file" "$blade_file"

    # Reemplazar scripts JS
    tmp_file=$(mktemp)
    sed 's|src="\([^"]*\)"|src="{{ asset('\''\1'\'') }}"|g' "$blade_file" > "$tmp_file" && mv "$tmp_file" "$blade_file"

    echo "✔️  $blade_file listo."

    # Si la opción --clean está activada, eliminar el .html original
    if [ "$CLEAN" = true ]; then
        rm "$html_file"
        echo "🗑️  $html_file eliminado."
    fi
done

# Copiar carpeta assets a public/assets/
SOURCE_ASSETS_DIR="./assets"
TARGET_ASSETS_DIR="../../public/assets"

if [ -d "$SOURCE_ASSETS_DIR" ]; then
    mkdir -p "$TARGET_ASSETS_DIR"
    cp -r "$SOURCE_ASSETS_DIR/"* "$TARGET_ASSETS_DIR/"
    echo "✔️ Carpeta assets copiada a $TARGET_ASSETS_DIR"
else
    echo "⚠️ No se encontró carpeta assets en $SOURCE_ASSETS_DIR. Saltando copia."
fi

echo "✅ Proceso terminado."
