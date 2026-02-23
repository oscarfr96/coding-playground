using System;

namespace Ejercicios
{
    public static class NumerosAleatoriosEjercicio
    {
        public static void Ejecutar()
        {
            // ============================
            // NÚMEROS ALEATORIOS
            // ============================
            // La clase Random se usa para generar números aleatorios.

            Random rnd = new Random();

            // Número entero aleatorio entre 0 (inclusive) y 100 (EXCLUSIVE) <- esto es, entre 0 y 99
            int numeroEntero = rnd.Next(0, 100);
            Console.WriteLine($"Número entero aleatorio (0-99): {numeroEntero}");

            // Número decimal aleatorio entre 0.0 y 1.0
            double numeroDecimal = rnd.NextDouble();
            Console.WriteLine($"Número decimal aleatorio (0.0-1.0): {numeroDecimal}");

            // Número entero aleatorio entre 1 y 10
            int dado = rnd.Next(1, 11); // el límite superior es exclusivo
            Console.WriteLine($"Tirada de dado (1-10): {dado}");
        }
    }
}