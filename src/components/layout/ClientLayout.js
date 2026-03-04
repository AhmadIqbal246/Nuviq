"use client";

import React, { useState, useEffect } from "react";
import ScrollProgressBar from "@/components/common/ScrollProgressBar";
import NoiseOverlay from "@/components/common/NoiseOverlay";


export default function ClientLayout({ children }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <>
            <ScrollProgressBar visible={true} />
            <NoiseOverlay />
            <div style={{ visibility: mounted ? "visible" : "hidden" }}>
                {children}
            </div>
        </>
    );
}
