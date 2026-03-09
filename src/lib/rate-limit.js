/**
 * Simple in-memory rate limiter using a sliding window algorithm.
 * For production with multiple server instances (like Vercel), 
 * consider swapping the 'records' Map with a Redis store.
 */

const records = new Map();

export function rateLimit(ip, limit = 20, windowMs = 3600000) {
    const now = Date.now();

    // Get existing timestamps for this IP
    let timestamps = records.get(ip) || [];

    // Filter out timestamps older than the window
    timestamps = timestamps.filter(time => now - time < windowMs);

    if (timestamps.length >= limit) {
        return {
            allowed: false,
            remaining: 0,
            reset: Math.max(0, windowMs - (now - timestamps[0]))
        };
    }

    // Record new request
    timestamps.push(now);
    records.set(ip, timestamps);

    return {
        allowed: true,
        remaining: limit - timestamps.length,
        reset: windowMs
    };
}
