"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useInView } from "framer-motion";

export default function ScrambleText({ text, className = "" }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const chars = "!<>-_\\/[]{}—=+*^?#________";

    useEffect(() => {
        if (inView && ref.current) {
            let iteration = 0;
            let interval = null;

            const originalText = text;

            interval = setInterval(() => {
                ref.current.innerText = originalText
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("");

                if (iteration >= originalText.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);

            return () => clearInterval(interval);
        }
    }, [inView, text]);

    return (
        <span ref={ref} className={className}>
            {text}
        </span>
    );
}
