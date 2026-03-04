"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import * as THREE from "three";
import * as shaders from "@/lib/fluidShaders";

const PARTICLE_COUNT = 5000;

class WarpEffectImpl extends Effect {
    constructor({ blackHoleScreenPos, strength, radius }) {
        super("WarpEffect", shaders.warpEffect, {
            uniforms: new Map([
                ["uBlackHoleScreenPos", new THREE.Uniform(blackHoleScreenPos)],
                ["uStrength", new THREE.Uniform(strength)],
                ["uRadius", new THREE.Uniform(radius)]
            ])
        });
    }

    update(renderer, inputBuffer, deltaTime) {
        // Uniforms are updated via properties in the component
    }
}

const WarpEffect = React.forwardRef(({ blackHoleScreenPos, strength, radius }, ref) => {
    const effect = useMemo(() => new WarpEffectImpl({ blackHoleScreenPos, strength, radius }), []);

    useFrame(() => {
        effect.uniforms.get("uBlackHoleScreenPos").value = blackHoleScreenPos;
        effect.uniforms.get("uStrength").value = strength;
        effect.uniforms.get("uRadius").value = radius;
    });

    return <primitive ref={ref} object={effect} dispose={null} />;
});

function BlackHoleScene({ setScreenPos }) {
    const groupRef = useRef();
    const pointsRef = useRef();
    const { camera } = useThree();

    const { positions, colors, sizes, orbitData } = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const sizes = new Float32Array(PARTICLE_COUNT);
        const orbitData = [];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const r = 2.0 + Math.pow(Math.random(), 0.5) * 8.0;
            const angle = Math.random() * Math.PI * 2;
            const speed = (0.2 + Math.random() * 0.2) / Math.sqrt(r);
            const inclination = (Math.random() - 0.5) * 0.2;
            const eccentricity = 0.1;

            orbitData.push({ r, angle, speed, inclination, eccentricity });

            const t = (r - 2.0) / 8.0;
            let color = new THREE.Color();
            if (t < 0.15) {
                color.setHSL(0.55, 0.5, 0.9);
            } else if (t < 0.5) {
                color.setHSL(0.7, 0.6, 0.7);
            } else if (t < 0.8) {
                color.setHSL(0.75, 0.8, 0.4);
            } else {
                color.setHSL(0.75, 0.8, 0.2);
            }

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = Math.max(0.01, (1 - t) * 0.08 + Math.random() * 0.03);
        }

        return { positions, colors, sizes, orbitData };
    }, []);

    useFrame((state, delta) => {
        const points = pointsRef.current;
        const posAttr = points.geometry.attributes.position;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const data = orbitData[i];
            data.angle += data.speed * delta;

            const rx = data.r * (1 + data.eccentricity * Math.cos(data.angle));
            const rz = data.r * (1 - data.eccentricity * Math.cos(data.angle));

            posAttr.array[i * 3] = Math.cos(data.angle) * rx;
            posAttr.array[i * 3 + 1] = Math.sin(data.angle) * data.r * data.inclination;
            posAttr.array[i * 3 + 2] = Math.sin(data.angle) * rz;

            if (data.r < 1.4) {
                data.r -= 0.01 * delta;
                if (data.r < 1.0) {
                    data.r = 8.0 + Math.random() * 2.0;
                }
            }
        }
        posAttr.needsUpdate = true;

        const vector = new THREE.Vector3(0, 0, 0);
        vector.project(camera);
        setScreenPos(new THREE.Vector2((vector.x + 1) / 2, (vector.y + 1) / 2));
    });

    return (
        <group ref={groupRef} rotation={[0.25, 0, 0]}>
            {/* Singularity */}
            <mesh>
                <sphereGeometry args={[1.5, 64, 64]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Photon Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.52, 0.012, 16, 100]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
            </mesh>

            {/* Accretion Disk */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" array={positions} count={PARTICLE_COUNT} itemSize={3} />
                    <bufferAttribute attach="attributes-color" array={colors} count={PARTICLE_COUNT} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    vertexColors={true}
                    transparent={true}
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>

            {/* Atmosphere glow removed to clear the blueish overlay */}

            <ambientLight intensity={0.1} />
        </group>
    );
}

export default function BlackHoleBackground() {
    const [screenPos, setScreenPos] = React.useState(new THREE.Vector2(0.5, 0.5));

    return (
        <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 4, 15], fov: 60 }}
                gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                style={{ background: "transparent" }}
            >
                <BlackHoleScene setScreenPos={setScreenPos} />
                <EffectComposer>
                    <Bloom
                        intensity={1.4}
                        luminanceThreshold={0.08}
                        luminanceSmoothing={0.95}
                        radius={1.0}
                        mipmapBlur
                    />
                    <WarpEffect blackHoleScreenPos={screenPos} strength={0.15} radius={0.35} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
