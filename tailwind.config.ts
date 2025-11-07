import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-inter)"],
        sans: ["var(--font-inter)"]
      },
      colors: {
        night: "#0B1021",
        aqua: "#3AD0F9",
        steel: "#637089"
      },
      boxShadow: {
        glow: "0 10px 40px rgba(16, 167, 255, 0.2)"
      }
    }
  },
  plugins: []
};

export default config;
