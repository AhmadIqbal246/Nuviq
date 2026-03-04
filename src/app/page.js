"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

import Particles from "@/components/three/Particles";
const DynamicParticles = dynamic(() => Promise.resolve(Particles), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <main className="relative bg-[#080808] min-h-screen">
      {/* GLOBAL BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* CSS Gradient Mesh */}
        <div className="absolute inset-0">
          <div className="gradient-mesh-blob gradient-mesh-blob--violet opacity-20" />
          <div className="gradient-mesh-blob gradient-mesh-blob--cyan opacity-20" />
          <div className="gradient-mesh-blob gradient-mesh-blob--deep" />
        </div>

        {/* Particles */}
        {mounted && (
          <div className="absolute inset-0 w-full h-full opacity-60">
            <DynamicParticles
              particleColors={["#ffffff", "#6C63FF", "#00F2FF"]}
              particleCount={500}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover
              alphaParticles={false}
              disableRotation={false}
              pixelRatio={2}
            />
          </div>
        )}
      </div>

      <div className="relative z-10">
        <Navbar />
        <div className="flex flex-col gap-0">
          <Hero />
          <WhyChooseUs />
          <FAQ />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Testimonials />
          <Contact />
        </div>
        <Footer />
      </div>

      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan/5 blur-[150px] rounded-full pointer-events-none z-0" />
    </main>
  );
}
