import os
import fastf1
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

# ==============================================================================
# Ejercicio Básico de Regresión Lineal Simple con FastF1
# Objetivo: Predecir el tiempo Total de Vuelta basado en el tiempo del Sector 1.
# ==============================================================================

# 1. Configuración Inicial y Carga de Datos
# Habilitamos el caché para evitar descargar la telemetría cada vez que ejecutamos el script.
if not os.path.exists("cache_fastf1"):
    os.makedirs("cache_fastf1")
fastf1.Cache.enable_cache("cache_fastf1")

print("-- Cargando datos de la Clasificación del GP de España 2023... --")
# Cargamos la sesión: Año 2023, Gran Premio de España, Sesión Qualifying ('Q')
session = fastf1.get_session(2023, 'Spain', 'Q')
session.load()

# Nos quedamos con las 'quick laps' (vueltas rápidas representativas)
# Esto filtra vueltas de calentamiento, entrada a boxes o banderas amarillas.
laps = session.laps.pick_quicklaps()

# 2. Preparación de los Datos para Machine Learning
print("-- Procesando los datos... --")
# Vamos a extraer los tiempos. fastf1 devuelve objetos timedelta, 
# necesitamos convertirlos a segundos (flotantes) para que el modelo los entienda.
df = pd.DataFrame({
    'Sector1_Secs': laps['Sector1Time'].dt.total_seconds(),
    'LapTime_Secs': laps['LapTime'].dt.total_seconds(),
    'Driver': laps['Driver']
})

# Limpiamos posibles valores nulos
df = df.dropna()

# Definimos nuestras variables:
# X (Variable Independiente / Predictora): Tiempo del Sector 1
# y (Variable Dependiente / Objetivo): Tiempo Total de la Vuelta
# sklearn espera que X sea una matriz 2D, así que usamos reshape(-1, 1) o doble corchete
X = df[['Sector1_Secs']].values 
y = df['LapTime_Secs'].values

# 3. Creación y Entrenamiento del Modelo
print("--    Entrenando el modelo de Regresión Lineal Simple... --")
modelo = LinearRegression()

# Entrenamos (Ajustamos) el modelo a nuestros datos
modelo.fit(X, y)

# Hacemos las predicciones usando el mismo modelo
y_pred = modelo.predict(X)

# Obtenemos los parámetros aprendidos por el modelo
# Ecuación de la recta: y = mx + b
m = modelo.coef_[0]       # Pendiente (peso)
b = modelo.intercept_     # Intersección (bias)
r2 = r2_score(y, y_pred)  # Qué tan bien se ajusta la recta a los datos (1.0 es perfecto)

print("\n--- Resultados del Modelo ---")
print(f"Ecuación de la recta: Tiempo_Vuelta = ({m:.2f} * Tiempo_Sector1) + {b:.2f}")
print(f"Precisión del modelo (R²): {r2:.3f}")

# 4. Visualización (La parte divertida!)
print("--   Generando el gráfico... --")
plt.style.use('dark_background') # Estilo oscuro para que parezca telemetría de f1
plt.figure(figsize=(10, 6))

# Graficamos los datos reales como puntos (Scatter plot)
plt.scatter(X, y, color='#ff1801', alpha=0.7, label='Datos Reales (Vueltas Rápidas)')

# Graficamos la línea de predicción de nuestra Regresión Lineal
plt.plot(X, y_pred, color='#00d2be', linewidth=2.5, label='Regresión Lineal (Ajuste)')

# Personalización del gráfico
plt.title('Predicción del Tiempo de Vuelta basado en el Sector 1\n(GP España 2023 - Q)', fontsize=14, fontweight='bold')
plt.xlabel('Tiempo del Sector 1 (segundos)', fontsize=12)
plt.ylabel('Tiempo Total de la Vuelta (segundos)', fontsize=12)
plt.grid(color='white', linestyle='--', alpha=0.1)

# Añadimos un cuadro de texto en el gráfico con la métrica R²
plt.text(
    0.05, 0.95, f'R² = {r2:.3f}\n$y = {m:.2f}x + {b:.2f}$', 
    transform=plt.gca().transAxes, 
    fontsize=12, verticalalignment='top', 
    bbox=dict(boxstyle='round', facecolor='black', alpha=0.8)
)

plt.legend(loc='lower right')
plt.tight_layout()

# Guardamos el gráfico como imagen y lo mostramos
plt.savefig('f1_regresion_lineal.png')
print("Gráfico guardado como 'f1_regresion_lineal.png'")

# ------------------------------------------------------------------------------
# 5. Comparación de tiempo real vs predicción (Ej. Fernando Alonso)
# ------------------------------------------------------------------------------
print("\n--- CASO PRÁCTICO: Predicción vs Realidad ---")
piloto_estudio = 'ALO'

# Buscamos la vuelta rápida de ese piloto en nuestro DataFrame limpio
datos_piloto = df[df['Driver'] == piloto_estudio]

if not datos_piloto.empty:
    # Tomamos la mejor vuelta (por si hay más de una, aunque pick_quicklaps suele traer la mejor representativa)
    mejor_vuelta_piloto = datos_piloto.iloc[0]
    
    # 1. Extraemos su tiempo real en el Sector 1
    sector1_real = mejor_vuelta_piloto['Sector1_Secs']
    
    # 2. Extraemos su tiempo real Total de Vuelta
    tiempo_vuelta_real = mejor_vuelta_piloto['LapTime_Secs']
    
    # 3. Le pedimos a nuestro modelo que adivine su tiempo total usando SOLAMENTE el Sector 1
    # sklearn espera formato 2D, así que lo pasamos como [[valor]]
    tiempo_predicho = modelo.predict([[sector1_real]])[0] 
    
    # 4. Calculamos el Error Absoluto (la diferencia en segundos)
    diferencia = abs(tiempo_vuelta_real - tiempo_predicho)
    
    # Mostramos los resultados
    print(f"Piloto analizado: {piloto_estudio} (Fernando Alonso)")
    print(f"Tiempo real en Sector 1:      {sector1_real:.3f} s")
    print(f"Tiempo TOTAL de Vuelta REAL:  {tiempo_vuelta_real:.3f} s")
    print(f"Tiempo PRESTIMADO por el ML:  {tiempo_predicho:.3f} s")
    print("-" * 40)
    print(f"Diferencia (Error del modelo): {diferencia:.3f} segundos")
    
    if diferencia < 0.2:
        print("¡Wow! El modelo ha predicho casi a la perfección. Gran correlación.")
    elif diferencia < 0.5:
        print("Una predicción bastante buena. Demuestra que el Sector 1 es clave en este circuito.")
    else:
        print("Hay cierta desviación. Esto indica que el piloto ganó (o perdió) mucho tiempo en los Sectores 2 y 3 respecto a la media.")
else:
    print(f"No se han encontrado datos limpios para el piloto {piloto_estudio}.")

plt.show()
