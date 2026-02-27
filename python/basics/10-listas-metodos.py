lenguajes = ["Python", "Java", "C++", "JavaScript"]
print(lenguajes)

# insertar un elemento en una posición específica
lenguajes.insert(1, "Go")
print(lenguajes)

# insertar un elemento al final de la lista
lenguajes.append("Rust")
print(lenguajes)

# insertar varios elementos al final de la lista
lenguajes.extend(["C#", "Kotlin"])
print(lenguajes)

# eliminar un elemento de la lista
lenguajes.remove("C++")
print(lenguajes)

# eliminar el último elemento de la lista
lenguajes.pop()
print(lenguajes)

# eliminar un elemento de la lista por su índice
lenguajes.pop(1)
print(lenguajes)

# eliminar todos los elementos de la lista
lenguajes.clear()
print(lenguajes)

# obtener el número de elementos de la lista
print(len(lenguajes))

# limpiar los elementos de la lista
lenguajes.clear()
print(lenguajes)

# eliminar la lista
del lenguajes
