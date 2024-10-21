import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["selector"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "hsl(var(--light))",
        dark: "hsl(var(--dark))",
      },
      animation: {},
      keyframes: {},
      fontFamily: {
        inter: ["var(--font-inter)"],
        monts: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
