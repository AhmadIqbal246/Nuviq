"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Rocket,
    Heart,
    Clock,
    CheckCircle2,
    Lightbulb,
    TrendingUp,
    ShieldCheck,
    ExternalLink,
    ArrowRight,
    Globe
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animations/FadeIn";
import MagneticButton from "@/components/animations/MagneticButton";

const stats = [
    { label: "Happy Clients", value: "50+", icon: <Users size={24} />, color: "text-cyan" },
    { label: "Projects Delivered", value: "100+", icon: <Rocket size={24} />, color: "text-violet" },
    { label: "Client Satisfaction", value: "5.0/5", icon: <Heart size={24} />, color: "text-cyan" },
    { label: "Support Available", value: "24/7", icon: <Clock size={24} />, color: "text-violet" },
];

const values = [
    {
        title: "Excellence",
        description: "We strive for excellence in every project, delivering solutions that exceed expectations and drive real business value.",
        icon: <TrendingUp size={32} />,
    },
    {
        title: "Collaboration",
        description: "We believe in the power of collaboration, working closely with our clients to understand their unique needs and goals.",
        icon: <Users size={32} />,
    },
    {
        title: "Innovation",
        description: "We stay at the forefront of technology, leveraging cutting-edge tools and methodologies to create innovative solutions.",
        icon: <Lightbulb size={32} />,
    },
    {
        title: "Reliability",
        description: "We build reliable, scalable systems that businesses can depend on for their critical operations and growth.",
        icon: <ShieldCheck size={32} />,
    },
];

const journey = [
    {
        year: "2024",
        title: "Company Founded",
        description: "Z Soft was established with a vision to transform businesses through innovative technology solutions.",
    },
    {
        year: "2024",
        title: "First Major Project",
        description: "Successfully delivered our first enterprise web application, establishing our reputation for quality and reliability.",
    },
    {
        year: "2025",
        title: "AI Solutions Launch",
        description: "Expanded our services to include AI chatbots and intelligent automation solutions for businesses.",
    },
];

const featuredProjects = [
    {
        title: "Rep Cloud",
        category: "Enterprise FSM Platform",
        description: "A comprehensive, enterprise-grade Field Service Management (FSM) platform designed to streamline operations for service-based businesses through a robust multi-tenant architecture.",
        results: [
            "Full-Stack Architecture built with Django 5.2 and Next.js 16",
            "Advanced Task Management with Celery for background processing",
            "Complete Financial Suite including automated invoicing and QuickBooks integration",
            "Enterprise-grade security with JWT authentication and granular RBAC"
        ],
        tags: ["Django", "Next.js", "PostgreSQL", "Redis", "Docker", "Celery", "AWS S3", "Tailwind CSS"],
        shortName: "RC",
        client: "AEC Construction",
        images: [
            "/Rep-Cloud/Screenshot 2026-03-05 200458.png",
            "/Rep-Cloud/Screenshot 2026-03-05 200627.png",
            "/Rep-Cloud/Screenshot 2026-03-05 200730.png",
            "/Rep-Cloud/Screenshot 2026-03-05 200834.png",
            "/Rep-Cloud/Screenshot 2026-03-05 200900.png",
            "/Rep-Cloud/Screenshot 2026-03-05 200918.png",
            "/Rep-Cloud/Screenshot 2026-03-05 201219.png"
        ],
        slug: "rep-cloud",
        live: "https://repcloud.net/"
    },
    {
        title: "Safe-Bill",
        category: "Fintech Platform",
        description: "A robust Fintech platform built with Django and React, designed to secure transactions between service providers and clients through a milestone-based payment system.",
        results: [
            "Integrated Stripe Connect for automated payouts and secure escrow-like management",
            "Cutting-edge RAG AI Assistant using Google Gemini 2.0 Flash and Pinecone",
            "Sophisticated Milestone Management for project deliverables",
            "Automated PDF Generation for professional invoices and receipts"
        ],
        tags: ["Django", "React", "Stripe", "Google Gemini", "Pinecone", "Redis", "Celery", "HubSpot"],
        shortName: "SB",
        client: "Fintech Startup",
        images: [
            "/Safe-Bill/Screenshot 2026-03-05 195441.png",
            "/Safe-Bill/Screenshot 2026-03-05 195522.png",
            "/Safe-Bill/Screenshot 2026-03-05 195627.png",
            "/Safe-Bill/Screenshot 2026-03-05 195649.png",
            "/Safe-Bill/Screenshot 2026-03-05 195706.png",
            "/Safe-Bill/Screenshot 2026-03-05 195732.png",
            "/Safe-Bill/Screenshot 2026-03-05 195803.png",
            "/Safe-Bill/Screenshot 2026-03-05 195822.png"
        ],
        slug: "safe-bill",
        live: "https://safebill.fr/"
    }
];

