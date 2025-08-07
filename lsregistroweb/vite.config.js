import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

// https://vite.dev/config/
export default defineConfig({
  base: import.meta.env.BASE,
  plugins: [react()],
  resolve:{
    alias:{
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
