import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
const viteConfig = defineViteConfig({
  plugins: [ react() ],
  // server: {
  //   port: 3000,
  // },
})

const vitestConfig = defineVitestConfig({
  test: {
    // `globals: true` means global variables will be available during tests like 
    //    'describe, it, expect' so we don't have to import it in every test file
    globals: true,
    // Specified _'jsdom'_ as the test environment, simulating a browser environment
    environment: 'jsdom'
  },
});

export default mergeConfig(viteConfig, vitestConfig);