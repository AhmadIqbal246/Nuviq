"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import gsap from "gsap";

export default function About() {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const stats = [
        { label: "Years Experience", value: 5, suffix: "+" },
        { label: "Projects Completed", value: 30, suffix: "+" },
        { label: "Happy Clients", value: 20, suffix: "" },
    ];

    return (
        <section id="about" ref={containerRef} className="relative py-32 bg-base overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                {/* Left Column - Text */}
                <div className="flex flex-col gap-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-[2px] bg-gradient-accent" />
                        <span className="text-violet font-mono text-sm tracking-widest uppercase">// ABOUT ME</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-text-primary leading-tight">
                        I craft <span className="text-violet">immersive</span> digital solutions that drive results.
                    </h2>

                    <div className="flex flex-col gap-6 text-muted text-lg leading-relaxed max-w-xl">
                        <p>
                            Based in the digital realm, I specialize in building highly performant and visually stunning web applications. My approach combines technical precision with creative flair.
                        </p>
                        <p>
                            With a background in both development and design, I create seamless user experiences that not only look good but operate flawlessly under the hood.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                        {stats.map((stat, index) => (
                            <FadeIn key={stat.label} delay={index * 0.2} direction="right" distance={30}>
                                <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-surface border border-white/5 shadow-glow-cyan hover:scale-105 transition-transform duration-300">
                                    <span className="text-4xl font-bold text-cyan mb-2">
                                        <Counter value={stat.value} suffix={stat.suffix} />
                                    </span>
                                    <span className="text-xs text-muted font-mono text-center uppercase tracking-widest leading-normal whitespace-pre-wrap">
                                        {stat.label}
                                    </span>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>

                {/* Right Column - Image */}
                <motion.div
                    className="relative group"
                    style={{ y }}
                >
                    <div className="absolute inset-0 bg-gradient-accent blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 rounded-full" />
                    <motion.div
                        className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10"
                        initial={{ clipPath: "inset(0 100% 0 0)" }}
                        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                            alt="Profile"
                            loading="lazy"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                        />
                    </motion.div>

                    <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-cyan/50" />
                    <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-violet/50" />
                </motion.div>
            </div>
        </section>
    );
}

function Counter({ value, suffix }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView && ref.current) {
            gsap.fromTo(ref.current,
                { innerText: 0 },
                {
                    innerText: value,
                    duration: 2,
                    ease: "power2.out",
                    snap: { innerText: 1 },
                    onUpdate: function () {
                        ref.current.innerHTML = Math.ceil(this.targets()[0].innerText);
                    }
                }
            );
        }
    }, [inView, value]);

    return (
        <span ref={ref}>
            0
            {suffix}
        </span>
    );
}
