// vite.config.js (raíz)
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE || "/",
    plugins: [react()],
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    server: {
      proxy: {
        // Microservicio CURP (8060) — regla específica primero
        "/api/ine": {
          target: "http://192.168.100.100:8060",
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api\/ine/, ""),
        },
        // Backend principal (8040)
        "/api": {
          target: "http://192.168.100.100:8040",
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api/, ""),
        },
        "/cp": {
          target:
            "https://catalogos-nom024-fastapi-bigquery-967885369144.europe-west1.run.app",
          changeOrigin: true,
          secure: false,
          // NO reescribas si prefieres conservar la ruta tal cual
          rewrite: (p) => p.replace(/^\/cp/, ''),
        },
      },
    },
  };
});
