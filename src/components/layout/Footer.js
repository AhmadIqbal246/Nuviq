"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import MagneticButton from "@/components/animations/MagneticButton";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="py-20 bg-base border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 flex flex-col gap-20">

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                    <div className="flex flex-col gap-6">
                        <Link href="/">
                            <motion.div
                                className="flex items-center gap-4 group"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center font-bold text-xl shadow-glow">
                                    A
                                </div>
                                <span className="font-serif text-3xl font-bold tracking-tight text-white group-hover:text-cyan transition-colors">
                                    AHMAD
                                </span>
                            </motion.div>
                        </Link>
                        <p className="text-muted text-lg max-w-sm">
                            Designing digital experiences that bridge the gap between imagination and implementation.
                        </p>
                    </div>

                    <div className="flex gap-12 text-sm font-mono uppercase tracking-widest text-muted">
                        <Link href="#about" className="hover:text-violet transition-colors">About</Link>
                        <Link href="#projects" className="hover:text-cyan transition-colors">Projects</Link>
                        <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>

                    <div className="flex gap-6">
                        {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
                            <MagneticButton key={i}>
                                <a href="#" className="p-4 rounded-full border border-white/10 text-muted hover:text-cyan hover:border-cyan transition-all duration-300">
                                    <Icon size={20} />
                                </a>
                            </MagneticButton>
                        ))}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
                    <p className="text-muted font-mono text-xs">
                        © {new Date().getFullYear()} AHMAD. ALL RIGHTS RESERVED.
                    </p>
                    <p className="text-muted font-mono text-xs invisible md:visible">
                        BUILT WITH NEXT.JS 14 × FRAMER MOTION × GSAP
                    </p>

                    <MagneticButton>
                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-4 text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan hover:text-violet transition-colors group"
                        >
                            BACK TO TOP <div className="p-2 rounded-full bg-cyan/10 group-hover:bg-violet/10"><ArrowUp size={16} /></div>
                        </button>
                    </MagneticButton>
                </div>
            </div>

            {/* Background Text */}
            <h2 className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[20vw] font-serif font-black text-white/[0.02] pointer-events-none select-none">
                PORTFOLIO
            </h2>
        </footer>
    );
}
