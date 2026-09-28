# Inteligencia Artificial Avanzada

Ejercicios practicos del curso de Inteligencia Artificial Avanzada. Cada ejercicio vive en
su propia carpeta numerada, con su codigo y su `requirements.txt`.

## Indice de ejercicios

| # | Ejercicio | Carpeta |
|---|---|---|
| 01 | [Bucle de interaccion agente-entorno (CartPole-v1)](#01-bucle-de-interaccion-agente-entorno-cartpole-v1) | [`01-bucle-interaccion-agente-entorno/`](01-bucle-interaccion-agente-entorno/) |

---

## 01. Bucle de Interaccion Agente-Entorno (CartPole-v1)

Implementacion del problema clasico de control y equilibrio **CartPole-v1**, ejecutado
bajo el estandar de simulacion interactiva de [Gymnasium](https://gymnasium.farama.org/).
Introducido originalmente por Michie y Chambers con el sistema BOXES, este entorno es la
materializacion fundamental del paradigma de agentes autonomos y toma de decisiones en
lazo cerrado (closed-loop).

El objetivo es contrastar de forma empirica la inferencia estatica del aprendizaje
supervisado frente a la toma de decisiones secuencial, donde cada accion ejecutada altera
la dinamica fisica del entorno y condiciona las observaciones futuras.

### Definicion de la tarea

- **Vector de estado / observacion (S)**: espacio continuo de dimension 4:
  1. Posicion del carro (x).
  2. Velocidad lineal del carro (x dot).
  3. Angulo de inclinacion del poste respecto a la vertical (theta).
  4. Velocidad angular en el extremo del poste (theta dot).
- **Espacio de acciones (A)**: discreto y binario:
  - `0`: aplicar una fuerza hacia la izquierda.
  - `1`: aplicar una fuerza hacia la derecha.
- **Dinamica temporal y lazo cerrado**: a diferencia de una funcion de perdida supervisada
  evaluada de forma aislada, el entorno responde de manera interactiva. La accion `a_t`
  enviada mediante `env.step(action)` determina la transicion al siguiente estado `s_{t+1}`
  y entrega retroalimentacion inmediata.
- **Senal de recompensa y retorno acumulado**: por cada paso en que el poste permanezca
  equilibrado dentro de los rangos permitidos, el entorno emite `r_t = +1.0`. La meta del
  agente es maximizar el retorno acumulado `G_t` a lo largo del episodio, no minimizar un
  error instantaneo.
- **Control heuristico de referencia**: `cartpole_bucle_interaccion.py` implementa una
  politica refleja simple (condicion-accion) sobre el signo del angulo del poste
  (`pole_angle > 0`), para observar el ciclo completo percepcion -> accion -> transicion de
  estado -> terminacion episodica (`terminated` o `truncated`). Sirve de base para los
  metodos formales de aprendizaje por refuerzo de las siguientes semanas.

### Como ejecutarlo

```bash
cd artificial-intelligence/inteligencia-artificial-avanzada/01-bucle-interaccion-agente-entorno
python -m venv venv
venv\Scripts\activate      # PowerShell/cmd en Windows; usa "source venv/bin/activate" en macOS/Linux
pip install -r requirements.txt
python cartpole_bucle_interaccion.py
```

Salida esperada (el numero de pasos puede variar ligeramente entre versiones de Gymnasium):

```
Dimension del espacio de estados: (4,)
Numero de acciones discretas: 2
Episodio finalizado en N pasos. Retorno total acumulado: N.0
```
