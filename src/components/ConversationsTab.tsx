import React, { useState } from 'react';
import { MOCK_CONVERSATIONS } from '../data/mockData';
import type { ConversationItem } from '../types';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';


interface ConversationsTabProps {
  selectedConv?: ConversationItem | null;
}

export const ConversationsTab: React.FC<ConversationsTabProps> = ({ selectedConv }) => {
  const [activeConv, setActiveConv] = useState<ConversationItem>(selectedConv || MOCK_CONVERSATIONS[0]);
  const [isApproved, setIsApproved] = useState(false);

  const handleApprove = () => {
    setIsApproved(true);
    setTimeout(() => {
      setIsApproved(false);
    }, 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
      
      {/* Left List (5 of 12 columns) */}
      <div className="lg:col-span-5 ivy-card p-5 rounded-2xl border border-[#232d3f] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e2634]">
          <h2 className="font-heading font-extrabold text-white text-base">
            Conversations ({MOCK_CONVERSATIONS.length})
          </h2>
          <span className="text-xs font-mono font-bold text-[#a3e635] bg-[#a3e635]/10 px-2.5 py-1 rounded-full border border-[#a3e635]/30">
            Active Queue
          </span>
        </div>

        <div className="space-y-2.5">
          {MOCK_CONVERSATIONS.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConv(conv)}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                activeConv.id === conv.id
                  ? 'bg-[#1e2736] border-[#a3e635]/50 shadow-md shadow-[#a3e635]/5'
                  : 'bg-[#121721] border-[#232d3f] hover:bg-[#18202c]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full ${conv.avatarBg} font-black text-xs flex items-center justify-center`}>
                    {conv.customerName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{conv.customerName}</h4>
                    <p className="text-[11px] text-[#94a3b8]">{conv.company}</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold text-[#a3e635]">
                  {conv.confidence}% AI
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] line-clamp-1 mt-2 font-mono">
                {conv.topic}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Conversation Detail & AI Analysis (7 of 12 columns) */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Detail Panel */}
        <div className="ivy-card p-6 rounded-2xl border border-[#232d3f] space-y-5">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1e2634]">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${activeConv.avatarBg} font-black text-xs flex items-center justify-center`}>
                {activeConv.customerName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-white text-base">
                  {activeConv.customerName}
                </h3>
                <p className="text-xs text-[#94a3b8]">
                  {activeConv.company} · {activeConv.channel} Channel
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-[#a3e635] bg-[#a3e635]/10 px-3 py-1 rounded-full border border-[#a3e635]/30">
              {activeConv.confidence}% Confidence
            </span>
          </div>

          {/* Customer Message */}
          <div className="p-4 rounded-xl bg-[#121721] border border-[#232d3f] space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#64748b] uppercase tracking-wider block">
              Inbound Customer Message ({activeConv.time})
            </span>
            <p className="text-xs text-white leading-relaxed">
              "{activeConv.lastMessage}"
            </p>
          </div>

          {/* AI Context Analysis */}
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-900/50 space-y-2">
            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Ivy AI Context & Playbook Analysis
            </span>
            <p className="text-xs text-purple-200 font-mono leading-relaxed">
              {activeConv.aiAnalysis}
            </p>
          </div>

          {/* Pre-Drafted Response */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#64748b] uppercase tracking-wider block">
              Pre-Drafted Teammate Response
            </span>
            <textarea
              rows={4}
              value={activeConv.draftReply}
              readOnly
              className="w-full p-3.5 bg-[#121721] text-xs text-slate-200 font-mono rounded-xl border border-[#232d3f] focus:outline-none"
            />
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-[#64748b] font-mono">
              Action: Approve external message send
            </span>

            <button
              onClick={handleApprove}
              disabled={isApproved}
              className="ivy-lime-btn px-6 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-[#a3e635]/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isApproved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#0b0e14]" />
                  Approved & Sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#0b0e14]" />
                  Approve and Send
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
