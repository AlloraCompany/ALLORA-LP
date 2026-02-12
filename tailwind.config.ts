import type { Config } from "tailwindcss";

const config: Config = {
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'allorange': '#f60',
      },
      backgroundPosition: {
        'y-0': 'center 0%',
        'y-100': 'center 100%'
      },
      backgroundSize: {
        'size-2': '2px',
        'size-auto-190': 'auto 200%'
      },
      backgroundImage: {
        'underline': 'linear-gradient(to bottom, transparent 50%, #f60 50%) !important',
      },
      fontFamily: {
        sans: ['var(--font-clover-grotesk-sans)', 'var(--font-gotham)'],
      },
      fontSize: {
        home_clamp: "clamp(2rem, 0.2143rem + 5.7143vw, 4.5rem)"
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite'
      }
    },
  },
  plugins: [],
};
export default config;
