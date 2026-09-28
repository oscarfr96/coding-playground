import { ChatBubbleLeftRightIcon, ClockIcon } from '@heroicons/react/24/outline';

interface WelcomeProps {
  onNewChat: () => void;
  onToggleSidebar: () => void;
  hasExistingChats: boolean;
}

export const Welcome = ({ onNewChat, onToggleSidebar, hasExistingChats }: WelcomeProps) => {
  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Bienvenido a AI Chat
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Inicia una nueva conversación o continúa una existente
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onNewChat}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg 
              hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors w-full sm:w-auto"
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
            <span>Iniciar nueva conversación</span>
          </button>

          {hasExistingChats && (
            <button
              onClick={onToggleSidebar}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-dark-300 text-gray-900 dark:text-white 
                rounded-lg hover:bg-gray-200 dark:hover:bg-dark-400 transition-colors w-full sm:w-auto"
            >
              <ClockIcon className="h-5 w-5" />
              <span>Ver conversaciones anteriores</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-300">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Conversaciones naturales
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Interactúa de forma natural y obtén respuestas coherentes y útiles.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-300">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Historial completo
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Accede a todas tus conversaciones anteriores cuando lo necesites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 