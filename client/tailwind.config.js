/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Inter, sans-serif",
    },
    extend: {
      colors: {
        yellow: "#f6ba0f",
        blue: "#0099d8",
        black: "#1c1f23",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
