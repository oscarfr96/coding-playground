# Comprobación de la adaptación móvil

Revisión: 27 de octubre de 2026.

Se comprobaron 48 combinaciones de tamaño y sección en el navegador Chromium integrado: anchos de 320, 390, 600, 768, 1024 y 1280 píxeles; portada, cultivos, pesca, habitantes, calendario, calculadora, cuaderno y ficha de cultivo. En todas, el ancho desplazable del documento coincidió con su ancho visible, sin desplazamiento horizontal global.

Los catálogos se convierten en tarjetas por debajo de 1000 píxeles; en móvil usan una columna y conservan todos los campos. Los controles principales tienen una altura mínima de 44 píxeles, y los campos editables usan texto de 16 píxeles en móvil. Las guías anteriores de lectura, calendario y favoritos también se revisaron a 320 y 390 píxeles.

Se verificó que abrir el menú impide desplazar el fondo, enfoca el botón de cierre y, al cerrarlo, devuelve el foco al botón de navegación. El fondo queda marcado como inerte mientras el menú está abierto. La navegación por teclado permite cerrar con Escape y mantiene el foco dentro del menú.

La compilación de producción y las siete pruebas de datos y lógica pasan. Estas comprobaciones utilizan tamaños de pantalla simulados; no equivalen a pruebas en dispositivos físicos ni a una validación específica de Safari en iOS.
