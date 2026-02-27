export const askRAG = async (query: string) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Error en la comunicación con el servicio RAG');
    }

    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.error('Error asking RAG:', error);
    throw new Error('Hubo un error al consultar la base de conocimiento. Por favor, intenta de nuevo más tarde.');
  }
}; 