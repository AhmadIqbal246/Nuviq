"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Users,
    Award,
    Zap,
    Shield,
    Linkedin,
    ArrowRight,
    Mail,
    ExternalLink,
    CheckCircle2
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animations/FadeIn";
import MagneticButton from "@/components/animations/MagneticButton";
import Image from "next/image";

const teamStats = [
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
        icon: <Zap size={24} />,
        number: "100+",
        label: "Projects Completed",
        color: "text-violet"
    },
    {
        icon: <Shield size={24} />,
        number: "24/7",
        label: "Support Available",
        color: "text-cyan"
    }
];

const leadership = [
    {
        id: "leadership-2",
        name: "M. Ahmad Iqbal",
        role: "CEO & Founder",
        linkedin: "https://www.linkedin.com/in/m-ahmad-iqbal",
        image: "/OurTeam/Ahmad linked in.png"
    },
    {
        id: "leadership-1",
        name: "Zain Ul Abideen",
        role: "CTO & Technical Lead",
        linkedin: "https://www.linkedin.com/in/zain-ul-abideen-a80999286",
        image: "/OurTeam/zain linked in.jpg"
    },
    {
        id: "leadership-3",
        name: "Talha Khan",
        role: "Head of Operations",
        linkedin: "https://www.linkedin.com/in/talha-khan-82a248279",
        image: "/OurTeam/talha linked in.jpg"
    }
];

const developers = [
    {
        id: "dev-1",
        name: "Zaid Liaqat",
        role: "Senior Software Engineer",
        linkedin: "https://www.linkedin.com/in/zaid-liaqat-075b8b25b/",
        image: "/OurTeam/zaid linked in.png"
    },
    {
        id: "dev-4",
        name: "Irdam Rabeet",
        role: "Senior Frontend Developer",
        linkedin: "https://www.linkedin.com/in/irdam-rabeet-91b7a9279",
        image: "/OurTeam/irdam linked in.jpg"
    },
    {
        id: "dev-5",
        name: "Zara Ahmed",
        role: "UI/UX Designer",
        linkedin: "https://www.linkedin.com/in/zara-ahmed",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=533&fit=crop&crop=face"
    }
];

const teamValues = [
    {
        id: "value-1",
        icon: <Users size={32} />,
        title: "Collaboration",
        description: "We believe in the power of teamwork and collaboration to deliver exceptional results."
    },
    {
        id: "value-2",
        icon: <Award size={32} />,
        title: "Excellence",
        description: "We strive for excellence in everything we do, from code quality to client satisfaction."
    },
    {
        id: "value-3",
        icon: <Zap size={32} />,
        title: "Innovation",
        description: "We stay at the forefront of technology and continuously innovate our solutions."
    },
    {
        id: "value-4",
        icon: <Shield size={32} />,
        title: "Integrity",
        description: "We operate with honesty, transparency, and integrity in all our relationships."
    }
];

