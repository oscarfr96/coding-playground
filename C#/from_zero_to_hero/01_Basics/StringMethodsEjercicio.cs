using System;

namespace from_zero_to_hero._01_Basics
{
    public static class StringMethodsEjercicio
    {
        public static void Ejecutar()
        {
            // ============================
            // STRING EN C#
            // ============================
            // string es un tipo de referencia
            // Es INMUTABLE (cada modificación crea una nueva cadena)

            string fullName = "Oscar Fraile";

            // ============================
            // MAYÚSCULAS / MINÚSCULAS
            // ============================

            fullName = fullName.ToUpper();
            Console.WriteLine($"Mayúsculas: {fullName}");

            fullName = fullName.ToLower();
            Console.WriteLine($"Minúsculas: {fullName}");


            // ============================
            // REEMPLAZAR TEXTO
            // ============================

            string phoneNumber = "123-456-7890";

            phoneNumber = phoneNumber.Replace("-", "/");
            Console.WriteLine($"Teléfono formateado: {phoneNumber}");


            // ============================
            // INSERTAR TEXTO
            // ============================

            fullName = fullName.Insert(0, "@"); // Inserta "@" en la posición 0
            Console.WriteLine($"Nombre con símbolo: {fullName}");


            // ============================
            // LONGITUD
            // ============================

            Console.WriteLine($"Longitud: {fullName.Length}");


            // ============================
            // SUBSTRING
            // ============================
            // Substring(inicio, longitud)

            string sub = fullName.Substring(0, 5);
            Console.WriteLine($"Substring: {sub}");


            // ============================
            // CONTAINS (¿contiene texto?)
            // ============================

            bool contiene = fullName.Contains("oscar");
            Console.WriteLine($"¿Contiene 'oscar'? {contiene}");


            // ============================
            // STARTS WITH / ENDS WITH
            // ============================

            Console.WriteLine($"¿Empieza por '@'? {fullName.StartsWith("@")}");
            Console.WriteLine($"¿Termina en 'fraile'? {fullName.EndsWith("fraile")}");


            // ============================
            // INDEX OF (posición de texto)
            // ============================

            int posicion = fullName.IndexOf("fraile");
            Console.WriteLine($"Posición de 'fraile': {posicion}");


            // ============================
            // TRIM (eliminar espacios)
            // ============================

            string textoConEspacios = "   Hola Mundo   ";
            string limpio = textoConEspacios.Trim();
            Console.WriteLine($"Texto limpio: '{limpio}'");


            // ============================
            // SPLIT (dividir texto)
            // ============================

            string frase = "C# es muy potente";
            string[] palabras = frase.Split(" ");

            foreach (var palabra in palabras)
            {
                Console.WriteLine(palabra);
            }


            // ============================
            // INTERPOLACIÓN VS CONCATENACIÓN
            // ============================

            string nombre = "Oscar";

            string concatenacion = "Hola " + nombre;
            string interpolacion = $"Hola {nombre}";

            Console.WriteLine(concatenacion);
            Console.WriteLine(interpolacion);
        }
    }
}