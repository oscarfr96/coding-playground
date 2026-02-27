import { useState, useMemo } from 'react';
import { ChatBubbleLeftIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Chat } from '../types/chat';

interface ChatListProps {
  chats: Chat[];
  currentChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onNewChat: () => void;
}

export const ChatList = ({ chats, currentChatId, onSelectChat, onDeleteChat, onNewChat }: ChatListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = useMemo(() => {
    if (!searchTerm.trim()) return chats;
    
    const searchLower = searchTerm.toLowerCase();
    return chats.filter(chat => {
      // Buscar en el título
      if (chat.title.toLowerCase().includes(searchLower)) return true;
      
      // Buscar en los mensajes
      return chat.messages.some(message => 
        message.content.toLowerCase().includes(searchLower)
      );
    });
  }, [chats, searchTerm]);

  return (
    <div className="w-52 bg-gray-100 dark:bg-dark-200 h-full flex flex-col shadow-lg md:shadow-none">
      <div className="p-3 border-b border-gray-200 dark:border-dark-300">
        <button
          onClick={onNewChat}
          className="w-full bg-blue-600 dark:bg-blue-500 text-white rounded-lg py-2 px-3 text-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          Nueva conversación
        </button>
      </div>
      
      {/* Search input */}
      <div className="p-3 border-b border-gray-200 dark:border-dark-300">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar chats..."
            className="w-full pl-8 pr-3 py-1.5 text-sm rounded-md 
              bg-white dark:bg-dark-300 
              border border-gray-300 dark:border-dark-400
              text-gray-900 dark:text-gray-100 
              placeholder-gray-500 dark:placeholder-gray-400
              focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
              focus:border-blue-500 dark:focus:border-blue-400"
          />
          <MagnifyingGlassIcon className="absolute left-2.5 top-2 h-4 w-4 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="p-3 text-sm text-gray-500 dark:text-gray-400 text-center">
            {chats.length === 0 ? 'No hay conversaciones' : 'No se encontraron resultados'}
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`
                p-3 cursor-pointer border-b border-gray-200 dark:border-dark-300
                ${currentChatId === chat.id ? 'bg-white dark:bg-dark-300' : 'hover:bg-white/50 dark:hover:bg-dark-300/50'}
                group
              `}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2 min-w-0">
                  <ChatBubbleLeftIcon className="h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {chat.title || 'Nueva conversación'}
                    </h3>
                    {searchTerm && chat.messages.some(msg => msg.content.toLowerCase().includes(searchTerm.toLowerCase())) && (
                      <p className="text-xs text-blue-500 dark:text-blue-400">
                        Contiene resultados
                      </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {format(chat.updatedAt, 'dd MMM, HH:mm', { locale: es })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all ml-2"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}; 