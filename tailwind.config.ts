import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          bg: "hsl(var(--bg))",
          fg: "hsl(var(--fg))",
          muted: "hsl(var(--muted))",
          card: "hsl(var(--card))",
          border: "hsl(var(--border))",
          accent: "hsl(var(--accent))",
          mint: "hsl(var(--mint))"
        }
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem", "3xl": "1.75rem" },
      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,0.08)",
        hover: "0 20px 50px rgba(0,0,0,0.12)"
      }
    }
  },
  plugins: []
};
export default config;


