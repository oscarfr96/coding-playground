// Ejercicio: Diccionarios en C#
// Un diccionario permite almacenar pares clave-valor, como un mini base de datos.

using System;
using System.Collections.Generic;

public static class DiccionarioEjercicio
{
    public static void Ejecutar()
    {
        // Crear un diccionario de string a int
        Dictionary<string, int> edades = new Dictionary<string, int>();
        edades["Ana"] = 25;
        edades["Luis"] = 30;
        edades["Sofía"] = 22;

        // Acceder a un valor por su clave
        Console.WriteLine($"Edad de Luis: {edades["Luis"]}");

        // Recorrer el diccionario
        Console.WriteLine("\nTodas las edades:");
        foreach (var par in edades)
        {
            Console.WriteLine($"Nombre: {par.Key}, Edad: {par.Value}");
        }

        // Comprobar si existe una clave
        Console.WriteLine($"¿Existe 'Ana'? {edades.ContainsKey("Ana")}");

        // Eliminar una clave
        edades.Remove("Luis");
        Console.WriteLine("\nDespués de eliminar 'Luis':");
        foreach (var par in edades)
        {
            Console.WriteLine($"Nombre: {par.Key}, Edad: {par.Value}");
        }
    }
}

// Explicación:
// Los diccionarios permiten búsquedas rápidas por clave y son útiles para asociar datos.
// Puedes usar cualquier tipo como clave o valor, según tus necesidades.
