import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { spaNotFound } from "./server/vite-spa-404";
import { blogPosts } from "./src/data/blogPosts";

// https://vitejs.dev/config/
const base = process.env.VITE_BASE_URL || '/ritiksharma.github.io/';

export default defineConfig(({ mode }) => ({
  base,
  
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    spaNotFound({ blogSlugs: blogPosts.map((p) => p.slug), base }),
  ].filter(Boolean),
  resolve: {
    alias: {
      // This is crucial for your imports like "@/components/..."
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
