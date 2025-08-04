/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#1C1F3E",
        surface: "#37456a",
        accent: "#5b8ff0",
        success: "#00C853",
        danger: "#E53935",
        highlight: "#A29BFE",
        text: "#E0E0E0",
        inactive: "#d6d6d6",
      }
    },
  },
  plugins: [],
};
