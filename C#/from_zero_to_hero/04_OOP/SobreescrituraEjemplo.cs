namespace from_zero_to_hero._04_OOP;

// Ejemplo de sobreescritura (override) en C#
// La sobreescritura permite modificar el comportamiento de un método heredado de una clase base.

public class AnimalBase
{
    public virtual void HacerSonido()
    {
        Console.WriteLine("Sonido genérico de animal.");
    }
}

public class Gato : AnimalBase
{
    // Sobreescribimos el método HacerSonido de la clase base
    public override void HacerSonido()
    {
        Console.WriteLine("El gato dice: Miau");
    }
}

// Explicación:
// AnimalBase tiene un método virtual que puede ser sobreescrito.
// Gato hereda de AnimalBase y redefine el método para un comportamiento específico.
// Así, al llamar HacerSonido en un Gato, se ejecuta la versión sobreescrita.
