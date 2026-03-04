"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import MagneticButton from "@/components/animations/MagneticButton";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Experience", href: "#experience" },
        { name: "Contact", href: "#contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const navVariants = {
        initial: { y: -100, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
    };

    return (
        <motion.nav
            initial="initial"
            animate="animate"
            variants={navVariants}
            className={`fixed top-0 left-0 w-full z-[1000] px-6 lg:px-16 transition-all duration-500 ease-in-out ${isScrolled
                    ? "py-4 glass border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
                    : "py-10 bg-transparent"
                }`}
        >
            <div className="max-w-[1800px] mx-auto flex items-center justify-between">
                {/* LOGO */}
                <Link href="/">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 group"
                    >
                        <div className="relative w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center font-bold text-xl shadow-glow overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_30px_#6c63ff]">
                            <span className="relative z-10">A</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </div>
                        <span className="font-serif text-2xl font-bold tracking-tighter text-text-primary group-hover:text-cyan transition-colors duration-300 uppercase">
                            Ahmad
                        </span>
                    </motion.div>
                </Link>

                {/* DESKTOP LINKS */}
                <div className="hidden lg:flex items-center gap-10">
                    <div className="flex items-center gap-8 bg-white/5 px-8 py-3 rounded-full border border-white/5 backdrop-blur-md">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.name}
                                whileHover={{ y: -2 }}
                                className="group relative"
                            >
                                <Link
                                    href={link.href}
                                    className="text-muted hover:text-text-primary transition-colors text-[11px] font-mono uppercase tracking-[0.2em] font-medium"
                                >
                                    {link.name}
                                </Link>
                                <div className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-accent transition-all duration-500 group-hover:w-full rounded-full" />
                            </motion.div>
                        ))}
                    </div>

                    <MagneticButton>
                        <Link href="#contact">
                            <button className="relative py-3.5 px-10 rounded-full bg-gradient-accent text-[11px] font-bold uppercase tracking-[0.15em] shadow-glow hover:shadow-[0_0_40px_rgba(108,99,255,0.4)] transition-all duration-500 group overflow-hidden">
                                <span className="relative z-10">Get in Touch</span>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </Link>
                    </MagneticButton>
                </div>

                {/* MOBILE TOGGLE */}
                <div className="lg:hidden">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-text-primary"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>
            </div>

            {/* PREMIUM MOBILE MENU */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-base/95 backdrop-blur-2xl z-[1001] lg:hidden flex flex-col p-10"
                    >
                        <div className="flex justify-between items-center mb-20">
                            <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center font-bold text-xl">A</div>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-8">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="group flex flex-col"
                                    >
                                        <span className="text-xs font-mono text-cyan mb-2 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                                        <span className="text-5xl font-serif font-bold text-text-primary group-hover:text-violet transition-colors lowercase tracking-tighter">
                                            {link.name}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto pt-10 border-t border-white/5 flex flex-col gap-6">
                            <span className="text-[10px] font-mono text-muted uppercase tracking-[0.3em] font-semibold">Socials</span>
                            <div className="flex gap-8">
                                {['Github', 'LinkedIn', 'Twitter'].map(social => (
                                    <a key={social} href="#" className="text-sm font-mono text-text-primary hover:text-cyan transition-colors">{social}</a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
