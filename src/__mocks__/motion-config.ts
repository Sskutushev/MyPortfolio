// src/__mocks__/motion-config.ts
export const fadeInUp = {
  initial: { opacity: 1, y: 0 }, // Убираем анимацию - сразу видимый
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0 }, // Убираем длительность анимации
};

export const staggerContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
};
