// src/components/sections/AdvantagesSection.tsx
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Zap, Layers, Rocket } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion-config";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useRef } from "react";

const icons = [Layers, Zap, Rocket];

export const AdvantagesSection = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Extract numeric values for counters - only animate when in view
  const yearsCount = useAnimatedCounter({ to: 4, trigger: isInView });
  const projectsCount = useAnimatedCounter({ to: 10, trigger: isInView });
  const technologiesCount = useAnimatedCounter({ to: 20, trigger: isInView });
  const codeReviewsCount = useAnimatedCounter({ to: 100, trigger: isInView });

  // Format the animated values based on locale
  const isRussian = i18n.language === "ru";

  // For years - "4+ years" in English, "4+ года" in Russian
  const formattedYears = isRussian
    ? `${yearsCount}+ года`
    : `${yearsCount}+ years`;

  // For projects - "10 years" in English, "10 лет" in Russian
  const formattedProjects = isRussian
    ? `${projectsCount} лет`
    : `${projectsCount} years`;

  // For technologies - same in both languages
  const formattedTechnologies = `${technologiesCount}+`;

  // For code reviews - same in both languages
  const formattedCodeReviews = `${codeReviewsCount}+`;

  return (
    <section
      id="advantages"
      className="section-with-matrix py-24 bg-c-bg-primary"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div {...fadeInUp} className="relative z-10 text-center mb-16">
          <h2 className="pb-2 text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t("advantages.title")}
          </h2>
          <p className="text-xl text-c-text-secondary">
            {t("advantages.subtitle")}
          </p>
        </motion.div>

        <motion.div {...staggerContainer} className="grid md:grid-cols-3 gap-8">
          {[0, 1, 2].map((index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.2 }} // Keep specific delay
                className="relative group"
              >
                <div className="h-full p-8 rounded-2xl bg-c-bg-secondary border border-c-border hover:border-c-accent-blue transition-all hover:shadow-2xl hover:shadow-c-accent-blue/10">
                  {/* Code Comment */}
                  <div className="mb-4 font-mono text-sm text-c-accent-purple">
                    {t(`advantages.items.${index}.code`)}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <Icon size={32} className="text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-c-accent-blue transition">
                    {t(`advantages.items.${index}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-c-text-secondary leading-relaxed">
                    {t(`advantages.items.${index}.description`)}
                  </p>

                  {/* Technical Indicator */}
                  <div className="mt-6 pt-6 border-t border-c-border">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-c-accent-green animate-pulse" />
                      <span className="text-xs font-mono text-c-text-tertiary">
                        status: active
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.6 }} // Keep specific delay
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            {
              label: t("advantages.statLabelExperience"),
              value: formattedYears,
            },
            {
              label: t("advantages.statLabelProjects"),
              value: formattedProjects,
            },
            {
              label: t("advantages.statLabelTechnologies"),
              value: formattedTechnologies,
            },
            {
              label: t("advantages.statLabelCodeReviews"),
              value: formattedCodeReviews,
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              {...fadeInUp}
              transition={{ delay: 0.7 + i * 0.1 }} // Keep specific delay
              className="text-center p-6 rounded-xl bg-c-bg-secondary border border-c-border"
            >
              <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-c-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
