import React from 'react';
import { HelpCircle, Bell } from 'lucide-react';
import type { TabType } from '../types';


interface TopBarProps {
  activeTab: TabType;
  onOpenChat?: () => void;
  userName: string;
  userEmail: string;
}

export const TopBar: React.FC<TopBarProps> = ({ activeTab, onOpenChat, userName, userEmail: _userEmail }) => {
  const initials = userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';
  const firstName = userName ? userName.split(' ')[0] : 'User';



  const getBreadcrumb = () => {
    switch (activeTab) {
      case 'overview': return 'Overview';
      case 'conversations': return 'Conversations';
      case 'playbooks': return 'Playbooks';
      case 'outcomes': return 'Outcomes';
      case 'team': return 'Team view';
      case 'settings': return 'Settings';
      default: return 'Overview';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-[#0b0e14]/90 backdrop-blur-md border-b border-[#1e2634] px-8 py-4 flex items-center justify-between">
      
      {/* Breadcrumb matching screenshot */}
      <div className="flex items-center gap-2 text-xs font-medium text-[#94a3b8]">
        <span>Workspace</span>
        <span>›</span>
        <span className="text-white font-bold">{getBreadcrumb()}</span>
      </div>

      {/* Right icons & Profile matching screenshot */}
      <div className="flex items-center gap-3">
        <button 
          className="p-2 text-[#94a3b8] hover:text-white hover:bg-[#151c27] rounded-xl transition"
          title="Help & Documentation"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <button 
          onClick={onOpenChat}
          className="relative p-2 text-[#94a3b8] hover:text-white hover:bg-[#151c27] rounded-xl transition cursor-pointer"
          title="Open AI Chat Drawer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#a3e635] ring-2 ring-[#0b0e14]"></span>
        </button>


        {/* Profile Pill matching screenshot */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#1e2634]">
          <div className="w-8 h-8 rounded-full bg-[#1e2736] border border-[#2d384d] flex items-center justify-center text-white font-bold text-xs">
            {initials}
          </div>
          <span className="text-xs font-bold text-white hidden sm:inline">{firstName}</span>
        </div>
      </div>

    </header>
  );
};
