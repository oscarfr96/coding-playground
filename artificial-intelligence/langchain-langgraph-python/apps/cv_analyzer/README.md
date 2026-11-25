# Analizador de CV

Ejercicio de extracción y salida estructurada: PDF con texto o CV pegado + descripción
del puesto → `AnalisisCV` validado por Pydantic → presentación y descarga JSON.

```powershell
uv run python -m streamlit run apps/cv_analyzer/app.py --server.address 127.0.0.1
```

1. Prueba el perfil ficticio incluido o carga un PDF de hasta 10 MB.
2. Completa los requisitos del puesto y pulsa «Analizar CV».
3. Revisa las evidencias y descarga el análisis, o limpia el resultado.

`models.py` define el contrato, `service.py` extrae y analiza, y `app.py` presenta.
Los archivos subidos no se guardan en disco. El texto se envía al modelo al analizar.
Un PDF sin texto, una entrada vacía o un error de API no genera una evaluación ficticia.
La entrada completa se limita a 40 000 caracteres y no se recorta silenciosamente.

El porcentaje es una estimación no calibrada para explorar salidas estructuradas;
no constituye una decisión de contratación. La revisión se centra en competencias
documentadas y requisitos, sin inferir datos personales o ajuste cultural.

[Volver al curso](../../README.md)
