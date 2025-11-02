// src/components/sections/PortfolioSection.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Code, ArrowRight } from 'lucide-react';
import { Modal } from '@/components/common/Modal';

// Define the project type
interface Project {
  id: number;
  title: string;
  category: string;
  tech: string;
  image: string;
  link?: string;
  flow: {
    input: string;
    process: string;
    output: string;
  };
  codeHighlight: {
    title: string;
    code: string;
  };
  metrics: {
    label: string;
    value: string;
    description: string;
  };
}

// Portfolio projects data (as defined in the plan)
const portfolioProjects: Project[] = [
  {
    id: 1,
    title: "DexSafe Wallet Pro",
    category: "Web3 / Telegram Mini App",
    tech: "React, TypeScript, Ethers.js, Zustand, Framer Motion",
    image: "/images/project-dexsafe.jpg",
    link: "https://presentation-site-landing.vercel.app/",
    flow: {
      input: "Некастодиальный кошелек с интеллектуальной маршрутизацией транзакций (UPA Engine) для X1 EcoChain",
      process: "React + TypeScript для типобезопасности. Ethers.js для Web3-интеграции. Zustand для управления состоянием. Шифрование приватных ключей через AES-256. Code Splitting для оптимизации.",
      output: "Полнофункциональный MVP с балансом, отправкой/получением, UPA-анализом, геймификацией и DeFi-интеграцией. Безопасное хранение ключей, адаптивный UI."
    },
    codeHighlight: {
      title: "Custom Hook: useWallet (безопасное управление кошельком)",
      code: `// src/hooks/useWallet.ts
import { create } from 'zustand';
import { Wallet } from 'ethers';
import { secureStorage } from '@/lib/security/secureStorage';

interface WalletStore {
  address: string | null;
  isLocked: boolean;
  createWallet: (password: string) => Promise<void>;
  unlockWallet: (password: string) => Promise<void>;
  lockWallet: () => void;
}

export const useWallet = create<WalletStore>((set) => ({
  address: null,
  isLocked: true,
  
  createWallet: async (password) => {
    const wallet = Wallet.createRandom();
    await secureStorage.setItem(
      'encrypted_wallet',
      await wallet.encrypt(password)
    );
    set({ address: wallet.address, isLocked: false });
  },
  
  unlockWallet: async (password) => {
    const encrypted = await secureStorage.getItem('encrypted_wallet');
    const wallet = await Wallet.fromEncryptedJson(encrypted, password);
    set({ address: wallet.address, isLocked: false });
  },
  
  lockWallet: () => set({ isLocked: true }),
}));`
    },
    metrics: {
      label: "Безопасность",
      value: "100%",
      description: "Некастодиальность, AES-256 шифрование"
    }
  },
  {
    id: 2,
    title: "EcoChain Token Platform",
    category: "Web3 / DeFi",
    tech: "React, TypeScript, Vite, Zustand, i18next",
    image: "/images/project-ecochain.jpg",
    link: "https://1-xecochain.vercel.app/",
    flow: {
      input: "Платформа для создания и управления токенами на X1 EcoChain без знания программирования",
      process: "React + Vite для быстрой разработки. Zustand для state management. i18next для мультиязычности. OpenAPI-документация для API. Mock-сервер для фронтенд-разработки. Storybook для компонентов.",
      output: "Полная платформа с дашбордом, листингом токенов, формой создания, добавлением ликвидности. CI/CD pipeline, тесты, адаптивный дизайн."
    },
    codeHighlight: {
      title: "API Integration Pattern",
      code: `// src/lib/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

export const tokenAPI = {
  getTokens: () => apiClient.get('/tokens'),
  
  createToken: (data: CreateTokenDTO) => 
    apiClient.post('/tokens', data),
  
  addLiquidity: (id: string, data: LiquidityDTO) =>
    apiClient.post(\"/tokens/\${id}/liquidity\", data),
};

// Usage in component
const { data, isLoading } = useQuery({
  queryKey: ['tokens'],
  queryFn: tokenAPI.getTokens,
});`
    },
    metrics: {
      label: "Готовность",
      value: "90%",
      description: "Полный UI/UX, готов к Web3-интеграции"
    }
  },
  {
    id: 3,
    title: "AI-Spetsnaz Landing",
    category: "Landing Page / B2B",
    tech: "React, TypeScript, Tailwind CSS, Framer Motion, GSAP",
    image: "/images/project-aispetsnaz.jpg",
    flow: {
      input: "Презентационный лендинг для AI-компании в тяжелой промышленности с акцентом на визуальную привлекательность",
      process: "React Router для навигации. Framer Motion + GSAP для комплексных анимаций. Tailwind CSS для быстрой стилизации. Модальные окна для детальной информации. Telegram-бот для формы обратной связи.",
      output: "Современный адаптивный лендинг с 10 секциями, плавными анимациями, интерактивными элементами и интегрированной формой связи."
    },
    codeHighlight: {
      title: "Advanced Animation Pattern",
      code: `// src/lib/motionPresets.ts
export const motionPresets = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  staggerContainer: {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  }
};

// Usage
<motion.div {...motionPresets.fadeInUp}>
  <h2>Animated Content</h2>
</motion.div>`
    },
    metrics: {
      label: "Performance",
      value: "95+",
      description: "Lighthouse Score (Performance + Accessibility)"
    }
  }
];

