"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2, Minus, Maximize2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function AIAssistantBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! I'm the NovaSoft AI. How can I help you today? I can tell you about our projects like Rep Cloud and Safe-Bill, or our services." }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!response.ok) throw new Error("Failed to connect to AI");

            // Handle Streaming
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = { role: "assistant", content: "" };

            setMessages((prev) => [...prev, assistantMessage]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                assistantMessage.content += chunk;

                setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { ...assistantMessage };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error(error);
            setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[2000] flex flex-col items-end max-w-[calc(100vw-2rem)]">
            {isOpen && (
                <div
                    style={{ height: isMinimized ? "60px" : "580px" }}
                    className={`transition-all duration-300 ease-in-out w-[290px] min-[350px]:w-[320px] md:w-[380px] bg-base/95 border border-white/10 rounded-[1.5rem] shadow-2xl flex flex-col mb-4 overflow-hidden`}
                >
                    {/* Header */}
                    <div className="p-4 border-b border-white/5 bg-gradient-accent flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                                <Bot size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-xs">NovaSoft AI</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[9px] text-white/70 uppercase tracking-widest font-mono font-medium">Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                                {isMinimized ? <Maximize2 size={16} className="text-white" /> : <Minus size={16} className="text-white" />}
                            </button>
                            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                                <X size={16} className="text-white" />
                            </button>
                        </div>
                    </div>

                    {!isMinimized && (
                        <>
                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-base/80">
                                {messages.map((m, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`flex gap-2 max-w-[90%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                                            <div className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center ${m.role === "user" ? "bg-cyan/10 text-cyan" : "bg-violet/10 text-violet"}`}>
                                                {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                                            </div>
                                            <div className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed ${m.role === "user" ? "bg-gradient-accent text-white rounded-tr-none" : "bg-surface text-white/90 border border-white/5 rounded-tl-none prose prose-invert prose-sm max-w-none"}`}>
                                                <ReactMarkdown>
                                                    {m.content}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && messages[messages.length - 1].role !== 'assistant' && (
                                    <div className="flex justify-start">
                                        <div className="bg-surface border border-white/5 p-3 rounded-xl rounded-tl-none text-white/50 flex items-center gap-2">
                                            <Loader2 size={14} className="animate-spin text-violet" />
                                            <span className="text-[10px] font-mono uppercase tracking-widest">thinking...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-surface">
                                <div className="relative flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type a message..."
                                        className="w-full bg-base border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan/50 focus:bg-white/5 transition-all outline-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isLoading}
                                        className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center text-white shadow-glow disabled:opacity-50 disabled:grayscale transition-all active:scale-95 flex-shrink-0 hover:opacity-90"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                                <p className="text-[8px] text-center text-white/30 mt-2 uppercase tracking-widest font-mono">Powered by Grok • xAI</p>
                            </form>
                        </>
                    )}
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-[1.25rem] bg-gradient-accent flex items-center justify-center text-white shadow-[0_10px_30px_rgba(108,99,255,0.4)] hover:scale-105 transition-all duration-300 relative"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>
        </div>
    );
}

