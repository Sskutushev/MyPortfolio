// src/pages/UIComponentsPage.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Code, Package, Palette } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { uiComponents } from "@/data/ui-components";
import { portfolioProjects } from "@/data/projects";
import { ProjectModal } from "@/components/common/ProjectModal";
import { useTranslation } from "react-i18next";

export const UIComponentsPage = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [selectedComponent, setSelectedComponent] = useState<number | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<"projects" | "components">(
    "components",
  );

  // Определяем, какие проекты отображать в зависимости от выбранной вкладки
  const projects = activeTab === "projects" ? portfolioProjects : uiComponents;
  const title =
    activeTab === "projects"
      ? t("portfolio.title", "Code manifest: избранные решения")
      : t("portfolio.componentsTab", "UI-Компоненты и Интерактивные Элементы");

  return (
    <div className="min-h-screen bg-c-bg-primary text-c-text-primary py-12 px-4">
      <div className="container mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Link
            to="/#portfolio"
            className="inline-flex items-center gap-2 text-c-accent-blue font-semibold group"
          >
            <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
            <span>Назад к портфолио</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-16"
        >
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
            <div className="inline-flex p-1 bg-c-bg-tertiary rounded-xl border border-c-border">
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "projects"
                    ? "bg-gradient-primary text-white shadow-lg"
                    : "text-c-text-secondary hover:text-c-text-primary"
                }`}
              >
                <Package size={18} />
                {t("portfolio.projectsTab", "Коммерческие проекты")}
              </button>
              <button
                onClick={() => setActiveTab("components")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "components"
                    ? "bg-gradient-primary text-white shadow-lg"
                    : "text-c-text-secondary hover:text-c-text-primary"
                }`}
              >
                <Palette size={18} />
                {t(
                  "portfolio.componentsTab",
                  "UI-Компоненты и Интерактивные Элементы",
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                onClick={() => setSelectedComponent(project.id)}
                className="group cursor-pointer"
              >
                <div className="relative h-full rounded-2xl bg-c-bg-primary border border-c-border overflow-hidden transition-all hover:border-c-accent-blue hover:shadow-2xl hover:shadow-c-accent-blue/20">
                  <div className="relative h-48 overflow-hidden bg-c-bg-tertiary">
                    <img
                      src={imageSrc}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-c-bg-primary to-transparent opacity-60" />
                    <motion.div
                      className="absolute top-4 right-4 p-2 rounded-full bg-c-bg-primary/80 backdrop-blur-sm"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Code size={20} className="text-c-accent-blue" />
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-xs px-3 py-1 rounded-full bg-gradient-primary text-white font-semibold">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-c-accent-blue transition">
                      {project.title}
                    </h3>
                    <p className="text-sm text-c-text-secondary mb-4">
                      {project.tech}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-c-border">
                      <div>
                        <div className="text-xs text-c-text-tertiary">
                          {project.metrics.label}
                        </div>
                        <div className="text-2xl font-bold text-c-accent-blue">
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
