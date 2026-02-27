namespace from_zero_to_hero._05_Advanced;

// Ejercicio: Enums en C#
// Un enum es un tipo especial que permite definir un conjunto de valores constantes con nombre.

using System;

public static class EnumsEjercicio
{
    // Definición de un enum para días de la semana
    public enum DiaSemana
    {
        Lunes,
        Martes,
        Miercoles,
        Jueves,
        Viernes,
        Sabado,
        Domingo
    }

    public static void Ejecutar()
    {
        // Usar el enum
        DiaSemana hoy = DiaSemana.Miercoles;
        Console.WriteLine($"Hoy es: {hoy}");

        // Convertir enum a int
        int valorNumerico = (int)hoy;
        Console.WriteLine($"Valor numérico de {hoy}: {valorNumerico}");

        // Recorrer todos los valores del enum
        Console.WriteLine("\nTodos los días de la semana:");
        foreach (DiaSemana dia in Enum.GetValues(typeof(DiaSemana)))
        {
            Console.WriteLine($"{dia} ({(int)dia})");
        }
    }
}

// Explicación:
// Los enums ayudan a escribir código más legible y seguro, evitando valores mágicos.
// Puedes usarlos para representar estados, opciones, categorías, etc.
