import os
import shutil
from dotenv import load_dotenv
from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

# 1. Cargar variables de entorno (.env) para obtener la API Key
load_dotenv()
openai_api_key = os.environ.get("OPENAI_API_KEY")

# 2. Definir rutas
DATA_PATH = "data/books"
CHROMA_PATH = "chroma"

def load_documents():
    print("📂 Cargando documentos...")
    loader = DirectoryLoader(DATA_PATH, glob="*.md")
    documents = loader.load()
    print(f"📝 {len(documents)} documento(s) cargado(s).")
    return documents

def split_documents(documents):
    print("✂️ Dividiendo documentos en fragmentos...")
    splitter = RecursiveCharacterTextSplitter(
        # Cuántos caracteres tendrá cada fragmento
        chunk_size=300,
        #Cuántos caracteres se repiten entre un chunk y el siguiente. 
        # Esto sirve para que no se “corte” una idea por la mitad
        chunk_overlap=100,
        length_function=len,
        add_start_index=True
    )
    chunks = splitter.split_documents(documents)
    print(f"🔹 Generados {len(chunks)} fragmentos.")
    return chunks

def save_to_chroma(chunks):
    print("💾 Guardando vectores en la base de datos...")
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)  # Limpia base anterior
    db = Chroma.from_documents(
        chunks,
        embedding=OpenAIEmbeddings(),
        persist_directory=CHROMA_PATH
    )
    #db.persist() Ya no es necesario
    print(f"✅ Base guardada con {len(chunks)} fragmentos.")

def main():
    docs = load_documents()
    chunks = split_documents(docs)
    save_to_chroma(chunks)

if __name__ == "__main__":
    main()
