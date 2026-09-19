import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  PlusCircle, 
  Clock, 
  Search, 
  BookOpen, 
  ShieldCheck, 
  Send,
  UserCheck,
  HelpCircle,
  FileText
} from 'lucide-react';
import type { UserRole } from '../types';

interface CustomerDashboardProps {
  userName: string;
  userEmail: string;
  onOpenChat: () => void;
  onOpenVideo: () => void;
  onSwitchRole: (role: UserRole) => void;
}

interface Ticket {
  id: string;
  title: string;
  category: string;
  status: 'In Progress by IVY AI' | 'Resolved' | 'Escalated to Human';
  created: string;
  aiResponse?: string;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  userName,
  userEmail: _userEmail,
  onOpenChat,
  onOpenVideo,
  onSwitchRole
}) => {
  const firstName = userName ? userName.split(' ')[0] : 'Valued Customer';

  const [searchQuery, setSearchQuery] = useState('');
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState('Technical Support');
  const [newTicketDesc, setNewTicketDesc] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'T-8421',
      title: 'API Rate Limit & Webhook Integration Inquiry',
      category: 'Technical Support',
      status: 'In Progress by IVY AI',
      created: '10 mins ago',
      aiResponse: 'IVY AI has automatically verified your API key limits and provisioned 5,000 extra burst requests.'
    },
    {
      id: 'T-8390',
      title: 'Autonomous Playbook Setup Assistance',
      category: 'Onboarding',
      status: 'Resolved',
      created: 'Yesterday',
      aiResponse: 'IVY AI configured 3 default revenue playbooks for your sales channel.'
    },
    {
      id: 'T-8312',
      title: 'Enterprise Billing & Annual Seat Upgrade',
      category: 'Billing',
      status: 'Escalated to Human',
      created: 'Sep 18, 2026',
      aiResponse: 'Assigned to Human Account Executive (Jordan Pravin) for custom enterprise quote.'
    }
  ]);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle) return;

    const newTicket: Ticket = {
      id: `T-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTicketTitle,
      category: newTicketCategory,
      status: 'In Progress by IVY AI',
      created: 'Just now',
      aiResponse: `IVY AI is analyzing "${newTicketTitle}". Initial resolution draft sent to your email.`
    };

    setTickets([newTicket, ...tickets]);
    setNewTicketTitle('');
    setNewTicketDesc('');
    setIsModalOpen(false);
  };

  const filteredTickets = tickets.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col antialiased selection:bg-[#a3e635] selection:text-[#0b0e14]">
      
      {/* Header Bar */}
      <header className="sticky top-0 z-30 bg-[#0d1117]/90 backdrop-blur-md border-b border-[#1e2634] px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#a3e635] flex items-center justify-center text-[#0b0e14] font-black shadow-md shadow-[#a3e635]/20">
              <Bot className="w-5 h-5 text-[#0b0e14]" />
            </div>
            <div className="text-left">
              <div className="font-heading font-black text-white text-base tracking-tight flex items-center gap-2">
                IVY Support Portal
                <span className="text-[10px] font-mono font-bold bg-[#a3e635]/15 text-[#a3e635] border border-[#a3e635]/30 px-2 py-0.5 rounded-full">
                  Customer View
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls & Role Switcher */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={onOpenVideo}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#a3e635]/10 hover:bg-[#a3e635]/20 border border-[#a3e635]/30 rounded-xl text-xs font-bold text-[#a3e635] transition cursor-pointer"
          >
            Watch Demo
          </button>

          {/* Switch to Admin Dashboard Pill */}
          <button
            onClick={() => onSwitchRole('admin')}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#1e2736] hover:bg-[#283549] border border-[#2d384d] rounded-xl text-xs font-bold text-white transition cursor-pointer"
            title="Switch to Admin Teammate Dashboard"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#a3e635]" />
            <span>Switch to Admin View</span>
          </button>

          <div className="w-8 h-8 rounded-full bg-[#1e2736] border border-[#2d384d] flex items-center justify-center text-white font-bold text-xs">
            {userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'C'}
          </div>
        </div>

      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-8 space-y-8 text-left">
        
        {/* Welcome Hero Banner */}
        <div className="ivy-card p-6 md:p-8 rounded-3xl border border-[#232d3f] relative overflow-hidden bg-gradient-to-r from-[#111722] via-[#0f141d] to-[#131c2b] shadow-2xl">
          <div className="relative z-10 space-y-4 max-w-2xl">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30 text-xs font-mono font-bold text-[#a3e635]">
              <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-ping"></span>
              IVY Autonomous AI Assistant is Online 24/7
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              Hello, {firstName}. <br />
              <span className="text-[#a3e635]">How can IVY assist you today?</span>
            </h1>

            <p className="text-sm text-[#94a3b8] leading-relaxed">
              Ask any question, manage active service requests, or chat live with your dedicated IVY AI Teammate.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenChat}
                className="ivy-lime-btn px-6 py-3 rounded-xl text-xs font-black shadow-lg shadow-[#a3e635]/25 flex items-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#0b0e14]" />
                Chat with IVY AI Now
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-3 bg-[#141b26] hover:bg-[#1e2736] border border-[#232d3f] text-white font-bold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-[#a3e635]" />
                Submit New Support Ticket
              </button>
            </div>

          </div>

          <div className="absolute top-1/2 right-6 -translate-y-1/2 hidden lg:flex items-center justify-center opacity-20 pointer-events-none">
            <Bot className="w-72 h-72 text-[#a3e635]" />
          </div>
        </div>

        {/* 3 Quick Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="ivy-card p-5 rounded-2xl border border-[#232d3f] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/30 flex items-center justify-center text-[#a3e635] mb-2">
              <Clock className="w-5 h-5 text-[#a3e635]" />
            </div>
            <h3 className="font-extrabold text-white text-base">Instant AI Resolution</h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Average response time under 30 seconds powered by n8n workflow automation.
            </p>
          </div>

          <div className="ivy-card p-5 rounded-2xl border border-[#232d3f] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/30 flex items-center justify-center text-[#a3e635] mb-2">
              <ShieldCheck className="w-5 h-5 text-[#a3e635]" />
            </div>
            <h3 className="font-extrabold text-white text-base">Human Escalation Guard</h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Complex requests automatically hand off to senior human engineers with full context.
            </p>
          </div>

          <div className="ivy-card p-5 rounded-2xl border border-[#232d3f] space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#a3e635]/10 border border-[#a3e635]/30 flex items-center justify-center text-[#a3e635] mb-2">
              <BookOpen className="w-5 h-5 text-[#a3e635]" />
            </div>
            <h3 className="font-extrabold text-white text-base">Autonomous Playbooks</h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Self-healing AI workflows that setup integrations and troubleshoot issues in real-time.
            </p>
          </div>

        </div>

        {/* Tickets Section */}
        <div className="ivy-card p-6 rounded-3xl border border-[#232d3f] space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2634]">
            <div>
              <h2 className="font-heading font-extrabold text-xl text-white flex items-center gap-2">
                My Support Tickets & Inquiries
                <span className="text-xs font-mono font-bold bg-[#1e2736] text-[#a3e635] px-2.5 py-0.5 rounded-full border border-[#2d384d]">
                  {tickets.length}
                </span>
              </h2>
              <p className="text-xs text-[#94a3b8] mt-1">Track real-time status of your active requests</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-[#64748b] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-[#121721] text-xs text-white placeholder-[#64748b] rounded-xl border border-[#232d3f] focus:outline-none focus:border-[#a3e635] transition w-full sm:w-48"
                />
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="ivy-lime-btn px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <PlusCircle className="w-4 h-4 text-[#0b0e14]" />
                New Ticket
              </button>
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {filteredTickets.map((t) => (
              <div 
                key={t.id} 
                className="p-5 rounded-2xl bg-[#121721] border border-[#232d3f] space-y-3 hover:border-[#a3e635]/40 transition group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#64748b] bg-[#1a2332] px-2 py-0.5 rounded border border-[#2d384d]">
                      {t.id}
                    </span>
                    <h3 className="font-bold text-white text-sm group-hover:text-[#a3e635] transition">
                      {t.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                      t.status === 'In Progress by IVY AI' 
                        ? 'bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635]/30'
                        : t.status === 'Resolved'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {t.status}
                    </span>
                    <span className="text-xs text-[#64748b] font-mono">{t.created}</span>
                  </div>
                </div>

                {t.aiResponse && (
                  <div className="p-3.5 rounded-xl bg-[#171e2c] border border-[#263347] flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-[#a3e635]/15 text-[#a3e635] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#a3e635]" />
                    </div>
                    <div className="text-xs text-[#94a3b8] leading-relaxed">
                      <strong className="text-white">IVY AI Status: </strong>
                      {t.aiResponse}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Knowledge Base FAQs */}
        <div className="ivy-card p-6 rounded-3xl border border-[#232d3f] space-y-4">
          <h2 className="font-heading font-extrabold text-xl text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#a3e635]" />
            Frequently Asked Questions & AI Solutions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#121721] border border-[#232d3f] space-y-2">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#a3e635]" />
                How does IVY handle n8n webhook triggers?
              </h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                IVY sends real-time payload data directly to your n8n workflow webhook endpoint and streams intelligent responses back instantly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#121721] border border-[#232d3f] space-y-2">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#a3e635]" />
                Can I escalate an AI ticket to a human manager?
              </h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Yes, simply click "Ask IVY AI" or submit a ticket and type "Talk to human manager", and your account teammate will step in.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* New Ticket Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06080c]/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg bg-[#0f141c] border border-[#263347] rounded-3xl p-6 space-y-5 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#222e40]">
              <h3 className="font-heading font-extrabold text-lg text-white">
                Submit New Support Request
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#8e9bb0] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#94a3b8] uppercase mb-1">
                  Issue Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Need assistance with API key setup"
                  value={newTicketTitle}
                  onChange={(e) => setNewTicketTitle(e.target.value)}
                  className="w-full p-3 bg-[#121721] text-xs text-white placeholder-[#64748b] rounded-xl border border-[#232d3f] focus:outline-none focus:border-[#a3e635]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#94a3b8] uppercase mb-1">
                  Category
                </label>
                <select
                  value={newTicketCategory}
                  onChange={(e) => setNewTicketCategory(e.target.value)}
                  className="w-full p-3 bg-[#121721] text-xs text-white rounded-xl border border-[#232d3f] focus:outline-none focus:border-[#a3e635]"
                >
                  <option value="Technical Support">Technical Support</option>
                  <option value="Onboarding">Onboarding</option>
                  <option value="Billing">Billing & Plan</option>
                  <option value="Feature Request">Feature Request</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#94a3b8] uppercase mb-1">
                  Details / Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your issue or question in detail..."
                  value={newTicketDesc}
                  onChange={(e) => setNewTicketDesc(e.target.value)}
                  className="w-full p-3 bg-[#121721] text-xs text-white placeholder-[#64748b] rounded-xl border border-[#232d3f] focus:outline-none focus:border-[#a3e635]"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#1e2736] hover:bg-[#283549] text-white rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ivy-lime-btn px-5 py-2 rounded-xl text-xs font-black shadow-lg shadow-[#a3e635]/25 flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#0b0e14]" />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
