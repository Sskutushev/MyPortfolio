// src/components/sections/ExperienceSection.tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { fadeInUp, staggerContainer } from "@/lib/motion-config";

export const ExperienceSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="experience"
      className="section-with-matrix py-24 bg-c-bg-primary"
    >
      <div className="container mx-auto px-4">
        <motion.div {...fadeInUp} className="relative z-10 text-center mb-16">
          <h2 className="pb-2 text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t("experience.title")}
          </h2>
        </motion.div>

        <motion.div {...staggerContainer} className="grid md:grid-cols-2 gap-8">
          {/* Left Column: New Text */}
          <motion.div
            {...fadeInUp}
            className="p-8 rounded-2xl bg-c-bg-secondary border border-c-border"
          >
            <h3 className="text-2xl font-bold mb-4 text-c-accent-blue">
              {t("experience.approachTitle")}
            </h3>
            <p className="text-c-text-secondary leading-relaxed mb-6">
              {t("experience.approachDescription1")}
            </p>
            <h3 className="text-2xl font-bold mb-4 text-c-accent-purple">
              {t("experience.philosophyTitle")}
            </h3>
            <div className="space-y-4 text-c-text-secondary leading-relaxed">
              <p>{t("experience.philosophyDescription1")}</p>
              <p>{t("experience.philosophyDescription2")}</p>
              <p>{t("experience.philosophyDescription3")}</p>
            </div>
          </motion.div>

          {/* Right Column: Stack */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }} // Keep specific delay
            className="p-8 rounded-2xl bg-c-bg-secondary border border-c-border"
          >
            <h3 className="text-2xl font-bold mb-6 text-c-accent-blue">
              {t("experience.stack.title")}
            </h3>
            <div className="space-y-4">
              {[
                "react",
                "vue",
                "ssr",
                "styling",
                "build",
                "web3",
                "backend",
                "testing",
              ].map((category, index) => (
                <motion.div
                  key={category}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }} // Keep specific delay
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
        </motion.div>
      </div>
    </section>
  );
};
