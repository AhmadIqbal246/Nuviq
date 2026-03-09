"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import MagneticButton from "@/components/animations/MagneticButton";

export default function Contact() {
    const [formStatus, setFormStatus] = useState("idle"); // idle, loading, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus("loading");
        setTimeout(() => {
            setFormStatus("success");
        }, 2000);
    };

    return (
        <section id="contact" className="py-10 lg:py-32 bg-transparent overflow-hidden relative">
            {/* Decorative Blobs */}
            <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-violet/10 blur-[150px] -z-1" />
            <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-cyan/10 blur-[150px] -z-1" />

            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                {/* Left Column - Form */}
                <div className="flex flex-col gap-10 items-center lg:items-start text-center lg:text-left">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-[2px] bg-gradient-accent" />
                        <span className="text-violet font-mono text-sm tracking-widest uppercase">// GET IN TOUCH</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-text-primary">
                        Let's <span className="text-cyan transition-colors duration-500 hover:text-gradient-accent">Build</span> Something Great.
                    </h2>

                    <div className="relative mt-10">
                        <AnimatePresence mode="wait">
                            {formStatus === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="p-16 rounded-3xl bg-surface border border-cyan/20 flex flex-col items-center justify-center text-center gap-6 shadow-glow-cyan"
                                >
                                    <CheckCircle className="text-cyan" size={80} />
                                    <h3 className="text-3xl font-serif font-bold text-text-primary">Message Sent Successfully!</h3>
                                    <p className="text-muted text-lg">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                                    <button
                                        onClick={() => setFormStatus("idle")}
                                        className="mt-6 px-10 py-3 rounded-full border border-cyan/30 text-cyan hover:bg-cyan/10 transition-colors uppercase tracking-widest font-mono text-sm"
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-8 w-full"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="flex flex-col gap-2 relative">
                                            <label className="text-xs font-mono text-muted uppercase tracking-wider mb-2">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="John Doe"
                                                className="p-6 rounded-2xl bg-surface border border-white/5 text-text-primary focus:border-violet focus:ring-1 focus:ring-violet transition-all outline-none"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-mono text-muted uppercase tracking-wider mb-2">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                placeholder="john@example.com"
                                                className="p-6 rounded-2xl bg-surface border border-white/5 text-text-primary focus:border-cyan focus:ring-1 focus:ring-cyan transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-mono text-muted uppercase tracking-wider mb-2">Your Message</label>
                                        <textarea
                                            required
                                            rows="6"
                                            placeholder="Tell us about your project..."
                                            className="p-10 rounded-3xl bg-surface border border-white/5 text-text-primary focus:border-violet focus:ring-1 focus:ring-violet transition-all outline-none resize-none"
                                        />
                                    </div>

                                    <MagneticButton>
                                        <button
                                            type="submit"
                                            disabled={formStatus === "loading"}
                                            className="w-full py-6 rounded-2xl bg-gradient-accent text-base font-bold uppercase tracking-[0.2em] shadow-glow flex items-center justify-center gap-4 group disabled:opacity-50"
                                        >
                                            {formStatus === "loading" ? (
                                                <div className="w-6 h-6 border-b-2 border-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Send Message <Send className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" size={20} />
                                                </>
                                            )}
                                        </button>
                                    </MagneticButton>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Column - Info */}
                <div className="flex flex-col gap-12 lg:pl-20">
                    <div className="flex flex-col gap-8">
                        <h3 className="text-3xl font-serif font-bold text-text-primary">Contact Details</h3>

                        <div className="flex flex-col gap-6 font-mono text-base md:text-lg text-muted items-center lg:items-start">
                            <a href="mailto:hello@novasoft.dev" className="flex items-center gap-6 hover:text-cyan transition-colors">
                                <div className="p-4 rounded-full bg-surface border border-white/5 text-cyan">
                                    <Mail size={24} />
                                </div>
                                hello@novasoft.dev
                            </a>
                            <a href="tel:+923150401307" className="flex items-center gap-6 hover:text-violet transition-colors">
                                <div className="p-4 rounded-full bg-surface border border-white/5 text-violet">
                                    <Phone size={24} />
                                </div>
                                +92 315 0401307
                            </a>
                            <div className="flex items-center gap-6">
                                <div className="p-4 rounded-full bg-surface border border-white/5 text-muted">
                                    <MapPin size={24} />
                                </div>
                                DHA Phase 8, Lahore
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 mt-10 items-center lg:items-start">
                        <h3 className="text-3xl font-serif font-bold text-text-primary">Social Links</h3>
                        <div className="flex gap-6">
                            <MagneticButton>
                                <a
                                    href="https://github.com/AhmadIqbal246"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 flex items-center justify-center rounded-full bg-surface border border-white/5 text-text-primary hover:text-cyan transition-all duration-300 shadow-lg"
                                >
                                    <Github size={24} />
                                </a>
                            </MagneticButton>
                            <MagneticButton>
                                <a
                                    href="https://www.linkedin.com/in/m-ahmad-iqbal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 flex items-center justify-center rounded-full bg-surface border border-white/5 text-text-primary hover:text-cyan transition-all duration-300 shadow-lg"
                                >
                                    <Linkedin size={24} />
                                </a>
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
