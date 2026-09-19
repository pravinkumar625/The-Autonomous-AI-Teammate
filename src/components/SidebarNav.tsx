import React from 'react';
import type { TabType } from '../types';
import { LayoutDashboard, MessageSquare, BookOpen, BarChart2, Users, Settings, Bot } from 'lucide-react';


interface SidebarNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, setActiveTab }) => {
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
    <aside className="w-64 bg-[#0d1117] border-r border-[#1e2634] flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none p-4 text-left">
      
      {/* Top Branding & Status Card */}
      <div className="space-y-4">
        
        {/* Brand Logo matching screenshot */}
        <div className="flex items-center gap-3 px-1 py-2 cursor-pointer" onClick={() => setActiveTab('overview')}>
          <div className="w-9 h-9 rounded-xl bg-[#a3e635] flex items-center justify-center text-[#0b0e14] font-black shadow-md shadow-[#a3e635]/20">
            <Bot className="w-5 h-5 text-[#0b0e14]" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-white text-base tracking-tight leading-none">
              IVY's
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#94a3b8]">
              AI TEAMMATE
            </span>
          </div>
        </div>

        {/* Live Agent Capsule Card matching screenshot */}
        <div className="p-3.5 rounded-2xl bg-[#141b26] border border-[#232d3f] space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#a3e635]">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"></span>
            <span>Agent is live</span>
          </div>
          <p className="text-[11px] text-[#94a3b8] font-medium leading-tight">
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
                    ? 'bg-[#1e2736] text-white shadow-xs font-bold'
                    : 'text-[#94a3b8] hover:text-white hover:bg-[#151c27]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#a3e635]' : 'text-[#64748b]'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] font-mono font-bold bg-[#a3e635] text-[#0b0e14] px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Workspace Nav Section */}
        <div className="pt-4 space-y-1">
          <div className="px-3.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#64748b] mb-1">
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
                    ? 'bg-[#1e2736] text-white shadow-xs font-bold'
                    : 'text-[#94a3b8] hover:text-white hover:bg-[#151c27]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#a3e635]' : 'text-[#64748b]'}`} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Footer Profile */}
      <div className="pt-4 border-t border-[#1e2634] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#1e2736] border border-[#2d384d] flex items-center justify-center text-white font-bold text-xs">
            JD
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-white line-clamp-1">Jordan Pravin</p>
            <p className="text-[10px] text-[#64748b]">Revenue Ops</p>
          </div>
        </div>
      </div>

    </aside>
  );
};
