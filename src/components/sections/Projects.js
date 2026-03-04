"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const navLinks = [
    { name: "Frontend", href: "#frontend" },
    { name: "Backend", href: "#backend" },
    { name: "Fullstack", href: "#fullstack" },
];

import { projects } from "@/data/content";

export default function Projects() {
    const [filter, setFilter] = useState("all");

    const filteredProjects = projects.filter(prj =>
        filter === "all" || prj.category === filter
    );

    return (
        <section id="projects" className="py-32 bg-base">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col gap-6 mb-20">
                    <FadeIn direction="down" delay={0.2} distance={20}>
                        <span className="text-violet font-mono text-sm tracking-widest uppercase">// FEATURED WORK</span>
                    </FadeIn>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-text-primary">
                            Portfolio of <br /> <span className="text-violet">Selective</span> Projects.
                        </h2>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-4 bg-surface p-1 rounded-full border border-white/5">
                            {["all", "frontend", "fullstack", "backend"].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${filter === cat ? "bg-gradient-accent text-base" : "text-muted hover:text-text-primary"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="group relative h-[500px] rounded-2xl overflow-hidden border border-white/5 bg-surface"
        >
            {/* Background Image */}
            <motion.img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-500" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col gap-4 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-cyan border border-white/10 uppercase tracking-widest">
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-2xl font-serif font-bold text-text-primary">
                    {project.title}
                </h3>

                <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                    <a href={project.live} target="_blank" className="flex items-center gap-2 text-violet hover:text-cyan transition-colors text-sm font-bold tracking-widest uppercase">
                        Live View <ArrowUpRight size={16} />
                    </a>
                    <a href={project.github} target="_blank" className="flex items-center gap-2 text-muted hover:text-text-primary transition-colors text-sm font-bold tracking-widest uppercase">
                        Source <Github size={16} />
                    </a>
                </div>
            </div>

            {/* Hover Light Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(108,99,255,0.15)_0%,transparent_70%)]"
                style={{ "--mouse-x": "50%", "--mouse-y": "50%" }} // Dynamic via JS if needed
            />
        </motion.div>
    );
}
