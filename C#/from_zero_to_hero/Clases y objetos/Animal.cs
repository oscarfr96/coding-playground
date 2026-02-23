// Ejemplo de clase abstracta en C#
// Una clase abstracta no se puede instanciar directamente.
// Sirve como base para otras clases y puede tener métodos abstractos (sin implementación) y métodos normales (con implementación).
public abstract class Animal
{
    // Propiedad común a todos los animales
    public string Nombre { get; set; }

    // Constructor de la clase base
    public Animal(string nombre)
    {
        Nombre = nombre;
    }

    // Método abstracto: debe ser implementado por las clases derivadas
    public abstract void HacerSonido();

    // Método normal: puede tener implementación
    public void Comer()
    {
        Console.WriteLine($"{Nombre} está comiendo.");
    }
}

// Clase derivada que implementa el método abstracto
public class Perro : Animal
{
    public Perro(string nombre) : base(nombre) {}

    public override void HacerSonido()
    {
        Console.WriteLine($"{Nombre} dice: ¡Guau!");
    }
}

// Explicación:
// Animal es una clase abstracta, no se puede crear un objeto Animal directamente.
// Perro hereda de Animal y debe implementar el método abstracto HacerSonido.
// Así se obliga a las clases derivadas a definir ciertos comportamientos.
