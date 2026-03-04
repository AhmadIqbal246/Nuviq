"use client";

import React, { useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";

/**
 * The Internal Robot Actor
 * Handles the Lottie animation and 3D visual properties.
 */
function RoboModel() {
    const { viewport } = useThree();
    const isMobile = viewport.width < 6;

    return (
        <Html
            center
            transform
            distanceFactor={isMobile ? 8 : 6}
            position={[0, 0, 0]}
            style={{
                width: isMobile ? '280px' : '400px',
                height: isMobile ? '280px' : '400px',
                pointerEvents: 'none',
                userSelect: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'transparent',
                position: 'relative'
            }}
        >
            <div className="w-full h-full flex items-center justify-center bg-transparent">
                <DotLottieReact
                    src="https://lottie.host/e57c550b-fe00-459d-a813-0656080774d3/8AEjBkgleY.lottie"
                    loop
                    autoplay
                    style={{
                        width: '100%',
                        height: '100%',
                        background: 'transparent',
                        filter: 'drop-shadow(0 0 20px rgba(0, 242, 255, 0.4))'
                    }}
                />
            </div>
        </Html>
    );
}

/**
 * The Stage and Animation Logic
 * Positions the robot and adds the floating movement.
 */
function ChatbotScene() {
    const groupRef = useRef();
    const { viewport } = useThree();
    const isMobile = viewport.width < 6;

    // Position chatbot
    const position = isMobile ? [0, 1.8, 0] : [2.8, 0, 0];

    // High-performance floating animation
    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();
        groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.15;
        groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.05;
    });

    return (
        <group ref={groupRef} position={position} scale={isMobile ? 0.5 : 0.6}>
            <RoboModel />
        </group>
    );
}

/**
 * Main Export for Hero Section
 * Sets up the Canvas and Entry Transitions.
 */
export default function AIChatbot() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute inset-0 w-full h-full z-[2] pointer-events-none overflow-hidden bg-transparent"
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
                className="bg-transparent pointer-events-auto"
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                <ChatbotScene />

                <EffectComposer>
                    <Bloom
                        intensity={0.8}
                        luminanceThreshold={0.1}
                        luminanceSmoothing={0.9}
                        radius={0.8}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </motion.div>
    );
}
