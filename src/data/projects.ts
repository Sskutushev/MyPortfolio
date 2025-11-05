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
      input:
        "Некастодиальный кошелек с интеллектуальной маршрутизацией транзакций (UPA Engine) для X1 EcoChain",
      process:
        "React + TypeScript для типобезопасности. Ethers.js для Web3-интеграции. Zustand для управления состоянием. Шифрование приватных ключей через AES-256. Code Splitting для оптимизации.",
      output:
        "Полнофункциональный MVP с балансом, отправкой/получением, UPA-анализом, геймификацией и DeFi-интеграцией. Безопасное хранение ключей, адаптивный UI.",
    },
    codeHighlight: {
      title: "Custom Hook: useWallet (безопасное управление кошельком)",
      code: "// src/hooks/useWallet.ts\nimport { create } from 'zustand';\nimport { Wallet } from 'ethers';\nimport { secureStorage } from '@/lib/security/secureStorage';\n\ninterface WalletStore {\n  address: string | null;\n  isLocked: boolean;\n  createWallet: (password: string) => Promise<void>;\n  unlockWallet: (password: string) => Promise<void>;\n  lockWallet: () => void;\n}\n\nexport const useWallet = create<WalletStore>((set) => ({\n  address: null,\n  isLocked: true,\n  \n  createWallet: async (password) => {\n    const wallet = Wallet.createRandom();\n    await secureStorage.setItem(\n      'encrypted_wallet',\n      await wallet.encrypt(password)\n    );\n    set({ address: wallet.address, isLocked: false });\n  },\n  \n  unlockWallet: async (password) => {\n    const encrypted = await secureStorage.getItem('encrypted_wallet');\n    const wallet = await Wallet.fromEncryptedJson(encrypted, password);\n    set({ address: wallet.address, isLocked: false });\n  },\n  \n  lockWallet: () => set({ isLocked: true }),\n}));",
    },
    metrics: {
      label: "Безопасность",
      value: "100%",
      description: "Некастодиальность, AES-256 шифрование",
    },
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
      input:
        "Платформа для создания и управления токенами на X1 EcoChain без знания программирования",
      process:
        "React + Vite для быстрой разработки. Zustand для state management. i18next для мультиязычности. OpenAPI-документация для API. Mock-сервер для фронтенд-разработки. Storybook для компонентов.",
      output:
        "Полная платформа с дашбордом, листингом токенов, формой создания, добавлением ликвидности. CI/CD pipeline, тесты, адаптивный дизайн.",
    },
    codeHighlight: {
      title: "API Integration Pattern",
      code: "// src/lib/api/client.ts\nimport axios from 'axios';\n\nconst apiClient = axios.create({\n  baseURL: import.meta.env.VITE_API_URL,\n  timeout: 10000,\n});\n\nexport const tokenAPI = {\n  getTokens: () => apiClient.get('/tokens'),\n  \n  createToken: (data: CreateTokenDTO) => \n    apiClient.post('/tokens', data),\n  \n  addLiquidity: (id: string, data: LiquidityDTO) =>\n    apiClient.post(`/tokens/${id}/liquidity`, data),\n};\n\n// Usage in component\nconst { data, isLoading } = useQuery({\n  queryKey: ['tokens'],\n  queryFn: tokenAPI.getTokens,\n});",
    },
    metrics: {
      label: "Готовность",
      value: "90%",
      description: "Полный UI/UX, готов к Web3-интеграции",
    },
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
      input:
        "Презентационный лендинг для AI-компании в тяжелой промышленности с акцентом на визуальную привлекательность",
      process:
        "React Router для навигации. Framer Motion + GSAP для комплексных анимаций. Tailwind CSS для быстрой стилизации. Модальные окна для детальной информации. Telegram-бот для формы обратной связи.",
      output:
        "Современный адаптивный лендинг с 10 секциями, плавными анимациями, интерактивными элементами и интегрированной формой связи.",
    },
    codeHighlight: {
      title: "Advanced Animation Pattern",
      code: "// src/lib/motionPresets.ts\nexport const motionPresets = {\n  fadeInUp: {\n    initial: { opacity: 0, y: 60 },\n    whileInView: { opacity: 1, y: 0 },\n    viewport: { once: true },\n    transition: { duration: 0.6, ease: 'easeOut' }\n  },\n  \n  staggerContainer: {\n    initial: {},\n    whileInView: { transition: { staggerChildren: 0.1 } }\n  },\n  \n  scaleIn: {\n    initial: { opacity: 0, scale: 0.8 },\n    whileInView: { opacity: 1, scale: 1 },\n    transition: { duration: 0.5 }\n  }\n};\n\n// Usage\n<motion.div {...motionPresets.fadeInUp}>\n  <h2>Animated Content</h2>\n</motion.div>",
    },
    metrics: {
      label: "Performance",
      value: "95+",
      description: "Lighthouse Score (Performance + Accessibility)",
    },
  },
  {
    id: 4,
    title: "DexFlow",
    category: "Web3 / SocialFi / DEX",
    tech: "React, TypeScript, Tailwind CSS, Framer Motion, React Router",
    imageDark: "/images/Dexdark.jpg",
    imageLight: "/images/dexwhite.jpg",
    link: "https://sskutushev.github.io/DexFlow",
    flow: {
      input:
        "Децентрализованная биржа с социальными функциями для трейдеров. Гибридная платформа, объединяющая торговлю криптовалютой (спот/фьючерсы/опционы) с социальной сетью: лента постов, профили, копи-трейдинг.",
      process:
        "React + TypeScript для типобезопасности. Tailwind CSS для utility-first стилизации с темизацией через CSS-переменные. Framer Motion для анимаций. React Router для SPA-навигации. Централизованные mock-данные в src/mock/ с единой системой категоризации контента (popular/hot/trending). Разделение компонентов по фичам (exchange/feed/profile/copytrading).",
      output:
        "Полнофункциональный прототип с 8 страницами: лендинг, торговый интерфейс с графиками, социальная лента (3 категории постов), профили с портфелем, 15 стратегий копи-трейдинга с метриками. Адаптивный дизайн, система тематизации dark/light, готовая структура для Web3-интеграции.",
    },
    codeHighlight: {
      title: "Умная категоризация контента (единый источник для 3 лент)",
      code: "// src/mock/mock-api.js\nconst mockPosts = [\n  {\n    id: 1, \n    type: 'popular',\n    author: { name: 'CryptoBull', address: '0x123...abc' },\n    timestamp: '2 часа назад',\n    content: 'BTC готовится к новому рывку! 🚀',\n    likes: 125, \n    views: 1200,\n  },\n  {\n    id: 4, \n    type: 'hot',\n    author: { name: 'Blockchain_Dev', address: '0xabc...jkl' },\n    timestamp: '30 минут назад',\n    content: 'Развернул новый смарт-контракт на Polygon.',\n    likes: 50, \n    views: 300,\n  },\n  {\n    id: 6, \n    type: 'trending',\n    author: { name: 'Web3_Innovator', address: '0xfgh...pqr' },\n    timestamp: '10 минут назад',\n    content: 'Обсуждаем будущее DAO.',\n    likes: 20, \n    views: 150,\n  },\n];\n\nexport const getPosts = (type = 'popular') => {\n  if (type === 'all') return mockPosts;\n  return mockPosts.filter(post => post.type === type);\n};\n\n// Использование\nconst FeedPage = () => {\n  const [activeTab, setActiveTab] = useState('popular');\n  const posts = getPosts(activeTab); // Автоматическая фильтрация!\n  \n  return posts.map(post => <PostCard key={post.id} {...post} />);\n};",
    },
    metrics: {
      label: "Функционал",
      value: "8 страниц",
      description: "Полнофункциональный прототип",
    },
  },
  {
    id: 5,
    title: "Reactive Velocity Portfolio",
    category: "Personal / Open Source",
    tech: "React 19, TypeScript, Vite 7, Tailwind CSS, Framer Motion, Vitest, Playwright",
    imageDark: "/images/project-portfolio-dark.jpg",
    imageLight: "/images/project-portfolio-light.jpg",
    link: "https://my-portfolio-cyan-three-58.vercel.app/",
    flow: {
      input:
        "Создать портфолио-сайт, который сам по себе является демонстрацией навыков: от архитектуры до доступности.",
      process:
        "🎨 Уникальные фишки:\n• Полный CI/CD Pipeline Автоматический деплой через GitHub Actions Lighthouse CI для каждого PR Codecov для отслеживания покрытия Автоматическое создание релизов\n\n• 100% Accessibility Клавиатурная навигация со Skip Links Focus Trap в модальных окнах Поддержка prefers-reduced-motion Тестирование с Axe-core и скринридерами\n\n• Performance-first подход LazyImage с Intersection Observer OptimizedVideo с WebM/MP4 fallback Code splitting и tree shaking Critical CSS инлайнинг\n\n• Тестирование на всех уровнях Unit тесты (Vitest + RTL) E2E тесты (Playwright) Accessibility тесты (jest-axe) Visual regression тесты\n\n• Developer Experience Pre-commit hooks с Husky Conventional Commits TypeScript strict mode Централизованная конфигурация анимаций",
      output:
        "Живой пример best practices: от архитектуры до документации. Каждый компонент протестирован, каждый коммит проверен, каждый деплой автоматизирован. Проект получил бейджи за качество и доступен как open source для изучения.",
    },
    codeHighlight: {
      title: "Проект портфолио как демонстрация профессиональных практик",
      code: "// Performance Optimization Pattern\n// src/components/common/LazyImage.tsx\nimport { useState, useEffect, useRef } from 'react';\nimport { motion } from 'framer-motion';\n\nexport const LazyImage = ({ src, alt, className }: LazyImageProps) => {\n  const [isLoaded, setIsLoaded] = useState(false);\n  const [isInView, setIsInView] = useState(false);\n  const imgRef = useRef<HTMLImageElement>(null);\n\n  useEffect(() => {\n    const observer = new IntersectionObserver(\n      ([entry]) => {\n        if (entry.isIntersecting) {\n          setIsInView(true);\n          observer.disconnect();\n        }\n      },\n      { rootMargin: '50px' }\n    );\n\n    if (imgRef.current) observer.observe(imgRef.current);\n    return () => observer.disconnect();\n  }, []);\n\n  return (\n    <motion.img\n      ref={imgRef}\n      src={isInView ? src : undefined}\n      alt={alt}\n      className={className}\n      onLoad={() => setIsLoaded(true)}\n      initial={{ opacity: 0 }}\n      animate={{ opacity: isLoaded ? 1 : 0 }}\n      transition={{ duration: 0.5 }}\n    />\n  );\n};\n\n// Accessibility Pattern\n// src/hooks/useFocusTrap.ts\nexport const useFocusTrap = (isActive: boolean) => {\n  const containerRef = useRef<HTMLElement>(null);\n\n  useEffect(() => {\n    if (!isActive || !containerRef.current) return;\n\n    const focusableElements = containerRef.current.querySelectorAll(\n      'button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])\n    );\n\n    const firstElement = focusableElements[0] as HTMLElement;\n    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;\n\n    const handleTabKey = (e: KeyboardEvent) => {\n      if (e.key !== 'Tab') return;\n\n      if (e.shiftKey && document.activeElement === firstElement) {\n        e.preventDefault();\n        lastElement?.focus();\n      } else if (!e.shiftKey && document.activeElement === lastElement) {\n        e.preventDefault();\n        firstElement?.focus();\n      }\n    };\n\n    document.addEventListener('keydown', handleTabKey);\n    firstElement?.focus();\n\n    return () => document.removeEventListener('keydown', handleTabKey);\n  }, [isActive]);\n\n  return containerRef;\n};\n\n// Testing Pattern\n// accessibility.test.tsx\nimport { axe, toHaveNoViolations } from 'jest-axe';\n\nexpect.extend(toHaveNoViolations);\n\ndescribe('Accessibility Tests', () => {\n  it('Header should not have violations', async () => {\n    const { container } = render(<Header />);\n    const results = await axe(container);\n    expect(results).toHaveNoViolations();\n  });\n\n  it('should handle keyboard navigation', async () => {\n    render(<ContactSection />);\n    \n    // Tab through form fields\n    await userEvent.tab();\n    expect(screen.getByLabelText(/name/i)).toHaveFocus();\n    \n    await userEvent.tab();\n    expect(screen.getByLabelText(/contact/i)).toHaveFocus();\n  });\n});\n\n// CI/CD Pipeline Pattern\n// .github/workflows/ci.yml\nname: CI/CD Pipeline\n\non:\n  push:\n    branches: [main, develop]\n  pull_request:\n    branches: [main, develop]\n\njobs:\n  lint-and-typecheck:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm run lint\n      - run: npx tsc --noEmit\n\n  unit-tests:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm run test:coverage\n      - uses: codecov/codecov-action@v4\n        with:\n          token: ${{ secrets.CODECOV_TOKEN }}\n\n  e2e-tests:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npx playwright install --with-deps\n      - run: npm run build\n      - run: npm run test:e2e\n\n  accessibility-tests:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm run build\n      - run: npm run lighthouse:ci\n\n  deploy-production:\n    needs: [lint-and-typecheck, unit-tests, e2e-tests, accessibility-tests]\n    if: github.ref == 'refs/heads/main'\n    runs-on: ubuntu-latest\n    permissions:\n      contents: write\n    steps:\n      - uses: actions/checkout@v4\n      - uses: amondnet/vercel-action@v25\n        with:\n          vercel-token: ${{ secrets.VERCEL_TOKEN }}\n          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}\n          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}\n          vercel-args: '--prod'\n",
    },
    metrics: {
      label: "Performance",
      value: "95+",
      description: "Lighthouse Score (Performance + Accessibility)",
    },
  },
  {
    id: 6,
    title: "Landing Space",
    category: "Landing Page / B2B",
    tech: "React, TypeScript, Tailwind CSS, Framer Motion",
    imageDark: "/images/project-landingspace.jpg",
    imageLight: "/images/project-landingspace.jpg",
    link: "https://sskutushev.github.io/Landing-space/",
    flow: {
      input:
        "Создать современный лендинг для космического стартапа с акцентом на визуальное восприятие и брендинг.",
      process:
        "React + TypeScript для типобезопасности. Tailwind CSS для быстрой стилизации. Framer Motion для анимаций. Адаптивная верстка под все устройства. SEO оптимизация. Модальные окна для дополнительной информации.",
      output:
        "Современный адаптивный лендинг с анимациями, интерактивными элементами, формой контакта и полной поддержкой всех устройств.",
    },
    codeHighlight: {
      title: "Space Themed Landing Page",
      code: '// Example animation configuration for space elements\n// src/lib/motion-config.ts\nexport const spaceAnimations = {\n  float: {\n    y: [-10, 10, -10],\n    transition: {\n      duration: 4,\n      repeat: Infinity,\n      ease: \'easeInOut\'\n    }\n  },\n  \n  parallax: {\n    y: [-30, 30],\n    transition: {\n      duration: 8,\n      repeat: Infinity,\n      ease: \'linear\'\n    }\n  },\n  \n  fadeIn: {\n    initial: { opacity: 0 },\n    animate: { opacity: 1 },\n    transition: { duration: 1.5 }\n  }\n};\n\n// Usage in space-themed components\nconst FloatingPlanet = () => (\n  <motion.div \n    className="absolute"\n    variants={spaceAnimations.float}\n    animate="y"\n  >\n    <img src="/images/planet.png" alt="Floating Planet" />\n  </motion.div>\n);',
    },
    metrics: {
      label: "Performance",
      value: "90+",
      description: "Lighthouse Score",
    },
  },
  {
    id: 7,
    title: "Van Gogh Link",
    category: "Art / Gallery",
    tech: "React, TypeScript, Tailwind CSS, Framer Motion",
    imageDark: "/images/project-vangogh.jpg",
    imageLight: "/images/project-vangogh.jpg",
    link: "https://sskutushev.github.io/VAN_Gogh_Link/",
    flow: {
      input:
        "Создать интерактивную галерею, посвященную Ван Гогу, с возможностью изучения его работ и творческого пути.",
      process:
        "React + TypeScript для типобезопасности. Tailwind CSS для быстрой стилизации. Framer Motion для плавных анимаций. Адаптивная верстка под все устройства. Реализованы 4 интерактивные галереи: 'Документы', 'Картины', 'Письма', 'Стиль'. Каждая галерея имеет свой функционал: масштабирование картин, навигация между изображениями, модальные окна. Внедрены UI-паттерны: карусель, lightbox, табы, аккордеон.",
      output:
        "Полнофункциональная галерея с 4 разделами, интерактивными элементами, адаптивным дизайном и возможностью подробного изучения работ и документов Ван Гога.",
    },
    codeHighlight: {
      title: "Interactive Art Gallery",
      code: '// src/components/Gallery/Gallery.tsx\nimport { useState } from \'react\';\n\ninterface GalleryItem {\n  id: string;\n  title: string;\n  year: number;\n  imageUrl: string;\n  description: string;\n}\n\ninterface GalleryProps {\n  items: GalleryItem[];\n  type: \'docs\' | \'paintings\' | \'letters\' | \'style\';\n}\n\nexport const Gallery = ({ items, type }: GalleryProps) => {\n  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);\n  const [currentIndex, setCurrentIndex] = useState(0);\n  \n  const openItem = (item: GalleryItem) => {\n    const index = items.findIndex(i => i.id === item.id);\n    setCurrentIndex(index);\n    setSelectedItem(item);\n  };\n  \n  const navigateItem = (direction: \'next\' | \'prev\') => {\n    if (!selectedItem) return;\n    \n    const newIndex = direction === \'next\' \n      ? (currentIndex + 1) % items.length\n      : (currentIndex - 1 + items.length) % items.length;\n      \n    setCurrentIndex(newIndex);\n    setSelectedItem(items[newIndex]);\n  };\n  \n  return (\n    <div className="gallery-container">\n      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">\n        {items.map((item) => (\n          <div \n            key={item.id}\n            className="gallery-item"\n            onClick={() => openItem(item)}\n          >\n            <img \n              src={item.imageUrl} \n              alt={item.title}\n              className="w-full h-48 object-cover"\n            />\n            <div className="item-info">\n              <h3>{item.title}</h3>\n              <p>{item.year}</p>\n            </div>\n          </div>\n        ))}\n      </div>\n      \n      {selectedItem && (\n        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>\n          <div className="modal-content" onClick={(e) => e.stopPropagation()}>\n            <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>\n            <div className="modal-nav" onClick={(e) => e.stopPropagation()}>\n              <button onClick={() => navigateItem(\'prev\')} className="nav-btn">‹</button>\n              <img src={selectedItem.imageUrl} alt={selectedItem.title} />\n              <button onClick={() => navigateItem(\'next\')} className="nav-btn">›</button>\n            </div>\n            <div className="modal-body">\n              <h2>{selectedItem.title} ({selectedItem.year})</h2>\n              <p>{selectedItem.description}</p>\n            </div>\n          </div>\n        </div>\n      )}\n    </div>\n  );\n};',
    },
    metrics: {
      label: "Galleries",
      value: "4",
      description: "Docs, Paintings, Letters, Style",
    },
  },
  {
    id: 8,
    title: "TOT",
    category: "Landing / Platform",
    tech: "Vue 3, TypeScript, Pinia, Tailwind CSS",
    imageDark: "/images/project-tot.jpg",
    imageLight: "/images/project-tot.jpg",
    link: "https://sskutushev.github.io/TOT-Test/",
    flow: {
      input:
        "Создать эталонный проект с исчерпывающим планом разработки и полной дизайн-системой.",
      process:
        'Этот проект — эталон профессионального проектирования. Ключевая "фишка" — это исчерпывающий Plan.md на 1000+ строк, который служит "библией" проекта. Он детально описывает 13-этапный план разработки (на 45-65 дней), 3-частную архитектуру (Landing, Auth, Platform) и полную дизайн-систему: от цветов и адаптивной типографики (шрифты TT Travels Next / Open Sans) до брейкпоинтов (1240/576/360px). Стек — Vue 3 + TypeScript + Composition API + Pinia + Vue Router. Для UI выбран Tailwind CSS, что позволяет быстро реализовывать кастомный дизайн. На данный момент реализована "HomePage" (10 секций), которая точно следует плану: использует BaseButton из components/common, корректно применяет шрифты (font-tt-travels) и классы Tailwind.',
      output:
        "Полностью функциональная домашняя страница с 10 секциями, следующая всем архитектурным принципам и дизайн-системе, описанной в плане.",
    },
    codeHighlight: {
      title: "Professional Project Planning & Architecture",
      code: "// Example of professional project architecture\n// src/components/common/BaseButton.vue\n<template>\n  <button \n    class=\"base-button\"\n    :class=\"[sizeClass, variantClass, { 'is-loading': loading }]\"\n    :disabled=\"disabled || loading\"\n  >\n    <span v-if=\"!loading\" class=\"button-text\">\n      <slot />\n    </span>\n    <span v-else class=\"button-spinner\">\n      <!-- Loading spinner -->\n    </span>\n  </button>\n</template>\n\n<script setup lang=\"ts\">\nimport type { PropType } from 'vue';\n\ntype ButtonSize = 'sm' | 'md' | 'lg';\ntype ButtonVariant = 'primary' | 'secondary' | 'outline';\n\ninterface Props {\n  size?: ButtonSize;\n  variant?: ButtonVariant;\n  disabled?: boolean;\n  loading?: boolean;\n}\n\nconst props = withDefaults(defineProps<Props>(), {\n  size: 'md',\n  variant: 'primary',\n  disabled: false,\n  loading: false,\n});\n\nconst sizeClass = computed(() => {\n  switch (props.size) {\n    case 'sm': return 'px-3 py-1.5 text-sm';\n    case 'lg': return 'px-6 py-3 text-lg';\n    default: return 'px-4 py-2';\n  }\n});\n\nconst variantClass = computed(() => {\n  switch (props.variant) {\n    case 'primary': return 'bg-blue-600 text-white hover:bg-blue-700';\n    case 'secondary': return 'bg-gray-200 text-gray-800 hover:bg-gray-300';\n    case 'outline': return 'border border-blue-600 text-blue-600 hover:bg-blue-50';\n    default: return '';\n  }\n});\n</script>\n\n<style scoped>\n.base-button {\n  @apply font-medium rounded-lg transition-colors duration-200;\n  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;\n  @apply disabled:opacity-50 disabled:cursor-not-allowed;\n}\n</style>",
    },
    metrics: {
      label: "Project Plan",
      value: "1000+",
      description: "Lines in comprehensive Plan.md",
    },
  },
];
