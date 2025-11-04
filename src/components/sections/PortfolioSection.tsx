import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Code, ArrowRight, Package, Palette } from "lucide-react";
import { OptimizedVideo } from "@/components/common/OptimizedVideo";
import { ProjectModal } from "@/components/common/ProjectModal";
import { useTheme } from "@/contexts/ThemeContext";
import { portfolioProjects } from "@/data/projects";
import { uiComponents } from "@/data/ui-components";
import { fadeInUp, staggerContainer } from "@/lib/motion-config";

export const PortfolioSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "components">(
    "projects",
  );

  // Определяем, какие проекты отображать в зависимости от выбранной вкладки
  const projects = activeTab === "projects" ? portfolioProjects : uiComponents;
  const title =
    activeTab === "projects"
      ? t("portfolio.title", "Code manifest: избранные решения")
      : t("portfolio.componentsTab", "UI-Компоненты и Интерактивные Элементы");

  return (
    <section
      id="portfolio"
      className="py-24 bg-c-bg-secondary relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-accent opacity-10 blur-3xl" />

      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2 }} // Adjust delay as needed
        className="absolute top-1/3 right-8 w-1/4 max-w-xs hidden xl:block"
      >
        <div className="relative rounded-3xl overflow-hidden border-2 border-c-accent-blue/30 shadow-2xl m-8">
          <OptimizedVideo
            src="/images/photo-project.mp4"
            poster="/images/photo-project-poster.jpg"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-c-accent-blue/20 to-transparent" />
        </div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div {...fadeInUp} className="relative z-10 mb-16 text-center">
          <h2 className="pb-2 text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {title}
          </h2>
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

        <motion.div
          {...staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.slice(0, 3).map((project, index) => {
            const imageSrc =
              theme === "light" ? project.imageLight : project.imageDark;
            return (
              <motion.div
                key={project.id}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project.id)}
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
                      <ArrowRight className="text-c-accent-blue group-hover:translate-x-2 transition" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-16">
          <Link
            to={activeTab === "projects" ? "/portfolio" : "/ui-components"}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-white font-semibold hover:scale-105 hover:bg-gradient-accent transition-all"
          >
            {activeTab === "projects"
              ? t("portfolio.allProjects", "Смотреть все проекты")
              : t("portfolio.allComponents", "Смотреть все компоненты")}
          </Link>
        </div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={projects.find((p) => p.id === selectedProject)!}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
