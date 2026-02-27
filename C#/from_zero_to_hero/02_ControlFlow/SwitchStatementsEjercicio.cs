using System;

namespace from_zero_to_hero._02_ControlFlow
{
    public static class SwitchStatementsEjercicio
    {
        public static void Ejecutar()
        {
            // ============================
            // SWITCH / CASE
            // ============================

            string dia = "Lunes";

            switch (dia)
            {
                case "Lunes":
                    Console.WriteLine("Hoy es lunes");
                    break;
                case "Martes":
                    Console.WriteLine("Hoy es martes");
                    break;
                case "Miércoles":
                    Console.WriteLine("Hoy es miércoles");
                    break;
                default:
                    Console.WriteLine("No es un día válido");
                    break;
            }
        }
    }
}