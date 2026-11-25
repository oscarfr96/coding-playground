"""Presentación de errores en el límite de la interfaz, sin falsos resultados."""

import logging

import streamlit as st

logger = logging.getLogger(__name__)


def show_error(error: Exception) -> None:
    if isinstance(error, (ValueError, RuntimeError, FileNotFoundError)):
        st.error(str(error))
    else:
        logger.exception("No se pudo completar la operación")
        st.error(
            "No se pudo completar la operación. Revisa la conexión, la clave API y los registros."
        )
