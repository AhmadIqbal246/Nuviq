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
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-[1000] px-6 lg:px-12 py-6 transition-all duration-300 ${isScrolled ? "glass border-b border-white/10" : "bg-transparent py-10"
                }`}
        >
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center font-bold text-base shadow-glow">
                            A
                        </div>
                        <span className="font-serif text-2xl font-bold tracking-tight text-text-primary">
                            AHMAD
                        </span>
                    </motion.div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-12">
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <Link href={link.href} className="text-muted hover:text-text-primary transition-colors text-sm font-mono uppercase tracking-widest">
                                {link.name}
                            </Link>
                            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-violet transition-all duration-300 group-hover:w-full" />
                        </motion.div>
                    ))}
                    <MagneticButton>
                        <Link href="#contact">
                            <button className="py-2.5 px-8 rounded-full bg-gradient-accent text-base text-sm font-bold uppercase tracking-wider shadow-glow hover:scale-105 transition-transform duration-300">
                                Hire Me
                            </button>
                        </Link>
                    </MagneticButton>
                </div>

                {/* Mobile Toggle */}
                <div className="lg:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-primary">
                        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
                        className="fixed inset-0 bg-base z-[1001] flex flex-col items-center justify-center gap-10"
                    >
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-4xl md:text-6xl font-serif text-text-primary hover:text-cyan transition-colors"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="mt-10 p-4 rounded-full border border-violet text-violet"
                        >
                            <X size={40} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
