texto = "Hola Mundo"
print(texto)
#Uso de métodos (función integrada en un objeto)
print(texto.upper())
print(texto.lower())
print(texto.capitalize())
print(texto.find("M"))
#Python es case sensitive: distingue entre mayúsculas y minúsculas
print(texto.find("m"))
print(texto.replace("Mundo", "Python"))
#Palabra reservada in: devuelve un booleano
print ("Mundo" in texto)