"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Services", href: "/services" },
        { name: "Our Work", href: "/about#featured-work" },
        { name: "FAQ", href: "/#faq" },
        { name: "Contact", href: "/contact" },
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

    return (
        <nav
            className={`fixed top-0 inset-x-0 w-full z-[1000] transition-all duration-300 ease-in-out outline-none ${isScrolled
                ? "py-4 glass shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
                : "py-4 lg:py-6 bg-transparent"
                }`}
        >
            <div className="flex items-center justify-between w-full max-w-[100vw] px-6 lg:px-16 mx-auto outline-none">
                {/* LOGO */}
                <Link href="/">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center font-bold text-xl shadow-glow overflow-hidden transition-all duration-500">
                            <span className="relative z-10 text-white">N</span>
                        </div>
                        <span className="font-serif text-2xl font-bold tracking-tighter text-text-primary uppercase">
                            NovaSoft
                        </span>
                    </div>
                </Link>

                {/* DESKTOP LINKS */}
                <div className="hidden lg:flex items-center gap-10">
                    <div className="flex items-center gap-8 bg-white/5 px-8 py-3 rounded-full border border-white/5 backdrop-blur-md">
                        {navLinks.map((link) => (
                            <div key={link.name} className="group relative">
                                <Link
                                    href={link.href}
                                    className="text-muted hover:text-text-primary transition-colors text-[11px] font-mono uppercase tracking-[0.2em] font-medium"
                                >
                                    {link.name}
                                </Link>
                                <div className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-accent transition-all duration-500 group-hover:w-full rounded-full" />
                            </div>
                        ))}
                    </div>

                    <Link href="#contact">
                        <button className="relative py-3.5 px-10 rounded-full bg-gradient-accent text-[11px] font-bold uppercase tracking-[0.15em] shadow-glow hover:shadow-[0_0_40px_rgba(108,99,255,0.4)] transition-all duration-500 group overflow-hidden">
                            <span className="relative z-10 text-white">Contact Us</span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </Link>
                </div>

                {/* MOBILE TOGGLE */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-text-primary transition-all active:scale-95"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* SIMPLE MOBILE MENU */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-base backdrop-blur-3xl z-[1001] lg:hidden flex flex-col p-8 sm:p-12 overflow-y-auto">
                    <div className="flex justify-between items-center mb-12">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center font-bold text-xl shadow-glow">
                                <span className="text-white">N</span>
                            </div>
                            <span className="font-serif text-xl font-bold tracking-tighter text-text-primary uppercase">
                                NovaSoft
                            </span>
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-6 sm:gap-8 py-8">
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="group inline-flex flex-col"
                                >
                                    <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text-primary hover:text-cyan transition-colors uppercase tracking-tight">
                                        {link.name}
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto border-t border-white/10 pt-8 flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono text-muted uppercase tracking-[0.3em] font-semibold">Get in Touch</span>
                            <a href="mailto:hello@novasoft.ai" className="text-sm font-mono text-text-primary hover:text-cyan transition-colors">hello@novasoft.ai</a>
                        </div>
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                            {['Github', 'LinkedIn', 'Twitter', 'Instagram'].map(social => (
                                <a key={social} href="#" className="text-xs font-mono text-text-primary hover:text-cyan transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan/50" />
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
