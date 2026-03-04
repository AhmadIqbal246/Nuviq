"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiThreedotjs,
    SiJavascript, SiNodedotjs, SiTypescript
} from "react-icons/si";
import FadeIn from "@/components/animations/FadeIn";

const skillCategories = [
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "design", label: "Design" },
];

const skills = [
    { name: "React", icon: <SiReact />, category: "frontend", color: "#61DAFB" },
    { name: "Next.js", icon: <SiNextdotjs />, category: "frontend", color: "#ffffff" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, category: "frontend", color: "#06B6D4" },
    { name: "Framer Motion", icon: <SiFramer />, category: "frontend", color: "#E10098" },
    { name: "Three.js", icon: <SiThreedotjs />, category: "frontend", color: "#ffffff" },
    { name: "JavaScript", icon: <SiJavascript />, category: "frontend", color: "#F7DF1E" },
    { name: "Node.js", icon: <SiNodedotjs />, category: "backend", color: "#339933" },
    { name: "TypeScript", icon: <SiTypescript />, category: "frontend", color: "#3178C6" },
];

export default function Skills() {
    const [activeTab, setActiveTab] = useState("frontend");

    const filteredSkills = skills.filter(skill => skill.category === activeTab);

    return (
        <section id="skills" className="py-32 bg-deep overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col gap-6 mb-20 items-center justify-center text-center">
                    <FadeIn direction="down" delay={0.2} distance={20}>
                        <span className="text-violet font-mono text-sm tracking-widest uppercase">// MY SKILLSET</span>
                    </FadeIn>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-text-primary">
                        Powered by modern <span className="text-cyan">technologies</span>.
                    </h2>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-6 mb-16">
                    {skillCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`relative px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${activeTab === cat.id ? "text-base font-bold" : "text-muted hover:text-text-primary"
                                }`}
                        >
                            {activeTab === cat.id && (
                                <motion.div
                                    layoutId="active-tab"
                                    className="absolute inset-0 bg-gradient-accent rounded-full z-0"
                                    transition={{ type: "spring", duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{cat.label}</span>
                        </button>
                    ))}
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-20">
                    <AnimatePresence>
                        {filteredSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                whileHover={{ y: -10 }}
                                className="group p-8 rounded-2xl bg-surface border border-white/5 flex flex-col items-center justify-center gap-4 shadow-glow hover:border-violet/30 transition-all duration-300"
                            >
                                <div
                                    className="text-5xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]"
                                    style={{ color: skill.color }}
                                >
                                    {skill.icon}
                                </div>
                                <span className="text-sm font-mono text-muted group-hover:text-text-primary">
                                    {skill.name}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Infinite Marquee */}
                <div className="mt-20 border-y border-white/5 py-10 relative overflow-hidden group">
                    <div className="flex gap-20 animate-marquee whitespace-nowrap group-hover:pause">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex gap-20 items-center">
                                {skills.map(skill => (
                                    <div key={skill.name} className="flex items-center gap-4 text-white/20 hover:text-cyan transition-colors duration-300">
                                        <div className="text-4xl">{skill.icon}</div>
                                        <span className="text-2xl font-serif font-bold uppercase tracking-widest">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
}
