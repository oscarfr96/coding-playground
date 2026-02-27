using System;

namespace from_zero_to_hero._02_ControlFlow
{
    public static class OperadoresLogicosYComparacionEjercicio
    {
        public static void Ejecutar()
        {
            // ============================
            // IF / ELSE IF / ELSE
            // ============================

            int edad = 20;

            if (edad < 18)
            {
                Console.WriteLine("Eres menor de edad");
            }
            else if (edad >= 18 && edad < 65)
            {
                Console.WriteLine("Eres adulto");
            }
            else
            {
                Console.WriteLine("Eres adulto mayor");
            }


            // ============================
            // COMPARACIÓN DE STRINGS
            // ============================

            string nombre = "Oscar";

            if (nombre == "Oscar")
            {
                Console.WriteLine("¡Hola, Oscar!");
            }
            else
            {
                Console.WriteLine("¡Hola, desconocido!");
            }


            // ============================
            // OPERADORES DE COMPARACIÓN
            // ============================

            int numero = 10;

            if (numero != 5)
            {
                Console.WriteLine("No es cinco");
            }


            // ============================
            // OPERADORES LÓGICOS
            // ============================

            bool esEstudiante = true;
            bool tieneDescuento = false;

            if (esEstudiante || tieneDescuento)
            {
                Console.WriteLine("Tienes derecho a descuento");
            }


            // ============================
            // OPERADOR NOT (!)
            // ============================

            bool estaLogueado = false;

            if (!estaLogueado)
            {
                Console.WriteLine("Usuario NO logueado");
            }


            // ============================
            // IF SIMPLIFICADO (UNA SOLA LÍNEA)
            // ============================

            int puntos = 80;

            if (puntos >= 50)
                Console.WriteLine("Aprobado");


            // ============================
            // OPERADOR TERNARIO
            // ============================
            // Forma corta de if / else

            int edad2 = 17;

            string resultado = edad2 >= 18 ? "Mayor de edad" : "Menor de edad";

            Console.WriteLine(resultado);


            // ============================
            // BUENA PRÁCTICA: Early Return
            // ============================

            bool autorizado = false;

            if (!autorizado)
            {
                Console.WriteLine("Acceso denegado");
                return; // salimos del método cuanto antes
            }

            Console.WriteLine("Acceso permitido");
        }
    }
}