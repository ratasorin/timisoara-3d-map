/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,jsx,js}",
    "./src/**/*.{ts,tsx,jsx,js}",
    "./library/**/*.{ts, tsx, jsx, js}",
  ],
  theme: {
    extend: {
      keyframes: {
        "overlay-show": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "content-show": {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
        "slide-down-and-fade": {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "slide-left-and-fade": {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        "slide-up-and-fade": {
          from: { opacity: 0, transform: "translateY(2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "slide-right-and-fade": {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        "overlay-show": "overlay-show 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "content-show": "content-show 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-and-fade":
          "slide-down-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-left-and-fade":
          "slide-left-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up-and-fade":
          "slide-up-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-right-and-fade":
          "slide-right-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
