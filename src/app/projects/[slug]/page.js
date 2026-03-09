"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ExternalLink,
    Github,
    CheckCircle2,
    Calendar,
    User,
    Tag,
    Globe
} from "lucide-react";
import { projects } from "@/data/content";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animations/FadeIn";
import MagneticButton from "@/components/animations/MagneticButton";

export default function ProjectDetailPage() {
    const { slug } = useParams();
    const router = useRouter();

    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return (
            <main className="min-h-screen bg-base flex flex-col items-center justify-center text-center p-6">
                <h1 className="text-4xl font-serif font-bold text-white mb-4">Project Not Found</h1>
                <p className="text-muted mb-8">The project you are looking for does not exist.</p>
                <MagneticButton>
                    <button
                        onClick={() => router.push("/")}
                        className="py-4 px-8 bg-gradient-accent text-white font-bold rounded-2xl flex items-center gap-2"
                    >
                        <ArrowLeft size={20} /> Back to Home
                    </button>
                </MagneticButton>
            </main>
        );
    }

    return (
        <main className="bg-transparent scroll-smooth">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(108,99,255,0.15)_0%,transparent_50%)] pointer-events-none" />

                <div className="container mx-auto px-6 lg:px-12">
                    <FadeIn direction="up">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-muted hover:text-cyan transition-colors mb-8 font-mono text-sm tracking-widest uppercase"
                        >
                            <ArrowLeft size={16} /> Back to Projects
                        </button>
                    </FadeIn>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <FadeIn direction="right" delay={0.2}>
                                <span className="text-violet font-mono text-sm tracking-[0.3em] uppercase mb-4 block">Case Study</span>
                                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
                                    {project.title}
                                </h1>
                                <p className="text-muted text-xl leading-relaxed mb-10 max-w-xl">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-4 mb-12">
                                    {project.live !== "#" && (
                                        <MagneticButton>
                                            <a href={project.live} target="_blank" className="py-4 px-8 bg-gradient-accent text-white font-bold rounded-2xl flex items-center gap-2 shadow-glow">
                                                Live Preview <Globe size={20} />
                                            </a>
                                        </MagneticButton>
                                    )}
                                    {project.github !== "#" && (
                                        <MagneticButton>
                                            <a href={project.github} target="_blank" className="py-4 px-8 bg-white/5 border border-white/10 text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-white/10 transition-all">
                                                Source Code <Github size={20} />
                                            </a>
                                        </MagneticButton>
                                    )}
                                </div>

                                {/* Project Meta */}
                                <div className="grid grid-cols-1 gap-8 pt-10 border-t border-white/5">
                                    <div>
                                        <span className="text-xs font-mono text-muted uppercase tracking-widest block mb-2">Client</span>
                                        <span className="text-white font-serif font-bold text-lg">{project.client}</span>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        <FadeIn direction="left" delay={0.4}>
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative aspect-[4/3] rounded-3xl md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-black/40">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-contain p-2 md:p-8 transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* GALLERY SECTION (Visual Showcase) - NOW SECOND SECTION */}
            <section className="py-20 border-b border-white/5">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <FadeIn direction="down">
                            <span className="text-cyan font-mono text-xs tracking-[0.3em] uppercase mb-4 block">Visual Showcase</span>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Screenshots</h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto">
                                High-resolution snapshots of the platform interface and user experience.
                            </p>
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {project.images.map((img, i) => (
                            <FadeIn key={i} direction="up" delay={0.1 * i}>
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group shadow-2xl bg-black/40"
                                >
                                    <img
                                        src={img}
                                        alt={`${project.title} screen ${i + 1}`}
                                        className="w-full h-auto object-contain p-1 md:p-6 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                </motion.div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-32 bg-surface/30">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-4">
                            <FadeIn direction="right">
                                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Key Features & <br /> <span className="text-violet">Technologies</span></h2>
                                <p className="text-muted text-lg mb-8">
                                    A deep dive into the technical implementation and the powerful features that make {project.title} unique.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-cyan font-bold">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </FadeIn>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {project.features.map((feature, i) => (
                                    <FadeIn key={i} direction="up" delay={0.1 * i}>
                                        <div className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-violet/20 transition-all duration-500 h-full group">
                                            <div className="w-10 h-10 rounded-xl bg-violet/10 flex items-center justify-center text-violet mb-6 group-hover:scale-110 transition-transform">
                                                <CheckCircle2 size={24} />
                                            </div>
                                            <p className="text-white/80 leading-relaxed text-sm">
                                                {feature}
                                            </p>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEXT PROJECT CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="p-16 lg:p-24 rounded-[3.5rem] bg-gradient-to-br from-[#0a0a0a] to-[#151515] border border-white/5 relative overflow-hidden text-center shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet/5 to-cyan/5 pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-7xl font-serif font-bold text-white mb-6 md:mb-8">
                                Have a Similar <br className="hidden md:block" />
                                <span className="text-cyan">Project</span> in Mind?
                            </h2>
                            <p className="text-muted text-base md:text-xl max-w-2xl mx-auto mb-10 md:mb-12">
                                Let&apos;s build something extraordinary together. Our team is ready to bring your vision to life.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <MagneticButton>
                                    <button
                                        onClick={() => router.push("/contact")}
                                        className="group flex items-center justify-center gap-3 md:gap-4 py-5 md:py-6 px-8 md:px-12 bg-gradient-accent text-white font-bold rounded-2xl shadow-glow transition-all duration-300 w-full sm:w-auto"
                                    >
                                        <span className="whitespace-nowrap">Get a Free Quote</span>
                                        <ArrowLeft size={20} className="rotate-180 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </MagneticButton>
                                <a href="mailto:hello@novasoft.dev" className="text-white/70 hover:text-cyan transition-colors font-mono tracking-widest uppercase text-xs md:text-sm">
                                    hello@novasoft.dev
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
