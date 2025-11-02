import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProjectModal } from '@/components/common/ProjectModal';
import { useTheme } from '@/contexts/ThemeContext';
import { portfolioProjects } from '@/data/projects';

export const PortfolioSection = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 bg-c-bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-accent opacity-10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-1/3 right-8 w-1/4 max-w-xs hidden xl:block"
      >
        <div className="relative rounded-3xl overflow-hidden border-2 border-c-accent-blue/30 shadow-2xl m-8">
          <video autoPlay loop muted playsInline className="w-full h-auto">
            <source src="/images/photo-project.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-tr from-c-accent-blue/20 to-transparent" />
        </div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 mb-16 text-center"
        >
          <h2 className="pb-2 text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t('portfolio.title')}
          </h2>
          <p className="text-xl text-c-text-secondary max-w-3xl mx-auto">{t('portfolio.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project, index) => {
            const imageSrc = theme === 'light' ? project.imageLight : project.imageDark;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project.id)}
                className="group cursor-pointer"
              >
                <div className="relative h-full rounded-2xl bg-c-bg-primary border border-c-border overflow-hidden transition-all hover:border-c-accent-blue hover:shadow-2xl hover:shadow-c-accent-blue/20">
                  <div className="relative h-48 overflow-hidden bg-c-bg-tertiary">
                    <img src={imageSrc} alt={project.title} className="w-full h-full object-cover transition-transform duration-500"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-c-bg-primary to-transparent opacity-60" />
                    <motion.div className="absolute top-4 right-4 p-2 rounded-full bg-c-bg-primary/80 backdrop-blur-sm" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      <Code size={20} className="text-c-accent-blue" />
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3"><span className="text-xs px-3 py-1 rounded-full bg-gradient-primary text-white font-semibold">{project.category}</span></div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-c-accent-blue transition">{project.title}</h3>
                    <p className="text-sm text-c-text-secondary mb-4">{project.tech}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-c-border">
                      <div>
                        <div className="text-xs text-c-text-tertiary">{project.metrics.label}</div>
                        <div className="text-2xl font-bold text-c-accent-blue">{project.metrics.value}</div>
                      </div>
                      <ArrowRight className="text-c-accent-blue group-hover:translate-x-2 transition" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link to="/portfolio" className="inline-block px-8 py-4 rounded-xl bg-gradient-primary text-white font-semibold transition hover:scale-105">
            Смотреть все
          </Link>
        </div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={portfolioProjects.find(p => p.id === selectedProject)!}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};


