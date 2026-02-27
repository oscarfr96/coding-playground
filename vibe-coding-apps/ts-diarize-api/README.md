# ts-diarize-API - Webapp

Una aplicación web minimalista y en tiempo real para **diarización de audio**. Usa Inteligencia Artificial para transcribir grabaciones identificando automáticamente a los diferentes hablantes (quién dice qué y cuándo).

## 🚀 ¿Qué hace la aplicación?

La plataforma permite a los usuarios:
1. **Registrarse e iniciar sesión** de forma segura.
2. **Subir archivos de audio** desde su dispositivo directamente a la nube.
3. **Obtener resultados en tiempo real**. El usuario ve cómo las transcripciones con marcas de tiempo y hablantes separados aparecen en su pantalla, sin necesidad de recargar la página.

## ⚙️ ¿Cómo funciona? (Arquitectura)

El sistema utiliza una arquitectura *Serverless* (sin servidor dedicado), dividida en dos partes:

### 1. El Frontend (React)
Una interfaz de usuario limpia construida con React, Vite y TailwindCSS. Su función principal es recibir los audios y subirlos directamente a **Firebase Storage**. Luego, se queda escuchando la base de datos (**Firestore**) para mostrar el resultado en cuanto el backend termine de procesar el audio.

### 2. El Backend (Cloud Function)
En lugar de pagar un servidor 24/7, el trabajo de procesamiento de IA se maneja con **Firebase Cloud Functions**. 

El ciclo de vida de la Cloud Function es automático:
- **Despierta sola:** En cuanto un usuario termina de subir un archivo a Storage, Google Cloud detecta el evento y enciende la función.
- **Prepara y procesa:** La función descarga el audio, lo convierte a un formato óptimo (Opus 16kHz monocanal) usando FFMPEG y luego envía este archivo optimizado a nuestra API de Diarización externa.
- **Guarda el resultado:** Al recibir la larga transcripción diarizada, la función guarda la información final en Firestore.
- **Notifica al instante:** Como el Frontend estaba escuchando esa base de datos, Firestore envía la transcripción a la pantalla del usuario en tiempo real.
- **Se apaga:** Una vez completado el flujo y borrados los archivos temporales, la función se apaga automáticamente, cobrando solo por los escasos segundos que estuvo trabajando.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS.
- **Backend:** Node.js, Firebase Cloud Functions (Gen 2), FFMPEG.
- **Infraestructura:** Firebase Auth, Firestore, Storage.

*(Para más detalles técnicos profundos, consultar `TECH_STACK.md`)*
