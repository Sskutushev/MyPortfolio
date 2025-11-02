// src/pages/PortfolioPage.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink, Code } from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { useTheme } from '@/contexts/ThemeContext';
import { portfolioProjects, Project } from '@/data/projects';

// Re-define the Modal component locally for this page, as it's not exported from PortfolioSection
const ProjectModal = ({ project, onClose, t }: { project: Project; onClose: () => void; t: any }) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'code'>('flow');
  return (
    <Modal isOpen={!!project} onClose={onClose}>
      <div className="sticky top-0 z-10 p-6 border-b border-c-border bg-c-bg-primary/95 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
            {project.link && (<a href={project.link} target="_blank" rel="noopener noreferrer" className="text-c-accent-blue hover:underline"><ExternalLink size={24} /></a>)}
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-c-bg-tertiary transition">✕</button>
        </div>
        <div className="flex gap-4 mt-6">
          {['flow', 'code'].map((tab) => (<button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-6 py-2 rounded-lg font-semibold transition ${activeTab === tab ? 'bg-gradient-primary text-white' : 'bg-c-bg-tertiary text-c-text-secondary hover:text-c-text-primary'}`}>{tab === 'flow' ? t('portfolio.processTab') || 'The Flow' : t('portfolio.codeTab') || 'Code Highlight'}</button>))}
        </div>
      </div>
      <div className="p-6">{/* ... Modal content ... */}</div>
    </Modal>
  );
};

export const PortfolioPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-c-bg-primary text-c-text-primary py-12 px-4">
      <div className="container mx-auto">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <a href="/#portfolio" className="inline-flex items-center gap-2 text-c-accent-blue font-semibold mb-12 group">
            <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
            <span>Назад к сайту</span>
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project, index) => {
            const imageSrc = theme === 'light' ? project.imageLight : project.imageDark;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
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
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={portfolioProjects.find(p => p.id === selectedProject)!}
              onClose={() => setSelectedProject(null)}
              t={t}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
