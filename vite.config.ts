import dotenv from 'dotenv';
import {
  defineConfig as defineViteConfig, mergeConfig 
} from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Load environment variables from .env file
dotenv.config();

// https://vite.dev/config/
const viteConfig = defineViteConfig({
  plugins: [ react() ],
  define: {
    'process.env.VITE_BE_SERVER_URL': JSON.stringify(process.env.VITE_BE_SERVER_URL),
  },
  resolve: {
    alias: {
      src: '/src',
      assets: '/src/assets',
      components: '/src/components',
      constants: '/src/constants',
      hooks: '/src/hooks',
      layouts: '/src/layouts',
      pages: '/src/pages',
      services: '/src/services',
      types: '/src/types',
    },
  },
  server: {
    allowedHosts: [ '.local', 'localhost' ],
    port: 8080,
    strictPort: true,
  },
});

const vitestConfig = defineVitestConfig({
  test: {
    // `globals: true` means global variables will be available during tests like
    //    'describe, it, expect' so we don't have to import it in every test file
    globals: true,
    // Specified _'jsdom'_ as the test environment, simulating a browser environment
    environment: 'jsdom',
  },
});

export default mergeConfig(viteConfig, vitestConfig);
