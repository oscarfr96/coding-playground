# 💬 LangChain RAG Chatbot con OpenAI, ChromaDB, FastAPI y React

Este proyecto es una implementación completa de un sistema **RAG** (Retrieval-Augmented Generation) con **LangChain** en el backend y una interfaz moderna en **React** como frontend.

Permite consultar tus propios documentos (en este caso, *Alice in Wonderland* en formato `.md`) usando lenguaje natural, y obtener respuestas generadas por IA basadas en contexto real.

---

## 🧠 ¿Qué es RAG?

RAG combina:

- 🔍 Recuperación de fragmentos relevantes desde tus documentos usando embeddings.
- 🧠 Generación de respuestas con LLM (como GPT) usando ese contexto como referencia.

---

## 🗂️ Estructura del proyecto

```
langchain-rag-alice-chatbot/
├── backend/
│   ├── create_database.py
│   ├── query_data.py
│   ├── backend.py
│   ├── chroma/                  ← base de datos vectorial
│   ├── data/books/alice.md
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   └── ...
├── README.md
```

---

## ⚙️ Instalación del Backend (Python)

### 1. Entra en la carpeta del backend

```bash
cd backend
```

### 2. Crea entorno virtual

```bash
python -m venv venv
.\venv\Scripts\activate
```

### 3. Instala dependencias

```bash
pip install -r requirements.txt
pip install "unstructured[md]"
```

### 4. Añade tu API key

Crea un archivo `.env`:

```
OPENAI_API_KEY=sk-xxxxx
```

---

## ▶️ Uso del Backend

### 1. Crear la base vectorial

```bash
python create_database.py
```

### 2. Probar en consola

```bash
python query_data.py "How does Alice meet the Mad Hatter?"
```

### 3. Levantar API con FastAPI

```bash
uvicorn backend:app --reload
```

Visita: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 💻 Frontend en React

### 1. Entra en la carpeta `frontend/`

```bash
cd ../frontend
npm install
```

### 2. Ejecuta la app

```bash
npm run dev
```

> Asegúrate de que el backend está corriendo en `http://localhost:8000`.

### 3. Cómo funciona

Tu componente React hace una petición POST al backend:

```js
const response = await fetch("http://localhost:8000/ask", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: "Your question" })
});
const data = await response.json();
console.log(data.answer);
```

---

## 📹 Basado en:

🎥 [Tutorial original de RAG + LangChain - por Pixegami](https://www.youtube.com/watch?v=tcqEUSNCn8I)

---

## 🙌 Créditos

Proyecto extendido por **Oscar**.  
Incluye mejoras de integración full-stack, gestión moderna de dependencias, y soporte para frontend personalizado con React.

