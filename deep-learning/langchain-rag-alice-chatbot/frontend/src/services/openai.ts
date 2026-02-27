import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OpenAI API key is not defined in environment variables');
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Note: In production, you should use a backend server
});

export const generateChatCompletion = async (messages: ChatCompletionMessageParam[]) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0].message.content;
  } catch (error: any) {
    if (error.status === 429) {
      throw new Error('Has excedido el límite de la API de OpenAI. Por favor, verifica tu plan y detalles de facturación.');
    } else if (error.status === 401) {
      throw new Error('La API key de OpenAI no es válida. Por favor, verifica tu API key.');
    }
    console.error('Error generating chat completion:', error);
    throw new Error('Hubo un error al comunicarse con la API de OpenAI. Por favor, intenta de nuevo más tarde.');
  }
}; 