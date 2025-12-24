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
    id: 14,
    title: "🎬 MovieCatalog — Adaptive Cinema SPA",
    category: "React SPA / Movie Discovery",
    tech: "React 18, TypeScript, Tailwind CSS, Framer Motion, React Router, Vitest, 87% Test Coverage",
    imageDark: "/images/Cinemadark.jpg",
    imageLight: "/images/cinemawhite.jpg",
    link: "https://effective-mobile.vercel.app/",
    flow: {
      input:
        "Разработать SPA-каталог фильмов с поиском по названию, фильтрацией по категориям и детальным просмотром. Требования: адаптивная верстка, семантическая разметка, обработка ошибок, оптимизация производительности, анимации. Тестовое задание для позиции Junior Frontend Developer.",
      process:
        'Архитектура: Feature-based структура с разделением на layers (components/features/entities/shared). React 18 + TypeScript для type safety, React Router для навигации между страницами.\n\nUI/UX: Tailwind CSS для utility-first подхода, Framer Motion для плавных анимаций карточек и модальных окон. Реализована темная/светлая тема с переключателем и сохранением в localStorage.\n\nState & Performance:\n- Debounced search (300ms) через custom hook для оптимизации запросов\n- Lazy loading изображений с loading="lazy"\n- Code splitting через React.lazy для детальной страницы\n- Pagination с "Load More" вместо бесконечного скролла\n\nType Safety: TypeScript strict mode + типизация всех props и state. Интерфейсы для Movie, FilterCategory, Theme.\n\nTesting & Quality:\n- Vitest + React Testing Library\n- 87% test coverage (unit + integration тесты)\n- Тесты для всех компонентов и hooks\n- ESLint + TypeScript для code quality',
      output:
        "Production-ready каталог фильмов с адаптивным дизайном, темной темой, поиском с debounce, категориальной фильтрацией и детальными страницами. Проект демонстрирует понимание React ecosystem, оптимизации производительности и best practices тестирования.\n\nСверх нормы (+50%):\n- Модальное окно с деталями фильма\n- Детальная страница с роутингом\n- Dark/Light theme switcher\n- 87% test coverage (требования не было)\n- Skeleton loaders для UX\n- Scroll to top button",
    },
    codeHighlight: {
      title: "Debounced Search Hook",
      code: "// hooks/useDebounce.ts\nexport function useDebounce<T>(value: T, delay: number): T {\n  const [debouncedValue, setDebouncedValue] = useState<T>(value);\n\n  useEffect(() => {\n    const handler = setTimeout(() => {\n      setDebouncedValue(value);\n    }, delay);\n\n    return () => clearTimeout(handler);\n  }, [value, delay]);\n\n  return debouncedValue;\n}\n\n// components/features/SearchBar/SearchBar.tsx\nexport const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {\n  const [query, setQuery] = useState('');\n  const debouncedQuery = useDebounce(query, 300);\n\n  useEffect(() => {\n    onSearch(debouncedQuery);\n  }, [debouncedQuery, onSearch]);\n\n  return (/* ... */);\n};\n// Оптимизация: Поиск срабатывает только через 300мс после прекращения ввода, снижая нагрузку на фильтрацию в 10+ раз.",
    },
    metrics: {
      label: "Performance",
      value: "87% Test Coverage",
      description: "Debounced Search, Theme Switcher, Adaptive Layout",
    },
  },
  {
    id: 15,
    title: "🎰 RKN Simulator — Satirical Slot Machine Game",
    category: "Telegram Mini App / Gamification",
    tech: "React 18, TypeScript, Tailwind CSS, Framer Motion, Telegram WebApp API",
    imageDark: "/images/slotmachine.png",
    imageLight: "/images/slotmachine.png",
    link: "https://t.me/RKNsimulator_bot",
    flow: {
      input:
        "Создать юмористическое веб-приложение в формате слот-машины для практики реализации сложной анимации барабана розыгрыша. Цель: отработать механику бесконечной прокрутки, точное позиционирование победителя, интеграцию с Telegram Mini App API и создание engaging user experience с micro-interactions.",
      process:
        'Архитектура: React 18 + TypeScript с Context API для глобального состояния (баланс, решения). Интеграция с Telegram WebApp API для нативного UX (haptic feedback, safe area, fullscreen, CloudStorage).\n\nАнимационная система:\n- Framer Motion для плавной механики барабана\n- Автоматическая прокрутка в режиме ожидания (1.5s интервал)\n- Точный расчет финальной позиции: 3 полных оборота + winner offset\n- Кастомная easing-функция [0.12, 0, 0.39, 0] для реалистичного замедления\n- 30x повторение массива сервисов для бесконечной ленты\n\nUI/UX Особенности:\n- Gradient animated background (розовый → оранжевый)\n- 3D-эффекты с трансформациями и тенями\n- Центральная рамка-индикатор с подсветкой победителя\n- Плавающие декоративные элементы (✨)\n- Adaptive layout с учетом Safe Area Insets (вырезы iPhone)\n\nPersistence Layer:\n- Dual-storage: Telegram CloudStorage (primary) + localStorage (fallback)\n- Синхронизация баланса звёзд и истории решений\n- Система ежедневных наград с таймером\n\nИгровая механика:\n- 36 популярных сервисов (Google, YouTube, Netflix, etc.)\n- 3 типа "решений": Ban 🚫, Slow 🐌, Limit 🔒\n- 50+ уникальных саркастических комментариев\n- Экономия: 100 стартовых звёзд, 2 звезды за спин, +10 за daily reward',
      output:
        "Production-ready Telegram Mini App с плавной анимацией барабана, haptic feedback, автоматической прокруткой и dual-storage persistence. Проект демонстрирует глубокое понимание Framer Motion, точных математических расчетов для анимаций, интеграции с Telegram API и создания engaging gamification experience.",
    },
    codeHighlight: {
      title: "Carousel Animation Logic",
      code: "// components/Carousel.tsx\nconst Carousel = ({ isSpinning, winner, onComplete }: Props) => {\n  const controls = useAnimation();\n  const ITEM_HEIGHT = 180;\n  const GAP = 20;\n  const STEP = ITEM_HEIGHT + GAP;\n\n  // Повторяем сервисы 30x для бесконечной ленты\n  const repeatedServices = useMemo(() => {\n    const result = [];\n    for (let i = 0; i < 30; i++) {\n      result.push(...SERVICES);\n    }\n    return result;\n  }, []);\n\n  useEffect(() => {\n    if (isSpinning && winner) {\n      const winnerIndex = SERVICES.findIndex(s => s.id === winner.id);\n\n      // 3 полных круга + позиция победителя\n      const fullRoundDistance = SERVICES.length * STEP;\n      const roundsDistance = 3 * fullRoundDistance;\n      const winnerPositionDistance = winnerIndex * STEP;\n      const centerOffset = 300; // Центрирование\n\n      const finalPosition = startPosition - roundsDistance\n                           - winnerPositionDistance + centerOffset;\n\n      controls.start({ y: finalPosition }, {\n        duration: 6,\n        ease: [0.12, 0, 0.39, 0] // Резкий старт → плавное торможение\n      }).then(onComplete);\n    }\n  }, [isSpinning, winner]);\n\n  return (/* JSX */);\n};\n// Математика победы: Точный расчет дистанции для 3 оборотов + остановка на winner с учетом центрирования.",
    },
    metrics: {
      label: "Performance",
      value: "Auto-scroll Carousel",
      description: "Haptic Feedback, CloudStorage Sync",
    },
  },
  {
    id: 11,
    title: "Yokai Threat Matrix — Real-Time Monitoring SPA",
    category: "PWA / Real-Time Dashboard",
    tech: "Next.js 14 App Router, Feature-Sliced Design, TanStack Query, SSE, Optimistic UI, Zod Validation, Docker",
    imageDark: "/images/yokai.jpg",
    imageLight: "/images/yokai.jpg",
    link: "https://y-kai-threat-matrix-ytm.vercel.app/monitoring",
    flow: {
      input:
        'Разработать SPA-дашборд для мониторинга духовных аномалий (ёкаев) в реальном времени. Операторы должны видеть всплески энергии и отправлять "отряды зачистки". Требования: строгий Feature-Sliced Design, SSE для live updates, оптимистичные обновления с 30% вероятностью ошибки, Docker deployment.',
      process:
        "Архитектура: Строгий Feature-Sliced Design с изолированными layers (app/pages/widgets/features/entities/shared). Каждый slice независим — новые фичи добавляются без рефакторинга.\n\nReal-Time: Server-Sent Events вместо WebSocket для однонаправленного потока. Каждые 5 секунд случайный yokai меняет threat level. Интеграция с React Query cache — UI обновляется мгновенно без re-fetching.\n\nState Management: TanStack Query с Optimistic Updates. UI меняется до ответа сервера, при ошибке (30% вероятность) автоматический rollback. Паттерн из Trello/Linear.\n\nType Safety: TypeScript strict mode + Zod для runtime-валидации всех API входов/выходов. Schemas документируют контракты и защищают от невалидных данных.\n\nTesting & CI/CD: Test Pyramid (Jest + Playwright), 67% coverage. GitHub Actions pipeline: lint → test → build → e2e. Husky hooks для commitlint и lint-staged.\n\nDevOps: Docker Compose для one-command deployment. Nginx для production-ready serving.",
      output:
        "Production-ready дашборд с real-time SSE, надежной архитектурой FSD, автоматизированным тестированием и полным CI/CD циклом. Проект демонстрирует понимание enterprise-паттернов: от optimistic updates до deployment automation. Сверх нормы: Полное тестовое покрытие (unit/integration/e2e), CI/CD pipeline с quality gates, Архитектурная документация (docs/), Git hooks для code quality.",
    },
    codeHighlight: {
      title: "Optimistic Updates с Rollback",
      code: "// features/capture-anomaly/model/use-capture.ts\nuseMutation({\n  // 🎯 UI обновляется мгновенно\n  onMutate: async (anomalyId) => {\n    await queryClient.cancelQueries(['anomalies']);\n    const previous = queryClient.getQueryData(['anomalies']);\n\n    queryClient.setQueryData(['anomalies'], (old) =>\n      old?.map(a => a.id === anomalyId\n        ? {...a, status: 'captured'}\n        : a\n      )\n    );\n\n    return { previous };\n  },\n\n  // 🔄 Автоматический откат при ошибке (30%)\n  onError: (_err, _id, context) => {\n    queryClient.setQueryData(['anomalies'], context?.previous);\n    toast.error('Yokai escaped!');\n  }\n});\n// Паттерн из Trello/Linear: Мгновенный feedback пользователю, автоматический rollback без дополнительной логики.",
    },
    metrics: {
      label: "Performance",
      value: "Real-Time SSE",
      description: "Server-Sent Events, Optimistic UI",
    },
  },
  {
    id: 10,
    title: "Courses Catalog: Production-Ready Frontend",
    category: "Test Assignment / Catalog",
    tech: "Vanilla JS / ES6, BEM / SCSS / Fluid Grid, WCAG 2.1 AA, Jest Coverage (>70%), GitHub Actions, Docker / Nginx",
    imageDark: "/images/Course.jpg",
    imageLight: "/images/Course.jpg",
    link: "https://test-kozyrev.vercel.app/",
    flow: {
      input:
        'Мне было дано стандартное ТЗ: сверстать и "оживить" каталог курсов (поиск, фильтры, пагинация) на чистом стеке HTML/SCSS/Vanilla JS. Моя цель была превратить его из тестового задания в архитектурно надежный и готовый к продакшену проект.',
      process:
        "Frontend Architecture: Реализовал всю логику в виде чистого ES6-класса CourseCatalog с четким разделением ответственности (BEM-методология для стилей, cacheDOM, render, handleEvent для логики). Это обеспечивает чистый, тестируемый код.\n\nПроизводительность и UI: Добился Sub-50KB размера ассетов. Интегрировал Live Search с Debounce (300ms) и пагинацию с плавным появлением (CSS-каскадная анимация) для оптимального UX.\n\nДоступность (A11y): Полное соответствие WCAG 2.1 Level AA (ARIA, фокус-менеджмент, семантический HTML), что является критическим требованием для современных систем.\n\nТестирование: Настроил Jest с покрытием >70% (Unit, E2E), гарантируя надежность всей бизнес-логики (фильтрация, поиск, пагинация).\n\nDevOps & Deployment: Внедрил GitHub Actions CI/CD для автоматического запуска линтеров/тестов и сборки. Проект контейнеризирован в Docker с Nginx для безопасного и оптимизированного развертывания.",
      output:
        "Я создал Production-Ready каталог с идеальным Lighthouse Score, надежной Vanilla JS архитектурой и полной автоматизацией. Этот проект демонстрирует, что я могу самостоятельно взять на себя ответственность за полный цикл разработки: от pixel-perfect верстки и архитектуры до тестирования, оптимизации и развертывания.",
    },
    codeHighlight: {
      title: "Чистая Архитектура (Class-Based Vanilla JS)",
      code: "// script.js\n/**\n * Класс CourseCatalog: инкапсулирует всю логику приложения,\n * имитируя компонентный подход без использования фреймворков.\n */\nclass CourseCatalog {\n    // Начальное состояние\n    constructor() {\n        this.courses = coursesData;\n        this.filteredCourses = [...this.courses];\n        this.itemsToShow = 9;\n        this.searchQuery = '';\n        this.activeCategory = 'all';\n        this.debounceTimeout = null;\n\n        this.init(); // Запуск инициализации\n    }\n\n    /**\n     * Кэширование DOM-элементов:\n     * Запрос к DOM происходит только один раз при инициализации.\n     * Это повышает производительность и чистоту кода.\n     */\n    cacheDOM() {\n        this.coursesGrid = document.getElementById('coursesGrid');\n        this.loadMoreButton = document.getElementById('loadMoreButton');\n        this.tabButtons = document.querySelectorAll('.tabs__item[data-category]');\n        this.searchInput = document.getElementById('searchInput');\n        this.courseCountElement = document.getElementById('courseCount');\n    }\n\n    /**\n     * Настройка обработчиков событий:\n     * Отдельный метод для привязки всех событий.\n     * Включает дебаунс для поискового ввода.\n     */\n    bindEvents() {\n        // Debounce для поискового ввода\n        this.searchInput.addEventListener('input', (e) => {\n            clearTimeout(this.debounceTimeout);\n            this.debounceTimeout = setTimeout(() => {\n                this.handleSearch(this.sanitizeInput(e.target.value));\n            }, 300); // 300ms Debounce\n        });\n\n        // Клик по вкладкам\n        this.tabButtons.forEach(button => {\n            button.addEventListener('click', () => {\n                this.handleFilter(button.dataset.category);\n            });\n        });\n\n        // Кнопка \"Загрузить ещё\"\n        this.loadMoreButton.addEventListener('click', this.handleLoadMore.bind(this));\n    }\n\n    /**\n     * Основной метод для применения фильтрации и поиска.\n     */\n    filterCourses() {\n        let result = this.courses.filter(course => {\n            // 1. Фильтрация по категории\n            const categoryMatch = this.activeCategory === 'all' || course.category === this.activeCategory;\n\n            // 2. Поиск по названию\n            const searchMatch = course.title.toLowerCase().includes(this.searchQuery.toLowerCase());\n\n            return categoryMatch && searchMatch;\n        });\n\n        this.filteredCourses = result;\n        this.itemsToShow = 9; // Сброс пагинации при каждом изменении фильтра/поиска\n        this.renderCourses();\n    }\n\n    // ... прочие методы (renderCourses, updateCounts, handleLoadMore, sanitizeInput)\n}",
    },
    metrics: {
      label: "Production-Ready",
      value: "Clean Architecture",
      description: "Vanilla JS Class, WCAG AA, CI/CD, Docker",
    },
  },
  {
    id: 9,
    title: "Lumi — High-Performance Task Manager",
    category: "PWA / Task Management",
    tech: "React 18 / TS, TanStack Query, Optimistic UI, PWA / Offline, Supabase RLS",
    imageDark: "/images/Lumi-black.jpg",
    imageLight: "/images/Lumi.jpg",
    link: "https://lumi-orcin.vercel.app/",
    flow: {
      input:
        "Я решил сделать свой, собственный Task Manager (Lumi). Я не хотел компромиссов: он должен быть быстрым, работать оффлайн и быть максимально защищенным (проект сделан мной, от и до).",
      process:
        "Архитектура и Стек: Чистый React 18, TypeScript, Vite. Бэкенд и Realtime полностью на Supabase.\n\nСкорость (Performance): Я добился мгновенного отклика (Optimistic UI) и включил PWA с умным кэшированием (NetworkFirst для API).\n\nБезопасность (Security): Настроил Row Level Security (RLS) в PostgreSQL, чтобы гарантировать, что каждый пользователь видит только свои данные. Вся входящая data строго валидируется на клиенте через Zod.\n\nНадежность: Все ошибки отслеживаются в реальном времени через Sentry. Конфигурация Vercel включает необходимые Security Headers (X-XSS-Protection, X-Frame-Options).\n\nDevOps: Внедрил Husky и Commitlint для принудительного соблюдения конвенции коммитов.",
      output:
        "Я создал полноценное PWA-приложение, которое работает как нативное. Это высокопроизводительный продукт с защищенным API-слоем и возможностью оффлайн-работы, полностью спроектированный и реализованный мною в одиночку.",
    },
    codeHighlight: {
      title: "Optimistic Update с Rollback",
      code: "// src/hooks/mutations/useCreateTask.ts\n// Обеспечивает мгновенное обновление UI до получения ответа от сервера (Optimistic UI)\n// и автоматический откат (Rollback) при ошибке, чтобы UI не врал пользователю.\n\nimport { useMutation, useQueryClient } from '@tanstack/react-query';\nimport { tasksAPI } from '../../lib/api/tasks.api';\nimport { Task, TaskInput } from '../../types/api.types';\n\nexport const useCreateTask = () => {\n  const queryClient = useQueryClient();\n  const tasksKey = ['tasks']; // Ключ кэша для списка задач\n\n  return useMutation({\n    mutationFn: (newTask: TaskInput) => tasksAPI.create(newTask),\n\n    // 1. onMutate: Срабатывает перед вызовом API (начало Optimistic Update)\n    onMutate: async (newTask) => {\n      await queryClient.cancelQueries({ queryKey: tasksKey }); // Блокируем фоновый рефетчинг\n\n      const previousTasks = queryClient.getQueryData(tasksKey); // Сохраняем \"снэпшот\" данных\n\n      // Оптимистическое обновление: добавляем временную задачу в UI\n      const optimisticTask: Task = {\n        ...newTask,\n        id: 'optimistic-id-' + Date.now(), // Генерируем временный ID\n        is_completed: false,\n        created_at: new Date().toISOString(),\n      };\n\n      queryClient.setQueryData<Task[]>(tasksKey, (oldTasks = []) => [\n        optimisticTask,\n        ...oldTasks,\n      ]);\n\n      return { previousTasks }; // Передаем снэпшот для отката\n    },\n\n    // 2. onError: Срабатывает при ошибке API\n    onError: (err, newTask, context) => {\n      // Откат (Rollback): возвращаем предыдущие данные в кэш\n      if (context?.previousTasks) {\n        queryClient.setQueryData(tasksKey, context.previousTasks);\n      }\n      // Логирование и оповещение Sentry\n      console.error('Task creation failed, rolled back:', err);\n    },\n\n    // 3. onSettled: Вызывается всегда (успех или ошибка)\n    onSettled: () => {\n      // Инициируем фоновый рефетчинг для синхронизации с Supabase\n      queryClient.invalidateQueries({ queryKey: tasksKey });\n    },\n  });\n};",
    },
    metrics: {
      label: "Performance",
      value: "Optimistic UI",
      description: "Мгновенный отклик с Rollback при ошибках",
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
    id: 3,
    title: "AIBRO Business",
    category: "Full-Stack SaaS / B2B Platform",
    tech: "React 19, TS, React Query, Prisma, PostgreSQL, Express, Playwright, Vercel, Railway",
    imageDark: "/images/project-airbro-dark.jpg",
    imageLight: "/images/project-airbro-light.jpg",
    link: "https://airbro-production.up.railway.app/",
    flow: {
      input:
        'Создать "под ключ" production-ready SaaS платформу с нуля. Реализовать full-stack приложение, включающее аутентификацию (JWT + Telegram), прием крипто-платежей (USDT/TON) и полноценный личный кабинет пользователя для управления подписками.',
      process:
        'Архитектура "Monorepo". Frontend на Vercel (React 19, Vite, React Query, Zod, Framer Motion). Backend на Railway (Node.js, Express, Prisma, PostgreSQL). Бэкенд построен по слоеной архитектуре (Routes → Controllers → Services → Repositories). Настроен полный CI/CD-пайплайн с E2E-тестированием на Playwright.',
      output:
        "Масштабируемая, безопасная и полностью документированная SaaS-платформа. Включает многоязычную поддержку (i18n), смену тем, защищенный дашборд и автоматизированный CI/CD. Проект полностью соответствует лучшим практикам безопасности (OWASP).",
    },
    codeHighlight: {
      title: "Automated CI/CD Pipeline (Backend Testing)",
      code: `// .github/workflows/ci.yml
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
          JWT_SECRET: test_secret_key_for_ci_pipeline`,
    },
    metrics: {
      label: "Готовность",
      value: "Production-Ready",
      description: "CI/CD, Tests, Docs",
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
];
