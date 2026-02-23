// Ejercicio: Array de objetos
// Este ejercicio muestra cómo crear y usar un array de objetos Humano

using System;

public static class ArrayObjetosEjercicio
{
    public static void Ejecutar()
    {
        // ## Crear un array de objetos Humano
        Humano[] personas = new Humano[3];

        // Inicializar cada objeto en el array
        personas[0] = new Humano("Ana", 25, "Femenino");
        personas[1] = new Humano("Luis", 30, "Masculino");
        personas[2] = new Humano("Sofía", 22, "Femenino");

        // Recorrer el array y mostrar información de cada persona
        Console.WriteLine("Lista de personas:");
        foreach (Humano persona in personas)
        {
            persona.Saludar();
        }

        // ## Ejemplo de array de objetos anónimos
        var mascotas = new[] {
            new { Nombre = "Max", Tipo = "Perro", Edad = 5 },
            new { Nombre = "Luna", Tipo = "Gato", Edad = 3 },
            new { Nombre = "Rex", Tipo = "Tortuga", Edad = 10 }
        };

        Console.WriteLine("\nLista de mascotas (objetos anónimos):");
        foreach (var mascota in mascotas)
        {
            Console.WriteLine($"Nombre: {mascota.Nombre}, Tipo: {mascota.Tipo}, Edad: {mascota.Edad}");
        }
    }
}

// Explicación:
// Se crea un array de Humano, se inicializa cada elemento y se recorre para mostrar información.
// También se muestra un ejemplo de array de objetos anónimos.  
// Así puedes trabajar con colecciones de objetos en C#.
