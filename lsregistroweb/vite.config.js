// vite.config.js (raíz)
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

export default defineConfig(({ mode }) => {
  
  const env = loadEnv(mode, process.cwd());

  return {
    base: '/registro/',
    //base: env.VITE_BASE || "/",
    plugins: [react()],
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    // vite.config.js
    server: {
      proxy: {
        // --- 8060: reglas específicas primero ---
        "/api/preregistro/direccion": {
          // 👈 esta ruta
          target: "http://192.168.100.100:8060",
          changeOrigin: true,
          secure: false,
          rewrite: (p) =>
            p.replace(
              /^\/api\/preregistro\/direccion/,
              "/preregistro/direccion"
            ),
        },

        "/api/ine": {
          target: "http://192.168.100.100:8060",
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api\/ine/, ""),
        },

        "/api/auth": {
          target: "http://192.168.100.100:8060",
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api/, ""), // /api/auth/token -> /auth/token
        },

        // --- 8040: el resto ---
        "/api": {
          target: "http://192.168.100.100:8040",
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api/, ""),
        },

        // Servicio CP externo (ya lo tienes)
        "/cp": {
          target:
            "https://catalogos-nom024-fastapi-bigquery-967885369144.europe-west1.run.app",
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/cp/, ""),
        },

        // al panel
        "/panel": {
          target: "http://localhost:5174", // o 192.168.100.34:5174 como pusiste
          changeOrigin: true,
          secure: false,
          ws: true, // 👈 HMR del panel a través del proxy
          //rewrite: (p) => p.replace(/^\/panel/, ""),
        },
        // ... tus reglas /api, /cp, etc
      },
    },
  };
});
