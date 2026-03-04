"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import MagneticButton from "@/components/animations/MagneticButton";
import gsap from "gsap";

import { useBigBang } from "@/hooks/useBigBang";

import BlackHoleBackground from "@/components/three/BlackHoleBackground";
import OrbAI from "@/components/three/OrbAI";

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const { hasPlayed } = useBigBang();
    const [role, setRole] = useState("Creative Coder");
    const roles = ["Creative Coder", "UI Architect", "Motion Designer", "3D Enthusiast"];
    const roleIndex = useRef(0);

    const animationProps = hasPlayed
        ? {}
        : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 5.5, duration: 1 } };

    useEffect(() => {
        const interval = setInterval(() => {
            roleIndex.current = (roleIndex.current + 1) % roles.length;
            setRole(roles[roleIndex.current]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden bg-[#080808]">
            {/* LAYER 0 — Black Hole Fullscreen Background (z: 0) */}
            {mounted && <BlackHoleBackground />}

            {/* LAYER 1 — Orb AI (left side, z: 2) */}
            {mounted && <OrbAI />}

            {/* LAYER 2 — Hero Content (center-left, z: 10) */}
            <motion.div
                {...animationProps}
                className="container mx-auto px-6 lg:px-12 flex relative z-10"
            >
                <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen w-full">
                    {/* Content 2/3 (now on left) */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-6 pr-0 lg:pr-12 items-center lg:items-start text-center lg:text-left">
                        <FadeIn direction="down" delay={hasPlayed ? 0.2 : 0} distance={20} className="flex justify-center lg:justify-start">
                            <span className="inline-block py-2 px-4 rounded-full bg-violet/10 border border-violet/20 text-violet font-mono text-sm">
                                // WELCOME TO MY UNIVERSE
                            </span>
                        </FadeIn>

                        <div className="flex flex-col gap-2 items-center lg:items-start text-center lg:text-left">
                            <h1 className="text-5xl md:text-8xl font-serif font-bold text-text-primary">
                                I'm <span className="hover:text-gradient-accent transition-colors duration-500">Ahmad</span>
                            </h1>
                            <div className="h-12 overflow-hidden">
                                <motion.p
                                    key={role}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="text-2xl md:text-4xl text-cyan font-mono"
                                >
                                    {role}
                                </motion.p>
                            </div>
                        </div>

                        <TextReveal
                            text="Designing digital experiences that bridge the gap between imagination and implementation. Specializing in high-end interfaces and interactive motion."
                            className="text-muted text-base md:text-lg max-w-lg text-center lg:text-left mx-auto lg:mx-0"
                            delay={hasPlayed ? 0.5 : 0}
                        />

                        <div className="flex flex-wrap gap-4 md:gap-6 mt-6 justify-center lg:justify-start">
                            <MagneticButton>
                                <button className="py-4 px-10 bg-gradient-accent text-base font-bold rounded-lg shadow-glow hover:scale-105 transition-transform duration-300">
                                    View Projects
                                </button>
                            </MagneticButton>
                            <MagneticButton>
                                <button className="py-4 px-10 border border-violet text-text-primary font-bold rounded-lg hover:bg-violet/10 transition-colors duration-300">
                                    Let's Talk
                                </button>
                            </MagneticButton>
                        </div>
                    </div>

                    {/* Right spacer — orb occupies this space visually on desktop (now on right) */}
                    <div className="hidden lg:block w-1/3" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, repeat: Infinity, duration: 2, repeatType: "reverse" }}
                className="absolute bottom-10 left-12 flex items-center gap-4 text-muted font-mono text-sm hidden lg:flex z-10"
            >
                <div className="w-[1px] h-12 bg-muted/30" />
                <span className="rotate-90 origin-left">SCROLL TO EXPLORE</span>
            </motion.div>
        </section>
    );
}
