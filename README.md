# Reactive Velocity - Portfolio

[![CI/CD](https://github.com/Sskutushev/portfolio/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/Sskutushev/portfolio/actions)
[![Tests](https://github.com/Sskutushev/portfolio/workflows/Tests/badge.svg)](https://github.com/Sskutushev/portfolio/actions)
[![Security](https://github.com/Sskutushev/portfolio/workflows/Security%20Scan/badge.svg)](https://github.com/Sskutushev/portfolio/actions)
[![codecov](https://codecov.io/gh/Sskutushev/portfolio/branch/main/graph/badge.svg)](https://codecov.io/gh/Sskutushev/portfolio)
[![Lighthouse Score](https://img.shields.io/badge/lighthouse-95%2B-success)](https://googlechrome.github.io/lighthouse/viewer/)
![Vercel](https://vercelbadge.vercel.app/api/Sskutushev/portfolio)

## 🚀 Описание проекта

Reactive Velocity - это современное, производительное и доступное React-портфолио, которое демонстрирует передовой опыт разработки на React с использованием TypeScript, Vite, Tailwind CSS и других современных технологий.

### ✨ Особенности

- 🏗️ Полностью на TypeScript с типобезопасностью
- ⚡ Молниеносная сборка с Vite 7
- 🎨 Красивый дизайн с Tailwind CSS и Framer Motion
- 📱 Адаптивный дизайн для всех устройств
- 🌙 Темная/светлая тема с переключением
- 🌍 Поддержка i18n (RU/EN)
- 🧪 Обширное тестирование с Vitest и React Testing Library
- 🚀 Производительность, оптимизированная для Lighthouse 95+
- ♿ Полная доступность (WCAG 2.1 AA)
- 🔐 Безопасность с CI/CD и автоматическими сканированиями
- 🚢 Автоматический деплой на Vercel

## 📊 Метрики проекта

| Метрика | Результат |
|--------|----------|
| Performance (Lighthouse) | 95+ |
| Accessibility (Lighthouse) | 95+ |
| SEO (Lighthouse) | 100 |
| Best Practices (Lighthouse) | 95+ |
| Test Coverage | 30%+ |
| Bundle Size (gzipped) | ~165KB |

## 🛠️ Технологический стек

### Frontend

- [React 19](https://react.dev/) - Библиотека для создания пользовательских интерфейсов
- [TypeScript](https://www.typescriptlang.org/) - Язык программирования с типами для JavaScript
- [Vite 7](https://vitejs.dev/) - Быстрая сборка и разработка
- [Tailwind CSS 3.4](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Библиотека для анимаций
- [React Router DOM](https://reactrouter.com/) - Роутинг и навигация
- [React Hook Form](https://react-hook-form.com/) - Управление формами
- [i18next](https://www.i18next.com/) - Интернационализация
- [Lucide React](https://lucide.dev/) - Иконки

### Testing

- [Vitest](https://vitest.dev/) - Быстрый тест фреймворк для Vite
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Тестирование React компонентов
- [Playwright](https://playwright.dev/) - E2E тестирование
- [axe-core](https://github.com/dequelabs/axe-core) - Тестирование доступности

### CI/CD

- [GitHub Actions](https://github.com/features/actions) - Автоматизация CI/CD
- [Vercel](https://vercel.com/) - Деплой и хостинг
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) - Тестирование производительности
- [Codecov](https://about.codecov.io/) - Покрытие тестами

## 🚀 Quick Start

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Запуск тестов
npm run test

# Сборка для production
npm run build

# Запуск production preview
npm run preview
```

## 📁 Структура проекта

```
portfolio-project/
├── public/
│   ├── images/          # Изображения проекта
│   └── favicon.ico
├── src/
│   ├── components/      # React компоненты
│   │   ├── common/      # Общие компоненты
│   │   └── sections/    # Секции сайта
│   ├── contexts/        # React контексты
│   ├── hooks/           # Кастомные React хуки
│   ├── lib/             # Вспомогательные библиотеки
│   ├── pages/           # Страницы приложения
│   ├── test/            # Тест-утилиты
│   ├── styles/          # CSS стили
│   ├── types/           # TypeScript типы
│   ├── utils/           # Вспомогательные функции
│   ├── App.tsx          # Главный компонент
│   └── main.tsx         # Точка входа
├── .github/
│   └── workflows/       # GitHub Actions workflows
├── docs/                # Документация
├── scripts/             # Скрипты для оптимизации
├── tests/               # Тесты
└── ...
```

## 🧪 Тестирование

### Запуск тестов

| Команда | Описание |
|--------|----------|
| `npm run test` | Запуск unit тестов в watch режиме |
| `npm run test:ui` | Запуск тестов с UI интерфейсом |
| `npm run test:coverage` | Запуск с покрытием кода |
| `npm run test:watch` | Запуск в watch режиме |
| `npm run test:e2e` | Запуск E2E тестов |
| `npm run test:a11y` | Запуск accessibility тестов |

### Покрытие тестами

Цель: 30%+ покрытие кода. Покрытие отслеживается через Codecov.

## ⚡ Производительность

### Оптимизации

- ✅ Ленивая загрузка изображений и видео
- ✅ Оптимизация изображений (WebP, размеры)
- ✅ Оптимизация видео (MP4/WebM, lazy load)
- ✅ Code splitting и lazy loading
- ✅ Bundle size оптимизация
- ✅ Preload критических ресурсов
- ✅ Оптимизация Framer Motion
- ✅ Memoization компонентов

## ♿ Доступность (A11Y)

### Основные улучшения

- ✅ ARIA-атрибуты для всех интерактивных элементов
- ✅ Keyboard navigation (Tab, Shift+Tab, Escape, Enter)
- ✅ Focus management и focus traps
- ✅ Skip navigation links
- ✅ Screen reader support
- ✅ Proper heading hierarchy
- ✅ Color contrast 4.5:1+
- ✅ Reduced motion support
- ✅ High contrast mode support

## 📝 Scripts

| Command                 | Description              |
| ----------------------- | ------------------------ |
| `npm run dev`           | Запуск dev сервера       |
| `npm run build`         | Production build         |
| `npm run preview`       | Preview production build |
| `npm run test`          | Запуск unit тестов       |
| `npm run test:ui`       | Тесты с UI интерфейсом   |
| `npm run test:coverage` | Тесты с coverage         |
| `npm run test:e2e`      | E2E тесты с Playwright   |
| `npm run test:a11y`     | Accessibility тесты      |
| `npm run lint`          | Запуск ESLint            |
| `npm run lighthouse`    | Lighthouse audit         |

## 🎯 Code Quality

### Pre-commit Hooks

- Автоматический lint и format
- Проверка commit messages
- Type checking

### Commit Convention

Используется [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: fix bug in component
docs: update README
style: format code
refactor: restructure component
perf: improve performance
test: add missing tests
chore: update dependencies
```

## 📈 Performance Metrics

### Bundle Size

- Initial JS: ~150KB (gzipped)
- Initial CSS: ~15KB (gzipped)
- Total: ~165KB (gzipped)

### Core Web Vitals

- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

## 🔒 Security

- Regular dependency updates via Dependabot
- Security scanning with Snyk
- CodeQL analysis
- npm audit in CI/CD

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 📱 Accessibility

- WCAG 2.1 Level AA compliant
- Keyboard navigation
- Screen reader support
- High contrast mode
- Reduced motion support

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👤 Author

**Sergey Kutushev**

- Website: [vercel](https://my-portfolio-cyan-three-58.vercel.app/#)
- GitHub: [@Sskutushev](https://github.com/Sskutushev)
- Telegram: [@sskutushev](https://t.me/sskutushev)
