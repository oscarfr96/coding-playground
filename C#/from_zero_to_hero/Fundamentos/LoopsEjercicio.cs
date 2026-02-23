using System;

namespace Ejercicios
{
    public static class LoopsEjercicio
    {
        public static void Ejecutar()
        {
            // ============================
            // BUCLE FOR
            // ============================

            for (int i = 0; i < 5; i++)
            {
                Console.WriteLine($"Iteración {i}");
            }

            // ============================
            // BUCLE WHILE
            // ============================
            int j = 0;
            while (j < 5)
            {
                Console.WriteLine($"Iteración {j}");
                j++;
            }

            // ============================
            // NESTED LOOPS (BUCLES ANIDADOS)
            // ============================
            for (int x = 1; x <= 3; x++)
            {
                for (int y = 1; y <= 2; y++)
                {
                    Console.WriteLine($"x={x}, y={y}");
                }
            }

            // ============================
            // FOR EACH (BUCLE ESPECIAL PARA COLECCIONES)
            // ============================
            string[] frutas = { "Manzana", "Banana", "Naranja" };
            foreach (string fruta in frutas)
            {
                Console.WriteLine(fruta);
            }
        }
    }
}