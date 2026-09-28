import { useState, useEffect, useRef } from 'react';
import type { Message, Chat as ChatType } from '../types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { generateChatCompletion } from '../services/openai';
import { askRAG } from '../services/rag';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

interface ChatProps {
  chat: ChatType;
  onUpdateChat: (updates: Partial<ChatType>) => void;
}

export const Chat = ({ chat, onUpdateChat }: ChatProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useRAG, setUseRAG] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSendMessage = async (content: string) => {
    setError(null);
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      mode: useRAG ? 'alicia' : 'chatgpt'
    };

    onUpdateChat({
      messages: [...chat.messages, userMessage],
      title: chat.messages.length === 0 ? content.slice(0, 30) + '...' : chat.title,
    });
    
    setLoading(true);

    try {
      let response;
      
      if (useRAG) {
        response = await askRAG(content);
      } else {
        const chatMessages: ChatCompletionMessageParam[] = chat.messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        }));
        chatMessages.push({ role: 'user', content });
        response = await generateChatCompletion(chatMessages);
      }

      if (response) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          role: 'assistant',
          timestamp: new Date(),
          mode: useRAG ? 'alicia' : 'chatgpt'
        };
        onUpdateChat({
          messages: [...chat.messages, userMessage, assistantMessage],
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error instanceof Error ? error.message : 'Error al enviar el mensaje');
      // Revert the user message if there was an error
      onUpdateChat({
        messages: chat.messages,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-dark-300 scrollbar-track-transparent">
        <div className="max-w-4xl mx-auto p-4 space-y-4">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setUseRAG(!useRAG)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                useRAG 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {useRAG ? '🔮 Modo Alicia' : '🤖 Modo Chat GPT'}
            </button>
          </div>
          {chat.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-dark-300">
        <div className="max-w-4xl mx-auto">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={loading}
            placeholder={useRAG ? "Pregunta sobre Alicia en el País de las Maravillas..." : "Escribe un mensaje..."}
          />
        </div>
      </div>
    </div>
  );
}; 