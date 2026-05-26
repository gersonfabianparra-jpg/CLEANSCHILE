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
        midnight: "#050510",
        "midnight-2": "#080818",
        "midnight-3": "#0C0C22",
        surface: "#0F0F24",
        "surface-2": "#14142E",
        border: "rgba(255,255,255,0.07)",
        gold: {
          DEFAULT: "#EAB308",
          light: "#FDE047",
          dim: "#A16207",
          chrome: "#F5E6A3",
        },
        chrome: {
          DEFAULT: "#CBD5E1",
          light: "#F1F5F9",
          dim: "#64748B",
        },
        neon: {
          blue: "#3B82F6",
          cyan: "#06B6D4",
          violet: "#8B5CF6",
          pink: "#EC4899",
          lime: "#84CC16",
        },
        accent: "#3B82F6",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        space: ["var(--font-space)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "spotlight-1": "spotlight1 18s ease-in-out infinite",
        "spotlight-2": "spotlight2 24s ease-in-out infinite reverse",
        "spotlight-3": "spotlight3 20s ease-in-out 4s infinite",
        "sweep": "sweep 4s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee-slow": "marquee 50s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "float": "float 7s ease-in-out infinite",
        "float-2": "float 9s ease-in-out 2s infinite reverse",
        "float-3": "float 6s ease-in-out 4s infinite",
        "scan": "scan 3s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "shimmer-fast": "shimmer 1.5s linear infinite",
        "pulse-ring": "pulse-ring 2.5s ease-out infinite",
        "border-spin": "border-spin 4s linear infinite",
        "slide-up": "slide-up 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        "slide-in-left": "slide-in-left 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        "scale-in": "scale-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "wipe-in": "wipe-in 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
        "counter-up": "counter-up 0.5s ease forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 25s linear infinite",
        "dash": "dash 2s linear infinite",
        "spark": "spark 2s ease-out forwards",
        "text-reveal": "text-reveal 1s cubic-bezier(0.16,1,0.3,1) forwards",
        "line-grow": "line-grow 1s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      keyframes: {
        spotlight1: {
          "0%,100%": { transform: "translate(0%,0%) scale(1)" },
          "33%": { transform: "translate(30%,-20%) scale(1.2)" },
          "66%": { transform: "translate(-20%,30%) scale(0.9)" },
        },
        spotlight2: {
          "0%,100%": { transform: "translate(0%,0%) scale(1.1)" },
          "50%": { transform: "translate(-40%,20%) scale(0.8)" },
        },
        spotlight3: {
          "0%,100%": { transform: "translate(0%,0%) scale(0.9)" },
          "33%": { transform: "translate(50%,30%) scale(1.3)" },
          "66%": { transform: "translate(-30%,-20%) scale(1)" },
        },
        sweep: {
          "0%": { left: "-20%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { left: "120%", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(3deg)" },
        },
        scan: {
          "0%": { top: "-2px", opacity: "0" },
          "5%": { opacity: "1" },
          "95%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400% center" },
          "100%": { backgroundPosition: "400% center" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "border-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "wipe-in": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)" },
        },
        "glow-pulse": {
          "0%,100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        dash: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        spark: {
          "0%": { transform: "scale(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "scale(1.5) rotate(180deg)", opacity: "0" },
        },
        "text-reveal": {
          "0%": { clipPath: "inset(0 100% 0 0)", opacity: "0" },
          "1%": { opacity: "1" },
          "100%": { clipPath: "inset(0 0% 0 0)", opacity: "1" },
        },
        "line-grow": {
          "0%": { scaleX: "0", transformOrigin: "left" },
          "100%": { scaleX: "1", transformOrigin: "left" },
        },
        "counter-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "chrome-gradient": "linear-gradient(135deg, #94A3B8 0%, #F1F5F9 30%, #CBD5E1 50%, #F1F5F9 70%, #94A3B8 100%)",
        "gold-shimmer": "linear-gradient(105deg, #A16207 0%, #EAB308 30%, #FDE047 50%, #EAB308 70%, #A16207 100%)",
        "spotlight-radial": "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        "glow-blue": "0 0 40px rgba(59,130,246,0.5), 0 0 100px rgba(59,130,246,0.2)",
        "glow-gold": "0 0 40px rgba(234,179,8,0.5), 0 0 100px rgba(234,179,8,0.2)",
        "glow-violet": "0 0 40px rgba(139,92,246,0.5), 0 0 100px rgba(139,92,246,0.2)",
        "glow-cyan": "0 0 40px rgba(6,182,212,0.5), 0 0 100px rgba(6,182,212,0.2)",
        "card-glow": "0 8px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        "inner-light": "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
} satisfies Config;
