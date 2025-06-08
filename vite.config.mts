// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import {builtinModules} from "module";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  build: {
    outDir: '.vite/build',
    sourcemap: 'inline',
    minify: process.env.MODE === 'production',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './src/main/main'),
        preload: path.resolve(__dirname, './src/main/preload'),
      },
      external: [
        'electron',
        ...builtinModules.flatMap(m => [m, `node:${m}`]),
      ],
      output: {
        entryFileNames: '[name].js',
        format: 'cjs',
      }
    },
    emptyOutDir: true,
  },
});