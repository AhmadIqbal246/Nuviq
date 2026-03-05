"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Globe,
    Brain,
    Smartphone,
    ShoppingCart,
    Cloud,
    Users,
    Search,
    Palette,
    Code,
    Rocket,
    Zap,
    Award,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animations/FadeIn";
import MagneticButton from "@/components/animations/MagneticButton";

const services = [
    {
        id: "web-development",
        title: "Web Development",
        description: "Custom web applications built with modern technologies for optimal performance and user experience.",
        icon: <Globe size={32} />,
        features: [
            "Responsive Design",
            "Modern Frameworks",
            "Performance Optimization",
            "SEO Friendly",
            "Cross-browser Compatibility"
        ],
        technologies: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"],
        gradient: "from-violet/20 to-violet/5"
    },
    {
        id: "ai-solutions",
        title: "AI & Machine Learning",
        description: "Intelligent solutions powered by artificial intelligence to automate processes and enhance decision-making.",
        icon: <Brain size={32} />,
        features: [
            "Machine Learning Models",
            "Natural Language Processing",
            "Computer Vision",
            "Predictive Analytics",
            "AI Integration"
        ],
        technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI", "AWS AI"],
        gradient: "from-cyan/20 to-cyan/5"
    },
    {
        id: "mobile-development",
        title: "Mobile App Development",
        description: "Native and cross-platform mobile applications that deliver exceptional user experiences on all devices.",
        icon: <Smartphone size={32} />,
        features: [
            "iOS & Android Apps",
            "Cross-platform Solutions",
            "App Store Optimization",
            "Push Notifications",
            "Offline Capabilities"
        ],
        technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
        gradient: "from-violet/20 to-violet/5"
    },
    {
        id: "ecommerce",
        title: "E-commerce Solutions",
        description: "Complete online store solutions with payment integration, inventory management, and analytics.",
        icon: <ShoppingCart size={32} />,
        features: [
            "Payment Gateway Integration",
            "Inventory Management",
            "Order Processing",
            "Customer Dashboard",
            "Analytics & Reporting"
        ],
        technologies: ["Shopify", "WooCommerce", "Magento", "Stripe", "PayPal"],
        gradient: "from-cyan/20 to-cyan/5"
    },
    {
        id: "cloud-solutions",
        title: "Cloud & DevOps",
        description: "Scalable cloud infrastructure and deployment solutions for reliable and secure applications.",
        icon: <Cloud size={32} />,
        features: [
            "Cloud Migration",
            "Container Orchestration",
            "CI/CD Pipelines",
            "Monitoring & Logging",
            "Auto-scaling"
        ],
        technologies: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
        gradient: "from-violet/20 to-violet/5"
    },
    {
        id: "consulting",
        title: "Technical Consulting",
        description: "Expert guidance on technology strategy, architecture decisions, and digital transformation initiatives.",
        icon: <Users size={32} />,
        features: [
            "Technology Strategy",
            "Architecture Review",
            "Code Audits",
            "Performance Optimization",
            "Team Training"
        ],
        technologies: ["Architecture", "Best Practices", "Code Review", "Mentoring", "Strategy"],
        gradient: "from-cyan/20 to-cyan/5"
    }
];

const serviceStats = [
    {
        icon: <Users size={24} />,
        number: "15+",
        label: "Team Members",
        color: "text-violet"
    },
    {
        icon: <Award size={24} />,
        number: "50+",
        label: "Years Combined Experience",
        color: "text-cyan"
    },
    {
        icon: <Code size={24} />,
        number: "100+",
        label: "Projects Completed",
        color: "text-violet"
    },
    {
        icon: <Zap size={24} />,
        number: "24/7",
        label: "Support Available",
        color: "text-cyan"
    }
];

const serviceProcess = [
    {
        step: "1",
        icon: <Search size={32} />,
        title: "Discovery",
        description: "We analyze your requirements and understand your business goals to create the perfect solution."
    },
    {
        step: "2",
        icon: <Palette size={32} />,
        title: "Design",
        description: "Our team creates beautiful, user-friendly designs that align with your brand and vision."
    },
    {
        step: "3",
        icon: <Code size={32} />,
        title: "Development",
        description: "We build your solution using cutting-edge technologies and best development practices."
    },
    {
        step: "4",
        icon: <Rocket size={32} />,
        title: "Launch",
        description: "We deploy your solution and provide ongoing support to ensure everything runs smoothly."
    }
];

