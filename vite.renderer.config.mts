// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  build: {
    outDir: '.vite/build/renderer',
    rollupOptions: {
      input: path.resolve(__dirname, './index.html'),
      output: {
        format: 'es', // 브라우저 호환
      }
    }
  }
})
