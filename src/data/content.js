/**
 * Centralized content data for the NovaSoft company website.
 * Keep large text arrays, project details, and experience entries here to keep components clean.
 */

export const experiences = [
    {
        company: "Rep Cloud",
        role: "Full-Stack FSM Platform",
        date: "2024 - 2025",
        desc: "Developed a comprehensive multi-tenant Field Service Management system. Engineered complex workflows for automated invoicing, real-time scheduling, and QuickBooks integration, reducing operational overhead by 50%.",
    },
    {
        company: "Safe-Bill",
        role: "Fintech Escrow System",
        date: "2024 - 2025",
        desc: "Built a secure milestone-based payment platform with Stripe Connect. Implemented a RAG-powered AI assistant and project tracking dashboard, ensuring 100% transparent and secured transactions.",
    },
    {
        company: "TTINCNC",
        role: "Enterprise POS System",
        date: "2024",
        desc: "Delivered an advanced Point of Sale system with real-time inventory tracking, staff management, and ticketing, streamlining daily operations for a large-scale enterprise.",
    },
];

export const projects = [
    {
        id: 1,
        slug: "rep-cloud",
        title: "Rep Cloud",
        image: "/Rep-Cloud/Screenshot 2026-03-05 200458.png",
        category: "fullstack",
        tags: ["Django", "Next.js", "PostgreSQL", "Redis", "Docker", "Celery", "AWS S3", "Tailwind CSS"],
        github: "#",
        live: "https://repcloud.net/",
        client: "AEC Construction",
        description: "Rep Cloud is a comprehensive, enterprise-grade Field Service Management (FSM) platform designed to streamline operations for service-based businesses through a robust multi-tenant architecture.",
        features: [
            "Full-Stack Architecture: Built with a high-performance Django 5.2 REST API backend and a modern, responsive Next.js 16 frontend.",
            "Scalable Infrastructure: Utilizes PostgreSQL for relational data, Redis for caching, and Docker for seamless containerized deployment.",
            "Advanced Task Management: Integrated Celery and Celery Beat for handling complex asynchronous tasks and automated background scheduling.",
            "Financial Suite: Features a complete finance module including automated invoicing, expense tracking, and QuickBooks integration.",
            "CRM & Scheduling: Includes a centralized customer relationship management system and an intelligent scheduling engine for field technicians.",
            "Quote-to-Cash Workflow: End-to-end management of the service lifecycle, from generating professional PDF quotes to final payment processing.",
            "Enterprise Security: Implements secure JWT (JSON Web Token) authentication and granular role-based access control (RBAC).",
            "Cloud-Ready Storage: Supports dynamic switching between local filesystem and AWS S3 for scalable media and document storage.",
            "Modern UI/UX: Frontend powered by Tailwind CSS, Framer Motion for smooth animations, and TanStack Query for efficient state management.",
            "Data Analytics: Integrated reporting tools using Recharts to provide actionable business insights and performance metrics."
        ],
        images: [
            "/Rep-Cloud/Screenshot 2026-03-05 200458.png",
            "/Rep-Cloud/Screenshot 2026-03-05 201219.png",
            "/Rep-Cloud/Screenshot 2026-03-05 200900.png",
            "/Rep-Cloud/Screenshot 2026-03-05 200918.png",
            "/Rep-Cloud/Screenshot 2026-03-05 200627.png",
            "/Rep-Cloud/Screenshot 2026-03-05 200730.png",
            "/Rep-Cloud/Screenshot 2026-03-05 200834.png",
            "/Rep-Cloud/Screenshot 2026-03-05 200900.png",
            "/Rep-Cloud/Screenshot 2026-03-05 200918.png",

        ]
    },
    {
        id: 2,
        slug: "safe-bill",
        title: "Safe-Bill",
        image: "/Safe-Bill/Screenshot 2026-03-05 195522.png",
        category: "fullstack",
        tags: ["React", "Django", "Stripe", "AI", "Pinecone", "Redis", "Celery", "HubSpot", "Tailwind CSS"],
        github: "#",
        live: "https://safebill.fr/",
        client: "Fintech Startup",
        description: "Safe-Bill is a robust, full-stack Fintech platform built with Django (REST Framework) and React (Vite), designed to secure transactions between service providers and clients through a milestone-based payment system.",
        features: [
            "Integrated Stripe Connect to handle complex payment flows, including automated payouts, platform fees, and secure escrow-like fund management.",
            "Developed a sophisticated Milestone Management System that allows projects to be broken down into deliverables, ensuring payments are only released upon client approval.",
            "Built a cutting-edge RAG (Retrieval-Augmented Generation) AI Assistant using Google Gemini 2.0 Flash and Pinecone vector database to provide instant, context-aware support to users.",
            "Implemented a Multi-turn Conversation Engine with Redis caching for fast, history-aware AI interactions and query enrichment.",
            "Developed a comprehensive Dispute Resolution Module with automated ticket synchronization to HubSpot CRM for efficient administrative oversight.",
            "Engineered a secure Project Invitation Flow with time-sensitive tokens, allowing seamless onboarding for external clients.",
            "Built a dual-dashboard architecture (Buyer/Seller) providing real-time tracking of project status, financial receipts, and interactive Quote-to-Project transitions.",
            "Integrated Celery and Redis for background task processing, handling high-volume email notifications and CRM synchronizations.",
            "Leveraged Tailwind CSS and Lucide React to create a modern, responsive, and intuitive user interface with support for internationalization (i18next).",
            "Implemented GDPR-compliant data handling with dedicated cookie preference management and secure JWT-based authentication.",
            "Developed automated PDF Generation for invoices and receipts using jspdf and html2canvas to provide professional documentation for all transactions."
        ],
        images: [
            "/Safe-Bill/Screenshot 2026-03-05 195441.png",
            "/Safe-Bill/Screenshot 2026-03-05 195522.png",
            "/Safe-Bill/Screenshot 2026-03-05 195627.png",
            "/Safe-Bill/Screenshot 2026-03-05 195649.png",
            "/Safe-Bill/Screenshot 2026-03-05 195706.png",
            "/Safe-Bill/Screenshot 2026-03-05 195732.png",
            "/Safe-Bill/Screenshot 2026-03-05 195803.png",
            "/Safe-Bill/Screenshot 2026-03-05 195822.png"
        ]
    }
];
