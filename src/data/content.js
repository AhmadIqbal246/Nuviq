/**
 * Centralized content data for the portfolio.
 * Keep large text arrays, project details, and experience entries here to keep components clean.
 */

export const experiences = [
    {
        company: "Future Tech Solutions",
        role: "Senior Frontend Engineer",
        date: "2022 - Present",
        desc: "Led the development of complex React-based dashboards and design systems. Optimized performance by 40% using advanced caching and code splitting.",
    },
    {
        company: "Creative Vision Agency",
        role: "UI/UX Designer & Developer",
        date: "2020 - 2022",
        desc: "Designed and implemented interactive landing pages and e-commerce platforms. Specialized in high-end Framer Motion and GSAP animations.",
    },
    {
        company: "Start-up Innovation Hub",
        role: "Frontend Developer",
        date: "2018 - 2020",
        desc: "Collaborated on various MVPs for tech startups. Built responsive web applications using Vue and Next.js.",
    },
];

export const projects = [
    {
        id: 1,
        title: "E-Commerce Experience",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1974&auto=format&fit=crop",
        category: "frontend",
        tags: ["React", "Custom Hook", "Redux"],
        github: "https://github.com",
        live: "https://live.com",
    },
    {
        id: 2,
        title: "Creative Portfolio Design",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        category: "fullstack",
        tags: ["Next.js", "Framer Motion", "GSAP"],
        github: "https://github.com",
        live: "https://live.com",
    },
    {
        id: 3,
        title: "Real-time Dashboard",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        category: "backend",
        tags: ["Node.js", "Socket.io", "MongoDB"],
        github: "https://github.com",
        live: "https://live.com",
    },
];
