"use client";

import React from "react";
import { motion } from "framer-motion";
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
    ArrowRight
} from "lucide-react";
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
        description: "NovaSoft was established with a vision to transform businesses through innovative technology solutions.",
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
        title: "TTINCNC Point of Sale System",
        category: "Web Development",
        description: "Comprehensive POS system with ticketing, inventory, employee management, and customer/vendor management.",
        results: [
            "Streamlined daily operations across all business activities",
            "Complete visibility and control over business processes"
        ],
        testimonial: {
            text: "NovaSoft delivered an exceptional POS system that transformed our business operations. The comprehensive features and attention to detail exceeded our expectations.",
            author: "Torsten Liebich"
        },
        tags: ["Django", "React", "RAG bots", "Next.js"],
        shortName: "T",
        client: "TTINCNC"
    },
    {
        title: "GuardianZE",
        category: "Web Development",
        description: "A modern showcase and booking website for an Australian IT services company.",
        results: [
            "Reduced manual booking workload through automated scheduling",
            "Increased customer engagement with a modern digital presence"
        ],
        testimonial: {
            text: "NovaSoft built our entire company website and service booking system exactly the way we envisioned it. The professionalism delivered far more value than expected.",
            author: "M Mansur Nasim"
        },
        tags: ["React", "Next.js", "AI Integration", "TailwindCSS"],
        shortName: "G",
        client: "GuardianZE Pty Ltd"
    },
    {
        title: "Orvantae X",
        category: "Product Development",
        description: "Secure, workflow-driven internal document management platform with evidence-bound AI.",
        results: [
            "Reduced document chaos by enforcing clear lifecycle and ownership",
            "Improved trust in internal knowledge by eliminating AI hallucinations"
        ],
        tags: ["RAG bots", "Next.js", "Django", "Vector DB"],
        shortName: "O",
        client: "SaaS Product"
    }
];

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
                        NovaSoft is a leading IT services company dedicated to transforming businesses through innovative web development, AI solutions, and custom software. We believe technology should empower growth and drive success.
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
            <section className="py-32 bg-surface/20">
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
                            <a href="/projects" className="group flex items-center gap-3 text-cyan font-bold uppercase tracking-widest text-sm hover:text-white transition-all">
                                View All Case Studies <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </a>
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
                                    <div className="flex flex-col gap-2">
                                        <span className="text-violet font-mono text-xs uppercase tracking-[0.2em]">{project.category}</span>
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

                                {/* Visual Element / Mockup Card */}
                                <div className="lg:col-span-5 flex items-center justify-center">
                                    <div className="w-full aspect-video rounded-3xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10 shadow-2xl overflow-hidden flex flex-col items-center justify-center gap-6 relative group-hover:scale-105 transition-transform duration-700">
                                        <div className="text-6xl md:text-8xl font-serif font-black text-white/10">{project.shortName}</div>
                                        <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
                                            <div className="text-xs text-cyan font-mono uppercase tracking-widest mb-1">CLIENT</div>
                                            <div className="text-xl font-bold text-white font-serif">{project.client}</div>
                                        </div>
                                    </div>
                                </div>
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
                            <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8">
                                Ready to Transform <br />
                                Your <span className="text-cyan">Business</span>?
                            </h2>
                            <p className="text-muted text-xl max-w-2xl mx-auto mb-12">
                                Let&apos;s discuss how our technology solutions can help your business grow and succeed in the digital age.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <MagneticButton>
                                    <a href="/#contact" className="group flex items-center gap-4 py-6 px-12 bg-gradient-accent text-white font-bold rounded-2xl shadow-glow transition-all duration-300">
                                        Get Free Quote
                                        <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                                    </a>
                                </MagneticButton>
                                <a href="mailto:hello@novasoft.dev" className="text-white hover:text-cyan transition-colors font-mono tracking-widest uppercase text-sm">
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
