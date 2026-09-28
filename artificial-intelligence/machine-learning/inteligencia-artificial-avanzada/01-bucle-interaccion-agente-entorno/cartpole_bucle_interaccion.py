#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Actividad 6: Implementacion del Bucle de Interaccion Agente-Entorno (CartPole-v1).

Ejecuta el bucle cerrado (closed-loop) clasico de aprendizaje por refuerzo sobre el
entorno CartPole-v1 de Gymnasium, usando una politica refleja simple basada en el
signo del angulo del poste. Sirve como base conceptual antes de introducir metodos
formales de RL (Q-learning, policy gradients, etc.) en las siguientes semanas.
"""

import gymnasium as gym
import numpy as np


def run_episode(env: gym.Env, seed: int = 42) -> tuple[int, float]:
    """Ejecuta un episodio completo con la politica refleja y devuelve (pasos, retorno)."""
    observation, info = env.reset(seed=seed)

    print(f"Dimension del espacio de estados: {env.observation_space.shape}")
    print(f"Numero de acciones discretas: {env.action_space.n}")

    total_reward = 0.0
    terminated = False
    truncated = False
    step_count = 0

    # Bucle interactivo de lazo cerrado (Closed-Loop)
    while not (terminated or truncated):
        # Politica basica (Reflejo simple / Heuristica):
        # Mover el carro hacia la direccion en que cae el poste (indice 2: angulo)
        pole_angle = observation[2]
        action = 1 if pole_angle > 0 else 0  # 0: Empujar izq, 1: Empujar der

        # Ejecucion de la accion en el entorno
        next_observation, reward, terminated, truncated, info = env.step(action)

        # Acumulacion de retorno
        total_reward += reward
        observation = next_observation
        step_count += 1

    return step_count, total_reward


def main() -> None:
    # Instanciacion del entorno de control clasico
    env = gym.make("CartPole-v1")

    try:
        step_count, total_reward = run_episode(env, seed=42)
        print(f"Episodio finalizado en {step_count} pasos. Retorno total acumulado: {total_reward}")
    finally:
        env.close()


if __name__ == "__main__":
    main()
