namespace from_zero_to_hero._03_DataStructures;

// Ejercicio: Listas en C#
// Este ejercicio muestra cómo crear y usar una lista, y la diferencia con un array.

using System;
using System.Collections.Generic;

public static class ListasEjercicio
{
    public static void Ejecutar()
    {
        // Crear una lista de strings
        List<string> nombres = new List<string>();
        nombres.Add("Ana");
        nombres.Add("Luis");
        nombres.Add("Sofía");

        // Recorrer la lista
        Console.WriteLine("Lista de nombres:");
        foreach (string nombre in nombres)
        {
            Console.WriteLine(nombre);
        }

        // Diferencia con un array
        string[] arrayNombres = { "Ana", "Luis", "Sofía" };
        Console.WriteLine("\nArray de nombres:");
        foreach (string nombre in arrayNombres)
        {
            Console.WriteLine(nombre);
        }

        // Explicación:
        Console.WriteLine("\nDiferencias entre lista y array:");
        Console.WriteLine("- Una lista puede crecer o reducir su tamaño dinámicamente.");
        Console.WriteLine("- Un array tiene tamaño fijo y no se puede cambiar después de crear.");
        Console.WriteLine("- Las listas tienen métodos útiles como Add, Remove, etc.");

        #region Métodos útiles de List
        Console.WriteLine("\n--- Métodos útiles de List ---");

        // .Count: cantidad de elementos
        Console.WriteLine($"Cantidad de nombres: {nombres.Count}");

        // .IndexOf: posición de un elemento
        int indiceLuis = nombres.IndexOf("Luis");
        Console.WriteLine($"Índice de 'Luis': {indiceLuis}");

        // .Insert: insertar en una posición
        nombres.Insert(1, "Marta"); // Inserta 'Marta' en la posición 1
        Console.WriteLine("Lista tras insertar 'Marta' en posición 1:");
        foreach (string nombre in nombres)
            Console.WriteLine(nombre);

        // .Remove: eliminar un elemento
        nombres.Remove("Ana");
        Console.WriteLine("Lista tras eliminar 'Ana':");
        foreach (string nombre in nombres)
            Console.WriteLine(nombre);

        // .Contains: comprobar si existe
        Console.WriteLine($"¿La lista contiene 'Sofía'? {nombres.Contains("Sofía")}");

        // .Sort: ordenar la lista
        nombres.Sort();
        Console.WriteLine("Lista ordenada:");
        foreach (string nombre in nombres)
            Console.WriteLine(nombre);

        // .Reverse: invertir el orden
        nombres.Reverse();
        Console.WriteLine("Lista invertida:");
        foreach (string nombre in nombres)
            Console.WriteLine(nombre);

        // .Clear: vaciar la lista
        nombres.Clear();
        Console.WriteLine($"Lista vacía, cantidad de elementos: {nombres.Count}");
        
        #endregion
    }
}

/* En memoria, un array es más eficiente porque su tamaño es fijo y los elementos están contiguos.
 Una lista usa más memoria porque internamente gestiona un array dinámico y puede crecer, pero 
 te da mucha comodidad y flexibilidad. 
 En la mayoría de los casos, usarás listas por su facilidad de uso, a menos que necesites 
 optimizar al máximo el rendimiento y sepas que el tamaño no cambiará. */
