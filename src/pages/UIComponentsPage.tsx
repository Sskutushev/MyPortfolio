// src/pages/UIComponentsPage.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Code, Package, Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { uiComponents } from "@/data/ui-components";
import { portfolioProjects } from "@/data/projects";
import { ProjectModal } from "@/components/common/ProjectModal";
import { useTranslation } from "react-i18next";
import { ymGoal } from "@/lib/metrics";

// Map project IDs to translation keys
const PROJECT_TRANSLATION_MAP: Record<number, string> = {
  1: "dexsafe", // DexSafe Wallet Pro
  2: "ecochain", // EcoChain Token Platform
  3: "airbro", // AIRBRO Business
  4: "dexflow", // DexFlow
  5: "portfolio", // Reactive Velocity Portfolio
  6: "landingspace", // Landing Space
  7: "vangogh", // Van Gogh Link
  8: "tot", // TOT
  9: "lumi", // Lumi
  10: "course", // Course Catalog
  11: "yokai", // Yokai Threat Matrix
  12: "moviecatalog", // MovieCatalog - Adaptive Cinema SPA
};

export const UIComponentsPage = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [selectedComponent, setSelectedComponent] = useState<number | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<"projects" | "components">(
    "components",
  );

  // Scroll to top when component mounts or when activeTab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  // Определяем, какие проекты отображать в зависимости от выбранной вкладки
  const projects =
    activeTab === "projects" ? [...portfolioProjects].reverse() : uiComponents;
  const title =
    activeTab === "projects"
      ? t("portfolio.title", "Code manifest: избранные решения")
      : t("portfolio.componentsTab", "UI-Компоненты и Интерактивные Элементы");

  return (
    <div className="min-h-screen bg-c-bg-primary text-c-text-primary py-12 px-4">
      <div className="container mx-auto">
        {/* Back Button */}
        <div className="mb-12">
          <Link
            to="/#portfolio"
            className="inline-flex items-center gap-2 text-c-accent-blue font-semibold group"
          >
            <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
            <span>Назад к портфолио</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl text-c-text-secondary max-w-3xl mx-auto">
            {activeTab === "projects"
              ? t(
                  "portfolio.subtitle",
                  "Реализованные проекты, демонстрирующие мой подход к разработке",
                )
              : "Интерактивные UI-компоненты и решения, созданные с использованием современных технологий"}
          </p>

          {/* Вкладки */}
          <div className="mt-12 flex justify-center">
            <div className="flex flex-col sm:flex-row p-1 bg-c-bg-tertiary rounded-xl border border-c-border w-full max-w-xs sm:max-w-lg">
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "projects"
                    ? "bg-gradient-primary text-white shadow-lg"
                    : "text-c-text-secondary hover:text-c-text-primary"
                }`}
              >
                <Package size={18} />
                <span className="text-sm sm:text-base">
                  {t("portfolio.projectsTab", "Коммерческие проекты")}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("components")}
                className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 mt-2 sm:mt-0 sm:ml-2 ${
                  activeTab === "components"
                    ? "bg-gradient-primary text-white shadow-lg"
                    : "text-c-text-secondary hover:text-c-text-primary"
                }`}
              >
                <Palette size={18} />
                <span className="text-sm sm:text-base">
                  {t("portfolio.componentsTab", "UI-Компоненты")}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => {
            const imageSrc =
              theme === "light" ? project.imageLight : project.imageDark;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -10 }}
                onClick={() => {
                  setSelectedComponent(project.id);
                  ymGoal("case_open", { id: project.id });
                }}
                className="group cursor-pointer"
              >
                <div className="relative h-full rounded-2xl bg-c-bg-primary border border-c-border overflow-hidden transition-all hover:border-c-accent-blue hover:shadow-2xl hover:shadow-c-accent-blue/20">
                  <div className="relative aspect-video sm:aspect-[4/3] md:aspect-video overflow-hidden bg-c-bg-tertiary max-h-48">
                    <img
                      src={imageSrc}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-c-bg-primary to-transparent opacity-60" />
                    <motion.div
                      className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full bg-c-bg-primary/80 backdrop-blur-sm"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Code
                        size={16}
                        className="sm:size-5 text-c-accent-blue"
                      />
                    </motion.div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="mb-2 sm:mb-3">
                      <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-gradient-primary text-white font-semibold">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 group-hover:text-c-accent-blue transition">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-c-text-secondary mb-3 sm:mb-4">
                      {project.tech}
                    </p>
                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-c-border">
                      <div>
                        <div className="text-[10px] sm:text-xs text-c-text-tertiary">
                          {(() => {
                            // Check if translation exists for this project
                            const projectIds = [
                              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                            ];
                            const projectIdKey = projectIds.includes(project.id)
                              ? PROJECT_TRANSLATION_MAP[project.id]
                              : null;
                            if (
                              projectIdKey &&
                              t(`projects.${projectIdKey}.metrics.label`) !==
                                `projects.${projectIdKey}.metrics.label`
                            ) {
                              return t(
                                `projects.${projectIdKey}.metrics.label`,
                              );
                            }
                            return project.metrics.label;
                          })()}
                        </div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-c-accent-blue">
                          {project.metrics.value}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Back to portfolio button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="/#portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-white font-semibold hover:scale-105 hover:bg-gradient-accent hover:text-black hover:fill-black transition-all"
          >
            <Palette size={20} className="transition-all" />
            Вернуться к портфолио
          </a>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedComponent && (
            <ProjectModal
              project={projects.find((p) => p.id === selectedComponent)!}
              onClose={() => setSelectedComponent(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
