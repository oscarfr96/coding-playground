using System;

namespace Ejercicios
{
    public static class MetodosEjercicio
    {
        public static void Ejecutar()
        {
            // ################ MÉTODOS ################
            //Nombre + parámetros = signature

            // SOBRECARGA DE MÉTODOS (METHOD OVERLOADING)
            // Podemos tener varios métodos con el mismo nombre pero diferente número o tipo de parámetros.
            double resultado1 = Multiplicar(2, 3);
            double resultado2 = Multiplicar(2, 3, 4);
            Console.WriteLine($"Multiplicar 2*3 = {resultado1}");
            Console.WriteLine($"Multiplicar 2*3*4 = {resultado2}");

            int suma = Sumar(1, 2, 3, 4); // suma = 10
            Console.WriteLine($"Sumar 1+2+3+4 = {suma}");
        }

        // SOBRECARGA DE MÉTODOS
        static double Multiplicar(double a, double b)
        {
            return a * b;
        }

        static double Multiplicar(double a, double b, double c)
        {
            return a * b * c;
        }

        // PARAMS
        static int Sumar(params int[] numeros)
        {
            int suma = 0;
            foreach (int num in numeros)
            {
                suma += num;
            }
            return suma;
        }
    }
}