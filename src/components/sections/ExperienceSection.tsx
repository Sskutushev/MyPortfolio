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
          className="relative z-10 text-center mb-16"
        >
          <h2 className="pb-2 text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t('experience.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: New Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-c-bg-secondary border border-c-border"
          >
            <h3 className="text-2xl font-bold mb-4 text-c-accent-blue">
              Мой опыт и подход к работе
            </h3>
            <p className="text-c-text-secondary leading-relaxed mb-6">
              За последний год я активно работал на фрилансе и реализовал самые разные проекты: от презентационных лендингов до сложных Web3-приложений (DeFi, крипто-кошельки) и Telegram Mini Apps.
            </p>
            <h3 className="text-2xl font-bold mb-4 text-c-accent-purple">
              Моя философия — я практик
            </h3>
            <div className="space-y-4 text-c-text-secondary leading-relaxed">
              <p>
                Я могу не вспомнить термин из учебника, но я всегда понимаю, как и почему код работает. Я не начну писать код, пока не продумаю архитектуру будущего проекта. Это мой способ сразу заложить надежный фундамент и избежать проблем в будущем.
              </p>
              <p>
                Я (в хорошем смысле) дотошный и педантичный. Я искренне люблю чистый, понятный код, который легко поддерживать. Я не сдаю работу, пока лично не буду уверен на 100%, что всё протестировано и работает как часы.
              </p>
              <p>
                Хотя мой фокус — фронтенд, я понимаю, как устроен бэкенд (работал с Next.js и Node.js), что помогает мне видеть всю картину проекта целиком. Я каждый день продолжаю практиковаться, чтобы делать свою работу быстрее и качественнее.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Stack */}
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