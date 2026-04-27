import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        secondary: "#6b7280",
        border: "#e5e7eb",
        accent: "#3b82f6",
      },
      borderRadius: {
        "4xl": "28px",
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(99, 102, 241, 0.2)",
        "glow-md": "0 0 40px rgba(99, 102, 241, 0.3)",
        "glow-lg": "0 0 80px rgba(99, 102, 241, 0.4)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "spin-reverse": "spin 30s linear infinite reverse",
      },
    },
  },
  plugins: [],
};
export default config;
