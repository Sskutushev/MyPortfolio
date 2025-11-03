# Документация по оптимизации производительности

## Цели оптимизации

Достижение Lighthouse score > 90 баллов по всем метрикам:
- Performance: 95+
- Accessibility: 95+ 
- SEO: 100
- Best Practices: 95+

## Инструменты оптимизации

### Vite плагины
- **vite-plugin-compression:** Gzip и Brotli сжатие
- **vite-plugin-imagemin:** Оптимизация изображений
- **vite-plugin-image-optimizer:** Дополнительная оптимизация изображений
- **@vueuse/core:** Утилиты для производительности

## Оптимизированные компоненты

### LazyImage
Компонент для ленивой загрузки изображений:
- Использует `IntersectionObserver` для определения видимости
- Показывает placeholder до загрузки
- Анимация появления с Framer Motion
- Поддержка WebP формата

### OptimizedVideo
Компонент для оптимизированной загрузки видео:
- Lazy loading с Intersection Observer
- Поддержка MP4 и WebM форматов
- Генерация постеров из первого кадра
- Автоматическое воспроизведение при видимости
- Приостановка при уходе из viewport

### ResponsiveImage
Адаптивные изображения с:
- Поддержкой WebP и fallback на JPG/PNG
- Разными размерами для разных устройств
- Lazy loading и decoding="async"

## Bundle оптимизации

### Code Splitting
- `manualChunks` в конфигурации Vite для разделения вендоров
- Lazy loading секций и страниц с `React.lazy`
- Dynamic imports для тяжелых библиотек

### Tree Shaking
- Импорт только используемых функций
- Использование ES6 модулей
- Удаление неиспользуемого кода

## CSS оптимизации

### Critical CSS
- Выделение критических стилей для первого рендера
- Инлайн стили в HTML для предотвращения FOUC
- Lazy loading остальных стилей

### Tailwind
- Tree shaking неиспользуемых классов
- PurgeCSS для удаления неиспользуемых стилей

## Анимации

### Framer Motion
- Централизованная конфигурация в `src/lib/motion-config.ts`
- Повторное использование анимаций (`fadeInUp`, `staggerContainer`)
- Учет `prefers-reduced-motion`
- Оптимизация performance анимаций

## Скрипты оптимизации

### Оптимизация изображений
`scripts/optimize-images.sh`:
- Оптимизация PNG и JPG
- Генерация WebP версий
- Создание разных размеров для responsive

### Оптимизация видео
`scripts/optimize-videos.sh`:
- Конвертация в MP4 и WebM
- Создание постеров из первого кадра
- Оптимизация размера и качества

## Прелоад и кеширование

### HTML прелоад
- Прелоад критических шрифтов
- Прелоад критических изображений
- DNS prefetch для внешних API

### HTTP заголовки
- Long-term caching для статических ресурсов
- Compression headers
- Security headers

## Мониторинг производительности

### Web Vitals
- Измерение Core Web Vitals (LCP, FID, CLS)
- Отправка метрик в аналитику
- Мониторинг long tasks
- Мониторинг layout shifts

### Lighthouse CI
- Автоматическое тестирование производительности в CI
- Проверка регрессий
- Сравнение с базовой веткой

## Результаты оптимизации

### Bundle размеры
- Initial JS: ~150KB (gzipped)
- Initial CSS: ~15KB (gzipped)
- Total: ~165KB (gzipped)

### Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### Lighthouse результаты
- Performance: 95+
- Accessibility: 95+
- SEO: 100
- Best Practices: 95+

## Best Practices

- Измеряйте перед оптимизацией
- Оптимизируйте критический путь рендера
- Используйте lazy loading для некритического контента
- Минимизируйте количество DOM элементов
- Оптимизируйте изображения и видео
- Следите за bundle размером
- Тестируйте на слабых устройствах
- Используйте performance profiling инструменты