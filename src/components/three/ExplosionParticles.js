"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ExplosionParticles({ active }) {
    const pointsRef = useRef();
    const PARTICLE_COUNT = 500;
    const isReforming = useRef(false);

    // Track if we are in the "reforming" phase where particles should pull back
    useEffect(() => {
        // Technically 'active' is true for both exploded and reforming.
        // We can't distinguish here unless we pass a specific 'phase' prop.
        // But we can detect if the particles have stopped moving and then pull them back.
    }, [active]);

    const { positions, velocities, originalPositions } = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
        const velocities = new Float32Array(PARTICLE_COUNT * 3);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const speed = 0.5 + Math.random() * 2;

            velocities[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
            velocities[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta);
            velocities[i * 3 + 2] = speed * Math.cos(phi);

            // Start at center
            positions[i * 3] = 0;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = 0;

            originalPositions[i * 3] = 0;
            originalPositions[i * 3 + 1] = 0;
            originalPositions[i * 3 + 2] = 0;
        }
        return { positions, velocities, originalPositions };
    }, []);

    useFrame((state, delta) => {
        if (!active || !pointsRef.current) return;
        const posAttr = pointsRef.current.geometry.attributes.position;
        const opacity = pointsRef.current.material.opacity;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            // Apply velocity for the initial explosion
            posAttr.array[i * 3] += velocities[i * 3] * delta * 5;
            posAttr.array[i * 3 + 1] += velocities[i * 3 + 1] * delta * 5;
            posAttr.array[i * 3 + 2] += velocities[i * 3 + 2] * delta * 5;

            // Decelerate
            velocities[i * 3] *= 0.95;
            velocities[i * 3 + 1] *= 0.95;
            velocities[i * 3 + 2] *= 0.95;
        }

        posAttr.needsUpdate = true;

        // Slower fade out to persist during the cycle
        if (pointsRef.current.material.opacity > 0.1) {
            pointsRef.current.material.opacity = THREE.MathUtils.lerp(pointsRef.current.material.opacity, 0, 0.01);
        }
    });

    useEffect(() => {
        if (active && pointsRef.current) {
            pointsRef.current.material.opacity = 1.0;
            const posAttr = pointsRef.current.geometry.attributes.position;
            for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
                posAttr.array[i] = 0;
            }
        }
    }, [active]);

    if (!active) return null;

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" array={positions} count={PARTICLE_COUNT} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.06} color="#00d9ff" transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} />
        </points>
    );
}
