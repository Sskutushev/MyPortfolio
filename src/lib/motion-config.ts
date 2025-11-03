// src/lib/motion-config.ts
import { MotionConfig } from 'framer-motion';

// Глобальная конфигурация для всех анимаций
export const motionConfig = {
  transition: {
    duration: 0.3,
    ease: 'easeOut'
  },
  reducedMotion: 'user', // Учитывает prefers-reduced-motion
};

// Переиспользуемые варианты анимаций
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};
