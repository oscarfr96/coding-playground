using System;

namespace Ejercicios
{
    public static class ArraysEjercicio
    {
        public static void Ejecutar()
        {
            // ============================
            // ARRAYS (VECTORES)
            // ============================
            // Un array es una colección de elementos del mismo tipo.
            // Tiene tamaño fijo (no se puede cambiar después de crear).

            string[] frutas = new string[3]; // array de 3 elementos

            frutas[0] = "Manzana";
            frutas[1] = "Banana";
            frutas[2] = "Naranja";

            Console.WriteLine($"Primera fruta: {frutas[0]}");
            Console.WriteLine($"Segunda fruta: {frutas[1]}");
            Console.WriteLine($"Tercera fruta: {frutas[2]}");

            // ============================
            // ARRAY LITERAL
            // ============================

            int[] numeros = { 10, 20, 30, 40 };

            Console.WriteLine($"Número en posición 2: {numeros[2]}");

            // ============================
            // LONGITUD DEL ARRAY
            // ============================

            Console.WriteLine($"Cantidad de frutas: {frutas.Length}");
            Console.WriteLine($"Cantidad de números: {numeros.Length}");

            // ============================
            // ARRAYS MULTIDIMENSIONALES
            // ============================
            int[,] matriz = new int[2, 3]; // 2 filas, 3 columnas
            matriz[0, 0] = 1;
            matriz[0, 1] = 2;
            matriz[0, 2] = 3;
            matriz[1, 0] = 4;
            matriz[1, 1] = 5;
            matriz[1, 2] = 6;
            
            for (int i = 0; i < matriz.GetLength(0); i++)
            {
                for (int j = 0; j < matriz.GetLength(1); j++)
                {
                    Console.WriteLine($"matriz[{i},{j}] = {matriz[i, j]}");
                }
            }
        }
    }
}