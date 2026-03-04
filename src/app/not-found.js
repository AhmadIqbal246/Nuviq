"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-base flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background glitch effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="animate-pulse w-full h-full bg-[radial-gradient(circle_at_center,var(--color-violet)_0%,transparent_60%)]" />
            </div>

            <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-[15vw] font-serif font-black text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
            >
                404
            </motion.h1>

            <div className="flex flex-col items-center text-center gap-8 z-10">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                    className="w-24 h-24 rounded-3xl bg-gradient-accent flex items-center justify-center shadow-glow mb-4"
                >
                    <span className="text-4xl">🛸</span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-serif font-bold text-text-primary">
                    Lost in Space?
                </h2>
                <p className="text-muted text-lg font-mono">
                    The page you are looking for has been sucked <br /> into a black hole.
                </p>

                <MagneticButton>
                    <Link href="/">
                        <button className="px-12 py-4 bg-gradient-accent text-base font-bold rounded-lg shadow-glow hover:scale-110 transition-transform duration-300">
                            Return Home
                        </button>
                    </Link>
                </MagneticButton>
            </div>
        </div>
    );
}
