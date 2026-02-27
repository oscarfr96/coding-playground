from dotenv import load_dotenv
import os
from langchain_openai import OpenAIEmbeddings
from langchain.evaluation import load_evaluator

# Cargar la clave API desde el archivo .env
load_dotenv()
openai_api_key = os.environ.get("OPENAI_API_KEY")

def main():
    embedding_model = OpenAIEmbeddings()

    # 1. Obtener embedding de una palabra
    palabra = "apple"
    vector = embedding_model.embed_query(palabra)
    print(f"🔢 Vector para '{palabra}':")
    print(vector[:5], "...")  # Mostrar solo las primeras cifras
    print(f"🧮 Longitud del vector: {len(vector)}\n")

    # 2. Comparar embeddings de dos palabras
    evaluator = load_evaluator("pairwise_embedding_distance")
    palabra_1 = "apple"
    palabra_2 = "coche"
    resultado = evaluator.evaluate_string_pairs(prediction=palabra_1, prediction_b=palabra_2)
    
    print(f"📏 Distancia entre '{palabra_1}' y '{palabra_2}': {resultado['score']:.4f}")

if __name__ == "__main__":
    main()
