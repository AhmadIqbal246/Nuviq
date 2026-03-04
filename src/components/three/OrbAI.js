"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { createNoise4D } from "simplex-noise";
import { useOrbState } from "@/hooks/useOrbState";
import { OrbParticles } from "./OrbParticles";
import { AIChatbot } from "./AIChatbot";
import { ExplosionParticles } from "./ExplosionParticles";

function OrbMaterial({ orbState }) {
    const matRef = useRef();

    const stateColors = {
        idle: { color: '#3d35cc', emissive: '#1a0a4a', emissiveIntensity: 0.5 },
        thinking: { color: '#5548ff', emissive: '#2d1a6e', emissiveIntensity: 0.9 },
        speaking: { color: '#00aadd', emissive: '#003344', emissiveIntensity: 0.8 },
        listening: { color: '#2a2580', emissive: '#0d0830', emissiveIntensity: 0.3 },
        reacting: { color: '#ffffff', emissive: '#6c63ff', emissiveIntensity: 1.5 },
        exploded: { color: '#000000', emissive: '#000000', emissiveIntensity: 0 },
        reforming: { color: '#3d35cc', emissive: '#1a0a4a', emissiveIntensity: 0.2 },
    };

    useFrame(() => {
        if (!matRef.current) return;
        const target = stateColors[orbState] || stateColors.idle;

        matRef.current.color.lerp(new THREE.Color(target.color), 0.05);
        matRef.current.emissive.lerp(new THREE.Color(target.emissive), 0.05);
        matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
            matRef.current.emissiveIntensity,
            target.emissiveIntensity,
            0.05
        );
    });

    return (
        <meshStandardMaterial
            ref={matRef}
            roughness={0.1}
            metalness={0.2}
            transparent={true}
        />
    );
}

function OrbCore({ orbState }) {
    const meshRef = useRef();
    const noise4D = useMemo(() => createNoise4D(), []);
    const originalPositions = useRef();

    useEffect(() => {
        const geo = meshRef.current.geometry;
        originalPositions.current = Float32Array.from(geo.attributes.position.array);
    }, []);

    useFrame((state, delta) => {
        if (orbState === 'exploded' || orbState === 'reforming') {
            const target = orbState === 'reforming' ? 0.3 : 0;
            meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, target, 0.1));
            meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity, target, 0.1);
            if (orbState === 'exploded') return;
        }

        const time = state.clock.elapsedTime;
        const geo = meshRef.current.geometry;
        const pos = geo.attributes.position;
        const orig = originalPositions.current;

        if (!orig) return;

        // Restore opacity
        if (meshRef.current.material.opacity < 1 && orbState !== 'reforming') {
            meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity, 1, 0.1);
        }

        const noiseIntensity = {
            idle: 0.1,
            thinking: 0.35,
            speaking: 0.25,
            listening: 0.05,
            reacting: 0.60,
        }[orbState] || 0.1;

        const timeSpeed = 0.8; // Constant speed as requested

        for (let i = 0; i < pos.count; i++) {
            const ox = orig[i * 3];
            const oy = orig[i * 3 + 1];
            const oz = orig[i * 3 + 2];

            const noise = noise4D(ox * 0.4, oy * 0.4, oz * 0.4, time * timeSpeed);

            let speakingMod = 1.0;
            if (orbState === 'speaking') {
                const normalizedY = (oy + 1) / 2;
                const wavePhase = normalizedY - time * 2.0;
                speakingMod = 1.0 + Math.sin(wavePhase * Math.PI * 4) * 0.25;
            }

            const displacement = noise * noiseIntensity * speakingMod;
            const len = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;

            pos.setXYZ(
                i,
                ox + (ox / len) * displacement,
                oy + (oy / len) * displacement,
                oz + (oz / len) * displacement
            );
        }
        pos.needsUpdate = true;
        geo.computeVertexNormals();

        if (orbState === 'idle') {
            const breathe = 1.0 + Math.sin(time * 0.8) * 0.04;
            meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, breathe, 0.1));
        } else if (orbState === 'reacting') {
            const burst = 1.0 + Math.sin(time * 8) * 0.12;
            meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, burst, 0.1));
        } else if (orbState !== 'reforming') {
            meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.0, 0.1));
        }
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[0.8, 6]} />
            <OrbMaterial orbState={orbState} />
        </mesh>
    );
}