export default function ServicesPage() {
    return (
        <main className="bg-transparent scroll-smooth">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <FadeIn direction="down" delay={0.2}>
                        <span className="text-cyan font-mono text-sm tracking-widest uppercase mb-6 block">EXPERTISE</span>
                    </FadeIn>
                    <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight">
                        Our <span className="gradient-text-animated">Services</span>
                    </h1>
                    <p className="text-muted text-xl max-w-3xl mx-auto leading-relaxed mb-12">
                        We provide comprehensive technology solutions tailored to your unique business needs, leveraging the latest innovations in AI, Cloud, and Web Development.
                    </p>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="py-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`group p-10 rounded-[2.5rem] bg-surface/50 backdrop-blur-xl border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col h-full relative overflow-hidden`}
                            >
                                {/* Background Glow */}
                                <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${service.gradient} blur-[80px] group-hover:scale-150 transition-transform duration-700`} />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-8 p-6 w-fit rounded-2xl bg-white/5 text-cyan group-hover:scale-110 transition-transform duration-500">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-cyan transition-colors">{service.title}</h3>
                                    <p className="text-muted text-sm leading-relaxed mb-8 flex-grow">
                                        {service.description}
                                    </p>

                                    <div className="flex flex-col gap-4 mb-8">
                                        <h4 className="text-xs font-mono uppercase tracking-widest text-white/40">Key Features</h4>
                                        <ul className="flex flex-col gap-2">
                                            {service.features.map((feature, j) => (
                                                <li key={j} className="flex items-center gap-3 text-sm text-muted">
                                                    <CheckCircle2 size={14} className="text-cyan" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {service.technologies.map((tech, j) => (
                                            <span key={j} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase font-mono tracking-wider text-white/60">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS SECTION */}
            <section className="py-32 relative overflow-hidden bg-surface/20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-24">
                        <FadeIn direction="down">
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Our Process</h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto">
                                A systematic approach to turning your vision into a high-performance digital reality.
                            </p>
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        <div className="hidden lg:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

                        {serviceProcess.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center relative z-10"
                            >
                                <div className="mb-10 w-24 h-24 rounded-full bg-surface border border-white/10 flex items-center justify-center text-cyan shadow-glow group hover:scale-110 transition-transform duration-500 relative bg-black">
                                    <div className="absolute -bottom-11 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold font-mono text-xs shadow-glow-sm z-20">
                                        {item.step}
                                    </div>
                                    <div className="relative z-10">{item.icon}</div>
                                </div>
                                <h4 className="text-xl font-serif font-bold text-white mb-4">{item.title}</h4>
                                <p className="text-muted text-sm leading-relaxed max-w-[200px]">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="py-32">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {serviceStats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-surface/30 backdrop-blur-xl border border-white/5 flex flex-col items-center gap-4 text-center group"
                            >
                                <div className={`${stat.color} p-4 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform`}>
                                    {stat.icon}
                                </div>
                                <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-1">{stat.number}</div>
                                <div className="text-muted text-xs font-mono uppercase tracking-[0.2em]">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="p-16 lg:p-24 rounded-[3.5rem] bg-gradient-to-br from-[#0a0a0a] to-[#151515] border border-white/5 relative overflow-hidden text-center">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet/5 to-cyan/5 pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8">
                                Have a project in <span className="text-cyan">mind</span>?
                            </h2>
                            <p className="text-muted text-xl max-w-2xl mx-auto mb-12">
                                Let&apos;s collaborate to build something extraordinary. Our team of experts is ready to help you navigate the future of technology.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <MagneticButton>
                                    <a href="/#contact" className="group flex items-center gap-4 py-6 px-12 bg-gradient-accent text-white font-bold rounded-2xl shadow-glow transition-all duration-300">
                                        Start Your Project
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
