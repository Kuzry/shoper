import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@faastsaas/ui/dist/**/*.{js,ts,jsx,tsx,mdx,mjs}",
    "./../../node_modules/@faastsaas/ui/dist/**/*.{js,ts,jsx,tsx,mdx,mjs}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xl: "90em",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
