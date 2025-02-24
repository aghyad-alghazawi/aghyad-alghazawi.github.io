import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: "800px" },
      },
      colors: {
        light: "hsl(var(--light))",
        dark: "hsl(var(--dark))",
      },
      animation: { flicker: "flicker 0.5s linear infinite" },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        monts: ["var(--font-montserrat)"],
      },
      fontSize: {
        responsive: "clamp(0.5rem, 1.2rem, 1.3rem)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
