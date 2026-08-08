import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dehi: {
          ivory: "#FDFBF7",
          cream: "#FAF6F0",
          softcream: "#F5EFEB",
          beige: "#E8DFD8",
          sand: "#EFE7DE",
          gold: {
            light: "#EAD5A0",
            DEFAULT: "#C5A059",
            rich: "#D4AF37",
            dark: "#9E7B35",
            antique: "#8C6D2D",
          },
          charcoal: {
            DEFAULT: "#1F1D1B",
            deep: "#141312",
            light: "#2E2A27",
            muted: "#5C5651",
          },
          brown: {
            DEFAULT: "#5C4033",
            dark: "#3D2B22",
            light: "#7D5A49",
          },
          botanical: {
            light: "#EEF3EC",
            DEFAULT: "#3B4D3C",
            deep: "#233024",
            accent: "#4F6651",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(31, 29, 27, 0.07)',
        'luxury-lg': '0 30px 60px -20px rgba(31, 29, 27, 0.12)',
        'luxury-gold': '0 10px 30px -10px rgba(197, 160, 89, 0.25)',
        'luxury-glow': '0 0 50px -10px rgba(197, 160, 89, 0.2)',
        'inner-gold': 'inset 0 1px 2px rgba(212, 175, 55, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #EAD5A0 0%, #C5A059 50%, #9E7B35 100%)',
        'gold-shimmer': 'linear-gradient(90deg, rgba(197,160,89,0) 0%, rgba(234,213,160,0.4) 50%, rgba(197,160,89,0) 100%)',
        'ivory-gradient': 'linear-gradient(180deg, #FDFBF7 0%, #F5EFEB 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
