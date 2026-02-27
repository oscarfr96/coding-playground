# ts-diarize-API - Tech Stack & Arquitectura

## Tech Stack

### Frontend
- **React 18** - Librería de UI para construir interfaces interactivas
- **TypeScript** - Superset de JavaScript con tipado estático
- **Vite** - Bundler y dev server ultrarrápido
- **Tailwind CSS** - Framework de CSS utilitario para diseño minimalista
- **React Router v6** - Enrutamiento del lado del cliente
- **Firebase SDK** - Integración con servicios de Google Firebase

### Backend
- **Node.js** - Runtime de JavaScript para el servidor
- **Firebase Cloud Functions v2** - Funciones serverless para procesar diarizaciones
- **TypeScript** - Tipado estático en las Cloud Functions
- **Axios** - Cliente HTTP para consumir APIs

### Base de Datos & Storage
- **Firebase Firestore** - Base de datos NoSQL en tiempo real
- **Firebase Authentication** - Autenticación de usuarios (email/contraseña)
- **Firebase Storage** - Almacenamiento de archivos de audio
- **Firebase Security Rules** - Reglas de seguridad para proteger datos

### Servicios Externos
- **API de Diarización**
- **Vercel** - Hosting del frontend
- **Google Cloud Platform** - Hosting de Cloud Functions

---

## Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (Vercel)                       │
│                   React + TypeScript + Vite                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ • Login / Register (autenticación)                   │   │
│  │ • Dashboard (upload de audios)                       │   │
│  │ • Lista de diarizaciones (tiempo real)               │   │
│  │ • Visualización de resultados                        │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────┬─────────────────────────────────────────────────┘
             │
    ┌────────┴────────┬────────────┐
    ↓                 ↓            ↓
┌─────────────┐  ┌──────────┐  ┌──────────┐
│ Firestore   │  │ Storage  │  │   Auth   │
│  Database   │  │  (Audio) │  │ (Usuarios)
└──────┬──────┘  └────┬─────┘  └──────────┘
       │              │
       └──────┬───────┘
              ↓
    ┌─────────────────────────────┐
    │  Firebase (Google Cloud)    │
    └────────────┬────────────────┘
                 │
                 ↓
    ┌─────────────────────────────┐
    │   Cloud Functions v2        │
    │  (Node.js + TypeScript)     │
    │                             │
    │ Procesa audios cuando:      │
    │ 1. Se sube a Storage        │
    │ 2. Descarga el archivo      │
    │ 3. Convierte a base64       │
    │ 4. Envía a API externa      │
    │ 5. Guarda resultado         │
    └────────────┬────────────────┘
                 │
                 ↓
    ┌─────────────────────────────┐
    │  API de Diarización Externa │
    │ (Servicio independiente)    │
    └─────────────────────────────┘
```

---

## Flujo de Funcionamiento

### 1. Autenticación
```
Usuario
  ↓
Introduce email/contraseña
  ↓
Firebase Authentication
  ↓
Genera token JWT
  ↓
Usuario logueado ✅
```

### 2. Upload de Audio
```
Usuario selecciona archivo
  ↓
Frontend valida tipo (audio/*)
  ↓
Sube a Firebase Storage
  ↓
Crea documento en Firestore (status: "processing")
  ↓
Cloud Function se dispara automáticamente
```

### 3. Procesamiento (Cloud Function)
```
Audio sube a Storage
  ↓
onObjectFinalized se ejecuta
  ↓
1. Descarga el archivo del storage
2. Lee el archivo en el servidor
3. Convierte a base64
4. POST a API externa con el audio
  ↓
API procesa el audio (15 min, 1 hora, etc)
  ↓
Recibe resultado con segmentos y speakers
  ↓
Actualiza documento en Firestore
  status: "processing" → "completed"
  result: { segments: [...] }
```

### 4. Actualización en Tiempo Real
```
Frontend hace onSnapshot() a Firestore
  ↓
Se mantiene una conexión abierta
  ↓
Cuando Cloud Function actualiza Firestore
  ↓
Firebase notifica automáticamente al frontend
  ↓
React re-renderiza con los nuevos datos
  ↓
Usuario ve "Completado" + resultado ✅
```

---

## Estructura de Datos

### Firestore Collection: `diarizations`
```json
{
  "id": "documento-id",
  "userId": "uid-del-usuario",
  "filename": "audio.mp3",
  "audioUrl": "gs://bucket/audios/userId/timestamp_audio.mp3",
  "status": "completed",
  "result": {
    "segments": [
      {
        "speaker": "Speaker 1",
        "text": "Hola, ¿cómo estás?",
        "start": 0.5,
        "end": 3.2
      }
    ]
  },
  "createdAt": "2026-02-15T23:42:00Z",
  "updatedAt": "2026-02-15T23:57:00Z"
}
```

### Usuarios (Firebase Auth)
- Almacenados automáticamente en Firebase Authentication
- Email y contraseña hasheados y seguros

---

## Seguridad

### Firestore Rules
```javascript
- Solo usuarios autenticados pueden leer/escribir
- Los usuarios solo ven sus propias diarizaciones
- Solo el propietario puede crear nuevas diarizaciones
```

### Storage Rules
```javascript
- Cada usuario solo puede acceder a su carpeta (audios/{userId}/...)
- No hay acceso público a los archivos
```

### Cloud Functions
- Validación de `userId` antes de procesar
- API key segura (no expuesta en frontend)
- Manejo de errores con fallback a estado "error"

---

## Despliegue

### Frontend
- **Vercel**: Hosting automático de la aplicación React
- Deployment: `git push` a repositorio conectado
- Build automático con `npm run build`
- Variables de entorno en Vercel (`.env`)

### Backend (Cloud Functions)
- **Google Cloud Platform**: Hosting de las funciones
- Deploy: `firebase deploy --only functions`
- Logs en Cloud Console de GCP
- Escalado automático según demanda

### Base de Datos
- **Firebase Firestore**: Alojado en GCP
- Backups automáticos
- Replicación en múltiples regiones

---

## Dependencias Principales

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-router-dom": "^6.x",
    "firebase": "^12.x",
    "tailwindcss": "^3.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "vite": "^5.x",
    "@vitejs/plugin-react": "^4.x"
  }
}
```

```json
{
  "functions": {
    "dependencies": {
      "firebase-admin": "^12.x",
      "firebase-functions": "^4.x",
      "axios": "^1.x"
    }
  }
}
```

---

## Ventajas de esta Arquitectura

✅ **Escalable**: Cloud Functions escalan automáticamente  
✅ **Sin servidor**: No necesitas mantener servidores  
✅ **Tiempo real**: Firestore notifica cambios al instante  
✅ **Seguro**: Firebase maneja autenticación y reglas  
✅ **Económico**: Pagas solo por lo que usas  
✅ **Responsive**: Funciona en móvil, tablet y desktop  
✅ **Minimalista**: Diseño limpio al estilo Apple + Anthropic  

---

## Variables de Entorno

### Frontend (`.env.local`)
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

---

**Proyecto creado:** Febrero 2026  
**Estado:** En desarrollo / Listo para producción