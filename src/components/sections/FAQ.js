"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const faqs = [
    {
        question: "What services does Z Soft offer?",
        answer: "Z Soft is a comprehensive IT services company specializing in web development, AI chatbots, RAG systems, and custom software solutions. We build Python and JavaScript applications, create intelligent AI systems, and provide 24/7 support and maintenance.",
    },
    {
        question: "How much do your services cost?",
        answer: "Our pricing varies based on project scope and requirements. We offer competitive rates for web development, AI solutions, and ongoing support. Contact us for a free quote tailored to your specific needs and budget.",
    },
    {
        question: "What technologies do you specialize in?",
        answer: "We specialize in Python and JavaScript development, including frameworks like React, Node.js, Django, and Flask. We also excel in AI technologies, building chatbots, RAG systems, and machine learning solutions for businesses.",
    },
    {
        question: "How secure are your solutions?",
        answer: "Security is our top priority. We implement enterprise-grade security measures including end-to-end encryption, secure authentication, and compliance with industry standards. All our solutions are built with security best practices from the ground up.",
    },
    {
        question: "Can you integrate with our existing systems?",
        answer: "Absolutely! We specialize in creating custom integrations with existing business systems, databases, and third-party APIs. Our solutions are designed to work seamlessly with your current infrastructure and workflows.",
    },
    {
        question: "What kind of support do you provide?",
        answer: "We offer 24/7 technical support through multiple channels including phone, email, and live chat. Our support team includes experienced developers and system administrators who understand your technical infrastructure.",
    },
    {
        question: "How long does a typical project take?",
        answer: "Project timelines vary based on complexity and scope. Simple web applications typically take 4-8 weeks, while complex AI systems may take 3-6 months. We provide detailed timelines during the initial consultation and keep you updated throughout development.",
    },
    {
        question: "Do you provide ongoing maintenance?",
        answer: "Yes! We offer comprehensive maintenance packages including regular updates, security patches, performance monitoring, and technical support. We ensure your systems remain secure, up-to-date, and running optimally.",
    },
];

function FAQItem({ faq, index, isOpen, onToggle }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <div
                className={`border border-white/5 rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "bg-surface border-violet/20 shadow-[0_0_20px_rgba(108,99,255,0.08)]" : "bg-surface/50 hover:bg-surface hover:border-white/10"
                    }`}
            >
                <button
                    onClick={onToggle}
                    className="w-full flex items-center justify-between p-6 md:p-7 text-left gap-4 cursor-pointer"
                >
                    <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${isOpen ? "text-white" : "text-white/80"}`}>
                        {faq.question}
                    </span>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`flex-shrink-0 p-1 rounded-full transition-colors duration-300 ${isOpen ? "text-cyan" : "text-white/40"}`}
                    >
                        <ChevronDown size={20} />
                    </motion.div>
                </button>

                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="px-6 md:px-7 pb-6 md:pb-7">
                                <div className="w-full h-[1px] bg-white/5 mb-5" />
                                <p style={{ color: "#b0b0b0" }} className="text-sm md:text-base leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section id="faq" className="py-10 lg:py-32 bg-transparent overflow-hidden relative">
            {/* Background glows */}
            <div className="absolute top-[20%] right-[-15%] w-[500px] h-[500px] bg-violet/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-cyan/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="flex flex-col gap-6 mb-20 items-center justify-center text-center">
                    <FadeIn direction="down" delay={0.2} distance={20}>
                        <span className="text-violet font-mono text-sm tracking-widest uppercase">
                            FAQ
                        </span>
                    </FadeIn>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-text-primary leading-tight">
                        Got questions?<br />
                        <span className="gradient-text-animated">We've got answers</span>.
                    </h2>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            index={index}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
