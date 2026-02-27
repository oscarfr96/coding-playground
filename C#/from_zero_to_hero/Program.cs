using System;
using from_zero_to_hero._01_Basics;
using from_zero_to_hero._02_ControlFlow;
using from_zero_to_hero._03_DataStructures;
using from_zero_to_hero._04_OOP;
using from_zero_to_hero._05_Advanced;
using from_zero_to_hero._06_Async;

// Punto de entrada del curso
// Navega por los ejercicios y ejemplos principales mediante un menú interactivo
class Program
{
    static void Main(string[] args)
    {
        bool showMenu = true;
        while (showMenu)
        {
            showMenu = MainMenu();
        }
    }

    static bool MainMenu()
    {
        Console.Clear();
        Console.WriteLine("=============================================");
        Console.WriteLine("          🚀 C# From Zero To Hero           ");
        Console.WriteLine("=============================================\n");
        Console.WriteLine("Selecciona el módulo que deseas explorar:\n");
        
        Console.WriteLine("--- 01_Basics ---");
        Console.WriteLine(" 1. Variables");
        Console.WriteLine(" 2. Type Casting");
        Console.WriteLine(" 3. Clase Math");
        Console.WriteLine(" 4. Números Aleatorios");
        Console.WriteLine(" 5. String Methods");
        Console.WriteLine(" 6. String Interpolation");

        Console.WriteLine("\n--- 02_ControlFlow ---");
        Console.WriteLine(" 7. Operadores Aritméticos");
        Console.WriteLine(" 8. Operadores Lógicos y de Comparación");
        Console.WriteLine(" 9. Switch Statements");
        Console.WriteLine("10. Loops");
        Console.WriteLine("11. Condicional Ternario");

        Console.WriteLine("\n--- 03_DataStructures ---");
        Console.WriteLine("12. Arrays");
        Console.WriteLine("13. Array de Objetos");
        Console.WriteLine("14. Listas");
        Console.WriteLine("15. Diccionarios");

        Console.WriteLine("\n--- 04_OOP ---");
        Console.WriteLine("16. Ejercicio: Clases y Objetos (Humano/Estudiante)");

        Console.WriteLine("\n--- 05_Advanced ---");
        Console.WriteLine("17. Métodos y Sobrecarga");
        Console.WriteLine("18. Exceptions");
        Console.WriteLine("19. Enums");
        Console.WriteLine("20. Generics");

        Console.WriteLine("\n--- 06_Async ---");
        Console.WriteLine("21. Threads");
        Console.WriteLine("22. Threads Async/Await");

        Console.WriteLine("\n0. Salir");
        Console.WriteLine("=============================================");
        Console.Write("\nElige una opción: ");

        string? input = Console.ReadLine();
        
        if (input == "0") return false;

        Console.Clear();
        Console.WriteLine($"\n--- Ejecutando Opción {input} ---\n");

        switch (input)
        {
            // 01_Basics
            case "1": VariablesEjercicio.Ejecutar(); break;
            case "2": TypeCastingEjercicio.Ejecutar(); break;
            case "3": ClaseMathEjercicio.Ejecutar(); break;
            case "4": NumerosAleatoriosEjercicio.Ejecutar(); break;
            case "5": StringMethodsEjercicio.Ejecutar(); break;
            case "6": StringInterpolationEjercicio.Ejecutar(); break;
            
            // 02_ControlFlow
            case "7": OperadoresAritmeticosEjercicio.Ejecutar(); break;
            case "8": OperadoresLogicosYComparacionEjercicio.Ejecutar(); break;
            case "9": SwitchStatementsEjercicio.Ejecutar(); break;
            case "10": LoopsEjercicio.Ejecutar(); break;
            case "11": CondicionalTernarioEjercicio.Ejecutar(); break;

            // 03_DataStructures
            case "12": ArraysEjercicio.Ejecutar(); break;
            case "13": ArrayObjetosEjercicio.Ejecutar(); break;
            case "14": ListasEjercicio.Ejecutar(); break;
            case "15": DiccionarioEjercicio.Ejecutar(); break;

            // 04_OOP
            case "16": 
                Mensajes.Saludar("Oscar");
                Humano humano1 = new Humano("Alice", 28, "Femenino");
                humano1.Saludar();
                HumanoUtilidades.RegistrarSaludo();
                Estudiante estudiante1 = new Estudiante("Bob", 20, "Masculino", "Universidad XYZ");
                estudiante1.Saludar();
                break;

            // 05_Advanced
            case "17": MetodosEjercicio.Ejecutar(); break;
            case "18": ExceptionsEjercicio.Ejecutar(); break;
            case "19": EnumsEjercicio.Ejecutar(); break;
            case "20": GenericsEjercicio.Ejecutar(); break;

            // 06_Async
            case "21": ThreadEjercicio.Ejecutar(); break;
            case "22": ThreadAsyncEjercicio.Ejecutar(); break;

            default:
                Console.WriteLine("Opción no válida. Por favor, intenta de nuevo.");
                break;
        }

        Console.WriteLine("\n=============================================");
        Console.WriteLine("Presiona Enter para volver al menú...");
        Console.ReadLine();
        
        return true;
    }
}
