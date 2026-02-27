import { useState, useEffect } from 'react';
import { Chat } from './components/Chat';
import { ChatList } from './components/ChatList';
import { Welcome } from './components/Welcome';
import { SunIcon, MoonIcon, Bars3Icon } from '@heroicons/react/24/outline';
import type { Chat as ChatType } from './types/chat';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState<ChatType[]>(() => {
    const saved = localStorage.getItem('chats');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  const handleNewChat = () => {
    const newChat: ChatType = {
      id: Date.now().toString(),
      title: 'Nueva conversación',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setChats((prev) => [...prev, newChat]);
    setCurrentChatId(newChat.id);
    setSidebarOpen(false);
  };

  const handleDeleteChat = (chatId: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  const handleUpdateChat = (chatId: string, updates: Partial<ChatType>) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? { ...chat, ...updates, updatedAt: new Date() }
          : chat
      )
    );
  };

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  return (
    <div className="min-h-screen h-screen flex flex-col bg-gray-50 dark:bg-dark-100 transition-colors duration-200">
      <header className="bg-white dark:bg-dark-200 shadow z-20">
        <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
            >
              <Bars3Icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">AI Chat</h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6 text-yellow-500" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-hidden flex relative">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <aside 
          className={`
            fixed md:static
            z-30 md:z-auto
            h-full
            transition-all duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            ${sidebarOpen ? 'md:translate-x-0 md:w-52' : 'md:-translate-x-52 md:w-0'}
            overflow-hidden
          `}
        >
          <ChatList
            chats={chats}
            currentChatId={currentChatId}
            onSelectChat={(id) => {
              setCurrentChatId(id);
              window.innerWidth < 768 && setSidebarOpen(false);
            }}
            onDeleteChat={handleDeleteChat}
            onNewChat={handleNewChat}
          />
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {currentChat ? (
            <Chat
              key={currentChat.id}
              chat={currentChat}
              onUpdateChat={(updates) => handleUpdateChat(currentChat.id, updates)}
            />
          ) : (
            <Welcome 
              onNewChat={handleNewChat}
              onToggleSidebar={() => setSidebarOpen(true)}
              hasExistingChats={chats.length > 0}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
