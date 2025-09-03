/** @type {import('tailwindcss').Config} */
export default {
  content: ["../index.html", "../registro.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0061ff", // Azul de caja Dropbox
        primaryDark: "#0d2f4f", // Azul oscuro de caja Dropbox
      },
    },
  },
  plugins: [],
};
