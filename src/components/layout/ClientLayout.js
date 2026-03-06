"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ScrollProgressBar from "@/components/common/ScrollProgressBar";
import NoiseOverlay from "@/components/common/NoiseOverlay";
import AIAssistantBot from "@/components/chat/AIAssistantBot";

import Particles from "@/components/three/Particles";
const DynamicParticles = dynamic(() => Promise.resolve(Particles), { ssr: false });

export default function ClientLayout({ children }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <>
            {/* GLOBAL BACKGROUND LAYER */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#080808]">
                {/* CSS Gradient Mesh */}
                <div className="absolute inset-0">
                    <div className="gradient-mesh-blob gradient-mesh-blob--violet opacity-20" />
                    <div className="gradient-mesh-blob gradient-mesh-blob--cyan opacity-20" />
                    <div className="gradient-mesh-blob gradient-mesh-blob--deep" />
                </div>

                {/* Particles */}
                {mounted && (
                    <div className="absolute inset-0 w-full h-full opacity-60">
                        <DynamicParticles
                            particleColors={["#ffffff", "#6C63FF", "#00F2FF"]}
                            particleCount={500}
                            particleSpread={10}
                            speed={0.1}
                            particleBaseSize={100}
                            moveParticlesOnHover
                            alphaParticles={false}
                            disableRotation={false}
                            pixelRatio={2}
                        />
                    </div>
                )}
            </div>

            {/* CONTENT LAYER */}
            <div className="relative z-10 overflow-x-hidden w-full">
                <ScrollProgressBar visible={true} />
                <NoiseOverlay />
                <div style={{ visibility: mounted ? "visible" : "hidden" }}>
                    {children}
                </div>
                {mounted && <AIAssistantBot />}
            </div>
        </>
    );
}
