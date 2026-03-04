"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const testimonials = [
    {
        name: "John Doe",
        role: "CEO at TechCorp",
        quote: "Working with Ahmad was an Absolute game-changer. His attention to detail and creative approach brought our vision to life in ways we didn't think possible.",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop",
    },
    {
        name: "Jane Smith",
        role: "Product Manager at Visionary",
        quote: "Ahmad is not only a brilliant developer but also a talented designer. The seamless transition from design to production was incredible.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    },
    {
        name: "Alex Johnson",
        role: "Founder of Future Labs",
        quote: "The animations and smoothness of the final product exceeded all our expectations. Highly recommend for any high-end project.",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop",
    },
];

export default function Testimonials() {
    const [active, setActive] = useState(0);

    const next = () => setActive((prev) => (prev + 1) % testimonials.length);
    const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section id="testimonials" className="py-32 bg-base overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col gap-6 mb-24 items-center justify-center text-center">
                    <FadeIn direction="down" delay={0.2} distance={20}>
                        <span className="text-violet font-mono text-sm tracking-widest uppercase">// KIND WORDS</span>
                    </FadeIn>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-text-primary">
                        What my <span className="text-cyan">clients</span> say.
                    </h2>
                </div>

                <div className="relative max-w-4xl mx-auto flex flex-col items-center">
                    {/* Main Card */}
                    <div className="w-full relative min-h-[400px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9, x: -50 }}
                                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                                className="w-full p-10 md:p-20 rounded-3xl bg-surface border border-white/5 shadow-glow relative"
                            >
                                <Quote className="absolute top-10 right-10 text-violet/20" size={80} />

                                <div className="flex flex-col gap-10">
                                    <p className="text-2xl md:text-3xl font-serif leading-relaxed italic text-text-primary">
                                        "{testimonials[active].quote}"
                                    </p>

                                    <div className="flex items-center gap-6 mt-10">
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan/50 p-1">
                                            <img
                                                src={testimonials[active].avatar}
                                                alt={testimonials[active].name}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-text-primary">
                                                {testimonials[active].name}
                                            </h4>
                                            <p className="text-sm font-mono text-muted uppercase tracking-widest leading-normal whitespace-pre-wrap">
                                                {testimonials[active].role}
                                            </p>
                                        </div>
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
