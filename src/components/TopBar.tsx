import React from 'react';
import { HelpCircle, Bell, Video, Users, LogOut } from 'lucide-react';
import type { TabType, UserRole } from '../types';

interface TopBarProps {
  activeTab: TabType;
  onOpenChat?: () => void;
  onOpenVideo?: () => void;
  onSwitchRole?: (role: UserRole) => void;
  onLogout?: () => void;
  userName: string;
  userEmail: string;
}

export const TopBar: React.FC<TopBarProps> = ({ activeTab, onOpenChat, onOpenVideo, onSwitchRole, onLogout, userName, userEmail: _userEmail }) => {
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
    <header className="sticky top-0 z-20 bg-[#091026]/90 backdrop-blur-md border-b border-slate-800/80 px-8 py-4 flex items-center justify-between font-sans">
      
      {/* Breadcrumb & Back Button */}
      <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition cursor-pointer font-bold"
            title="Log out and return to Login screen"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-400" />
            <span>Log Out</span>
          </button>
        )}
        <span>Workspace</span>
        <span>›</span>
        <span className="text-white font-bold">{getBreadcrumb()}</span>
      </div>

      {/* Right icons & Profile */}
      <div className="flex items-center gap-3">
        
        {/* Customer Portal View Switcher Button */}
        {onSwitchRole && (
          <button
            onClick={() => onSwitchRole('customer')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0f172a] hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
            title="Switch to Customer Portal View"
          >
            <Users className="w-3.5 h-3.5 text-[#60a5fa]" />
            <span className="hidden sm:inline">Customer View</span>
          </button>
        )}

        {/* Base Video Showcase Button */}
        <button
          onClick={onOpenVideo}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 rounded-xl text-xs font-bold text-[#60a5fa] transition cursor-pointer"
          title="Watch Full-Screen Base Video Showcase"
        >
          <Video className="w-3.5 h-3.5 text-[#60a5fa]" />
          <span className="hidden md:inline">Base Video</span>
        </button>

        <button 
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          title="Help & Documentation"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <button 
          onClick={onOpenChat}
          className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
          title="Open AI Chat Drawer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#60a5fa] ring-2 ring-[#091026]"></span>
        </button>

        {/* Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-[#1e293b] border border-slate-700 flex items-center justify-center text-white font-bold text-xs">
            {initials}
          </div>
          <span className="text-xs font-bold text-white hidden sm:inline">{firstName}</span>
        </div>
      </div>

    </header>
  );
};
