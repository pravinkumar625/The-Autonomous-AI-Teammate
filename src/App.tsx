import { useState } from 'react';
import { SidebarNav } from './components/SidebarNav';
import { TopBar } from './components/TopBar';
import { OverviewTab } from './components/OverviewTab';
import { ConversationsTab } from './components/ConversationsTab';
import { PlaybooksTab } from './components/PlaybooksTab';
import { OutcomesTab } from './components/OutcomesTab';
import { TeamTab } from './components/TeamTab';
import { SettingsTab } from './components/SettingsTab';
import { ChatDrawer } from './components/ChatDrawer';
import { LoginPage } from './components/LoginPage';
import type { TabType, ConversationItem } from './types';
import { Sparkles } from 'lucide-react';


export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Show login first
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [selectedConversation, setSelectedConversation] = useState<ConversationItem | null>(null);

  const handleLogin = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleSelectConversation = (conv: ConversationItem) => {
    setSelectedConversation(conv);
    setActiveTab('conversations');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-[#0b0e14] text-white font-sans antialiased selection:bg-[#a3e635] selection:text-[#0b0e14]">
      
      {/* Sidebar Navigation */}
      <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} userName={userName} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <TopBar activeTab={activeTab} onOpenChat={() => setIsChatOpen(true)} userName={userName} userEmail={userEmail} />

        {/* Dynamic Content Canvas */}
        <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'overview' && (
            <OverviewTab
              onOpenChat={() => setIsChatOpen(true)}
              onSelectConversation={handleSelectConversation}
              userName={userName}
            />
          )}

          {activeTab === 'conversations' && (
            <ConversationsTab selectedConv={selectedConversation} />
          )}

          {activeTab === 'playbooks' && <PlaybooksTab />}
          {activeTab === 'outcomes' && <OutcomesTab />}
          {activeTab === 'team' && <TeamTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>

      {/* Floating Lime "Ask IVY's" Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 ivy-lime-btn px-5 py-3 rounded-full text-xs font-black shadow-2xl shadow-[#a3e635]/30 flex items-center gap-2.5 cursor-pointer transform hover:scale-105 transition"
        >
          <Sparkles className="w-4 h-4 text-[#0b0e14]" />
          <span>Ask IVY's AI</span>
        </button>
      )}

      {/* AI Teammate Chat Drawer */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

    </div>
  );
}

export default App;
