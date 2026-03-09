"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const testimonials = [
    {
        name: "Cedric",
        role: "Safe-Bill | France",
        quote: "NovaSoft delivered a flawless fintech platform. Their milestone system and AI integration have completely secured our transactions. Exceptional work!",
    },
    {
        name: "Ben",
        role: "Rep Cloud | England",
        quote: "Outstanding enterprise solution. The automation they engineered for our FSM platform has drastically improved our operational efficiency. Highly professional team.",
    },
    {
        name: "Ali Raza",
        role: "Arabic AI Law | Saudi Arabia",
        quote: "The complex RAG pipeline and Arabic voice processing work perfectly. NovaSoft has successfully modernized legal research in the KSA domain. Truly impressive.",
    },
];

export default function Testimonials() {
    const [active, setActive] = useState(0);

    const next = () => setActive((prev) => (prev + 1) % testimonials.length);
    const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section id="testimonials" className="py-10 lg:py-32 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col gap-6 mb-24 items-center justify-center text-center">
                    <FadeIn direction="down" delay={0.2} distance={20}>
                        <span className="text-violet font-mono text-sm tracking-widest uppercase">// TESTIMONIALS</span>
                    </FadeIn>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-text-primary">
                        What our <span className="text-cyan">clients</span> say.
                    </h2>
                </div>

                <div className="relative max-w-4xl mx-auto flex flex-col items-center">
                    {/* Main Card */}
                    <div className="w-full relative min-h-[350px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9, x: -50 }}
                                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                                className="w-full p-10 md:p-16 rounded-3xl bg-surface border border-white/5 shadow-glow relative"
                            >
                                <Quote className="absolute top-8 right-8 text-violet/20" size={60} />

                                <div className="flex flex-col gap-8">
                                    <p className="text-xl md:text-2xl font-serif leading-relaxed italic text-text-primary">
                                        "{testimonials[active].quote}"
                                    </p>

                                    <div className="flex flex-col gap-2 border-t border-white/5 pt-8 mt-4">
                                        <h4 className="text-xl font-bold text-text-primary flex items-center gap-2">
                                            <span className="w-8 h-[2px] bg-cyan"></span>
                                            {testimonials[active].name}
                                        </h4>
                                        <p className="text-sm font-mono text-muted uppercase tracking-widest leading-normal whitespace-pre-wrap ml-10">
                                            {testimonials[active].role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-10 mt-16">
                        <button
                            onClick={prev}
                            className="p-4 rounded-full border border-white/10 text-muted hover:text-cyan hover:border-cyan transition-all duration-300 transform hover:scale-110"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <div className="flex gap-4">
                            {testimonials.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-12 h-1 rounded-full transition-all duration-500 ${i === active ? "bg-gradient-accent w-20" : "bg-white/10"
                                        }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={next}
                            className="p-4 rounded-full border border-white/10 text-muted hover:text-violet hover:border-violet transition-all duration-300 transform hover:scale-110"
                        >
                            <ChevronRight size={32} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
