# Документация по CI/CD

## Обзор

Процесс непрерывной интеграции и доставки (CI/CD) полностью автоматизирован с помощью **GitHub Actions**. Пайплайн гарантирует, что каждое изменение в коде проходит через строгий набор проверок, прежде чем попасть в production.

## Основной CI/CD workflow (`.github/workflows/ci.yml`)

Этот воркфлоу запускается при каждом `push` или `pull request` в ветки `main` и `develop`.

### Этапы (Jobs):

1.  **`lint-and-typecheck`**: Проверяет качество кода (ESLint, Prettier) и корректность типов TypeScript.
2.  **`unit-tests`**: Запускает модульные тесты (Vitest) и выгружает отчет о покрытии в Codecov.
3.  **`e2e-tests`**: Запускает сквозные тесты (Playwright) для проверки ключевых пользовательских сценариев в реальном браузере.
4.  **`accessibility-tests`**: Проводит аудит доступности с помощью Lighthouse CI.
5.  **`build`**: Собирает production-версию проекта. Запускается параллельно с тестами для экономии времени.
6.  **`deploy-preview`** (Только для Pull Requests):
    - **Условие:** `if: github.event_name == 'pull_request'`.
    - **Действие:** Автоматически деплоит изменения из Pull Request на уникальный URL в Vercel для предварительного просмотра.
7.  **`deploy-production`** (Только при push в `main`):
    - **Условие:** `if: github.ref == 'refs/heads/main' && github.event_name == 'push'`.
    - **Зависимости:** Ждет успешного завершения всех тестов (`unit-tests`, `e2e-tests`, `accessibility-tests`) и сборки (`build`).
    - **Права доступа:** Имеет `permissions: contents: write` для создания релиза на GitHub.
    - **Действие:** Деплоит финальную версию на основной домен в Vercel и автоматически создает новый тегированный релиз на GitHub.

## Устранение неисправностей (Troubleshooting)

- **Падение `Create Release` с ошибкой `403 Resource not accessible`:** Убедитесь, что у задачи `deploy-production` есть права `permissions: contents: write`.
- **Зависание деплоя на Vercel с вопросом `Set up and deploy?`:** Убедитесь, что в GitHub Secrets правильно прописаны `VERCEL_TOKEN`, `VERCEL_ORG_ID` и `VERCEL_PROJECT_ID`.
- **Падение тестов Lighthouse `crawlable-anchors`:** Эта проверка может конфликтовать с интерактивными элементами, которые не являются прямыми ссылками (например, кнопки, открывающие модальные окна). В `lighthouserc.json` эта проверка отключена (`"crawlable-anchors": "off"`), чтобы избежать ложных срабатываний.
