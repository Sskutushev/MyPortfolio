// src/components/sections/HeroSection.tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { OptimizedVideo } from "@/components/common/OptimizedVideo";
import { fadeInUp } from "@/lib/motion-config";

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden pt-24 md:pt-0 md:min-h-screen"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-c-bg-primary via-c-bg-secondary to-c-bg-primary">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-accent opacity-20 blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-glow opacity-20 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            {...fadeInUp}
            className="w-full max-w-full overflow-visible"
          >
            {/* CLI Command with Typewriter Effect */}
            <div className="mb-6 p-4 rounded-xl bg-c-bg-tertiary border border-c-border font-mono text-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="break-words"
              >
                <span className="text-c-accent-cyan">&gt;</span> npm create
                vite@latest portfolio -- --template react-ts
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.5 }}
                className="mt-2"
              >
                status:{" "}
                <span className="text-c-accent-green">
                  Ready for Development.
                </span>
              </motion.div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Frontend Architect
            </h1>

            <p className="text-lg md:text-xl text-c-text-secondary mb-8 leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-wrap gap-4 relative z-20 overflow-visible -ml-4 -mr-4 pl-4 pr-4">
              <ScrollLink to="contact" smooth duration={500}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 rounded-xl bg-gradient-primary text-white font-semibold overflow-hidden min-h-[56px]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t("hero.cta")}
                    <ArrowRight className="group-hover:translate-x-1 transition" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-accent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </ScrollLink>
              <motion.a
                href="/Кутушев Сергей Сергеевич.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl border-2 font-semibold transition-colors min-h-[48px] flex items-center justify-center overflow-visible dark:border-c-accent-blue dark:text-c-accent-blue dark:hover:bg-c-accent-blue/10 light:border-c-accent-custom-resume light:text-c-accent-custom-resume light:hover:bg-c-accent-custom-resume/10"
              >
                {t("hero.resume")}
              </motion.a>
            </div>
          </motion.div>

          {/* Animated Video */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.8, delay: 0.3 }} // Keep specific delay
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-c-accent-blue/30 shadow-2xl">
              <OptimizedVideo
                src="/images/photo-hero.mp4"
                poster="/images/photo-hero-poster.jpg"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-c-accent-blue/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
