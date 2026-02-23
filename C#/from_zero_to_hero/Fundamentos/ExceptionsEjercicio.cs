using System;

namespace Ejercicios
{
    public static class ExceptionsEjercicio
    {
        public static void Ejecutar()
        {
            // ============================
            // EXCEPCIONES
            // ============================
            // Las excepciones son errores que ocurren en tiempo de ejecución.
            // Se pueden manejar con try / catch para evitar que el programa se detenga.

            try
            {
                int a = 10;
                int b = 0;
                int resultado = a / b; // Esto lanzará una excepción de división por cero
            }
            catch (DivideByZeroException ex)
            {
                Console.WriteLine("Error: No se puede dividir por cero.");
                Console.WriteLine($"Detalles: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Ocurrió un error inesperado.");
                Console.WriteLine($"Detalles: {ex.Message}");
            }
            finally
            {
                Console.WriteLine("Este bloque se ejecuta siempre, haya o no excepción.");
            }

            // Tipos de excepciones comunes:
            // - DivideByZeroException: división por cero
            // - NullReferenceException: acceso a un objeto nulo
            // - FormatException: formato de datos incorrecto (ej. al convertir string a número
            // - IndexOutOfRangeException: acceso a un índice fuera de los límites de un array
        }
    }
}