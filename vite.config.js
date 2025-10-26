import { resolve } from 'path';
import { defineConfig } from 'vite';
import netlify from '@netlify/vite-plugin';

export default defineConfig({
  plugins: [netlify()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        plan: resolve(__dirname, 'plan.html'),
      },
    },
  },
});
