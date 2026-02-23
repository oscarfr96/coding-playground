using System;
using System.Diagnostics.Contracts;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("🚀 C# From Zero To Hero");

        RunExercises();
    }

    static void RunExercises()
    {
        Console.WriteLine("Exercise 1: Variables");
        Variables();

        Console.WriteLine("\nExercise 2: Type Casting");
        TypeCasting();

        Console.WriteLine("\nExercise 3: Operadores aritméticos");
        OperadoresAritmeticos();

        Console.WriteLine("\nExercise 4: Clase Math");
        ClaseMath();

        Console.WriteLine("\nExercise 5: Numeros aleatorios");
        NumerosAleatorios();

        Console.WriteLine("\nExercise 6: String Methods");
        StringMethods();

        Console.WriteLine("\nExercise 7: If Statements");
        IfStatements();
    }

    static void Variables()
    {
        // ============================
        // TIPOS DE DATOS BÁSICOS
        // ============================

        // Enteros (números sin decimales)
        int x = 20;
        int y = 5;

        // Operación matemática con enteros
        int suma = x + y;

        // Número con decimales
        double peso = 68.0;

        // Booleano: solo puede ser true o false
        // Aquí comparamos si la suma es igual al peso
        bool comparar = suma == peso;

        // Un solo carácter (usa comillas simples)
        char simbolo = 'A';

        // Texto (cadena de caracteres)
        string mensaje = "¡Hola, C#!";

        Console.WriteLine($"Suma = {suma}");
        Console.WriteLine($"Tu peso es = {peso}");
        Console.WriteLine($"¿La suma es igual a tu peso? {comparar}");
        Console.WriteLine($"El símbolo es = {simbolo}");
        Console.WriteLine(mensaje);


        // ============================
        // CONSTANTES
        // ============================

        // Una constante NO puede cambiar su valor
        const double gravedad = 9.8;

        // gravedad = 10; 
        // ❌ Esto daría error de compilación porque 'gravedad' es constante
    }

    static void TypeCasting()
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

    static void OperadoresAritmeticos()
    {
        // ============================
        // OPERADORES BÁSICOS
        // ============================

        int a = 10;
        int b = 3;

        Console.WriteLine($"Suma: {a} + {b} = {a + b}");
        Console.WriteLine($"Resta: {a} - {b} = {a - b}");
        Console.WriteLine($"Multiplicación: {a} * {b} = {a * b}");
        Console.WriteLine($"División entera: {a} / {b} = {a / b}"); // 10 / 3 = 3 (pierde decimal)
        Console.WriteLine($"Módulo (resto): {a} % {b} = {a % b}"); // 10 % 3 = 1


        // ============================
        // IMPORTANTE: División con decimales
        // ============================

        double divisionReal = (double)a / b; // forzamos división decimal
        Console.WriteLine($"División real: {divisionReal}");


        // ============================
        // OPERADORES DE ASIGNACIÓN COMPUESTA
        // ============================

        int gatos = 3;

        gatos = gatos + 4;   // forma clásica
        gatos += 4;          // forma abreviada

        gatos = gatos - 1;
        gatos -= 1;

        gatos = gatos * 2;
        gatos *= 2;

        gatos = gatos / 2;
        gatos /= 2;

        // ============================
        // OPERADOR MÓDULO (%)
        // ============================

        // El operador % devuelve el RESTO de una división.
        // Muy usado para saber si un número es PAR o IMPAR.

        gatos = gatos % 2;  // forma larga: obtiene el resto de dividir gatos entre 2 (0 = par, 1 = impar)
        gatos %= 2;         // forma abreviada: exactamente lo mismo

        if (gatos % 2 == 0)
        {
            Console.WriteLine("Número par");
        }
        else
        {
            Console.WriteLine("Número impar");
        }

        // ============================
        // INCREMENTO Y DECREMENTO
        // ============================

        int numero = 5;

        numero++; // aumenta 1
        numero--; // disminuye 1


        // Diferencia entre POST y PRE incremento
        int x = 5;

        int post = x++; // primero usa 5, luego incrementa a 6
        int pre = ++x;  // primero incrementa, luego usa el valor

        Console.WriteLine($"Post incremento: {post}");
        Console.WriteLine($"Pre incremento: {pre}");


        // ============================
        // OPERADORES UNARIOS
        // ============================

        int positivo = +a;  // no cambia nada
        int negativo = -a;  // cambia el signo


        // ============================
        // CHECKED / UNCHECKED (OVERFLOW)
        // ============================

        int max = int.MaxValue;

        try
        {
            checked
            {
                int overflow = max + 1; // lanzará excepción
            }
        }
        catch (OverflowException)
        {
            Console.WriteLine("Overflow detectado!");
        }


        // ============================
        // RESUMEN MENTAL
        // ============================

        /*
            +  → suma
            -  → resta
            *  → multiplicación
            /  → división
            %  → resto

            += -= *= /= %=  → asignación abreviada

            ++  → incrementa 1
            --  → decrementa 1

            (double)a / b → fuerza división decimal

            checked → detecta overflow
        */
    }

    static void ClaseMath()
    {
        // ============================
        // CLASE MATH (System.Math)
        // ============================
        // Contiene métodos estáticos para operaciones matemáticas.
        // No necesitas instanciarla: se usa directamente como Math.Metodo()

        double numero = 3.7;

        Console.WriteLine($"Valor original: {numero}");

        // ============================
        // REDONDEOS
        // ============================

        Console.WriteLine($"Ceiling (redondea hacia arriba): {Math.Ceiling(numero)}");   // 4
        Console.WriteLine($"Floor (redondea hacia abajo): {Math.Floor(numero)}");       // 3
        Console.WriteLine($"Round (redondeo estándar): {Math.Round(numero)}");          // 4

        // Round con decimales específicos
        Console.WriteLine($"Round a 1 decimal: {Math.Round(numero, 1)}");

        // ============================
        // VALOR ABSOLUTO
        // ============================

        Console.WriteLine($"Valor absoluto de -5: {Math.Abs(-5)}");

        // ============================
        // POTENCIAS Y RAÍCES
        // ============================

        Console.WriteLine($"2 elevado a 3: {Math.Pow(2, 3)}");
        Console.WriteLine($"Raíz cuadrada de 16: {Math.Sqrt(16)}");

        // ============================
        // MÁXIMO Y MÍNIMO
        // ============================

        double y = 10;

        Console.WriteLine($"Máximo entre {numero} y {y}: {Math.Max(numero, y)}");
        Console.WriteLine($"Mínimo entre {numero} y {y}: {Math.Min(numero, y)}");

        // ============================
        // CONSTANTES MATEMÁTICAS
        // ============================

        Console.WriteLine($"PI: {Math.PI}");
        Console.WriteLine($"Número e: {Math.E}");

        // ============================
        // TRIGONOMETRÍA (usa radianes)
        // ============================

        double angulo = 30;

        // Convertimos grados → radianes
        double radianes = angulo * Math.PI / 180;

        Console.WriteLine($"Seno de 30°: {Math.Sin(radianes)}");
        Console.WriteLine($"Coseno de 30°: {Math.Cos(radianes)}");
        Console.WriteLine($"Tangente de 30°: {Math.Tan(radianes)}");

        // ============================
        // LOGARITMOS
        // ============================

        Console.WriteLine($"Log natural de 10: {Math.Log(10)}");     // ln
        Console.WriteLine($"Log base 10 de 100: {Math.Log10(100)}");

        // ============================
        // TRUNCAR DECIMALES
        // ============================

        Console.WriteLine($"Truncate (elimina decimales sin redondear): {Math.Truncate(numero)}");

        // ============================
        // SIGNO DE UN NÚMERO
        // ============================

        Console.WriteLine($"Signo de -15: {Math.Sign(-15)}"); // -1
        Console.WriteLine($"Signo de 0: {Math.Sign(0)}");     // 0
        Console.WriteLine($"Signo de 20: {Math.Sign(20)}");   // 1


        // ============================
        // RESUMEN MENTAL
        // ============================

        /*
            Math.Ceiling()   → redondea hacia arriba
            Math.Floor()     → redondea hacia abajo
            Math.Round()     → redondeo estándar (3.7 → 4)
            Math.Abs()       → valor absoluto
            Math.Pow()       → potencia
            Math.Sqrt()      → raíz cuadrada
            Math.Max()       → mayor valor
            Math.Min()       → menor valor
            Math.PI          → constante π
            Math.E           → constante e
            Math.Sin()       → seno (radianes)
            Math.Log()       → log natural
            Math.Truncate()  → elimina decimales (3.7 → 3)
            Math.Sign()      → devuelve -1, 0 o 1
        */
    }

    static void NumerosAleatorios()
    {
        // ============================
        // NÚMEROS ALEATORIOS
        // ============================
        // La clase Random se usa para generar números aleatorios.

        Random rnd = new Random();

        // Número entero aleatorio entre 0 (inclusive) y 100 (EXCLUSIVE) <- esto es, entre 0 y 99
        int numeroEntero = rnd.Next(0, 100);
        Console.WriteLine($"Número entero aleatorio (0-99): {numeroEntero}");

        // Número decimal aleatorio entre 0.0 y 1.0
        double numeroDecimal = rnd.NextDouble();
        Console.WriteLine($"Número decimal aleatorio (0.0-1.0): {numeroDecimal}");

        // Número entero aleatorio entre 1 y 10
        int dado = rnd.Next(1, 11); // el límite superior es exclusivo
        Console.WriteLine($"Tirada de dado (1-10): {dado}");
    }

    static void StringMethods()
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


        // ============================
        // RESUMEN MENTAL
        // ============================

        /*
            ToUpper() / ToLower()
            Replace()
            Insert()
            Length
            Substring()
            Contains()
            StartsWith() / EndsWith()
            IndexOf()
            Trim()
            Split()
            string es INMUTABLE: cada vez que lo “modificas”, C# crea una cadena nueva en memoria; 
                el texto original nunca cambia.
        */
    }

    static void IfStatements()
    {
        // ============================
        // IF STATEMENTS (CONDICIONALES)
        // ============================

        int edad = 20;

        if (edad < 18)
        {
            Console.WriteLine("Eres menor de edad");
        }
        else if (edad >= 18 && edad < 65)
        {
            Console.WriteLine("Eres adulto");
        }
        else
        {
            Console.WriteLine("Eres adulto mayor");
        }

        // ============================
        // OPERADORES LÓGICOS
        // ============================

        bool esEstudiante = true;
        bool tieneDescuento = false;

        if (esEstudiante || tieneDescuento)
        {
            Console.WriteLine("Tienes derecho a descuento");
        }
    }


}