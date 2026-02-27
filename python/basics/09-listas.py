lenguajes = ["Python", "Java", "C++", "JavaScript"]
print(lenguajes)
print(lenguajes[1])
print(lenguajes[-1]) # Accede al último elemento de la lista

lenguajes[1]="Go"
print(lenguajes)

print(lenguajes[1:3]) # Accede a los elementos desde el índice 1 hasta el 2 (excluyendo el 3)
#Si no le especificas el inicio, empieza desde el inicio
print(lenguajes[:3]) # Accede a los primeros tres elementos de la lista
#Si no le especificas el final, termina en el final
print(lenguajes[2:]) # Accede a los elementos desde el índice 2 hasta el final

