// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import config from '.././Frontend/src/Config'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${config.portBackend}`,
        changeOrigin  : true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
  },
});
