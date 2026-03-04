"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';

export default function SmoothScrollProvider({ children, active = true }) {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;
        if (active) {
            lenis.start();
        } else {
            lenis.stop();
        }
    }, [lenis, active]);

    const options = {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
    };

    return (
        <ReactLenis root options={options}>
            {children}
        </ReactLenis>
    );
}
