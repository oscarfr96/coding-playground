import { format } from 'date-fns';
import { UserIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import type { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div 
      className={`
        flex gap-3 p-4 rounded-lg
        ${isUser 
          ? 'ml-auto bg-blue-100 dark:bg-blue-900/50 text-gray-900 dark:text-gray-100' 
          : 'mr-auto bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100'
        }
        max-w-[85%]
      `}
    >
      <div className="flex-shrink-0">
        {isUser ? (
          <UserIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        ) : (
          <ComputerDesktopIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {format(message.timestamp, 'HH:mm')}
          </span>
          <span className={`
            text-xs px-2 py-0.5 rounded-full
            ${message.mode === 'alicia' 
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' 
              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
            }
          `}>
            {message.mode === 'alicia' ? '🔮 Alicia' : '🤖 ChatGPT'}
          </span>
        </div>
        <div className="mt-1 text-sm break-words">
          {message.content}
        </div>
      </div>
    </div>
  );
}; 