import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { Bot, Send, X, RefreshCw, AlertCircle } from 'lucide-react';


interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_IVY_API_URL || 'https://dinesh0707.app.n8n.cloud/webhook/sahay';

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ivy',
      text: 'Good morning! I am IVY, your autonomous AI teammate. I am actively monitoring Acme Labs, Nexus FinTech, and 2 other high-priority accounts. How can I assist you?',
      timestamp: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.reply || data.message || data.output || 'I have processed your request and logged it into the workspace execution queue.';

      const ivyMsg: ChatMessage = {
        id: `ivy-${Date.now()}`,
        sender: 'ivy',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, ivyMsg]);
    } catch (err) {
      console.error('API Error connecting to n8n backend:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ivy',
        text: "Ivy couldn't process that request. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
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
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-[#0d1117] border-l border-[#1e2634] shadow-2xl flex flex-col justify-between text-left animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="p-4 border-b border-[#1e2634] bg-[#121721] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#a3e635] flex items-center justify-center text-[#0b0e14] font-black shadow-md shadow-[#a3e635]/20">
            <Bot className="w-5 h-5 text-[#0b0e14]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-extrabold text-white text-sm">Ask IVY's AI</h3>
              <span className="bg-[#a3e635]/20 text-[#a3e635] text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border border-[#a3e635]/30">
                Real n8n Webhook
              </span>
            </div>
            <p className="text-[11px] text-[#94a3b8]">Connected to live sahay backend</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-[#94a3b8] hover:text-white rounded-lg hover:bg-[#1e2736] transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Seeded Quick Prompts */}
        <div className="space-y-2 mb-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748b] block">
            Test Real n8n Webhook Prompts:
          </span>

          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleSendMessage("Hi Ivy, I am very interested in the LakeForge Pro plan. Please arrange a follow-up with me.")}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-[#141b26] hover:bg-[#1c2636] border border-[#232d3f] text-left text-xs text-[#a3e635] hover:text-white font-medium transition disabled:opacity-50"
            >
              🚀 <strong>Test 1:</strong> "Hi Ivy, I am very interested in the LakeForge Pro plan. Please arrange a follow-up with me."
            </button>

            <button
              onClick={() => handleSendMessage("I am CUST001. My payment issue happened again. I already contacted support before and it was not resolved. I need help urgently. Please investigate and escalate if necessary.")}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-[#141b26] hover:bg-[#1c2636] border border-[#232d3f] text-left text-xs text-amber-300 hover:text-white font-medium transition disabled:opacity-50"
            >
              ⚠️ <strong>Test 2:</strong> "I am CUST001. My payment issue happened again. I need help urgently..."
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleSendMessage("What needs attention?")}
                disabled={isLoading}
                className="flex-1 p-2 rounded-xl bg-[#141b26] hover:bg-[#1c2636] border border-[#232d3f] text-center text-xs text-[#94a3b8] hover:text-white transition disabled:opacity-50"
              >
                What needs attention?
              </button>
              <button
                onClick={() => handleSendMessage("Show me outcomes this week")}
                disabled={isLoading}
                className="flex-1 p-2 rounded-xl bg-[#141b26] hover:bg-[#1c2636] border border-[#232d3f] text-center text-xs text-[#94a3b8] hover:text-white transition disabled:opacity-50"
              >
                Weekly outcomes
              </button>
            </div>
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
                  ? 'bg-[#a3e635] text-[#0b0e14] font-semibold rounded-br-none shadow-md shadow-[#a3e635]/10'
                  : msg.isError
                  ? 'bg-rose-950/80 border border-rose-800 text-rose-200 rounded-bl-none'
                  : 'bg-[#18202c] border border-[#232d3f] text-white rounded-bl-none'
              }`}
            >
              {msg.isError && <AlertCircle className="w-4 h-4 inline mr-1 text-rose-400" />}
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
            <span className="text-[10px] text-[#64748b] mt-1 px-1 font-mono">{msg.timestamp}</span>
          </div>
        ))}

        {/* Thinking Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#18202c] border border-[#232d3f] text-xs text-[#a3e635] font-mono animate-pulse w-fit">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#a3e635]" />
            <span>Ivy is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-[#1e2634] bg-[#121721] space-y-2">
        <div className="relative flex items-center">
          <textarea
            rows={2}
            placeholder="Ask IVY's AI anything... (Press Enter to send)"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="w-full pl-3 pr-10 py-2 bg-[#0b0e14] text-xs text-white placeholder-[#64748b] rounded-xl border border-[#232d3f] focus:outline-none focus:border-[#a3e635] resize-none disabled:opacity-50"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputMessage.trim()}
            className="absolute right-2 bottom-2.5 p-2 bg-[#a3e635] hover:bg-[#bef264] text-[#0b0e14] rounded-lg transition disabled:opacity-40 disabled:hover:bg-[#a3e635]"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[10px] text-[#64748b] text-center">
          Press <kbd className="text-white">Enter</kbd> to send · <kbd className="text-white">Shift+Enter</kbd> for new line
        </p>
      </div>

    </div>
  );
};
