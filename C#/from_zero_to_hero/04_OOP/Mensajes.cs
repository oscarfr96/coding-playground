namespace from_zero_to_hero._04_OOP;

// ################ CLASES ################
    public class Mensajes
    {
        public static void Saludar(string nombre)
        {
            Console.WriteLine($"¡Hola, {nombre}!");
        }
        public static void Cargando()
        {
            Console.WriteLine("Cargando...");
        }
        public static void Despedir(string nombre)
        {
            Console.WriteLine($"¡Adiós, {nombre}!");
        }
    }