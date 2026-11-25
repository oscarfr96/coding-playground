# Madring 2026 — base del vídeo y diseño de predicción

Estado: borrador previo a la carrera, creado el 13 de septiembre de 2026. No publicado. El modelo experimental se ejecutó antes de la carrera; sus resultados están en `analisis/madring/resultado.json`.

Elección editorial: Norris. El modelo estima 75,4 % de victoria y 76,5 % de liderato al acabar la vuelta 1. Son probabilidades experimentales, sin calibración específica para Madring; no deben presentarse como certeza.

## Hechos y fuentes

- La clasificación sitúa a Norris primero, Antonelli segundo a 0,011 s y Verstappen tercero. Fuente: [FIA, clasificación del 12 de septiembre](https://www.fia.com/news/f1-norris-takes-stunning-inaugural-madring-pole-thrilling-spanish-grand-prix-qualifying). Verificar parrilla definitiva y sanciones antes de grabar.
- Madring debuta en F1. El promotor identifica oportunidades de adelantamiento: no convertir la dificultad prevista en un hecho medido. Fuente: [circuito oficial](https://www.madring.com/en/circuit).

## Cómo convertir la idea en una estimación

1. Salida: recopilar parrilla efectiva y posición al cierre de vuelta 1 en carreras anteriores a este GP. Separar salidas detenidas, salidas lanzadas, pit lane y sprints; tratar relanzamientos aparte. Guardar los incidentes y abandonos iniciales, evitando seleccionar solo supervivientes.
2. Medidas: porcentaje de posiciones mantenidas o ganadas, pérdidas, y retención de P1 cuando sale P1. Mostrar siempre numerador y denominador. Comparar posiciones de salida similares: un poleman no puede ganar puestos. No interpretar estas medidas como tiempo de reacción o aceleración pura.
3. Estimación: priorizar 2026 y combinar muestras pequeñas de cada piloto con una referencia de parrilla/equipo mediante suavizado. Incluir a los rivales de las primeras filas. No extrapolar sin más la reputación de Norris de otras temporadas.
4. Victoria: incorporar ritmo de tandas largas, neumáticos, estrategia de paradas y fiabilidad. El líder de vuelta 1 es un estado que hay que predecir antes de la carrera; introducir el líder real de hoy sería fuga de información.
5. Neutralizaciones: estados mutuamente excluyentes — sin SC/VSC/roja; SC o VSC sin roja; al menos una roja, haya habido otras neutralizaciones o no. Estimar sus probabilidades con carreras comparables definidas previamente, mostrando muestra e incertidumbre. Madring carece de histórico propio de F1. Una roja puede ayudar o perjudicar según el momento y las circunstancias.
6. Combinar: P(victoria Norris) = suma sobre líder L y escenario S de P(L,S | información previa) × P(victoria Norris | L,S, información previa). No suponer independencia entre incidentes iniciales, líder y roja. No multiplicar P(mantiene P1) por P(no roja): Norris también puede ganar perdiendo P1 o con interrupciones.
7. Validar cronológicamente con carreras pasadas, comparando con elegir siempre al poleman. Evaluar calibración y Brier/log loss si se publican porcentajes. Sin esta ejecución, presentar únicamente el pronóstico provisional del guion.

## Resultado de la ejecución previa

- Histórico: 61 carreras, hasta el GP de Italia del 6 de septiembre de 2026.
- Top: Norris 75,4 %, Antonelli 14,3 %, Verstappen 3,6 %, Hamilton 2,3 %, Leclerc 1,3 %.
- Escenarios: carrera limpia 36,5 %, SC/VSC sin roja 43,3 %, al menos una roja 20,2 %.
- Condicionado al líder de vuelta 1: Norris gana el 82,2 % si lidera y el 53,3 % si no lidera.
- Validación temporal (41 carreras): 27 aciertos; baseline poleman, 27. Log loss 1,242 frente a 1,249 del baseline de parrilla.

El HTML es un guion grabable; el vídeo todavía no está renderizado. Si se vuelve a descargar el histórico, hay que regenerar `resultado.json` y revisar las cifras del guion.

## Revisión posterior

Dejar intacta la elección previa y anotar por separado: líder de vuelta 1, neutralizaciones, ganador y papel de las paradas. Evaluar también si la hipótesis sobre dificultad de adelantar se sostuvo.
