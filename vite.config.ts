
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Detectar si estamos en un dominio personalizado mediante variable de entorno
  // Por defecto, usaremos '/' como base para dominios personalizados
  const base = process.env.CUSTOM_DOMAIN === 'true' ? '/' : (mode === 'production' ? '/test.psicotecnico.evolve/' : '/');
  
  return {
    base,
    build: {
      assetsDir: 'assets',
      outDir: 'dist',
    },
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
