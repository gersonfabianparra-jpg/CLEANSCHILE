import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#030303",
          deep: "#050507",
          card: "#0D0D10",
          border: "#1A1A20",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#F0C040",
          dim: "#8B6914",
          glow: "#FFD700",
        },
        electric: {
          blue: "#0066FF",
          cyan: "#00E5FF",
          purple: "#7B2FFF",
          pink: "#FF006E",
          green: "#00FF88",
        },
        surface: {
          DEFAULT: "#0D0D10",
          hover: "#14141A",
          active: "#1A1A24",
        },
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        space: ["var(--font-space)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-mesh": "radial-gradient(ellipse at 20% 50%, rgba(0,102,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(123,47,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(255,0,110,0.10) 0%, transparent 50%)",
        "hero-glow": "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,102,255,0.3) 0%, transparent 100%)",
        "gold-shimmer": "linear-gradient(105deg, transparent 40%, rgba(201,168,76,0.8) 50%, transparent 60%)",
      },
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "pulse-glow-gold": "pulse-glow-gold 3s ease-in-out infinite",
        "marquee": "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "slide-up": "slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.6s ease forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "border-glow": "border-glow 3s ease-in-out infinite",
        "particle-1": "particle-drift 15s ease-in-out infinite",
        "particle-2": "particle-drift 20s ease-in-out 3s infinite reverse",
        "particle-3": "particle-drift 18s ease-in-out 7s infinite",
        "aurora": "aurora 12s ease infinite",
        "scanner": "scanner 3s ease-in-out infinite",
        "glitch": "glitch 0.3s steps(2) infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,102,255,0.3), 0 0 60px rgba(0,102,255,0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(0,102,255,0.6), 0 0 100px rgba(0,102,255,0.2)" },
        },
        "pulse-glow-gold": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201,168,76,0.3), 0 0 60px rgba(201,168,76,0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(201,168,76,0.6), 0 0 100px rgba(201,168,76,0.2)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(0,102,255,0.3)" },
          "50%": { borderColor: "rgba(123,47,255,0.6)" },
        },
        "particle-drift": {
          "0%": { transform: "translate(0px, 0px) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translate(200px, -300px) rotate(360deg)", opacity: "0" },
        },
        "aurora": {
          "0%": { backgroundPosition: "50% 50%, 50% 50%" },
          "33%": { backgroundPosition: "0% 100%, 100% 0%" },
          "66%": { backgroundPosition: "100% 0%, 0% 100%" },
          "100%": { backgroundPosition: "50% 50%, 50% 50%" },
        },
        "scanner": {
          "0%": { top: "0%", opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
        "glitch": {
          "0%": { clipPath: "inset(20% 0 50% 0)", transform: "translate(-2px, 0)" },
          "50%": { clipPath: "inset(60% 0 20% 0)", transform: "translate(2px, 0)" },
          "100%": { clipPath: "inset(20% 0 50% 0)", transform: "translate(-2px, 0)" },
        },
      },
      boxShadow: {
        "glow-blue": "0 0 30px rgba(0,102,255,0.4), 0 0 80px rgba(0,102,255,0.15)",
        "glow-purple": "0 0 30px rgba(123,47,255,0.4), 0 0 80px rgba(123,47,255,0.15)",
        "glow-gold": "0 0 30px rgba(201,168,76,0.4), 0 0 80px rgba(201,168,76,0.15)",
        "glow-pink": "0 0 30px rgba(255,0,110,0.4), 0 0 80px rgba(255,0,110,0.15)",
        "glow-cyan": "0 0 30px rgba(0,229,255,0.4), 0 0 80px rgba(0,229,255,0.15)",
        "card": "0 4px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card-hover": "0 8px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0,102,255,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
        "inner-glow": "inset 0 0 30px rgba(0,102,255,0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
} satisfies Config;
