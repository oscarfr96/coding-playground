# Calculadora básica
num1 = float(input("Ingrese el primer numero: "))
num2 = float(input("Ingrese el segundo numero: "))
operacion = input("Ingrese la operacion (+, -, *, /): ")

if operacion == "+":
    print(num1 + num2)
elif operacion == "-":
    print(num1 - num2)
elif operacion == "*":
    print(num1 * num2)
elif operacion == "/":
    print(num1 / num2)
else:
    print("Operacion no valida")