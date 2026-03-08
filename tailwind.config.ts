import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        compliance: {
          success: "#16a34a",
          warning: "#f59e0b",
          danger: "#ef4444",
          neutral: "#64748b"
        }
      }
    }
  },
  plugins: []
};

export default config;
