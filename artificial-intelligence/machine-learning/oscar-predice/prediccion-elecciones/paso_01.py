"""Paso 1: leer un dato documentado y medir el error de un sondeo.

Ejecutar desde cualquier carpeta: python ruta/al/proyecto/paso_01.py
Los porcentajes se almacenan en escala 0..100.
"""
import json
from pathlib import Path

BASE = Path(__file__).resolve().parent


def main():
    ejemplo = json.loads((BASE / "datos" / "ejemplo_2023.json").read_text(encoding="utf-8"))
    fuentes = json.loads((BASE / "datos" / "fuentes.json").read_text(encoding="utf-8"))

    estimacion = ejemplo["estimacion_pct"]
    resultado = ejemplo["resultado_pct"]
    error_pp = resultado - estimacion

    print("PASO 1: medir el error de un sondeo")
    print(f'Eleccion: {ejemplo["eleccion"]} | Casa: {ejemplo["encuestadora"]}')
    print(f'Partido: {ejemplo["partido"]}')
    print(f"Estimacion: {estimacion:.2f}%")
    print(f"Resultado: {resultado:.2f}%")
    print(f"Error = resultado - estimacion: {error_pp:+.2f} puntos porcentuales")
    print("Un error positivo significa que el sondeo infravaloro al partido.")
    print("Es un ejemplo individual; no es una correccion para 2026.")
    print()
    print(f'Casas candidatas en el inventario: {len(fuentes["encuestadoras"])}')
    print("Pendiente: verificar las ultimas encuestas y construir el promedio.")


if __name__ == "__main__":
    main()
