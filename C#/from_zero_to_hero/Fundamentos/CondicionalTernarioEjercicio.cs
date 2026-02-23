using System;

namespace Ejercicios
{
    public static class CondicionalTernarioEjercicio
    {
        public static void Ejecutar()
        {
            // ============================
            // CONDICIONAL TERNARIO
            // ============================
            // Es una forma abreviada de escribir un if / else simple.

            int edad = 25;

            string resultado = edad >= 18 ? "Mayor de edad" : "Menor de edad";

            Console.WriteLine(resultado);
        }
    }
}