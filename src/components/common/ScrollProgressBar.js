"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar({ visible = true }) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    if (!visible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-accent z-[10000] origin-[0%] shadow-glow"
            style={{ scaleX }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        />
    );
}
