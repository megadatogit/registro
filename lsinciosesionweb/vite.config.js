// vite.config.js (PANEL)
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd()); // (si luego usas envs)

  return {
    base: '/panel/',
    plugins: [react()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: {
      port: 5174,
      proxy: {
        // 8060: AUTH (regla específica primero)
        '/api/auth': {
          target: 'http://192.168.100.100:8060',
          changeOrigin: true,
          secure: false,
          rewrite: p => p.replace(/^\/api\/auth/, '/auth'),
        },

        // 8040: todo lo demás del backend principal
        '/api': {
          target: 'http://192.168.100.100:8040',
          changeOrigin: true,
          secure: false,
          rewrite: p => p.replace(/^\/api/, ''),
        },
         // 👇 NUEVO: micro de perfil (8060)
        '/api/perfil': {
          target: 'http://192.168.100.100:8060',
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api\/perfil/, '/perfil'),
        },

      },
    },
  };
});
// https://vitejs.dev/config/