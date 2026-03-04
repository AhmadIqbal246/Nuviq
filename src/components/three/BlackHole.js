"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import * as THREE from "three";
import * as shaders from "@/lib/fluidShaders";

const PARTICLE_COUNT = 3000;

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
        // Uniforms are updated via refs or properties in the component
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
            const r = 0.8 + Math.pow(Math.random(), 0.5) * 2.7;
            const angle = Math.random() * Math.PI * 2;
            const speed = (0.3 + Math.random() * 0.2) / Math.sqrt(r);
            const inclination = (Math.random() - 0.5) * 0.15;
            const eccentricity = 0.1;

            orbitData.push({ r, angle, speed, inclination, eccentricity });

            const t = (r - 0.8) / 2.7;
            let color = new THREE.Color();
            if (t < 0.2) {
                color.setHSL(0.55, 0.5, 0.9); // Cyan-white
            } else if (t < 0.6) {
                color.setHSL(0.7, 0.6, 0.7); // Violet
            } else {
                color.setHSL(0.75, 0.8, 0.4); // Deep violet
            }

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = Math.max(0.01, (1 - t) * 0.05 + Math.random() * 0.02);
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

            const x = Math.cos(data.angle) * rx;
            const z = Math.sin(data.angle) * rz;
            const y = Math.sin(data.angle) * data.r * data.inclination;

            posAttr.array[i * 3] = x;
            posAttr.array[i * 3 + 1] = y;
            posAttr.array[i * 3 + 2] = z;

            // Spiral inward
            if (data.r < 1.0) {
                data.r -= 0.01 * delta;
                if (data.r < 0.62) {
                    data.r = 3.0 + Math.random() * 0.5;
                }
            }
        }
        posAttr.needsUpdate = true;

        // Mouse tilt
        const { mouse } = state;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.3, 0.03);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.2, 0.03);
        // Project screen pos
        const vector = new THREE.Vector3(0, 0, 0);
        vector.project(camera);
        setScreenPos(new THREE.Vector2((vector.x + 1) / 2, (vector.y + 1) / 2));
    });

    return (
        <group ref={groupRef}>
            {/* Singularity */}
            <mesh>
                <sphereGeometry args={[0.6, 64, 64]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Photon Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.62, 0.01, 16, 100]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
            </mesh>

            {/* Accretion Disk */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={positions}
                        count={PARTICLE_COUNT}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        array={colors}
                        count={PARTICLE_COUNT}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    vertexColors={true}
                    transparent={true}
                    opacity={0.8}
                    sizeAttenuation={true}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>

            <ambientLight intensity={0.1} />
            <pointLight position={[-3, 2, 2]} color="#6c63ff" intensity={50} />
            <pointLight position={[3, -2, 1]} color="#00d9ff" intensity={30} />
        </group>
    );
}

export default function BlackHole() {
    const [screenPos, setScreenPos] = React.useState(new THREE.Vector2(0.5, 0.5));

    return (
        <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full pointer-events-none z-2">
            <Canvas
                camera={{ position: [0, 1.5, 7], fov: 45 }}
                gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                style={{ background: "transparent" }}
            >
                <BlackHoleScene setScreenPos={setScreenPos} />
                <EffectComposer>
                    <Bloom
                        intensity={1.2}
                        luminanceThreshold={0.1}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />
                    <WarpEffect blackHoleScreenPos={screenPos} strength={0.1} radius={0.28} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
