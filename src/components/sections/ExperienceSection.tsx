// src/components/sections/ExperienceSection.tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const ExperienceSection = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-24 bg-c-bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t('experience.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Work Experience */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-c-bg-secondary border border-c-border"
          >
            <h3 className="text-2xl font-bold mb-4 text-c-accent-blue">
              {t('experience.workExperience.title')}
            </h3>
            <p className="text-c-text-secondary leading-relaxed">
              {t('experience.workExperience.description')}
            </p>
          </motion.div>

          {/* Stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-c-bg-secondary border border-c-border"
          >
            <h3 className="text-2xl font-bold mb-6 text-c-accent-blue">
              {t('experience.stack.title')}
            </h3>
            <div className="space-y-4">
              {['react', 'vue', 'ssr', 'styling', 'build', 'web3', 'backend', 'testing'].map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="pb-4 border-b border-c-border last:border-0"
                >
                  <h4 className="text-sm font-semibold text-c-accent-purple mb-2">
                    {t(`experience.stack.categories.${category}.name`)}
                  </h4>
                  <p className="text-sm text-c-text-secondary">
                    {t(`experience.stack.categories.${category}.items`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};