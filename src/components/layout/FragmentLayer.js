"use client";

import React, { useRef, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";

const FragmentLayer = forwardRef((props, ref) => {
    const containerRef = useRef(null);
    const fragmentsRef = useRef([]);

    const fragmentConfigs = [
        { id: "navbar", className: "w-full h-16 bg-surface border-b border-white/10 glass", order: 1, initialY: -100 },
        { id: "badge", className: "w-32 h-8 rounded-full bg-violet/10 border border-violet/20", order: 2, initialX: -200 },
        { id: "h1-1", className: "w-40 h-16 bg-white/5", order: 3, initialX: -300 },
        { id: "h1-2", className: "w-40 h-16 bg-white/5", order: 4, initialY: 300 },
        { id: "h1-3", className: "w-40 h-16 bg-white/5", order: 5, initialX: 300 },
        { id: "role", className: "w-64 h-8 bg-cyan/10", order: 6, initialY: 100 },
        { id: "bio-1", className: "w-80 h-4 bg-white/5", order: 7, initialX: -100 },
        { id: "bio-2", className: "w-80 h-4 bg-white/5", order: 8, initialX: -100 },
        { id: "bio-3", className: "w-80 h-4 bg-white/5", order: 9, initialX: -100 },
        { id: "cta-1", className: "w-32 h-12 bg-gradient-accent", order: 10, initialY: 100 },
        { id: "cta-2", className: "w-32 h-12 border border-violet", order: 11, initialY: 100 },
        { id: "scroll", className: "w-1 h-12 bg-muted/30", order: 12, initialY: 50 },
        { id: "skill-1", className: "w-8 h-8 rounded-lg bg-surface", order: 13, initialX: -50, initialY: -50 },
        { id: "skill-2", className: "w-8 h-8 rounded-lg bg-surface", order: 14, initialX: 50, initialY: -50 },
        { id: "skill-3", className: "w-8 h-8 rounded-lg bg-surface", order: 15, initialX: -50, initialY: 50 },
    ];

    useImperativeHandle(ref, () => ({
        explode: () => {
            fragmentsRef.current.forEach((el) => {
                if (!el) return;
                const x = (Math.random() - 0.5) * window.innerWidth * 2.5;
                const y = (Math.random() - 0.5) * window.innerHeight * 2.5;
                const rot = (Math.random() - 0.5) * 1440;

                gsap.to(el, {
                    x, y,
                    rotation: rot,
                    opacity: 0,
                    duration: 0.6 + Math.random() * 0.4,
                    ease: "power2.out"
                });
            });
        },
        assemble: () => {
            const tl = gsap.timeline();

            fragmentConfigs.forEach((config, i) => {
                const el = fragmentsRef.current[i];
                if (!el) return;

                tl.fromTo(el,
                    {
                        opacity: 0,
                        scale: 0.8,
                        x: config.initialX || 0,
                        y: config.initialY || (Math.random() - 0.5) * 500,
                        rotation: (Math.random() - 0.5) * 90
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0,
                        rotation: 0,
                        duration: 1.2,
                        ease: "elastic.out(1, 0.65)",
                        onStart: () => {
                            // Brief flash effect
                            gsap.to(el, {
                                boxShadow: "0 0 30px rgba(108, 99, 255, 0.4)",
                                duration: 0.1,
                                onComplete: () => {
                                    gsap.to(el, { boxShadow: "none", duration: 0.2 });
                                }
                            });
                        }
                    },
                    config.order * 0.1
                );
            });
            return tl;
        }
    }));

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-max flex items-center justify-center">
            {fragmentConfigs.map((config, i) => (
                <div
                    key={config.id}
                    ref={(el) => (fragmentsRef.current[i] = el)}
                    className={`absolute ${config.className} opacity-0 rounded shadow-md`}
                />
            ))}
        </div>
    );
});

FragmentLayer.displayName = "FragmentLayer";

export default FragmentLayer;
