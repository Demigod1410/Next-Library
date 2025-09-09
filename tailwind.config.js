/**
 * @type {import('tailwindcss').Config}
 */
const config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Light mode
        primary: {
          DEFAULT: "#F97316", // Orange
          dark: "#EA580C",
          darker: "#DC2626",
        },
        secondary: {
          DEFAULT: "#FFFFFF", // White
          light: "#F8FAFC",
          lighter: "#F1F5F9",
        },
        accent: "#C2410C", // Dark Orange
        text: {
          dark: "#1F2937",
          light: "#374151",
        },
        
        // Dark mode
        "dark-primary": {
          DEFAULT: "#FB923C", // Orange
          light: "#F97316",
        },
        "dark-bg": {
          DEFAULT: "#0F172A", // Dark Gray
          light: "#1E293B",
        },
        "dark-secondary": {
          DEFAULT: "#334155", // Charcoal
          light: "#475569",
        },
        "dark-text": {
          DEFAULT: "#F8FAFC", // Light Gray
          light: "#E2E8F0",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