function ProjectCarousel({ images, title }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
                <motion.img
                    key={index}
                    src={images[index]}
                    alt={`${title} screenshot ${index + 1}`}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-full h-full object-contain"
                />
            </AnimatePresence>
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === index ? 'bg-cyan w-4' : 'bg-white/30'}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function AboutPage() {
    return (
        <main className="bg-transparent scroll-smooth">
            <Navbar />

            {/* HER0 SECTION */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <FadeIn direction="down" delay={0.2}>
                        <span className="text-violet font-mono text-sm tracking-widest uppercase mb-6 block">OUR STORY</span>
                    </FadeIn>
                    <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight">
                        We&apos;re Building the <br />
                        <span className="gradient-text-animated">Future of Technology</span>.
                    </h1>
                    <p className="text-muted text-xl max-w-3xl mx-auto leading-relaxed mb-12">
                        Z Soft is a leading IT services company dedicated to transforming businesses through innovative web development, AI solutions, and custom software. We believe technology should empower growth and drive success.
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mt-20">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-surface/30 backdrop-blur-xl border border-white/5 flex flex-col items-center gap-4"
                            >
                                <div className={`${stat.color} p-4 rounded-2xl bg-white/5`}>{stat.icon}</div>
                                <div className="text-4xl font-serif font-bold text-white">{stat.value}</div>
                                <div className="text-muted text-sm font-mono uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MISSION & VISION */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Mission */}
                        <FadeIn direction="left" delay={0.2}>
                            <div className="p-12 rounded-[2rem] bg-surface border border-white/5 h-full flex flex-col gap-8 hover:border-violet/20 transition-all duration-500">
                                <div className="w-16 h-16 rounded-2xl bg-violet/10 flex items-center justify-center text-violet">
                                    <Rocket size={32} />
                                </div>
                                <h2 className="text-4xl font-serif font-bold text-white">Our Mission</h2>
                                <p className="text-muted text-lg leading-relaxed">
                                    To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation. We believe every organization deserves access to world-class IT services that transform their digital presence.
                                </p>
                                <ul className="flex flex-col gap-4 mt-4">
                                    {["Deliver innovative solutions that exceed expectations", "Build long-term partnerships with our clients", "Stay ahead of technology trends and best practices"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-white/80">
                                            <CheckCircle2 size={18} className="text-violet" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>

                        {/* Vision */}
                        <FadeIn direction="right" delay={0.4}>
                            <div className="p-12 rounded-[2rem] bg-surface border border-white/5 h-full flex flex-col gap-8 hover:border-cyan/20 transition-all duration-500">
                                <div className="w-16 h-16 rounded-2xl bg-cyan/10 flex items-center justify-center text-cyan">
                                    <Lightbulb size={32} />
                                </div>
                                <h2 className="text-4xl font-serif font-bold text-white">Our Vision</h2>
                                <p className="text-muted text-lg leading-relaxed">
                                    To be the most trusted technology partner for businesses worldwide, known for delivering exceptional solutions that drive digital transformation and sustainable growth.
                                </p>
                                <ul className="flex flex-col gap-4 mt-4">
                                    {["Lead the industry in AI and web development innovation", "Create technology that makes a positive impact", "Build a team of world-class professionals"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-white/80">
                                            <CheckCircle2 size={18} className="text-cyan" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* CORE VALUES */}
            <section className="py-32 bg-base/50">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-20">
                        <FadeIn direction="down">
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Our Core Values</h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto">
                                The principles that guide everything we do and shape our relationships with clients and partners.
                            </p>
                        </FadeIn>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-10 rounded-3xl bg-surface border border-white/5 hover:border-white/20 transition-all duration-500"
                            >
                                <div className="mb-6 text-violet group-hover:scale-110 transition-transform duration-500">{value.icon}</div>
                                <h4 className="text-xl font-bold text-white mb-4">{value.title}</h4>
                                <p className="text-muted text-sm leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* JOURNEY */}
            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-20">
                        <FadeIn direction="down">
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Our Journey</h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto">
                                From humble beginnings to becoming a trusted technology partner for businesses worldwide.
                            </p>
                        </FadeIn>
                    </div>

                    <div className="max-w-4xl mx-auto relative px-6">
                        {/* Center Line */}
                        <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet/0 via-violet/50 to-cyan/0" />

                        <div className="flex flex-col gap-20">
                            {journey.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-full md:w-1/2 flex ${i % 2 === 0 ? 'justify-end text-right' : 'justify-start text-left'}`}>
                                        <div className="p-8 rounded-3xl bg-surface/50 border border-white/5 hover:border-white/10 transition-all">
                                            <span className="text-violet font-mono text-xl font-bold mb-2 block">{item.year}</span>
                                            <h4 className="text-xl font-serif font-bold text-white mb-3">{item.title}</h4>
                                            <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>

                                    {/* Circle Dot */}
                                    <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-surface border-4 border-violet shadow-glow z-10" />

                                    <div className="hidden md:block w-1/2" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR WORK - FEATURED PROJECTS */}
            <section id="featured-work" className="py-32 bg-surface/20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-end justify-between gap-10 mb-20">
                        <div className="max-w-2xl">
                            <FadeIn direction="right">
                                <span className="text-cyan font-mono text-sm tracking-widest uppercase mb-6 block">OUR WORK</span>
                                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Featured Projects</h2>
                                <p className="text-muted text-lg">
                                    Explore some of our most successful projects that showcase our expertise in web development, AI solutions, and custom software development.
                                </p>
                            </FadeIn>
                        </div>
                        <MagneticButton>
                            <Link href="/#projects" className="group flex items-center gap-3 text-cyan font-bold uppercase tracking-widest text-sm hover:text-white transition-all">
                                View All Case Studies <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </MagneticButton>
                    </div>

                    <div className="grid grid-cols-1 gap-12">
                        {featuredProjects.map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group p-8 lg:p-12 rounded-[2.5rem] bg-surface/50 border border-white/5 hover:border-white/10 transition-all duration-700 grid grid-cols-1 lg:grid-cols-12 gap-12 overflow-hidden relative"
                            >
                                {/* Background Highlight */}
                                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-violet/5 blur-[120px] rounded-full group-hover:bg-violet/10 transition-all duration-700" />

                                {/* Info */}
                                <div className="lg:col-span-7 flex flex-col gap-8">
                                    <div className="flex flex-col gap-2 relative z-30">
                                        <div className="flex items-center justify-between">
                                            <span className="text-violet font-mono text-xs uppercase tracking-[0.2em]">{project.category}</span>
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                className="flex items-center gap-2 text-cyan hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest"
                                            >
                                                Live Preview <Globe size={14} />
                                            </a>
                                        </div>
                                        <h3 className="text-3xl lg:text-5xl font-serif font-bold text-white">{project.title}</h3>
                                    </div>
                                    <p className="text-muted text-lg leading-relaxed">{project.description}</p>

                                    <div className="flex flex-wrap gap-3">
                                        {project.tags.map((tag, j) => (
                                            <span key={j} className="px-5 py-2 rounded-full bg-white/5 border border-white/5 text-xs text-white/50">{tag}</span>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                                        <div>
                                            <h5 className="text-white font-bold mb-4 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
                                                Key Results:
                                            </h5>
                                            <ul className="flex flex-col gap-3">
                                                {project.results.map((res, k) => (
                                                    <li key={k} className="text-muted text-sm flex items-start gap-2">
                                                        <CheckCircle2 size={16} className="text-cyan flex-shrink-0 mt-0.5" />
                                                        {res}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {project.testimonial && (
                                            <div className="p-6 rounded-2xl bg-white/5 italic relative">
                                                <p style={{ color: '#b0b0b0' }} className="text-xs leading-relaxed mb-4">
                                                    &ldquo;{project.testimonial.text}&rdquo;
                                                </p>
                                                <span className="text-violet text-xs font-bold font-mono">— {project.testimonial.author}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Visual Element / Carousel */}
                                <div className="lg:col-span-5 flex items-center justify-center">
                                    <div className="w-full aspect-video rounded-3xl bg-black border border-white/10 shadow-2xl overflow-hidden relative group-hover:scale-105 transition-all duration-700">
                                        <ProjectCarousel images={project.images} title={project.title} />
                                        <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 z-20">
                                            <div className="text-[10px] text-cyan font-mono uppercase tracking-[0.2em] mb-1">CLIENT</div>
                                            <div className="text-lg font-bold text-white font-serif">{project.client}</div>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="absolute inset-0 z-20"
                                    aria-label={`View ${project.title} Details`}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="p-16 lg:p-24 rounded-[3.5rem] bg-gradient-to-br from-[#0a0a0a] to-[#151515] border border-white/5 relative overflow-hidden text-center shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet/5 to-cyan/5 pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-7xl font-serif font-bold text-white mb-6 md:mb-8">
                                Ready to Transform <br className="hidden md:block" />
                                Your <span className="text-cyan">Business</span>?
                            </h2>
                            <p className="text-muted text-base md:text-xl max-w-2xl mx-auto mb-10 md:mb-12">
                                Let&apos;s discuss how our technology solutions can help your business grow and succeed in the digital age.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <MagneticButton>
                                    <Link href="/contact" className="group flex items-center justify-center gap-3 md:gap-4 py-5 md:py-6 px-8 md:px-12 bg-gradient-accent text-white font-bold rounded-2xl shadow-glow transition-all duration-300 w-full sm:w-auto">
                                        <span className="whitespace-nowrap">Get Free Quote</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </MagneticButton>
                                <a href="mailto:hello@zsofthub.com" className="text-white/70 hover:text-cyan transition-colors font-mono tracking-widest uppercase text-xs md:text-sm">
                                    hello@zsofthub.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
