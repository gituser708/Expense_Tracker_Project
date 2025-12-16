import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  server: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://expense-tracker-project-server.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    outDir: 'dist',
  },
});
