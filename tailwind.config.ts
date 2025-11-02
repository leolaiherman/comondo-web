import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.{html,svg}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: "var(--color-primary)",
          forestLight: "var(--color-primary-light)",
          forestDark: "var(--color-primary-dark)",
          orange: "var(--color-secondary)",
          orangeLight: "var(--color-secondary-light)",
          orangeDark: "var(--color-secondary-dark)",
          accent: "var(--color-accent)",
          accentHover: "var(--color-accent-hover)",
        },
        neutral: {
          base: "var(--foreground)",
        },
      },
      fontFamily: {
        primary: "var(--font-primary)",
        nunito: "var(--font-nunito)",
      },
    },
  },
  plugins: [],
};

export default config;
