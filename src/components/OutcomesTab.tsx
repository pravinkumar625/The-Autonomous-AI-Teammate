import React from 'react';
import { MOCK_OUTCOMES } from '../data/mockData';
import { CheckCircle2 } from 'lucide-react';


export const OutcomesTab: React.FC = () => {
  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1e2634]">
        <div>
          <h2 className="font-heading font-extrabold text-[#f8fafc] text-xl">
            Autonomous Agent Outcomes Pulse
          </h2>
          <p className="text-xs text-[#94a3b8]">
            Quantifiable value delivered by Ivy across revenue, speed, and time saved.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#121721] px-3.5 py-1.5 rounded-xl border border-[#232d3f] text-xs font-mono">
          <span className="text-[#64748b]">Autonomy Score:</span>
          <span className="text-[#a3e635] font-black text-sm">91.4 / 100</span>
        </div>
      </div>

      <div className="space-y-3">
        {MOCK_OUTCOMES.map((out) => (
          <div
            key={out.id}
            className="ivy-card p-4 rounded-xl border border-[#232d3f] flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/30 flex items-center justify-center text-[#a3e635]">
                <CheckCircle2 className="w-5 h-5 text-[#a3e635]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-xs">{out.title}</h3>
                <p className="text-[11px] text-[#94a3b8] font-mono">{out.category} · {out.date}</p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-[#a3e635] bg-[#a3e635]/10 px-3 py-1 rounded-full border border-[#a3e635]/30">
              {out.impact}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
