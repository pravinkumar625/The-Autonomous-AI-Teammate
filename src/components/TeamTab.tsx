import React, { useState } from 'react';
import { MOCK_TEAM } from '../data/mockData';
import { UserPlus, ExternalLink } from 'lucide-react';


export const TeamTab: React.FC = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteSent, setInviteSent] = useState(false);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setShowInviteModal(false);
      setInviteEmail('');
    }, 1500);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1e2634]">
        <div>
          <h2 className="font-heading font-extrabold text-[#f8fafc] text-xl">
            Team Workspace & Capacity Roster
          </h2>
          <p className="text-xs text-[#94a3b8]">
            Collaborate alongside your human teammate team and monitor workload capacity.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="ivy-lime-btn px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-[#a3e635]/20 flex items-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-[#0b0e14]" />
          Invite Teammate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_TEAM.map((member) => (
          <div
            key={member.id}
            className="ivy-card p-5 rounded-2xl border border-[#232d3f] space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1e2736] border border-[#2d384d] flex items-center justify-center text-white font-bold text-sm">
                  {member.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{member.name}</h3>
                  <p className="text-xs text-[#94a3b8]">{member.role}</p>
                </div>
              </div>

              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                member.availability === 'Available'
                  ? 'bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635]/30'
                  : 'bg-amber-400/10 text-amber-300 border-amber-400/30'
              }`}>
                {member.availability}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono bg-[#121721] p-3 rounded-xl border border-[#232d3f]">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Focus Area:</span>
                <span className="text-slate-200 font-semibold">{member.focus}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#64748b]">Assigned Playbook:</span>
                <span className="text-[#a3e635] font-semibold">{member.playbook}</span>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#64748b]">Bandwidth Capacity</span>
                <span className="text-white font-bold">{member.capacity}%</span>
              </div>
              <div className="w-full bg-[#121721] h-2 rounded-full overflow-hidden border border-[#232d3f]">
                <div
                  className={`h-full transition-all ${
                    member.capacity > 75 ? 'bg-amber-400' : 'bg-[#a3e635]'
                  }`}
                  style={{ width: `${member.capacity}%` }}
                ></div>
              </div>
            </div>

            <button className="w-full py-2 bg-[#121721] hover:bg-[#18202c] border border-[#232d3f] text-slate-300 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" />
              Open Teammate Workspace
            </button>
          </div>
        ))}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0e14]/80 backdrop-blur-sm">
          <div className="ivy-card p-6 rounded-2xl border border-[#232d3f] max-w-md w-full text-left space-y-4 shadow-2xl">
            <h3 className="font-heading font-extrabold text-white text-base">Invite Teammate to Ivy</h3>
            <p className="text-xs text-[#94a3b8]">
              Enter your colleague's work email to grant access to your workspace playbooks and queues.
            </p>

            <form onSubmit={handleSendInvite} className="space-y-3">
              <input
                type="email"
                required
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full p-3 bg-[#121721] text-xs text-white placeholder-[#64748b] rounded-xl border border-[#232d3f] focus:outline-none focus:border-[#a3e635]"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#94a3b8] hover:bg-[#121721] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ivy-lime-btn px-5 py-2 rounded-xl text-xs font-black"
                >
                  {inviteSent ? 'Invite Sent!' : 'Send Invite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
