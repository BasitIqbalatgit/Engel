
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App Router
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // If you're mixing Pages & App Router
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}" // Include PrimeReact if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
