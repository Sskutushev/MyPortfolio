import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import path from "path";

export default defineConfig({
  plugins: [
    react(),

    // Gzip compression
    compression({
      algorithm: "gzip",
      ext: ".gz",
    }),

    // Brotli compression
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
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
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Base URL for deployment
  base: "./", // Changed from default to relative path for Vercel

  build: {
    // Оптимизация бандла
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "animation-vendor": ["framer-motion"],
          "form-vendor": ["react-hook-form", "react-google-recaptcha"],
          "i18n-vendor": ["react-i18next", "i18next"],
          "ui-vendor": ["lucide-react"],
        },
        // Улучшаем сжатие
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },

    // Минимальный размер chunk для split
    chunkSizeWarningLimit: 1000,

    // Source maps для production (можно отключить)
    sourcemap: false,

    // Оптимизация для лучшей производительности
    cssCodeSplit: true,

    // Современные возможности JavaScript
    target: "es2022",

    // Максимальная оптимизация
    minify: "esbuild", // Используем esbuild для более быстрой и эффективной минификации

    // Добавляем оптимизации для улучшения FCP и LCP
    modulePreload: {
      polyfill: false,
    },
    cssMinify: "esbuild",
  },

  // Улучшаем оптимизацию
  esbuild: {
    legalComments: "none", // Убираем комментарии для меньшего размера
    keepNames: false, // Убираем имена функций для лучшей минификации
  },

  // Оптимизация dev сервера
  server: {
    hmr: {
      overlay: true,
    },
    // Увеличиваем размер файла для HMR
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },

  // Оптимизация для лучшего FCP и LCP
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "react-hook-form",
      "react-i18next",
      "i18next",
      "lucide-react",
    ],
    // Указываем зависимости для предварительной загрузки
    force: true,
  },

  // Улучшаем загрузку ресурсов
  ssr: {
    noExternal: ["framer-motion"], // Убедимся, что framer-motion корректно обрабатывается
  },

  // Добавляем оптимизации для улучшения производительности
  preview: {
    port: 4173,
    host: true,
    strictPort: true,
  },
});
