"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ExplosionCanvas from "./ExplosionCanvas";
import FragmentLayer from "./FragmentLayer";

export default function BigBangIntro({ onComplete }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const overlayRef = useRef(null);
    const orbRef = useRef(null);
    const canvasRef = useRef(null);
    const fragmentRef = useRef(null);
    const flashRef = useRef(null);
    const ringRef1 = useRef(null);
    const ringRef2 = useRef(null);
    const scanLineRef = useRef(null);

    useEffect(() => {
        // Check if already played
        if (sessionStorage.getItem('bigbang_played')) {
            onComplete();
            return;
        }

        // Check for reduced motion
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
            onComplete();
            return;
        }

        setIsPlaying(true);

        const tl = gsap.timeline({
            onComplete: () => {
                sessionStorage.setItem('bigbang_played', 'true');
                onComplete();
                setIsPlaying(false);
            },
        });

        // ACT 1 — THE CALM
        tl.to(orbRef.current, {
            scale: 1.3,
            duration: 0.8,
            repeat: 3,
            yoyo: true,
            ease: "sine.inOut",
        });

        tl.to(orbRef.current, {
            x: () => (Math.random() - 0.5) * 6,
            y: () => (Math.random() - 0.5) * 6,
            duration: 0.05,
            repeat: 10,
            ease: "none",
        }, "-=0.5");

        tl.to(orbRef.current, {
            scale: 3,
            boxShadow: "0 0 100px #6c63ff, 0 0 200px #00d9ff",
            duration: 0.1,
            ease: "power4.in",
        });

        // ACT 2 — THE EXPLOSION
        tl.add(() => {
            // Detonation
            canvasRef.current.detonate(window.innerWidth / 2, window.innerHeight / 2);
            fragmentRef.current.explode();

            // Flash
            gsap.to(flashRef.current, {
                opacity: 1,
                duration: 0.016,
                onComplete: () => {
                    gsap.to(flashRef.current, { opacity: 0, duration: 0.3 });
                }
            });

            // Shockwave Rings
            gsap.fromTo(ringRef1.current,
                { width: 0, height: 0, opacity: 1, scale: 0 },
                { width: "150vw", height: "150vw", opacity: 0, scale: 1, duration: 0.8, ease: "power2.out" }
            );
            gsap.fromTo(ringRef2.current,
                { width: 0, height: 0, opacity: 1, scale: 0 },
                { width: "150vw", height: "150vw", opacity: 0, scale: 1, duration: 0.8, ease: "power2.out", delay: 0.1 }
            );

            // Distortion (Blur)
            gsap.fromTo(overlayRef.current,
                { filter: "blur(3px)" },
                { filter: "blur(0px)", duration: 0.08 }
            );
        });

        tl.to({}, { duration: 1.1 }); // Wait for explosion components to finish flying

        // ACT 3 — THE ASSEMBLY
        tl.add(() => {
            // Implosion pulse
            gsap.fromTo(ringRef1.current,
                { width: "20vw", height: "20vw", opacity: 1, scale: 1 },
                { width: 0, height: 0, opacity: 0, scale: 0, duration: 0.5, ease: "power4.in" }
            );

            // Overlay fade out
            gsap.to(overlayRef.current, {
                background: "rgba(8, 8, 8, 0)",
                duration: 1.5,
                delay: 0.5
            });

            // Assemble fragments
            fragmentRef.current.assemble();
        });

        tl.to({}, { duration: 2.7 }); // Wait for assembly to complete

        // SCAN LINE Power-on sequence
        tl.fromTo(scanLineRef.current,
            { y: "-100vh", opacity: 1 },
            { y: "100vh", opacity: 0.5, duration: 0.3, ease: "none" }
        );

    }, [onComplete]);

    if (!isPlaying) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[10002] bg-base flex items-center justify-center overflow-hidden pointer-events-none"
        >
            {/* Orb */}
            <div
                ref={orbRef}
                className="w-6 h-6 rounded-full bg-violet z-[10003] shadow-[0_0_20px_#6c63ff,0_0_60px_rgba(108,99,255,0.6),0_0_120px_rgba(108,99,255,0.2)]"
            />

            {/* Explosion Canvas */}
            <ExplosionCanvas ref={canvasRef} />

            {/* Fragment Layer */}
            <FragmentLayer ref={fragmentRef} />

            {/* Flash */}
            <div
                ref={flashRef}
                className="fixed inset-0 bg-white opacity-0 z-[10005]"
            />

            {/* Shockwave Rings */}
            <div
                ref={ringRef1}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-cyan opacity-0 z-[10004]"
            />
            <div
                ref={ringRef2}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet opacity-0 z-[10004]"
            />

            {/* Scan Line */}
            <div
                ref={scanLineRef}
                className="fixed top-0 left-0 w-full h-[1px] bg-cyan shadow-[0_0_8px_#00d9ff] z-[10006] opacity-0"
            />
        </div>
    );
}
