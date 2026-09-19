import React from 'react';
import { MOCK_CONVERSATIONS } from '../data/mockData';
import type { ConversationItem } from '../types';
import { Sparkles, RefreshCw, ArrowUpRight, Filter, Video } from 'lucide-react';

interface OverviewTabProps {
  onOpenChat: () => void;
  onOpenVideo?: () => void;
  onSelectConversation: (conv: ConversationItem) => void;
  userName: string;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onOpenChat, onOpenVideo, onSelectConversation, userName }) => {
  const selectedRec = MOCK_CONVERSATIONS[0];
  const firstName = userName ? userName.split(' ')[0] : 'there';

  return (
    <div className="space-y-6 text-left font-sans">
      
      {/* Top Hero Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
        <div className="space-y-1">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <span>Monday, September 23</span>
            <span>/</span>
            <span className="text-[#60a5fa] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa] animate-pulse"></span>
              Live workspace
            </span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Good morning, {firstName}. <br />
            <span className="text-slate-400">Your teammate is already moving.</span>
          </h1>
        </div>

        {/* Right Header Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenVideo}
            className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-[#60a5fa] font-extrabold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/10"
          >
            <Video className="w-4 h-4 text-[#60a5fa]" />
            Full-Screen Base Video
          </button>

          <button className="px-4 py-2 bg-[#0f172a] hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            Sync workspace
          </button>

          <button
            onClick={onOpenChat}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2 rounded-xl text-xs font-black shadow-lg shadow-blue-500/25 flex items-center gap-2 cursor-pointer transition"
          >
            <Sparkles className="w-4 h-4 text-white" />
            Ask IVY's
          </button>
        </div>
      </div>

      {/* 4 KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="ivy-card p-5 rounded-2xl border border-slate-800 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
              REVENUE INFLUENCED
            </span>
            <div className="w-7 h-7 rounded-full bg-[#1e293b] flex items-center justify-center text-slate-300">
              🎯
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl font-black text-white tracking-tight">
              $184.2k
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Pipeline touched by AI actions</p>
          </div>
          <div className="pt-1 flex items-center gap-1 text-[11px] font-mono font-bold text-[#60a5fa]">
            <span className="px-1.5 py-0.5 rounded bg-blue-500/15 border border-blue-400/30">
              ↑ +18.4%
            </span>
            <span className="text-slate-400">vs last week</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="ivy-card p-5 rounded-2xl border border-slate-800 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
              HOURS RETURNED
            </span>
            <div className="w-7 h-7 rounded-full bg-[#1e293b] flex items-center justify-center text-slate-300">
              ⏰
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl font-black text-white tracking-tight">
              42.6h
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Human time saved this week</p>
          </div>
          <div className="pt-1 flex items-center gap-1 text-[11px] font-mono font-bold text-[#60a5fa]">
            <span className="px-1.5 py-0.5 rounded bg-blue-500/15 border border-blue-400/30">
              ↑ +9.7%
            </span>
            <span className="text-slate-400">vs last week</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="ivy-card p-5 rounded-2xl border border-slate-800 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
              FIRST RESPONSE
            </span>
            <div className="w-7 h-7 rounded-full bg-[#1e293b] flex items-center justify-center text-slate-300">
              ⚡
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl font-black text-white tracking-tight">
              2m 14s
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Across sales + support queues</p>
          </div>
          <div className="pt-1 flex items-center gap-1 text-[11px] font-mono font-bold text-[#60a5fa]">
            <span className="px-1.5 py-0.5 rounded bg-blue-500/15 border border-blue-400/30">
              ↓ -31%
            </span>
            <span className="text-slate-400">vs last week</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="ivy-card p-5 rounded-2xl border border-slate-800 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
              HUMAN HANDOFFS
            </span>
            <div className="w-7 h-7 rounded-full bg-[#1e293b] flex items-center justify-center text-slate-300">
              🛡️
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl font-black text-white tracking-tight">
              93%
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Accepted without rework</p>
          </div>
          <div className="pt-1 flex items-center gap-1 text-[11px] font-mono font-bold text-[#60a5fa]">
            <span className="px-1.5 py-0.5 rounded bg-blue-500/15 border border-blue-400/30">
              ↑ +6.2%
            </span>
            <span className="text-slate-400">vs last week</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Needs Your Attention Queue (Left) & AI Recommendation Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Needs Your Attention Queue (7 of 12 columns) */}
        <div className="lg:col-span-7 ivy-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-white text-base">
                  Needs your attention
                </h3>
                <span className="bg-[#2563eb] text-white text-xs font-mono font-black px-2 py-0.5 rounded-full">
                  4
                </span>
              </div>
              <p className="text-xs text-slate-400">
                The teammate has prepared the context. You make the call.
              </p>
            </div>

            <button className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 border border-slate-700">
              <Filter className="w-4 h-4" />
            </button>
          </div>

          {/* Queue List */}
          <div className="space-y-3">
            {MOCK_CONVERSATIONS.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectConversation(item)}
                className="p-4 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] border border-slate-800 cursor-pointer transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${item.avatarBg} font-black text-xs flex items-center justify-center shrink-0`}>
                    {item.customerName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{item.customerName}</span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                        {item.channel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.company} · {item.topic}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                      <span>AI confidence</span>
                      <span className="font-bold text-[#60a5fa]">{item.confidence}%</span>
                    </div>
                    <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                      <div className="bg-[#2563eb] h-full" style={{ width: `${item.confidence}%` }}></div>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400 group-hover:text-white transition">
                    {item.time} ›
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendation Card */}
        <div className="lg:col-span-5 ivy-card p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#60a5fa]">
                  AI RECOMMENDATION
                </span>
                <h3 className="font-heading font-extrabold text-white text-base mt-0.5">
                  The next best move
                </h3>
              </div>

              <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-[#60a5fa]">
                <Sparkles className="w-4 h-4 text-[#60a5fa]" />
              </div>
            </div>

            {/* Target Profile */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0f172a] border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white font-black text-xs flex items-center justify-center">
                  AC
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">{selectedRec.customerName}</h4>
                  <p className="text-[11px] text-slate-400">{selectedRec.company} · VP Operations</p>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-[#60a5fa] bg-blue-500/15 px-2.5 py-1 rounded-full border border-blue-400/30">
                {selectedRec.confidence}% fit
              </span>
            </div>

            {/* Draft Reply Preview */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Pre-Drafted Expansion Quote
              </span>
              <p className="text-xs text-slate-300 font-mono leading-relaxed bg-[#0f172a] p-3 rounded-xl border border-slate-800">
                "{selectedRec.draftReply}"
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => onSelectConversation(selectedRec)}
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 rounded-xl text-xs font-black shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer mt-4 transition"
          >
            Review & Approve Action
            <ArrowUpRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>

    </div>
  );
};
