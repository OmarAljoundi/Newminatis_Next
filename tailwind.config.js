/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages-sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./service/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      aspectRatio: {
        "2/3": "2/3",
        "16/12": "16/12",
        "16/5": "16/5",
        "16/4": "16/4",
        "1/1": "1/1",
        "2/2": "2/2",
        "1/1.5": "1/1.5",
      },
    },
  },
  variants: {
    extend: {
      animation: ["group-hover"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
