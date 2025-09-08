// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 👈 necesario para que el switcher funcione
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}'],
  theme: { extend: {} },
  plugins: [],
};
