import React, { useState } from 'react';
import { MOCK_PLAYBOOKS } from '../data/mockData';
import type { PlaybookItem } from '../types';
import { ToggleLeft, ToggleRight, Plus } from 'lucide-react';


export const PlaybooksTab: React.FC = () => {
  const [playbooks, setPlaybooks] = useState<PlaybookItem[]>(MOCK_PLAYBOOKS);

  const togglePlaybook = (id: string) => {
    setPlaybooks(prev =>
      prev.map(p => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1e2634]">
        <div>
          <h2 className="font-heading font-extrabold text-[#f8fafc] text-xl">
            Autonomous Agent Playbooks
          </h2>
          <p className="text-xs text-[#94a3b8]">
            Automated triggers, decision logic, and execution rules for Ivy.
          </p>
        </div>

        <button className="ivy-lime-btn px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-[#a3e635]/20 flex items-center gap-2 cursor-pointer">
          <Plus className="w-4 h-4 text-[#0b0e14]" />
          Create New Playbook
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {playbooks.map((pb) => (
          <div
            key={pb.id}
            className="ivy-card p-5 rounded-2xl border border-[#232d3f] space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#a3e635] bg-[#a3e635]/10 px-2 py-0.5 rounded border border-[#a3e635]/30">
                  {pb.category}
                </span>

                <button
                  onClick={() => togglePlaybook(pb.id)}
                  className="text-white hover:text-[#a3e635] transition"
                >
                  {pb.enabled ? (
                    <ToggleRight className="w-6 h-6 text-[#a3e635]" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-[#64748b]" />
                  )}
                </button>
              </div>

              <h3 className="font-heading font-bold text-white text-base">
                {pb.name}
              </h3>

              <div className="space-y-2 text-xs text-[#94a3b8] font-mono bg-[#121721] p-3 rounded-xl border border-[#232d3f]">
                <div>
                  <span className="text-[#64748b] block text-[10px] uppercase">Trigger:</span>
                  <p className="text-slate-200 mt-0.5">{pb.trigger}</p>
                </div>
                <div className="pt-1">
                  <span className="text-[#64748b] block text-[10px] uppercase">Action:</span>
                  <p className="text-[#a3e635] font-semibold mt-0.5">{pb.action}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1e2634] flex items-center justify-between text-xs font-mono">
              <span className="text-[#64748b]">{pb.activeRuns} active runs</span>
              <span className="text-[#a3e635] font-bold">{pb.successRate}% success</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
