namespace from_zero_to_hero._04_OOP;

// Ejemplo de sobreescritura del método ToString en C#
// ToString permite definir cómo se representa un objeto como texto.

public class Persona
{
    public string Nombre { get; set; }
    public int Edad { get; set; }

    public Persona(string nombre, int edad)
    {
        Nombre = nombre;
        Edad = edad;
    }

    // Sobreescribimos ToString para mostrar información personalizada
    public override string ToString()
    {
        return $"Persona: {Nombre}, Edad: {Edad}";
    }
}

// Explicación:
// Al llamar ToString en un objeto Persona, se muestra el texto definido en el método sobreescrito.
// Ejemplo:
// Persona p = new Persona("Oscar", 30);
// Console.WriteLine(p); // Muestra: Persona: Oscar, Edad: 30
