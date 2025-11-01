// src/components/sections/StackSection.tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

export const StackSection = () => {
  const { t } = useTranslation();

  return (
    <section id="stack" className="py-24 bg-c-bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t('stack.title')}
          </h2>
          <p className="text-xl text-c-text-secondary">{t('stack.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {['react', 'vue', 'vanilla'].map((stack, index) => (
            <motion.div
              key={stack}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl bg-c-bg-secondary border border-c-border hover:border-c-accent-blue transition-all hover:shadow-2xl hover:shadow-c-accent-blue/10">
                {/* Icon */}
                <div className="text-6xl mb-6">{t(`stack.stacks.${stack}.icon`)}</div>

                {/* Name */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-c-accent-blue transition">
                  {t(`stack.stacks.${stack}.name`)}
                </h3>

                {/* Description */}
                <p className="text-c-text-secondary mb-6 leading-relaxed">
                  {t(`stack.stacks.${stack}.description`)}
                </p>

                {/* Use Cases */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-c-accent-purple mb-3">Use Cases:</h4>
                  <ul className="space-y-2">
                    {[0, 1, 2, 3].map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-c-text-secondary">
                        <Check size={16} className="text-c-accent-blue flex-shrink-0 mt-0.5" />
                        <span>{t(`stack.stacks.${stack}.useCases.${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools */}
                <div className="pt-6 border-t border-c-border">
                  <h4 className="text-xs font-semibold text-c-text-tertiary mb-2">Инструменты:</h4>
                  <p className="text-sm text-c-text-secondary">{t(`stack.stacks.${stack}.tools`)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};