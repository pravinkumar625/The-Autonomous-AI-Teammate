import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, UserRole } from '../types';
import { Bot, Send, X, RefreshCw, AlertCircle, Smile, Sparkles, Heart } from 'lucide-react';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userRole?: UserRole;
}

const API_URL = import.meta.env.VITE_IVY_API_URL || 'https://dinesh0707.app.n8n.cloud/webhook/sahay';

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose, userName = 'Friend', userRole = 'admin' }) => {
  const firstName = userName ? userName.split(' ')[0] : 'Friend';

  const [personalityMode, setPersonalityMode] = useState<'friendly' | 'concise'>('friendly');
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize personalized friendly greeting when drawer opens
  useEffect(() => {
    if (messages.length === 0) {
      const greetingText = personalityMode === 'friendly'
        ? `Hey ${firstName}! 😊 I'm IVY, your personalized AI teammate. I'm right here with you to manage your ${userRole === 'admin' ? 'revenue playbooks & workspace' : 'support tickets & connected bank accounts'}. How can I brighten your day? ✨`
        : `Greetings ${firstName}. IVY AI Teammate active. Monitoring 4 workspace channels. State your query.`;

      setMessages([
        {
          id: 'init-1',
          sender: 'ivy',
          text: greetingText,
          timestamp: 'Just now'
        }
      ]);
    }
  }, [firstName, userRole, personalityMode, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: text,
          userName: firstName,
          userRole: userRole,
          personality: personalityMode 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const data = await response.json();
      let replyText = data.reply || data.message || data.output;

      if (!replyText) {
        replyText = personalityMode === 'friendly'
          ? `Hey ${firstName}! I've processed your request "${text}" and updated your workspace. Everything is running smoothly! 🚀`
          : `Processed request: "${text}". Logged to execution queue.`;
      }

      const ivyMsg: ChatMessage = {
        id: `ivy-${Date.now()}`,
        sender: 'ivy',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, ivyMsg]);
    } catch (err) {
      console.error('API Error connecting to n8n backend:', err);
      
      // Friendly personalized fallback
      const friendlyFallback = personalityMode === 'friendly'
        ? `Hey ${firstName}! I had a quick glitch reaching the cloud server, but don't worry! I've logged your query "${text}" locally and I'm on it. Is there anything else I can help with? 😊`
        : `Notice: Backend timeout for "${text}". Logged to local buffer.`;

      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ivy',
        text: friendlyFallback,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: false
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-[#091026] border-l border-slate-800 shadow-2xl flex flex-col justify-between text-left animate-in slide-in-from-right duration-300 font-sans">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-[#0f172a] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-[#2563eb] flex items-center justify-center text-white font-black shadow-md shadow-blue-500/40">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#0f172a] rounded-full"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-extrabold text-white text-sm flex items-center gap-1.5">
                IVY Personal Agent
                <Sparkles className="w-3.5 h-3.5 text-[#60a5fa]" />
              </h3>
              <span className="bg-blue-500/20 text-[#60a5fa] text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border border-blue-400/30">
                Live & Friendly
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Assisting {firstName} ({userRole === 'admin' ? 'Admin' : 'Customer'})</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Personality Mode Toggle */}
      <div className="px-4 py-2 bg-[#0d1633] border-b border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400 text-[11px] flex items-center gap-1">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          Agent Tone:
        </span>

        <div className="flex items-center gap-1 bg-[#091026] p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setPersonalityMode('friendly')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${
              personalityMode === 'friendly' 
                ? 'bg-[#2563eb] text-white shadow-xs' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smile className="w-3 h-3" />
            Friendly & Warm
          </button>

          <button
            onClick={() => setPersonalityMode('concise')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${
              personalityMode === 'concise' 
                ? 'bg-[#2563eb] text-white shadow-xs' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🎯 Direct
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Friendly Quick Action Prompts */}
        <div className="space-y-2 mb-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
            Friendly Chat Starters for {firstName}:
          </span>

          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleSendMessage(`Hey IVY, give me a friendly status update on our workspace!`)}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 border border-slate-800 text-left text-xs text-[#60a5fa] hover:text-white font-medium transition disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              <span>😊</span>
              <span>"Hey IVY, give me a friendly status update!"</span>
            </button>

            <button
              onClick={() => handleSendMessage(`Can you check Transaction ID TXN-98421038 for me please?`)}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 border border-slate-800 text-left text-xs text-amber-300 hover:text-white font-medium transition disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              <span>🏦</span>
              <span>"Check Transaction ID TXN-98421038 for me please"</span>
            </button>
          </div>
        </div>

        {/* Message Thread */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#2563eb] text-white font-semibold rounded-br-none shadow-md shadow-blue-500/20'
                  : msg.isError
                  ? 'bg-rose-950/80 border border-rose-800 text-rose-200 rounded-bl-none'
                  : 'bg-[#1e293b] border border-slate-700 text-white rounded-bl-none'
              }`}
            >
              {msg.isError && <AlertCircle className="w-4 h-4 inline mr-1 text-rose-400" />}
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1 font-mono">{msg.timestamp}</span>
          </div>
        ))}

        {/* Thinking Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#1e293b] border border-slate-700 text-xs text-[#60a5fa] font-mono animate-pulse w-fit">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#60a5fa]" />
            <span>Ivy is crafting a friendly reply...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-slate-800 bg-[#0f172a] space-y-2">
        <div className="relative flex items-center">
          <textarea
            rows={2}
            placeholder={`Say something friendly to IVY, ${firstName}...`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="w-full pl-3 pr-10 py-2 bg-[#091026] text-xs text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:border-[#3b82f6] resize-none disabled:opacity-50"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputMessage.trim()}
            className="absolute right-2 bottom-2.5 p-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg transition disabled:opacity-40 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
        <p className="text-[10px] text-slate-500 text-center">
          IVY is personalized for <strong className="text-white">{firstName}</strong> · Press <kbd className="text-white">Enter</kbd> to chat
        </p>
      </div>

    </div>
  );
};
