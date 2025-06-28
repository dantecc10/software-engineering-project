#!/bin/bash

# Cambia a la carpeta donde están tus archivos (opcional)
# cd /ruta/a/tu/proyecto

find . -type f -name "*.html" | while read archivo; do
    nuevo_nombre="${archivo%.html}.blade.php"
    mv "$archivo" "$nuevo_nombre"
    echo "Renombrado: $archivo -> $nuevo_nombre"
done
