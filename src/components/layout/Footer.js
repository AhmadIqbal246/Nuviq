"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram, Mail, ArrowRight, MapPin, Phone } from "lucide-react";
import MagneticButton from "@/components/animations/MagneticButton";

export default function Footer() {
    return (
        <footer className="relative pt-32 pb-10 bg-transparent border-t border-white/5 overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-violet/50 to-transparent" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Big CTA Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-24 p-12 rounded-3xl bg-surface/30 backdrop-blur-xl border border-white/5 shadow-2xl">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                            Ready to <span className="gradient-text-animated">transform</span> your business?
                        </h2>
                        <p className="text-muted text-lg max-w-xl">
                            Let&apos;s build the next generation of AI-powered solutions together.
                            Our team is ready to turn your vision into reality.
                        </p>
                    </div>
                    <MagneticButton>
                        <Link href="#contact">
                            <div className="group flex items-center gap-3 py-5 px-10 bg-gradient-accent text-white font-bold rounded-2xl shadow-glow transition-all duration-300">
                                <span>Get a Free Quote</span>
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </div>
                        </Link>
                    </MagneticButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6">
                        <Link href="/">
                            <div className="flex items-center gap-3 group">
                                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center font-bold text-xl shadow-glow transition-transform duration-500 group-hover:rotate-12">
                                    N
                                </div>
                                <span className="font-serif text-3xl font-bold tracking-tight text-white group-hover:text-cyan transition-colors">
                                    NOVASOFT
                                </span>
                            </div>
                        </Link>
                        <p className="text-muted text-sm leading-relaxed">
                            Engineering digital ecosystems that transform businesses through AI, Web Development, and Custom Software Excellence.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="p-3 rounded-xl bg-surface border border-white/5 text-muted hover:text-cyan hover:border-cyan/30 transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services Column */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">Services</h4>
                        <div className="flex flex-col gap-4 text-muted text-sm">
                            <Link href="/services" className="hover:text-cyan transition-colors">AI & RAG Systems</Link>
                            <Link href="#skills" className="hover:text-cyan transition-colors">Web Development</Link>
                            <Link href="#skills" className="hover:text-cyan transition-colors">SaaS Solutions</Link>
                            <Link href="#skills" className="hover:text-cyan transition-colors">Cloud Architecture</Link>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">Company</h4>
                        <div className="flex flex-col gap-4 text-muted text-sm">
                            <Link href="/about" className="hover:text-violet transition-colors">About Us</Link>
                            <Link href="/team" className="hover:text-violet transition-colors">Our Team</Link>
                            <Link href="#projects" className="hover:text-violet transition-colors">Our Work</Link>
                            <Link href="#faq" className="hover:text-violet transition-colors">FAQs</Link>
                            <Link href="#contact" className="hover:text-violet transition-colors">Contact</Link>
                        </div>
                    </div>

                    {/* Contact Info Column */}
                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">Get in Touch</h4>
                        <div className="flex flex-col gap-4 text-muted text-sm">
                            <a href="mailto:hello@novasoft.dev" className="flex items-center gap-3 hover:text-cyan transition-colors">
                                <Mail size={16} className="text-cyan" />
                                hello@novasoft.dev
                            </a>
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-cyan" />
                                +1 (234) 567-890
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin size={16} className="text-cyan" />
                                Silicon Valley, CA
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
                    <p className="text-muted font-mono text-[10px] uppercase tracking-widest">
                        © {new Date().getFullYear()} NOVASOFT. ALL RIGHTS RESERVED.
                    </p>
                    <p className="text-muted font-mono text-[10px] uppercase tracking-widest invisible md:visible">
                        BUILT WITH NEXT.JS 14 × FRAMER MOTION × GSAP
                    </p>
                </div>
            </div>

            {/* Huge Background Text */}
            <h2 className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[20vw] font-serif font-black text-white/[0.02] pointer-events-none select-none">
                NOVASOFT
            </h2>
        </footer>
    );
}
