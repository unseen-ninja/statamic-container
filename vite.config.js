import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/site.css', 'resources/js/site.js'],
      refresh: true,
    }),
    tailwindcss(),
  ],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
      interval: 300,
      ignored: [
        '**/vendor/**',
        '**/storage/**',
        '**/public/build/**'
      ]
    },
    hmr: {
      host: 'localhost',
      protocol: 'ws',
      port: 5173,
      clientPort: 5173,
    }
  }
});
