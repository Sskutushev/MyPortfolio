// src/components/sections/AboutSection.tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code2, Zap, Database } from 'lucide-react';
import { OptimizedVideo } from '@/components/common/OptimizedVideo';
import { fadeInUp, staggerContainer } from '@/lib/motion-config';

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
          {...fadeInUp}
          className="relative z-10 text-center mb-16"
        >
          <h2 className="pb-2 text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <p className="text-xl text-c-text-secondary">{t('about.subtitle')}</p>
        </motion.div>

        <motion.div {...staggerContainer} className="grid md:grid-cols-2 gap-12 items-center">
          {/* Video */}
          <motion.div
            {...fadeInUp}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-c-border shadow-xl">
              <OptimizedVideo 
                src="/images/photo-about.mp4"
                poster="/images/photo-about-poster.jpg"
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }} // Keep specific delay
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
                    {...fadeInUp}
                    transition={{ delay: 0.3 + index * 0.1 }} // Keep specific delay
                    className="flex gap-4 p-4 rounded-xl bg-c-bg-tertiary border border-c-border hover:border-c-accent-blue transition"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{t(`about.points.${key}.title`)}</h3>
                      <p className="text-c-text-secondary">{t(`about.points.${key}.description`)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};