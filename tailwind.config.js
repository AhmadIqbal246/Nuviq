/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#080808",
        surface: "#111111",
        deep: "#1a1a2e",
        violet: "#6c63ff",
        cyan: "#00d9ff",
        "text-primary": "#f5f5f5",
        muted: "#888888",
        border: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #6c63ff, #00d9ff)",
        "gradient-hero-bg": "radial-gradient(ellipse at 60% 50%, #1a1a2e 0%, #080808 70%)",
        "gradient-text": "linear-gradient(90deg, #6c63ff, #00d9ff)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(108, 99, 255, 0.25), 0 0 60px rgba(108, 99, 255, 0.1)",
        "glow-cyan": "0 0 20px rgba(0, 217, 255, 0.2), 0 0 60px rgba(0, 217, 255, 0.05)",
      },
      animation: {
        'slow-drift': 'aurora 20s infinite alternate-reverse',
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
