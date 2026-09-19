import React, { useState, useRef } from 'react';
import { Bot, Play, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Volume2, VolumeX } from 'lucide-react';

interface IntroVideoPageProps {
  onStart: () => void;
}

export const IntroVideoPage: React.FC<IntroVideoPageProps> = ({ onStart }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayVideo = () => {
    setHasStarted(true);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log('Autoplay error:', err));
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col justify-between items-center p-4 sm:p-8 relative overflow-hidden select-none antialiased">
      
      {/* Background Ambient Glow matching the video & IVY aesthetic */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#a3e635]/20 via-emerald-600/10 to-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#a3e635]/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Top Branding Header */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between pt-2 pb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#a3e635] flex items-center justify-center text-[#0b0e14] font-black shadow-lg shadow-[#a3e635]/30">
            <Bot className="w-6 h-6 text-[#0b0e14]" />
          </div>
          <div>
            <div className="font-heading font-black text-2xl tracking-tight text-white leading-none">
              IVY's
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#a3e635] font-bold">
              AUTONOMOUS AI TEAMMATE
            </span>
          </div>
        </div>

        <button
          onClick={onStart}
          className="flex items-center gap-2 px-4 py-2 bg-[#141b26] hover:bg-[#1e2736] border border-[#263347] rounded-xl text-xs font-bold text-[#94a3b8] hover:text-white transition cursor-pointer"
        >
          <span>Skip to Login</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Video Hero Stage */}
      <main className="w-full max-w-4xl mx-auto my-auto relative z-10 flex flex-col items-center space-y-6">
        
        {/* Badge & Title */}
        <div className="text-center space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30 text-xs font-mono font-bold text-[#a3e635]">
            <Sparkles className="w-3.5 h-3.5 text-[#a3e635]" />
            Official Platform Presentation & Video Demo
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Meet IVY. <br />
            <span className="text-[#a3e635] drop-shadow-[0_0_25px_rgba(163,230,53,0.3)]">
              Your Autonomous AI Teammate.
            </span>
          </h1>
          
          <p className="text-sm text-[#94a3b8] leading-relaxed">
            Watch how IVY continuously resolves support inquiries, manages revenue playbooks, and drives automated outcomes for your enterprise.
          </p>
        </div>

        {/* Premium Dark Glassmorphic Video Box */}
        <div className="w-full ivy-card rounded-3xl border border-[#263347] overflow-hidden shadow-2xl shadow-[#a3e635]/15 bg-[#0f141c] relative group">
          
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            
            <video
              ref={videoRef}
              src="/demo-video.mp4"
              className="w-full h-full object-contain"
              playsInline
              controls={hasStarted}
              onEnded={() => setIsPlaying(false)}
            >
              Your browser does not support HTML video playback.
            </video>

            {/* Video Pre-Start Overlay matching the video exact theme */}
            {!hasStarted && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/75 to-transparent flex flex-col items-center justify-center p-6 text-center z-10">
                
                {/* Glowing Play Icon */}
                <button
                  onClick={handlePlayVideo}
                  className="w-20 h-20 rounded-full bg-[#a3e635] text-[#0b0e14] flex items-center justify-center mb-6 shadow-2xl shadow-[#a3e635]/40 hover:scale-110 active:scale-95 transition cursor-pointer group-hover:shadow-[#a3e635]/60"
                  title="Click to play video"
                >
                  <Play className="w-8 h-8 fill-[#0b0e14] ml-1 text-[#0b0e14]" />
                </button>

                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                  Click Below to Start Presentation
                </h2>
                
                <p className="text-xs sm:text-sm text-[#94a3b8] max-w-md mb-6">
                  See IVY in action before launching your workspace.
                </p>

                <div className="flex flex-wrap justify-center items-center gap-4">
                  <button
                    onClick={handlePlayVideo}
                    className="ivy-lime-btn px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-[#0b0e14] shadow-xl shadow-[#a3e635]/30 flex items-center gap-2.5 cursor-pointer transform hover:scale-105 active:scale-95 transition"
                  >
                    <Play className="w-4 h-4 fill-[#0b0e14]" />
                    <span>START VIDEO DEMO</span>
                  </button>

                  <button
                    onClick={onStart}
                    className="px-6 py-3.5 rounded-2xl bg-[#1a2332] hover:bg-[#243044] border border-[#2d384d] text-xs font-bold text-white transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Login</span>
                    <ArrowRight className="w-4 h-4 text-[#a3e635]" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Controls Bar if Video Started */}
          {hasStarted && (
            <div className="px-6 py-3.5 bg-[#121721] border-t border-[#222e40] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-ping"></span>
                <span className="font-bold text-white">Playing IVY Demo Video</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="px-3 py-1 bg-[#1e2736] hover:bg-[#283549] text-white rounded-lg font-medium transition cursor-pointer"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-1.5 bg-[#1e2736] hover:bg-[#283549] text-white rounded-lg transition cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#a3e635]" />}
                </button>

                <button
                  onClick={onStart}
                  className="ivy-lime-btn px-4 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 cursor-pointer ml-2"
                >
                  <span>Continue to App</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0b0e14]" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-2">
          <div className="p-4 rounded-2xl bg-[#0f141c] border border-[#232d3f] flex items-center gap-3 text-left">
            <CheckCircle2 className="w-5 h-5 text-[#a3e635] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Autonomous AI Agent</div>
              <p className="text-[11px] text-[#8e9bb0]">Operates 24/7 with zero downtime</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0f141c] border border-[#232d3f] flex items-center gap-3 text-left">
            <CheckCircle2 className="w-5 h-5 text-[#a3e635] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Live n8n Automation</div>
              <p className="text-[11px] text-[#8e9bb0]">Instant API & Webhook execution</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0f141c] border border-[#232d3f] flex items-center gap-3 text-left">
            <CheckCircle2 className="w-5 h-5 text-[#a3e635] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Dual Dashboards</div>
              <p className="text-[11px] text-[#8e9bb0]">Admin & Customer Portal Views</p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto pt-6 pb-2 border-t border-[#1e2634]/60 text-center text-xs text-[#64748b] font-mono relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>IVY's Autonomous AI Teammates · Team LakeForge · Yenepoya University</div>
        <div className="flex items-center gap-1.5 text-[#a3e635]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" />
          <span>Hackathon Demo Version</span>
        </div>
      </footer>

    </div>
  );
};
