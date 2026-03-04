"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Globe, ShieldCheck, Headphones } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const features = [
    {
        icon: <Bot size={32} />,
        title: "AI Chatbots & RAG Systems",
        description:
            "Intelligent conversational AI and Retrieval-Augmented Generation systems that enhance customer engagement and automate complex business processes.",
        color: "cyan",
        gradient: "from-cyan/20 to-transparent",
        borderHover: "hover:border-cyan/30",
        iconBg: "bg-cyan/10",
        iconColor: "text-cyan",
    },
    {
        icon: <Globe size={32} />,
        title: "Web Development Excellence",
        description:
            "Custom web applications built with Python and JavaScript. From responsive frontends to robust backends, we create scalable solutions that drive business growth.",
        color: "violet",
        gradient: "from-violet/20 to-transparent",
        borderHover: "hover:border-violet/30",
        iconBg: "bg-violet/10",
        iconColor: "text-violet",
    },
    {
        icon: <ShieldCheck size={32} />,
        title: "Enterprise Security & Compliance",
        description:
            "Bank-grade security with end-to-end encryption, role-based access control, and full compliance with industry standards and regulations.",
        color: "cyan",
        gradient: "from-cyan/20 to-transparent",
        borderHover: "hover:border-cyan/30",
        iconBg: "bg-cyan/10",
        iconColor: "text-cyan",
    },
    {
        icon: <Headphones size={32} />,
        title: "24/7 Support & Maintenance",
        description:
            "Round-the-clock technical support, regular maintenance, and continuous monitoring to ensure your systems run smoothly and efficiently.",
        color: "violet",
        gradient: "from-violet/20 to-transparent",
        borderHover: "hover:border-violet/30",
        iconBg: "bg-violet/10",
        iconColor: "text-violet",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

export default function WhyChooseUs() {
    return (
        <section id="why-us" className="py-32 bg-transparent overflow-hidden relative">
            {/* Decorative background glow */}
            <div className="absolute top-[30%] left-[-15%] w-[500px] h-[500px] bg-violet/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-cyan/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="flex flex-col gap-6 mb-20 items-center justify-center text-center">
                    <FadeIn direction="down" delay={0.2} distance={20}>
                        <span className="text-violet font-mono text-sm tracking-widest uppercase">
                            WHY CHOOSE US
                        </span>
                    </FadeIn>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-text-primary">
                        Why Businesses Trust{" "}
                        <span className="gradient-text-animated">NovaSoft</span>.
                    </h2>
                    <p className="text-muted text-lg max-w-2xl">
                        We combine cutting-edge technology with deep industry expertise to deliver solutions that truly transform your business.
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={cardVariants}
                            className={`group relative p-8 md:p-10 rounded-2xl bg-surface border border-white/5 ${feature.borderHover} transition-all duration-300 ease-out overflow-hidden hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]`}
                        >
                            {/* Hover gradient overlay */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                            />

                            {/* Content */}
                            <div className="relative z-10 flex flex-col gap-5">
                                {/* Icon */}
                                <div
                                    className={`w-14 h-14 rounded-xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                                >
                                    {feature.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl md:text-2xl font-serif font-bold text-text-primary group-hover:text-white transition-colors duration-300">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm md:text-base leading-relaxed" style={{ color: '#b0b0b0' }}>
                                    {feature.description}
                                </p>

                                {/* Bottom accent line */}
                                <div
                                    className={`w-0 h-[2px] bg-gradient-accent group-hover:w-full transition-all duration-700 rounded-full mt-2`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
