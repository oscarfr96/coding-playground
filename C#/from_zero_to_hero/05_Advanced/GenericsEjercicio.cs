namespace from_zero_to_hero._05_Advanced;

// Ejercicio: Generics en C#
// Los generics permiten crear clases y métodos que funcionan con cualquier tipo de dato.

using System;

public class Caja<T>
{
    // T es un tipo genérico
    public T Contenido { get; set; }

    public Caja(T contenido)
    {
        Contenido = contenido;
    }

    public void MostrarContenido()
    {
        Console.WriteLine($"La caja contiene: {Contenido}");
    }
}

public static class GenericsEjercicio
{
    public static void Ejecutar()
    {
        // Crear una caja de int
        Caja<int> cajaEnteros = new Caja<int>(42);
        cajaEnteros.MostrarContenido();

        // Crear una caja de string
        Caja<string> cajaTexto = new Caja<string>("Hola mundo");
        cajaTexto.MostrarContenido();

        // Crear una caja de Humano (si tienes la clase Humano)
        // Caja<Humano> cajaHumano = new Caja<Humano>(new Humano("Oscar", 30, "Masculino"));
        // cajaHumano.MostrarContenido();
    }
}

// Explicación:
// Los generics permiten reutilizar código y trabajar con cualquier tipo, sin duplicar clases o métodos.
// Ejemplo: List<T>, Dictionary<TKey, TValue>, etc.
