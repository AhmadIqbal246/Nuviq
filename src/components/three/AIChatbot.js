"use client";

import React from "react";
import { Html } from "@react-three/drei";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/**
 * Lottie AI Chatbot
 * Uses DotLottieReact for high-quality vector animations.
 * Wrapped in Drei's Html to integrate seamlessly into the R3F Canvas.
 */
export function AIChatbot() {
    return (
        <group>
            <Html
                center
                transform
                distanceFactor={6}
                position={[0, 0, 0]}
                style={{
                    width: '400px',
                    height: '400px',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'transparent',
                    position: 'relative' // Ensure non-static position
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
                            filter: 'drop-shadow(0 0 20px rgba(0, 242, 255, 0.4))' // Added glow for realism
                        }}
                    />
                </div>
            </Html>
        </group>
    );
}
