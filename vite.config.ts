import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import yaml from "@rollup/plugin-yaml";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/sensen-games",
  plugins: [
    react(),
    yaml(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
