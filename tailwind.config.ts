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
        brand: {
          blue: "#1E3A5F",
          "blue-dark": "#152B47",
          "blue-light": "#2C5282",
          teal: "#00A896",
          "teal-light": "#05C3A8",
          orange: "#F4A261",
          "orange-dark": "#E07A3A",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F5F7FA",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 2px 12px rgba(30, 58, 95, 0.08)",
        "card-hover": "0 4px 20px rgba(30, 58, 95, 0.14)",
      },
    },
  },
  plugins: [],
};
export default config;
