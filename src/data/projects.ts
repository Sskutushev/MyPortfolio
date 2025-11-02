// src/data/projects.ts

// Define the project type
export interface Project {
  id: number;
  title: string;
  category: string;
  tech: string;
  imageDark: string;
  imageLight: string;
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

// Portfolio projects data
export const portfolioProjects: Project[] = [
  {
    id: 1,
    title: "DexSafe Wallet Pro",
    category: "Web3 / Telegram Mini App",
    tech: "React, TypeScript, Ethers.js, Zustand, Framer Motion",
    imageDark: "/images/project-dexsafe.jpg",
    imageLight: "/images/project-dexsafe.jpg", // Placeholder, to be updated
    link: "https://presentation-site-landing.vercel.app/",
    flow: {
      input: "Некастодиальный кошелек с интеллектуальной маршрутизацией транзакций (UPA Engine) для X1 EcoChain",
      process: "React + TypeScript для типобезопасности. Ethers.js для Web3-интеграции. Zustand для управления состоянием. Шифрование приватных ключей через AES-256. Code Splitting для оптимизации.",
      output: "Полнофункциональный MVP с балансом, отправкой/получением, UPA-анализом, геймификацией и DeFi-интеграцией. Безопасное хранение ключей, адаптивный UI."
    },
    codeHighlight: {
      title: "Custom Hook: useWallet (безопасное управление кошельком)",
      code: "// src/hooks/useWallet.ts\nimport { create } from 'zustand';\nimport { Wallet } from 'ethers';\nimport { secureStorage } from '@/lib/security/secureStorage';\n\ninterface WalletStore {\n  address: string | null;\n  isLocked: boolean;\n  createWallet: (password: string) => Promise<void>;\n  unlockWallet: (password: string) => Promise<void>;\n  lockWallet: () => void;\n}\n\nexport const useWallet = create<WalletStore>((set) => ({\n  address: null,\n  isLocked: true,\n  \n  createWallet: async (password) => {\n    const wallet = Wallet.createRandom();\n    await secureStorage.setItem(\n      'encrypted_wallet',\n      await wallet.encrypt(password)\n    );\n    set({ address: wallet.address, isLocked: false });\n  },\n  \n  unlockWallet: async (password) => {\n    const encrypted = await secureStorage.getItem('encrypted_wallet');\n    const wallet = await Wallet.fromEncryptedJson(encrypted, password);\n    set({ address: wallet.address, isLocked: false });\n  },\n  \n  lockWallet: () => set({ isLocked: true }),\n}));"
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
    imageDark: "/images/project-ecochain.jpg",
    imageLight: "/images/project-ecochain-light.jpg",
    link: "https://1-xecochain.vercel.app/",
    flow: {
      input: "Платформа для создания и управления токенами на X1 EcoChain без знания программирования",
      process: "React + Vite для быстрой разработки. Zustand для state management. i18next для мультиязычности. OpenAPI-документация для API. Mock-сервер для фронтенд-разработки. Storybook для компонентов.",
      output: "Полная платформа с дашбордом, листингом токенов, формой создания, добавлением ликвидности. CI/CD pipeline, тесты, адаптивный дизайн."
    },
    codeHighlight: {
      title: "API Integration Pattern",
      code: "// src/lib/api/client.ts\nimport axios from 'axios';\n\nconst apiClient = axios.create({\n  baseURL: import.meta.env.VITE_API_URL,\n  timeout: 10000,\n});\n\nexport const tokenAPI = {\n  getTokens: () => apiClient.get('/tokens'),\n  \n  createToken: (data: CreateTokenDTO) => \n    apiClient.post('/tokens', data),\n  \n  addLiquidity: (id: string, data: LiquidityDTO) =>\n    apiClient.post(`/tokens/${id}/liquidity`, data),\n};\n\n// Usage in component\nconst { data, isLoading } = useQuery({\n  queryKey: ['tokens'],\n  queryFn: tokenAPI.getTokens,\n});"
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
    imageDark: "/images/project-aispetsnaz.jpg",
    imageLight: "/images/project-aispetsnaz.jpg",
    link: "https://ai-spetsnaz1-0.vercel.app/",
    flow: {
      input: "Презентационный лендинг для AI-компании в тяжелой промышленности с акцентом на визуальную привлекательность",
      process: "React Router для навигации. Framer Motion + GSAP для комплексных анимаций. Tailwind CSS для быстрой стилизации. Модальные окна для детальной информации. Telegram-бот для формы обратной связи.",
      output: "Современный адаптивный лендинг с 10 секциями, плавными анимациями, интерактивными элементами и интегрированной формой связи."
    },
    codeHighlight: {
      title: "Advanced Animation Pattern",
      code: "// src/lib/motionPresets.ts\nexport const motionPresets = {\n  fadeInUp: {\n    initial: { opacity: 0, y: 60 },\n    whileInView: { opacity: 1, y: 0 },\n    viewport: { once: true },\n    transition: { duration: 0.6, ease: 'easeOut' }\n  },\n  \n  staggerContainer: {\n    initial: {},\n    whileInView: { transition: { staggerChildren: 0.1 } }\n  },\n  \n  scaleIn: {\n    initial: { opacity: 0, scale: 0.8 },\n    whileInView: { opacity: 1, scale: 1 },\n    transition: { duration: 0.5 }\n  }\n};\n\n// Usage\n<motion.div {...motionPresets.fadeInUp}>\n  <h2>Animated Content</h2>\n</motion.div>"
    },
    metrics: {
      label: "Performance",
      value: "95+",
      description: "Lighthouse Score (Performance + Accessibility)"
    }
  }
];
