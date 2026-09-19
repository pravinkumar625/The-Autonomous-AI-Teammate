import React, { useState, useRef } from 'react';
import { Bot, Play, Pause, Sparkles, ArrowRight, Volume2, VolumeX, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface IntroVideoPageProps {
  onStart: () => void;
}

export const IntroVideoPage: React.FC<IntroVideoPageProps> = ({ onStart }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
    <div className="fixed inset-0 w-screen h-screen bg-[#020617] text-white flex flex-col justify-between p-6 md:p-10 select-none overflow-hidden font-sans antialiased">
      
      {/* 1. Full-Screen Base Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-black">
        <video
          ref={videoRef}
          src="/demo-video.mp4"
          className="w-full h-full object-cover opacity-60 scale-105 filter brightness-90 contrast-105"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
        {/* Dark Blue & White Gradient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#091026]/70 to-[#020617]/80 backdrop-blur-[2px]"></div>
      </div>

      {/* 2. Top Header Branding */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#2563eb] flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/40">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-heading font-black text-2xl tracking-tight text-white leading-none">
              IVY's
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#60a5fa] font-extrabold">
              AUTONOMOUS AI TEAMMATE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="p-2.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-white backdrop-blur-md transition cursor-pointer"
            title={isMuted ? "Unmute Video" : "Mute Video"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#60a5fa]" />}
          </button>

          <button
            onClick={togglePlay}
            className="p-2.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-white backdrop-blur-md transition cursor-pointer"
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-[#60a5fa]" />}
          </button>

          <button
            onClick={onStart}
            className="px-5 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-xl text-xs font-black shadow-lg shadow-blue-500/30 flex items-center gap-2 cursor-pointer transition transform hover:scale-105"
          >
            <span>START PLATFORM</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </header>

      {/* 3. Hero Glassmorphic Center Card */}
      <main className="w-full max-w-3xl mx-auto my-auto relative z-20 text-center space-y-6">
        
        <div className="ivy-card p-8 md:p-12 rounded-3xl border border-blue-500/30 bg-slate-950/80 backdrop-blur-2xl shadow-2xl shadow-blue-500/20 space-y-6 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/40 text-xs font-mono font-bold text-[#60a5fa] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#60a5fa] animate-pulse" />
            Full-Screen Base AI Workspace Video Showcase
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
            IVY Autonomous <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white drop-shadow-[0_0_35px_rgba(37,99,235,0.6)]">
              AI Teammates Platform
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Experience next-generation AI automation for revenue operations, live customer support, and sales playbooks in real time.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-black shadow-xl shadow-blue-600/40 flex items-center justify-center gap-3 cursor-pointer transform hover:scale-105 active:scale-95 transition"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>START & ENTER DASHBOARD</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={toggleMute}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 backdrop-blur-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
              <span>{isMuted ? "Enable Audio" : "Mute Audio"}</span>
            </button>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
            <span className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#60a5fa]" /> Blue & White UI</span>
            <span className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#60a5fa]" /> Admin & Customer Portals</span>
            <span className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#60a5fa]" /> n8n Webhook Connected</span>
          </div>

        </div>

      </main>

      {/* 4. Footer */}
      <footer className="w-full max-w-7xl mx-auto pt-4 relative z-20 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-2">
        <div>IVY's Autonomous AI Teammates · Team LakeForge · Yenepoya University</div>
        <div className="flex items-center gap-2 text-blue-400">
          <ShieldCheck className="w-4 h-4 text-[#60a5fa]" />
          <span>Full Screen Base Video Theme</span>
        </div>
      </footer>

    </div>
  );
};
