using System;

namespace from_zero_to_hero._01_Basics
{
    public static class ClaseMathEjercicio
    {
        public static void Ejecutar()
        {
            // ============================
            // CLASE MATH (System.Math)
            // ============================
            // Contiene métodos estáticos para operaciones matemáticas.
            // No necesitas instanciarla: se usa directamente como Math.Metodo()

            double numero = 3.7;

            Console.WriteLine($"Valor original: {numero}");

            // ============================
            // REDONDEOS
            // ============================

            Console.WriteLine($"Ceiling (redondea hacia arriba): {Math.Ceiling(numero)}");   // 4
            Console.WriteLine($"Floor (redondea hacia abajo): {Math.Floor(numero)}");       // 3
            Console.WriteLine($"Round (redondeo estándar): {Math.Round(numero)}");          // 4

            // Round con decimales específicos
            Console.WriteLine($"Round a 1 decimal: {Math.Round(numero, 1)}");

            // ============================
            // VALOR ABSOLUTO
            // ============================

            Console.WriteLine($"Valor absoluto de -5: {Math.Abs(-5)}");

            // ============================
            // POTENCIAS Y RAÍCES
            // ============================

            Console.WriteLine($"2 elevado a 3: {Math.Pow(2, 3)}");
            Console.WriteLine($"Raíz cuadrada de 16: {Math.Sqrt(16)}");

            // ============================
            // MÁXIMO Y MÍNIMO
            // ============================

            double y = 10;

            Console.WriteLine($"Máximo entre {numero} y {y}: {Math.Max(numero, y)}");
            Console.WriteLine($"Mínimo entre {numero} y {y}: {Math.Min(numero, y)}");

            // ============================
            // CONSTANTES MATEMÁTICAS
            // ============================

            Console.WriteLine($"PI: {Math.PI}");
            Console.WriteLine($"Número e: {Math.E}");

            // ============================
            // TRIGONOMETRÍA (usa radianes)
            // ============================

            double angulo = 30;

            // Convertimos grados → radianes
            double radianes = angulo * Math.PI / 180;

            Console.WriteLine($"Seno de 30°: {Math.Sin(radianes)}");
            Console.WriteLine($"Coseno de 30°: {Math.Cos(radianes)}");
            Console.WriteLine($"Tangente de 30°: {Math.Tan(radianes)}");

            // ============================
            // LOGARITMOS
            // ============================

            Console.WriteLine($"Log natural de 10: {Math.Log(10)}");     // ln
            Console.WriteLine($"Log base 10 de 100: {Math.Log10(100)}");

            // ============================
            // TRUNCAR DECIMALES
            // ============================

            Console.WriteLine($"Truncate (elimina decimales sin redondear): {Math.Truncate(numero)}");

            // ============================
            // SIGNO DE UN NÚMERO
            // ============================

            Console.WriteLine($"Signo de -15: {Math.Sign(-15)}"); // -1
            Console.WriteLine($"Signo de 0: {Math.Sign(0)}");     // 0
            Console.WriteLine($"Signo de 20: {Math.Sign(20)}");   // 1
        }
    }
}