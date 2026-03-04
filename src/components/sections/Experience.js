"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { experiences } from "@/data/content";

export default function Experience() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="experience" ref={containerRef} className="py-32 bg-deep overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col gap-6 mb-24 items-center justify-center text-center">
                    <FadeIn direction="down" delay={0.2} distance={20}>
                        <span className="text-violet font-mono text-sm tracking-widest uppercase">// WHY CHOOSE US</span>
                    </FadeIn>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-text-primary">
                        Our Proven <span className="text-cyan">Track Record</span>.
                    </h2>
                </div>

                <div className="relative max-w-4xl mx-auto flex flex-col gap-16">
                    {/* Vertical Line */}
                    <motion.div
                        className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/10 hidden md:block"
                        style={{
                            scaleY,
                            backgroundColor: "rgba(108, 99, 255, 0.4)",
                            transformOrigin: "top"
                        }}
                    />

                    {experiences.map((exp, index) => (
                        <TimelineItem key={index} exp={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ exp, index }) {
    const isLeft = index % 2 === 0;

    return (
        <div className={`relative flex items-center justify-between w-full md:w-1/2 ${isLeft ? "md:mr-auto md:pr-12 lg:pr-20" : "md:ml-auto md:pl-12 lg:pl-20"
            }`}>
            {/* Circle Marker */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan ring-4 ring-cyan/20 z-10 hidden md:block" />

            <FadeIn direction={isLeft ? "left" : "right"} delay={0.2} distance={50}>
                <div className="p-8 rounded-2xl bg-surface border border-white/5 shadow-glow hover:border-violet/30 transition-all duration-300 relative group">
                    <div className="absolute top-8 left-0 -ml-[2px] w-[4px] h-12 bg-gradient-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <span className="text-xs font-mono text-cyan uppercase tracking-widest mb-2 block">
                        {exp.date}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-text-primary mb-1">
                        {exp.role}
                    </h3>
                    <h4 className="text-sm font-bold text-violet uppercase tracking-widest mb-4">
                        {exp.company}
                    </h4>
                    <p className="text-muted text-sm leading-relaxed">
                        {exp.desc}
                    </p>
                </div>
            </FadeIn>
        </div>
    );
}
