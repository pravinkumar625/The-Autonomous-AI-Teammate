import React from 'react';
import type { TabType } from '../types';
import { LayoutDashboard, MessageSquare, BookOpen, BarChart2, Users, Settings, Bot } from 'lucide-react';

interface SidebarNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  userName: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, setActiveTab, userName }) => {
  const MAIN_NAV = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'conversations', label: 'Conversations', icon: MessageSquare, badge: '12' },
    { id: 'playbooks', label: 'Playbooks', icon: BookOpen },
    { id: 'outcomes', label: 'Outcomes', icon: BarChart2 },
  ];

  const WORKSPACE_NAV = [
    { id: 'team', label: 'Team view', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#091026] border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none p-4 text-left font-sans">
      
      {/* Top Branding & Status Card */}
      <div className="space-y-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-1 py-2 cursor-pointer" onClick={() => setActiveTab('overview')}>
          <div className="w-9 h-9 rounded-xl bg-[#2563eb] flex items-center justify-center text-white font-black shadow-md shadow-blue-500/30">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-white text-base tracking-tight leading-none">
              IVY's
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#60a5fa] font-bold">
              AI TEAMMATE
            </span>
          </div>
        </div>

        {/* Live Agent Capsule Card */}
        <div className="p-3.5 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#60a5fa]">
            <span className="w-2 h-2 rounded-full bg-[#60a5fa] animate-pulse"></span>
            <span>Agent is live</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium leading-tight">
            Watching 3 channels and 4 active playbooks
          </p>
        </div>

        {/* Main Nav Section */}
        <nav className="space-y-1 pt-2">
          {MAIN_NAV.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/20 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white text-[#2563eb]' : 'bg-blue-600 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Workspace Nav Section */}
        <div className="pt-4 space-y-1">
          <div className="px-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1">
            WORKSPACE
          </div>

          {WORKSPACE_NAV.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/20 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Footer Profile */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#1e293b] border border-slate-700 flex items-center justify-center text-white font-bold text-xs">
            {userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-white line-clamp-1">{userName || 'User'}</p>
            <p className="text-[10px] text-slate-400">Revenue Ops</p>
          </div>
        </div>
      </div>

    </aside>
  );
};
