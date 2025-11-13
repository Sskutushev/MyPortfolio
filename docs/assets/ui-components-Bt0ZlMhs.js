import{j as e,A as d,m as r}from"./animation-vendor-Dcqgn_yC.js";import{r as l,f as p}from"./react-vendor-DvIQo7qu.js";import{a as u}from"./index-Dtmq30oD.js";import{u as m}from"./i18n-vendor-BPfVLRA_.js";import{E as g,c as h}from"./ui-vendor-t6dySueb.js";const b=({isOpen:t,onClose:a,children:i,ariaLabel:s="Modal dialog"})=>{const o=u(t);return l.useEffect(()=>{if(!t)return;document.body.style.overflow="hidden";const n=c=>{c.key==="Escape"&&a()};return document.addEventListener("keydown",n),()=>{document.body.style.overflow="unset",document.removeEventListener("keydown",n)}},[t,a]),t?p.createPortal(e.jsx(d,{children:e.jsx(r.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:a,className:"fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm",role:"dialog","aria-modal":"true","aria-label":s,children:e.jsx(r.div,{ref:o,initial:{scale:.9,y:20},animate:{scale:1,y:0},exit:{scale:.9,y:20},onClick:n=>n.stopPropagation(),className:"w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-c-bg-primary border border-c-border shadow-2xl focus:outline-none",tabIndex:-1,children:i})})}),document.getElementById("modal-root")):null},k=({project:t,onClose:a})=>{const{t:i}=m(),[s,o]=l.useState("flow");return e.jsxs(b,{isOpen:!!t,onClose:a,children:[e.jsxs("div",{className:"sticky top-0 z-10 p-6 border-b border-c-border bg-c-bg-primary/95 backdrop-blur-sm",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("h3",{className:"text-3xl font-bold mb-2",children:t.title}),t.link&&e.jsx("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",className:"text-c-accent-blue hover:underline",children:e.jsx(g,{size:24})})]}),e.jsx("button",{onClick:a,className:"p-2 rounded-full hover:bg-c-bg-tertiary transition",children:"✕"})]}),e.jsx("div",{className:"flex gap-4 mt-6",children:["flow","code"].map(n=>e.jsx("button",{onClick:()=>o(n),className:`px-6 py-2 rounded-lg font-semibold transition ${s===n?"bg-gradient-primary text-white":"bg-c-bg-tertiary text-c-text-secondary hover:text-c-text-primary"}`,children:n==="flow"?i("portfolio.processTab")||"The Flow":i("portfolio.codeTab")||"Code Highlight"},n))})]}),e.jsx("div",{className:"p-6",children:s==="flow"?e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"p-6 rounded-xl bg-c-bg-secondary border border-c-border",children:[e.jsx("h4",{className:"text-sm font-semibold text-c-accent-blue mb-2",children:i("portfolio.input")}),e.jsx("p",{className:"text-c-text-secondary",children:t.flow.input})]}),e.jsxs("div",{className:"p-6 rounded-xl bg-c-bg-secondary border border-c-border",children:[e.jsx("h4",{className:"text-sm font-semibold text-c-accent-purple mb-2",children:i("portfolio.process")}),e.jsx("p",{className:"text-c-text-secondary",children:t.flow.process})]}),e.jsxs("div",{className:"p-6 rounded-xl bg-c-bg-secondary border border-c-border",children:[e.jsx("h4",{className:"text-sm font-semibold text-c-accent-green mb-2",children:i("portfolio.output")}),e.jsx("p",{className:"text-c-text-secondary",children:t.flow.output})]})]}):e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx(h,{size:24,className:"text-c-accent-blue"}),e.jsx("h4",{className:"text-lg font-semibold",children:t.codeHighlight.title})]}),e.jsx("pre",{className:"block w-full p-6 rounded-xl bg-c-bg-tertiary border border-c-border overflow-x-auto",children:e.jsx("code",{className:"text-sm text-c-text-secondary font-mono",children:t.codeHighlight.code})})]})})]})},w=[{id:1,title:"DexSafe Wallet Pro",category:"Web3 / Telegram Mini App",tech:"React, TypeScript, Ethers.js, Zustand, Framer Motion",imageDark:"/images/project-dexsafe.jpg",imageLight:"/images/project-dexsafe.jpg",link:"https://presentation-site-landing.vercel.app/",flow:{input:"Некастодиальный кошелек с интеллектуальной маршрутизацией транзакций (UPA Engine) для X1 EcoChain",process:"React + TypeScript для типобезопасности. Ethers.js для Web3-интеграции. Zustand для управления состоянием. Шифрование приватных ключей через AES-256. Code Splitting для оптимизации.",output:"Полнофункциональный MVP с балансом, отправкой/получением, UPA-анализом, геймификацией и DeFi-интеграцией. Безопасное хранение ключей, адаптивный UI."},codeHighlight:{title:"Custom Hook: useWallet (безопасное управление кошельком)",code:`// src/hooks/useWallet.ts
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
}));`},metrics:{label:"Безопасность",value:"100%",description:"Некастодиальность, AES-256 шифрование"}},{id:2,title:"EcoChain Token Platform",category:"Web3 / DeFi",tech:"React, TypeScript, Vite, Zustand, i18next",imageDark:"/images/project-ecochain.jpg",imageLight:"/images/project-ecochain-light.jpg",link:"https://1-xecochain.vercel.app/",flow:{input:"Платформа для создания и управления токенами на X1 EcoChain без знания программирования",process:"React + Vite для быстрой разработки. Zustand для state management. i18next для мультиязычности. OpenAPI-документация для API. Mock-сервер для фронтенд-разработки. Storybook для компонентов.",output:"Полная платформа с дашбордом, листингом токенов, формой создания, добавлением ликвидности. CI/CD pipeline, тесты, адаптивный дизайн."},codeHighlight:{title:"API Integration Pattern",code:`// src/lib/api/client.ts
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
    apiClient.post(\`/tokens/\${id}/liquidity\`, data),
};

// Usage in component
const { data, isLoading } = useQuery({
  queryKey: ['tokens'],
  queryFn: tokenAPI.getTokens,
});`},metrics:{label:"Готовность",value:"90%",description:"Полный UI/UX, готов к Web3-интеграции"}},{id:3,title:"AIRBRO Business",category:"Full-Stack SaaS / B2B Platform",tech:"React 19, TS, React Query, Prisma, PostgreSQL, Express, Playwright, Vercel, Railway",imageDark:"/images/project-airbro-dark.jpg",imageLight:"/images/project-airbro-light.jpg",link:"https://airbro-production.up.railway.app/",flow:{input:'Создать "под ключ" production-ready SaaS платформу с нуля. Реализовать full-stack приложение, включающее аутентификацию (JWT + Telegram), прием крипто-платежей (USDT/TON) и полноценный личный кабинет пользователя для управления подписками.',process:'Архитектура "Monorepo". Frontend на Vercel (React 19, Vite, React Query, Zod, Framer Motion). Backend на Railway (Node.js, Express, Prisma, PostgreSQL). Бэкенд построен по слоеной архитектуре (Routes → Controllers → Services → Repositories). Настроен полный CI/CD-пайплайн с E2E-тестированием на Playwright.',output:"Масштабируемая, безопасная и полностью документированная SaaS-платформа. Включает многоязычную поддержку (i18n), смену тем, защищенный дашборд и автоматизированный CI/CD. Проект полностью соответствует лучшим практикам безопасности (OWASP)."},codeHighlight:{title:"Automated CI/CD Pipeline (Backend Testing)",code:`// .github/workflows/ci.yml
  test-backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: airbro_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: cd backend && npm ci
      
      - name: Run migrations
        run: cd backend && npm run prisma:migrate
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/airbro_test
      
      - name: Run tests
        run: cd backend && npm test -- --run --coverage
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/airbro_test
          JWT_SECRET: test_secret_key_for_ci_pipeline`},metrics:{label:"Готовность",value:"Production-Ready",description:"CI/CD, Tests, Docs"}},{id:4,title:"DexFlow",category:"Web3 / SocialFi / DEX",tech:"React, TypeScript, Tailwind CSS, Framer Motion, React Router",imageDark:"/images/Dexdark.jpg",imageLight:"/images/dexwhite.jpg",link:"https://sskutushev.github.io/DexFlow",flow:{input:"Децентрализованная биржа с социальными функциями для трейдеров. Гибридная платформа, объединяющая торговлю криптовалютой (спот/фьючерсы/опционы) с социальной сетью: лента постов, профили, копи-трейдинг.",process:"React + TypeScript для типобезопасности. Tailwind CSS для utility-first стилизации с темизацией через CSS-переменные. Framer Motion для анимаций. React Router для SPA-навигации. Централизованные mock-данные в src/mock/ с единой системой категоризации контента (popular/hot/trending). Разделение компонентов по фичам (exchange/feed/profile/copytrading).",output:"Полнофункциональный прототип с 8 страницами: лендинг, торговый интерфейс с графиками, социальная лента (3 категории постов), профили с портфелем, 15 стратегий копи-трейдинга с метриками. Адаптивный дизайн, система тематизации dark/light, готовая структура для Web3-интеграции."},codeHighlight:{title:"Умная категоризация контента (единый источник для 3 лент)",code:`// src/mock/mock-api.js
const mockPosts = [
  {
    id: 1, 
    type: 'popular',
    author: { name: 'CryptoBull', address: '0x123...abc' },
    timestamp: '2 часа назад',
    content: 'BTC готовится к новому рывку! 🚀',
    likes: 125, 
    views: 1200,
  },
  {
    id: 4, 
    type: 'hot',
    author: { name: 'Blockchain_Dev', address: '0xabc...jkl' },
    timestamp: '30 минут назад',
    content: 'Развернул новый смарт-контракт на Polygon.',
    likes: 50, 
    views: 300,
  },
  {
    id: 6, 
    type: 'trending',
    author: { name: 'Web3_Innovator', address: '0xfgh...pqr' },
    timestamp: '10 минут назад',
    content: 'Обсуждаем будущее DAO.',
    likes: 20, 
    views: 150,
  },
];

export const getPosts = (type = 'popular') => {
  if (type === 'all') return mockPosts;
  return mockPosts.filter(post => post.type === type);
};

// Использование
const FeedPage = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const posts = getPosts(activeTab); // Автоматическая фильтрация!
  
  return posts.map(post => <PostCard key={post.id} {...post} />);
};`},metrics:{label:"Функционал",value:"8 страниц",description:"Полнофункциональный прототип"}},{id:5,title:"Reactive Velocity Portfolio",category:"Personal / Open Source",tech:"React 19, TypeScript, Vite 7, Tailwind CSS, Framer Motion, Vitest, Playwright",imageDark:"/images/project-portfolio-dark.jpg",imageLight:"/images/project-portfolio-light.jpg",link:"https://my-portfolio-cyan-three-58.vercel.app/",flow:{input:"Создать портфолио-сайт, который сам по себе является демонстрацией навыков: от архитектуры до доступности.",process:`🎨 Уникальные фишки:
• Полный CI/CD Pipeline Автоматический деплой через GitHub Actions Lighthouse CI для каждого PR Codecov для отслеживания покрытия Автоматическое создание релизов

• 100% Accessibility Клавиатурная навигация со Skip Links Focus Trap в модальных окнах Поддержка prefers-reduced-motion Тестирование с Axe-core и скринридерами

• Performance-first подход LazyImage с Intersection Observer OptimizedVideo с WebM/MP4 fallback Code splitting и tree shaking Critical CSS инлайнинг

• Тестирование на всех уровнях Unit тесты (Vitest + RTL) E2E тесты (Playwright) Accessibility тесты (jest-axe) Visual regression тесты

• Developer Experience Pre-commit hooks с Husky Conventional Commits TypeScript strict mode Централизованная конфигурация анимаций`,output:"Живой пример best practices: от архитектуры до документации. Каждый компонент протестирован, каждый коммит проверен, каждый деплой автоматизирован. Проект получил бейджи за качество и доступен как open source для изучения."},codeHighlight:{title:"Проект портфолио как демонстрация профессиональных практик",code:`// Performance Optimization Pattern
// src/components/common/LazyImage.tsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const LazyImage = ({ src, alt, className }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.img
      ref={imgRef}
      src={isInView ? src : undefined}
      alt={alt}
      className={className}
      onLoad={() => setIsLoaded(true)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />
  );
};

// Accessibility Pattern
// src/hooks/useFocusTrap.ts
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isActive]);

  return containerRef;
};

// Testing Pattern
// accessibility.test.tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('Header should not have violations', async () => {
    const { container } = render(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should handle keyboard navigation', async () => {
    render(<ContactSection />);
    
    // Tab through form fields
    await userEvent.tab();
    expect(screen.getByLabelText(/name/i)).toHaveFocus();
    
    await userEvent.tab();
    expect(screen.getByLabelText(/contact/i)).toHaveFocus();
  });
});

// CI/CD Pipeline Pattern
// .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit

  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v4
        with:
          token: \${{ secrets.CODECOV_TOKEN }}

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e

  accessibility-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - run: npm run lighthouse:ci

  deploy-production:
    needs: [lint-and-typecheck, unit-tests, e2e-tests, accessibility-tests]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
`},metrics:{label:"Performance",value:"95+",description:"Lighthouse Score (Performance + Accessibility)"}},{id:6,title:"Landing Space",category:"Landing Page / B2B",tech:"React, TypeScript, Tailwind CSS, Framer Motion",imageDark:"/images/project-landingspace.jpg",imageLight:"/images/project-landingspace.jpg",link:"https://sskutushev.github.io/Landing-space/",flow:{input:"Создать современный лендинг для космического стартапа с акцентом на визуальное восприятие и брендинг.",process:"React + TypeScript для типобезопасности. Tailwind CSS для быстрой стилизации. Framer Motion для анимаций. Адаптивная верстка под все устройства. SEO оптимизация. Модальные окна для дополнительной информации.",output:"Современный адаптивный лендинг с анимациями, интерактивными элементами, формой контакта и полной поддержкой всех устройств."},codeHighlight:{title:"Space Themed Landing Page",code:`// Example animation configuration for space elements
// src/lib/motion-config.ts
export const spaceAnimations = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  },
  
  parallax: {
    y: [-30, 30],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear'
    }
  },
  
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1.5 }
  }
};

// Usage in space-themed components
const FloatingPlanet = () => (
  <motion.div 
    className="absolute"
    variants={spaceAnimations.float}
    animate="y"
  >
    <img src="/images/planet.png" alt="Floating Planet" />
  </motion.div>
);`},metrics:{label:"Performance",value:"90+",description:"Lighthouse Score"}},{id:7,title:"Van Gogh Link",category:"Art / Gallery",tech:"React, TypeScript, Tailwind CSS, Framer Motion",imageDark:"/images/project-vangogh.jpg",imageLight:"/images/project-vangogh.jpg",link:"https://sskutushev.github.io/VAN_Gogh_Link/",flow:{input:"Создать интерактивную галерею, посвященную Ван Гогу, с возможностью изучения его работ и творческого пути.",process:"React + TypeScript для типобезопасности. Tailwind CSS для быстрой стилизации. Framer Motion для плавных анимаций. Адаптивная верстка под все устройства. Реализованы 4 интерактивные галереи: 'Документы', 'Картины', 'Письма', 'Стиль'. Каждая галерея имеет свой функционал: масштабирование картин, навигация между изображениями, модальные окна. Внедрены UI-паттерны: карусель, lightbox, табы, аккордеон.",output:"Полнофункциональная галерея с 4 разделами, интерактивными элементами, адаптивным дизайном и возможностью подробного изучения работ и документов Ван Гога."},codeHighlight:{title:"Interactive Art Gallery",code:`// src/components/Gallery/Gallery.tsx
import { useState } from 'react';

interface GalleryItem {
  id: string;
  title: string;
  year: number;
  imageUrl: string;
  description: string;
}

interface GalleryProps {
  items: GalleryItem[];
  type: 'docs' | 'paintings' | 'letters' | 'style';
}

export const Gallery = ({ items, type }: GalleryProps) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const openItem = (item: GalleryItem) => {
    const index = items.findIndex(i => i.id === item.id);
    setCurrentIndex(index);
    setSelectedItem(item);
  };
  
  const navigateItem = (direction: 'next' | 'prev') => {
    if (!selectedItem) return;
    
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % items.length
      : (currentIndex - 1 + items.length) % items.length;
      
    setCurrentIndex(newIndex);
    setSelectedItem(items[newIndex]);
  };
  
  return (
    <div className="gallery-container">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div 
            key={item.id}
            className="gallery-item"
            onClick={() => openItem(item)}
          >
            <img 
              src={item.imageUrl} 
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="item-info">
              <h3>{item.title}</h3>
              <p>{item.year}</p>
            </div>
          </div>
        ))}
      </div>
      
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>
            <div className="modal-nav" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => navigateItem('prev')} className="nav-btn">‹</button>
              <img src={selectedItem.imageUrl} alt={selectedItem.title} />
              <button onClick={() => navigateItem('next')} className="nav-btn">›</button>
            </div>
            <div className="modal-body">
              <h2>{selectedItem.title} ({selectedItem.year})</h2>
              <p>{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};`},metrics:{label:"Galleries",value:"4",description:"Docs, Paintings, Letters, Style"}},{id:8,title:"TOT",category:"Landing / Platform",tech:"Vue 3, TypeScript, Pinia, Tailwind CSS",imageDark:"/images/project-tot.jpg",imageLight:"/images/project-tot.jpg",link:"https://sskutushev.github.io/TOT-Test/",flow:{input:"Создать эталонный проект с исчерпывающим планом разработки и полной дизайн-системой.",process:'Этот проект — эталон профессионального проектирования. Ключевая "фишка" — это исчерпывающий Plan.md на 1000+ строк, который служит "библией" проекта. Он детально описывает 13-этапный план разработки (на 45-65 дней), 3-частную архитектуру (Landing, Auth, Platform) и полную дизайн-систему: от цветов и адаптивной типографики (шрифты TT Travels Next / Open Sans) до брейкпоинтов (1240/576/360px). Стек — Vue 3 + TypeScript + Composition API + Pinia + Vue Router. Для UI выбран Tailwind CSS, что позволяет быстро реализовывать кастомный дизайн. На данный момент реализована "HomePage" (10 секций), которая точно следует плану: использует BaseButton из components/common, корректно применяет шрифты (font-tt-travels) и классы Tailwind.',output:"Полностью функциональная домашняя страница с 10 секциями, следующая всем архитектурным принципам и дизайн-системе, описанной в плане."},codeHighlight:{title:"Professional Project Planning & Architecture",code:`// Example of professional project architecture
// src/components/common/BaseButton.vue
<template>
  <button 
    class="base-button"
    :class="[sizeClass, variantClass, { 'is-loading': loading }]"
    :disabled="disabled || loading"
  >
    <span v-if="!loading" class="button-text">
      <slot />
    </span>
    <span v-else class="button-spinner">
      <!-- Loading spinner -->
    </span>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface Props {
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'primary',
  disabled: false,
  loading: false,
});

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-3 py-1.5 text-sm';
    case 'lg': return 'px-6 py-3 text-lg';
    default: return 'px-4 py-2';
  }
});

const variantClass = computed(() => {
  switch (props.variant) {
    case 'primary': return 'bg-blue-600 text-white hover:bg-blue-700';
    case 'secondary': return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    case 'outline': return 'border border-blue-600 text-blue-600 hover:bg-blue-50';
    default: return '';
  }
});
<\/script>

<style scoped>
.base-button {
  @apply font-medium rounded-lg transition-colors duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>`},metrics:{label:"Project Plan",value:"1000+",description:"Lines in comprehensive Plan.md"}}],C=[{id:1,title:"Sliding Glass Authentication System",category:"Authentication / Modern UI",tech:"HTML5, CSS3 (Flexbox, Animations), Vanilla JS (легко рефакторить на необходимый стек)",imageDark:"/images/glass.jpg",imageLight:"/images/glass.jpg",link:"https://sskutushev.github.io/Registration/",flow:{input:"Создать современную форму входа/регистрации с эффектом стеклянного морфизма, плавной анимацией переключения между формами и адаптивным дизайном для всех устройств.",process:"CSS3 с использованием backdrop-filter для glassmorphism-эффекта. Gradient-анимации для overlay-панелей (keyframes shimmer). Абсолютное позиционирование с transition для sliding-эффекта. JavaScript для переключения классов (.right-panel-active). Медиа-запросы для скрытия overlay на мобильных и показа текстовых ссылок.",output:"Двухформенная система с анимированным overlay-слайдером на десктопе. На мобильных устройствах — переключение через текстовые ссылки под формой. Валидация полей (имя, email, пароль, подтверждение, чекбоксы согласия). Интеграция социальных кнопок (Facebook, Google, GitHub). Полная адаптивность 320px-2560px."},codeHighlight:{title:"Sliding Animation System (CSS-трансформации)",code:`/* Базовое состояние */
.sign-in-container {
left: 0;
width: 50%;
z-index: 2;
}

.overlay-container {
left: 50%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
}

/* Активное состояние (регистрация) */
.container.right-panel-active .sign-in-container {
transform: translateX(100%);
opacity: 0;
z-index: 1;
}

.container.right-panel-active .sign-up-container {
transform: translateX(100%);
opacity: 1;
z-index: 5;
}

.container.right-panel-active .overlay-container {
transform: translateX(-100%);
}

/* Анимация градиента */
@keyframes shimmer {
0% { background-position: 0% 50%; }
50% { background-position: 100% 50%; }
100% { background-position: 0% 50%; }
}`},metrics:{label:"Готовность",value:"100%",description:"Завершенное решение"}},{id:2,title:"Tab-Based Neomorphic Login System",category:"Authentication / Neomorphism",tech:"HTML5, CSS3 (Custom Properties), Vanilla JS (OOP) (легко рефакторить на необходимый стек)",imageDark:"/images/neo2.jpg",imageLight:"/images/neo2.jpg",link:"https://sskutushev.github.io/neoformat/",flow:{input:"Разработать систему входа/регистрации в стиле неоморфизма с переключением вкладок, валидацией форм в реальном времени, индикатором силы пароля и LocalStorage для сохранения состояния.",process:"CSS Variables для темизации (--bg-main, --shadow-light, --shadow-dark). Box-shadow для вдавленного/выпуклого эффекта. ОПП в JS: классы TabSwitcher, FormValidator, PasswordToggle, PasswordStrength. Регулярные выражения для валидации (email, имя, пароль). LocalStorage для восстановления активной вкладки при перезагрузке.",output:"Плавный sliding-индикатор вкладок с cubic-bezier анимацией. Валидация с визуальными состояниями (error/success границы). Индикатор силы пароля с 3 уровнями (weak/medium/strong). Кастомные чекбоксы с checkmark-анимацией. Модальное окно успешной отправки. Loading-состояние кнопки с спиннером."},codeHighlight:{title:"OOP Validation System (Масштабируемая архитектура)",code:`class FormValidator {
constructor(form) {
this.form = form;
this.rules = {
email: {
required: true,
pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
messages: {
required: 'Введите email',
pattern: 'Некорректный email адрес'
}
},
password: {
required: true,
minLength: 6,
messages: {
required: 'Введите пароль',
minLength: 'Минимум 6 символов'
}
}
};
this.init();
}

validateField(input) {
const rules = this.rules[input.name];
const value = input.value.trim();

    if (rules.required && !value) {
      this.showError(input, rules.messages.required);
      return false;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      this.showError(input, rules.messages.pattern);
      return false;
    }

    this.showSuccess(input);
    return true;

}

showError(input, message) {
const inputGroup = input.closest('.input-group');
inputGroup.classList.add('error');
inputGroup.querySelector('.error-message').textContent = message;
if (navigator.vibrate) navigator.vibrate(200);
}
}`},metrics:{label:"Готовность",value:"100%",description:"Завершенное решение"}},{id:3,title:"Neo-Grid Interactive Login System",category:"Authentication / Sci-Fi UI",tech:"HTML5 Canvas, CSS3 (Animations), Vanilla JS (Canvas API) (легко рефакторить на необходимый стек)",imageDark:"/images/neo.jpg",imageLight:"/images/neo.jpg",link:"https://sskutushev.github.io/authorization/",flow:{input:'Создать футуристическую форму входа с "убегающей" кнопкой, анимированным фоном (starfield на Canvas), glitch-эффектами и кастомным полем пароля с неоновыми точками.',process:'Canvas API для анимированного звездного фона (200 частиц с независимыми скоростями). CSS Keyframes для glitch-анимации (skewX, translate, box-shadow). JavaScript для логики "убегания" кнопки: десктоп — последовательные направления (left→up→right→down), мобильный — случайные координаты в пределах контейнера. Кастомное поле пароля с маской из pulsing-dots.',output:'Интерактивная кнопка входа: disabled-состояние с эффектом "убегания" при hover/touch, active-состояние с bounce-анимацией при заполнении полей. Real-time статус валидации с neon-pulse эффектом. Canvas-фон с 200 звездами и плавной анимацией. Адаптивная логика для десктопа (mouseover) и мобильных (touchstart).'},codeHighlight:{title:"Canvas Starfield Animation (Performance-оптимизация)",code:`const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function createStars() {
for (let i = 0; i < 200; i++) {
stars.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
size: Math.random() * 1.5,
speed: Math.random() * 0.2 + 0.05,
color: \`rgba(59, 130, 246, \${Math.random() * 0.8 + 0.2})\`
});
}
}

function drawStars() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
stars.forEach(star => {
ctx.fillStyle = star.color;
ctx.beginPath();
ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
ctx.fill();

    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }

});
requestAnimationFrame(drawStars); // 60 FPS
}`},metrics:{label:"Готовность",value:"100%",description:"Завершенное решение"}},{id:4,title:"Animated Sidebar with Sliding Indicator",category:"Navigation / Modern UI",tech:"HTML5, CSS3 (Backdrop-filter), Vanilla JS (DOM API) (легко рефакторить на необходимый стек)",imageDark:"/images/Menu.jpg",imageLight:"/images/Menu.jpg",link:"https://sskutushev.github.io/Menubox/#",flow:{input:"Создать боковую навигационную панель с glass-эффектом, плавным анимированным индикатором активного пункта и динамической сменой контента.",process:"Backdrop-filter: blur(12px) для glassmorphism. Абсолютно позиционированный индикатор с transition: top 0.4s cubic-bezier. JavaScript для вычисления offsetTop и синхронизации с переключением контента. Map-объект для связи ID ссылок с ID секций контента. CSS-анимации (slideIn) для контента.",output:"Sidebar 260px с градиентным фоном (radial-gradient) и 5 пунктами меню. Индикатор с gradient-фоном и box-shadow синхронизируется с активной ссылкой. Плавная смена контента с fade-in анимацией. Hover-эффекты на ссылках (scale иконок, цвет текста). Footer с кнопкой выхода."},codeHighlight:{title:"Dynamic Indicator Positioning (Pixel-perfect синхронизация)",code:`const linkToContentMap = {
'home-link': 'home-content',
'profile-link': 'profile-content',
'stats-link': 'stats-content'
};

function setActive(link) {
// Перемещение индикатора
activeIndicator.style.top = \`\${link.offsetTop}px\`;

// Обновление классов ссылок
navLinks.forEach(l => l.classList.remove('active'));
link.classList.add('active');

// Переключение контента
contentSections.forEach(s => s.classList.remove('active-content'));
const contentId = linkToContentMap[link.id];
document.getElementById(contentId).classList.add('active-content');
}

navLinks.forEach(link => {
link.addEventListener('click', (e) => {
e.preventDefault();
setActive(link);
});
});`},metrics:{label:"Готовность",value:"100%",description:"Завершенное решение"}},{id:5,title:"Responsive Image Carousel with Popup",category:"Components / Image Slider",tech:"HTML5, CSS3 (Flexbox), Vanilla JS (Event Delegation) (легко рефакторить на необходимый стек)",imageDark:"/images/carousel.jpg",imageLight:"/images/carousel.jpg",link:"https://sskutushev.github.io/Carousel_and_popap-variant1/",flow:{input:"Разработать карусель изображений с круговыми thumbnail-превью, кнопками prev/next, popup-просмотром и адаптивным дизайном.",process:"Flexbox для slider-wrapper с динамическим transform: translateX. JavaScript для вычисления slideWidth из offsetWidth контейнера. Event delegation для thumbnail-кликов. Popup с overlay (rgba background) и close по клику вне изображения. Responsive: slideWidth пересчитывается при window.resize.",output:"Карусель 1024×650px с 7 изображениями. Круговые thumbnail (75×75px) с активным border. Popup-overlay с масштабированием изображения до 95% viewport. Кнопки prev/next с hover-эффектом. Адаптивность: tablet (90vw), mobile (95vw с aspect-ratio 16:10)."},codeHighlight:{title:"Dynamic Slide Width Calculation (Responsive-адаптация)",code:`let slideWidth = 1024;

function updateSlider() {
sliderWrapper.style.transform = \`translateX(-\${currentIndex * slideWidth}px)\`;

const thumbs = document.querySelectorAll('.thumb-item');
thumbs.forEach((thumb, index) => {
thumb.classList.toggle('active', index === currentIndex);
});
}

window.addEventListener('resize', () => {
slideWidth = document.querySelector('.slider-container').offsetWidth;
updateSlider(); // Пересчет позиции при изменении окна
});

// Инициализация
slideWidth = document.querySelector('.slider-container').offsetWidth;`},metrics:{label:"Готовность",value:"100%",description:"Завершенное решение"}},{id:6,title:"Inverse Hover Card Gallery",category:"Components / CSS Effects",tech:"HTML5, CSS3 (:not() selector, Transforms), No JS (легко рефакторить на необходимый стек)",imageDark:"/images/Card.jpg",imageLight:"/images/Card.jpg",link:"https://sskutushev.github.io/Cards-Hover-Effect/",flow:{input:"Создать галерею карточек, где при наведении на одну карточку все остальные затемняются, используя только CSS без JavaScript.",process:"CSS :not() pseudo-class для инверсной логики. При hover на .card-container — все карточки opacity: 0.3. При hover на конкретную .card — она opacity: 1 + scale(1.05). Vendor prefixes (-webkit-, -moz-, -o-) для кросс-браузерной совместимости. Flexbox с gap (+ fallback margin для старых браузеров).",output:"Галерея из 4 карточек 500×560px. Hover-эффект: неактивные карточки затемняются, активная увеличивается и получает глубокую тень. Адаптивность: tablet (2 карточки по 45%), mobile (вертикальный стек, opacity: 1 !important). Плавные transitions (0.5s ease)."},codeHighlight:{title:"CSS :not() Selector Magic (Pure CSS Logic)",code:`/* Базовое состояние */
.card {
width: 500px;
height: 560px;
transition: all 0.5s ease;
cursor: pointer;
}

/* Инверсная логика: при hover на контейнер */
.card-container:hover .card {
opacity: 0.3; /* Все карточки затемняются */
}

/* Исключение: активная карточка */
.card-container:hover .card:hover {
opacity: 1; /* Возврат к яркости */
transform: scale(1.05); /* Увеличение */
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

/* Mobile override */
@media (max-width: 1014px) {
.card {
opacity: 1 !important; /* Отключаем эффект */
}
}`},metrics:{label:"Готовность",value:"100%",description:"Завершенное решение"}},{id:7,title:"Animated Social Media Buttons",category:"Components / Interactive UI",tech:"HTML5, CSS3 (:has() selector), SVG Icons (легко рефакторить на необходимый стек)",imageDark:"/images/social_button.jpg",imageLight:"/images/social_button.jpg",link:"https://sskutushev.github.io/button-social/",flow:{input:"Создать набор социальных кнопок с всплывающими tooltip-подсказками, анимацией масштабирования и цветовой трансформацией при hover.",process:"CSS :has() selector для связи состояния кнопки с tooltip. SVG-иконки (viewBox 24×24) с currentColor для наследования цвета. Transform: translateY для анимации tooltip (10px → 0). Data-атрибуты [data-social] для уникальных цветов платформ. Clamp() для адаптивного font-size заголовка.",output:"5 социальных кнопок (YouTube, TikTok, WhatsApp, Facebook, Twitter) 80×80px. При hover: кнопка scale(1.2), фон меняется на фирменный цвет платформы, иконка становится белой, tooltip появляется с cubic-bezier. Адаптивность: mobile (60×60px → 50×50px)."},codeHighlight:{title:"CSS :has() Selector (Modern Relationship Logic)",code:`/* Базовое состояние tooltip */
.tooltip {
position: absolute;
top: -55px;
opacity: 0;
visibility: hidden;
transform: translateX(-50%) translateY(10px);
transition: all 0.3s ease;
}

/* Связь через :has() */
.social-item:hover .tooltip {
opacity: 1;
visibility: visible;
transform: translateX(-50%) translateY(0);
}

/* Динамическое окрашивание по data-атрибуту */
.social-item:has(.social-btn[data-social="youtube"]:hover) .social-btn {
background: #FF0000;
}

.social-item:has(.social-btn[data-social="whatsapp"]:hover) .social-btn {
background: #25D366;
}

/* Изменение цвета иконки */
.social-item:hover .social-icon {
color: #FFFFFF;
}`},metrics:{label:"Готовность",value:"100%",description:"Завершенное решение"}}];export{k as P,w as p,C as u};
