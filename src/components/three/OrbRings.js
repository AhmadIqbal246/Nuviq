"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function OrbRings({ orbState }) {
    const ring1Ref = useRef();
    const ring2Ref = useRef();
    const ring3Ref = useRef();

    const speedMult = {
        idle: 1.0,
        thinking: 2.5,
        speaking: 1.8,
        listening: 0.4,
        reacting: 4.0
    };

    useFrame((state) => {
        const speed = speedMult[orbState] || 1.0;

        if (ring1Ref.current) {
            ring1Ref.current.rotation.z += 0.004 * speed;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.z -= 0.006 * speed;
        }
        if (ring3Ref.current) {
            ring3Ref.current.rotation.z += 0.003 * speed;
        }
    });

    const ringOpacity = {
        idle: 0.5,
        thinking: 0.9,
        speaking: 0.7,
        listening: 0.3,
        reacting: 1.0
    }[orbState] || 0.5;

    return (
        <group>
            {/* Ring 1 — horizontal, violet */}
            <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.8, 0.012, 8, 120]} />
                <meshBasicMaterial
                    color="#6c63ff"
                    transparent
                    opacity={ringOpacity * 0.8}
                />
            </mesh>

            {/* Ring 2 — tilted 60°, cyan */}
            <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
                <torusGeometry args={[2.1, 0.008, 8, 120]} />
                <meshBasicMaterial
                    color="#00d9ff"
                    transparent
                    opacity={ringOpacity * 0.6}
                />
            </mesh>

            {/* Ring 3 — tilted 30°, light violet */}
            <mesh ref={ring3Ref} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
                <torusGeometry args={[2.4, 0.006, 8, 120]} />
                <meshBasicMaterial
                    color="#a78bfa"
                    transparent
                    opacity={ringOpacity * 0.4}
                />
            </mesh>
        </group>
    );
}
