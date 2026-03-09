"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import MagneticButton from "@/components/animations/MagneticButton";
import gsap from "gsap";

import AIChatbot from "@/components/three/AIChatbot";

const DynamicChatbot = dynamic(() => Promise.resolve(AIChatbot), { ssr: false });

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const [role, setRole] = useState("Web Development");
    const roles = ["Web Development", "AI Solutions", "Custom Software", "Digital Transformation"];
    const roleIndex = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            roleIndex.current = (roleIndex.current + 1) % roles.length;
            setRole(roles[roleIndex.current]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-transparent pt-20 pb-4 lg:py-0">

            {/* DESKTOP ONLY — AI Chatbot as absolute overlay (z: 2) */}
            <div className="hidden lg:block">
                {mounted && <DynamicChatbot isAbsolute={true} />}
            </div>

            {/* CRT Scanline Overlay (Top of everything, pointer-events: none) */}
            <div className="crt-overlay" />

            {/* LAYER 2 — Hero Content (center-left, z: 10) */}
            <motion.div
                className="container mx-auto px-6 lg:px-12 flex relative z-10 pt-20 lg:pt-0"
            >
                <div className="flex flex-col lg:flex-row items-center justify-center lg:min-h-screen w-full">
                    {/* Content 2/3 — slides in from left */}
                    <motion.div
                        initial={{ opacity: 0, x: -200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        className="w-full lg:w-2/3 flex flex-col gap-6 pr-0 lg:pr-12 items-center lg:items-start text-center lg:text-left relative z-20"
                    >

                        <div className="flex flex-col gap-4 items-center lg:items-start text-center lg:text-left w-full">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] mb-2 tracking-tight">
                                <span className="text-cyan block">Transform Your</span>
                                <span className="text-white block">Business with AI</span>
                                <span className="gradient-text-animated block">&amp; Web Solutions.</span>
                            </h1>
                            <div className="h-10 md:h-12 overflow-hidden mt-2">
                                <motion.p
                                    key={role}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    style={{ fontFamily: 'var(--font-space)' }}
                                    className="text-xl md:text-3xl text-cyan font-bold tracking-wide"
                                >
                                    {role}
                                </motion.p>
                            </div>
                        </div>

                        <TextReveal
                            text="We don't just build software — we engineer digital ecosystems. From AI-driven automation to pixel-perfect web experiences, NovaSoft is your launchpad to the future."
                            className="text-muted text-base md:text-lg max-w-lg text-center lg:text-left mx-auto lg:mx-0"
                            delay={0.5}
                        />

                        <div className="flex flex-wrap gap-4 md:gap-6 mt-6 justify-center lg:justify-start items-center">
                            <MagneticButton>
                                <Link href="/contact" className="inline-flex items-center justify-center h-14 px-10 bg-gradient-accent text-base font-bold rounded-lg shadow-glow hover:scale-105 transition-transform duration-300">
                                    Get a Free Quote
                                </Link>
                            </MagneticButton>
                            <MagneticButton>
                                <button className="inline-flex items-center justify-center h-14 px-10 border border-violet text-text-primary font-bold rounded-lg hover:bg-violet/10 transition-colors duration-300">
                                    Our Services
                                </button>
                            </MagneticButton>
                        </div>
                    </motion.div>

                    {/* Right spacer — chatbot occupies this space visually on desktop */}
                    <div className="hidden lg:block w-1/3" />

                    {/* MOBILE ONLY — AI Chatbot below content */}
                    <div className="block lg:hidden w-full mt-10">
                        {mounted && <DynamicChatbot isAbsolute={false} />}
                    </div>
                </div>
            </motion.div>


        </section >
    );
}
