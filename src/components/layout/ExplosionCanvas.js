"use client";

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";

const ExplosionCanvas = forwardRef((props, ref) => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const animationFrameId = useRef(null);

    const colors = ["#6c63ff", "#00d9ff", "#ffffff", "#a78bfa", "#67e8f9"];

    const createParticles = (x, y) => {
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 300 : 700;

        // Core Sparks
        for (let i = 0; i < (isMobile ? 100 : 250); i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 10 + Math.random() * 30;
            particles.current.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 2 + Math.random() * 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                life: 0.6 + Math.random() * 0.6,
                type: "spark"
            });
        }

        // Streak Lines
        for (let i = 0; i < (isMobile ? 50 : 150); i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 25 + Math.random() * 40;
            particles.current.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                length: 20 + Math.random() * 40,
                color: colors[Math.floor(Math.random() * 2)], // Violet or Cyan
                alpha: 0.5,
                life: 0.3 + Math.random() * 0.2,
                type: "streak"
            });
        }

        // Glow Embers
        for (let i = 0; i < (isMobile ? 40 : 120); i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 5;
            particles.current.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.5, // float up
                size: 8 + Math.random() * 16,
                color: colors[Math.floor(Math.random() * 2)],
                alpha: 0.08 + Math.random() * 0.17,
                life: 1.5 + Math.random() * 1.0,
                type: "ember"
            });
        }
    };

    const update = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.current.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.type === "spark" || p.type === "streak") {
                p.vx *= 0.91;
                p.vy *= 0.91;
            }

            p.life -= 0.016; // Approx 60fps
            p.alpha = Math.max(0, p.alpha * (p.life > 0 ? 1 : 0.95));

            if (p.type === "spark") {
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.type === "streak") {
                ctx.globalAlpha = p.alpha;
                ctx.strokeStyle = p.color;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
                ctx.stroke();
            } else if (p.type === "ember") {
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                // Add soft glow
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(1, "transparent");
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            if (p.life <= 0 && p.alpha <= 0.01) {
                particles.current.splice(i, 1);
            }
        });

        if (particles.current.length > 0) {
            animationFrameId.current = requestAnimationFrame(update);
        }
    };

    useImperativeHandle(ref, () => ({
        detonate: (x, y) => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                createParticles(x, y);
                update();
            }
        }
    }));

    useEffect(() => {
        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9998,
                pointerEvents: "none"
            }}
        />
    );
});

ExplosionCanvas.displayName = "ExplosionCanvas";

export default ExplosionCanvas;
