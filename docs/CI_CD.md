# Документация по CI/CD

## Обзор

Проект использует GitHub Actions для автоматизации процессов:

- Линтинга и проверки типов
- Запуска тестов
- E2E тестирования
- Проверки доступности
- Сканирования безопасности
- Сборки проекта
- Деплоя на production

## GitHub Actions workflows

### Основной CI workflow (.github/workflows/ci.yml)

#### Этапы:

1. **Линтинг и проверка типов (lint-and-typecheck)**
   - Установка Node.js и зависимостей
   - Запуск ESLint
   - Проверка TypeScript типов
   - Проверка форматирования с Prettier

2. **Unit тесты (unit-tests)**
   - Установка Node.js и зависимостей
   - Запуск тестов с покрытием
   - Отправка покрытия в Codecov
   - Загрузка отчетов о покрытии

3. **E2E тесты (e2e-tests)**
   - Установка Node.js и зависимостей
   - Установка браузеров Playwright
   - Сборка проекта
   - Запуск E2E тестов Playwright
   - Загрузка отчетов Playwright

4. **Тесты доступности (accessibility-tests)**
   - Установка Node.js и зависимостей
   - Сборка проекта
   - Запуск Lighthouse CI
   - Загрузка результатов

5. **Сборка (build)**
   - Установка Node.js и зависимостей
   - Сборка проекта для production
   - Проверка размера сборки
   - Загрузка артефакта сборки

6. **Деплой предварительного просмотра (deploy-preview)**
   - Деплой на Vercel для Pull Request
   - Доступен для проверки изменений

7. **Деплой на production (deploy-production)**
   - Деплой на Vercel при мерже в main
   - Создание релиза GitHub

8. **Уведомления (notify)**
   - Отправка уведомлений в Telegram

### Lighthouse CI (.github/workflows/lighthouse.yml)

- Запуск при пуше в main ветку
- Проверка производительности, доступности, SEO и best practices
- Сравнение с базовой веткой
- Комментирование результатов в PR

### Security scan (.github/workflows/security.yml)

- Запуск по расписанию (еженедельно)
- Запуск при пуше и PR в main
- npm audit для проверки уязвимостей
- Сканирование Snyk
- CodeQL анализ

## Установка зависимостей

Все воркфлоу:

1. Проверяют код из репозитория
2. Устанавливают Node.js (версия указана в env.NODE_VERSION)
3. Устанавливают зависимости через `npm ci`

## Тестирование

### Unit тесты

- Запускаются с покрытием через Vitest
- Покрытие загружается в Codecov
- Отчеты покрытия сохраняются как артефакты

### E2E тесты

- Запускаются с помощью Playwright
- Используются разные браузеры и устройства
- Отчеты сохраняются как артефакты

### Accessibility тесты

- Запускаются через Lighthouse CI
- Проверяют WCAG 2.1 AA compliance
- Результаты загружаются как артефакты

## Сборка

- Запускается только после успешного прохождения lint и unit тестов
- Использует production конфигурацию
- Проверяет размер сборки
- Артефакт сборки загружается для деплоя

## Деплой

### Предварительный просмотр

- Запускается при Pull Request
- Требует прохождения сборки и e2e тестов
- Деплой на Vercel Preview

### Production

- Запускается при пуше в main ветку
- Требует прохождения всех проверок
- Деплой на Vercel Production
- Создание GitHub Release

## Уведомления

- Отправка в Telegram при успешном деплое
- Информация о репозитории, ветке, коммите, авторе и статусе

## GitHub Secrets

### Требуемые secrets:

#### Vercel

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

#### Telegram

```
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

#### reCAPTCHA

```
VITE_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

#### Lighthouse CI

```
LHCI_GITHUB_APP_TOKEN=your_lhci_token
```

#### Security

```
SNYK_TOKEN=your_snyk_token
```

#### Codecov

```
CODECOV_TOKEN=your_codecov_token
```

## Pre-commit хуки

### Установка локально:

```bash
npm run prepare
```

### Функции:

- Автоматический линтинг и форматирование
- Проверка commit сообщений
- Проверка типов

## Commitlint

Использует conventional commits:

- `feat`: новая функциональность
- `fix`: исправление бага
- `docs`: изменения в документации
- `style`: форматирование, отсутствующие точки с запятой
- `refactor`: рефакторинг кода
- `perf`: улучшение производительности
- `test`: добавление тестов
- `chore`: обновление зависимостей

## Status badges

Обновите README.md с актуальными badges:

```markdown
![CI/CD](https://github.com/yourusername/portfolio/workflows/CI%2FCD%20Pipeline/badge.svg)
![Tests](https://github.com/yourusername/portfolio/workflows/Tests/badge.svg)
![Security](https://github.com/yourusername/portfolio/workflows/Security%20Scan/badge.svg)
[![codecov](https://codecov.io/gh/yourusername/portfolio/branch/main/graph/badge.svg)](https://codecov.io/gh/yourusername/portfolio)
[![Lighthouse Score](https://img.shields.io/badge/lighthouse-90%2B-success)](https://googlechrome.github.io/lighthouse/viewer/)
![Vercel](https://vercelbadge.vercel.app/api/yourusername/portfolio)
```

## Troubleshooting

### Если workflow не запускается:

- Проверьте настройки репозитория (Actions enabled)
- Убедитесь, что secrets правильно настроены

### Если тесты падают в CI:

- Проверьте, что все зависимости включены в package.json
- Убедитесь, что тесты работают в разных окружениях
- Увеличьте таймауты для E2E тестов при необходимости
- Проверьте, что элементы на странице доступны до начала взаимодействия с ними
- Используйте queryAllByText вместо getByText при ожидании нескольких элементов с одинаковым текстом

### Если E2E тесты падают из-за timeout ошибок:

- Увеличьте таймауты ожидания элементов
- Используйте явные ожидания (waitFor) вместо фиксированных задержек
- Проверьте, что элементы действительно появляются на странице перед взаимодействием

### Если сборка падает:

- Проверьте, что все импорты корректны
- Убедитесь, что все переменные окружения доступны
- Проверьте, что Vercel не требует переменные, которые не определены

### Если сборка падает:

- Проверьте, что все импорты корректны
- Убедитесь, что все переменные окружения доступны
