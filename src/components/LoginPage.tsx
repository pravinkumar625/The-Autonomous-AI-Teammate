import React, { useState } from 'react';
import { Bot, ArrowRight, ShieldCheck, UserCheck, Users, Play } from 'lucide-react';
import type { UserRole } from '../types';

interface LoginPageProps {
  onLogin: (name: string, email: string, role: UserRole) => void;
  onWatchVideo?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onWatchVideo }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    onLogin(name, email, role);
  };

  return (
    <div className="min-h-screen bg-[#070d1e] text-white flex flex-col justify-between items-center p-6 relative overflow-hidden select-none font-sans antialiased">
      
      {/* Background Subtle Mesh Gradients in Electric Blue & White */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-sky-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Logo & Back Button */}
      <header className="w-full max-w-md mx-auto pt-6 flex items-center justify-between relative z-10">
        <button
          type="button"
          onClick={onWatchVideo}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0f172a] hover:bg-slate-800 border border-slate-700 text-[#60a5fa] text-xs font-bold rounded-xl transition cursor-pointer"
        >
          <span>← Back to Video</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2563eb] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="font-heading font-black text-2xl tracking-tight text-white">
            IVY's
          </span>
        </div>
      </header>

      {/* Login Card Container */}
      <main className="w-full max-w-md my-auto relative z-10">
        <div className="ivy-card p-8 rounded-3xl border border-blue-500/30 bg-slate-900/80 space-y-6 text-left shadow-2xl backdrop-blur-xl">
          
          <div className="text-center space-y-2">
            <h1 className="font-heading font-extrabold text-2xl tracking-tight text-white">
              Welcome to IVY's
            </h1>
            <p className="text-xs text-[#60a5fa] font-mono font-bold tracking-wide">
              "Your second brain for revenue"
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            
            {/* Select Dashboard Role */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                Select Workspace Dashboard
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                    role === 'admin'
                      ? 'bg-blue-600/20 border-[#3b82f6] text-white shadow-md shadow-blue-500/20'
                      : 'bg-[#0f172a] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <UserCheck className={`w-4 h-4 ${role === 'admin' ? 'text-[#60a5fa]' : 'text-slate-500'}`} />
                    {role === 'admin' && <span className="w-2 h-2 rounded-full bg-[#3b82f6]"></span>}
                  </div>
                  <div>
                    <div className="text-xs font-black text-white">Admin Teammate</div>
                    <p className="text-[10px] text-slate-400">Full Revenue Dashboard</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                    role === 'customer'
                      ? 'bg-blue-600/20 border-[#3b82f6] text-white shadow-md shadow-blue-500/20'
                      : 'bg-[#0f172a] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Users className={`w-4 h-4 ${role === 'customer' ? 'text-[#60a5fa]' : 'text-slate-500'}`} />
                    {role === 'customer' && <span className="w-2 h-2 rounded-full bg-[#3b82f6]"></span>}
                  </div>
                  <div>
                    <div className="text-xs font-black text-white">Customer Portal</div>
                    <p className="text-[10px] text-slate-400">AI Support & Tickets</p>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Pravin Kumar"
                className="w-full p-3 bg-[#0f172a] text-xs text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:border-[#3b82f6] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                Work Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. pravin@yenepoya.edu.in"
                className="w-full p-3 bg-[#0f172a] text-xs text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:border-[#3b82f6] transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] py-3.5 rounded-xl text-xs font-black text-white shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer mt-4 transition"
            >
              Launch {role === 'admin' ? 'Admin Dashboard' : 'Customer Portal'}
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>

          {/* Replay Video & Disclaimer */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={onWatchVideo}
              className="w-full py-2.5 bg-[#0f172a] hover:bg-slate-800 border border-slate-700 text-[#60a5fa] text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-[#60a5fa] text-[#60a5fa]" />
              Replay Full-Screen Base Video
            </button>

            <div className="p-3.5 rounded-xl bg-[#0f172a] border border-slate-800 text-[11px] text-slate-400 font-mono leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-[#60a5fa]" />
                Blue & White Theme Active
              </div>
              <p>
                Authentication is simulated for this demo. Switch roles anytime inside the top navigation bar.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="pb-4 text-[11px] text-slate-500 font-mono relative z-10">
        IVY's Autonomous AI Teammates · Team LakeForge · Yenepoya University
      </footer>

    </div>
  );
};
