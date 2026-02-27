using System;

namespace from_zero_to_hero._01_Basics
{
    public static class VariablesEjercicio
    {
        public static void Ejecutar()
        {
            // ============================
            // TIPOS DE DATOS BÁSICOS
            // ============================

            // Enteros (números sin decimales)
            int x = 20;
            int y = 5;

            // Operación matemática con enteros
            int suma = x + y;

            // Número con decimales
            double peso = 68.0;

            // Booleano: solo puede ser true o false
            // Aquí comparamos si la suma es igual al peso
            bool comparar = suma == peso;

            // Un solo carácter (usa comillas simples)
            char simbolo = 'A';

            // Texto (cadena de caracteres)
            string mensaje = "¡Hola, C#!";

            Console.WriteLine($"Suma = {suma}");
            Console.WriteLine($"Tu peso es = {peso}");
            Console.WriteLine($"¿La suma es igual a tu peso? {comparar}");
            Console.WriteLine($"El símbolo es = {simbolo}");
            Console.WriteLine(mensaje);


            // ============================
            // CONSTANTES
            // ============================

            // Una constante NO puede cambiar su valor
            const double gravedad = 9.8;

            // gravedad = 10; 
            // ❌ Esto daría error de compilación porque 'gravedad' es constante
        }
    }
}