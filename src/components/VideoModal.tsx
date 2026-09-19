import React, { useState, useRef } from 'react';
import { X, Play, Sparkles, CheckCircle2, Volume2, VolumeX } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!isOpen) return null;

  const handleStart = () => {
    setHasStarted(true);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log('Autoplay issue:', err));
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06080c]/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl bg-[#0f141c] border border-[#263347] rounded-3xl overflow-hidden shadow-2xl shadow-[#a3e635]/10 flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141b26] border-b border-[#222e40]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#a3e635]/15 border border-[#a3e635]/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#a3e635]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                IVY Autonomous AI Teammate — Overview & Demo
              </h3>
              <p className="text-xs text-[#8e9bb0]">Team LakeForge Yenepoya University • AI Teammates Track</p>
            </div>
          </div>

          <button
            onClick={() => {
              if (videoRef.current) videoRef.current.pause();
              setHasStarted(false);
              onClose();
            }}
            className="p-2 text-[#8e9bb0] hover:text-white hover:bg-[#1f293a] rounded-xl transition cursor-pointer"
            title="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container */}
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

          {/* Pre-Start Overlay matching the app's lime green & dark theme */}
          {!hasStarted && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/70 to-transparent flex flex-col items-center justify-center p-6 text-center z-10">
              
              <div className="w-16 h-16 rounded-full bg-[#a3e635]/20 border border-[#a3e635]/50 flex items-center justify-center mb-5 shadow-xl shadow-[#a3e635]/25 animate-pulse">
                <Play className="w-7 h-7 text-[#a3e635] fill-[#a3e635] ml-1" />
              </div>

              <h2 className="text-2xl font-black text-white tracking-tight mb-2">
                Watch IVY in Action
              </h2>

              <p className="text-sm text-[#94a3b8] max-w-md mb-6 leading-relaxed">
                See how IVY continuously resolves sales inquiries, orchestrates playbooks, and drives automated customer outcomes.
              </p>

              <button
                onClick={handleStart}
                className="ivy-lime-btn px-8 py-3.5 rounded-2xl text-sm font-black text-[#0b0e14] shadow-lg shadow-[#a3e635]/30 flex items-center gap-3 cursor-pointer transform hover:scale-105 active:scale-95 transition"
              >
                <Play className="w-4 h-4 fill-[#0b0e14]" />
                <span>START DEMO VIDEO</span>
              </button>

              <div className="flex items-center gap-4 mt-6 text-xs text-[#64748b]">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#a3e635]" /> HD Quality</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#a3e635]" /> Full Walkthrough</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info Bar */}
        <div className="px-6 py-3.5 bg-[#141b26] border-t border-[#222e40] flex items-center justify-between text-xs text-[#8e9bb0]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-ping"></span>
            <span className="font-semibold text-white">Live Demonstration Mode</span>
          </div>

          {hasStarted && (
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
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#a3e635]" />}
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
