"use client";

import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleField() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options = {
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
            number: {
                value: typeof window !== "undefined" && window.innerWidth < 768 ? 30 : 70,
                density: { enable: true, area: 900 }
            },
            color: {
                value: ["#6c63ff", "#00d9ff", "#a78bfa"]
            },
            opacity: {
                value: { min: 0.1, max: 0.4 },
                animation: {
                    enable: true,
                    speed: 0.5,
                    minimumValue: 0.05,
                    sync: false
                }
            },
            size: {
                value: { min: 1, max: 3 },
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.5,
                    sync: false
                }
            },
            links: {
                enable: true,
                distance: 140,
                color: "#6c63ff",
                opacity: 0.15,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.6,
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "out" }
            },
            shadow: {
                enable: true,
                color: "#6c63ff",
                blur: 4
            }
        },
        interactivity: {
            events: {
                onHover: {
                    enable: typeof window !== "undefined" && window.innerWidth >= 768,
                    mode: "repulse"
                }
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4,
                    speed: 0.8
                }
            }
        },
        detectRetina: true
    };

    if (!init) return null;

    return (
        <div className="absolute inset-0 z-1 pointer-events-none">
            <Particles
                id="hero-particles"
                options={options}
                className="h-full w-full"
            />
        </div>
    );
}
