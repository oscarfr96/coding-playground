namespace from_zero_to_hero._04_OOP;

// Ejemplo de polimorfismo en C#
// Polimorfismo permite que objetos de distintas clases respondan de manera diferente al mismo método.

public class AnimalPoli
{
    public virtual void HacerSonido()
    {
        Console.WriteLine("Sonido genérico de animal.");
    }
}

public class PerroPoli : AnimalPoli
{
    public override void HacerSonido()
    {
        Console.WriteLine("El perro dice: Guau");
    }
}

public class GatoPoli : AnimalPoli
{
    public override void HacerSonido()
    {
        Console.WriteLine("El gato dice: Miau");
    }
}

// Ejemplo de uso:
// AnimalPoli[] animales = { new PerroPoli(), new GatoPoli(), new AnimalPoli() };
// foreach (var animal in animales)
// {
//     animal.HacerSonido(); // Cada uno ejecuta su versión del método
// }
// Explicación:
// Aunque el array es de tipo AnimalPoli, cada objeto ejecuta su propio método HacerSonido.
