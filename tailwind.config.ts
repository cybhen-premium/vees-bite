import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b", // Warm gold
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          gold: "#E5A93C",
          terracotta: "#E76F51",
          emerald: "#10B981",
          dark: "#0F1115",
          darker: "#0A0B0E",
          surface: "#181B22",
          surfaceLight: "#222733",
          border: "#2E3444",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(229, 169, 60, 0.25)",
        "glow-lg": "0 0 40px -10px rgba(229, 169, 60, 0.35)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
