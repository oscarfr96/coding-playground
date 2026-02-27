# Conversor de temperatura entre Celsius y Fahrenheit según el input del usuario
temperatura = float(input("Ingrese la temperatura: "))
escala = input("Ingrese la escala (C o F): ").lower()

if escala == "c":
    fahrenheit = (temperatura * 9/5) + 32
    print(f"{temperatura}°C es igual a {fahrenheit}°F")
elif escala == "f":
    celsius = (temperatura - 32) * 5/9
    print(f"{temperatura}°F es igual a {celsius}°C")
else:
    print("Escala no valida")

