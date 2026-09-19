import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  PlusCircle, 
  Search, 
  Send,
  UserCheck,
  HelpCircle,
  FileText,
  LogOut,
  Building2,
  CreditCard,
  CheckCircle2,
  Receipt,
  Hash
} from 'lucide-react';
import type { UserRole } from '../types';

interface CustomerDashboardProps {
  userName: string;
  userEmail: string;
  onOpenChat: () => void;
  onOpenVideo: () => void;
  onSwitchRole: (role: UserRole) => void;
  onLogout?: () => void;
}

interface Ticket {
  id: string;
  title: string;
  category: string;
  transactionId?: string;
  status: 'In Progress by IVY AI' | 'Resolved' | 'Escalated to Human';
  created: string;
  aiResponse?: string;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: 'Corporate' | 'Checking' | 'Savings';
  balance: string;
  isPrimary?: boolean;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  userName,
  userEmail: _userEmail,
  onOpenChat,
  onOpenVideo,
  onSwitchRole,
  onLogout
}) => {
  const firstName = userName ? userName.split(' ')[0] : 'Valued Customer';

  const [searchQuery, setSearchQuery] = useState('');
  
  // Ticket Form States
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState('Technical Support');
  const [newTicketTxnId, setNewTicketTxnId] = useState('');
  const [newTicketDesc, setNewTicketDesc] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Bank Form States
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [bankNameInput, setBankNameInput] = useState('');
  const [accNumberInput, setAccNumberInput] = useState('');
  const [ifscInput, setIfscInput] = useState('');
  const [accTypeInput, setAccTypeInput] = useState<'Corporate' | 'Checking' | 'Savings'>('Corporate');

  // 3 Mock Connected Banks
  const [banks, setBanks] = useState<BankAccount[]>([
    {
      id: 'bank-1',
      bankName: 'HDFC Bank',
      accountNumber: '•••• 4829',
      ifscCode: 'HDFC0001234',
      accountType: 'Corporate',
      balance: '$24,500.00',
      isPrimary: true
    },
    {
      id: 'bank-2',
      bankName: 'Chase Bank',
      accountNumber: '•••• 8102',
      ifscCode: 'CHAS0021000',
      accountType: 'Checking',
      balance: '$89,200.00'
    },
    {
      id: 'bank-3',
      bankName: 'ICICI Bank',
      accountNumber: '•••• 3319',
      ifscCode: 'ICIC0000567',
      accountType: 'Savings',
      balance: '$12,850.00'
    }
  ]);

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'T-8421',
      title: 'API Rate Limit & Webhook Integration Inquiry',
      category: 'Technical Support',
      transactionId: 'TXN-98421038',
      status: 'In Progress by IVY AI',
      created: '10 mins ago',
      aiResponse: 'IVY AI verified Transaction ID TXN-98421038 with HDFC Bank. Rate limit burst provisioned.'
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
      transactionId: 'TXN-77341902',
      status: 'Escalated to Human',
      created: 'Sep 18, 2026',
      aiResponse: 'Transaction TXN-77341902 logged. Assigned to Human Account Executive for quote.'
    }
  ]);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle) return;

    const txnFormatted = newTicketTxnId.trim() ? newTicketTxnId.toUpperCase() : undefined;

    const newTicket: Ticket = {
      id: `T-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTicketTitle,
      category: newTicketCategory,
      transactionId: txnFormatted,
      status: 'In Progress by IVY AI',
      created: 'Just now',
      aiResponse: txnFormatted 
        ? `IVY AI verified Transaction ID ${txnFormatted}. Status: Settlement confirmed with connected bank.`
        : `IVY AI is analyzing "${newTicketTitle}". Initial resolution draft sent to your email.`
    };

    setTickets([newTicket, ...tickets]);
    setNewTicketTitle('');
    setNewTicketTxnId('');
    setNewTicketDesc('');
    setIsModalOpen(false);
  };

  const handleAddBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankNameInput || !accNumberInput) return;

    const last4 = accNumberInput.length >= 4 ? accNumberInput.slice(-4) : accNumberInput;

    const newBank: BankAccount = {
      id: `bank-${Date.now()}`,
      bankName: bankNameInput,
      accountNumber: `•••• ${last4}`,
      ifscCode: ifscInput || 'SBIN0009988',
      accountType: accTypeInput,
      balance: '$15,000.00'
    };

    setBanks([...banks, newBank]);
    setBankNameInput('');
    setAccNumberInput('');
    setIfscInput('');
    setIsBankModalOpen(false);
  };

  const filteredTickets = tickets.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.transactionId && t.transactionId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#070d1e] text-white flex flex-col antialiased selection:bg-[#2563eb] selection:text-white font-sans">
      
      {/* Header Bar */}
      <header className="sticky top-0 z-30 bg-[#091026]/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2563eb] flex items-center justify-center text-white font-black shadow-md shadow-blue-500/30">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-heading font-black text-white text-base tracking-tight flex items-center gap-2">
                IVY Support Portal
                <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-[#60a5fa] border border-blue-400/30 px-2 py-0.5 rounded-full">
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
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 rounded-xl text-xs font-bold text-[#60a5fa] transition cursor-pointer"
          >
            Base Video
          </button>

          {/* Switch to Admin Dashboard Pill */}
          <button
            onClick={() => onSwitchRole('admin')}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#1e293b] hover:bg-slate-700 border border-slate-600 rounded-xl text-xs font-bold text-white transition cursor-pointer"
            title="Switch to Admin Teammate Dashboard"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#60a5fa]" />
            <span>Switch to Admin View</span>
          </button>

          {/* Log Out Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
              title="Log out and return to Login screen"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          )}

          <div className="w-8 h-8 rounded-full bg-[#1e293b] border border-slate-700 flex items-center justify-center text-white font-bold text-xs">
            {userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'C'}
          </div>
        </div>

      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-8 space-y-8 text-left">
        
        {/* Welcome Hero Banner */}
        <div className="ivy-card p-6 md:p-8 rounded-3xl border border-blue-500/30 relative overflow-hidden bg-gradient-to-r from-[#0f172a] via-[#101b38] to-[#0f172a] shadow-2xl">
          <div className="relative z-10 space-y-4 max-w-2xl">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-xs font-mono font-bold text-[#60a5fa]">
              <span className="w-2 h-2 rounded-full bg-[#60a5fa] animate-ping"></span>
              IVY Autonomous AI Assistant is Online 24/7
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              Hello, {firstName}. <br />
              <span className="text-[#60a5fa]">How can IVY assist you today?</span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Ask any question, verify transaction IDs, manage connected bank accounts, or chat live with IVY AI.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenChat}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-xl text-xs font-black shadow-lg shadow-blue-500/30 flex items-center gap-2.5 cursor-pointer transition"
              >
                <Sparkles className="w-4 h-4 text-white" />
                Chat with IVY AI Now
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-3 bg-[#0f172a] hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-[#60a5fa]" />
                Enquire / Submit Ticket
              </button>

              <button
                onClick={() => setIsBankModalOpen(true)}
                className="px-5 py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-[#60a5fa] font-bold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-[#60a5fa]" />
                + Add Bank Account
              </button>
            </div>

          </div>

          <div className="absolute top-1/2 right-6 -translate-y-1/2 hidden lg:flex items-center justify-center opacity-15 pointer-events-none">
            <Bot className="w-72 h-72 text-blue-400" />
          </div>
        </div>

        {/* Connected Bank Accounts Section */}
        <div className="ivy-card p-6 rounded-3xl border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
            <div>
              <h2 className="font-heading font-extrabold text-xl text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#60a5fa]" />
                Connected Bank Accounts
                <span className="text-xs font-mono font-bold bg-[#1e293b] text-[#60a5fa] px-2.5 py-0.5 rounded-full border border-slate-700">
                  {banks.length}
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Manage bank payout methods and automated transaction verification</p>
            </div>

            <button
              onClick={() => setIsBankModalOpen(true)}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20 self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              Add Bank Account
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {banks.map((b) => (
              <div 
                key={b.id} 
                className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-3 relative overflow-hidden group hover:border-blue-500/40 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-[#60a5fa]">
                      <CreditCard className="w-4 h-4 text-[#60a5fa]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{b.bankName}</h3>
                      <p className="text-[10px] font-mono text-slate-400">{b.accountType}</p>
                    </div>
                  </div>

                  {b.isPrimary && (
                    <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-[#60a5fa] border border-blue-400/30 px-2 py-0.5 rounded-full">
                      Primary
                    </span>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">{b.accountNumber}</span>
                  <span className="text-slate-400">IFSC: {b.ifscCode}</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">Available Limit</span>
                  <span className="font-bold text-white font-mono">{b.balance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tickets & Transaction Enquiries Section */}
        <div className="ivy-card p-6 rounded-3xl border border-slate-800 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="font-heading font-extrabold text-xl text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#60a5fa]" />
                Support Tickets & Transaction Enquiries
                <span className="text-xs font-mono font-bold bg-[#1e293b] text-[#60a5fa] px-2.5 py-0.5 rounded-full border border-slate-700">
                  {tickets.length}
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">Search by issue topic or Transaction ID (e.g. TXN-98421038)</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search topic or Txn ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-[#0f172a] text-xs text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:border-[#3b82f6] transition w-full sm:w-56"
                />
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <PlusCircle className="w-4 h-4 text-white" />
                New Enquiry
              </button>
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {filteredTickets.map((t) => (
              <div 
                key={t.id} 
                className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-3 hover:border-blue-500/50 transition group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      {t.id}
                    </span>

                    {t.transactionId && (
                      <span className="text-xs font-mono font-bold text-[#60a5fa] bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30 flex items-center gap-1">
                        <Hash className="w-3 h-3 text-[#60a5fa]" />
                        {t.transactionId}
                      </span>
                    )}

                    <h3 className="font-bold text-white text-sm group-hover:text-[#60a5fa] transition">
                      {t.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                      t.status === 'In Progress by IVY AI' 
                        ? 'bg-blue-500/20 text-[#60a5fa] border-blue-400/40'
                        : t.status === 'Resolved'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400/40'
                        : 'bg-amber-500/20 text-amber-400 border-amber-400/40'
                    }`}>
                      {t.status}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{t.created}</span>
                  </div>
                </div>

                {t.aiResponse && (
                  <div className="p-3.5 rounded-xl bg-[#172138] border border-slate-700 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-[#60a5fa] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#60a5fa]" />
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
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
        <div className="ivy-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="font-heading font-extrabold text-xl text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#60a5fa]" />
            Frequently Asked Questions & Bank Integration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#60a5fa]" />
                How do I verify a bank Transaction ID?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your Transaction ID (e.g. TXN-98421038) in the enquiry form or live AI chat, and IVY will cross-verify settlement status with your connected bank.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f172a] border border-slate-800 space-y-2">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#60a5fa]" />
                Which banks are supported for instant payout?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                HDFC Bank, Chase Bank, ICICI Bank, State Bank of India, and all major corporate accounts are supported.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* 1. New Support Ticket / Transaction Enquiry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg bg-[#0f172a] border border-slate-700 rounded-3xl p-6 space-y-5 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-extrabold text-lg text-white">
                Submit Support Enquiry / Transaction Request
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                  Enquiry Title / Topic
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Payment status or API key setup assistance"
                  value={newTicketTitle}
                  onChange={(e) => setNewTicketTitle(e.target.value)}
                  className="w-full p-3 bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:outline-none focus:border-[#3b82f6]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1 flex items-center justify-between">
                  <span>Transaction ID / Reference No.</span>
                  <span className="text-[10px] text-[#60a5fa] font-mono font-normal">Optional (e.g. TXN-98421038)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. TXN-98421038"
                  value={newTicketTxnId}
                  onChange={(e) => setNewTicketTxnId(e.target.value)}
                  className="w-full p-3 bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:outline-none focus:border-[#3b82f6] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                  Category
                </label>
                <select
                  value={newTicketCategory}
                  onChange={(e) => setNewTicketCategory(e.target.value)}
                  className="w-full p-3 bg-slate-900 text-xs text-white rounded-xl border border-slate-700 focus:outline-none focus:border-[#3b82f6]"
                >
                  <option value="Technical Support">Technical Support</option>
                  <option value="Bank Transaction Enquiry">Bank Transaction Enquiry</option>
                  <option value="Onboarding">Onboarding</option>
                  <option value="Billing">Billing & Plan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                  Details / Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your issue or question in detail..."
                  value={newTicketDesc}
                  onChange={(e) => setNewTicketDesc(e.target.value)}
                  className="w-full p-3 bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:outline-none focus:border-[#3b82f6]"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2 rounded-xl text-xs font-black shadow-lg shadow-blue-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Add Bank Account Modal */}
      {isBankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg bg-[#0f172a] border border-slate-700 rounded-3xl p-6 space-y-5 shadow-2xl text-left font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#60a5fa]" />
                Connect New Bank Account
              </h3>
              <button
                onClick={() => setIsBankModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddBank} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HDFC Bank, ICICI Bank, Chase Bank"
                  value={bankNameInput}
                  onChange={(e) => setBankNameInput(e.target.value)}
                  className="w-full p-3 bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:outline-none focus:border-[#3b82f6]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 984210384829"
                  value={accNumberInput}
                  onChange={(e) => setAccNumberInput(e.target.value)}
                  className="w-full p-3 bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:outline-none focus:border-[#3b82f6] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                  IFSC / Routing Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. HDFC0001234"
                  value={ifscInput}
                  onChange={(e) => setIfscInput(e.target.value)}
                  className="w-full p-3 bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:outline-none focus:border-[#3b82f6] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                  Account Type
                </label>
                <select
                  value={accTypeInput}
                  onChange={(e) => setAccTypeInput(e.target.value as any)}
                  className="w-full p-3 bg-slate-900 text-xs text-white rounded-xl border border-slate-700 focus:outline-none focus:border-[#3b82f6]"
                >
                  <option value="Corporate">Corporate Account</option>
                  <option value="Checking">Checking Account</option>
                  <option value="Savings">Savings Account</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBankModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2 rounded-xl text-xs font-black shadow-lg shadow-blue-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  Connect Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
