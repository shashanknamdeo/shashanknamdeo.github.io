import { defineConfig } from 'vite'

export default defineConfig({
  // Set the base path to '/' for shashanknamdeo.github.io
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
