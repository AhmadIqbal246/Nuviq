"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
import AnimatedCursor from "@/components/common/AnimatedCursor";
import ScrollProgressBar from "@/components/common/ScrollProgressBar";
import NoiseOverlay from "@/components/common/NoiseOverlay";

const BigBangIntro = dynamic(() => import("./BigBangIntro"), { ssr: false });

export default function ClientLayout({ children }) {
    const [introComplete, setIntroComplete] = useState(false);

    useEffect(() => {
        // Check if introduction already played to skip hidden state
        if (typeof window !== "undefined" && sessionStorage.getItem("bigbang_played")) {
            setIntroComplete(true);
        }
    }, []);

    return (
        <SmoothScrollProvider active={introComplete}>
            <ScrollProgressBar visible={introComplete} />
            <AnimatedCursor visible={introComplete} />
            <NoiseOverlay />
            <BigBangIntro onComplete={() => setIntroComplete(true)} />
            <div style={{ visibility: introComplete ? "visible" : "hidden" }}>
                {children}
            </div>
        </SmoothScrollProvider>
    );
}
