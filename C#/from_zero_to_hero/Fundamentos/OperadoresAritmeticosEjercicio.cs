using System;

namespace Ejercicios
{
    public static class OperadoresAritmeticosEjercicio
    {
        public static void Ejecutar()
        {
            // ============================
            // OPERADORES BÁSICOS
            // ============================

            int a = 10;
            int b = 3;

            Console.WriteLine($"Suma: {a} + {b} = {a + b}");
            Console.WriteLine($"Resta: {a} - {b} = {a - b}");
            Console.WriteLine($"Multiplicación: {a} * {b} = {a * b}");
            Console.WriteLine($"División entera: {a} / {b} = {a / b}"); // 10 / 3 = 3 (pierde decimal)
            Console.WriteLine($"Módulo (resto): {a} % {b} = {a % b}"); // 10 % 3 = 1


            // ============================
            // IMPORTANTE: División con decimales
            // ============================

            double divisionReal = (double)a / b; // forzamos división decimal
            Console.WriteLine($"División real: {divisionReal}");


            // ============================
            // OPERADORES DE ASIGNACIÓN COMPUESTA
            // ============================

            int gatos = 3;

            gatos = gatos + 4;   // forma clásica
            gatos += 4;          // forma abreviada

            gatos = gatos - 1;
            gatos -= 1;

            gatos = gatos * 2;
            gatos *= 2;

            gatos = gatos / 2;
            gatos /= 2;

            // ============================
            // OPERADOR MÓDULO (%)
            // ============================

            // El operador % devuelve el RESTO de una división.
            // Muy usado para saber si un número es PAR o IMPAR.

            gatos = gatos % 2;  // forma larga: obtiene el resto de dividir gatos entre 2 (0 = par, 1 = impar)
            gatos %= 2;         // forma abreviada: exactamente lo mismo

            if (gatos % 2 == 0)
            {
                Console.WriteLine("Número par");
            }
            else
            {
                Console.WriteLine("Número impar");
            }

            // ============================
            // INCREMENTO Y DECREMENTO
            // ============================

            int numero = 5;

            numero++; // aumenta 1
            numero--; // disminuye 1


            // Diferencia entre POST y PRE incremento
            int x = 5;

            int post = x++; // primero usa 5, luego incrementa a 6
            int pre = ++x;  // primero incrementa, luego usa el valor

            Console.WriteLine($"Post incremento: {post}");
            Console.WriteLine($"Pre incremento: {pre}");


            // ============================
            // OPERADORES UNARIOS
            // ============================

            int positivo = +a;  // no cambia nada
            int negativo = -a;  // cambia el signo


            // ============================
            // CHECKED / UNCHECKED (OVERFLOW)
            // ============================

            int max = int.MaxValue;

            try
            {
                checked
                {
                    int overflow = max + 1; // lanzará excepción
                }
            }
            catch (OverflowException)
            {
                Console.WriteLine("Overflow detectado!");
            }
        }
    }
}