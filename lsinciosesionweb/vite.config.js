// vite.config.js (PANEL)
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: '/panel/',                 // 👈 aquí, no en los parámetros
    plugins: [react()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: {
      port: 5174,                    // 👈 aquí, no en los parámetros
    },
  };
});
//conexion exitosa