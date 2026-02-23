// Ejercicio: Thread y Multithreading en C#
// Los threads permiten ejecutar tareas en paralelo, mejorando el rendimiento en ciertas situaciones.

using System;
using System.Threading;

public static class ThreadEjercicio
{
    // Método que simula una tarea
    static void Tarea(string nombre)
    {
        for (int i = 1; i <= 3; i++)
        {
            Console.WriteLine($"{nombre}: paso {i}");
            Thread.Sleep(500); // Espera 0.5 segundos
        }
    }

    public static void Ejecutar()
    {
        // Ejecución normal (secuencial)
        Console.WriteLine("Ejecución secuencial:");
        Tarea("Principal");

        // Ejecución en paralelo con threads
        Console.WriteLine("\nEjecución con threads:");
        Thread thread1 = new Thread(() => Tarea("Thread 1"));
        Thread thread2 = new Thread(() => Tarea("Thread 2"));

        thread1.Start();
        thread2.Start();

        // El hilo principal sigue ejecutándose
        Tarea("Principal");

        // Esperar a que los threads terminen
        thread1.Join();
        thread2.Join();

        Console.WriteLine("\nTodos los threads han terminado.");
    }
}

// Explicación:
// Los threads permiten ejecutar varias tareas al mismo tiempo.
// Útil para operaciones largas, procesamiento paralelo, etc.
// Hay que tener cuidado con el acceso a datos compartidos (pueden ocurrir errores de concurrencia).
