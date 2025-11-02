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
      code: "// src/hooks/useWallet.ts\nimport { create } from 'zustand';\n// ..."
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
      code: "// src/lib/api/client.ts\nimport axios from 'axios';\n// ..."
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
      code: "// src/lib/motionPresets.ts\nexport const motionPresets = {\n  // ...\n};"
    },
    metrics: {
      label: "Performance",
      value: "95+",
      description: "Lighthouse Score (Performance + Accessibility)"
    }
  }
];
