// Ejemplo de herencia en C#
// Herencia permite que una clase derive de otra, heredando sus propiedades y métodos.
// La clase base es Humano, y la clase derivada es Estudiante.
public class Estudiante : Humano
{
    // Propiedad específica de Estudiante
    public string Escuela { get; set; }

    // Constructor que usa el constructor base (Humano)
    public Estudiante(string nombre, int edad, string genero, string escuela)
        : base(nombre, edad, genero)
    {
        Escuela = escuela;
    }

    // Constructor sobrecargado para Estudiante
    public Estudiante(string nombre, int edad, string escuela)
        : base(nombre, edad)
    {
        Escuela = escuela;
    }

    // Método específico de Estudiante
    public void Estudiar(string materia)
    {
        Console.WriteLine($"{Nombre} está estudiando {materia} en {Escuela}.");
    }
}

// Explicación:
// Estudiante hereda de Humano, por lo que tiene todas sus propiedades y métodos.
// Además, puede tener propiedades y métodos propios.
// Esto permite reutilizar y extender el código de la clase base.