const TeamMemberCard = ({ member, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group relative"
    >
        <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-surface/50 border border-white/5 group-hover:border-violet/30 transition-all duration-700">
            {/* Image styling */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />

            {/* Fallback for local images during development if they don't exist yet */}
            <div className="absolute inset-0 bg-white/5 flex items-center justify-center text-white/5 font-serif text-8xl font-black">
                {member.name.charAt(0)}
            </div>

            <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 z-0"
                onError={(e) => { e.target.style.display = 'none'; }}
            />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="flex flex-col gap-3">
                    <span className="w-fit px-4 py-1.5 rounded-full bg-cyan/20 backdrop-blur-md border border-cyan/30 text-white font-mono text-[10px] uppercase tracking-[0.2em] mb-2 font-bold shadow-glow-sm">
                        {member.role}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-cyan transition-colors drop-shadow-xl">
                        {member.name}
                    </h3>
                </div>

                {/* Social links - Always visible with prominent colors */}
                <div className="flex gap-4 mt-6 opacity-100 transition-all duration-500">
                    <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-cyan text-black hover:bg-white hover:scale-110 transition-all shadow-glow flex items-center justify-center"
                    >
                        <Linkedin size={20} fill="currentColor" />
                    </a>
                    <button className="p-3 rounded-xl bg-white/10 text-white hover:bg-violet hover:scale-110 transition-all border border-white/10 flex items-center justify-center">
                        <Mail size={20} />
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
);

export default function TeamPage() {
    return (
        <main className="bg-transparent scroll-smooth">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <FadeIn direction="down" delay={0.2}>
                        <span className="text-violet font-mono text-sm tracking-widest uppercase mb-6 block">OUR PEOPLE</span>
                    </FadeIn>
                    <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight">
                        The Minds Behind <br />
                        <span className="gradient-text-animated">Z Soft</span>
                    </h1>
                    <p className="text-muted text-xl max-w-3xl mx-auto leading-relaxed mb-12">
                        Meet our exceptional team of engineers, designers, and visionaries dedicated to building the next generation of digital excellence.
                    </p>
                </div>
            </section>

            {/* TEAM STATS */}
            <section className="py-20 bg-surface/20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamStats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 rounded-[2rem] bg-surface/50 border border-white/5 flex flex-col items-center text-center gap-4 hover:border-violet/20 transition-all duration-500 group"
                            >
                                <div className={`${stat.color} p-5 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform duration-500`}>
                                    {stat.icon}
                                </div>
                                <div className="text-5xl font-serif font-bold text-white mb-1 group-hover:text-gradient-animated">{stat.number}</div>
                                <div className="text-muted text-xs font-mono uppercase tracking-[0.2em]">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LEADERSHIP SECTION */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col items-center mb-20 text-center">
                        <FadeIn direction="down">
                            <span className="text-cyan font-mono text-xs tracking-widest uppercase mb-4 block">VISIONARIES</span>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Our Leadership</h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto">
                                Guided by industry veterans with a combined passion for technological innovation and strategic growth.
                            </p>
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {leadership.map((member, i) => (
                            <TeamMemberCard key={member.id} member={member} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* DEVELOPERS SECTION */}
            <section className="py-32 bg-base/30">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col items-center mb-20 text-center">
                        <FadeIn direction="down">
                            <span className="text-violet font-mono text-xs tracking-widest uppercase mb-4 block">THE ARCHITECTS</span>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Core Engineering</h2>
                            <p className="text-muted text-lg max-w-2xl mx-auto">
                                Our highly skilled developers and designers who turn complex challenges into elegant digital realities.
                            </p>
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {developers.map((member, i) => (
                            <TeamMemberCard key={member.id} member={member} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* TEAM VALUES */}
            <section className="py-32">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {teamValues.map((value, i) => (
                            <FadeIn key={value.id} direction="up" delay={i * 0.1}>
                                <div className="h-full p-10 rounded-3xl bg-surface/50 border border-white/5 hover:border-cyan/20 transition-all duration-500 flex flex-col gap-6 group">
                                    <div className="text-cyan group-hover:scale-110 transition-transform duration-500">
                                        {value.icon}
                                    </div>
                                    <h4 className="text-xl font-bold text-white group-hover:text-cyan transition-colors">{value.title}</h4>
                                    <p className="text-muted text-sm leading-relaxed">{value.description}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* JOIN THE TEAM CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="p-16 lg:p-24 rounded-[3.5rem] bg-gradient-to-br from-[#0a0a0a] to-[#151515] border border-white/5 relative overflow-hidden text-center shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-violet/10 via-transparent to-cyan/10 pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
                                Want to <span className="text-violet">join</span> the team?
                            </h2>
                            <p className="text-muted text-xl max-w-2xl mx-auto mb-12">
                                We&apos;re always looking for talented individuals who are passionate about pushing the boundaries of technology.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <MagneticButton>
                                    <a href="mailto:careers@Z Soft.dev" className="group flex items-center gap-4 py-6 px-12 bg-gradient-accent text-white font-bold rounded-2xl shadow-glow transition-all duration-300">
                                        Check Open Positions
                                        <ExternalLink size={24} className="group-hover:rotate-12 transition-transform" />
                                    </a>
                                </MagneticButton>
                                <a href="https://www.linkedin.com/company/Z Soft" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan transition-colors font-mono tracking-widest uppercase text-sm">
                                    Follow us on LinkedIn
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
