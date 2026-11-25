# Inteligencia Artificial Avanzada

Ejercicios del curso organizados en carpetas numeradas, cada una con su código
y dependencias. El contenido actual incluye un ejercicio de interacción agente–entorno.

| Ejercicio | Código | Concepto |
| --- | --- | --- |
| 01 · CartPole | [Bucle de interacción](01-bucle-interaccion-agente-entorno/cartpole_bucle_interaccion.py) | Observación, acción, recompensa y fin del episodio |

## CartPole-v1

El script usa Gymnasium y una política heurística: elige la dirección de empuje según
el signo del ángulo del poste. No entrena un agente; muestra el ciclo completo de
interacción antes de introducir algoritmos de aprendizaje.

La observación contiene posición y velocidad del carro, ángulo y velocidad angular
del poste. Las dos acciones son empujar a izquierda o derecha. El bucle acumula la
recompensa y termina cuando Gymnasium devuelve `terminated` o `truncated`.

Desde `01-bucle-interaccion-agente-entorno/`:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe cartpole_bucle_interaccion.py
```

En macOS/Linux, utiliza `.venv/bin/python`. El script fija la semilla en 42, imprime
los espacios de observación y acción y devuelve pasos y retorno. No abre un render
gráfico y cierra el entorno al terminar.

[Volver a IA](../README.md)
