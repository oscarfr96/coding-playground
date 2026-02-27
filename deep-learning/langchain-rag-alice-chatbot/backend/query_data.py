import argparse
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import os
from dotenv import load_dotenv

# Cargar clave de OpenAI
load_dotenv()
openai_api_key = os.environ.get("OPENAI_API_KEY")

# Ruta donde se guardó la base vectorial
CHROMA_PATH = "chroma"

# Template del prompt: usamos los fragmentos como contexto
PROMPT_TEMPLATE = """
Responde a la siguiente pregunta únicamente usando el siguiente contexto:

{context}

---

Pregunta: {question}
"""

def main():
    # 1. Recoger la pregunta desde la línea de comandos
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="Tu pregunta")
    args = parser.parse_args()
    query_text = args.query_text

    # 2. Cargar base de datos vectorial
    embedding_function = OpenAIEmbeddings()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    # 3. Buscar los chunks más relevantes (en este caso, los 3 más relevantes)
    print("🔍 Buscando los fragmentos más relevantes...")
    results = db.similarity_search_with_relevance_scores(query_text, k=3)

    if len(results) == 0 or results[0][1] < 0.7:
        print("⚠️ No se encontraron resultados suficientemente relevantes.")
        return

    # 4. Juntar los fragmentos como contexto
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _ in results])

    # 5. Construir el prompt
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    # 6. Invocar al modelo de lenguaje
    model = ChatOpenAI()
    response = model.invoke(prompt).content

    # 7. Mostrar respuesta y fuentes
    sources = [doc.metadata.get("source", "Desconocido") for doc, _ in results]
    print("\n🧠 Respuesta generada:")
    print(response)
    print("\n📁 Fuentes usadas:")
    print(sources)

if __name__ == "__main__":
    main()
