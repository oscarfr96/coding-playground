using System;
using Ejercicios;

// Punto de entrada del curso
// Navega por los ejercicios y ejemplos principales
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("🚀 C# From Zero To Hero");
        MostrarBienvenida();
        EjecutarEjercicios();
    }

    // Muestra bienvenida y ejemplos de clases
    static void MostrarBienvenida()
    {
        Mensajes.Saludar("Oscar");

        // Ejemplo de uso de Humano
        Humano humano1 = new Humano("Alice", 28, "Femenino");
        humano1.Saludar();
        HumanoUtilidades.RegistrarSaludo();
        Estudiante estudiante1 = new Estudiante("Bob", 20, "Masculino", "Universidad XYZ");
        estudiante1.Saludar();
    }

    // Ejecuta todos los ejercicios del curso
    static void EjecutarEjercicios()
    {
        Console.WriteLine("\n--- Ejercicios del curso ---\n");

        Console.WriteLine("1. Variables");
        VariablesEjercicio.Ejecutar();

        Console.WriteLine("\n2. Type Casting");
        TypeCastingEjercicio.Ejecutar();

        Console.WriteLine("\n3. Operadores aritméticos");
        OperadoresAritmeticosEjercicio.Ejecutar();

        Console.WriteLine("\n4. Clase Math");
        ClaseMathEjercicio.Ejecutar();

        Console.WriteLine("\n5. Numeros aleatorios");
        NumerosAleatoriosEjercicio.Ejecutar();

        Console.WriteLine("\n6. String Methods");
        StringMethodsEjercicio.Ejecutar();

        Console.WriteLine("\n7. Operadores lógicos y de comparación");
        OperadoresLogicosYComparacionEjercicio.Ejecutar();

        Console.WriteLine("\n8. Switch Statements");
        SwitchStatementsEjercicio.Ejecutar();

        Console.WriteLine("\n9. Loops");
        LoopsEjercicio.Ejecutar();

        Console.WriteLine("\n10. Arrays");
        ArraysEjercicio.Ejecutar();

        Console.WriteLine("\n11. Condicional ternario");
        CondicionalTernarioEjercicio.Ejecutar();

        Console.WriteLine("\n12. String interpolation");
        StringInterpolationEjercicio.Ejecutar();

        Console.WriteLine("\n13. Exceptions");
        ExceptionsEjercicio.Ejecutar();

        Console.WriteLine("\n14. Métodos y sobrecarga");
        MetodosEjercicio.Ejecutar();

        Console.WriteLine("\n15. Array objetos");
        ArrayObjetosEjercicio.Ejecutar();

        Console.WriteLine("\n16. Listas");
        ListasEjercicio.Ejecutar();

        Console.WriteLine("\n17. Diccionarios");
        DiccionarioEjercicio.Ejecutar();

        Console.WriteLine("\n18. Enum");
        EnumsEjercicio.Ejecutar();

        Console.WriteLine("\n19. Generics");
        GenericsEjercicio.Ejecutar();

        Console.WriteLine("\n20. Threads y async/await");
        ThreadEjercicio.Ejecutar();
        ThreadAsyncEjercicio.Ejecutar();

        Console.WriteLine("\n--- Fin de los ejercicios ---");
    }
}
