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
import { VideoModal } from './components/VideoModal';
import { LoginPage } from './components/LoginPage';
import { CustomerDashboard } from './components/CustomerDashboard';
import { IntroVideoPage } from './components/IntroVideoPage';
import type { TabType, ConversationItem, UserRole } from './types';
import { Sparkles } from 'lucide-react';


export function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true); // Show Intro Video FIRST before login
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [selectedConversation, setSelectedConversation] = useState<ConversationItem | null>(null);

  const handleLogin = (name: string, email: string, role: UserRole) => {
    setUserName(name);
    setUserEmail(email);
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleSelectConversation = (conv: ConversationItem) => {
    setSelectedConversation(conv);
    setActiveTab('conversations');
  };

  // 1. Show Video Showcase Page BEFORE Login Page
  if (showIntro) {
    return <IntroVideoPage onStart={() => setShowIntro(false)} />;
  }

  // 2. Show Login Page after Video Intro
  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        onWatchVideo={() => setShowIntro(true)} 
      />
    );
  }

  // Render Customer Dashboard View
  if (userRole === 'customer') {
    return (
      <>
        <CustomerDashboard
          userName={userName}
          userEmail={userEmail}
          onOpenChat={() => setIsChatOpen(true)}
          onOpenVideo={() => setIsVideoOpen(true)}
          onSwitchRole={(role) => setUserRole(role)}
        />

        {/* AI Teammate Chat Drawer */}
        <ChatDrawer
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />

        {/* Demo Video Modal */}
        <VideoModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
        />
      </>
    );
  }

  // Render Admin / Internal Teammate Dashboard View
  return (
    <div className="flex min-h-screen bg-[#070d1e] text-white font-sans antialiased selection:bg-[#2563eb] selection:text-white">
      
      {/* Sidebar Navigation */}
      <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} userName={userName} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <TopBar 
          activeTab={activeTab} 
          onOpenChat={() => setIsChatOpen(true)} 
          onOpenVideo={() => setIsVideoOpen(true)}
          onSwitchRole={(role) => setUserRole(role)}
          userName={userName} 
          userEmail={userEmail} 
        />

        {/* Dynamic Content Canvas */}
        <main className="p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'overview' && (
            <OverviewTab
              onOpenChat={() => setIsChatOpen(true)}
              onOpenVideo={() => setIsVideoOpen(true)}
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

      {/* Floating Blue "Ask IVY's" Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-3 rounded-full text-xs font-black shadow-2xl shadow-blue-500/30 flex items-center gap-2.5 cursor-pointer transform hover:scale-105 transition"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Ask IVY's AI</span>
        </button>
      )}

      {/* AI Teammate Chat Drawer */}
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Base Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

    </div>
  );
}

export default App;
