"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function OrbParticles({ orbState }) {
    const pointsRef = useRef();
    const PARTICLE_COUNT = 120;

    const { positions, velocities, phases, initialPositions } = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const initialPositions = new Float32Array(PARTICLE_COUNT * 3);
        const velocities = new Float32Array(PARTICLE_COUNT * 3);
        const phases = new Float32Array(PARTICLE_COUNT);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 1.8 + Math.random() * 1.5;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            positions[i * 3] = initialPositions[i * 3] = x;
            positions[i * 3 + 1] = initialPositions[i * 3 + 1] = y;
            positions[i * 3 + 2] = initialPositions[i * 3 + 2] = z;

            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

            phases[i] = Math.random() * Math.PI * 2;
        }
        return { positions, velocities, phases, initialPositions };
    }, []);

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        const pos = pointsRef.current.geometry.attributes.position;

        const orbitSpeed = {
            idle: 0.003,
            thinking: 0.008,
            speaking: 0.005,
            listening: 0.001,
            reacting: 0.02
        }[orbState] || 0.003;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            let x = initialPositions[i * 3];
            let y = initialPositions[i * 3 + 1];
            let z = initialPositions[i * 3 + 2];

            // Orbit around Y
            const angle = time * orbitSpeed * 100;
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);

            const rx = x * cosA - z * sinA;
            const rz = x * sinA + z * cosA;

            let finalX = rx;
            let finalY = y;
            let finalZ = rz;

            if (orbState === 'speaking') {
                const dist = Math.sqrt(finalX * finalX + finalY * finalY + finalZ * finalZ);
                const wave = Math.sin(time * 4 + phases[i]) * 0.15;
                const scale = 1 + wave;
                finalX *= scale;
                finalY *= scale;
                finalZ *= scale;
            }

            if (orbState === 'reacting') {
                const scale = 1.2 + Math.sin(time * 10) * 0.1;
                finalX *= scale;
                finalY *= scale;
                finalZ *= scale;
            }

            pos.setXYZ(i, finalX, finalY, finalZ);
        }

        pos.needsUpdate = true;
    });

    const particleColor = {
        idle: '#6c63ff',
        thinking: '#a78bfa',
        speaking: '#00d9ff',
        listening: '#3d35cc',
        reacting: '#ffffff'
    }[orbState] || '#6c63ff';

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={PARTICLE_COUNT}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color={particleColor}
                transparent
                opacity={0.7}
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}
