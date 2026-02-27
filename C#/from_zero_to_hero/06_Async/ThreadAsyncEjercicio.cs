namespace from_zero_to_hero._06_Async;

// Ejercicio: Thread, Multithreading y Async/Await en C#
// Comparación entre threads y tareas asíncronas con async/await.

using System;
using System.Threading;
using System.Threading.Tasks;

public static class ThreadAsyncEjercicio
{
    // Método que simula una tarea (para threads)
    static void TareaThread(string nombre)
    {
        for (int i = 1; i <= 3; i++)
        {
            Console.WriteLine($"{nombre} (Thread): paso {i}");
            Thread.Sleep(500);
        }
    }

    // Método asíncrono (para async/await)
    // Un Task representa una tarea asíncrona, que puede ejecutarse en segundo plano.
    // Permite trabajar con operaciones que pueden tardar (descargas, esperas, cálculos) sin bloquear el hilo principal.
    // Los Task se usan junto a async/await para facilitar la concurrencia y el paralelismo.
    static async Task TareaAsync(string nombre)
    {
        for (int i = 1; i <= 3; i++)
        {
            Console.WriteLine($"{nombre} (Async): paso {i}");
            await Task.Delay(500);
        }
    }

    public static void Ejecutar()
    {
        // Ejecución secuencial (una tarea tras otra)
        Console.WriteLine("Ejecución secuencial:");
        TareaThread("Secuencial 1");
        TareaThread("Secuencial 2");
        TareaThread("Secuencial 3");

        // Ejecución con threads
        Console.WriteLine("\nEjecución con threads:");
        Thread thread1 = new Thread(() => TareaThread("Thread 1"));
        Thread thread2 = new Thread(() => TareaThread("Thread 2"));
        // Start inicia la ejecución del thread en paralelo
        thread1.Start();
        thread2.Start();
        TareaThread("Principal");
        // Join espera a que el thread termine antes de continuar
        thread1.Join();
        thread2.Join();

        // Ejecución con async/await
        Console.WriteLine("\nEjecución con async/await:");
        Task tarea1 = TareaAsync("Async 1");
        Task tarea2 = TareaAsync("Async 2");
        TareaAsync("Principal").Wait();
        Task.WaitAll(tarea1, tarea2);

        Console.WriteLine("\nTodas las tareas han terminado.");
    }
}

// Explicación:
// Los threads ejecutan tareas en paralelo, gestionados por el sistema operativo.
// Async/await permite ejecutar tareas asíncronas, ideal para operaciones que esperan (I/O, red, etc).
// Ambos mejoran el rendimiento, pero async/await es más fácil de usar y evita bloquear el hilo principal.
