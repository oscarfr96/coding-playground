"""Interfaz de análisis de CV con resultado validado y exportación JSON."""

import streamlit as st

from apps.cv_analyzer.service import evaluate_cv, extract_pdf
from apps.ui import show_error
from llm_playground.config import SAMPLE_DIR
from llm_playground.models import create_chat_model


def main() -> None:
    st.set_page_config(page_title="Analizador de CV", page_icon="📄", layout="wide")
    st.title("Analizador de CV")
    st.caption(
        "Ejercicio de salida estructurada. El ajuste es orientativo y requiere revisión humana."
    )
    with st.form("analysis"):
        uploaded = st.file_uploader("CV en PDF (opcional)", type=["pdf"])
        text = st.text_area("CV en texto", (SAMPLE_DIR / "cv_demo.txt").read_text(encoding="utf-8"))
        job = st.text_area(
            "Descripción del puesto", "Backend Python: FastAPI, PostgreSQL y pytest."
        )
        submitted = st.form_submit_button("Analizar CV")
    if st.button("Limpiar resultado"):
        st.session_state.pop("analysis_result", None)
    if submitted:
        st.session_state.pop("analysis_result", None)
        try:
            with st.spinner("Analizando competencias y evidencias..."):
                content = extract_pdf(uploaded.getvalue()) if uploaded is not None else text
                st.session_state.analysis_result = evaluate_cv(content, job, create_chat_model())
        except Exception as error:
            show_error(error)
    if result := st.session_state.get("analysis_result"):
        st.subheader(result.nombre_candidato)
        st.metric("Ajuste orientativo", f"{result.porcentaje_ajuste}%")
        st.write(result.experiencia_relevante)
        st.write("Formación:", result.educacion)
        st.write("Experiencia declarada:", result.experiencia_anos)
        st.write("Competencias:", ", ".join(result.habilidades_clave))
        for label, items in [
            ("Fortalezas", result.fortalezas),
            ("Requisitos por acreditar", result.areas_mejora),
            ("Evidencias del CV", result.evidencias),
        ]:
            st.subheader(label)
            for item in items:
                st.write(f"• {item}")
        st.download_button(
            "Descargar análisis JSON",
            result.model_dump_json(indent=2),
            file_name="analisis_cv.json",
            mime="application/json",
        )


if __name__ == "__main__":
    main()
