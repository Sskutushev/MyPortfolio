import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),

    // Gzip compression
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),

    // Brotli compression
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),

    // Image optimization
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
    }),

  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // Оптимизация бандла
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'form-vendor': ['react-hook-form', 'react-google-recaptcha'],
          'i18n-vendor': ['react-i18next', 'i18next'],
        },
      },
    },

    // Минимальный размер chunk для split
    chunkSizeWarningLimit: 1000,

    // Source maps для production (можно отключить)
    sourcemap: false,

  },

  // Оптимизация dev сервера
  server: {
    hmr: {
      overlay: true,
    },
  },
});
