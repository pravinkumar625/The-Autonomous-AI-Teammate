import React, { useState } from 'react';
import { Bot, ArrowRight, ShieldCheck } from 'lucide-react';


interface LoginPageProps {
  onLogin: (name: string, email: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    onLogin(name, email);
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col justify-between items-center p-6 relative overflow-hidden select-none">
      
      {/* Background Subtle Mesh Gradients matching spec */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#a3e635]/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Logo */}
      <header className="pt-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#a3e635] flex items-center justify-center text-[#0b0e14] font-black text-xl shadow-lg shadow-[#a3e635]/25">
            <Bot className="w-6 h-6 text-[#0b0e14]" />
          </div>
          <span className="font-heading font-black text-2xl tracking-tight">
            IVY's
          </span>
        </div>
      </header>

      {/* Login Card Container */}
      <main className="w-full max-w-md my-auto relative z-10">
        <div className="ivy-card p-8 rounded-3xl border border-[#232d3f] space-y-6 text-left shadow-2xl backdrop-blur-xl">
          
          <div className="text-center space-y-2">
            <h1 className="font-heading font-extrabold text-2xl tracking-tight">
              Welcome to IVY's
            </h1>
            <p className="text-xs text-[#a3e635] font-mono font-bold tracking-wide">
              "Your second brain for revenue"
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-mono font-bold text-[#94a3b8] uppercase tracking-wider mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Pravin Kumar"
                className="w-full p-3 bg-[#121721] text-xs text-white placeholder-[#64748b] rounded-xl border border-[#232d3f] focus:outline-none focus:border-[#a3e635] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#94a3b8] uppercase tracking-wider mb-1">
                Work Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. pravin@yenepoya.edu.in"
                className="w-full p-3 bg-[#121721] text-xs text-white placeholder-[#64748b] rounded-xl border border-[#232d3f] focus:outline-none focus:border-[#a3e635] transition"
              />
            </div>

            <button
              type="submit"
              className="w-full ivy-lime-btn py-3.5 rounded-xl text-xs font-black shadow-lg shadow-[#a3e635]/25 flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              Continue to IVY's
              <ArrowRight className="w-4 h-4 text-[#0b0e14]" />
            </button>
          </form>

          {/* Frontend Demo Disclaimer */}
          <div className="p-3.5 rounded-xl bg-[#121721] border border-[#232d3f] text-[11px] text-[#94a3b8] font-mono leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#a3e635]" />
              Frontend Demo Workspace
            </div>
            <p>
              Authentication is simulated for this frontend demo. Full NextAuth/OAuth providers can be connected seamlessly.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="pb-4 text-[11px] text-[#64748b] font-mono relative z-10">
        IVY's Autonomous AI Teammates · Team LakeForge · Yenepoya University
      </footer>

    </div>
  );
};
