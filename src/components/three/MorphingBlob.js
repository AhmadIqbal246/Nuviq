"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { createNoise4D } from "simplex-noise";

function Blob({ mouse }) {
    const meshRef = useRef();
    const noise4D = useMemo(() => createNoise4D(), []);

    // Store original positions for displacement calculation
    const originalPositions = useRef();

    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.geometry.computeVertexNormals();
            originalPositions.current = meshRef.current.geometry.attributes.position.array.slice();
        }
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const mesh = meshRef.current;
        if (!mesh || !originalPositions.current) return;

        const positions = mesh.geometry.attributes.position.array;
        const original = originalPositions.current;

        // Morphing intensity (increases slightly on mouse proximity if we want, but keeping it simple for now)
        const morphIntensity = 0.6 + (Math.sin(time) * 0.1);

        for (let i = 0; i < positions.length; i += 3) {
            const x = original[i];
            const y = original[i + 1];
            const z = original[i + 2];

            const noise = noise4D(
                x * 0.4,
                y * 0.4,
                z * 0.4,
                time * 0.3
            );

            const displacement = noise * morphIntensity;

            // Calculate vec3 direction (from center [0,0,0])
            const length = Math.sqrt(x * x + y * y + z * z);
            const nx = x / length;
            const ny = y / length;
            const nz = z / length;

            positions[i] = x + nx * displacement;
            positions[i + 1] = y + ny * displacement;
            positions[i + 2] = z + nz * displacement;
        }

        mesh.geometry.attributes.position.needsUpdate = true;
        mesh.geometry.computeVertexNormals();

        // Lerp emissive color between violet and cyan
        const colorMix = (Math.sin(time * 0.5) + 1) / 2;
        mesh.material.emissive.lerpColors(
            new THREE.Color("#1a0a4a"),
            new THREE.Color("#003344"),
            colorMix
        );

        // Mouse tilt
        const targetRotX = mouse.current.y * 0.3;
        const targetRotY = mouse.current.x * 0.3;
        mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetRotX, 0.05);
        mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, targetRotY + time * 0.2, 0.05); // combine mouse + idle

        // Float
        mesh.position.y = Math.sin(time * 0.5) * 0.15;
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[2, 64]} />
            <meshStandardMaterial
                color="#6c63ff"
                emissive="#1a0a4a"
                emissiveIntensity={1.5}
                roughness={0.15}
                metalness={0.1}
            />
        </mesh>
    );
}

function Scene({ mouse }) {
    const violetLightRef = useRef();
    const cyanLightRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (violetLightRef.current) {
            violetLightRef.current.position.x = Math.sin(time * 0.4) * 10;
            violetLightRef.current.position.z = Math.cos(time * 0.4) * 10;
        }
        if (cyanLightRef.current) {
            cyanLightRef.current.position.x = Math.sin(time * 0.4 + Math.PI) * 10;
            cyanLightRef.current.position.z = Math.cos(time * 0.4 + Math.PI) * 10;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight
                ref={violetLightRef}
                position={[10, 10, 10]}
                color="#6c63ff"
                intensity={80}
            />
            <pointLight
                ref={cyanLightRef}
                position={[-10, -10, 5]}
                color="#00d9ff"
                intensity={60}
            />
            <pointLight
                position={[0, 0, 8]}
                color="#ffffff"
                intensity={20}
            />
            <Blob mouse={mouse} />
            <EffectComposer>
                <Bloom intensity={1.5} luminanceThreshold={0.1} radius={0.8} />
            </EffectComposer>
        </>
    );
}

export default function MorphingBlob() {
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
        <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full pointer-events-none z-2">
            {/* CSS Halo */}
            <div
                className="absolute inset-0 z-0 bg-radial-gradient from-violet/10 via-cyan/5 to-transparent blur-3xl opacity-30"
                style={{ width: '120%', height: '120%', top: '-10%', left: '-10%' }}
            />
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
                style={{ background: 'transparent' }}
            >
                <Scene mouse={mouse} />
            </Canvas>
        </div>
    );
}
