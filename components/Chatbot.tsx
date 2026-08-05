'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    role: 'model',
    parts: [{ text: "Hello! I'm the Dharamukh Sishu Bidya Niketon assistant. How can I help you today?" }]
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newHistory = [...messages, { role: 'user' as const, parts: [{ text: userMessage }] }];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: messages,
          message: userMessage
        })
      });

      if (!response.ok) throw new Error('Network error');

      const data = await response.json();
      
      setMessages([...newHistory, { role: 'model', parts: [{ text: data.text }] }]);
    } catch (error) {
      setMessages([...newHistory, { role: 'model', parts: [{ text: 'Sorry, I encountered an error. Please try again later.' }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-transform transform hover:scale-105 z-50 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-[350px] sm:max-w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-slate-200 flex flex-col h-[500px] max-h-[80vh]">
          <div className="bg-blue-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-semibold text-lg">School Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-blue-200 hover:text-white transition"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'}`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.parts[0].text}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-bl-none shadow-sm">
                    <Loader2 size={16} className="animate-spin text-indigo-600" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-sm text-slate-800"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition shrink-0"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
