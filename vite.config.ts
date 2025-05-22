// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import {builtinModules} from "module";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: './.vite/build',
    sourcemap: 'inline',
    minify: process.env.MODE === 'production',
    lib: {
      entry: path.resolve(__dirname, './src/main/preload.ts'),
      formats: ['cjs'],
      fileName: () => '[name].js'
    },
    rollupOptions: {
      external: [
        ...builtinModules.flatMap(m => [m, `node:${m}`]),
      ],
      output: {
        entryFileNames: '[name].js'
      }
    },
    emptyOutDir: true,
  },
});