// Diferencia entre clase y objeto:
// Una clase define la estructura y el comportamiento de un tipo de dato.
// Un objeto es una instancia de esa clase, con valores propios.
// Ejemplo: 'Humano' es la clase, y 'humano1 = new Humano("Alice", 28, "Femenino")' es un objeto.

// Tipos de clase en C#:
// public: accesible desde cualquier parte del proyecto.
// private: accesible solo dentro del archivo o clase donde se declara (solo válido para clases anidadas).
// static: no se puede instanciar, solo contiene miembros estáticos.
// abstract: no se puede instanciar, sirve como base para otras clases.
// sealed: no se puede heredar.
// partial: permite dividir la definición de la clase en varios archivos.

// Definición de la clase Humano
public class Humano
{
    // Propiedades: características del humano
    public string Nombre { get; set; } 
    public int Edad { get; set; }
    public string Genero { get; set; }

    #region Ejemplo de propiedad con getter y setter personalizado
    
    private string _pais;
    public string Pais
    {
        get
        {
            // Getter: devuelve el país en mayúsculas
            return _pais != null ? _pais.ToUpper() : "DESCONOCIDO";
        }
        set
        {
            // Setter: solo permite asignar si no está vacío
            if (!string.IsNullOrWhiteSpace(value))
                _pais = value;
            else
                _pais = "Desconocido";
        }
    }

    // Ejemplo de propiedad autoimplementada
    // No tiene lógica personalizada, el compilador crea el campo automáticamente
    public string EjemploAutoPropiedad { get; set; }

    #endregion

    // Constructor: método especial para crear objetos Humano
    public Humano(string nombre, int edad, string genero)
    {
        // Asignación de valores a las propiedades al crear el objeto
        Nombre = nombre;
        Edad = edad;
        Genero = genero;
    }

    // Constructor sobrecargado: permite crear un Humano solo con nombre y edad
    // La sobrecarga de constructores es cuando tienes varios constructores con diferentes parámetros
    // Así puedes crear objetos de distintas formas según la información disponible
    public Humano(string nombre, int edad)
    {
        Nombre = nombre;
        Edad = edad;
        Genero = "No especificado";
    }

    // Método: acción que puede realizar el humano
    public void Saludar()
    {
        Console.WriteLine($"¡Hola, soy {Nombre} y tengo {Edad} años!");
    }

    // Otro método: acción de comer
    public void Comer(string comida)
    {
        Console.WriteLine($"{Nombre} está comiendo {comida}.");
    }
}

# region Clase estática

// ¿Cuándo y cómo se usan las clases static?
    // Las clases static se usan para funciones o datos generales, que no dependen de un objeto específico.
    // Por ejemplo, para llevar estadísticas, cálculos, validaciones o mostrar mensajes globales.
// No necesitas crear un objeto para usar sus métodos, solo llamas directamente:
// HumanoUtilidades.MostrarBienvenidaGlobal();
// HumanoUtilidades.RegistrarSaludo();
// Console.WriteLine(HumanoUtilidades.TotalSaludos);

// Ejemplo de clase estática relacionada con Humano
// Una clase static no se puede instanciar (no puedes crear objetos de ella)
// Solo contiene miembros estáticos, que se usan directamente desde la clase
public static class HumanoUtilidades
{
    // Propiedad estática: cuenta cuántos saludos se han hecho en total
    public static int TotalSaludos { get; private set; } = 0;

    // Método estático: muestra un mensaje de bienvenida general para humanos
    public static void MostrarBienvenidaGlobal()
    {
        Console.WriteLine("¡Bienvenido, ser humano!");
    }

    // Método estático: registra un saludo y aumenta el contador
    public static void RegistrarSaludo()
    {
        TotalSaludos++;
        Console.WriteLine($"Se ha registrado un saludo. Total: {TotalSaludos}");
    }
}

# endregion