function OrbLights({ orbState }) {
    const violetLightRef = useRef();
    const cyanLightRef = useRef();

    const lightConfig = {
        idle: { violet: 3.0, cyan: 2.0 },
        thinking: { violet: 5.0, cyan: 1.5 },
        speaking: { violet: 2.0, cyan: 5.0 },
        listening: { violet: 1.5, cyan: 1.0 },
        reacting: { violet: 10.0, cyan: 10.0 },
        exploded: { violet: 0, cyan: 0 },
        reforming: { violet: 1.0, cyan: 1.0 },
    };

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        const cfg = lightConfig[orbState] || lightConfig.idle;

        if (violetLightRef.current) {
            violetLightRef.current.position.x = Math.sin(time * 0.6) * 3;
            violetLightRef.current.position.z = Math.cos(time * 0.6) * 3;
            violetLightRef.current.intensity = THREE.MathUtils.lerp(violetLightRef.current.intensity, cfg.violet * 10, 0.05);
        }

        if (cyanLightRef.current) {
            cyanLightRef.current.position.x = Math.sin(time * 0.6 + Math.PI) * 3;
            cyanLightRef.current.position.z = Math.cos(time * 0.6 + Math.PI) * 3;
            cyanLightRef.current.intensity = THREE.MathUtils.lerp(cyanLightRef.current.intensity, cfg.cyan * 10, 0.05);
        }
    });

    return (
        <>
            <ambientLight intensity={orbState === 'exploded' || orbState === 'reforming' ? 0.2 : 0.5} color="#050510" />
            <pointLight ref={violetLightRef} position={[3, 1, 0]} color="#6c63ff" />
            <pointLight ref={cyanLightRef} position={[-3, -1, 0]} color="#00d9ff" />
            <pointLight position={[0, 3, 3]} color="#ffffff" intensity={orbState === 'exploded' || orbState === 'reforming' ? 1 : 5} />
        </>
    );
}

function ChatbotWrapper({ orbState }) {
    const groupRef = useRef();
    const active = orbState === 'exploded';

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Further decreased target scale to 0.6 for bot
            const target = active ? 0.6 : 0;
            groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, target, 0.1));
        }
    });

    return (
        <group ref={groupRef} scale={[0, 0, 0]}>
            {(active || orbState === 'reforming') && <AIChatbot />}
        </group>
    );
}

function OrbScene() {
    const { state: orbState, triggerReacting, triggerExplosion } = useOrbState();
    const groupRef = useRef();
    const { mouse, viewport } = useThree();
    const isMobile = viewport.width < 6;

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * -0.2, 0.08);
    });

    const isOrbVisible = orbState !== 'exploded' && orbState !== 'reforming';
    const position = isMobile ? [0, 1.8, 0] : [2.8, 0, 0];

    return (
        <group ref={groupRef} position={position} scale={isMobile ? 0.8 : 1.0}>
            <group onPointerDown={() => triggerExplosion()} onPointerEnter={() => triggerReacting()}>
                <OrbCore orbState={orbState} />
                {isOrbVisible && (
                    <OrbParticles orbState={orbState} />
                )}
            </group>

            <OrbLights orbState={orbState} />
            <ExplosionParticles active={orbState === 'exploded' || orbState === 'reforming'} />
            <ChatbotWrapper orbState={orbState} />
        </group>
    );
}

export default function OrbAI() {
    return (
        <div className="absolute inset-0 w-full h-full z-[2] pointer-events-none overflow-hidden bg-transparent">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
                className="bg-transparent pointer-events-auto cursor-pointer"
                style={{ position: 'relative' }}
            >
                <OrbScene />
                <EffectComposer>
                    <Bloom
                        intensity={1.5}
                        luminanceThreshold={0.15}
                        luminanceSmoothing={0.9}
                        radius={0.8}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
