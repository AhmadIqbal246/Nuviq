"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

export function useOrbState() {
    const [state, setState] = useState('idle');
    const stateRef = useRef('idle');

    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    // Master Logic: Transform once and stay as Chatbot forever
    useEffect(() => {
        let timeout;

        // If we are in an orb state, plan the ONE AND ONLY transformation to chatbot
        if (state !== 'exploded' && state !== 'reforming') {
            timeout = setTimeout(() => {
                setState('exploded');
            }, 3000); // Wait 3s for the first transformation
        }
        // Once state becomes 'exploded', no more timeouts are set, so it stays there forever.

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [state === 'exploded']);

    // Sequence Cycle for Orb States (Visual interest before transformation)
    // Updated to use a CONSTANT speed as requested.
    useEffect(() => {
        const orbStates = ['idle', 'thinking', 'speaking', 'listening'];
        if (!orbStates.includes(state)) return;

        const sequence = ['idle', 'thinking', 'speaking', 'listening'];
        let idx = 0;

        // Constant speed interval of 1200ms
        const interval = setInterval(() => {
            idx = (idx + 1) % sequence.length;
            setState(prev => {
                const orbStatesInner = ['idle', 'thinking', 'speaking', 'listening'];
                if (orbStatesInner.includes(prev)) return sequence[idx];
                return prev;
            });
        }, 1200);

        return () => clearInterval(interval);
    }, [state === 'exploded']);

    const triggerThinking = useCallback(() => setState('thinking'), []);
    const triggerSpeaking = useCallback(() => setState('speaking'), []);
    const triggerListening = useCallback(() => setState('listening'), []);
    const triggerReset = useCallback(() => setState('idle'), []);
    const triggerExplosion = useCallback(() => setState('exploded'), []);

    const triggerReacting = useCallback(() => {
        setState(prev => {
            if (prev === 'exploded') return prev;
            // Short reaction pulse then back to orb cycle
            setTimeout(() => setState(p => (p === 'reacting' ? 'idle' : p)), 800);
            return 'reacting';
        });
    }, []);

    return { state, triggerThinking, triggerSpeaking, triggerListening, triggerReacting, triggerExplosion, triggerReset };
}