export const PortfolioSection = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 bg-c-bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-accent opacity-10 blur-3xl" />

      {/* Animated Video (Absolute Position) */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-1/3 right-8 w-1/4 max-w-xs hidden xl:block"
      >
        <div className="relative rounded-3xl overflow-hidden border-2 border-c-accent-blue/30 shadow-2xl m-8">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
          >
            <source src="/images/photo-project.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-tr from-c-accent-blue/20 to-transparent" />
        </div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project, index) => (
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
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden bg-c-bg-tertiary">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-c-bg-primary to-transparent opacity-60" />
                  
                  {/* 3D Flip Indicator */}
                  <motion.div
                    className="absolute top-4 right-4 p-2 rounded-full bg-c-bg-primary/80 backdrop-blur-sm"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Code size={20} className="text-c-accent-blue" />
                  </motion.div>
                </div>

                {/* Project Info */}
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

                  {/* Metrics */}
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
          ))}
        </div>

        {/* Project Modal */}
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
    </section>
  );
};

// Modal Component
const ProjectModal = ({ project, onClose, t }: { project: Project; onClose: () => void; t: any }) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'code'>('flow');

  return (
    <Modal isOpen={!!project} onClose={onClose}>
      {/* Header */}
      <div className="sticky top-0 z-10 p-6 border-b border-c-border bg-c-bg-primary/95 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-c-accent-blue hover:underline"
              >
                <ExternalLink size={24} />
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-c-bg-tertiary transition"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-6">
          {['flow', 'code'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${activeTab === tab ? 'bg-gradient-primary text-white' : 'bg-c-bg-tertiary text-c-text-secondary hover:text-c-text-primary'}`}
            >
              {tab === 'flow' ? t('portfolio.processTab') || 'The Flow' : t('portfolio.codeTab') || 'Code Highlight'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'flow' ? (
          <div className="space-y-6">
            {/* INPUT */}
            <div className="p-6 rounded-xl bg-c-bg-secondary border border-c-border">
              <h4 className="text-sm font-semibold text-c-accent-blue mb-2">{t('portfolio.input')}</h4>
              <p className="text-c-text-secondary">{project.flow.input}</p>
            </div>

            {/* PROCESS */}
            <div className="p-6 rounded-xl bg-c-bg-secondary border border-c-border">
              <h4 className="text-sm font-semibold text-c-accent-purple mb-2">{t('portfolio.process')}</h4>
              <p className="text-c-text-secondary">{project.flow.process}</p>
            </div>

            {/* OUTPUT */}
            <div className="p-6 rounded-xl bg-c-bg-secondary border border-c-border">
              <h4 className="text-sm font-semibold text-c-accent-green mb-2">{t('portfolio.output')}</h4>
              <p className="text-c-text-secondary">{project.flow.output}</p>
            </div>
          </div>
        ) : (
          <div>
            <h4 className="text-lg font-semibold mb-4">{project.codeHighlight.title}</h4>
            <pre className="block w-full p-6 rounded-xl bg-c-bg-tertiary border border-c-border overflow-x-auto">
              <code className="text-sm text-c-text-secondary font-mono">
                {project.codeHighlight.code}
              </code>
            </pre>
          </div>
        )}
      </div>
    </Modal>
  );
};
