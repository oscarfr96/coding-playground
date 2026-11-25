# Kotlin task manager

Aplicación Android de aprendizaje con Kotlin, Jetpack Compose y Firebase.
Incluye autenticación, creación y edición de tareas, prioridades, filtros, calendario,
gestos y selección de tema.

## Organización

`app/src/main/java/com/example/kotlin_to_do_app/` contiene:

- `ui/`: navegación, pantallas, componentes y tema Compose.
- `viewmodel/`: estado y operaciones de tareas y tema.
- `repository/`: acceso a los datos de tareas.
- `auth/`: estado y operaciones de autenticación.
- `model/`: modelos utilizados por la aplicación.

El flujo principal es Compose → ViewModel → Repository → Firebase.

## Abrir y configurar

Abre **esta carpeta**, `playground/kotlin-to-do-app`, en Android Studio, no la raíz
de `coding-playground`. Usa el JDK compatible con el Android Gradle Plugin configurado
en `gradle/libs.versions.toml` y el Gradle Wrapper incluido.

1. Instala Android SDK 35. La app tiene `minSdk 24` y `targetSdk 35`.
2. Registra tu aplicación Firebase con el identificador `com.example.kotlin_to_do_app`.
3. Configura Firebase Authentication y Firestore para tu proyecto.
4. Coloca tu configuración en `app/google-services.json` y revisa las reglas de acceso.
5. Sincroniza Gradle y ejecuta la aplicación en un dispositivo o emulador compatible.

Desde esta carpeta, en Windows:

```powershell
.\gradlew.bat assembleDebug
.\gradlew.bat testDebugUnitTest
```

La compilación requiere el SDK y tu configuración Firebase; no forma parte de la CI
del curso de LangChain. Los tests incluidos son los ejemplos iniciales de Android,
no una cobertura funcional completa de tareas o autenticación.

[Volver a Playground](../README.md)
