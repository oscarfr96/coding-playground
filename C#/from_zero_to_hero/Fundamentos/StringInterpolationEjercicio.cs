using System;

namespace Ejercicios
{
    public static class StringInterpolationEjercicio
    {
        public static void Ejecutar()
        {
            // ============================
            // STRING INTERPOLATION
            // ============================
            // Es una forma fácil y legible de construir cadenas con variables.

            string nombre = "Oscar";
            int edad = 30;

            string mensaje = $"Hola, mi nombre es {nombre} y tengo {edad} años.";

            Console.WriteLine(mensaje);
        }
    }
}