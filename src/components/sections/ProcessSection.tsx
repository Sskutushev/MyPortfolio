// src/components/sections/ProcessSection.tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const ProcessSection = () => {
  const { t } = useTranslation();

  return (
    <section id="process" className="py-24 bg-c-bg-secondary relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(var(--border-default) 1px, transparent 1px), linear-gradient(90deg, var(--border-default) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t('process.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="p-8 rounded-2xl bg-c-bg-primary border border-c-border hover:border-c-accent-blue transition-all">
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {t(`process.steps.${index}.number`)}
                </div>

                <div className="mt-4">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-c-accent-blue transition">
                    {t(`process.steps.${index}.title`)}
                  </h3>
                  <p className="text-c-text-secondary leading-relaxed">
                    {t(`process.steps.${index}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-4 md:p-8 rounded-2xl bg-c-bg-primary border border-c-border"
        >
          {/* Desktop Flow */}
          <div className="hidden md:flex flex-wrap items-center justify-center gap-4 text-center">
            <div className="px-6 py-3 rounded-xl bg-gradient-primary text-white font-semibold">Идея</div>
            <div className="text-c-accent-blue">→</div>
            <div className="px-6 py-3 rounded-xl bg-c-bg-tertiary border border-c-border font-semibold">Архитектура</div>
            <div className="text-c-accent-blue">→</div>
            <div className="px-6 py-3 rounded-xl bg-c-bg-tertiary border border-c-border font-semibold">Разработка</div>
            <div className="text-c-accent-blue">→</div>
            <div className="px-6 py-3 rounded-xl bg-c-bg-tertiary border border-c-border font-semibold">Тестирование</div>
            <div className="text-c-accent-blue">→</div>
            <div className="px-6 py-3 rounded-xl bg-gradient-primary text-white font-semibold">Релиз</div>
          </div>

          {/* Mobile Flow */}
          <div className="flex flex-col items-center gap-4 md:hidden">
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 text-sm rounded-xl bg-gradient-primary text-white font-semibold">Идея</div>
              <div className="text-c-accent-blue">→</div>
              <div className="px-4 py-2 text-sm rounded-xl bg-c-bg-tertiary border border-c-border font-semibold">Архитектура</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 text-sm rounded-xl bg-c-bg-tertiary border border-c-border font-semibold">Разработка</div>
              <div className="text-c-accent-blue">→</div>
              <div className="px-4 py-2 text-sm rounded-xl bg-c-bg-tertiary border border-c-border font-semibold">Тестирование</div>
            </div>
            <div className="px-6 py-3 rounded-xl bg-gradient-primary text-white font-semibold">Релиз</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};