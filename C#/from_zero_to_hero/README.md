# C# From Zero to Hero

Curso de fundamentos con un menú de consola de 22 entradas. `Program.cs` organiza
la navegación y llama a los ejercicios; las clases están agrupadas por tema.

| Carpeta | Contenido |
| --- | --- |
| `01_Basics/` | Variables, conversiones, Math, aleatoriedad y strings |
| `02_ControlFlow/` | Operadores, comparaciones, switch, bucles y ternarios |
| `03_DataStructures/` | Arrays, objetos, listas y diccionarios |
| `04_OOP/` | Clases, herencia, interfaces, polimorfismo y ejemplos auxiliares |
| `05_Advanced/` | Métodos, sobrecargas, excepciones, enums y genéricos |
| `06_Async/` | Threads y ejemplos con async/await |

## Ejecutar

El proyecto apunta a **.NET 9**: requiere ese runtime para ejecutarse y un SDK
compatible para compilar. Desde esta carpeta:

```powershell
dotnet build
dotnet run
```

Selecciona un número del menú y pulsa Enter para volver al terminar. `0` sale.
Algunos ejemplos requieren entrada interactiva; no son una batería de pruebas.
Las clases auxiliares de OOP se pueden estudiar directamente aunque no tengan una
opción individual en el menú.

[Volver a C#](../README.md)
