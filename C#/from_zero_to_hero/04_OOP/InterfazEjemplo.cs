namespace from_zero_to_hero._04_OOP;

// Ejemplo de interfaz en C#
// Una interfaz define un contrato: métodos y propiedades que una clase debe implementar.

public interface IVehiculo
{
    void Conducir();
    int VelocidadMaxima { get; }
}

public class Coche : IVehiculo
{
    public int VelocidadMaxima { get; private set; }

    public Coche(int velocidadMaxima)
    {
        VelocidadMaxima = velocidadMaxima;
    }

    public void Conducir()
    {
        Console.WriteLine($"Conduciendo el coche a {VelocidadMaxima} km/h");
    }
}

// Explicación:
// IVehiculo es una interfaz, Coche la implementa y define los métodos y propiedades requeridos.
// Así se garantiza que cualquier clase que implemente IVehiculo tendrá esos miembros.

// Diferencia entre clase abstracta e interfaz:
// - Una clase abstracta puede tener métodos implementados y propiedades, pero no se puede instanciar.
// - Una interfaz solo define métodos y propiedades, sin implementación.
// - Una clase puede heredar de una sola clase abstracta, pero puede implementar varias interfaces.

// Ejemplo de clase abstracta y comparación:
public abstract class AnimalAbstracto
{
    public abstract void HacerSonido(); // método sin implementación
    public void Dormir() // método con implementación
    {
        Console.WriteLine("El animal duerme.");
    }
}

public class PerroAbstracto : AnimalAbstracto, IVehiculo
{
    public override void HacerSonido()
    {
        Console.WriteLine("El perro dice: Guau");
    }

    // Dormir(); // No se puede llamar a métodos directamente en el cuerpo de la clase

    public int VelocidadMaxima { get; private set; } = 20;
    public void Conducir()
    {
        Console.WriteLine("El perro corre a 20 km/h");
    }
}

// Así, PerroAbstracto hereda de una clase abstracta y también implementa una interfaz.
