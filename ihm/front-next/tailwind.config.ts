import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import { scrollbarGutter, scrollbarWidth, scrollbarColor } from 'tailwind-scrollbar-utilities';

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // "custom-blue": "#698EEE",
        // "custom-gray": "#D8D8D8",
        // "gray-bg": "#F7F7F7",
        // "custom-purple": "#C288E9",
        // "custom-dark-gray": "#4C4C4C"
        "blue-celsius": "#698EEE",
        darkBackground: "#000212",
        "white-a08": "rgba(255,255,255,0.08)",
        "black-a12": "rgba(0,0,0,0.12)",
        grey: "#858699",
        "primary-grey": "rgb(180,188,208)",
      },
      fontSize: {
        mobile: "0.8rem",
        xxs: "1rem",
        xs: "1.3rem",
        sm: "1.4rem",
        md: "1.6rem",
        lg: ["2.2rem", "1.3"],
        "3xl": ["4rem", "1.3"],
        "5xl": ["7rem", "1"],
      },
      spacing: {
        0: "0",
        1: "0.4rem",
        2: "0.8rem",
        3: "1.2rem",
        4: "1.6rem",
        5: "2rem",
        6: "2.4rem",
        7: "2.8rem",
        8: "3.2rem",
        9: "3.6rem",
        10: "4rem",
        11: "4.4rem",
        12: "4.8rem",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(92.88deg, rgb(69,94,181) 9.16%, rgb(86,67,204) 43.89%, rgb(103,63,215) 64.72%)",
        "page-gradient": "radial-gradient(ellipse 80% 50% at 50% -20%,rgba(120,119,198,0.3),transparent)",
        "hero-gradient": "radial-gradient(ellipse 50% 80% at 20% 40%,rgba(93,52,221,0.1),transparent), radial-gradient(ellipse 50% 80% at 80% 50%,rgba(120,119,198,0.15),transparent)",
        "hero-glow": "conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)",
        "glow-lines": "linear-gradient(var(--direction),#9d9bf2 0.43%,#7877c6 14.11%,rgba(120,119,198,0) 62.95%)",
        "glow-lines-blue": "linear-gradient(var(--direction),#698EEE 0.43%,#698EEE 14.11%,rgba(120,119,198,0) 62.95%)",
        "radial-faded": "radial-gradient(circle at bottom center,var(--color),transparent 70%)"
      },
      boxShadow: {
        primary: "rgba(80 63 205 / 50%) 0px 1px 20px",
      },
      transitionDelay: {
        0: "0ms",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "none" },
        },
        "slide-in-down": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "image-rotate": {
          "0%": { transform: "rotateX(25deg)" },
          "25%": { transform: "rotateX(25deg) scale(0.9)" },
          "60%": { transform: "none" },
          "100%": { transform: "none" },
        },
        "image-glow": {
          "0%": {
            opacity: "0",
            "animation-timing-function": "cubic-bezier(0.74,0.25,0.76,1)",
          },
          "10%": {
            opacity: "1",
            "animation-timing-function": "cubic-bezier(0.12,0.01,0.08,0.99)",
          },
          "100%": {
            opacity: "0.2",
          },
        },
        "sketch-lines": {
          "0%": { "stroke-dashoffset": "1" },
          "50%": { "stroke-dashoffset": "0" },
          "99%": { "stroke-dashoffset": "0" },
          "100%": { visiblity: "hidden" },
        },
        "glow-line-horizontal": {
          "0%": { opacity: "0", transform: "translateX(0)" },
          "5%": { opacity: "1", transform: "translateX(0)" },
          "90%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateX(min(60vw, 45rem))" },
        },
        "glow-line-vertical": {
          "0%": { opacity: "0", transform: "translateY(0)" },
          "5%": { opacity: "1", transform: "translateY(0)" },
          "90%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateY(min(21vw, 45rem))" },
        },
      },
      animation: {
        "fade-in": "fade-in 1000ms var(--animation-delay) ease forwards",
        "image-rotate": "image-rotate 1400ms ease forwards",
        "image-glow": "image-glow 4100ms 600ms ease-out forwards",
        "sketch-lines": "sketch-lines 1200ms ease-out forwards",
        "glow-line-horizontal": "glow-line-horizontal var(--animation-duration) ease-in forwards",
        "glow-line-vertical": "glow-line-vertical var(--animation-duration) ease-in forwards",
        "animate-slide-in-down": "slide-in-down 0.5s ease-out",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    scrollbarGutter(), // no options to configure
    scrollbarWidth(), // no options to configure
    scrollbarColor(), // no options to configure
  ]

};
export default config;
