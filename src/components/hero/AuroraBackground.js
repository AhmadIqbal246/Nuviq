"use client";

import React from "react";

export default function AuroraBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            {/* Blob 1 — Violet, top-left drift */}
            <div className="aurora-blob aurora-blob-1" />
            {/* Blob 2 — Cyan, center-right drift */}
            <div className="aurora-blob aurora-blob-2" />
            {/* Blob 3 — Deep violet, bottom drift */}
            <div className="aurora-blob aurora-blob-3" />
            {/* Blob 4 — Cyan accent, top-right */}
            <div className="aurora-blob aurora-blob-4" />
        </div>
    );
}
