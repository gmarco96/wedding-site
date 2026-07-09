import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    open: true  // Auto-open browser
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    // Copy assets as-is since they're not ES modules
    assetsInlineLimit: 0,
    rollupOptions: {
      // Don't bundle scripts, just copy them
      external: []
    }
  }
})
