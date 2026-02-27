edad = 20
print(edad > 18)

#operador and: compara dos valores y devuelve True si ambos son True
print("Mayor de edad y menor de 60", edad > 18 and edad < 60)

#operador or: compara dos valores y devuelve True si al menos uno es True
print("Mayor de edad o menor de 60", edad > 18 or edad < 60)

#operador not: invierte el valor booleano
print("No mayor de edad", not edad > 18)
print(not(edad > 18))

#operador in: compara si un valor está en una secuencia
print("18 está en el rango", 18 in range(18, 60))

#operador is: compara si dos variables apuntan al mismo objeto
print("18 está en el rango", 18 is range(18, 60))


