"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    Users,
    CheckCircle2,
    ArrowRight,
    Github,
    Linkedin,
    Twitter
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animations/FadeIn";
import MagneticButton from "@/components/animations/MagneticButton";

const contactDetails = [
    {
        icon: <Mail className="text-cyan" size={24} />,
        label: "Email Us",
        value: "hello@zsofthub.com",
        description: "Our team typically responds within 2 hours.",
        href: "mailto:hello@zsofthub.com"
    },
    {
        icon: <Phone className="text-violet" size={24} />,
        label: "Call Us",
        value: "+923150401307",
        description: "Monday to Friday, 9am to 6pm EST.",
        href: "tel:+15550000000"
    },
    {
        icon: <MapPin className="text-cyan" size={24} />,
        label: "Visit Us",
        value: "DHA Phase 8, Lahore",
        href: "https://maps.google.com"
    }
];

const faqItems = [
    {
        question: "What is your typical project timeline?",
        answer: "Most medium-sized projects take between 4-8 weeks from discovery to launch. We provide detailed milestones after our first consultation."
    },
    {
        question: "Do you offer post-launch support?",
        answer: "Yes, we provide 24/7 maintenance and support packages to ensure your platform scales smoothly and remains updated."
    },
    {
        question: "How do you handle project payments?",
        answer: "We typically work with a 50% upfront deposit and 50% upon successful completion, but we also offer milestone-based payment plans for larger enterprise projects."
    }
];

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormState({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <main className="bg-transparent scroll-smooth min-h-screen">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(108,99,255,0.15)_0%,transparent_50%)] pointer-events-none" />

                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <FadeIn direction="down">
                            <span className="text-cyan font-mono text-sm tracking-[0.3em] uppercase mb-6 block">GET IN TOUCH</span>
                            <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight">
                                Let&apos;s Build the <br />
                                <span className="gradient-text-animated">Next Big Thing</span>.
                            </h1>
                            <p className="text-muted text-xl leading-relaxed">
                                Have a project in mind or just want to say hello? We&apos;d love to hear from you.
                                Our experts are ready to turn your vision into a digital masterpiece.
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* CONTACT CONTENT */}
            <section className="py-20 relative">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* LEFT SIDE: Info */}
                        <div className="lg:col-span-5 flex flex-col gap-12">
                            <FadeIn direction="right" delay={0.2}>
                                <div className="space-y-10">
                                    <h2 className="text-4xl font-serif font-bold text-white mb-4">Contact Information</h2>

                                    <div className="grid grid-cols-1 gap-8">
                                        {contactDetails.map((detail, i) => (
                                            <motion.a
                                                key={i}
                                                href={detail.href}
                                                whileHover={{ x: 10 }}
                                                className="group flex items-start gap-6 p-6 rounded-3xl bg-surface/30 border border-white/5 hover:border-violet/20 transition-all duration-500"
                                            >
                                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-gradient-accent transition-all duration-500">
                                                    {detail.icon}
                                                </div>
                                                <div>
                                                    <h4 className="text-muted text-xs font-mono uppercase tracking-widest mb-1">{detail.label}</h4>
                                                    <p className="text-white text-xl font-bold font-serif mb-1">{detail.value}</p>
                                                    <p className="text-white/40 text-sm">{detail.description}</p>
                                                </div>
                                            </motion.a>
                                        ))}
                                    </div>

                                    {/* Social Links */}
                                    <div className="pt-10 border-t border-white/5">
                                        <h4 className="text-muted text-xs font-mono uppercase tracking-widest mb-6 block">Follow Our Journey</h4>
                                        <div className="flex gap-4">
                                            {[
                                                { icon: <Github size={20} />, href: "#" },
                                                { icon: <Linkedin size={20} />, href: "#" },
                                                { icon: <Twitter size={20} />, href: "#" }
                                            ].map((social, i) => (
                                                <MagneticButton key={i}>
                                                    <a href={social.href} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-cyan hover:border-cyan/50 transition-all">
                                                        {social.icon}
                                                    </a>
                                                </MagneticButton>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        {/* RIGHT SIDE: Form */}
                        <div className="lg:col-span-7">
                            <FadeIn direction="left" delay={0.4}>
                                <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-surface border border-white/5 shadow-2xl overflow-hidden group">
                                    {/* Background Highlight */}
                                    <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-violet/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-violet/10 transition-all duration-700" />

                                    <div className="relative z-10">
                                        <div className="mb-10">
                                            <h3 className="text-3xl font-serif font-bold text-white mb-2">Send us a Message</h3>
                                            <p className="text-muted">Fill out the form below and we&apos;ll get back to you shortly.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[10px] font-mono text-muted uppercase tracking-widest ml-4">Full Name</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="John Doe"
                                                        className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan/50 focus:bg-white/10 transition-all"
                                                        value={formState.name}
                                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[10px] font-mono text-muted uppercase tracking-widest ml-4">Email Address</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        placeholder="john@example.com"
                                                        className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan/50 focus:bg-white/10 transition-all"
                                                        value={formState.email}
                                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-mono text-muted uppercase tracking-widest ml-4">Subject</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Project Inquiry"
                                                    className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan/50 focus:bg-white/10 transition-all"
                                                    value={formState.subject}
                                                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-mono text-muted uppercase tracking-widest ml-4">Message</label>
                                                <textarea
                                                    rows="5"
                                                    required
                                                    placeholder="Tell us about your project..."
                                                    className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan/50 focus:bg-white/10 transition-all resize-none"
                                                    value={formState.message}
                                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                                ></textarea>
                                            </div>

                                            <MagneticButton>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full sm:w-auto mt-4 py-5 px-10 bg-gradient-accent text-white font-bold rounded-2xl shadow-glow flex items-center justify-center gap-4 group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isSubmitting ? (
                                                        <>Processing... <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /></>
                                                    ) : isSuccess ? (
                                                        <>Message Sent! <CheckCircle2 size={24} /></>
                                                    ) : (
                                                        <>Send Message <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" /></>
                                                    )}
                                                </button>
                                            </MagneticButton>
                                        </form>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-32 border-t border-white/5 bg-base/50">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-20">
                        <FadeIn direction="down">
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Frequently Asked <span className="text-cyan">Questions</span></h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto">
                                Quick answers to common questions about our process, timelines, and services.
                            </p>
                        </FadeIn>
                    </div>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {faqItems.map((faq, i) => (
                            <FadeIn key={i} direction="up" delay={0.1 * i}>
                                <div className="p-8 rounded-3xl bg-surface border border-white/5 h-full hover:border-cyan/20 transition-all duration-500">
                                    <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan mb-6">
                                        <MessageSquare size={20} />
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-4">{faq.question}</h4>
                                    <p className="text-muted text-sm leading-relaxed">{faq.answer}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
