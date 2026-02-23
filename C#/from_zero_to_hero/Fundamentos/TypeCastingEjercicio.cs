using System;

namespace Ejercicios
{
    public static class TypeCastingEjercicio
    {
        public static void Ejecutar()
        {
            // ============================
            // CONVERSIONES BÁSICAS (CASTING)
            // ============================

            double gravedad = 9.8;

            // CASTING EXPLÍCITO (puede perder información)
            // Convierte double → int (se pierde el decimal: 9.8 pasa a 9)
            int entero = (int)gravedad;

            // Usando Convert (redondea automáticamente)
            int enteroConvert = Convert.ToInt32(gravedad); // 9.8 → 10

            // Convertir número a string
            string gravedadTexto = gravedad.ToString();


            // ============================
            // GUID
            // ============================

            string guidTexto = "123e4567-e89b-12d3-a456-426614174000";

            Guid miGuid = Guid.Parse(guidTexto);

            Console.WriteLine($"Guid convertido: {miGuid}");


            // ============================
            // TRY PARSE (FORMA SEGURA)
            // ============================
            // NO lanza excepciones si falla

            string posibleNumero = "abc";

            bool ok = int.TryParse(posibleNumero, out int resultado);

            if (ok)
            {
                Console.WriteLine($"Número válido: {resultado}");
            }
            else
            {
                Console.WriteLine("No es un número válido");
            }


            // ============================
            // GetType() → VER TIPO EN TIEMPO DE EJECUCIÓN
            // ============================

            Console.WriteLine(gravedad.GetType());
            Console.WriteLine(gravedadTexto.GetType());


            // ============================
            // PARSE (PUEDE PETAR)
            // ============================
            // Si falla lanza excepción

            string edadTexto = "30";
            int edad = int.Parse(edadTexto);


            // ============================
            // CONVERSIÓN IMPLÍCITA
            // ============================
            // Siempre segura (tipo pequeño → grande)

            int pequeño = 5;
            double grande = pequeño; // OK automáticamente


            // ============================
            // CONVERSIÓN EXPLÍCITA
            // ============================
            // Puede perder datos (tipo grande → pequeño)

            double precio = 19.99;
            int precioEntero = (int)precio; // 19
        }
    }
}