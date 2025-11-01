// src/components/sections/AboutSection.tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code2, Zap, Database } from 'lucide-react';

const icons = {
  flexibility: Code2,
  performance: Zap,
  scalability: Database,
};

export const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 bg-c-bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <p className="text-xl text-c-text-secondary">{t('about.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-c-border shadow-xl">
              <video autoPlay loop muted playsInline className="w-full h-auto">
                <source src="/images/photo-about.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-c-text-secondary mb-8 leading-relaxed">
              {t('about.description')}
            </p>

            {/* Key Points */}
            <div className="space-y-6">
              {['flexibility', 'performance', 'scalability'].map((key, index) => {
                const Icon = icons[key as keyof typeof icons];
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl bg-c-bg-tertiary border border-c-border hover:border-c-accent-blue transition"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{t(`about.points.${key}.title`)}</h3>
                      <p className="text-c-text-secondary">{t(`about.points.${key}.description`)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};