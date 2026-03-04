"use client";

export function useBigBang() {
    const hasPlayed = typeof window !== 'undefined'
        ? sessionStorage.getItem('bigbang_played')
        : true; // SSR — assume played to avoid flash

    return { hasPlayed: !!hasPlayed };
}
