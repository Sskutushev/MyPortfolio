// src/lib/motion-config.ts

// Переиспользуемые варианты анимаций
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};
