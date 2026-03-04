"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/components/common/SmoothScrollProvider";
import ScrollProgressBar from "@/components/common/ScrollProgressBar";
import NoiseOverlay from "@/components/common/NoiseOverlay";


export default function ClientLayout({ children }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <SmoothScrollProvider active={true}>
            <ScrollProgressBar visible={true} />
            <NoiseOverlay />
            <div style={{ visibility: mounted ? "visible" : "hidden" }}>
                {children}
            </div>
        </SmoothScrollProvider>
    );
}
