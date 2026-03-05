"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FAQ from "@/components/sections/FAQ";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-transparent">
      <Navbar />
      <div className="flex flex-col gap-0">
        <Hero />
        <WhyChooseUs />
        <FAQ />
        <Skills />
        <Projects />
        <Testimonials />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
