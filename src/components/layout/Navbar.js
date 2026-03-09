"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [portalTarget, setPortalTarget] = useState(null);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Services", href: "/services" },
        { name: "Our Work", href: "/#projects" },
        { name: "FAQ", href: "/#faq" },
    ];

    // Set portal target after mount
    useEffect(() => {
        setPortalTarget(document.body);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const mobileMenu = isMenuOpen && portalTarget ? createPortal(
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#080808',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Menu Header */}
            <div className="flex justify-between items-center w-full px-6 py-4 border-b border-white/5"
                style={{ backgroundColor: '#080808' }}
            >
                <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden rounded-xl bg-transparent">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="object-cover w-full h-full scale-[1.5]"
                        >
                            <source src="/Animated Logo/RobotSaludando.webm" type="video/webm" />
                        </video>
                    </div>
                    <span className="font-serif text-xl font-bold tracking-tighter text-text-primary uppercase">
                        NovaSoft
                    </span>
                </div>
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
                    aria-label="Close menu"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Links - Beautifully centered */}
            <div
                className="flex-1 flex flex-col justify-center items-center gap-5 px-6 overflow-y-auto"
                style={{ backgroundColor: '#080808' }}
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full text-center"
                    >
                        <span className="text-2xl sm:text-3xl font-serif font-bold text-text-primary hover:text-cyan uppercase tracking-tight block py-2">
                            {link.name}
                        </span>
                    </Link>
                ))}
            </div>


        </div>,
        portalTarget
    ) : null;

    return (
        <>
            <nav
                className="fixed top-0 inset-x-0 w-full z-[1000] outline-none py-4 glass shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            >
                <div className="flex items-center justify-between w-full max-w-[100vw] px-6 lg:px-16 mx-auto outline-none">
                    {/* LOGO */}
                    <Link href="/">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden rounded-xl bg-transparent transition-transform duration-300 group-hover:scale-105">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="object-cover w-full h-full scale-[1.5]"
                                >
                                    <source src="/Animated Logo/RobotSaludando.webm" type="video/webm" />
                                </video>
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
                                        className="text-muted hover:text-text-primary text-[11px] font-mono uppercase tracking-[0.2em] font-medium"
                                    >
                                        {link.name}
                                    </Link>
                                    <div className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-accent group-hover:w-full rounded-full" />
                                </div>
                            ))}
                        </div>

                        <Link href="/contact">
                            <button className="relative py-3.5 px-10 rounded-full bg-gradient-accent text-[11px] font-bold uppercase tracking-[0.15em] shadow-glow hover:shadow-[0_0_40px_rgba(108,99,255,0.4)] group overflow-hidden">
                                <span className="relative z-10 text-white">Contact Us</span>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100" />
                            </button>
                        </Link>
                    </div>

                    {/* MOBILE TOGGLE */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-text-primary active:bg-white/10"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu rendered via portal - outside nav stacking context */}
            {mobileMenu}
        </>
    );
}
